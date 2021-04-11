import { getTokenFarm, loadWeb3 } from "./accountHelper";
import {
  answerOptions,
  endTimeAfterStartTime,
  startTimeAfterParticipationTime,
} from "./contentMap";
import { IGameInfoType } from "./types";
import { ensureIsDate, getCurrecyBackupDesc } from "./utility";
import Moment from "moment";
import { gameListMock } from "./../containers/mockData";

export const getGameInfoList = async () => {
  loadWeb3();
  const tokenFarm = await getTokenFarm(4);
  return gameListMock;
  // try {
  //   let gameInfoList: IGameInfoType[] = [];
  //   const res = await tokenFarm.methods
  //     .getAvailableGameIds() //account
  //     .call();
  //   gameInfoList = await getGameInfoByIds(res, tokenFarm);
  //   return gameInfoList;
  // } catch (err) {
  //   console.log("Error: ", err);
  //   return [];
  // }
};

const dateFormat = "MM/DD/YYYY HH:MM:SS";
export const getGameInfoByIds = async (ids: string[], tokenFarm: any) => {
  let gameInfoList: IGameInfoType[] = [];
  try {
    ids.forEach(async (id: string) => {
      const res = await tokenFarm.methods
        .gameInfoList(id) //account
        .call();
      //   0 int256 gameId;
      //   1 string gameTitle;
      //   2 string gameQuestion;
      //   3 string gameDescription;
      //   4 uint256 gameParticipateStartTime;
      //   5 string gameWindow; // Daily, Weekly, Monthly, Lifetime
      //   6 string gameProperty;
      //   7 string gameLogoLink;
      //   8 int256 numOfParticipants;
      const participatingTime = Moment.unix(res.gameParticipateStartTime)
        .startOf("day")
        .format(dateFormat);
      let game: IGameInfoType = {
        gameId: res.gameId,
        gameTitle: res.gameTitle,
        gameQuestion: res.gameQuestion,
        gameDestribtion:
          res.gameDescription || getCurrecyBackupDesc(res.gameTitle),
        gameAnsOptions: answerOptions,
        gameWindowStarTime: participatingTime,
        gameWindowEndTime: participatingTime,
        gameParticipateStartTime: participatingTime,
        gameWindow: res.gameWindow,
        gameProperty: res.gameProperty,
        gamePropertyLogoLink:
          "https://www.cryptocompare.com/" + res.gameLogoLink,
        numOfParticipants: Number(res.numOfParticipants),
        totalPrice: 0,
      };
      gameInfoList.push(generateTime(game));
    });
    return gameInfoList;
  } catch (err) {
    console.log("Error: ", err);
    return [];
  }
};

/**
 *
 * This function is to generate the actual game window start and end time on the UI
 * @param game
 * @returns gameInfo: IGameInfoType
 */
export const generateTime = (game: IGameInfoType) => {
  let updatedGame = game;
  if (ensureIsDate(game.gameParticipateStartTime)) {
    const frequent = updatedGame.gameWindow.toLowerCase() as
      | "daily"
      | "weekly"
      | "monthly"
      | "lifetime";
    updatedGame.gameWindowStarTime = Moment(
      updatedGame.gameParticipateStartTime
    )
      .add(startTimeAfterParticipationTime[frequent], "days")
      .format(dateFormat);
    updatedGame.gameWindowEndTime = Moment(updatedGame.gameParticipateStartTime)
      .add(
        startTimeAfterParticipationTime[frequent] +
          endTimeAfterStartTime[frequent],
        "days"
      )
      .format(dateFormat);
  } else {
    console.log("Incorrect date/time format", game.gameParticipateStartTime);
  }
  return updatedGame;
};
