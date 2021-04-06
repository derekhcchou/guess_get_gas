// Address: 0x879292944e1EC4C6dD37d30633dbAFB81434DAAc
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";


interface GetCurrencyInfoInterface {
    function addCurrency(int256 _currencyQuantity) external;
    function getCurrencyName(int256 _id) external view returns(bytes32);
    function getCurrencyFullName(int256 _id) external view returns(bytes32);
    function getCurrencyOverviewUrl(int256 _id) external view returns(bytes32);
    function getCurrencyAssetLaunchDate(int256 _id) external view returns(bytes32);
    function getCurrencyLogoUrl(int256 _id) external view returns(bytes32);
    function getCurrencyIntro(int256 _id) external view returns(bytes memory);
}

interface GetVRFInterface {
    function getVRF() external view returns (uint256);
    function getRandomNumber() external returns (bytes32 requestId);
}

contract CallContract is ChainlinkClient{
    int256 public currencyQuantity;
    int256 public dailyGameQuantity;
    int256 public weeklyGameQuantity;
    int256 public monthlyGameQuantity;
    bytes32 public reqID_VRF;
    int256 public rand_b;

// Key: gameListId
    struct GameList{
        int256 questionId;  // 2 items
        int256 currencyId;  // which currency  // currencyQuantity items
        uint revealTime;   // gameParticipateStartTime
        int256 lifeLengthId;  // 3 items
        string property;  // 1 items
        bool isActivity;  //
        bool isClose;  //
    }

    struct CurrencyList{
        bytes32 name;
        bytes32 fullName;
        bytes32 overviewUrl;
        bytes32 assetLaunchDate;
        bytes32 logoUrl;
        bytes currencyIntro;
    }

    struct QuestionList{
        string questionName;  //path
        string questionDescription;  //question text
    }

    struct OptionsList{
        int256 optionsContet;
        int256 userQuantity;
        address[] userAddress;
    }

    struct LifeLengthList{
        int256 lifeLength;  // daily=1,weekly=7,monthly=30
        int256 gameQuantity;  // daily=30,weekly=4,monthly=1
    }

    struct GameInfo{
        int256 gameId;
        string gameTitle;
        string gameQuestion;
        uint gameParticipateStartTime;
        string gameWindow;
        string gameProperty;
        bytes32 gamePropertyLogoLink;
    }

    mapping (int256 => CurrencyList) public currencyList;
    mapping (int256 => GameList) public gameList;
    mapping (int256 => mapping (int256 => OptionsList)) public optionsList;  // key: gamiListId
    mapping (int256 => string) public propertyList;
    mapping (int256 => LifeLengthList) public lifeLengthList;
    mapping (int256 => QuestionList) public questionList;

    address GetCurrencyInfoInterfaceAddress = 0xa580D0eF1d8bDefdcD06059f3B81D305778ab617;
    GetCurrencyInfoInterface getCurrencyInfoContract = GetCurrencyInfoInterface(GetCurrencyInfoInterfaceAddress);

    address GetVRFInterfaceAddress = 0x40C7b80E812a3683d651DB8b38278A256f51362D;
    GetVRFInterface getVRFContract = GetVRFInterface(GetVRFInterfaceAddress);

    constructor() public {
        setPublicChainlinkToken();

        questionList[1].questionName = "PRICE";
        questionList[1].questionDescription = "Guess the second digit after the decimal point";

        questionList[2].questionName = "VOLUME";
        questionList[2].questionDescription = "Guess remainder of volume divided by 3";

        propertyList[1] = "Crypto Currency";

        lifeLengthList[1].lifeLength = 1;
        lifeLengthList[1].gameQuantity = 30;

        lifeLengthList[2].lifeLength = 7;
        lifeLengthList[2].gameQuantity = 4;

        lifeLengthList[3].lifeLength = 30;
        lifeLengthList[3].gameQuantity = 1;

        currencyQuantity = 10;
    }



// (SKIP)  1
    function makeCurrencyList() public{
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetCurrencyInfoInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        getCurrencyInfoContract.addCurrency(currencyQuantity);
    }

// 2
    function getCurrencyList() public{
        for(int256 i=1;i<=currencyQuantity;i++){
            currencyList[i].name = getCurrencyInfoContract.getCurrencyName(i);
            currencyList[i].fullName = getCurrencyInfoContract.getCurrencyFullName(i);
            currencyList[i].overviewUrl = getCurrencyInfoContract.getCurrencyOverviewUrl(i);
            currencyList[i].assetLaunchDate = getCurrencyInfoContract.getCurrencyAssetLaunchDate(i);
            currencyList[i].logoUrl = getCurrencyInfoContract.getCurrencyLogoUrl(i);
            currencyList[i].currencyIntro = getCurrencyInfoContract.getCurrencyIntro(i);
        }
    }


    function getRandom() public returns(uint256){
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetVRFInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        reqID_VRF=getVRFContract.getRandomNumber();
        return getVRFContract.getVRF();
    }

// 3.5
    function makeOptions(int256 _questionId, int256 _gameId) public{
        if(_questionId == 1){
            optionsList[_gameId][1].optionsContet = 1;
            optionsList[_gameId][2].optionsContet = 2;
            optionsList[_gameId][3].optionsContet = 3;
            optionsList[_gameId][4].optionsContet = 4;
            optionsList[_gameId][5].optionsContet = 5;
            optionsList[_gameId][6].optionsContet = 6;
            optionsList[_gameId][7].optionsContet = 7;
            optionsList[_gameId][8].optionsContet = 8;
            optionsList[_gameId][9].optionsContet = 9;
            optionsList[_gameId][10].optionsContet = 0;
        }else if(_questionId == 2){
            optionsList[_gameId][1].optionsContet =0;
            optionsList[_gameId][2].optionsContet =1;
            optionsList[_gameId][3].optionsContet =2;
        }
   }

// 3
    function makeDailyGame() public{
        for(int256 i=1;i<=3;i++){  // i=1 daily,i=2 weekly,i=3 monthly
            for(int256 gameId=1;gameId<=lifeLengthList[i].gameQuantity;gameId++){
                gameList[gameId].questionId = int256(getRandom()) % 2 + 1;
                makeOptions(int256(getRandom()) % 2 + 1, gameId);
                gameList[gameId].currencyId = int256(getRandom()) % currencyQuantity + 1;
                gameList[gameId].revealTime = 0;
                gameList[gameId].lifeLengthId = i;
                gameList[gameId].property = propertyList[1];
                gameList[gameId].isActivity = false;
                gameList[gameId].isActivity = false;
            }
        }
    }


    function returnGameInfo() public{
        GameInfo[] memory gameinfo;
        for(int256 i=1;i<=3;i++){  // i=1 daily,i=2 weekly,i=3 monthly
            for(int256 gameId=1;gameId<=lifeLengthList[i].gameQuantity;gameId++){
                gameList[gameId].questionId = int256(getRandom()) % 2 + 1;
                makeOptions(int256(getRandom()) % 2 + 1, gameId);
                gameList[gameId].currencyId = int256(getRandom()) % currencyQuantity + 1;
                gameList[gameId].revealTime = 0;
                gameList[gameId].lifeLengthId = i;
                gameList[gameId].property = propertyList[1];
                gameList[gameId].isActivity = false;
                gameList[gameId].isActivity = false;
            }
        }

    }


//
    function addParticipant(int256 _gameId, address _userAddress, int256 _optionId) public{
        optionsList[_gameId][_optionId].userAddress.push(_userAddress);
    }




}
