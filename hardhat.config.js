require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  defaultNetwork: 'hardhat',
  networks: {
    // hardhat: {
    //   chainId: 31337,
    // },
    // goerli: {
    //   url: process.env.GOERLI_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    //   gasPrice: 80000000000, // in wei,
    // },
    mainnet: {
      chainId: 1,
      url: process.env.MAINNET_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 13000000000, // in wei,
    },
  },
  solidity: {
    compilers: [{ version: '0.8.17' }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
