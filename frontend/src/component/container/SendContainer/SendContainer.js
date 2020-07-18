import React, { Component } from "react";
import styled from "styled-components";
import Tabs from "../Tab/Tabs";
import Dropdown from "./dropdownsendmoney";
import {
  Container,
  InnerContainer,
  Header,
  Divider,
  Content,
  Button,
} from "../Container";
import { NAVIGATION_SEND_TEXT } from "../../../constants";

import { FormControl } from "react-bootstrap";

const StyledContainer = styled(Container)`
  /* Special Style for inner Container */
`;

const StyledInnerContainer = styled(InnerContainer)`
  /* Special Style for inner Container */
`;

export const StyledButton = styled(Button)`
  /* Special Style for inner Container */
`;

export default class SendContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txTargetAdress: "",
      txValue: "",
    };
  }

  componentDidMount() {
    this.handleTransaction = this.handleTransaction.bind(this);
  }

  handleTxTargetChange = (e) => {
    this.setState({ txTargetAdress: e.target.value });
  };

  handleTxValueChange = (e) => {
    this.setState({ txValue: e.target.value });
  };

  handleTransaction = async () => {
    debugger;
    this.setState({ txValue: "" });
  };

  render() {
    return (
      <StyledContainer>
        <Header>{NAVIGATION_SEND_TEXT}</Header>
        <Divider />
        <Content>
          <Tabs>
            <div label="Überweisung senden">
              <StyledInnerContainer>
                <div class="form-group" />
                <label for="exampleInputEmail1">Adresse </label>
                <FormControl
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Adresse eingeben"
                  value={this.state.txTargetAdress}
                  onChange={this.handleTxTargetChange}
                />
                <div class="form-group" />
                <label for="exampleInputEmail1">Betrag </label>
                <FormControl
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Betrag eingeben"
                  value={this.state.txValue}
                  onChange={this.handleTxValueChange}
                />
              </StyledInnerContainer>
              <StyledButton type="button" onClick={this.handleTransaction}>
                bestätigen
              </StyledButton>
            </div>
            <div label="Termin">
              <StyledInnerContainer>
                <div className="test">
                  <label for="example">Datum auswählen</label>
                  <input
                    className="schriftfarbedatepicker"
                    placeholder="Select date"
                    type="date"
                    id="example"
                    class="form-control"
                  />
                </div>
                <p></p>
                <p></p>
                <div
                  class="md-form md-outline input-with-post-icon timepicker"
                  darktheme="true"
                >
                  <label for="set-dark-theme">Wähle eine Uhrzeit</label>
                  <input
                    type="text"
                    id="set-dark-theme"
                    class="form-control"
                    placeholder="00:00"
                  />
                  <i class="fas fa-envelope  input-prefix"></i>
                </div>
                <div class="form-group" />
                <label for="exampleInputEmail1">Betrag </label>
                <input
                  type="betrag"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Betrag eingeben"
                />
              </StyledInnerContainer>
              <StyledButton type="button">bestätigen</StyledButton>
            </div>
            <div label="Dauerauftrag ">
              <StyledInnerContainer>
                <div class="md-form md-outline input-with-post-icon datepicker">
                  <label for="example">Datum auswählen</label>
                  <input
                    placeholder="Select date"
                    type="date"
                    id="example"
                    class="form-control"
                  />
                </div>
                <div className="form-group" />
                <label for="exampleInputEmail1">Betrag </label>
                <input
                  type="betrag"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Betrag eingeben"
                />
                <Dropdown />
              </StyledInnerContainer>
              <StyledButton>bestätigen</StyledButton>
            </div>
          </Tabs>
        </Content>
      </StyledContainer>
    );
  }
}
