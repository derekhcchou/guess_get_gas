
import React, {useContext} from 'react';
import {Card, Button} from "react-bootstrap";
import {AppStateContext} from "../context/AppContext";
import {styles} from "../helpers/styles"
import {IGameInfoType} from "../helpers/types"
import { countDownTimer, priceFormatter, numberWithCommas} from "../helpers/utility"
import {useHistory} from "react-router-dom";
import { getUserGameInfo } from '../helpers/accountHelper';

type Props = {
    game: IGameInfoType
};
const GameLobbyCard: React.FC<Props> = ({game
}) =>{
  const history = useHistory();
  const context = useContext(AppStateContext);
  const { selectedGame, userData} = context.initAppState;

  const setSelectedGame = (game: IGameInfoType) => {
      context.dispatch({
        selectedGame: game,
      })
      history.push("/gameRoom");
  }

  const isParticipating = userData.gameList.find((userGame)=> userGame.gameId===game.gameId && userGame.selectedAnswerId !== 0);

  return (
    <div>
        <Card style={styles.introCardStyle}>
                  <Card.Title>{game.gameQuestion}</Card.Title>
                  <Card.Subtitle>{game.gameTitle}</Card.Subtitle>
                  <Card.Body>
                  {/* gameWindow: {game.gameWindow}<br /> */}
                      {game.gameDestribtion}<br /><br />
                      {countDownTimer(game)}<br />
                      Current Participants: {numberWithCommas(game.numOfParticipants)} people<br />
                      Total Price: {priceFormatter(game.totalPrice)}<br /><br />
                     
                     <Button variant="outline-dark"  onClick={()=>{setSelectedGame(game)}}>
                        {!!isParticipating ? `You are participating! Click to view details`: `Enter Game`}
                    </Button>
                  </Card.Body>
                </Card>
    </div>
  )
}

export default GameLobbyCard;