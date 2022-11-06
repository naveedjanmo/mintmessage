const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const MintMessage = await hre.ethers.getContractFactory('MintMessage');
  const mintMessage = await MintMessage.deploy();
  await mintMessage.deployed();
  console.log('mintMessage deployed to:', mintMessage.address);

  fs.writeFileSync(
    './src/utils/config.js',
    `
  export const mintMessageAddress = "${mintMessage.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
