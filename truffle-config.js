const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
// 0x5F3313814F7FB3E11C4a240141689BA9933c5607
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
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
}
