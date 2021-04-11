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
    return <ListGroup className="rule-list" variant="flush">{
        stringList.map((str: string)=>{
            return <ListGroup.Item className="rule-list" >{str}</ListGroup.Item>;
        })}</ListGroup>
}