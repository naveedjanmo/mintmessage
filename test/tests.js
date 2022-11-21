const { expect } = require('chai');
const hre = require('hardhat');

describe('MintMessage Contract', async function () {
  it('Should create and send message to recipient', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient.address
      );

    expect(await mintMessage.balanceOf(recipient.address)).to.equal(1);
  });

  it('Should emit event on mint', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    expect(
      await mintMessage
        .connect(creator)
        .createMessage(
          'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
          recipient.address
        )
    )
      .to.emit(mintMessage, 'CreateMessage')
      .withArgs(creator, recipient.address, 0);

    expect(await mintMessage.balanceOf(recipient.address)).to.equal(1);
  });

  it('Should concatenate tokenURI correctly', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient.address
      );

    expect(await mintMessage.tokenURI(0)).to.equal(
      'https://ipfs.io/ipfs/QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt'
    );
  });

  it('Should burn message', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient.address
      );

    await mintMessage.connect(recipient).burn(0);
    expect(await mintMessage.balanceOf(recipient.address)).to.equal(0);
  });

  it('Should revert if not token owner tries to burn message', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient.address
      );

    await expect(mintMessage.connect(creator).burn(0)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    );
  });

  it('Should mint to self', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        creator.address
      );

    expect(await mintMessage.balanceOf(creator.address)).to.equal(1);
  });

  it('Should transfer between accounts', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient1, recipient2] =
      await hre.ethers.getSigners();

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient1.address
      );

    expect(await mintMessage.balanceOf(recipient1.address)).to.equal(1);

    await mintMessage
      .connect(recipient1)
      .transferFrom(recipient1.address, recipient2.address, 0);
  });

  it('Should update mint price', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient1, recipient2] =
      await hre.ethers.getSigners();

    await mintMessage
      .connect(owner)
      .updateMintPrice(hre.ethers.utils.parseEther('0.05'));

    await expect(
      mintMessage
        .connect(creator)
        .createMessage(
          'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
          recipient1.address,
          {
            value: 0,
          }
        )
    ).to.be.reverted;

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient1.address,
        {
          value: hre.ethers.utils.parseEther('0.05'),
        }
      );
  });

  it('Should withdraw balance to owner', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, creator, recipient1, recipient2] =
      await hre.ethers.getSigners();

    await mintMessage
      .connect(owner)
      .updateMintPrice(hre.ethers.utils.parseEther('1'));

    await mintMessage
      .connect(creator)
      .createMessage(
        'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
        recipient1.address,
        {
          value: hre.ethers.utils.parseEther('1'),
        }
      );

    expect(
      await mintMessage.connect(owner).withdrawFunds()
    ).to.changeEtherBalance(owner, hre.ethers.utils.parseEther('1'));
  });

  it('Should transfer ownership', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, owner2, recipient] = await hre.ethers.getSigners();

    await mintMessage
      .connect(owner)
      .updateMintPrice(hre.ethers.utils.parseEther('1'));

    await mintMessage.connect(owner).transferOwnership(owner2.address);
    expect(await mintMessage.owner()).to.equal(owner2.address);

    await mintMessage
      .connect(owner2)
      .updateMintPrice(hre.ethers.utils.parseEther('0'));
  });

  it('Should revert if not contract owner', async function () {
    const MintMessage = await hre.ethers.getContractFactory('MintMessage');
    const mintMessage = await MintMessage.deploy();
    await mintMessage.deployed();
    const [owner, addr2, addr3] = await hre.ethers.getSigners();

    await expect(
      mintMessage
        .connect(addr2)
        .updateMintPrice(hre.ethers.utils.parseEther('1'))
    ).to.be.reverted;

    await expect(mintMessage.connect(addr2).withdrawFunds()).be.reverted;

    await expect(mintMessage.connect(addr3).transferOwnership(addr3.address)).to
      .be.reverted;
  });
});
