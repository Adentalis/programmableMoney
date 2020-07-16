import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";
import {Button, Form, FormControl, ToggleButtonGroup, ToggleButton} from "react-bootstrap";

const StyledContainer = styled(Container)`
  color: #e6e6fa;
  position: relative;
  width: calc(100% - 200px);
  height: calc(55% - 200px);
  margin: 100px 100px 100px 100px;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  font-size: x-large;
`;

const tableStyle = {
  width: "100%",
  height: "80%",
  marginBottom: "20px"
};

const thStyle = {
  width: "30%",
};

export default class InfoContainer extends Component {
  state = {
    ownBalanceDataKey: null
  };

  componentDidMount() {
    this.getOwnBalance();
  }

  getOwnBalance(){
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const ownBalanceDataKey = contract.methods["getOwnBalance"].cacheCall();
    this.setState({ ownBalanceDataKey });
  }

  render() {

    const { Bank } = this.props.drizzleState.contracts;
    const ownBalanceResponse = Bank.getOwnBalance[this.state.ownBalanceDataKey];
    const ownBalance = ownBalanceResponse && ownBalanceResponse.value[0];

    return (
      <StyledContainer>
        <Header>Bankosolo</Header>
        <Divider />
        <Content>

          <Form inline>
            <table style={tableStyle}>
              <tr>
                <th style={thStyle}>Guthaben</th>
                <td>{ownBalance}</td>
              </tr>
            </table>
            <FormControl style={{width: "50%", marginBottom: "10px"}} type="text" placeholder="Betrag" className="mr-sm-2" />
            <ToggleButtonGroup style={{width: "calc(50% - 10px)", marginBottom: "10px"}} type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} variant="outline-light" >Einzahlen</ToggleButton>
              <ToggleButton value={2} variant="outline-light" >Auszahlen</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outline-light" block>Bestätigen</Button>
          </Form>
        </Content>
      </StyledContainer>
    );
  }
}
