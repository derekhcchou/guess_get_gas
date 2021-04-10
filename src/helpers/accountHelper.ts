import React, { Component } from "react"
import Web3 from "web3"
import DappToken from "../abis/DappToken.json"
import TokenFarm from "../abis/TokenFarm.json"
import ERC20 from "../abis/ERC20.json"
import {IGameInfoType, IUserDataType, IUserGame} from "./types"
import { isEmpty, isNumber } from "lodash"
import { ITabUserOptions } from "@testing-library/user-event"

const tokenAddress = "0xFab46E002BbF0b4509813474841E0716E6730136"; // FAU token address
const tokenName = "FAU";
export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable();
    console.log("window.ethereum enabled");
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    console.log("window.web3 new provider");
  } else {
      window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    )
  }
}


export const loadBlockchainData = async (gameInfo: IGameInfoType[]) => {
  console.log("loading blockchain data...");
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const firstAccount = accounts[0];
  const networkId = await web3.eth.net.getId();

  // Load FAU as the starting default Token Data
  const erc20 = new web3.eth.Contract(ERC20.abi, tokenAddress);
  
  // Retrieve user's balance in the wallet for defined token
  const erc20Balance = await erc20.methods.balanceOf(firstAccount).call();

  // Load DappToken
  console.log("loading blockchain data: dapp token ...");
  //@ts-ignore
  const dappTokenData = DappToken.networks[networkId];
  let dappToken, dappTokenAddress, dappTokenBalance;
  if (dappTokenData) {
    dappToken = new web3.eth.Contract(
      DappToken.abi,
      dappTokenData.address
    )
    dappTokenAddress = dappTokenData.address; // Dapp address
    dappTokenBalance = await dappToken.methods // Dapp current balance ?
      .balanceOf(firstAccount)
      .call();
  } else {
    console.log("DappToken contract not deployed to detected network.");
  }


  // Load TokenFarm
  console.log("loading blockchain data: tokenFarm token ...");
  //@ts-ignore
  const tokenFarmData = TokenFarm.networks[networkId];
  let tokenFarm, stakingBalance, userBalance, userGameList;
  if (tokenFarmData) {
    tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    )
    // need another function
    // userData = await retrieveUserData(tokenFarm, tokenAddress, firstAccount)
    stakingBalance = await updateStakingBalance(tokenFarm,tokenAddress, firstAccount )
    userBalance = await getUserBalance(tokenFarm, firstAccount);
    userGameList = await getAllUserGameList(tokenFarm, firstAccount, gameInfo);
  } else {
    console.log("TokenFarm contract not deployed to detected network.");
  }

  const accountDetails = {
    address: firstAccount,
    balance: Number(userBalance),
    gameList: userGameList || [], 
    networkId: networkId.toString(),
    tokenAddress: tokenAddress,
    tokenName: tokenName,
    erc20Balance: erc20Balance,
    dappTokenAddress: dappTokenAddress,
    stakingBalance: stakingBalance,
    tokenFarm: tokenFarm,
    // web3: web3,
    erc20: erc20,
     // dappToken: dappToken,
  } as IUserDataType
  return accountDetails;
}

/**
 * @param tokenFarm
 * @param tokenAddress
 * @param address
 * @returns stakingBalance as string
 */
export const updateStakingBalance = async (
    tokenFarm: any,
    tokenAddress:string, 
    account: string
  ) => {
    // const web3 = window.web3
    // const networkId = await web3.eth.net.getId()
    // const tokenFarmData = TokenFarm.networks[networkId]
    // const tokenFarm = new web3.eth.Contract(
    //   TokenFarm.abi,
    //   tokenFarmData.address
    // )
  const stakingBalance = await tokenFarm.methods
    .stakingBalance(tokenAddress, account) //account
    .call()
  return stakingBalance.toString();
}

export const stakeTokens = async (userData: IUserDataType, amount:string) => {
  const tokenFarmAddress = userData.tokenFarm._address;
  const tokenFarmMethods = userData.tokenFarm.methods;
  const convertedAmount = amount = window.web3.utils.toWei(amount, "Ether");
  userData.erc20.methods
    .approve(tokenFarmAddress, convertedAmount)
    .send({ from: userData.address})
    .on("transactionHash", (hash:any) => {
      tokenFarmMethods
        .stakeTokens(convertedAmount, userData.tokenAddress)
        .send({ from: userData.address })
        .on("transactionHash", (hash:any) => {
          console.log("Staked token successfully!");
        })
    })
};

export const unstakeTokens = async (userData: IUserDataType) => {
  const tokenFarmMethods = userData.tokenFarm.methods;
  tokenFarmMethods
    .unstakeTokens(userData.tokenAddress)
    .send({ from: userData.address })
    .on("transactionHash", (hash:any) => {
      console.log("Unstaked token successfully!");
    })
};

// NEW
export const getUserBalance = async (
  tokenFarm: any,
  address: string
) => {
  const users = await tokenFarm.methods
    .getUserBalance(address) //account
    .call()
  console.log("user current balance: ", users.toString());
  return users.toString();
}

export const getAllUserGameList = async (tokenFarm: any, userAddress: string, gameInfo: IGameInfoType[]) =>{
  let userGameList: IUserGame[]=[];
  if(tokenFarm.methods?.getUserGameInfo){
    gameInfo.forEach(async (game)=>{
      const res = await tokenFarm.methods
        .getUserGameInfo(userAddress, game.gameId) //account
        .call()
      const userGameInfo: IUserGame = {
        gameId:game.gameId,
        selectedAnswerId: Number(res.answerId),
        betPrice: Number(res.amount),
      }
      userGameList.push(userGameInfo);
    })
  }
  console.log("getAllUserGameList", userGameList)
  return userGameList;
}

export const getUserGameInfo = async (
  userData: IUserDataType,
  gameId: number,
)=> {
  const tokenFarm = await getTokenFarm(userData.networkId);
  const res = await tokenFarm.methods
    .getUserGameInfo(userData.address, gameId) //account
    .call()
  const userGameInfo: IUserGame = {
    gameId:gameId,
    selectedAnswerId: Number(res.answerId),
    betPrice: Number(res.amount),
  }
  console.log("getUserGameInfo: ", userGameInfo);
  return userGameInfo as IUserGame;
}

 // "address": "0x00D1C8c81cf4D056D3Dd4E6E9FF6aDa24A5B2cd2",
 export const reloadBalance = async (userData: IUserDataType, amount:string) => {
    console.log("reloading balance...")
    const tokenFarm = await getTokenFarm(userData.networkId);
    if(tokenFarm){
      const tokenFarmMethods = tokenFarm.methods;
      const accounts = await window.ethereum.enable();
      const address = accounts[0];
      try {
        const tokenFarmAddress = userData.tokenFarm._address;
        const response = await tokenFarmMethods.reloadBalance(address, Number(amount)).send({
                  from: address })
      }catch(err){
        console.log("Error: reloadBalance", err);
      }
      const newBalance = await getUserBalance(tokenFarm, address)
      return Number(newBalance);
    }
    return undefined;
 }

 export const withdrawBalance = async (userData: IUserDataType, amount:string) => {
    console.log("withdrawing balance...")
    const tokenFarm = await getTokenFarm(userData.networkId);
    if(tokenFarm){
      const tokenFarmMethods = tokenFarm.methods;
      const accounts = await window.ethereum.enable();
      const address = accounts[0];
      try {
        const tokenFarmAddress = userData.tokenFarm._address;
        const response = await tokenFarmMethods.withdrawBalance(address, Number(amount)).send({
                  from: address })
      }catch(err){
        console.log("Error: reloadBalance", err);
      }
      const newBalance = await getUserBalance(tokenFarm, address);
      return Number(newBalance);
    }
    return undefined;
}

export const joinNewGame = async (userData: IUserDataType, amount: string, gameId: number, answerId: number) =>{
  console.log("joinning new game...")
  const tokenFarm = await getTokenFarm(userData.networkId);
  if(tokenFarm){
    const tokenFarmMethods = tokenFarm.methods;
    const accounts = await window.ethereum.enable();
    const address = accounts[0];
    try {
      const tokenFarmAddress = userData.tokenFarm._address;
      const response = await tokenFarmMethods.addGameInfoToUserData(address, Number(gameId), Number(answerId), Number(amount))
        .send({from: address })
    }catch(err){
      console.error("Error: reloadBalance", err);
    }
    const newBalance = await getUserBalance(tokenFarm, address);
    const userGameInfo = await getUserGameInfo(userData, gameId);
    return {newBalance, userGameInfo};
  }
}



export const getTokenFarm = async (networkId:Number)=>{
  //@ts-ignore
  const tokenFarmData = TokenFarm.networks[networkId];
  const web3 = window.web3;
  let tokenFarm;
  if (tokenFarmData) {
    tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    )
    return tokenFarm;
  } else {
    console.log("TokenaFarm contract not deployed to detected network.");
    return undefined;
  }
}