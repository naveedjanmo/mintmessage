// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import { Base64 } from "./libraries/Base64.sol";

contract MintMessage is ERC721 {
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

    // ====================== Constructor ======================

    constructor() public ERC721("MintMessage", "MNTMSG") {
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

    function createToken(string memory tokenURI) public returns (uint){
        _tokenIs.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true)
        return newItemId;

        string memory ipfsId;

        string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "MintMessage", 
                    "description": "A message from a distant fellow.", "image": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                )
            )
        )

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(finalTokenUri);

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "A MintMessage w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        emit NewMintMessageMinted(msg.sender, newItemId);
    );

    }


}