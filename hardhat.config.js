require('dotenv').config()
require('@nomiclabs/hardhat-ethers')

const { HARDHAT_NETWORK, ALCHEMY_URL } = process.env
if (!ALCHEMY_URL && (!HARDHAT_NETWORK || HARDHAT_NETWORK == 'hardhat')) {
  throw new Error(`ALCHEMY_URL required, add to .env file`)
}

const compilerSettings = {
  optimizer: {
    enabled: true,
    runs: 800
  },
  metadata: { bytecodeHash: 'none' }
}

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: '1000000000000000000000000000', // 1 billion ETH
        mnemonic: ''
      },
      allowUnlimitedContractSize: true,
      forking: {
        url: ALCHEMY_URL || ''
      },
      chainId: 1
    },
    local: {
      url: process.env.RPC_URL || 'http://localhost:8545',
      accounts: {
        mnemonic: ''
      }
    },
    rinkeby: {
      url: process.env.RPC_URL,
      accounts: {
        mnemonic: ''
      }
    },
    mainnet: {
      url: process.env.RPC_URL,
      accounts: {
        mnemonic: ''
      }
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.10',
        settings: compilerSettings
      },
      {
        version: '0.7.6',
        settings: compilerSettings
      }
    ]
  }
}