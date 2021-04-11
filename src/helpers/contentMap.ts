import { IGameAnserType } from "./types"

// Game Rules to show on the Gameroom Page
export const gameRuleMap = {
    daily: "1. How well do you know about this crypto currency? Check out the story behind it!\n\
    2. Everyday, our game room will have different kinds of topics for you to join!\n\
    3. You will have unlimited access to our daily games if you stake 10 USDC.\n\
    4. Select an option, make your guess!\n\
    5. Your choice will be locked once you submitted. Your stake will be held until the answer is revealed, you may choose to retrieve your stake whenever you're not participating the game.\n\
    6. Answer will be revealed once time is up.\n\
    7. Winners will get a NFT of the topic.\n\
    8. Your stake will be unlocked if you didn't win and/or if you're not participating the game.",
    weekly: "1. How well do you know about this crypto currency? Check out the story behind it!\n\
    2. Everyweek, our game room will have different kinds of topics for you to join!\n\
    3. Select an option, make your guess!\n\
    4. Stake an amount of USDC to participate! Stake from platform balance or your connected wallet.\n\
    5. Your choice will be locked once you submitted.\n\
    6. Answer will be revealed once time is up.\n\
    7. Winners get rewards according to formula: (Your stake / Total stake from all participants) * 0.025\n\
    8. Your stake will be returned to your platform balance if you didn't win.\n\
    9. Your returned stake will be returned to platform balance and can be used for next game.",
    monthly: "1. How well do you know about this crypto currency? Check out the story behind it!\n\
    2. Everyweek, our game room will have different kinds of topics for you to join!\n\
    3. Select an option, make your guess!\n\
    4. Stake an amount of USDC to participate! Stake from platform balance or your connected wallet.\n\
    5. Your choice will be locked once you submitted.\n\
    6. Answer will be revealed once time is up.\n\
    7. Winners get rewards according to formula: (Your stake / Total stake from all participants) * 0.01\n\
    8. Your stake will be returned to your platform balance if you didn't win.\n\
    9. Your returned stake will be returned to platform balance and can be used for next game.",
    lifetime: "1. This is an event that will happen for extremely little chance.\n\
    2. This game will only refresh after event has happened\n\
    3. Select an option, make your guess!\n\
    4. Stake an amount of USDC to participate! Stake from platform balance or your connected wallet.\n\
    5. Your choice will be locked once you submitted.\n\
    6. Answer will be revealed once time is up.\n\
    7. Winners get rewards according to formula: (Your stake / Total stake from all participants) * 0.012 * Life length of this game (in years).\n\
    8. Your stake will be returned to your platform balance if you didn't win.\n\
    9. Your returned stake will be returned to platform balance and can be used for next game."
}

// To save backend call, we also have a copy on the UI to show the answer options
export const answerOptions:IGameAnserType[]=[
    {
        answerId: 1,
        answerText: "1 or 2",
      },{
        answerId: 2,
        answerText: "3 or 4",
      },{
        answerId: 3,
        answerText: "5 or 6",
      },{
        answerId: 4,
        answerText: "7 or 8",
      },{
        answerId: 5,
        answerText: "9 or 0",
      }
    ];

// If backend does not find currency description, UI provides limited information to users
export const currencyDescription =
    [
        {
            key: "AVT",
            desc: "Ethereum network fees are all time high, whilst scalability issues can potentially drive users and enterprises away from Ethereum. Aventus Network is a layer-2 scaling solution that enables digital asset issuance, management and ownership, bringing the scale of permissioned blockchain and the security and interoperability of public blockchains. All without the shortcomings of either world. Features Scale: The Aventus Network (AvN) can scale to 2,000 transactions per second. This is 133 times more than Ethereum. Price: The AvN average transaction cost will start at $0.01 (paid in AVT) and is only decreasing with future optimisations in the roadmap. This is 99% cheaper than the average Ethereum transaction over the last year. Speed: The AvN will process transactions into blocks within 0.13seconds. This is 100 faster than the Ethereum blockchain. Enterprise Grade: The AvN will be onboarding over 8,500,000 transactions from clients that have been active on private test networks over the last year.",
        },{
            key: "BTC",
            desc: "Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009. Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.” Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the distinction of being the first-ever cryptocurrency to come into actual use.",
        },{
            key: "BTT",
            desc: "BitTorrent captured the hearts of many music and movie enthusiasts in the early 2000s when it launched software that facilitated file sharing over a peer-to-peer network. Rather than downloading or uploading files to a single server, users joined a network of computers running a software enabling them to exchange files and data with each other. With BTT token, the BitTorrent team hopes to add incentives to torrenting and solve issues such as slow download speed and the diminishing availability of files over time. As such, BTT coin is bought and spent by those who request files or wish to increase their download speed, while providers have to receive and sell BTT in order to be compensated for sharing the files on their systems.",
        },{
            key: "ETH",
            desc: "Ethereum network fees are all time high, whilst scalability issues can potentially drive users and enterprises away from Ethereum. Aventus Network is a layer-2 scaling solution that enables digital asset issuance, management and ownership, bringing the scale of permissioned blockchain and the security and interoperability of public blockchains. All without the shortcomings of either world. Features Scale: The Aventus Network (AvN) can scale to 2,000 transactions per second. This is 133 times more than Ethereum. Price: The AvN average transaction cost will start at $0.01 (paid in AVT) and is only decreasing with future optimisations in the roadmap. This is 99% cheaper than the average Ethereum transaction over the last year. Speed: The AvN will process transactions into blocks within 0.13seconds. This is 100 faster than the Ethereum blockchain. Enterprise Grade: The AvN will be onboarding over 8,500,000 transactions from clients that have been active on private test networks over the last year.",
        },{
            key: "TRX",
            desc: "TRON is a blockchain-based operating system that aims to ensure this technology is suitable for daily use. Whereas Bitcoin can handle up to six transactions per second, and Ethereum up to 25, TRON claims that its network has capacity for 2,000 TPS — 24/7. This project is best described as a decentralized platform focused on content sharing and entertainment — and to this end, one of its biggest acquisitions was the file sharing service BitTorrent back in 2018. Overall, TRON has divided its goals into six phases. These include delivering simple distributed file sharing, driving content creation through financial rewards, allowing content creators to launch their own personal tokens and decentralizing the gaming industry. TRON is also one of the most popular blockchains for building DApps.",
        },{
            key: "XRP",
            desc: "To begin with, it’s important to understand the difference between XRP, Ripple and RippleNet. XRP is the currency that runs on a digital payment platform called RippleNet, which is on top of a distributed ledger database called XRP Ledger. While RippleNet is run by a company called Ripple, the XRP Ledger is open-source and is not based on blockchain, but rather the previously mentioned distributed ledger database. The RippleNet payment platform is a real-time gross settlement (RTGS) system that aims to enable instant monetary transactions globally. While XRP is the cryptocurrency native to the XRP Ledger, you can actually use any currency to transact on the platform. While the idea behind the Ripple payment platform was first voiced in 2004 by Ryan Fugger, it wasn’t until Jed McCaleb and Chris Larson took over the project in 2012 that Ripple began to be built (at the time, it was also called OpenCoin).",
        },{
            key: "WRX",
            desc: "WRX is the utility token of WazirX. WRX token is based on the Binance blockchain. Its total supply is 1 Billion. The token holders will be rewarded with various benefits on the trading exchange like trading fee discounts, WRX trade mining, token airdrop, margin fee, and more. WRX and WRX are backed by Indian entrepreneurs with over 10 years of experience in building and scaling global products out of India. WazirX was also acquired by Binance in November 2019. The goal of WazirX is to make crypto accessible to everyone in India.",
        },{
            key: "WINK",
            desc: "WINk is a gaming platform for users to play socialize and stake across multiple blockchain ecosystems that leverages the WIN token as the native digital asset within the platform. Through behavioral mining innovative token economy design and other incentive mechanisms WINk aims to build an ecosystem that provides a high-quality decentralized gaming experience to enable developers to build dApps that drive genuine adoption and engages users to participate and contribute as active stakeholders in the platform.",
        },{
            key: "BNB",
            desc: "BNB was launched through an initial coin offering in 2017, 11 days before the Binance cryptocurrency exchange went online. It was originally issued as an ERC-20 token running on the Ethereum network, with a total supply capped at 200 million coins, and 100 million BNBs offered in the ICO. However, the ERC-20 BNB coins were swapped with BEP2 BNB on a 1:1 ratio in April 2019 with the launch of the Binance Chain mainnet, and are now no longer hosted on Ethereum. BNB can be used as a payment method, a utility token to pay for fees on the Binance exchange and for participation in token sales on the Binance launchpad. BNB also powers the Binance DEX (decentralized exchange).",
        },{
            key: "EOS",
            desc: "EOS is a platform that’s designed to allow developers to build decentralized apps (otherwise known as DApps for short.) The project’s goal is relatively simple: to make it as straightforward as possible for programmers to embrace blockchain technology — and ensure that the network is easier to use than rivals. As a result, tools and a range of educational resources are provided to support developers who want to build functional apps quickly. Other priorities include delivering greater levels of scalability than other blockchains, some of which can only handle less than a dozen transactions per second. EOS also aims to improve the experience for users and businesses. While the project tries to deliver greater security and less friction for consumers, it also vies to unlock flexibility and compliance for enterprises. The blockchain launched back in June 2018.",
        }
    ];


export const startTimeAfterParticipationTime = {
    "daily":1,
    "weekly":3,
    "monthly":7,
    "lifetime":0,
}

export const endTimeAfterStartTime = {
    "daily":1,
    "weekly":7,
    "monthly":30,
    "lifetime":0,
}
