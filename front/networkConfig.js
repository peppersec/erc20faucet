const networkConfig = {
  netId1: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://etherscan.io/tx',
      address: 'https://etherscan.io/address'
    },
    networkName: 'Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.infuraId}`,
    gasPrice: { fast: 21, low: 1, standard: 5 },
    smartContractPollTime: 15,
    isEIP1559Supported: true
  },
  netId3: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    currencyName: 'rETH',
    explorerUrl: {
      tx: 'https://ropsten.etherscan.io/tx',
      address: 'https://ropsten.etherscan.io/address'
    },
    networkName: 'Ropsten',
    rpcUrl: `https://ropsten.infura.io/v3/${process.env.infuraId}`,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: true
  },
  netId4: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    currencyName: 'RETH',
    explorerUrl: {
      tx: 'https://rinkeby.etherscan.io/tx',
      address: 'https://rinkeby.etherscan.io/address'
    },
    networkName: 'Rinkeby',
    rpcUrl: `https://rinkeby.infura.io/v3/${process.env.infuraId}`,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: true
  },
  netId5: {
    verifyingContract: '0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc',
    rpcCallRetryAttempt: 10,
    currencyName: 'GöETH',
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx',
      address: 'https://goerli.etherscan.io/address'
    },
    networkName: 'Goerli',
    rpcUrl: `https://goerli.infura.io/v3/${process.env.infuraId}`,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: true
  },
  netId42: {
    verifyingContract: '0xfab46e002bbf0b4509813474841e0716e6730136',
    rpcCallRetryAttempt: 10,
    currencyName: 'kETH',
    explorerUrl: {
      tx: 'https://kovan.etherscan.io/tx',
      address: 'https://kovan.etherscan.io/address'
    },
    networkName: 'Kovan',
    rpcUrl: `https://kovan.infura.io/v3/${process.env.infuraId}`,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: true
  },
  netId10: {
    verifyingContract: '0x5c239f4E539452f58A55E3d5Be1dC016b0809a19',
    rpcCallRetryAttempt: 10,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://optimistic.etherscan.io/tx',
      address: 'https://optimistic.etherscan.io/address'
    },
    networkName: 'Optimism',
    rpcUrl: `https://mainnet.optimism.io`,
    gasPrice: { fast: 0.001, low: 0.001, standard: 0.001 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId99: {
    verifyingContract: '0x8dc4f704a5fdf9f09ed561381bd02187201a83b8',
    rpcCallRetryAttempt: 10,
    currencyName: 'POA',
    explorerUrl: {
      tx: 'https://blockscout.com/poa/core/tx',
      address: 'https://blockscout.com/poa/core/address'
    },
    networkName: 'POA',
    rpcUrl: 'https://core.poa.network',
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId100: {
    verifyingContract: '0x3111c94b9243a8a99d5a867e00609900e437e2c0',
    rpcCallRetryAttempt: 10,
    currencyName: 'xDai',
    explorerUrl: {
      tx: 'https://blockscout.com/xdai/mainnet/tx',
      address: 'https://blockscout.com/xdai/mainnet/address'
    },
    networkName: 'Gnosis Chain (formerly xDai)',
    rpcUrl: 'https://dai.poa.network',
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId77: {
    verifyingContract: '0x3b6578d5a24e16010830bf6443bc9223d6b53480',
    rpcCallRetryAttempt: 10,
    currencyName: 'SPOA',
    explorerUrl: {
      tx: 'https://blockscout.com/poa/sokol/tx',
      address: 'https://blockscout.com/poa/sokol/address'
    },
    networkName: 'Sokol',
    rpcUrl: 'https://sokol.poa.network',
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId56: {
    verifyingContract: '0x5CD5Bb3EC13CE31771b63632Ddc2EB36E300b96C',
    rpcCallRetryAttempt: 10,
    currencyName: 'BNB',
    explorerUrl: {
      tx: 'https://bscscan.com/tx',
      address: 'https://bscscan.com/address'
    },
    networkName: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    gasPrice: { fast: 20, low: 20, standard: 20 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId43114: {
    verifyingContract: '0xb816d2Bd3FFEf8CA2E65E5F7E0695351b733C4f3',
    rpcCallRetryAttempt: 10,
    currencyName: 'AVAX',
    explorerUrl: {
      tx: 'https://snowtrace.io/tx',
      address: 'https://snowtrace.io/address'
    },
    networkName: 'Avalanche C Chain',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    gasPrice: { fast: 35, low: 25, custom: 25, standard: 25 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId250: {
    verifyingContract: '0x5CD5Bb3EC13CE31771b63632Ddc2EB36E300b96C',
    rpcCallRetryAttempt: 10,
    currencyName: 'FTM',
    explorerUrl: {
      tx: 'https://ftmscan.com/tx',
      address: 'https://ftmscan.com/address'
    },
    networkName: 'Fantom Opera',
    rpcUrl: 'https://rpcapi.fantom.network',
    gasPrice: { fast: 22, low: 22, standard: 22 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId137: {
    verifyingContract: '0xb816d2Bd3FFEf8CA2E65E5F7E0695351b733C4f3',
    rpcCallRetryAttempt: 10,
    currencyName: 'MATIC',
    explorerUrl: {
      tx: 'https://polygonscan.com/tx',
      address: 'https://polygonscan.com/address'
    },
    networkName: 'Polygon(Matic) Network',
    rpcUrl: 'https://polygon-rpc.com/',
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId4689: {
    verifyingContract: '0x02D61e81A645093237C7e38200E16B78e1602Db3',
    rpcCallRetryAttempt: 10,
    currencyName: 'IOTX',
    explorerUrl: {
      tx: 'https://iotexscan.io/action',
      address: 'https://iotexscan.io/address'
    },
    networkName: 'IoTeX',
    rpcUrl: 'https://babel-api.mainnet.iotex.io',
    gasPrice: { fast: 1000, low: 1000, custom: 1000, standard: 1000 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId1285: {
    verifyingContract: '0xf19aCf82eA96ab197139852cb81e726bd6ddf882',
    rpcCallRetryAttempt: 10,
    currencyName: 'MOVR',
    explorerUrl: {
      tx: 'https://moonriver.moonscan.io/tx',
      address: 'https://moonriver.moonscan.io/address'
    },
    networkName: 'Moonriver',
    rpcUrl: 'https://rpc.moonriver.moonbeam.network',
    gasPrice: { fast: 1, low: 1, custom: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId42161: {
    verifyingContract: '0x84952D54882614C392Baeff5CB0332CC551ca119',
    rpcCallRetryAttempt: 10,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://arbiscan.io/tx',
      address: 'https://arbiscan.io/address'
    },
    networkName: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    gasPrice: { fast: 1.456826792, low: 1.456826792, custom: 1.456826792, standard: 1.456826792 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId421611: {
    verifyingContract: '0x9f95e683fa8f4824fe9f2c8e740809d71b073f4b',
    rpcCallRetryAttempt: 10,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://rinkeby-explorer.arbitrum.io/tx',
      address: 'https://rinkeby-explorer.arbitrum.io/address'
    },
    networkName: 'Arbitrum Testnet Rinkeby',
    rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
    gasPrice: { fast: 0.0202, low: 0.0202, custom: 0.0202, standard: 0.0202 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId25: {
    verifyingContract: '0xb94c3fC62B605B1C587EA5D53cc218eD9b5a6C1C',
    rpcCallRetryAttempt: 10,
    currencyName: 'CRO',
    explorerUrl: {
      tx: 'https://cronos.crypto.org/explorer/tx',
      address: 'https://cronos.crypto.org/explorer/address'
    },
    networkName: 'Cronos',
    rpcUrl: 'https://evm.crypto.org',
    gasPrice: { fast: 6000, low: 4500, custom: 6000, standard: 4500 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId128: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'HT',
    explorerUrl: {
      tx: 'https://hecoinfo.com/tx',
      address: 'https://hecoinfo.com/address'
    },
    networkName: 'Huobi ECO Chain',
    rpcUrl: 'https://http-mainnet.hecochain.com',
    gasPrice: { fast: 5, low: 1, custom: 3, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId66: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'OKT',
    explorerUrl: {
      tx: 'https://www.oklink.com/oec/tx',
      address: 'https://www.oklink.com/oec/address'
    },
    networkName: 'OKExChain',
    rpcUrl: 'https://exchainrpc.okex.org',
    gasPrice: { fast: 10, low: 1, custom: 3, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId321: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'KCS',
    explorerUrl: {
      tx: 'https://explorer.kcc.io/en/tx',
      address: 'https://explorer.kcc.io/en/address'
    },
    networkName: 'KCC Mainnet',
    rpcUrl: 'https://rpc-mainnet.kcc.network',
    gasPrice: { fast: 10, low: 1, custom: 2, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId42220: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'CELO',
    explorerUrl: {
      tx: 'https://explorer.celo.org/tx',
      address: 'https://explorer.celo.org/address'
    },
    networkName: 'Celo',
    rpcUrl: 'https://forno.celo.org',
    gasPrice: { fast: 2, low: 0.1, custom: 1, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId1666600000: {
    verifyingContract: '0x6fee5953b581b8496E63c73374c32a0A7F9350B4',
    rpcCallRetryAttempt: 10,
    currencyName: 'ONE',
    explorerUrl: {
      tx: 'https://explorer.harmony.one/tx',
      address: 'https://explorer.harmony.one/address'
    },
    networkName: 'Harmony Mainnet',
    rpcUrl: 'https://api.harmony.one',
    gasPrice: { fast: 5, low: 1, custom: 2, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId55: {
    verifyingContract: '0x2299D9fE56488d7b3EAFA4a1E7a081c8Eb4c4b0a',
    rpcCallRetryAttempt: 10,
    currencyName: 'ZYX',
    explorerUrl: {
      tx: 'https://zyxscan.com/tx',
      address: 'https://zyxscan.com/address'
    },
    networkName: 'Zyx',
    rpcUrl: 'https://rpc-1.zyx.network/',
    gasPrice: { fast: 15, low: 9, custom: 10, standard: 10 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId40: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'TLOS',
    explorerUrl: {
      tx: 'https://www.teloscan.io/evm/transaction',
      address: 'https://www.teloscan.io/evm/address'
    },
    networkName: 'Telos EVM',
    rpcUrl: 'https://mainnet.telos.net/evm',
    gasPrice: { fast: 600, low: 499.9, custom: 500, standard: 499.9 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId1284: {
    verifyingContract: '0xC4fc619bBa4572656606bc7Fdc0874d481EBebDE',
    rpcCallRetryAttempt: 10,
    currencyName: 'GLMR',
    explorerUrl: {
      tx: 'https://moonbeam.moonscan.io/tx',
      address: 'https://moonbeam.moonscan.io/address'
    },
    networkName: 'Moonbeam',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    gasPrice: { fast: 100, low: 100, custom: 100, standard: 100 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId1088: {
    verifyingContract: '0x0C3f22c3AFc5D222c4f6B34Ef901D468B1866948',
    rpcCallRetryAttempt: 10,
    currencyName: 'Metis',
    explorerUrl: {
      tx: 'https://andromeda-explorer.metis.io/tx',
      address: 'https://andromeda-explorer.metis.io/address'
    },
    networkName: 'Metis',
    rpcUrl: 'https://andromeda.metis.io/?owner=1088',
    gasPrice: { fast: 8, low: 8, custom: 8, standard: 8 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId1313161554: {
    verifyingContract: '0xb94c3fC62B605B1C587EA5D53cc218eD9b5a6C1C',
    rpcCallRetryAttempt: 10,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://aurorascan.dev/tx',
      address: 'https://aurorascan.dev/address'
    },
    networkName: 'Aurora',
    rpcUrl: 'https://mainnet.aurora.dev',
    gasPrice: { fast: 0.5, low: 0.01, custom: 0.3, standard: 0.05 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId108: {
    verifyingContract: '0x4e96Ae2DE48AB986B496942533E6aF3Ee9C275a5',
    rpcCallRetryAttempt: 10,
    currencyName: 'TT',
    explorerUrl: {
      tx: 'https://scan.thundercore.com/transactions',
      address: 'https://scan.thundercore.com/address'
    },
    networkName: 'ThunderCore',
    rpcUrl: 'https://mainnet-rpc.thundercore.com',
    gasPrice: { fast: 20, low: 2, custom: 2, standard: 1 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  },
  netId79: {
    verifyingContract: '0x601280b038d8663204D2E7869730D67d061665Fa',
    rpcCallRetryAttempt: 15,
    currencyName: 'ZENITH',
    explorerUrl: {
      tx: 'https://scan.zenithchain.co/tx',
      address: 'https://scan.zenithchain.co/address'
    },
    networkName: 'Zenith Mainnet',
    rpcUrl: 'https://dataserver-1.zenithchain.co',
    gasPrice: { fast: 5, low: 1, custom: 2, standard: 1.5 },
    smartContractPollTime: 15,
    isEIP1559Supported: false
  }
}

export default networkConfig
