// Address: 0xa580D0eF1d8bDefdcD06059f3B81D305778ab617
// This example code is designed to quickly deploy an example contract using Remix.
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/master/evm-contracts/src/v0.6/ChainlinkClient.sol";

contract getCurrencyList is ChainlinkClient {

    struct CurrencyList{
         bytes32 name;
         bytes32 fullName;
         bytes32 overviewUrl;
         bytes32 assetLaunchDate;
         bytes32 logoUrl;
         bytes currencyIntro;
    }

    mapping (int256 => CurrencyList) public currencyList;
    mapping (int256 => string) public infoList;
    mapping (int256 => int256) public dataCount;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    bytes32 public currencyData;
    string public apiUrl;



    /**
     * Network: Rinkeby
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
        jobId = "c8084988f0b54520ba17945c4a2ab7bc";
        fee = 0.1 * 10 ** 18; // 0.1 LINK

        infoList[1]="Name";
        infoList[2]="FullName";
        infoList[3]="Url";
        infoList[4]="AssetLaunchDate";
        infoList[5]="ImageUrl";

        currencyList[1].name = bytes32("AVT");
        currencyList[1].fullName = bytes32("Aventus");
        currencyList[1].overviewUrl = bytes32("/coins/avt/overview");
        currencyList[1].assetLaunchDate = bytes32("2017-09-03");
        currencyList[1].logoUrl = bytes32("/media/37746592/avt.png");
        //currencyList[1].currencyIntro = bytes("Aventus is a layer-2 blockchain protocol designed to bring scalability, lower costs, and speed to Ethereum transactions.The Aventus Network (AvN) let businesses build on top of the Ethereum network with Aventus’ second-layer protocol. With the AvN, applications can easily work with any other promising blockchain tech, cross-chain, by plugging into the Polkadot ecosystem, building on Substrate.Benefits of AventusScaleThe Aventus Network (AvN) can theoretically scale to 2,000 transactions per second.PriceThe average transaction cost on the Aventus Network will begin at just $0.01 (paid in AVT) and decrease over time.SpeedThe AvN will process a token transfer within 0.13 seconds.Enterprise GradeThe AvN will onboard a minimum of 8.5 million client transactions that have been active in private test networks throughout the past year.Key Use CasesFinancial AssetsSupply ChainsRewards and LoyaltyLive EntertainmentData IntegrityDecentralised Applications");

        currencyList[2].name = bytes32("BTC");
        currencyList[2].fullName = bytes32("Bitcoin");
        currencyList[2].overviewUrl = bytes32("/coins/btc/overview");
        currencyList[2].assetLaunchDate = bytes32("2009-01-03");
        currencyList[2].logoUrl = bytes32("/media/37746251/btc.png");
        //currencyList[2].currencyIntro = bytes("Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Although other cryptocurrencies have come before, Bitcoin is the first decentralized cryptocurrency - Its reputation has spawned copies and evolution in the space.With the largest variety of markets and the biggest value - having reached a peak of 318 billion USD - Bitcoin is here to stay. As with any new invention, there can be improvements or flaws in the initial model however the community and a team of dedicated developers are pushing to overcome any obstacle they come across. It is also the most traded cryptocurrency and one of the main entry points for all the other cryptocurrencies. The price is as unstable as always and it can go up or down by 10%-20% in a single day.Bitcoin is an SHA-256 POW coin with almost 21,000,000 total minable coins. The block time is 10 minutes. See below for a full range of Bitcoin markets where you can trade US Dollars for Bitcoin, crypto to Bitcoin and many other fiat currencies too.Bitcoin Whitepaper PDF - A Peer-to-Peer Electronic Cash SystemBlockchain data provided by: Blockchain (main source), Blockchair (backup)");

        currencyList[3].name = bytes32("BTT");
        currencyList[3].fullName = bytes32("BitTorrent");
        currencyList[3].overviewUrl = bytes32("/coins/btt/overview");
        currencyList[3].assetLaunchDate = bytes32("2019-01-28");
        currencyList[3].logoUrl = bytes32("/media/37746134/bttpng.png");
        //currencyList[3].currencyIntro = bytes("BitTorrent Protocol is a decentralized protocol with over 1 billion users. BitTorrent Inc. invented and maintains the BitTorrent protocol. While there are many implementations of the BitTorrent software, BitTorrent and µTorrent (often called “utorrent”) remain two of the most popular. In 2018, BitTorrent Protocol reached a strategic partnership with TRON Blockchain Protocol. On July 24, 2018 TRON has successfully acquired BitTorrent and all BitTorrent products.BitTorrent (BTT) the token is a TRC-10 utility token based on the TRON blockchain to foster faster speed on the world’s largest decentralized application.");

        currencyList[4].name = bytes32("ETH");
        currencyList[4].fullName = bytes32("Ethereum");
        currencyList[4].overviewUrl = bytes32("/coins/eth/overview");
        currencyList[4].assetLaunchDate = bytes32("2015-07-30");
        currencyList[4].logoUrl = bytes32("/media/37746238/eth.png");
        //currencyList[4].currencyIntro = bytes("Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference. In the Ethereum protocol and blockchain there is a price for each operation. The general idea is, in order to have things transferred or executed by the network, you have to consume or burn Gas.");

        currencyList[5].name = bytes32("TRX");
        currencyList[5].fullName = bytes32("TRON");
        currencyList[5].overviewUrl = bytes32("/coins/trx/overview");
        currencyList[5].assetLaunchDate = bytes32("2017-09-26");
        currencyList[5].logoUrl = bytes32("/media/37746152/trxjpg.png");
        //currencyList[5].currencyIntro = bytes("TRON is a cryptocurrency payment platform. It allows the users to perform cryptocurrencies transactions between them on a global scale within a decentralized ecosystem. TRON has finished its native token (TRX) migration to the mainnet. In addition, users can access the platform digital wallet, the TRON Wallet where it is possible to store and manage their digital assets, with support for desktop and mobile devices. Since July 24th, 2018, TRON acquired BitTorrent Inc. which is an Internet technology company based in San Francisco. It designs distributed technologies that scale efficiently, keep intelligence at the edge, and keep creators and consumers in control of their content and data.The TRX token is a cryptographic currency developed by TRON. Formerly an ERC-20 token, the TRX has now finished its migration to the TRON mainnet. This token is the medium for the users to exchange value between them when using the platform services.Whitepaper");

        currencyList[6].name = bytes32("XRP");
        currencyList[6].fullName = bytes32("XRP");
        currencyList[6].overviewUrl = bytes32("/coins/xrp/overview");
        currencyList[6].assetLaunchDate = bytes32("2013-01-01");
        currencyList[6].logoUrl = bytes32("/media/37746347/xrp.png");
        //currencyList[6].currencyIntro = bytes("XRP positions itself as one of the most liquid currencies which is fast (settles in 3-5 seconds), scalable (can handle 1,500 transactions per second), decentralized (140+ validators), stable (7-year track record) and with a negligible energy consumption (due to the consensus protocol vs proof-of-work). XRP is a distributed network which means transactions occur immediately across the network - and as it is peer to peer - the network is resilient to systemic risk. XRPs aren&#39;t mined - unlike bitcoin and its peers - but each transaction destroys a small amount of XRP which adds a deflationary measure into the system.Blockchain data provided by: Blockchair (Block/Ledgers Number only), Ripple Data API (Total Supply only)");

        currencyList[7].name = bytes32("WRX");
        currencyList[7].fullName = bytes32("WazirX");
        currencyList[7].overviewUrl = bytes32("/coins/wrx/overview");
        currencyList[7].assetLaunchDate = bytes32("2020-01-21");
        currencyList[7].logoUrl = bytes32("/media/37746094/wrx.png");
        //currencyList[7].currencyIntro = bytes("WRX, a utility token backed by WazirX, forms the backbone of the WazirX ecosystem. It launched WRX tokens to involve its community in helping build out WazirX, and reward them accordingly for contributing to success. This helps WazirX stay true to the ethos of cryptocurrency and blockchain - to share the rewards of WazirX&#39;s success with its early adopters and supporters.");

        currencyList[8].name = bytes32("WIN");
        currencyList[8].fullName = bytes32("WINk");
        currencyList[8].overviewUrl = bytes32("/coins/win/overview");
        currencyList[8].assetLaunchDate = bytes32("2019-07-29");
        currencyList[8].logoUrl = bytes32("/media/35651255/win.png");
        //currencyList[8].currencyIntro = bytes("By creating a whole mining ecosystem, WINk will revolutionize the way that developers adopt the blockchain ecosystem while keeping wealth redistribution at its core. WIN will continue to be the centerpiece of the platform while developers will be able to utilize everything the WINk ecosystem has to offer. By taking behavioral mining to the next level, traditional apps will now have all the resources at their disposal to convert their apps to the TRON blockchain.");

        currencyList[9].name = bytes32("BNB");
        currencyList[9].fullName = bytes32("Binance Coin");
        currencyList[9].overviewUrl = bytes32("/coins/bnb/overview");
        currencyList[9].assetLaunchDate = bytes32("2017-06-27");
        currencyList[9].logoUrl = bytes32("/media/37746250/bnb.png");
        //currencyList[9].currencyIntro = bytes("BNB powers the Binance ecosystem and is the native asset of the Binance Chain. BNB is a cryptocurrency created in June 2017, launched during an ICO in July, and initially issued as an ERC-20 token. Designed to be used for a fee reduction on the Binance exchange, its scope was extended over the years.BNB powers the Binance Chain as its native chain token. For instance, it is used to pay fees on the Binance DEX, issue new tokens, send/cancel orders, and transfer assets.BNB is also powering the Binance Smart Chain, which is an EVM-compatible network, forked from “go-ethereum”. It supports smart contracts and relies on a new consensus mechanism: Proof-of-Staked Authority (PoSA) consensus (“Parlia”), which incorporates elements from both Proof of Stake and Proof of Authority. BNB is used for delegated staking on the authority validator, leading to staking rewards for users and validators.Besides its on-chain functions, BNB has multiple additional use-cases such as fee discounts on multiple exchanges (e.g., Binance.com), payment asset on third-party services, and participation rights &amp; transacting currency on Binance Launchpad.At the core of the economics of BNB, there is a burn mechanism leading to period reductions in its total supply (~ every three months). From its initial maximum supply of 200 million, burns are expected to continue until the supply reaches 100 million.Whitepaper");

        currencyList[10].name = bytes32("EOS");
        currencyList[10].fullName = bytes32("EOS");
        currencyList[10].overviewUrl = bytes32("/coins/eos/overview");
        currencyList[10].assetLaunchDate = bytes32("2017-06-26");
        currencyList[10].logoUrl = bytes32("/media/37746349/eos.png");
        //currencyList[10].currencyIntro = bytes("EOS.IO is software that introduces a blockchain architecture designed to enable vertical and horizontal scaling of decentralized applications (the “EOS.IO Software”). This is achieved through an operating system-like construct upon which applications can be built. The software provides accounts, authentication, databases, asynchronous communication and the scheduling of applications across multiple CPU cores and/or clusters. The resulting technology is a blockchain architecture that has the potential to scale to millions of transactions per second, eliminates user fees and allows for quick and easy deployment of decentralized applications. For more information, please read the EOS.IO Technical White Paper.Blockexplorer: https://eospark.com/In the case of EOS, circulating supply and total supply are available but max supply is not available, which indicates that EOS supply is infinite. The current cap is 1 billion tokens, there will be an inflation of up to 5% per annum to reward the block producers and they may use these to sell or to invest back into EOS dapps.Blockchain data provided by: Blockchair (main source), Bloks.io (backup)");

    }


    function addCurrency(int256 _currencyQuantity) public{

        dataCount[1]=1;
        dataCount[2]=1;
        dataCount[3]=1;
        dataCount[4]=1;
        dataCount[5]=1;

        apiUrl=stringAdd("https://min-api.cryptocompare.com/data/top/totalvolfull?tsym=USD&limit=",intToString(uint(_currencyQuantity)));
        for(int256 i=0;i<_currencyQuantity;i++){
                requestName(intToString(uint(i)), apiUrl, infoList[1]);
                requestFullName(intToString(uint(i)), apiUrl, infoList[2]);
                requestUrl(intToString(uint(i)), apiUrl, infoList[3]);
                requestAssetLaunchDate(intToString(uint(i)), apiUrl, infoList[4]);
                requestImageUrl(intToString(uint(i)), apiUrl, infoList[5]);
        }
    }


    function getCurrencyName(int256 _id) public view returns(bytes32){
        return currencyList[_id].name;
    }
    function getCurrencyFullName(int256 _id) public view returns(bytes32){
        return currencyList[_id].fullName;
    }
    function getCurrencyOverviewUrl(int256 _id) public view returns(bytes32){
        return currencyList[_id].overviewUrl;
    }
    function getCurrencyAssetLaunchDate(int256 _id) public view returns(bytes32){
        return currencyList[_id].assetLaunchDate;
    }
    function getCurrencyLogoUrl(int256 _id) public view returns(bytes32){
        return currencyList[_id].logoUrl;
    }
    function getCurrencyIntro(int256 _id) public view returns(bytes memory){
        return currencyList[_id].currencyIntro;
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
        path[2] = "CurrencyInfo";
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
        path[2] = "CurrencyInfo";
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
        path[2] = "CurrencyInfo";
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
        path[2] = "CurrencyInfo";
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
        path[2] = "CurrencyInfo";
        path[3] = _infoData;
        request.addStringArray("path", path);

        return sendChainlinkRequestTo(oracle, request, fee);
    }


    /**
     * Receive the response in the form of uint256
     */
    function fulfillName(bytes32 _requestId, bytes32 _currencyData) public recordChainlinkFulfillment(_requestId)
    {
        currencyList[dataCount[1]].name = _currencyData;
        dataCount[1]++;
    }
    function fulfillFullName(bytes32 _requestId, bytes32 _currencyData) public recordChainlinkFulfillment(_requestId)
    {
        currencyList[dataCount[2]].fullName = _currencyData;
        dataCount[2]++;
    }
    function fulfillUrl(bytes32 _requestId, bytes32 _currencyData) public recordChainlinkFulfillment(_requestId)
    {
        currencyList[dataCount[3]].overviewUrl = _currencyData;
        dataCount[3]++;
    }
    function fulfillAssetLaunchDate(bytes32 _requestId, bytes32 _currencyData) public recordChainlinkFulfillment(_requestId)
    {
        currencyList[dataCount[4]].assetLaunchDate = _currencyData;
        dataCount[4]++;
    }
    function fulfillImageUrl(bytes32 _requestId, bytes32 _currencyData) public recordChainlinkFulfillment(_requestId)
    {
        currencyList[dataCount[5]].logoUrl = _currencyData;
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
