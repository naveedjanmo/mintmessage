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

    /**
     * @notice Emitted when a MintMessage is minted.
     */
    event NewMintMessageMinted(address sender, uint256 tokenId);

    constructor() public ERC721("MintMessage", "MSG") {

    }

    function makeMintMessage() public {
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


// Import OZ ownable
// Fetch string from app - add string to metadata
//      listen for an event so that app knows when to screenshot and upload to ipfs
// Mint
// Transferable
// Burnable
// Possible to update price, only owner

// check how things will look across all marketplaces`