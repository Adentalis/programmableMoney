import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";

import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const StyledContainer = styled(Container)`
  color: #e6e6fa;
  position: relative;
  width: calc(100% - 200px);
  height: calc(55% - 200px);
  margin: 80px 100px 100px 100px;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  padding: 20px;
  font-size: x-large;
`;

const tableStyle = {
  width: "100%",
  height: "80%",
};

const thStyle = {
  width: "30%",
};

export default class LastTxContainer extends Component {
  state = {
    lastReceivedTxKey: null,
    lastSendTxKey: null,
    transactionMode: "lastReceivedTx",
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;
    // get and save the key for the variable we are interested in
    const lastReceivedTxKey = contract.methods[
      "getLastReceivedTransaction"
    ].cacheCall();
    this.setState({ lastReceivedTxKey });
    const lastSendTxKey = contract.methods[
      "getLastSendTransaction"
    ].cacheCall();
    this.setState({ lastSendTxKey });
  }

  formatEth(e) {
    var value = parseInt(e);
    if (value < 1000000000) {
      return value + " wei";
    } else if (value < 1000000000000000) {
      return (value / 1000000000).toFixed(3) + " Gwei";
    } else {
      return (value / 1000000000000000000).toFixed(3) + "Eth";
    }
  }

  setTransactionMode(mode) {
    this.setState({ transactionMode: mode });
  }

  createContent() {
    const { Bank } = this.props.drizzleState.contracts;
    const lastReceivedTx =
      Bank.getLastReceivedTransaction[this.state.lastReceivedTxKey];
    const lastSendTx = Bank.getLastSendTransaction[this.state.lastSendTxKey];
    const state = this.state.transactionMode;

    //check if user has sent a tx
    let isLastReceivedTx = false;
    if (lastReceivedTx && lastReceivedTx.value[1] !== "0")
      isLastReceivedTx = true;

    if (state === "lastReceivedTx" && !isLastReceivedTx) {
      return <h3>Sie haben noch keine Transaktion erhalten!</h3>;
    }

    //check if user has received a tx
    let isLastSendTx = false;
    if (lastSendTx && lastSendTx.value[1] !== "0") isLastSendTx = true;

    if (state === "lastSendTx" && !isLastSendTx) {
      return <h3>Sie haben noch keine Transaktion versendet!</h3>;
    }

    //show either lastSend or lastReceived tx
    let date;
    let address;
    let value;
    let localDateTime;

    if (state === "lastReceivedTx") {
      date = lastReceivedTx && lastReceivedTx.value[2];
      address = lastReceivedTx && lastReceivedTx.value[0];
      value = lastReceivedTx && lastReceivedTx.value[1];
    } else {
      date = lastSendTx && lastSendTx.value[2];
      address = lastSendTx && lastSendTx.value[0];
      value = lastSendTx && lastSendTx.value[1];
    }
    localDateTime = new Date(1000 * parseInt(date)+ 3600000).toLocaleString();


    return (
      <Content>
        <table style={tableStyle}>
          <tr>
            <th style={thStyle}>Datum</th>
            <td>{localDateTime}</td>
          </tr>
          <tr>
            <th style={thStyle}>Adresse</th>
            <td>{address}</td>
          </tr>
          <tr>
            <th style={thStyle}>Betrag</th>
            <td>{this.formatEth(value)}</td>
          </tr>
        </table>
      </Content>
    );
  }

  render() {
    return (
      <StyledContainer>
        <Header>
          Letzte Transaktion{" "}
          <ToggleButtonGroup
            style={{ width: "calc(50% - 10px)", marginBottom: "10px" }}
            type="radio"
            name="options"
            defaultValue={"lastReceivedTx"}
          >
            <ToggleButton
              value={"lastReceivedTx"}
              variant="outline-light"
              onChange={(e) => this.setTransactionMode(e.currentTarget.value)}
            >
              Erhaltene
            </ToggleButton>
            <ToggleButton
              value={"lastSendTx"}
              variant="outline-light"
              onChange={(e) => this.setTransactionMode(e.currentTarget.value)}
            >
              Versendete
            </ToggleButton>
          </ToggleButtonGroup>
        </Header>
        <Divider />
        {this.createContent()}
      </StyledContainer>
    );
  }
}
