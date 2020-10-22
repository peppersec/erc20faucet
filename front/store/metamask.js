/* eslint-disable no-console */
import Web3 from 'web3'
import Portis from '@portis/web3'
import Squarelink from '@/node_modules/squarelink'
import MewConnect from '@myetherwallet/mewconnect-web-client'
import { toChecksumAddress, fromWei, isAddress, hexToNumberString } from 'web3-utils'
import networkConfig from '@/networkConfig'
let Authereum
if (process.client) {
  Authereum = require('authereum').Authereum
}

const onAccountsChanged = ({ newAccount, commit }) => {
  const account = toChecksumAddress(newAccount[0])
  commit('IDENTIFY', account)
}

const state = () => {
  return {
    ethAccount: null,
    netId: 1,
    domainData: {},
    balance: '0',
    address: {
      value: null,
      valid: false
    },
    gasPrice: { fast: 1, low: 1, standard: 1 },
    providerName: '',
    networkName: ''
  }
}

const getters = {
  netId(state) {
    return state.netId
  },
  networkName(state) {
    return networkConfig[`netId${state.netId}`].networkName
  },
  currency(state) {
    return networkConfig[`netId${state.netId}`].currencyName
  },
  networkConfig(state) {
    return networkConfig[`netId${state.netId}`]
  },
  getEthereumProvider: state => async () => {
    const { providerName, networkName } = state
    switch (providerName) {
      case 'portis':
        if (window.portis) {
          return window.portis.provider
        } else {
          window.portis = new Portis('f21d6ef4-efe2-4005-a7b2-817b7d6332a4', networkName)
          return window.portis.provider
        }
      case 'authereum':
        const authereum = new Authereum(networkName)
        return authereum.getProvider()
      case 'squarelink':
        const sqlk = new Squarelink('2b7f274f2a8972dfa320', networkName)
        const provider = await sqlk.getProvider()
        return provider
      case 'mewconnect':
        if (window.connectMew) return window.connectMew
        const connect = new MewConnect.Provider({ windowClosedError: true, infuraId: '7d06294ad2bd432887eada360c5e1986' })
        window.connectMew = connect.makeWeb3Provider(networkName)
        window.connectMew.sendAsync = new Proxy(window.connectMew.sendAsync, {
          apply(target, thisArg, argumentsList) {
            if (argumentsList.length >= 1) {
              if (!argumentsList[0].id && typeof argumentsList === 'object') {
                argumentsList[0].id = Date.now()
              }
            }
            return target(...argumentsList)
          }
        })
        return window.connectMew
      // case 'wallet-connect':
      //   await this.enableWalletConnectTxProvider()
      //   break
      // case 'torus':
      //   await this.enableTorusTxProvider()
      //   break
      // case 'bitski':
      //   await this.enableBitskiTxProvider()
      //   break
      // case 'ledger':
      //   await this.enableLedgerTxProvider()
      //   break
      case 'metamask':
      default:
        return window.ethereum
    }
  },
  web3: (state, getters) => async () => {
    const provider = await getters.getEthereumProvider()
    return Object.freeze(new Web3(provider))
  }
}

const mutations = {
  IDENTIFY(state, ethAccount) {
    state.ethAccount = ethAccount
  },
  SET_NET_ID(state, netId) {
    netId = parseInt(netId, 10)
    state.netId = netId
  },
  SET_BALANCE(state, balance) {
    state.balance = fromWei(balance)
  },
  SET_ADDRESS(state, { address, valid = false }) {
    state.address = {
      value: address,
      valid
    }
  },
  SAVE_GAS_PRICE(state, gasPrice) {
    state.gasPrice = gasPrice
  },
  SET_PROVIDER_NAME(state, providerName) {
    state.providerName = providerName
  },
  SET_NETWORK_NAME(state, networkName) {
    state.networkName = networkName
  }
}

const actions = {
  setAddress({ dispatch, commit }, { address }) {
    const isAddressValid = address.length >= 42 && isAddress(address)
    commit('SET_ADDRESS', {
      address,
      valid: isAddressValid
    })
  },
  onNetworkChanged({ commit }, { netId }) {
    commit('SET_NET_ID', netId)
  },
  getBalance({ dispatch, state, getters }) {
    const { rpcCallRetryAttempt } = getters.networkConfig
    return new Promise((resolve, reject) => {
      const checkBalance = async ({ retryAttempt = 1 }) => {
        retryAttempt++
        try {
          const methodCallParams = {
            method: 'eth_getBalance',
            params: [state.ethAccount, 'latest']
          }

          const balance = await dispatch(
            'metamask/sendAsync',
            methodCallParams,
            { root: true }
          )
          resolve(balance)
        } catch (e) {
          if (retryAttempt >= rpcCallRetryAttempt) {
            reject(e)
          } else {
            checkBalance({ retryAttempt })
          }
        }
      }
      checkBalance({})
    })
  },
  askPermission({ commit, dispatch, getters }, { providerName, networkName }) {
    return new Promise(async (resolve, reject) => {
      commit('SET_PROVIDER_NAME', providerName)
      commit('SET_NETWORK_NAME', networkName)
      const ethereum = await getters.getEthereumProvider()
      try {
        const ethAccounts = await ethereum.enable()
        if (ethAccounts.length === 0) {
          reject(new Error('lockedMetamask'))
        }
        const account = toChecksumAddress(ethAccounts[0])
        commit('IDENTIFY', account)
        dispatch('setAddress', { address: account })
        let balance = await dispatch('getBalance')
        balance = hexToNumberString(balance)
        dispatch('saveUserBalance', { balance })
        const netId = await dispatch('sendAsync', {
          method: 'net_version',
          params: [],
          callbackAction: 'metamask/onNetworkChanged'
        })
        dispatch('onNetworkChanged', { netId })
        if (ethereum.on) {
          ethereum.on('accountsChanged', newAccount =>
            onAccountsChanged({ dispatch, commit, newAccount })
          )
          ethereum.on('networkChanged', netId => dispatch('onNetworkChanged', { netId }))
        }
        dispatch('token/getTokenAddress', {}, { root: true })
        dispatch('token/getTokenBalance', {}, { root: true })
        resolve({ netId, ethAccount: ethAccounts[0] })
      } catch (error) {
        // User rejects approval from metamask
        reject(error)
      }
    })
  },

  saveUserBalance({ commit }, { balance }) {
    commit('SET_BALANCE', balance)
  },

  async fetchGasPrice({ rootState, commit, dispatch, rootGetters, state }, { oracleIndex = 0 }) {
    // eslint-disable-next-line prettier/prettier
    const { smartContractPollTime, gasPrice, gasOracleUrls } = rootGetters['metamask/networkConfig']
    const { netId } = rootState.metamask
    try {
      if (netId === 1) {
        const response = await fetch(gasOracleUrls[oracleIndex % gasOracleUrls.length])
        if (response.status === 200) {
          const json = await response.json()

          const gasPrices = { ...gasPrice }
          if (json.slow) {
            gasPrices.low = Number(json.slow) + 0.5
          }
          if (json.safeLow) {
            gasPrices.low = Number(json.safeLow) + 0.5
          }
          if (json.fast) {
            gasPrices.fast = Number(json.fast)
          }
          if (json.standard) {
            gasPrices.standard = Number(json.standard)
          }
          commit('SAVE_GAS_PRICE', gasPrices)
        } else {
          throw Error('Fetch gasPrice failed')
        }
        setTimeout(() => dispatch('fetchGasPrice', {}), 1000 * smartContractPollTime)
      } else {
        commit('SAVE_GAS_PRICE', gasPrice)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      oracleIndex++
      setTimeout(() => dispatch('fetchGasPrice', { oracleIndex }), 1000 * smartContractPollTime)
    }
  },

  sendAsync({ state, getters }, { method, from, params }) {
    switch (getters.netId) {
      case 77:
      case 99:
      case 100:
        from = undefined
        break
    }
    return new Promise(async (resolve, reject) => {
      const provider = await getters.getEthereumProvider()
      if (from) {
        from = toChecksumAddress(from)
      }
      console.log('from!!!', from, provider.selectedAddress)
      console.log('sendAsync `method, from, params`', method, from, params)
      if (provider.request) {
        if (params[0]) {
          if (params[0].from) {
            params[0].from = params[0].from.toLowerCase()
          }
        }
      }
      provider.sendAsync({
        method,
        params,
        jsonrpc: '2.0',
        from
      }, (err, response) => {
        if (err) {
          reject(err)
        }
        if (response.error) {
          reject(response.error)
        } else {
          resolve(response.result)
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
