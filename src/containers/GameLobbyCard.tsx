import React, { useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { AppStateContext } from "../context/AppContext";
import { styles } from "../helpers/styles";
import { IGameInfoType } from "../helpers/types";
import {
  countDownTimer,
  priceFormatter,
  numberWithCommas,
} from "../helpers/utility";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { isAfter } from "date-fns";

type Props = {
  game: IGameInfoType;
};
const GameLobbyCard: React.FC<Props> = ({ game }) => {
  const history = useHistory();
  const context = useContext(AppStateContext);
  const { selectedGame, userData } = context.initAppState;

  /**
   * Once user click the "Enter Game" button,
   * router user to Game Room.
   */
  const setSelectedGame = (game: IGameInfoType) => {
    context.dispatch({
      selectedGame: game,
    });
    history.push("/gameRoom");
  };

  /**
   * Check whether user has been participating to the game or not.
   */
  const isParticipating = userData.gameList.find(
    (userGame) =>
      Number(userGame.gameId) === Number(game.gameId) &&
      userGame.selectedAnswerId !== 0
  );

  return (
    <div>
      <Card style={styles.introCardStyle}>
        <div className="lobby-intro-card">
          <div className="lobby-intro-card-line">
            <Container>
              <Row>
                <Col xs={6}>
                  <Card.Title>
                    <label className="lobby-gameroom-header">
                      {game.gameWindow.toUpperCase()}
                    </label>{" "}
                  </Card.Title>
                </Col>
                <Col className="lobby-ppl-balance" xs={6}>
                  {numberWithCommas(game.numOfParticipants)} ppl/
                  {priceFormatter(game.totalPrice)}
                </Col>
              </Row>
            </Container>

            <Card.Subtitle>
              <label className="lobby-subtitle">
                {game.gameQuestion} of {game.gameTitle}
              </label>
            </Card.Subtitle>
          </div>

          <Card.Body>
            <Container>
              <Row>
                <Col xs={12}>
                </Col>
              </Row>
              <Row>
                <Col xs={8}>
                {!isAfter(
                    Date.now(),
                    moment(game.gameWindowStarTime).toDate()
                  ) || game.gameWindow.toLowerCase() === "lifetime"
                  ? `Game Ends Countdown: `
                  : `Answer Reveal Countdown: `}
                  {countDownTimer(game)}
                </Col>
                <Col xs={4} className="lobby-gameroom-btn-container">
                  <Button
                    className="lobby-gameroom-btn"
                    onClick={() => {
                      setSelectedGame(game);
                    }}
                  >
                    {!!isParticipating
                      ? `Participating!`
                      : !isAfter(
                          Date.now(),
                          moment(game.gameWindowStarTime).toDate()
                        ) || game.gameWindow.toLowerCase() === "lifetime"
                      ? `Enter Game`
                      : `View Game`}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default GameLobbyCard;
