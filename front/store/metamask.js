import Web3 from 'web3'
import { toChecksumAddress, fromWei, isAddress, hexToNumberString } from 'web3-utils'
import networkConfig from '@/networkConfig'

const onAccountsChanged = ({ newAccount, commit }) => {
  const account = toChecksumAddress(newAccount[0])
  commit('IDENTIFY', account)
}

const web3Instance = (rpcUrl) => {
  return Object.freeze(new Web3(rpcUrl))
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
    }
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
  web3: (state, getters) => () => {
    const { rpcUrl } = getters.networkConfig
    return web3Instance(rpcUrl)
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
  getMyBalance({ dispatch, state, getters }) {
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
  askPermission({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        const ethereum = window.ethereum
        try {
          const ethAccounts = await ethereum.enable()
          if (ethAccounts.length === 0) {
            reject(new Error('lockedMetamask'))
          }
          const netId = await dispatch('sendAsync', {
            method: 'net_version',
            params: [],
            callbackAction: 'metamask/onNetworkChanged'
          })

          dispatch('onNetworkChanged', { netId })
          const account = toChecksumAddress(ethAccounts[0])
          commit('IDENTIFY', account)
          dispatch('setAddress', { address: account })
          if (ethereum.on) {
            ethereum.on('accountsChanged', newAccount =>
              onAccountsChanged({ dispatch, commit, newAccount })
            )
            ethereum.on('networkChanged', netId =>
              dispatch('onNetworkChanged', { netId })
            )
          }
          let balance = await dispatch('getMyBalance')
          balance = hexToNumberString(balance)
          commit('SET_BALANCE', balance)
          dispatch('token/getTokenAddress', {}, { root: true })
          dispatch('token/getTokenBalance', {}, { root: true })
          resolve({ netId, ethAccount: ethAccounts[0] })
        } catch (error) {
          // User rejects approval from metamask
          reject(error)
        }
      } else {
        // User doesnot have metamask
        reject(new Error('noMetamask'))
      }
    })
  },

  sendAsync({ state, getters }, { method, from, params }) {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum.sendAsync({
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
      } else {
        reject(new Error('noMetamask'))
      }
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
