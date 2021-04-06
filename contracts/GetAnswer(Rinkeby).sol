//Address: 0x6f33ed84c014F72D23240b9Ed589959a8c226C76
// This example code is designed to quickly deploy an example contract using Remix.
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";

contract makeQ is ChainlinkClient {



    uint256 public volume;
    string public url;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
        jobId = "c8084988f0b54520ba17945c4a2ab7bc";
        fee = 0.1 * 10 ** 18; // 0.1 LINK


    }

    function requestVolumeData(string memory _currenyName, string memory _questionName, string memory _apiUrl) public returns (bytes32 requestId){
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        request.add("get", _apiUrl);

        string[] memory path = new string[](4);
        path[0] = "RAW";
        path[1] = _currenyName;
        path[2] = "USD";
        path[3] = _questionName;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

    function getVolume() public view returns (uint256){
        return volume;
    }

    function strAdd(string memory _a, string memory _b, string memory _c) public returns(string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        string memory ret = new string(_ba.length + _bb.length + _bc.length);
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        for (uint i = 0; i < _bc.length; i++) bret[k++] = _bc[i];
        url=ret;
        return url;
    }


    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }
}
