
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";


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

contract GetQuestions is ChainlinkClient{
    int256 public coinQuantity;
    int256 public gameQuantity;
    bytes32 public reqID_VRF;
    int256 public rand_b;

    struct GameList{
        int256 questionId;  // 2 items
        int256 badgeTypeId;  // which coin  // coinQuantity items
        uint revealTime;   //
        int256 lifeLengthId;  // daily=1,weekly=7,monthly=30  // 3 items
        int256 propertyId;  // 1 items
        bool activity;
    }

    struct ParticipantList{
        address userAddress;
        int256 optionId;
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
    mapping (int256 => GameList) public gameList;
    mapping (int256 => mapping(int256 => int256 [4])) public optionsList;
    mapping (int256 => string) public propertyList;
    mapping (int256 => int256) public lifeLengthList;
    mapping (int256 => QuestionList) public questionList;
    mapping (int256 => ParticipantList) public participantList;

    address GetCoinInfoInterfaceAddress = 0x2AF265E375e8E8114680447a1036DB86623d45Fb;
    GetCoinInfoInterface getCoinInfoContract = GetCoinInfoInterface(GetCoinInfoInterfaceAddress);

    address GetVRFInterfaceAddress = 0xBC59eB1EDaFDBCC86237C534D556704A446ea4Bf;
    GetVRFInterface getVRFContract1 = GetVRFInterface(GetVRFInterfaceAddress);

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

        gameQuantity=1;
    }



    function getRandom() public returns(uint256){
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetVRFInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        reqID_VRF=getVRFContract1.getRandomNumber();
        return getVRFContract1.getVRF();
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

// 3 Daily
    function makeDailyGame() public{
        gameList[gameQuantity].questionId = int256(getRandom()) % 2 + 1;
        makeOptions(int256(getRandom()) % 2 + 1, gameQuantity);
        gameList[gameQuantity].badgeTypeId = int256(getRandom()) % coinQuantity + 1;
        gameList[gameQuantity].revealTime = now;
        gameList[gameQuantity].lifeLengthId = 1;
        gameList[gameQuantity].propertyId = int256(getRandom()) % 1 + 1;
        gameList[gameQuantity].activity = true;

        gameQuantity++;
    }
// 3 Weekly
    function makeWeeklyGame() public{
        gameList[gameQuantity].questionId = int256(getRandom()) % 2 + 1;
        makeOptions(int256(getRandom()) % 2 + 1, gameQuantity);
        gameList[gameQuantity].badgeTypeId = int256(getRandom()) % coinQuantity + 1;
        gameList[gameQuantity].revealTime = now;
        gameList[gameQuantity].lifeLengthId = 2;
        gameList[gameQuantity].propertyId = int256(getRandom()) % 1 + 1;
        gameList[gameQuantity].activity = true;

        gameQuantity++;
    }
// 3 Month
    function makeMonthGame() public{
        gameList[gameQuantity].questionId = int256(getRandom()) % 2 + 1;
        makeOptions(int256(getRandom()) % 2 + 1, gameQuantity);
        gameList[gameQuantity].badgeTypeId = int256(getRandom()) % coinQuantity + 1;
        gameList[gameQuantity].revealTime = now;
        gameList[gameQuantity].lifeLengthId = 3;
        gameList[gameQuantity].propertyId = int256(getRandom()) % 1 + 1;
        gameList[gameQuantity].activity = true;

        gameQuantity++;
    }
    function makeOptions(int256 _questionId, int256 _questionQuantity) public{
        if(_questionId == 1){
            optionsList[_questionQuantity][1] = [1,2,3,0];
            optionsList[_questionQuantity][2] = [4,5,6,0];
            optionsList[_questionQuantity][3] = [7,8,9,0];
        }else if(_questionId == 2){
            optionsList[_questionQuantity][1] = [0,0,0,0];
            optionsList[_questionQuantity][2] = [1,0,0,0];
            optionsList[_questionQuantity][3] = [2,2,2,2];
        }

   }

   function addParticipant(int256 _gameId, address _userAddress, int256 _optionId) public{
        participantList[_gameId].userAddress = _userAddress;
        participantList[_gameId].optionId = _optionId;
   }




}
