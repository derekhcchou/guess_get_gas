const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
<<<<<<< HEAD
// 0x5F3313814F7FB3E11C4a240141689BA9933c5607
module.exports = {
  networks: {
    development: {
      host: "localhost",
=======

const mnemonic = process.env.MNEMONIC
const url = process.env.RPC_URL

module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
>>>>>>> 73440abfcac136ff70616dc56bb992cad8d20f76
      port: 7545,
      network_id: '5777',
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url)
      },
      network_id: '42',
      skipDryRun: true
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url)
      },
      network_id: '4',
      skipDryRun: true
    },
  },
  contracts_build_directory: './src/abis',
  compilers: {
    solc: {
      version: '0.6.6',
    },
<<<<<<< HEAD
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_RPC_URL)
      },
      network_id: "4"
    }
  },
  compilers: {
    solc: {
      version: '0.6.12',
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ]
=======
  },
>>>>>>> 73440abfcac136ff70616dc56bb992cad8d20f76
}
