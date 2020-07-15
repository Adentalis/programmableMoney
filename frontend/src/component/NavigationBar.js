import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  NAVIGATION_MESSAGE_PATH,
  NAVIGATION_SEND_PATH,
  NAVIGATION_FREEZE_PATH,
  NAVIGATION_MESSAGE_TEXT,
  NAVIGATION_SEND_TEXT,
  NAVIGATION_FREEZE_TEXT,
} from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Style = styled.div`
.navbar { 
  background-color: #4B0082; 
  color: #E6E6FA;
}
a, 
.navbar-light 
.nav-link {
  color: #E6E6FA;
  &:hover, &:focus, &:active { color: white; }
}
.navbar-brand {
  font-size: 1.4em;
  color: #E6E6FA;
  &:hover { color: white; }
}
.LogoBankoSolo{
  font-size: 7vh:
  font-weight: bold: 
  text-shadow: 3px; 
}
.form-center {
  position: absolute !important;
  left: 25%;
  right: 25%;
}
`;

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      accountBalances: null,
      network: null,
      stackId: null,
    };
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.getOwnBalance = this.getOwnBalance.bind(this);

  }

  componentDidMount = () => {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({
          account: this.props.drizzleState.accounts[0],
          accountBalances: this.props.drizzleState.accountBalances[
            this.props.drizzleState.accounts[0]
          ],
        });
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  deposit() {
    console.log("ee");
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["set"].cacheSend("fffff", {
      from: drizzleState.accounts[0],
    });

    // save the `stackId` for later reference
    this.setState({ stackId });

    //debugger;
  }

  getOwnBalance(){
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const ownBalance = contract.methods["getOwnBalance"].cacheCall();
    this.setState({ ownBalance });
  }

  withdraw() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["myString"].cacheCall();
    this.setState({ dataKey });
    debugger;
  }

  render() {

    const { Bank } = this.props.drizzleState.contracts;
    const ownBalanceData = Bank.getOwnBalance[this.state.ownBalance];

    const ownBalance = ownBalanceData && ownBalanceData.value[0];

    return (
      <Style>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Link className="nav-link" to={"/" + NAVIGATION_MESSAGE_PATH}>
                  {NAVIGATION_MESSAGE_TEXT}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to={"/" + NAVIGATION_SEND_PATH}>
                  {NAVIGATION_SEND_TEXT}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to={"/" + NAVIGATION_FREEZE_PATH}>
                  {NAVIGATION_FREEZE_TEXT}
                </Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown.Divider />
              <div>
                {/*<Button>{data}</Button>*/}
                <Button onClick={this.getOwnBalance}>Geld auf Addresse {ownBalance}</Button>
                <Button>---</Button>
                <Button>Kontostand {this.state.accountBalances}</Button>
                <Button onClick={this.deposit}>Einzahlen</Button>
                <Button onClick={this.withdraw}>Auszahlen</Button>

                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                <Nav.Item style={{ display: "inline-block" }}>
                  {" "}
                  {this.state.account}{" "}
                </Nav.Item>
              </div>
              {/*<div>
              <div>
                <FontAwesomeIcon icon={faUser} style={{display: "inline-block", marginRight: "10px", marginLeft: "10px"}}/>
                <Nav.Item style={{display: "inline-block"}}> {this.state.balance} </Nav.Item>
              </div>
              <div>
                <FontAwesomeIcon icon={faNetworkWired} style={{display: "inline-block", marginRight: "10px", marginLeft: "10px"}}/>
                <Nav.Item style={{display: "inline-block"}}> {this.state.network} </Nav.Item>
              </div>
              */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Style>
    );
  }
}
export default NavigationBar;
