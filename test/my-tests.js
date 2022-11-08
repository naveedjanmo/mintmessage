const { expect } = require('chai');
const hre = require('hardhat');

describe('MintMessage Contract', async function () {
  it('Should create and send message NFTs', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();

    // Pick accounts 0 and 1
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // run create token, passing URI and recipient
    await mintMessage
      .connect(owner)
      .createToken('https://www.mytokenlocation.com', otherAccount.address);
  });

  it('Should only allow the owner to update the mint price', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // Update mint price as account 0
    await mintMessage.connect(owner).updateMintPrice(1 ^ 18);

    // Update mint price as account 1
    await expect(
      mintMessage.connect(otherAccount).updateMintPrice(1 ^ 18)
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
