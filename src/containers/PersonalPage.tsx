
import React, {useState, useContext, useEffect} from 'react';
import {AppStateContext} from "../context/AppContext";
import {Card, Container, Row, Col, Button, Modal, Spinner} from "react-bootstrap";
import {styles} from "../helpers/styles";
import {numberWithCommas} from "../helpers/utility";
import {isNumber} from "lodash";
import { reloadBalance, withdrawBalance,stakeTokens, unstakeTokens } from '../helpers/accountHelper';
import { setSessionObject } from '../context/sessionStore';

const PersonalPage: React.FC<{}>=({})=>{
    const context = useContext(AppStateContext);
    const {userData} = context.initAppState;
    const [isLoadingTransection, setIsLoadingTransection] = useState<boolean>(false);
    // Reload Modal
    const [showReloadModal, setShowReloadModal] = useState<boolean>(false);
    const [reloadValue, setReloadValue] = useState<string>("");
    const [reloadWarningMsg, setReloadWarningMsg] = useState<string>("");
    const [isReloadBtmDisabled, setReloadBtmDisabled] = useState<boolean>(true);

    const validateReloadValue = (value:string) =>{
        setReloadBtmDisabled(true);
        setReloadValue(value);
        if(isNumber(Number(value)) && Number(value)>0){
            if(Number(value) === 0){
                // etReloadWarningMsg("You don't have enough balance. Please lower your bet or reload the balance.");
            }else{
                setReloadBtmDisabled(false);
            }
        }else{ 
            setReloadWarningMsg("Please enter a valid reload price");
        }
    }
    
    const submitReloadValue = async () =>{
        setIsLoadingTransection(true);
        const newBalance = await reloadBalance(userData, reloadValue);
        context.dispatch({
            userData:{balance: newBalance}
        })
        setSessionObject("userData",userData);
        setIsLoadingTransection(false);
        setShowReloadModal(false);
    }

     // Withraw Modal
     const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
     const [withdrawValue, setWithdrawValue] = useState<string>("");
     const [withdrawWarningMsg, setWithdrawWarningMsg] = useState<string>("");
     const [isWithdrawBtmDisabled, setWithdrawBtmDisabled] = useState<boolean>(true);
     
    const validateWithdrawValue = (value:string) =>{
        setWithdrawBtmDisabled(true);
        setWithdrawValue(value);
        if(isNumber(Number(value)) && Number(value)<=userData.balance){
            setWithdrawBtmDisabled(false);
        }else{ 
            setWithdrawWarningMsg("Please enter a valid reload price");
        }
    }
    const submitWithdrawBalance = async ()=>{
        setIsLoadingTransection(true);
        const newBalance = await withdrawBalance(userData, reloadValue);
        context.dispatch({
            userData:{balance: newBalance}
        })
        setIsLoadingTransection(false);
        setShowWithdrawModal(false);
    }

    useEffect(()=>{
        if(showReloadModal){
            setReloadValue("");
            setReloadWarningMsg("");
        }
    },[showReloadModal]);

    useEffect(()=>{
        if(showWithdrawModal){
            setWithdrawValue("");
            setWithdrawWarningMsg("");
        }
    },[showWithdrawModal]);

    return (
        <>
      <div>
          {/* Account Balance Section */}
        <Card style={styles.introCardStyle}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Card.Title>Account Balance: </Card.Title>
                        <Card.Subtitle> 
                            <label style={styles.balance}>{numberWithCommas(userData.balance)} {userData.tokenName} </label>
                        </Card.Subtitle>
                        <Card.Body>
                            <a href="#" onClick={()=>{setShowReloadModal(true)}}>Reload Now!</a><br />
                            <a href="#" onClick={()=>{setShowWithdrawModal(true)}}>Withdraw</a><br />
                        </Card.Body>
                        </Col>
                    </Row>
                </Container>
            </Card>

        {/* Connected Wallet */}
        <Card style={styles.introCardStyle}>
            <Card.Title>Connected Wallet</Card.Title>
            <Card.Subtitle>  </Card.Subtitle>
            <Card.Body>
                Address: {userData.address} <br />
                Wallect Balance: {`${Number(userData.erc20Balance)/1000000000000000000} ${userData.tokenName}`}<br />
            </Card.Body>
        </Card>

        {/* NFT Section */}
        <Card style={styles.introCardStyle}>
            <Card.Title>NFT Section</Card.Title>
            <Card.Subtitle>  </Card.Subtitle>
            <Card.Body>
                NFT <br />
                NFT <br />
                NFT <br />
                NFT <br />
                NFT <br />
            </Card.Body>
        </Card>

        {/* Participating Game */}
        <Card style={styles.introCardStyle}>
            <Card.Title>Participating Game </Card.Title>
                <Card.Subtitle> Participating Game </Card.Subtitle>
                <Card.Body>
                    Game 1 <br />
                    Game 2 <br />
                    Game 3 <br />
                    Game 4 <br />
                    Game 5 <br />
                </Card.Body>
            </Card>

        {/* Participation History */}
        <Card style={styles.introCardStyle}>
            <Card.Title>Participation History </Card.Title>
                <Card.Subtitle> Participation History </Card.Subtitle>
                <Card.Body>
                    Game 1 <br />
                    Game 2 <br />
                    Game 3 <br />
                    Game 4 <br />
                    Game 5 <br />
                </Card.Body>
            </Card>
      </div>
  
        {/* Reload Modal => should move it to a separate component */}
        <Modal show={showReloadModal} onHide={()=>{setShowReloadModal(false)}}>
          <Modal.Header closeButton style={styles.modalStyle}>
              <Modal.Title>Reload your account!</Modal.Title>
          </Modal.Header>
          
            <Modal.Body style={styles.modalStyle}>
            { isLoadingTransection?
            <>
                <label>Transection Processing...</label><br />
                <Spinner animation="grow" variant="info" />
            </>
            :
                <>
                    <label>How much would you like to reload? </label><br />
                    <label>Your current account balance is {numberWithCommas(userData.balance)} {userData.tokenName}</label><br />
                    <input 
                        value={reloadValue} 
                        onChange={
                            (e)=>{
                                setReloadWarningMsg("");
                                validateReloadValue(e.target.value);
                            }
                        } /><br />
                    {reloadWarningMsg && `Warning: ${reloadWarningMsg}`}
                </>
            }
            </Modal.Body>
          <Modal.Footer style={styles.modalStyle}>
              <Button variant="outline-dark"  onClick={()=>{setShowReloadModal(false)}}>
                  Cancel
              </Button>
              <Button variant="outline-dark" onClick={submitReloadValue} disabled={isReloadBtmDisabled}>
                  Confirm
              </Button>
          </Modal.Footer >
      </Modal>
      
        {/* Withdraw Modal => should move it to a separate component */}
        <Modal show={showWithdrawModal} onHide={()=>{setShowWithdrawModal(false)}}>
          <Modal.Header closeButton style={styles.modalStyle}>
              <Modal.Title>Withdraw balance from your account</Modal.Title>
          </Modal.Header>
          
            <Modal.Body style={styles.modalStyle}>
            { isLoadingTransection?
            <>
                <label>Transection Processing...</label><br />
                <Spinner animation="grow" variant="info" />
            </>
            :
                <>
                    <label>How much would you like to withdraw? </label><br />
                    <label>Your current account balance is {numberWithCommas(userData.balance)} {userData.tokenName}</label><br />
                    <input 
                        value={withdrawValue} 
                        onChange={
                            (e)=>{
                                setWithdrawWarningMsg("");
                                validateWithdrawValue(e.target.value);
                            }
                        } /><br />
                    {withdrawWarningMsg && `Warning: ${withdrawWarningMsg}`}
                </>
            }
            </Modal.Body>
          <Modal.Footer style={styles.modalStyle}>
              <Button variant="outline-dark"  onClick={()=>{setShowWithdrawModal(false)}}>
                  Cancel
              </Button>
              <Button variant="outline-dark" onClick={submitWithdrawBalance} disabled={isWithdrawBtmDisabled}>
                  Confirm
              </Button>
          </Modal.Footer >
      </Modal>
      
      </>

      

      
    )
}



export default PersonalPage;
