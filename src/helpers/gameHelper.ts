import Web3 from "web3";
import ERC20 from "../abis/ERC20.json";
import {getTokenFarm, loadWeb3} from "./accountHelper"
import AddGameInfo from "../abis/DappToken.json"

import { rest } from "lodash";

export const getGameInfoList = async ()=> {
    // loadWeb3();
    // const tokenFarm = await getTokenFarm(4);
    // const res = await tokenFarm.methods
    //     .getGameInfoList() //account
    //     .call()
    // console.log("getGameInfoList: ", res.toString());
     loadWeb3();
    const addGameInfo = await getAddGameInfo(4);
    // const res = await addGameInfo.methods
    //     .getGameInfoList() //account
    //     .call()
    // console.log("getGameInfoList: ", res.toString());
}

export const getAddGameInfo = async (networkId:number)=>{
    //@ts-ignore
    const addGameInfoData = AddGameInfo.networks[networkId];
    const web3 = window.web3;
    let addGameInfo;
    if (addGameInfoData) {
        addGameInfo = new web3.eth.Contract(
            AddGameInfo.abi,
            addGameInfoData.address
      )
      console.log("addGameInfo",addGameInfo)
      return addGameInfo;
    } else {
      console.log("getAddGameInfo contract not deployed to detected network.");
      return undefined;
    }
  }