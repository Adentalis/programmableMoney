import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";

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
    dataKey: null,
    date: "gestern",
    address: "Weihnachtsmann",
    value: "4Millionen ETH",
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["getLastTransaction"].cacheCall();
    this.setState({ dataKey });
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

  render() {
    const { Bank } = this.props.drizzleState.contracts;
    const storedData = Bank.getLastTransaction[this.state.dataKey];
    const date = storedData && storedData.value[2];
    var localDateTime = new Date(1000 * parseInt(date)).toLocaleString();
    const address = storedData && storedData.value[0];
    const value = storedData && storedData.value[1];

    return (
      <StyledContainer>
        <Header>Letzte Transaktion</Header>
        <Divider />
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
      </StyledContainer>
    );
  }
}
