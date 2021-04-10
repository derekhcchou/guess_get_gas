import { getTokenFarm } from "./accountHelper";

 

export const getGameInfoList = async (
) => {
  const tokenFarm = await getTokenFarm(4);
  const res = await tokenFarm.methods
    .gameList() //account
    .call()
  console.log("user current balance: ", res.toString());
}