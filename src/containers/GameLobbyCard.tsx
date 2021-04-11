
import React, {useContext} from 'react';
import {Card, Button, Row,Col, Container} from "react-bootstrap";
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
          <div className="lobby-intro-card">
            <div  className="lobby-intro-card-line">
              <Card.Title><label className="lobby-gameroom-header">{game.gameWindow.toUpperCase()}</label> </Card.Title>
              <Card.Subtitle><label className="lobby-subtitle">"{game.gameTitle}" {game.gameQuestion}</label></Card.Subtitle>
            </div>
            <Card.Body>
            {/* gameWindow: {game.gameWindow}<br /> */}
            <Container>
              <Row>
              <Col xs={12}>
              {game.gameDestribtion}<br /><br />
              </Col>
              </Row>
               <Row>
                 <Col xs={8}>
                    Counting Down: {countDownTimer(game)}<br />
                    Participating: {numberWithCommas(game.numOfParticipants)} people<br />
                    Total Reward:  {priceFormatter(game.totalPrice)}<br /><br />
                  </Col>
                  <Col xs={4}>
                    <Button className="lobby-gameroom-btn" onClick={()=>{setSelectedGame(game)}}>
                      {!!isParticipating ? `You are participating! Click to view details`: `Enter Game`}
                    </Button>
                  </Col>
                </Row>
            </Container>
              </Card.Body>
            </div>
        </Card>
    </div>
  )
}

export default GameLobbyCard;