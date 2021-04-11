
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";


interface GetCurrencyInfoInterface {
    function addCurrency(int256 _currencyQuantity) external;
    function getCurrencyName(int256 _id) external view returns(bytes32);
    function getCurrencyFullName(int256 _id) external view returns(bytes32);
    function getCurrencyOverviewUrl(int256 _id) external view returns(bytes32);
    function getCurrencyAssetLaunchDate(int256 _id) external view returns(bytes32);
    function getCurrencyLogoUrl(int256 _id) external view returns(bytes32);
    function getCurrencyIntro(int256 _id) external view returns(bytes memory);
}

interface GetAnswerInterface {
  function strAdd(string calldata _a, string calldata _b, string calldata _c) external returns(string memory);
  function getVolume() external view returns (uint256);
  function requestVolumeData(string calldata _currenyName, string calldata _questionName, string calldata _apiUrl) external returns (bytes32 requestId);
}

interface GetVRFInterface {
    function getVRF() external view returns (uint256);
    function getRandomNumber() external returns (bytes32 requestId);
}

contract AddGameInfo is ChainlinkClient{
    int256 public currencyQuantity;
    int256 public dailyGameQuantity;
    int256 public weeklyGameQuantity;
    int256 public monthlyGameQuantity;
    bytes32 public reqID_VRF;
    int256 public rand_b;
    uint public randomNum=now/10000000;
    int256 public totalGameQty;


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
        string currencyIntro;
    }

    struct QuestionList{
        string questionName;  //json path
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
        string title;
    }

    struct GameInfo{
        int256 gameId;
        bytes32 gameTitle;
        string gameQuestion;
        bytes gameDescription;
        //int256[][] gameAnsOptions;
        //uint gameWindowEndTime;
        uint gameParticipateStartTime;
        //uint gameParticipateEndTime;
        string gameWindow;
        string gameProperty;
        bytes32 gameLogoLink;
        int256 numOfParticipants;
    }



    mapping (int256 => CurrencyList) public currencyList; //key: currencyId
    mapping (int256 => GameList) public gameList;  // key: gameListId
    mapping (int256 => mapping (int256 => OptionsList)) public optionsList;  // key1: gameListId, key2: optionsListId
    mapping (int256 => string) public propertyList;
    mapping (int256 => LifeLengthList) public lifeLengthList;
    mapping (int256 => QuestionList) public questionList;


    /*
     * Network: Polygon
     */
    address GetCurrencyInfoInterfaceAddress = 0x59F08372ab30E64F61AF8594c1163379ACAD27C5;
    GetCurrencyInfoInterface getCurrencyInfoContract = GetCurrencyInfoInterface(GetCurrencyInfoInterfaceAddress);

    address GetAnswerInterfaceAddress = 0xbE56D8D1d1a529DD83F1188d3B0949A2828F45a5;
    GetAnswerInterface getAnswerContract = GetAnswerInterface(GetCurrencyInfoInterfaceAddress);

// Make randomnumber
    address GetVRFInterfaceAddress = 0xa7986Fb6438db392b60aaA6Fba3b1B7c5514dD10;
    GetVRFInterface getVRFContract = GetVRFInterface(GetVRFInterfaceAddress);

    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);

        questionList[1].questionName = "PRICE";
        questionList[1].questionDescription = "Guess the second digit after the decimal point";

        questionList[6].questionName = "VOLUME";
        questionList[6].questionDescription = "Guess remainder of volume divided by 3";

        questionList[2].questionName = "PRICE";
        questionList[2].questionDescription = "Guess the units";

        questionList[3].questionName = "PRICE";
        questionList[3].questionDescription = "Guess the tens";

        questionList[4].questionName = "PRICE";
        questionList[4].questionDescription = "Guess the hundreds";

        questionList[5].questionName = "PRICE";
        questionList[5].questionDescription = "Guess the first digit after the decimal point";

        propertyList[1] = "Crypto Currency";

        lifeLengthList[1].lifeLength = 1;
        lifeLengthList[1].gameQuantity = 10;
        lifeLengthList[1].title = "Daily";


        lifeLengthList[2].lifeLength = 7;
        lifeLengthList[2].gameQuantity = 4;
        lifeLengthList[2].title = "Weekly";

        lifeLengthList[3].lifeLength = 30;
        lifeLengthList[3].gameQuantity = 1;
        lifeLengthList[3].title = "Monthly";

        currencyQuantity = 10;


    }



// 1. Update currency list every monthly. currency list is volume of top 10.
    function makeCurrencyList() public{
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetCurrencyInfoInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        getCurrencyInfoContract.addCurrency(currencyQuantity);
    }

// 2. Get currency information after execute the function of makeCurrencyList
    function getCurrencyList() public{
        for(int256 i=1;i<=currencyQuantity;i++){
            currencyList[i].name = getCurrencyInfoContract.getCurrencyName(i);
            currencyList[i].fullName = getCurrencyInfoContract.getCurrencyFullName(i);
            currencyList[i].overviewUrl = getCurrencyInfoContract.getCurrencyOverviewUrl(i);
            currencyList[i].assetLaunchDate = getCurrencyInfoContract.getCurrencyAssetLaunchDate(i);
            currencyList[i].logoUrl = getCurrencyInfoContract.getCurrencyLogoUrl(i);
        }
    }


    function getRandom() public{
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetVRFInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");
        reqID_VRF=getVRFContract.getRandomNumber();
        randomNum=getVRFContract.getVRF() / 10000000;
    }

//
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
            optionsList[_gameId][1].optionsContet = 0;
            optionsList[_gameId][2].optionsContet = 1;
            optionsList[_gameId][3].optionsContet = 2;
        }
   }

// 3. make Game information list
    function makeGameInfo() public{
      totalGameQty=1;
        for(int256 i=1;i<=3;i++){  // i=1 daily,i=2 weekly,i=3 monthly
            for(int256 gameId=1;gameId<=lifeLengthList[i].gameQuantity;gameId++){
                gameList[totalGameQty].questionId = int256((int256(randomNum)*gameId) % 6 + 1);
                makeOptions((int256(randomNum)*gameId) % 2 + 1, totalGameQty);
                gameList[totalGameQty].currencyId = (int256(randomNum)*gameId) % currencyQuantity + 1;
                gameList[totalGameQty].revealTime = 0;
                gameList[totalGameQty].lifeLengthId = i;
                gameList[totalGameQty].property = propertyList[1];
                gameList[totalGameQty].isActivity = false;
                gameList[totalGameQty].isClose = false;
                totalGameQty++;
            }
        }
    }

// 4.
    function gameStatus() public{
            gameList[1].isActivity = true;
            gameList[1].isClose = true;

            gameList[1+lifeLengthList[1].gameQuantity].isActivity = true;
            gameList[1+lifeLengthList[1].gameQuantity].isClose = true;

            gameList[1+lifeLengthList[1].gameQuantity+lifeLengthList[2].gameQuantity].isActivity = true;
            gameList[1+lifeLengthList[1].gameQuantity+lifeLengthList[2].gameQuantity].isClose = true;

    }

    /*
        struct GameInfo{
            int256 gameId;
            bytes32 gameTitle;
            string gameQuestion;
            bytes gameDescription;
            //int256[][] gameAnsOptions;
            //uint gameWindowEndTime;
            uint gameParticipateStartTime;
            //uint gameParticipateEndTime;
            string gameWindow;
            string gameProperty;
            bytes32 gameLogoLink;
            int256 numOfParticipants;
        }
    */
// 5. return game information to fontend
    function returnGameInfo(int256 _gameId) public view returns(bytes32){
        GameInfo[4] memory gameInfo;
        for(int256 i=1;i<=3;i++){  // i=1 daily,i=2 weekly,i=3 monthly
            for(int256 gameId=1;gameId<=lifeLengthList[i].gameQuantity;gameId++){
                if(gameList[gameId].isActivity || gameList[gameId].isClose){
                    gameInfo[uint(i)].gameId = gameId;
                    gameInfo[uint(i)].gameTitle = currencyList[gameList[gameId].currencyId].name;
                    gameInfo[uint(i)].gameQuestion = questionList[gameList[gameId].questionId].questionDescription;
                    //gameInfo[uint(i)].gameDescription = currencyList[gameList[gameId].currencyId].currencyIntro;
                    gameInfo[uint(i)].gameParticipateStartTime = now;
                    gameInfo[uint(i)].gameWindow = lifeLengthList[i].title;
                    gameInfo[uint(i)].gameProperty = gameList[gameId].property;
                    gameInfo[uint(i)].gameLogoLink = currencyList[gameList[gameId].currencyId].logoUrl;
                }
            }
        }
        return gameInfo[uint(_gameId)].gameTitle;
    }

    function bytes32ToString(bytes32 _bytes32) public returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function getAnswer(int256 _gameId) public{
        string memory url_main;
        string memory url_sub;
        bytes32 reqID;
        string memory currencyName=bytes32ToString(currencyList[gameList[_gameId].currencyId].name);

        url_main="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
        url_sub="&tsyms=USD";

        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(GetAnswerInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");

        reqID=getAnswerContract.requestVolumeData(currencyName, questionList[gameList[_gameId].questionId].questionName, getAnswerContract.strAdd(url_main, currencyName, url_sub));

    }

    function returnAnswer() public view returns(uint256){
        //return getAnswerContract.getVolume();
    }



//
    function addParticipant(int256 _gameId, address _userAddress, int256 _optionId) public{
        optionsList[_gameId][_optionId].userAddress.push(_userAddress);
    }



    /**
     * Withdraw LINK from this contract
     *
     * DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES.
     */
    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }

}
