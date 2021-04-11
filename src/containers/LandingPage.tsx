import React, { useState, useContext, useEffect } from "react";
import { AppStateContext } from "../context/AppContext";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { styles } from "../helpers/styles";
import { IGameInfoType } from "../helpers/types";
import { checkUserHasSingedIn } from "../helpers/utility";
import { isArray } from "lodash";

type Props = {
  handleShow: any;
};

const LandingPage: React.FC<Props> = ({ handleShow }) => {
  const history = useHistory();
  const context = useContext(AppStateContext);
  const { gameInfo, userData } = context.initAppState;

  // Max description charactors to show on landing's game sections
  const gameDescriptionMax: number = 200;

  // Landing Page only shows the first 3 games
  const [threeGames, setThreeGames] = useState<IGameInfoType[]>([]);

  // Router user to the main Game Lobby Page or ask to log in
  const goToGameLobby = () => {
    // Make sure that user has signed in with MetaMask
    // and website has stored the info
    if (checkUserHasSingedIn(userData)) {
      history.push("/gameLobby");
    } else {
      // If not, show signIn modal (handle in NavBar)
      handleShow();
    }
  };

  /**
   * Once the page is loaded and context has game data
   * retrieve the first 3 games to display on the landing page
   */
  useEffect(() => {
    if (threeGames.length === 0 && isArray(gameInfo) && gameInfo.length > 3) {
      setThreeGames(gameInfo.slice(0, 3));
    }
  }, [gameInfo]);

  return (
    <div className="landing">
      {/* Landing Page - Main Header */}
      <Card style={styles.introCardStyle}>
        <Card.Title>
          <label className="landing-page-header">
            IT'S YOUR TURN! Become a Crypto Expert!
          </label>
        </Card.Title>
        <Card.Subtitle>
          Crypto world has been getting bigger for the past 10 years and
          utilized in many industries. Are you ready to learn more about crypto
          world and cryptocurrency?
        </Card.Subtitle>
      </Card>

      {/* Landing Page - Game Example Section with Big Login Button 
          This section will retrieve the 3 games we store into the threeGames state and
          generate 3 small panels
      */}
      <Card style={styles.gameCardStyle}>
        <Row>
          {isArray(threeGames) &&
            threeGames.map((game: IGameInfoType) => {
              return (
                <Col>
                  <Card style={styles.gameRoomCardStyle}>
                    <div className="landing-gameroom-headerline">
                      <Card.Title>
                        <label className="landing-gameroom-header">
                          {game.gameTitle}
                        </label>
                      </Card.Title>
                      <Card.Subtitle>
                        <label className="landing-gameroom-subtitle">
                          {game.gameQuestion}
                        </label>
                      </Card.Subtitle>
                    </div>
                    <div className="landing-gameroom-body">
                      {game.gameDestribtion.substring(0, gameDescriptionMax)}
                      {game.gameDestribtion.length > gameDescriptionMax &&
                        `...`}
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Row>
          <Button
            className="landing-gameroom-btn"
            size="lg"
            block
            onClick={goToGameLobby}
          >
            ENTER
          </Button>
        </Row>
      </Card>

      <Card style={styles.introCardStyle}>
        <Card.Title>How To Play?</Card.Title>
        <Card.Subtitle>
          Do you want to be a 100% accurate psychi and win prizes? Here is how
          to put on your instinct and win $$!{" "}
        </Card.Subtitle>
        <Card.Body>
          <ul>
            <li>How to play step 1</li>
            <li>How to play step 2</li>
            <li>How to play step 3</li>
            <li>How to play step 4</li>
          </ul>
        </Card.Body>
      </Card>

      <Card style={styles.introCardStyle}>
        <Card.Title>Security</Card.Title>
        <Card.Subtitle>
          How do we handle our Dapp security and keep your wallet save?{" "}
        </Card.Subtitle>
        <Card.Body>
          <ul>
            <li>Security 1</li>
            <li>Security 2</li>
            <li>Security 3</li>
            <li>Security 4</li>
          </ul>
        </Card.Body>
      </Card>

      <Card style={styles.introCardStyle}>
        <Card.Title>Other Stuff</Card.Title>
        <Card.Subtitle>Other things about us </Card.Subtitle>
        <Card.Body>
          <ul>
            <li>Other Stuff 1</li>
            <li>Other Stuff 2</li>
            <li>Other Stuff 3</li>
            <li>Other Stuff 4</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;
