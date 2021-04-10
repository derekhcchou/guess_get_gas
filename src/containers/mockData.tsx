import {IGameInfoType} from "../helpers/types"
export const gameListMock: IGameInfoType[] = [
    {
        gameId:1,
        gameTitle: "Daily Game",
        gameQuestion: "Price of LINK on 4/1",
        gameDestribtion:"Chainlink is a blockchain-base middleware, acting as a bridge between cryptocurrency smart contracts and off-chain resources like data feeds, various web APIs, and traditional bank account payments. This way, Chainlink allows Smart Contracts to communicate with external resources on their own. LINK is an ERC20 token based on the Ethereum Blockchain. It is used to pay Chainlink Node operators for the retrieval of data from off-chain data feeds, formatting of data into blockchain readable formats, off-chain computation, and uptime guarantees they provide as operators.",
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
        gameDestribtion:"Filecoin is a decentralized storage network that turns cloud storage into an algorithmic market. The market runs on a blockchain with a native protocol token (also called “Filecoin”), which miners earn by providing storage to clients. Conversely, clients spend Filecoin hiring miners to store or distribute data. Filecoin miners compete to mine blocks with sizable rewards, but Filecoin mining power is proportional to active storage, which directly provides a useful service to clients.",
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
        gameDestribtion:"Filecoin is a decentralized storage network that turns cloud storage into an algorithmic market. The market runs on a blockchain with a native protocol token (also called “Filecoin”), which miners earn by providing storage to clients. Conversely, clients spend Filecoin hiring miners to store or distribute data. Filecoin miners compete to mine blocks with sizable rewards, but Filecoin mining power is proportional to active storage, which directly provides a useful service to clients.",
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
        gameDestribtion:"Matic provides scalable, secure and instant transactions using sidechains based on an adapted implementation of Plasma framework for asset security and a decentralized network of Proof-of-Stake (PoS) validators. In short, it allows anyone to create scalable DApps while ensuring a superior user experience in a secure and decentralized manner. It has a working implementation for Ethereum on Ropsten Testnet. Matic intends to support other blockchains in the future which will enable it to provide interoperability features alongside offering scalability to existing public blockchains. Matic Network is expanding tech scope and mission and becoming Polygon — Ethereum’s Internet of Blockchains.",
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
        gameDestribtion:"USD Coin (USDC) is a fully collateralized US Dollar stable coin. It is built on the open source fiat stable coin framework developed by CENTRE, and Circle is the first of several forthcoming issuers of USDC. USDC is designed to minimize price volatility and it does so by ensuring that every unit of USDC is only created when a corresponding US Dollar is deposited into a reserve bank account. Its major application at this point is as a mechanism for trading and hedging in global crypto capital markets. However, USDC is being adopted for use cases such as lending, payments, investments, and further applications within financial contracts such as derivatives contracts, insurance contracts, and security tokens.",
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