/* eslint-disable no-console */
import { fromWei, toWei, numberToHex, hexToNumberString } from 'web3-utils'
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
          data,
          from: ethAccount,
          to: tokenInstance._address
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

  async mintTokens({ state, getters, rootState, rootGetters, dispatch, commit }, { to, amount, gasParams }) {
    try {
      amount = amount.toString()
      if (!gasParams) {
        gasParams = rootState.gasPrice.gasParams
      }

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
          data,
          value: '0x0',
          from: ethAccount,
          to: tokenInstance._address,
          gas: numberToHex(gas + 100000),
          ...gasParams
        }]
      }

      const txHash = await this.$provider.sendRequest(callParams)
      commit('ADD_TX', txHash)
    } catch (err) {
      if (err.message.includes('EIP-1559')) {
        const gasPrice = await dispatch('gasPrice/fetchGasPrice', {}, { root: true })

        await dispatch('mintTokens', { to, amount, gasParams: { gasPrice } })
      } else {
        throw new Error(err.message)
      }
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
