import { answerOptions } from "../helpers/contentMap";
import { IGameInfoType } from "../helpers/types";
import { getCurrecyBackupDesc } from "../helpers/utility";
export const gameListMock: IGameInfoType[] = [
  {
    gameId: 1,
    gameTitle: "TRX",
    gameQuestion:
      "Guess the first digit before the decimal point (unit digit)for the future price",
    gameDestribtion: getCurrecyBackupDesc("TRX"),
    gameAnsOptions: answerOptions,
    gameWindowStarTime: "2021-04-12 00:00:00",
    gameWindowEndTime: "2021-04-13 00:00:00",
    gameParticipateStartTime: "2021-04-14 00:00:00",
    gameWindow: "daily",
    gameProperty: "LINK",
    gamePropertyLogoLink:
      "https://www.cryptocompare.com/media/37746242/link.png",
    numOfParticipants: 43,
    totalPrice: 2323,
  },
  {
    gameId: 2,
    gameTitle: "ETH",
    gameQuestion:
      "Guess the tens digit (or tenths if below $5) of the future price",
    gameDestribtion: getCurrecyBackupDesc("ETH"),
    gameAnsOptions: answerOptions,
    gameWindowStarTime: "2021-04-13 00:00:00",
    gameWindowEndTime: "2021-04-14 00:00:00", // AsnwerRevealTime
    gameParticipateStartTime: "2021-04-10 00:00:00", //
    gameWindow: "weekly",
    gameProperty: "ETH",
    gamePropertyLogoLink:
      "https://www.cryptocompare.com/media/37746238/eth.png",
    numOfParticipants: 12,
    totalPrice: 123,
  },
  {
    gameId: 3,
    gameTitle: "BTC",
    gameQuestion:
      "Guess the hundreds digit (or hundredths if below $10)  of the future price",
    gameDestribtion: getCurrecyBackupDesc("BTC"),
    gameAnsOptions: answerOptions,
    gameWindowStarTime: "2021-04-01 00:00:00",
    gameWindowEndTime: "2021-05-01 00:00:00",
    gameParticipateStartTime: "2021-03-26 00:00:00",
    gameWindow: "monthly",
    gameProperty: "FIL",
    gamePropertyLogoLink:
      "https://www.cryptocompare.com/media/37746146/fil.png",
    numOfParticipants: 20,
    totalPrice: 234,
  },
  {
    gameId: 5,
    gameTitle: "USDC",
    gameQuestion: "USDC Disappears",
    gameDestribtion: getCurrecyBackupDesc("USDC"),
    gameAnsOptions: answerOptions,
    gameParticipateStartTime: "2021-03-26 00:00:00",
    // gameParticipateEndTime: Date, ** this equals to gameWindowStarTime
    gameWindow: "lifetime",
    gamePropertyLogoLink:
      "https://www.cryptocompare.com/media/34835941/usdc.png",
    gameProperty: "USDC",
    numOfParticipants: 123,
    totalPrice: 45,
  },
];
