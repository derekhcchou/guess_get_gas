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
import { styles } from "../helpers/styles";
import { numberWithCommas } from "../helpers/utility";
import { isNumber } from "lodash";
import { reloadBalance, withdrawBalance } from "../helpers/accountHelper";
import { setSessionObject } from "../context/sessionStore";
import { IGameInfoType, IUserGame } from "../helpers/types";

const PersonalPage: React.FC<{}> = ({}) => {
  const context = useContext(AppStateContext);
  const { userData, gameInfo } = context.initAppState;
  const [isLoadingTransection, setIsLoadingTransection] = useState<boolean>(
    false
  );
  // Reload Modal
  const [showReloadModal, setShowReloadModal] = useState<boolean>(false);
  const [reloadValue, setReloadValue] = useState<string>("");
  const [reloadWarningMsg, setReloadWarningMsg] = useState<string>("");
  const [isReloadBtmDisabled, setReloadBtmDisabled] = useState<boolean>(true);

  const validateReloadValue = (value: string) => {
    setReloadBtmDisabled(true);
    setReloadValue(value);
    if (isNumber(Number(value)) && Number(value) > 0) {
      if (Number(value) === 0) {
        // etReloadWarningMsg("You don't have enough balance. Please lower your bet or reload the balance.");
      } else {
        setReloadBtmDisabled(false);
      }
    } else {
      setReloadWarningMsg("Please enter a valid reload price");
    }
  };

  const submitReloadValue = async () => {
    setIsLoadingTransection(true);
    const newBalance = await reloadBalance(userData, reloadValue);
    context.dispatch({
      userData: { balance: newBalance },
    });
    setSessionObject("userData", userData);
    setIsLoadingTransection(false);
    setShowReloadModal(false);
  };

  // Withraw Modal
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawValue, setWithdrawValue] = useState<string>("");
  const [withdrawWarningMsg, setWithdrawWarningMsg] = useState<string>("");
  const [isWithdrawBtmDisabled, setWithdrawBtmDisabled] = useState<boolean>(
    true
  );

  const validateWithdrawValue = (value: string) => {
    setWithdrawBtmDisabled(true);
    setWithdrawValue(value);
    if (isNumber(Number(value)) && Number(value) <= userData.balance) {
      setWithdrawBtmDisabled(false);
    } else {
      setWithdrawWarningMsg("Please enter a valid reload price");
    }
  };
  const submitWithdrawBalance = async () => {
    setIsLoadingTransection(true);
    const newBalance = await withdrawBalance(userData, reloadValue);
    context.dispatch({
      userData: { balance: newBalance },
    });
    setIsLoadingTransection(false);
    setShowWithdrawModal(false);
  };

  useEffect(() => {
    if (showReloadModal) {
      setReloadValue("");
      setReloadWarningMsg("");
    }
  }, [showReloadModal]);

  useEffect(() => {
    if (showWithdrawModal) {
      setWithdrawValue("");
      setWithdrawWarningMsg("");
    }
  }, [showWithdrawModal]);

  const getParticipatingGame = (game: IUserGame) => {
    const matchedGame: IGameInfoType | undefined = gameInfo.find(
      (g: IGameInfoType) => g.gameId === game.gameId
    );
    if (!!matchedGame) {
      return (
        <ol>
          {matchedGame.gameQuestion}:{" "}
          {matchedGame.gameAnsOptions[game.selectedAnswerId]} with $
          {game.betPrice}
        </ol>
      );
    }
    return <></>;
  };

  return (
    <>
      <div>
        {/* Account Balance Section */}
        <Card style={styles.introCardStyle}>
          <div className="personal-balance-section">
            <Container>
              <Row className="justify-content-md-center">
                <Col xs={6}>
                  <Card.Title>
                    <label className="personal-balance-title">
                      Account Balance:{" "}
                    </label>
                  </Card.Title>
                  <Card.Subtitle>
                    <label className="personal-balance-number">
                      {numberWithCommas(userData.balance)} {userData.tokenName}{" "}
                    </label>
                  </Card.Subtitle>
                  <Card.Body>
                    <a
                      href="#"
                      onClick={() => {
                        setShowReloadModal(true);
                      }}
                      className="personal-link"
                    >
                      Reload Now!
                    </a>
                    <br />
                    <a
                      href="#"
                      onClick={() => {
                        setShowWithdrawModal(true);
                      }}
                      className="personal-link"
                    >
                      Withdraw
                    </a>
                    <br />
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </div>
        </Card>

        {/* Connected Wallet */}
        <Card style={styles.introCardStyle}>
          <Card.Title>
            <label className="person-section-title">Connected Wallet</label>
          </Card.Title>
          <Card.Subtitle> </Card.Subtitle>
          <Card.Body>
            Address: {userData.address} <br />
            Wallect Balance:{" "}
            {`${Number(userData.erc20Balance) / 1000000000000000000} ${
              userData.tokenName
            }`}
            <br />
          </Card.Body>
        </Card>

        {/* NFT Section */}
        <Card style={styles.introCardStyle}>
          <Card.Title>
            <label className="person-section-title">NFT Collection</label>
          </Card.Title>
          <Card.Subtitle> </Card.Subtitle>
          <Card.Body>
            <Container>
              <Row>
                <Col xs={4}>
                  <img
                    src="./src/tamagochan-btc.png"
                    alt="G,GG BTC NFT"
                    className="personal-nft-img"
                  />
                </Col>
                <Col xs={4}>
                  <img
                    src="./src//tamagochan-eth.png"
                    alt="G,GG ETH NFT"
                    className="personal-nft-img"
                  />
                </Col>
                <Col xs={4}>
                  <img
                    src="./src//tamagochan-lte.png"
                    alt="G,GG LTE NFT"
                    className="personal-nft-img"
                  />
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>

        {/* Participating Game */}
        {/* <Card style={styles.introCardStyle}>
          <Card.Title>
            {" "}
            <label className="person-section-title">Participating Game </label>
          </Card.Title>
          <Card.Body>
            {userData.gameList.length === 0 ? (
              <>Currently Not Participating In Any Game</>
            ) : (
              <>
                {userData.gameList.map((game: IUserGame) => {
                  return getParticipatingGame(game);
                })}
              </>
            )}
          </Card.Body>
        </Card> */}
      </div>

      {/* Reload Modal => should move it to a separate component */}
      <Modal
        show={showReloadModal}
        onHide={() => {
          setShowReloadModal(false);
        }}
      >
        <Modal.Header closeButton style={styles.modalStyle}>
          <Modal.Title>Reload your account!</Modal.Title>
        </Modal.Header>

        <Modal.Body style={styles.modalStyle}>
          {isLoadingTransection ? (
            <>
              <label>Transection Processing...</label>
              <br />
              <Spinner animation="grow" variant="info" />
            </>
          ) : (
            <>
              <label>How much would you like to reload? </label>
              <br />
              <label>
                Your current account balance is{" "}
                {numberWithCommas(userData.balance)} {userData.tokenName}
              </label>
              <br />
              <input
                value={reloadValue}
                onChange={(e) => {
                  setReloadWarningMsg("");
                  validateReloadValue(e.target.value);
                }}
              />
              <br />
              {reloadWarningMsg && `Warning: ${reloadWarningMsg}`}
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={styles.modalStyle}>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowReloadModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outline-dark"
            onClick={submitReloadValue}
            disabled={isReloadBtmDisabled}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Withdraw Modal => should move it to a separate component */}
      <Modal
        show={showWithdrawModal}
        onHide={() => {
          setShowWithdrawModal(false);
        }}
      >
        <Modal.Header closeButton style={styles.modalStyle}>
          <Modal.Title>Withdraw balance from your account</Modal.Title>
        </Modal.Header>

        <Modal.Body style={styles.modalStyle}>
          {isLoadingTransection ? (
            <>
              <label>Transection Processing...</label>
              <br />
              <Spinner animation="grow" variant="info" />
            </>
          ) : (
            <>
              <label>How much would you like to withdraw? </label>
              <br />
              <label>
                Your current account balance is{" "}
                {numberWithCommas(userData.balance)} {userData.tokenName}
              </label>
              <br />
              <input
                value={withdrawValue}
                onChange={(e) => {
                  setWithdrawWarningMsg("");
                  validateWithdrawValue(e.target.value);
                }}
              />
              <br />
              {withdrawWarningMsg && `Warning: ${withdrawWarningMsg}`}
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={styles.modalStyle}>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowWithdrawModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outline-dark"
            onClick={submitWithdrawBalance}
            disabled={isWithdrawBtmDisabled}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonalPage;
