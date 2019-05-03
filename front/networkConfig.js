const networkConfig = {
  netId1: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    gasPrice: 21,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://etherscan.io/tx'
    },
    networkName: 'Mainnet',
    rpcUrl: 'https://mainnet.infura.io'
  },
  netId3: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    gasPrice: 21,
    currencyName: 'rETH',
    explorerUrl: {
      tx: 'https://ropsten.etherscan.io/tx'
    },
    networkName: 'Ropsten',
    rpcUrl: 'https://ropsten.infura.io'
  },
  netId4: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'RETH',
    explorerUrl: {
      tx: 'https://rinkeby.etherscan.io/tx'
    },
    networkName: 'Rinkeby',
    rpcUrl: 'https://rinkeby.infura.io'
  },
  netId5: {
    verifyingContract: '0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'GöETH',
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx'
    },
    networkName: 'Görli'
  },
  netId42: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'kETH',
    explorerUrl: {
      tx: 'https://kovan.etherscan.io/tx'
    },
    networkName: 'Kovan',
    rpcUrl: 'https://kovan.infura.io'
  },
  netId99: {
    verifyingContract: '0x8dc4f704a5fdf9f09ed561381bd02187201a83b8',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'POA',
    explorerUrl: {
      tx: 'https://blockscout.com/poa/core/tx/'
    },
    networkName: 'POA network',
    rpcUrl: 'https://core.poa.network'
  },
  netId100: {
    verifyingContract: '0x3111c94b9243a8a99d5a867e00609900e437e2c0',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'xDai',
    explorerUrl: {
      tx: 'https://blockscout.com/poa/dai/tx/'
    },
    networkName: 'xDai network',
    rpcUrl: 'https://dai.poa.network'
  },
  netId77: {
    verifyingContract: '0x3b6578d5a24e16010830bf6443bc9223d6b53480',
    rpcCallRetryAttempt: 10,
    gasPrice: 1,
    currencyName: 'SPOA',
    explorerUrl: {
      tx: 'https://blockscout.com/poa/sokol/tx/'
    },
    networkName: 'Sokol network',
    rpcUrl: 'https://sokol.poa.network'
  }
}

export default networkConfig
