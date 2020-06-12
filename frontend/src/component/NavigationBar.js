import React from 'react';
import styled from 'styled-components';
import { Nav, Navbar } from 'react-bootstrap';
import { LogoBankoSolo } from '../LogoBankoSolo.png';
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

 
 

export const NavigationBar = () => (
  <Style>
    <Navbar expand="lg">
      <Navbar.Brand >
     

 
  
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_MESSAGE_PATH}>{NAVIGATION_MESSAGE_TEXT}</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_SEND_PATH}>{NAVIGATION_SEND_TEXT}</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_FREEZE_PATH}>{NAVIGATION_FREEZE_TEXT}</Nav.Link></Nav.Item>
        </Nav>
          <Nav className="ml-auto">
          <Nav.Item>Hier Steht deine Adresse</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Style>
)