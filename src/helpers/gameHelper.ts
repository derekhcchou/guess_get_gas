import { setSessionObject } from "../context/sessionStore";
import { getTokenFarm, loadWeb3 } from "./accountHelper";
import { IGameAnserType, IGameInfoType } from "./types";

export const getGameInfoList = async (
) => {
  loadWeb3();
  const tokenFarm = await getTokenFarm(4);
  try{
    let gameInfoList: IGameInfoType[] = [];
    const res = await tokenFarm.methods
      .getAvailableGameIds() //account
      .call()
    gameInfoList = await getGameInfoByIds(res,tokenFarm);
    return gameInfoList;
  }catch(err){
    console.log("Error: ", err);
    return [];
  }
}

export const getGameInfoByIds = async (ids:string[], tokenFarm: any)=>{
  let gameInfoList: IGameInfoType[] = [];
  try{
    ids.forEach(async (id:string)=> {
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
      let game: IGameInfoType = {
        gameId: res.gameId,
        gameTitle: res.gameTitle,
        gameQuestion: res.gameQuestion,
        gameDestribtion: res.gameDescription,
        gameAnsOptions:[],
        gameWindowStarTime: "",
        gameWindowEndTime: "", 
        gameParticipateStartTime:new Date(parseInt(res.gameParticipateStartTime, 10)).toString(),
        gameWindow: res.gameWindow,
        gameProperty:res.gameProperty,
        gamePropertyLogoLink: "https://www.cryptocompare.com/"+res.gameLogoLink,
        numOfParticipants: Number(res.numOfParticipants),
        totalPrice: 0,
      }
      gameInfoList.push(game);
    });
    return gameInfoList;
  }catch(err){
    console.log("Error: ", err);
    return [];
  }
}