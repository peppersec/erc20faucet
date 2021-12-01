import { numberToHex, BN } from 'web3-utils'
import { estimateFees as estimate } from '@mycrypto/gas-estimation'

export async function estimateFees(rpcUrl) {
  const { maxFeePerGas, maxPriorityFeePerGas } = await estimate(rpcUrl)

  return {
    maxFeePerGas: numberToHex(new BN(maxFeePerGas).toNumber()),
    maxPriorityFeePerGas: numberToHex(new BN(maxPriorityFeePerGas).toNumber())
  }
}
