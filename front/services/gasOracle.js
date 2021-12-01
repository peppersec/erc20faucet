import { GasPriceOracle } from 'gas-price-oracle'

const SECONDS = 3
const TIMEOUT = SECONDS * 1000

export async function getGasPrice(chainId, rpcUrl, defaultFallbackGasPrices) {
  const instance = new GasPriceOracle({ chainId, timeout: TIMEOUT, defaultRpc: rpcUrl, defaultFallbackGasPrices })
  const result = await instance.gasPrices()

  return result
}
