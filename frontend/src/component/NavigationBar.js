import React, { Component } from "react";
import styled from 'styled-components';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NAVIGATION_MESSAGE_PATH, NAVIGATION_SEND_PATH, NAVIGATION_FREEZE_PATH, NAVIGATION_MESSAGE_TEXT, NAVIGATION_SEND_TEXT, NAVIGATION_FREEZE_TEXT} from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNetworkWired, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Style = styled.div`
.navbar { 
  background-color: #4B0082; 
  color: #E6E6FA;

}
a, 
.navbar-light 
.nav-link {
  color: #E6E6FA;
  &:hover { color: white; }
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
  render() {
    return (
      <Style>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand >
            Logo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item><Nav.Link href={"/" + NAVIGATION_MESSAGE_PATH}>{NAVIGATION_MESSAGE_TEXT}</Nav.Link></Nav.Item> 
              <Nav.Item><Nav.Link href={"/" + NAVIGATION_SEND_PATH}>{NAVIGATION_SEND_TEXT}</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href={"/" + NAVIGATION_FREEZE_PATH}>{NAVIGATION_FREEZE_TEXT}</Nav.Link></Nav.Item>
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown.Divider />
              {/*<div>
                <FontAwesomeIcon icon={faBalanceScale} style={{display: "inline-block", marginRight: "10px", marginLeft: "10px"}}/>
                <Nav.Item style={{display: "inline-block"}}> {this.props.balance} </Nav.Item>
              </div>
              */}
              <div>
                <FontAwesomeIcon icon={faUser} style={{display: "inline-block", marginRight: "10px", marginLeft: "10px"}}/>
                <Nav.Item style={{display: "inline-block"}}> {this.props.account} </Nav.Item>
              </div>
              <div>
                <FontAwesomeIcon icon={faNetworkWired} style={{display: "inline-block", marginRight: "10px", marginLeft: "10px"}}/>
                <Nav.Item style={{display: "inline-block"}}> {this.props.network} </Nav.Item>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Style>
    );
  }
}
export default NavigationBar;