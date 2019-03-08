import Web3 from 'web3'
import Web3Utils from 'web3-utils'
import ABI from '@/abis/ERC20.abi.json'
import networkConfig from '@/networkConfig'

window.onbeforeunload = function() {
  return "Prevent reload"
}

const onAccountsChanged = ({newAccount, commit}) => {
  const account = Web3Utils.toChecksumAddress(newAccount[0])
  commit('IDENTIFY', account)
}

const state = {
  ethAccount: null,
  web3Ethereum: () => ({
    ethereum: {},
  }),
  netId: 1,
  domainData: {},
  tokenInstance: () => ({
    tokenInstance: {}
  }),
  balance: '0',
  tokenBalance: '0',
  txs: []
}

const getters = {
  hasEthAccount(state) {
    return state.ethAccount !== null
  },
  netId(state) {
    return state.netId
  },
  networkName(state) {
    return networkConfig[`netId${state.netId}`].networkName
  },
  networkConfig(state) {
    return networkConfig[`netId${state.netId}`]
  }
}

const mutations = {
  IDENTIFY(state, ethAccount) {
    state.ethAccount = ethAccount
  },
  SET_WEB3_ETH(state, web3Ethereum) {
    state.web3Ethereum = web3Ethereum
  },
  SET_NET_ID(state, netId) {
    netId = parseInt(netId,10)
    state.netId = netId
  },
  SET_TOKEN_CONTRACT_INSTANCE(state, {ethereum, ethAccount, netId}) {
    const {verifyingContract} = networkConfig[`netId${netId}`]
    const web3 = new Web3(ethereum)
    const tokenInstance = new web3.eth.Contract(ABI, verifyingContract, {
      from: ethAccount
    })
    state.tokenInstance = () => tokenInstance
  },
  SAVE_BALANCE(state, balance) {
    state.balance = Web3Utils.fromWei(balance)
  },
  SAVE_TOKEN_BALANCE(state, balance) {
    state.tokenBalance = Web3Utils.fromWei(balance)
  },
  ADD_TX(state, txHash) {
    state.txs.push(txHash)
  }
}

const actions = {
  onNetworkChanged({commit}, {netId}) {
    commit('SET_NET_ID', netId)
  },
  async getMyBalance({dispatch, state, getters}) {
    const {rpcCallRetryAttempt} = getters.networkConfig
    return new Promise(async (res, rej) => {
      const checkBalance = async ({retryAttempt = 1}) => {
        retryAttempt++
        try {
          const methodCallParams = {
            method: 'eth_getBalance',
            params: [state.ethAccount, "latest"]
          }

          const balance = await dispatch(
            'metamask/sendAsync',
            methodCallParams,
            {root: true}
          )
          res(balance)
        } catch(e) {
          if(retryAttempt >= rpcCallRetryAttempt){
            rej({message: `rpcError ${e}`})
          } else {
            checkBalance({retryAttempt})
          }
        }
      }
      checkBalance({})
    })
  },
  async askPermission({commit, dispatch}) {
    return new Promise(async (res, rej) => {
      if (window.ethereum) {
        const ethereum = window.ethereum
        try {
          const ethAccounts = await ethereum.enable()
          if(ethAccounts.length === 0){
            rej({ message: 'lockedMetamask' })
          }
          commit('SET_WEB3_ETH', () => ethereum)
          const netId = await dispatch('sendAsync', {
            method: 'net_version',
            params: [],
            callbackAction: 'metamask/onNetworkChanged'
          })
          commit('SET_TOKEN_CONTRACT_INSTANCE', {ethereum, ethAccount: ethAccounts[0], netId})
          dispatch('onNetworkChanged', {netId})
          const account = Web3Utils.toChecksumAddress(ethAccounts[0])
          commit('IDENTIFY', account)
          if(ethereum.on){
            ethereum.on('accountsChanged',
              (newAccount) => onAccountsChanged({dispatch, commit, newAccount})
            )
            ethereum.on('networkChanged',
              (netId) => dispatch('onNetworkChanged', {netId})
            )
          }
          let balance = await dispatch('getMyBalance')
          balance = Web3Utils.hexToNumberString(balance)
          dispatch('saveUserBalance', {balance})
          dispatch('getTokenBalance')
          res({netId, ethAccount: ethAccounts[0]})
        } catch (error) {
          // User rejects approval from metamask
          rej(error)
        }
      } else {
        // User doesnot have metamask
        let link = '<a href="https://metamask.io" target="_blank">Metamask</a>'
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i) ) {
          link = '<a href="https://trustwallet.com" target="_blank">TrustWallet</a>'
        }

        // this._vm.$message({
        //   dangerouslyUseHTMLString: true,
        //   duration: 0,
        //   type: 'error',
        //   message: `${i18n.t('pleaseInstall')} ${link} ${i18n.t('toPlayTheGame')}`
        // });
        rej({message: 'noMetamask'})
      }
    })
  },

  saveUserBalance({commit}, {balance}) {
      commit('SAVE_BALANCE', balance)
  },

  async getTokenBalance({state, dispatch, commit}) {
    const {hexToNumberString} = Web3Utils
    const {ethAccount, tokenInstance} = state
    const data = tokenInstance().methods.balanceOf(ethAccount).encodeABI()
    const callParams = {
      method: 'eth_call',
      params: [{
        from: ethAccount,
        to: tokenInstance()._address,
        data
      }],
      from: ethAccount,
    }
    let balance = await dispatch('sendAsync', callParams)
    balance = hexToNumberString(balance)
    commit('SAVE_TOKEN_BALANCE', balance)
    setTimeout(() => { dispatch('getTokenBalance') }, 3000)
  },

  async mintTokens({state, dispatch, getters, commit}, {to, amount}) {
    amount = amount.toString()
    const {toHex, toWei, numberToHex} = Web3Utils
    const {gasPrice} = getters.networkConfig
    const {ethAccount, tokenInstance} = state
    const data = tokenInstance().methods.mint(to, toWei(amount)).encodeABI()
    const gas = await tokenInstance().methods.mint(to, toWei(amount)).estimateGas()
    const callParams = {
      method: 'eth_sendTransaction',
      params: [{
        from: ethAccount,
        to: tokenInstance()._address,
        gas: numberToHex(gas + 100000),
        gasPrice: toHex(toWei(gasPrice.toString(), 'gwei')),
        value: 0,
        data
      }],
      from: ethAccount,
    }
    const txHash = await dispatch('sendAsync', callParams)
    commit('ADD_TX', txHash)
  },

  sendAsync({state},{
    method, from, params,
  }) {
    return new Promise((res, rej) => {
      state.web3Ethereum().sendAsync({
        method,
        params,
        jsonrpc: "2.0",
        from
      }, (err, response) => {
        if (err) {
          rej(err)
        }
        if(response.error) {
          rej(response.error)
        } else {
          res(response.result)
        }
      })
    })
  },
  async waitForTxReceipt({dispatch, getters}, {txHash}) {
    const {rpcCallRetryAttempt} = getters.networkConfig
    return new Promise((resolve, reject) => {
      const checkForTx = async ({txHash, retryAttempt = 0}) => {
        const callParams = {
          method: "eth_getTransactionReceipt",
          params: [txHash]
        }
        const result = await dispatch('sendAsync', callParams)
        if(!result || !result.blockNumber) {
          if(retryAttempt <= rpcCallRetryAttempt){
            retryAttempt++
            setTimeout(() => {
              checkForTx({ txHash, retryAttempt })
            }, 1000 * retryAttempt)
          } else {
            reject({message: 'txNotMined'})
          }
        } else {
          // callback with success
          resolve(result)
        }
      }
      checkForTx({txHash})
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
