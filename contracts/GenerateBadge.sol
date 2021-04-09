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
        badgeUrls["ltc"] = "https://ipfs.io/ipfs/QmbtyXLB9ibUyZ9YweQhJT24bWVydQnUHyh5DRxbvhH4h9?filename=nft-ltc.json";
        badgeUrls["eth"] = "https://ipfs.io/ipfs/Qmc3C7uEKqrUBokwtzDM8VABjmmJoRZP5maLyBDNfNFtN8?filename=nft-eth.json";
        badgeUrls["btc"] = "https://ipfs.io/ipfs/QmQEjHeGCChtYYm84oTEcDKDCUdWpbzw5KuLQAxcCXqi3b?filename=nft-btc.json";
    }

    function issueNFT(string memory name, address userAddress) public {
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();

        _safeMint(userAddress, newNftTokenId);
        _setTokenURI(newNftTokenId, badgeUrls[name]);
    }
}