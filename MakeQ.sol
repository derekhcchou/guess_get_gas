
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";


interface NumberInterface {
  function strAdd(string calldata _a, string calldata _b, string calldata _c) external returns(string memory);
  function getVolume() external view returns (uint256);
  function requestVolumeData(string calldata _a, string calldata _b, string calldata _apiUrl) external returns (bytes32 requestId);
}

contract CallContract is ChainlinkClient{

    int256 public Qcount;
    int256 public rand_a;
    int256 public rand_b;
    bytes32 public reqID;
     struct Qlist{
         string title;
         string question;
         string story;
         uint revealTime;
         uint lifeLength;  //daily=1,weekly=7,monthly=30
         string property;
         string topic;
    }

     struct Coinlist{
         string title;
         string story;
    }

    mapping (int256 => Coinlist) public coinlist;
    mapping (int256 => Qlist) public qlist;
    mapping (int256 => mapping(int256 => string)) public options;
    mapping (int256 => string) public Qtopic;
    string public apiUrl;

    uint256 public volume;

     address NumberInterfaceAddress = 0x24f772EdAe07023a12C5254eF293d1653fd6eEe1;

    NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);


    constructor() public {

        setPublicChainlinkToken();
        coinlist[1].title="AAVE";
        coinlist[2].title="AVAX";
        coinlist[3].title="DODO";
        coinlist[4].title="DOT";
        coinlist[5].title="ETH";
        coinlist[6].title="FIL";
        coinlist[7].title="GRT";
        coinlist[8].title="LINK";
        coinlist[9].title="MATIC";
        coinlist[10].title="MPH";
        coinlist[11].title="SNX";
        coinlist[12].title="USDC";

        coinlist[1].story="https://www.cryptocompare.com/media/37071994/aave.png";
        coinlist[2].story="https://www.cryptocompare.com/media/37305719/avax.png";
        coinlist[3].story="https://www.cryptocompare.com/media/37305757/dodo.png";
        coinlist[4].story="https://www.cryptocompare.com/media/37746348/dot.png";
        coinlist[5].story="https://www.cryptocompare.com/media/37746238/eth.png";
        coinlist[6].story="https://www.cryptocompare.com/media/37746146/fil.png";
        coinlist[7].story="https://www.cryptocompare.com/media/37746418/the-graph-trans.png";
        coinlist[8].story="https://www.cryptocompare.com/media/37746242/link.png";
        coinlist[9].story="https://www.cryptocompare.com/media/37746047/matic.png";
        coinlist[10].story="https://www.cryptocompare.com/media/37746523/morpher-trans.png";
        coinlist[11].story="https://www.cryptocompare.com/media/35309690/hav.png";
        coinlist[12].story="https://www.cryptocompare.com/media/34835941/usdc.png";

        Qtopic[1]="PRICE";  //*100 % 3 = ?
        Qtopic[2]="VOLUME24HOUR";  // Range


        Qcount=1;
    }

    function makeOptions() public view returns(uint256){
        return numberContract.getVolume();
    }

    function getnow() public view returns(uint256){
        return now;
    }

    function makeQ_daily() public{

        string memory url_a;
        string memory url_b;

        rand_a= int256(getnow())%12+1;
        rand_b= int256(getnow())%2+1;

        url_a="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
        url_b="&tsyms=USD";

        apiUrl=numberContract.strAdd(url_a, coinlist[rand_a].title, url_b);

        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(NumberInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");

        reqID=numberContract.requestVolumeData(coinlist[rand_a].title, Qtopic[rand_b], apiUrl);



        qlist[Qcount].title=coinlist[rand_a].title;
        qlist[Qcount].story=coinlist[rand_a].story;
        qlist[Qcount].question=Qtopic[rand_b];
        qlist[Qcount].revealTime=now;
        qlist[Qcount].lifeLength=1;
        qlist[Qcount].property="Crypto";
        qlist[Qcount].topic=Qtopic[rand_b];

        if (rand_b==2){
            options[Qcount][1] = "-5% ~ -10%";
            options[Qcount][2] = "-5% ~ 5%";
            options[Qcount][3] = "5% ~ 10%";
        }else{
            options[Qcount][1] = "0";
            options[Qcount][2] = "1";
            options[Qcount][3] = "2";
        }


        Qcount++;

   }

   function makeQ_weekly() public{

        string memory url_a;
        string memory url_b;

        rand_a= int256(getnow())%12+1;
        rand_b= int256(getnow())%2+1;

        url_a="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
        url_b="&tsyms=USD";

        apiUrl=numberContract.strAdd(url_a, coinlist[rand_a].title, url_b);

        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(NumberInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");

        reqID=numberContract.requestVolumeData(coinlist[rand_a].title, Qtopic[rand_b], apiUrl);



        qlist[Qcount].title=coinlist[rand_a].title;
        qlist[Qcount].story=coinlist[rand_a].story;
        qlist[Qcount].question=Qtopic[rand_b];
        qlist[Qcount].revealTime=now;
        qlist[Qcount].lifeLength=7;
        qlist[Qcount].property="Crypto";
        qlist[Qcount].topic=Qtopic[rand_b];

        if (rand_b==2){
            options[Qcount][1] = "-5% ~ -10%";
            options[Qcount][2] = "-5% ~ 5%";
            options[Qcount][3] = "5% ~ 10%";
        }else{
            options[Qcount][1] = "0";
            options[Qcount][2] = "1";
            options[Qcount][3] = "2";
        }


        Qcount++;

   }


   function makeQ_month() public{

        string memory url_a;
        string memory url_b;

        rand_a= int256(getnow())%12+1;
        rand_b= int256(getnow())%2+1;

        url_a="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
        url_b="&tsyms=USD";

        apiUrl=numberContract.strAdd(url_a, coinlist[rand_a].title, url_b);

        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(NumberInterfaceAddress, linkToken.balanceOf(address(this))), "Unable to transfer");

        reqID=numberContract.requestVolumeData(coinlist[rand_a].title, Qtopic[rand_b], apiUrl);

        qlist[Qcount].title=coinlist[rand_a].title;
        qlist[Qcount].story=coinlist[rand_a].story;
        qlist[Qcount].question=Qtopic[rand_b];
        qlist[Qcount].revealTime=now;
        qlist[Qcount].lifeLength=30;
        qlist[Qcount].property="Crypto";
        qlist[Qcount].topic=Qtopic[rand_b];

        if (rand_b==2){
            options[Qcount][1] = "-5% ~ -10%";
            options[Qcount][2] = "-5% ~ 5%";
            options[Qcount][3] = "5% ~ 10%";
        }else{
            options[Qcount][1] = "0";
            options[Qcount][2] = "1";
            options[Qcount][3] = "2";
        }
        Qcount++;
   }


}
