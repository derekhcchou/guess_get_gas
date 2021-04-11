import { IGameAnserType } from "./types"

export const gameRuleMap = {
    daily: "We need to put some rules here right???  Well according to our UI layout, we should :))) So this is the rule for daily games",
    weekly: "We need to put some rules here right???  Well according to our UI layout, we should :))) So this is the rule for weekly games",
    monthly: "We need to put some rules here right???  Well according to our UI layout, we should :))) So this is the rule for monthly games",
    lifetime: "We need to put some rules here right???  Well according to our UI layout, we should :))) So this is the rule for lifetime games",
}

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

export const currencyDescription = 
    [
        {
            key: "AVT",
            desc: "Aventus is a layer-2 blockchain protocol that brings scalability, lower costs, and speed to Ethereum transactions.",
        },{
            key: "BTC",
            desc: "Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.",
        },{
            key: "BTT",
            desc: "BitTorrent is a popular peer-to-peer (P2P) file sharing and torrent platform which has become increasingly decentralized in recent years.",
        },{
            key: "ETH",
            desc: "Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.",
        },{
            key: "TRON",
            desc: "TRON is a blockchain-based operating system that aims to ensure this technology is suitable for daily use. Whereas Bitcoin can handle up to six transactions per second, and Ethereum up to 25, TRON claims that its network has capacity for 2,000 TPS — 24/7.",
        },{
            key: "XRP",
            desc: "To begin with, it’s important to understand the difference between XRP, Ripple and RippleNet. XRP is the currency that runs on a digital payment platform called RippleNet, which is on top of a distributed ledger database called XRP Ledger.",
        },{
            key: "WRX",
            desc: "WRX is the utility token of WazirX. WRX token is based on the Binance blockchain. Its total supply is 1 Billion.",
        },{
            key: "WINK",
            desc: "WINk is a gaming platform for users to play socialize and stake across multiple blockchain ecosystems that leverages the WIN token as the native digital asset within the platform.",
        },{
            key: "BNB",
            desc: "BNB was launched through an initial coin offering in 2017, 11 days before the Binance cryptocurrency exchange went online.",
        },{
            key: "EOS",
            desc: "EOS is a platform that’s designed to allow developers to build decentralized apps (otherwise known as DApps for short.)",
        }        
    ]