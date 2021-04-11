import React, { useState, useContext, useEffect } from "react";
import { AppStateContext } from "../context/AppContext";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { styles } from "../helpers/styles";
import { IGameAnserType, IUserGame } from "../helpers/types";
import { numberWithCommas } from "../helpers/utility";
import { isArray, isNumber } from "lodash";
import { joinNewGame } from "../helpers/accountHelper";
import { getGameroomRules } from "../helpers/rulesHelper";
import { setSessionObject } from "../context/sessionStore";

const GameRoomPage: React.FC = () => {
  const context = useContext(AppStateContext);
  const { selectedGame, userData } = context.initAppState;
  const history = useHistory();

  // Data Check: if any data is missing, bring user back to default pages
  if (!userData.address) history.push("/");
  if (!selectedGame) history.push("/gameLobby");

  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [warningMsg, setWarningMsg] = useState<string>("");
  const [isOptionDisabled, setOptionDisabled] = useState<boolean>(false);
  const [isParticipating, setIsParticipating] = useState<boolean>(false);

  // Make Your Guess modal
  const [showGameModal, setShowGameModal] = useState<boolean>(false);
  const [betValue, setBetValue] = useState<string>("");
  const [isBetModalBtmDisabled, setBetModalBtmDisabled] = useState<boolean>(
    true
  );
  const [guessWarningMsg, setGuessWarningMsg] = useState<string>("");
  const [isLoadingTransaction, setLoadingTransaction] = useState<boolean>(
    false
  );

  // Initial load for Gameroom page
  useEffect(() => {
    if (selectedGame && userData.gameList?.length > 0) {
      const gameAns = userData.gameList.find(
        (game: IUserGame) =>
          game.gameId === selectedGame.gameId && game.selectedAnswerId !== 0
      );
      if (!!gameAns) {
        setOptionDisabled(true);
        setSelectedOption(gameAns.selectedAnswerId);
        setBetValue(String(gameAns.betPrice));
        setIsParticipating(true);
        console.log(gameAns.selectedAnswerId);
      }
    } else if (userData.balance === 0) {
      setOptionDisabled(true);
      setWarningMsg("Please reload your balance first to participate");
    }
  }, []);

  const handleGameSubmitValidation = () => {
    if (selectedGame) {
      if (selectedOption === -1) setWarningMsg("Please select your guess");
      const isValidOption =
        selectedOption >= 0 &&
        selectedOption <= selectedGame.gameAnsOptions.length;
      if (isValidOption) {
        setShowGameModal(true);
      } else {
        setWarningMsg("Something went wrong :( Please reload the page.");
      }
    }
  };

  // validation for entered bet amount
  const betValueValidation = (value: string) => {
    setBetModalBtmDisabled(true);
    setBetValue(value);
    if (isNumber(Number(value)) && Number(value) > 0) {
      if (Number(value) > userData.balance) {
        setGuessWarningMsg(
          "You don't have enough balance. Please lower your bet or reload the balance."
        );
      } else {
        setBetModalBtmDisabled(false);
      }
    } else {
      setGuessWarningMsg("Please enter a valid bet Price");
    }
  };

  // Submit to participate in the game
  const submitBet = async () => {
    setLoadingTransaction(true);
    if (selectedGame) {
      setOptionDisabled(true);
      const res = await joinNewGame(
        userData,
        betValue,
        selectedGame.gameId,
        selectedOption
      );
      if (res) {
        let newUserData = userData;
        newUserData.gameList = [...userData.gameList, res.userGameInfo];
        newUserData.balance = Number(res.newBalance || 0);
        context.dispatch({
          userData: newUserData,
        });
        setSessionObject("userData", newUserData);
      }
    }
    setShowGameModal(false);
    setLoadingTransaction(false);
  };

  useEffect(() => {
    if (showGameModal) {
      setBetValue("");
      setGuessWarningMsg("");
    }
  }, [showGameModal]);

  return (
    <>
      <div>
        {!!selectedGame && (
          <>
            <Card style={styles.introCardStyle}>
              <label className="gameroom-question-title">
                {selectedGame.gameWindow} Game
              </label>
              {isParticipating && <>Your are participating in this game!</>}
              {!isParticipating && userData.balance === 0 && (
                <>
                  Your current account balance is $0 ETH. Please reload to
                  participate!
                </>
              )}
              <br />
              <br />
              <br />
              <label className="gameroom-section-title">
                Story of {selectedGame.gameTitle}:
              </label>
              <Container>
                <Row>
                  <Col xs={7}>
                    <div className="gameroom-story">
                      {selectedGame.gameDestribtion}
                    </div>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={4} className="my-auto">
                    <div>
                      <img
                        src={selectedGame.gamePropertyLogoLink}
                        alt={`Logo of ${selectedGame.gameProperty}`}
                        width="100"
                        height="100"
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card>

            {/* Guessing Section */}
            <Card style={styles.introCardStyle}>
              {isArray(selectedGame.gameAnsOptions) &&
              selectedGame.gameAnsOptions.length > 0 ? (
                <div className="gameroom-answer-section">
                  <label className="gameroom-answer-section-title">
                    {selectedGame.gameQuestion}
                  </label>
                  <div className="gameroom-option-section">
                    {selectedGame.gameAnsOptions.map(
                      (ansOption: IGameAnserType) => {
                        return (
                          <>
                            <label
                              className={
                                isOptionDisabled
                                  ? "optionDisabled"
                                  : "optionEnabled"
                              }
                            >
                              <input
                                type="radio"
                                className="radio-button"
                                name="options"
                                value={ansOption.answerId}
                                onClick={() => {
                                  setSelectedOption(ansOption.answerId);
                                  setWarningMsg("");
                                }}
                                disabled={isOptionDisabled}
                                checked={ansOption.answerId === selectedOption}
                              />
                              {ansOption.answerText}
                            </label>
                            <br />
                          </>
                        );
                      }
                    )}
                  </div>
                  <Button
                    type="submit"
                    block
                    className="gameroom-btn"
                    onClick={handleGameSubmitValidation}
                    disabled={isOptionDisabled}
                  >
                    {isParticipating
                      ? `You guess answer "${
                          selectedGame.gameAnsOptions.find(
                            (option) => option.answerId === selectedOption
                          )?.answerText
                        }" with ${numberWithCommas(Number(betValue))} `
                      : ` Make Your Guess!`}
                  </Button>
                  {warningMsg && <label>Warning: {warningMsg}</label>}
                </div>
              ) : (
                // this should be for lifetime game >> just have a button to join?
                <Button className="gameroom-btn" onClick={() => {}} block>
                  Make Your Guess!
                </Button>
              )}
            </Card>

            {/* Top Section */}
            <Card style={styles.introCardStyle}>
              <label className="gameroom-section-title">Rules:</label>
              <Card.Body>{getGameroomRules(selectedGame.gameWindow)}</Card.Body>
            </Card>
          </>
        )}
      </div>

      {/* Make Your Guess Modal */}
      <Modal
        show={showGameModal}
        onHide={() => {
          setShowGameModal(false);
        }}
      >
        <Modal.Header closeButton style={styles.modalStyle}>
          <Modal.Title> Make Your Guess!</Modal.Title>
        </Modal.Header>
        {isLoadingTransaction ? (
          <>
            Loading Transaction...
            <Spinner animation="grow" variant="info" />
          </>
        ) : (
          <>
            <Modal.Body style={styles.modalStyle}>
              <label>How much do you want to place for this game? </label>
              <br />
              <label>
                Your current account balance is{" "}
                {numberWithCommas(userData.balance)}{" "}
              </label>
              <br />
              <input
                value={betValue}
                onChange={(e) => {
                  setGuessWarningMsg("");
                  betValueValidation(e.target.value);
                }}
              />
              <br />
              {guessWarningMsg && `Warning: ${guessWarningMsg}`}
            </Modal.Body>{" "}
          </>
        )}
        <Modal.Footer style={styles.modalStyle}>
          <Button
            variant="outline-dark"
            disabled={isBetModalBtmDisabled || isLoadingTransaction}
            onClick={() => {
              setShowGameModal(false);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outline-dark"
            onClick={submitBet}
            disabled={isBetModalBtmDisabled || isLoadingTransaction}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameRoomPage;
