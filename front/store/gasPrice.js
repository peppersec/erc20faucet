/* eslint-disable no-console */

import { toWei, toHex } from 'web3-utils'
import { getGasPrice, estimateFees } from '../services'

const actions = {
  async fetchGasPrice({ rootGetters }) {
    try {
      const netId = rootGetters['metamask/netId']
      const networkConfig = rootGetters['metamask/networkConfig']

      const gasPrices = await getGasPrice(netId, networkConfig.rpcUrl, networkConfig.gasPrice)
      return toHex(toWei(gasPrices.fast.toString(), 'gwei'))
    } catch (err) {
      throw new Error(err.message)
    }
  },
  async gasWatcher({ commit, dispatch, rootGetters }) {
    const TIME_OUT = 15
    const networkConfig = rootGetters['metamask/networkConfig']

    try {
      if (networkConfig.isEIP1559Supported) {
        const { maxFeePerGas, maxPriorityFeePerGas } = await estimateFees(networkConfig.rpcUrl)

        commit('SET_GAS_PARAMS', { maxFeePerGas, maxPriorityFeePerGas })
      } else {
        const gasPrice = await dispatch('fetchGasPrice')

        commit('SET_GAS_PARAMS', { gasPrice })
      }
    } catch (err) {
      commit('SET_GAS_PARAMS', { gasPrice: networkConfig.gasPrice.fast })
      console.log('Get gas price error: ', err.message)
    } finally {
      setTimeout(() => dispatch('gasWatcher'), TIME_OUT * 1000)
    }
  }
}

const mutations = {
  SET_GAS_PARAMS(state, gasParams) {
    state.gasParams = gasParams
  }
}

const getters = {}

const state = () => {
  return {
    gasParams: {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
