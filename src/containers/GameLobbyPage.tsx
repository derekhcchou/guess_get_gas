import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { AppStateContext } from "../context/AppContext";
import { styles } from "../helpers/styles";
import { IGameInfoType } from "../helpers/types";
import { useHistory } from "react-router-dom";
import GameLobbyCard from "./GameLobbyCard";

type Props = {};
const GameLobbyPage: React.FC<Props> = ({}) => {
  const history = useHistory();
  const context = useContext(AppStateContext);
  const { gameInfo, userData } = context.initAppState;
  if (!userData.address) history.push("/");
  return (
    <div>
      {/* 
      Game Lobby - Header section with some notes
       */}
      <Card style={styles.introCardStyle}>
        <div className="lobby-title">Game Lobby</div>
        {userData.balance === 0 && (
          <label>
            Your current account balance is $0. Please reload to participate!
          </label>
        )}
      </Card>

      {/* 
        Generate all the available gamerooms
       */}
      {gameInfo &&
        gameInfo.map((game: IGameInfoType) => {
          return <GameLobbyCard game={game} />;
        })}
    </div>
  );
};

export default GameLobbyPage;
