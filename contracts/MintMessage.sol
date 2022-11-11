// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

/**
 * @title mintmessage.xyz
 * @author @naveedjanmo
 */
contract MintMessage is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * @notice Emitted when a message is minted.
     */
    event NewMessageMinted(address sender, uint256 tokenId);

    /**
     * @notice Mint price set to 0 by default.
     */
    uint256 mintPrice = 0 ether;

    constructor() ERC721("MintMessage", "MSG") {}
    
    // ======================== Minting ========================

    function createToken(string memory tokenURI, address to) public payable returns (uint){
        require(msg.value == mintPrice);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NewMessageMinted(msg.sender, newItemId);
    }

    // ========================= Utils =========================

    /**
     * @notice Owner can update the mint price
     */
    function updateMintPrice(uint _mintPrice) public payable onlyOwner {
        mintPrice = _mintPrice;
    }

    /**
     * @notice Returns the mint price
     */
    function getMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    /**
     * @notice Holders can destroy tokens
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

   /**
     * @notice Query tokenURI with tokenId
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
