// contracts/GenerateBadge.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract GenerateBadge is ERC721, VRFConsumerBase {
    bytes32 public keyHash;
    address public vrfCoordinator;
    uint256 internal fee;

    uint256 public randomResult;

    struct Badge {
        uint256 strength;
        uint256 speed;
        uint256 stamina;
        string name;
    }

    Badge[] public badges;

    // mappings will go here
    mapping(bytes32 => string) requestToBadgeName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash)
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("GGGBadge", "GGGB") public {
        vrfCoordinator = _VRFCoordinator;
        keyHash = _keyhash;
        fee = 0.1 * 10**18;
    }

    function issueNFT(uint256 userProvidedSeed, string memory name, address userAddress) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToBadgeName[requestId] = name;
        requestToSender[requestId] = userAddress;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        // define the creation of the NFT
        uint256 newId = badges.length;
        uint256 strength = (randomNumber % 100);
        uint256 speed = ((randomNumber % 10000) / 100);
        uint256 stamina = ((randomNumber % 1000000) / 100000);

        badges.push(
            Badge(
                strength,
                speed,
                stamina,
                requestToBadgeName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
        string memory _tokenURI = "https://ipfs.io/ipfs/QmQq1NE898ZGnLNC59ndKh23d96AHF7fzYs9VZofXt1HGE?filename=chainlink-hackathon-badge-derek.json";
        _setTokenURI(newId, _tokenURI);
    }

    // function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        // require(
        //     _isApprovedOrOwner(_msgSender(), tokenId),
        //     "ERC721: transfer caller is not owner nor approved"
        // );
        // _setTokenURI(tokenId, _tokenURI);
    // }
}