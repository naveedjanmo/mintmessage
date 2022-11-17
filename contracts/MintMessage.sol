// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title mintmessage.xyz
 * @author naveed.so
 */
contract MintMessage is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    event NewMessageMinted(address sender, address recipient, uint256 tokenId);

    /**
     * @notice Mint price set to 0 by default.
     */
    uint256 public mintPrice  = 0 ether;

    constructor() ERC721("MintMessage", "MSG") {}

    // ======================== Minting ========================

    function _baseURI() internal pure override returns (string memory) {
        return "https://infura-ipfs.io/ipfs/";
    }

    function createToken(string memory _uri, address _to) public payable {
        require(msg.value == mintPrice, "Insufficient funds");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);

        emit NewMessageMinted(msg.sender, _to, tokenId);
    }

    // ========================= Utils =========================

    /**
     * @notice Owner can update the mint price
     */
    function updateMintPrice(uint _mintPrice) public payable onlyOwner {
        mintPrice = _mintPrice;
    }

    /**
     * @notice Owner can withdraw contract balance
     */
    function withdrawFunds() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * @notice Function overrides required by Solidity
     */

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}