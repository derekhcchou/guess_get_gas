import {gameRuleMap} from "./contentMap"
import {ListGroup} from "react-bootstrap"

export const getGameroomRules = (frequent: string)=>{
    switch (frequent.toLowerCase()){
        case "daily":
            return generateListGroup(gameRuleMap.daily, "\n");
        case "weekly":
            return generateListGroup(gameRuleMap.weekly, "\n");
        case "monthly":
            return generateListGroup(gameRuleMap.monthly, "\n");
        case "lifetime":
            return generateListGroup(gameRuleMap.lifetime, "\n");
    }
}

const generateListGroup = (itemList: string, divider: string)=>{
    const stringList = itemList.split(divider);
    return <>{
        stringList.map((str: string)=>{
            return <ol >{str}</ol>;
        })}</>
}