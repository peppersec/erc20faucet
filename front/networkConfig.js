const networkConfig = {
  netId1: {
    verifyingContract: "0xfab46e002bbf0b4509813474841e0716e6730136",
    rpcCallRetryAttempt: 10,
    currencyName: "ETH",
    explorerUrl: {
      tx: "https://etherscan.io"
    },
    networkName: "Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/c7463beadf2144e68646ff049917b716",
    gasPrice: { fast: 21, low: 1, standard: 5 },
    gasOracleUrls: [
      "https://www.etherchain.org/api/gasPriceOracle",
      "https://gasprice.poa.network/"
    ],
    smartContractPollTime: 15
  },
  netId3: {
    verifyingContract: "0xfab46e002bbf0b4509813474841e0716e6730136",
    rpcCallRetryAttempt: 10,
    currencyName: "rETH",
    explorerUrl: {
      tx: "https://ropsten.etherscan.io"
    },
    networkName: "Ropsten",
    rpcUrl: "https://ropsten.infura.io/v3/c7463beadf2144e68646ff049917b716",
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15
  },
  netId4: {
    verifyingContract: "0xfab46e002bbf0b4509813474841e0716e6730136",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "RETH",
    explorerUrl: {
      tx: "https://rinkeby.etherscan.io"
    },
    networkName: "Rinkeby",
    rpcUrl: "https://rinkeby.infura.io/v3/c7463beadf2144e68646ff049917b716"
  },
  netId5: {
    verifyingContract: "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "GöETH",
    explorerUrl: {
      tx: "https://goerli.etherscan.io"
    },
    networkName: "Goerli",
    rpcUrl: "https://goerli.infura.io/v3/c7463beadf2144e68646ff049917b716"
  },
  netId42: {
    verifyingContract: "0xfab46e002bbf0b4509813474841e0716e6730136",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "kETH",
    explorerUrl: {
      tx: "https://kovan.etherscan.io"
    },
    networkName: "Kovan",
    rpcUrl: "https://kovan.infura.io/v3/c7463beadf2144e68646ff049917b716"
  },
  netId99: {
    verifyingContract: "0x8dc4f704a5fdf9f09ed561381bd02187201a83b8",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "POA",
    explorerUrl: {
      tx: "https://blockscout.com/poa/core"
    },
    networkName: "POA",
    rpcUrl: "https://core.poa.network"
  },
  netId100: {
    verifyingContract: "0x3111c94b9243a8a99d5a867e00609900e437e2c0",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "xDai",
    explorerUrl: {
      tx: "https://blockscout.com/poa/dai"
    },
    networkName: "xDai",
    rpcUrl: "https://dai.poa.network"
  },
  netId77: {
    verifyingContract: "0x3b6578d5a24e16010830bf6443bc9223d6b53480",
    rpcCallRetryAttempt: 10,
    gasPrice: { fast: 1, low: 1, standard: 1 },
    smartContractPollTime: 15,
    currencyName: "SPOA",
    explorerUrl: {
      tx: "https://blockscout.com/poa/sokol"
    },
    networkName: "Sokol",
    rpcUrl: "https://sokol.poa.network"
  },
  netId56: {
    verifyingContract: "0x5CD5Bb3EC13CE31771b63632Ddc2EB36E300b96C",
    rpcCallRetryAttempt: 10,
    currencyName: "BNB",
    explorerUrl: {
      tx: "https://bscscan.com"
    },
    networkName: "BNB Smart Chain",
    rpcUrl: "https://bsc-dataseed1.binance.org",
    gasPrice: { fast: 20, low: 20, standard: 20 },
    smartContractPollTime: 15
  }
};

export default networkConfig;
