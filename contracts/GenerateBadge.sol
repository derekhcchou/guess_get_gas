// contracts/GenerateBadge.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GenerateBadge is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (string => string) public badgeUrls;

    constructor()
    ERC721("GGGBadge", "GGGB") public {
        badgeUrls["LTC"] = "https://ipfs.io/ipfs/QmbtyXLB9ibUyZ9YweQhJT24bWVydQnUHyh5DRxbvhH4h9?filename=nft-ltc.json";
        badgeUrls["ETH"] = "https://ipfs.io/ipfs/Qmc3C7uEKqrUBokwtzDM8VABjmmJoRZP5maLyBDNfNFtN8?filename=nft-eth.json";
        badgeUrls["BTC"] = "https://ipfs.io/ipfs/QmQEjHeGCChtYYm84oTEcDKDCUdWpbzw5KuLQAxcCXqi3b?filename=nft-btc.json";
    }

    function issueNFT(string memory name, address userAddress) public {
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();

        string[3] memory availableCurrencies = ["LTC", "ETH", "BTC"];
        string memory badgeUrl;

        for (uint i = 0; i < availableCurrencies.length; i++) {
            if (keccak256(abi.encodePacked(availableCurrencies[i])) == keccak256(abi.encodePacked(name))) {
                badgeUrl = badgeUrls[name];
            } else {
                badgeUrl = badgeUrls["ETH"];
            }
        }

        _safeMint(userAddress, newNftTokenId);
        _setTokenURI(newNftTokenId, badgeUrl);
    }
}