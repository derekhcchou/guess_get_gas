
import React, {useState, useContext, useEffect} from 'react';
import {AppStateContext} from "../context/AppContext";
import {Card, Container, Row, Col, Button, Modal} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom"
import {gameRuleMap} from "../helpers/contentMap";
import {styles} from "../helpers/styles";
import {IGameAnserType, IGameInfoType, IUserGame} from "../helpers/types";
import {numberWithCommas, priceFormatter, countDownTimer} from "../helpers/utility";
import {isArray, isNumber} from "lodash";
import { joinNewGame } from '../helpers/accountHelper';

const GameRoomPage: React.FC = () =>{
    const context = useContext(AppStateContext);
    const {selectedGame, userData} = context.initAppState;
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    const [warningMsg, setWarningMsg] = useState<string>("");
    const [isOptionDisabled, setOptionDisabled] = useState<boolean>(false);
    const [isParticipating, setIsParticipating] = useState<boolean>(false);
    
    // bet modal
    const [showGameModal, setShowGameModal] = useState<boolean>(false);
    const [betValue, setBetValue] = useState<string>("");
    const [isBetModalBtmDisabled, setBetModalBtmDisabled] = useState<boolean>(true);
    const [betWarningMsg, setBetWarningMsg] = useState<string>("");
    const history = useHistory();
    
    // Initial load for gameroom page
    useEffect(()=>{
        if(selectedGame && userData.gameList?.length > 0){
            const gameAns = userData.gameList.find((game:IUserGame)=> game.gameId === selectedGame.gameId && game.selectedAnswerId !== 0)
            if(!!gameAns){
                setOptionDisabled(true);
                setSelectedOption(gameAns.selectedAnswerId);
                setBetValue(String(gameAns.betPrice));
                setIsParticipating(true);
                console.log(gameAns.selectedAnswerId)
            }
        }else if(userData.balance === 0 ){
            setOptionDisabled(true);
            setWarningMsg("Please reload your balance first to participate");
        }
    },[])

    // Setup game
    if(selectedGame === undefined)
        history.push("/gameLobby");

    const handleGameSubmitValidation = () =>{
        if(selectedGame){
            if(selectedOption === -1)
            setWarningMsg("Please select your guess");
            const isValidOption = selectedOption >= 0 && selectedOption <= selectedGame.gameAnsOptions.length ;
            if(isValidOption){
                setShowGameModal(true);
            }else{
                setWarningMsg("Something went wrong :( Please reload the page.");
            }
        }
    }

    // validation for entered bet amount
    const betValueValidation = (value: string) => {
        setBetModalBtmDisabled(true);
        setBetValue(value);
        if(isNumber(Number(value)) && Number(value)>0){
            if(Number(value) > userData.balance){
                setBetWarningMsg("You don't have enough balance. Please lower your bet or reload the balance.");
            }else{
                setBetModalBtmDisabled(false);
            }
        }else{ 
            setBetWarningMsg("Please enter a valid bet Price");
        }
    }

    // Submit to participate in the game
    const submitBet = async () => {
       if(selectedGame){
            setOptionDisabled(true);
            const res = await joinNewGame(userData, betValue, selectedGame.gameId, selectedOption);
            if(res){
                let newUserData = userData;
                newUserData.gameList = [...userData.gameList, res.userGameInfo];
                newUserData.balance = Number(res.newBalance || 0);
                context.dispatch({
                    userData: newUserData
                })
            }
       }
       setShowGameModal(false);
    }

    useEffect(()=>{
        if(showGameModal){
            setBetValue("");
            setBetWarningMsg("");
        }
    },[showGameModal]);

  return (
      <>
    <div>
        { !!selectedGame &&
            <>
                {isParticipating && 
                    <Card style={styles.introCardStyle}>
                        Your are participating in this game!
                    </Card>
                }
                {!isParticipating && userData.balance === 0  && 
                    <Card style={styles.introCardStyle}>
                        Your currently account balance is $0 ETH. Please reload to participate!
                    </Card>
                }
                {/* Top Section */}
                <Card style={styles.introCardStyle}>
                    <Card.Title>{selectedGame.gameQuestion}</Card.Title>
                    <Card.Subtitle>{selectedGame.gameTitle}</Card.Subtitle>
                    <Card.Body>
                        <Container>
                            <Row>
                            <Col xs={7}>
                                {countDownTimer(selectedGame)}<br />
                                Property: {selectedGame.gameProperty}<br />
                                Current Participants: {numberWithCommas(selectedGame.numOfParticipants)} people<br />
                                Total Price: {priceFormatter(selectedGame.totalPrice)}<br /><br />
                                <br /><br />
                            </Col>
                            <Col xs={4}>
                                <h5>Rules of {selectedGame.gameWindow} Game </h5>
                                {gameRuleMap[selectedGame.gameWindow]}
                                <br /><br />
                            </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>

                {/* Story Section */}
                <Card style={styles.introCardStyle}>
                    <h5>Story of {selectedGame.gameProperty}:</h5>
                    <Container >
                        <Row >
                            <Col xs={9} >
                                {selectedGame.gameDestribtion}<br />
                            </Col>
                            <Col xs={3} className = "my-auto">
                            <div>
                                <img src={selectedGame.gamePropertyLogoLink} 
                                    alt={`Logo of ${selectedGame.gameProperty}`} 
                                    width="100" height="100"
                                />
                            </div>
                            </Col>
                        </Row>
                    </Container>
                </Card>

                {/* Guessing Section */}
                <Card style={styles.introCardStyle}>
                    {isArray(selectedGame.gameAnsOptions) && selectedGame.gameAnsOptions.length > 0 ? 
                         <>
                            <h5>Question: {selectedGame.gameQuestion}</h5>
                                {selectedGame.gameAnsOptions.map((ansOption: IGameAnserType)=>{
                                    return (
                                        <label  className = {isOptionDisabled ? "optionDisabled":"optionEnabled"}>
                                            <input type="radio" 
                                                name="options" 
                                                value={ansOption.answerId}  
                                                onClick={()=>{
                                                        setSelectedOption(ansOption.answerId); 
                                                        setWarningMsg("");
                                                    }
                                                }
                                                disabled={isOptionDisabled}
                                                checked={ansOption.answerId === selectedOption}
                                            />
                                            {ansOption.answerText}
                                        </label>
                                    )
                                })}
                            <Button type="submit" 
                                variant="outline-dark" 
                                onClick={handleGameSubmitValidation}  
                                disabled={isOptionDisabled}
                            >{isParticipating ? `You bet ${priceFormatter(Number(betValue))} 
                                with answer "${selectedGame.gameAnsOptions.find(option=> option.answerId === selectedOption)?.answerText}"`:`Put down yout bet!`}</Button>
                            {warningMsg && <label>Warning: {warningMsg}</label>}
                       </>
                    :
                        // this should be for lifetime game >> just have a button to join?
                       <Button variant="outline-dark"  onClick={()=>{}}>
                            Join!
                        </Button>
                    }
                </Card>
            </>
        }
    </div>

    <Modal show={showGameModal} onHide={()=>{setShowGameModal(false)}}>
        <Modal.Header closeButton style={styles.modalStyle}>
            <Modal.Title>Put on your bet!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalStyle}>
            <label>How much do you want to place for the bet? </label><br />
            <label>Your current account balance is {priceFormatter(userData.balance)} ETH</label><br />
            <input 
                value={betValue} 
                onChange={
                    (e)=>{
                        setBetWarningMsg("");
                        betValueValidation(e.target.value);
                    }
                } /><br />
            {betWarningMsg && `Warning: ${betWarningMsg}`}
        </Modal.Body>
        <Modal.Footer style={styles.modalStyle}>
            <Button variant="outline-dark"  onClick={()=>{setShowGameModal(false)}}>
                Cancel
            </Button>

            <Button variant="outline-dark" onClick={submitBet} disabled={isBetModalBtmDisabled}>
                Confirm
            </Button>
        </Modal.Footer >
    </Modal>
    </>
  )
}

export default GameRoomPage;
