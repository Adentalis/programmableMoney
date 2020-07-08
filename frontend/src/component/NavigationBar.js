import React, { Component } from "react";
import styled from 'styled-components';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NAVIGATION_MESSAGE_PATH, NAVIGATION_SEND_PATH, NAVIGATION_FREEZE_PATH, NAVIGATION_MESSAGE_TEXT, NAVIGATION_SEND_TEXT, NAVIGATION_FREEZE_TEXT} from '../constants';

const Style = styled.div`
  .navbar { 
    background-color: #4B0082; 
  }
  a, 
  .navbar-nav, 
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
              <Nav.Item>{this.props.account}</Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Style>
    );
    }
}

export default NavigationBar;
