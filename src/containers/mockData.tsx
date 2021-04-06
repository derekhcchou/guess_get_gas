import {IGameInfoType} from "../helpers/types"
export const gameListMock: IGameInfoType[] = [
    {
        gameId:1,
        gameTitle: "Daily Game",
        gameQuestion: "Price of LINK on 4/1",
        gameDestribtion:"LINK is blah blah blah something  blah blah blah. LINK is blah blah blah something  blah blah blah. LINK is blah blah blah something NFT blah blah blah. LINK is blah blah blah something NFT blah blah blah. LINK is blah blah blah something NFT blah blah blah. LINK is blah blah blah something NFT blah blah blah",
        gameAnsOptions:[
            {
                answerId: 1,
                answerText:"$30"
            }, {
                answerId: 1,
                answerText:"$40"
            },{
                answerId: 1,
                answerText:"$50"}],
        gameWindowStarTime: "2021-04-01 00:00:00",
        gameWindowEndTime: "2021-04-02 00:00:00",
        gameParticipateStartTime: "2021-03-26 00:00:00",
        // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
        gameWindow: "daily",
        gameProperty: "LINK",
        gamePropertyLogoLink:"https://www.cryptocompare.com/media/37746242/link.png",
        numOfParticipants: 100,
        totalPrice: 2342,
    },
    {
        gameId:2,
        gameTitle: "Weekly Game",
        gameQuestion: "Volatility of Etherum price between 4/5-4/11",
        gameDestribtion:"Etherum price blah blah blah. Volatility is blah blah blah. Etherum price blah blah blah. Volatility is blah blah blah. Etherum price blah blah blah. Volatility is blah blah blah. Etherum price blah blah blah. Volatility is blah blah blah. Etherum price blah blah blah. Volatility is blah blah blah. ",
        gameAnsOptions:[
            {
                answerId: 1,
                answerText:"1"
            }, {
                answerId: 1,
                answerText:"1.2"
            },{
                answerId: 1,
                answerText:"1.3"}],
        gameWindowStarTime: "2021-04-05 00:00:00", 
        gameWindowEndTime: "2021-04-12 00:00:00", // AsnwerRevealTime
        gameParticipateStartTime: "2021-03-26 00:00:00", // 
        // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
        gameWindow: "weekly",
        gameProperty: "ETH",
        gamePropertyLogoLink:"https://www.cryptocompare.com/media/37746238/eth.png",
        numOfParticipants: 300,
        totalPrice: 2342352,
    },
    {
        gameId:3,
        gameTitle: "Monthly Game",
        gameQuestion: "Total Growth of FIL in April",
        gameDestribtion:"FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah. FILECOIN is blah blah blah",
        gameAnsOptions:[
            {
                answerId: 1,
                answerText:"1"
            }, {
                answerId: 1,
                answerText:"1.2"
            },{
                answerId: 1,
                answerText:"1.3"}],
        gameWindowStarTime: "2021-04-01 00:00:00",
        gameWindowEndTime: "2021-05-1 00:00:00",
        gameParticipateStartTime: "2021-03-26 00:00:00",
        // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
        gameWindow: "monthly",
        gameProperty: "FIL",
        gamePropertyLogoLink:"https://www.cryptocompare.com/media/37746146/fil.png",
        numOfParticipants: 200,
        totalPrice: 642435,
    },
    {
        gameId:4,
        gameTitle: "Test Daily Game",
        gameQuestion: "Price of MATIC on 04-02",
        gameDestribtion:"MATIC is blah blah blah something NFT blah blah blah, MATIC is blah blah blah something NFT blah blah blah, MATIC is blah blah blah something NFT blah blah blah, MATIC is blah blah blah something NFT blah blah blah, MATIC is blah blah blah something NFT blah blah blah",
        gameAnsOptions:[
            {
                answerId: 1,
                answerText:"$30"
            }, {
                answerId: 1,
                answerText:"$40"
            },{
                answerId: 1,
                answerText:"$50"}],
        gameWindowStarTime: "2021-03-26 00:00:00",
        gameWindowEndTime: "2021-04-02 00:00:00",
        gameParticipateStartTime: "2021-03-26 00:00:00",
        // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
        gameWindow: "daily",
        gameProperty: "MATIC",
        gamePropertyLogoLink:"https://www.cryptocompare.com/media/37746047/matic.png",
        numOfParticipants: 100,
        totalPrice: 2342,
    },
    {
        gameId:5,
        gameTitle: "Lifetime Game",
        gameQuestion: "USDC Disappears",
        gameDestribtion:"USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah. USDC is blah blah blah USDC is blah blah blah",
        gameAnsOptions:[],
        gameWindowStarTime: "",
        gameWindowEndTime: "",
        gameParticipateStartTime: "2021-03-26 00:00:00",
        // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
        gameWindow: "lifetime",
        gamePropertyLogoLink:"https://www.cryptocompare.com/media/34835941/usdc.png",
        gameProperty: "USDC",
        numOfParticipants: 100000,
        totalPrice: 64345,
    }
  ]