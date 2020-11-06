/* eslint-disable no-console */
import Portis from '@portis/web3'
import Squarelink from '@/node_modules/squarelink'
import { toChecksumAddress, fromWei, isAddress } from 'web3-utils'
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
  async getBalance({ state, commit }) {
    try {
      const balance = await this.$provider.getBalance({ address: state.ethAccount })
      commit('SET_BALANCE', balance)

      return balance
    } catch (err) {
      throw new Error(err.message)
    }
  },
  async askPermission({ commit, dispatch, getters }, { providerName, networkName }) {
    commit('SET_PROVIDER_NAME', providerName)
    commit('SET_NETWORK_NAME', networkName)

    try {
      const provider = await getters.getEthereumProvider()
      const address = await this.$provider.initProvider(provider)

      commit('IDENTIFY', address)
      dispatch('setAddress', { address })

      const netId = await this.$provider.checkNetworkVersion()
      dispatch('onNetworkChanged', { netId })

      await dispatch('getBalance')

      this.$provider.on({
        method: 'networkChanged',
        callback: () => {
          dispatch('onNetworkChanged', { netId })
        }
      })

      this.$provider.on({
        method: 'accountsChanged',
        callback: (newAccount) => {
          onAccountsChanged({ dispatch, commit, newAccount })
        }
      })

      dispatch('token/getTokenAddress', {}, { root: true })
      dispatch('token/getTokenBalance', {}, { root: true })

      return { netId, ethAccount: address }
    } catch (err) {
      throw new Error(err.message)
    }
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
