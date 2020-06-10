import React from 'react';
import styled from 'styled-components';
import { Nav, Navbar } from 'react-bootstrap';
import { NAVIGATION_MESSAGE_PATH, NAVIGATION_SEND_PATH, NAVIGATION_FREEZE_PATH } from '../constants';

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

export const NavigationBar = () => (
  <Style>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Tutorial</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_MESSAGE_PATH}>Nachrichten</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_SEND_PATH}>Geld senden</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href={"/" + NAVIGATION_FREEZE_PATH}>Geld einfrieren</Nav.Link></Nav.Item>
        </Nav>
          <Nav className="ml-auto">
          <Nav.Item>Hier Steht deine Adresse</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Style>
)