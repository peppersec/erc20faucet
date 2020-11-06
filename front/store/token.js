/* eslint-disable no-console */
import { fromWei, toHex, toWei, numberToHex, hexToNumberString } from 'web3-utils'
import ABI from '@/abis/ERC20.abi.json'
import networkConfig from '@/networkConfig'

const state = () => {
  return {
    address: null,
    balance: '0',
    txs: []
  }
}

const getters = {}

const mutations = {
  SET_TOKEN_ADDRESS(state, address) {
    state.address = address
  },
  SET_TOKEN_BALANCE(state, balance) {
    state.balance = fromWei(balance)
  },
  ADD_TX(state, txHash) {
    state.txs.push(txHash)
  }
}

const actions = {
  async getTokenBalance({ rootState, commit }) {
    try {
      const { ethAccount, netId } = rootState.metamask
      const { verifyingContract } = networkConfig[`netId${netId}`]

      const tokenInstance = new this.$provider.web3.eth.Contract(ABI, verifyingContract, {
        from: ethAccount
      })

      const data = tokenInstance.methods.balanceOf(ethAccount).encodeABI()

      const callParams = {
        method: 'eth_call',
        params: [{
          from: ethAccount,
          to: tokenInstance._address,
          data
        }, 'latest']
      }

      const balance = await this.$provider.sendRequest(callParams)

      commit('SET_TOKEN_BALANCE', hexToNumberString(balance))
    } catch (err) {
      throw new Error(err.message)
    }
  },

  getTokenAddress({ rootState, commit }) {
    try {
      const { ethAccount, netId } = rootState.metamask
      const { verifyingContract } = networkConfig[`netId${netId}`]

      const tokenInstance = new this.$provider.web3.eth.Contract(ABI, verifyingContract, {
        from: ethAccount
      })

      commit('SET_TOKEN_ADDRESS', tokenInstance._address)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async mintTokens({ state, getters, rootState, rootGetters, dispatch, commit }, { to, amount }) {
    try {
      amount = amount.toString()
      const gasPrice = rootState.metamask.gasPrice.standard

      const { ethAccount, netId } = rootState.metamask
      const { verifyingContract } = networkConfig[`netId${netId}`]

      const tokenInstance = new this.$provider.web3.eth.Contract(ABI, verifyingContract, {
        from: ethAccount
      })

      const data = tokenInstance.methods.mint(to, toWei(amount)).encodeABI()
      const gas = await tokenInstance.methods.mint(to, toWei(amount)).estimateGas()

      const callParams = {
        method: 'eth_sendTransaction',
        params: [{
          from: ethAccount,
          to: tokenInstance._address,
          gas: numberToHex(gas + 100000),
          gasPrice: toHex(toWei(gasPrice.toString(), 'gwei')),
          value: 0,
          data
        }]
      }

      const txHash = await this.$provider.sendRequest(callParams)
      commit('ADD_TX', txHash)
    } catch (err) {
      throw new Error(err.message)
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
