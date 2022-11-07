// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "hardhat/console.sol";

contract MintMessage is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // ======================== Events ========================

    /**
     * @notice Emitted when a MintMessage is minted.
     */
    event NewMintMessageMinted(address sender, uint256 tokenId);


    // ======================= Constants =======================

    /**
     * @notice Mint price set to 0 by default.
     */
    uint256 mintPrice = 0 ether;
    
    address payable owner;

    // ====================== Constructor ======================

    constructor() ERC721("MintMessage", "MSG") {
        owner = payable(msg.sender);
    }

    // ========================= Utils =========================

    /**
     * @notice Gives owner ability to update mint price
     */
    function updateMintPrice(uint _mintPrice) public payable {
        require(owner == msg.sender, "Only owner can update mint price.");
        mintPrice = _mintPrice;
    }

    /**
     * @notice Returns the mint price
     */
    function getMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    // ======================== Minting ========================

    function createToken(string memory tokenURI, address to) public payable returns (uint){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    // ======================= Royalty =======================

    // TODO

}