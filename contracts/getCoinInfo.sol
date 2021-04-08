// This example code is designed to quickly deploy an example contract using Remix.
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract GetCoinList is ChainlinkClient {

    struct CoinList{
         bytes32 name;
         bytes32 fullName;
         bytes32 overviewUrl;
         bytes32 assetLaunchDate;
         bytes32 logoUrl;
    }

    mapping (int256 => CoinList) public coinList;
    mapping (int256 => string) public infoList;
    mapping (int256 => int256) public dataCount;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    bytes32 public coinData;
    string public apiUrl;



    /**
     * Network: Kovan
     * Chainlink - 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Chainlink - 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "b7285d4859da4b289c7861db971baf0a";
        fee = 0.1 * 10 ** 18; // 0.1 LINK

        infoList[1]="Name";
        infoList[2]="FullName";
        infoList[3]="Url";
        infoList[4]="AssetLaunchDate";
        infoList[5]="ImageUrl";

    }


    function addCoin(int256 _coinQuantity) public{

        dataCount[1]=1;
        dataCount[2]=1;
        dataCount[3]=1;
        dataCount[4]=1;
        dataCount[5]=1;

        apiUrl=stringAdd("https://min-api.cryptocompare.com/data/top/totalvolfull?tsym=USD&limit=",intToString(uint(_coinQuantity)));
        for(int256 i=0;i<_coinQuantity;i++){
                requestName(intToString(uint(i)), apiUrl, infoList[1]);
                requestFullName(intToString(uint(i)), apiUrl, infoList[2]);
                requestUrl(intToString(uint(i)), apiUrl, infoList[3]);
                requestAssetLaunchDate(intToString(uint(i)), apiUrl, infoList[4]);
                requestImageUrl(intToString(uint(i)), apiUrl, infoList[5]);
        }
    }


    function getCoinName(int256 _id) public view returns(bytes32){
        return coinList[_id].name;
    }
    function getCoinFullName(int256 _id) public view returns(bytes32){
        return coinList[_id].fullName;
    }
    function getCoinOverviewUrl(int256 _id) public view returns(bytes32){
        return coinList[_id].overviewUrl;
    }
    function getCoinAssetLaunchDate(int256 _id) public view returns(bytes32){
        return coinList[_id].assetLaunchDate;
    }
    function getCoinLogoUrl(int256 _id) public view returns(bytes32){
        return coinList[_id].logoUrl;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestName(string memory _id, string memory _adiUrl, string memory _infoData) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillName.selector);

        request.add("get", _adiUrl);

        string[] memory path = new string[](4);
        path[0] = "Data";
        path[1] = _id;
        path[2] = "CoinInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function requestFullName(string memory _id, string memory _adiUrl, string memory _infoData) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillFullName.selector);

        request.add("get", _adiUrl);

        string[] memory path = new string[](4);
        path[0] = "Data";
        path[1] = _id;
        path[2] = "CoinInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function requestUrl(string memory _id, string memory _adiUrl, string memory _infoData) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillUrl.selector);

        request.add("get", _adiUrl);

        string[] memory path = new string[](4);
        path[0] = "Data";
        path[1] = _id;
        path[2] = "CoinInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function requestAssetLaunchDate(string memory _id, string memory _adiUrl, string memory _infoData) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillAssetLaunchDate.selector);

        request.add("get", _adiUrl);

        string[] memory path = new string[](4);
        path[0] = "Data";
        path[1] = _id;
        path[2] = "CoinInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }
    function requestImageUrl(string memory _id, string memory _adiUrl, string memory _infoData) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillImageUrl.selector);

        request.add("get", _adiUrl);

        string[] memory path = new string[](4);
        path[0] = "Data";
        path[1] = _id;
        path[2] = "CoinInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }


    /**
     * Receive the response in the form of uint256
     */
    function fulfillName(bytes32 _requestId, bytes32 _coinData) public recordChainlinkFulfillment(_requestId)
    {
        coinList[dataCount[1]].name = _coinData;
        dataCount[1]++;
    }
    function fulfillFullName(bytes32 _requestId, bytes32 _coinData) public recordChainlinkFulfillment(_requestId)
    {
        coinList[dataCount[2]].fullName = _coinData;
        dataCount[2]++;
    }
    function fulfillUrl(bytes32 _requestId, bytes32 _coinData) public recordChainlinkFulfillment(_requestId)
    {
        coinList[dataCount[3]].overviewUrl = _coinData;
        dataCount[3]++;
    }
    function fulfillAssetLaunchDate(bytes32 _requestId, bytes32 _coinData) public recordChainlinkFulfillment(_requestId)
    {
        coinList[dataCount[4]].assetLaunchDate = _coinData;
        dataCount[4]++;
    }
    function fulfillImageUrl(bytes32 _requestId, bytes32 _coinData) public recordChainlinkFulfillment(_requestId)
    {
        coinList[dataCount[5]].logoUrl = _coinData;
        dataCount[5]++;
    }





    function intToString(uint _i) public returns(string memory){
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }


    function stringAdd(string memory _strA, string memory _strB) public returns(string memory){
        bytes memory _byteStrA = bytes(_strA);
        bytes memory _byteStrB = bytes(_strB);
        string memory fullString = new string(_byteStrA.length + _byteStrB.length);
        bytes memory byteFullString = bytes(fullString);
        uint k = 0;
        for (uint i = 0; i < _byteStrA.length; i++) byteFullString[k++] = _byteStrA[i];
        for (uint i = 0; i < _byteStrB.length; i++) byteFullString[k++] = _byteStrB[i];

        return fullString;
    }






    /**
     * Withdraw LINK from this contract
     *
     * NOTE: DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES ONLY.
     */
    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }
}
