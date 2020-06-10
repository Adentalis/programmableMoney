import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

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
          <Nav.Item><Nav.Link href="/message">Nachrichten</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/send">Geld senden</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/freeze">Geld einfrieren</Nav.Link></Nav.Item>
        </Nav>
          <Nav className="ml-auto">
          <Nav.Item>Hier Steht deine Adresse</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Style>
)