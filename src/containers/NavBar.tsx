import React from "react";
import { Navbar, Button, NavDropdown } from "react-bootstrap";
import { styles } from "../helpers/styles";
import { Link, useLocation } from "react-router-dom";
import { IUserDataType } from "../helpers/types";

type Props = {
  handleShow: any;
  hasSingedIn: boolean;
  userData: IUserDataType;
  handleSingOut: any;
};

const NavBar: React.FC<Props> = ({
  handleShow,
  hasSingedIn,
  handleSingOut,
  userData,
}) => {
  const dropdownTitle = `Hi, ${userData.address.slice(0, 5)}...`;
  const location = useLocation();
  const showGameLobbyLink =
    !!userData.address && location.pathname !== "/gameLobby";
  return (
    <>
      <Navbar style={styles.header}>
        <Navbar.Brand href="/" style={styles.headerLogoText}>
          <img src="tamagochan.png" style={styles.headerLogo}></img>Guess, Get
          Gas
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* Switch between "Connect Wallet" and  */}
          {showGameLobbyLink && (
            <Navbar.Text>
              <Link to="/gameLobby" className="navbar-user-text">
                Back to Game Lobby
              </Link>
            </Navbar.Text>
          )}
          <Navbar.Text>
            {!hasSingedIn ? (
              <Button
                variant="outline-dark"
                style={styles.loginBtn}
                onClick={handleShow}
              >
                Connect Wallet
              </Button>
            ) : (
              <>
                <NavDropdown
                  title={dropdownTitle}
                  className="navbar-user-text"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    {" "}
                    <Link to="/gameLobby">
                      <label className="navbar-link">Game Lobby</label>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/personalPage">
                      <label className="navbar-link"> Account</label>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/">
                      <label className="navbar-link"> About Us</label>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSingOut}>
                    <label className="navbar-link">Log off</label>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
