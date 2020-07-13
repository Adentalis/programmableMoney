import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";

import ReadString from "./ReadString";
import SetString from "./SetString";

const StyledContainer = styled(Container)`
  color: #e6e6fa;
  position: relative;
  width: calc(100% - 200px);
  height: calc(100% - 200px);
  margin: 100px 100px 100px 100px;
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
  height: "100%",
};

const thStyle = {
  width: "30%",
};

export default class InfoContainer extends Component {
  state = { 
    lastTransaction: null,       
    date: "gestern",
    address: "Weihnachtsmann",
    value: "4Millionen ETH", 
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const lastTransaction = contract.methods["getLastTrasaction"].cacheCall();
    this.setState({ lastTransaction });
  }

  render() {

    const { Bank } = this.props.drizzleState.contracts;
    const storedData = Bank.getLastTrasaction[this.state.lastTransaction];

    const address = storedData && storedData.value[0];
    const date = storedData && storedData.value[1];
    const value = storedData && storedData.value[2];

    return (
      <StyledContainer>
        <Header>Letzte Transaktion</Header>
        <Divider />
        <Content>
          <table style={tableStyle}>
            <tr>
              <th style={thStyle}>Datum</th>
              <td>{date}</td>
            </tr>
            <tr>
              <th style={thStyle}>Adresse</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th style={thStyle}>Betrag</th>
              <td>{value}</td>
            </tr>
          </table>
        </Content>
        <ReadString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
          <SetString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />

      </StyledContainer>
    );
  }
}
