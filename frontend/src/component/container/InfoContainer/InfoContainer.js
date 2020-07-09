import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";

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

//-----
export default class FreezeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "gestern",
      address: "Weihnachtsmann",
      value: "4Millionen ETH",
    };
  }

  render() {
    return (
      <StyledContainer>
        <Header>Letzte Transaktion</Header>
        <Divider />
        <Content>
          <table style={tableStyle}>
            <tr>
              <th style={thStyle}>Datum</th>
              <td>{this.state.date}</td>
            </tr>
            <tr>
              <th style={thStyle}>Adresse</th>
              <td>{this.state.address}</td>
            </tr>
            <tr>
              <th style={thStyle}>Betrag</th>
              <td>{this.state.value}</td>
            </tr>
          </table>
        </Content>
      </StyledContainer>
    );
  }
}
