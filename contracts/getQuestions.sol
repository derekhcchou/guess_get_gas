
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";


interface GetCoinInfoInterface {
    function addCoin(int256 _coinQuantity) external;
    function getCoinName(int256 _id) external view returns(bytes32);
    function getCoinFullName(int256 _id) external view returns(bytes32);
    function getCoinOverviewUrl(int256 _id) external view returns(bytes32);
    function getCoinAssetLaunchDate(int256 _id) external view returns(bytes32);
    function getCoinLogoUrl(int256 _id) external view returns(bytes32);
}

interface GetVRFInterface {
    function getVRF() external view returns (uint256);
    function getRandomNumber() external returns (bytes32 requestId);
}

contract CallContract is ChainlinkClient{
    int256 public coinQuantity;
    int256 public questionQuantity;
    bytes32 public reqID_VRF;
    int256 public rand_b;

    struct QuestionsList{
        int256 questionId;  // 2 items
        int256 topicId;  // which coin  // coinQuantity items
        uint revealTime;   //
        int256 lifeLengthId;  // daily=1,weekly=7,monthly=30  // 3 items
        int256 propertyId;  // 1 items
    }

    struct CoinList{
        bytes32 name;
        bytes32 fullName;
        bytes32 overviewUrl;
        bytes32 assetLaunchDate;
        bytes32 logoUrl;
    }

    struct QuestionList{
        string questionName;
        string questionDescription;
    }



    mapping (int256 => CoinList) public coinList;
    mapping (int256 => QuestionsList) public questionsList;
    mapping (int256 => mapping(int256 => string)) public optionsList;
    mapping (int256 => string) public propertyList;
    mapping (int256 => int256) public lifeLengthList;
    mapping (int256 => QuestionList) public questionList;

    address GetCoinInfoInterfaceAddress = 0x2AF265E375e8E8114680447a1036DB86623d45Fb;
    GetCoinInfoInterface getCoinInfoContract = GetCoinInfoInterface(GetCoinInfoInterfaceAddress);

    address GetVRFInterfaceAddress = 0xBC59eB1EDaFDBCC86237C534D556704A446ea4Bf;
    GetVRFInterface getVRFContract = GetVRFInterface(GetVRFInterfaceAddress);

    constructor() public {
        setPublicChainlinkToken();

        questionList[1].questionName = "PRICE";
        questionList[2].questionName = "VOLUME";
        questionList[1].questionDescription = "Guess the second digit after the decimal point";
        questionList[2].questionDescription = "Guess remainder of volume divided by 3";

        propertyList[1] = "Crypto Currency";

        lifeLengthList[1] = 1;
        lifeLengthList[2] = 7;
        lifeLengthList[3] = 30;

        coinQuantity = 10;

        questionQuantity=1;
    }

    function getRandom() public returns(uint256){
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetVRFInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        reqID_VRF=getVRFContract.getRandomNumber();
        return getVRFContract.getVRF();
    }

// 1
    function makeCoinList() public{
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetCoinInfoInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        getCoinInfoContract.addCoin(coinQuantity);
    }

// 2
    function getCoinList() public{
        for(int256 i=1;i<=coinQuantity;i++){
            coinList[i].name = getCoinInfoContract.getCoinName(i);
            coinList[i].fullName = getCoinInfoContract.getCoinFullName(i);
            coinList[i].overviewUrl = getCoinInfoContract.getCoinOverviewUrl(i);
            coinList[i].assetLaunchDate = getCoinInfoContract.getCoinAssetLaunchDate(i);
            coinList[i].logoUrl = getCoinInfoContract.getCoinLogoUrl(i);
        }
    }

// 3
    function makeQuestion() public{
        questionsList[questionQuantity].questionId = int256(getRandom()) % 2 + 1;
        makeOptions(int256(getRandom()) % 2 + 1, questionQuantity);
        questionsList[questionQuantity].topicId = int256(getRandom()) % coinQuantity + 1;
        questionsList[questionQuantity].revealTime = now;
        questionsList[questionQuantity].lifeLengthId = int256(getRandom()) % 3 + 1;
        questionsList[questionQuantity].propertyId = int256(getRandom()) % 1 + 1;

        questionQuantity++;
    }

    function makeOptions(int256 _questionId, int256 _questionQuantity) public{
        if(_questionId == 1){
            optionsList[_questionQuantity][1] = "1,2,3,0";
            optionsList[_questionQuantity][2] = "4,5,6,0";
            optionsList[_questionQuantity][3] = "7,8,9,0";
        }else if(_questionId == 2){
            optionsList[_questionQuantity][1] = "0";
            optionsList[_questionQuantity][2] = "1";
            optionsList[_questionQuantity][3] = "2";
        }

   }



}
