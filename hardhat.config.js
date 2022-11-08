require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_KEY,
  },
  defaultNetwork: 'hardhat',
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    goerli: {
      url: process.env.GOERLI_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    // mainnet: {
    //   chainId: 1,
    //   url: process.env.PROD_ALCHEMY_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  solidity: {
    compilers: [{ version: '0.8.4' }, { version: '0.8.17' }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
