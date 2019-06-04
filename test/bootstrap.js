/* eslint-disable no-console */
const { spawn, spawnSync, exec } = require('child_process')
const http = require('http')
const puppeteer = require('puppeteer')
const dappeteer = require('dappeteer')
const { before, after } = require('mocha')
const Web3 = require('web3')

function timeout(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const opts = {
  headless: false,
  timeout: 0,
  args: ['--start-maximized', '--window-size=1920,1040']
}

before(async () => {
  exec('sh ./kill.sh')
  // exec('sh ./testSetup/kill.sh')
  const isAppStarted = await new Promise(resolve =>
    http.get('http://localhost:3000', () => resolve(true)).on('error', () => resolve(false))
  )

  global.ganacheProcess = spawn(
    'npx',
    ['ganache-cli', '--deterministic', '-p', '8545', '-i', '333', '--gasLimit', '0x4A817C800']
    // { stdio: 'inherit', shell: true }
  )
  console.log('BEFORE ', global.ganacheProcess.pid)
  // await timeout(5000)
  spawnSync('npx', ['truffle', 'migrate', '--reset', '--network', 'test'], {
    stdio: 'inherit'
  })

  global.web3 = new Web3('http://localhost:8545', null, {
    transactionConfirmationBlocks: 1,
    defaultAccount: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
    defaultGas: 2000000,
    defaultGasPrice: '1000000000'
  })
  const TokenMock = require('../build/contracts/FaucetToken.json')
  global.tokenContract = await new global.web3.eth.Contract(TokenMock.abi, null, {
    data: TokenMock.bytecode
  })
    .deploy()
    .send()

  global.browser = await dappeteer.launch(puppeteer, opts)
  global.metamask = await dappeteer.getMetamask(global.browser, {
    seed: 'YOUR SEED'
  })
  await global.metamask.switchNetwork('kovan')
})

after(async () => {
  await global.browser.close()
  global.ganacheProcess.kill('SIGKILL')
  if (global.appProcess) {
    global.appProcess.kill('SIGKILL')
  }
  exec('sh ./test/kill.sh')
  await timeout(2000)
})
