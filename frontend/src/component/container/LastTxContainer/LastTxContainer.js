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
    transactionMode: 1,
    transactionValue: '',
    transactionValueInvalid: true,
    ownBalanceDataKey: null
  };

  componentDidMount() {
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.deposit = this.deposit.bind(this);

    this.getOwnBalance();

  }

  setTransactionMode(mode){
    //1 = einzahlen
    //2 = auszahlen

    this.setState({ transactionMode: mode });
  }

  handleInputChange = e => {
    this.setState({transactionValue: e.target.value})
    var validation = {
      isNumber:function(str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
      }
    };
    if(validation.isNumber(e.target.value)) {
      this.setState({transactionValueInvalid: false});
    }else{
      this.setState({ transactionValueInvalid: true });
    }
  };

  handleAmountChanged = (e) =>{
    this.setState({ transactionValue: e.target.value});
    var newValue = e.target.value;
    var validation = {
      isNumber:function(str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
      }
    };
    if(validation.isNumber(newValue)) {
      this.setState({transactionValueInvalid: false});
    }else{
      this.setState({ transactionValueInvalid: true });
    }
  }


  handleTransaction = async () => {
    if(this.state.transactionValueInvalid){
      console.log("Invalid input for transcation");
      return;
    }
    if(this.state.transactionMode == 1){
      await this.deposit();
    }else if(this.state.transactionMode == 2){
      await this.withdraw();
    }
    this.setState({ transactionValue: '' });
    this.setState({ transactionValueInvalid: true });
    this.getOwnBalance();
  };



  deposit () {
    const { transactionValue } = this.state;
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;
    console.log("Deposit " + transactionValue);
    contract.methods["deposit"].cacheSend({value: transactionValue, from: drizzleState.accounts[0]});
  }


  withdraw = async () => {
    console.log("Withdraw " + this.state.transactionValue);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;

    contract.methods["withdraw"].cacheSend({from: drizzleState.accounts[0]});
  };

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
    const ownBalance = ownBalanceResponse && ownBalanceResponse.value;

    return (
      <StyledContainer>
        <Header>Bankosolo</Header>
        <Divider />
        <Content>
          {/*}
          <div>{this.state.transactionMode}</div>
          <div>{this.state.transactionValue}</div>
          */}
          <Form inline>
            {/*<div>{this.state.transactionMode}</div>*/}
            <table style={tableStyle}>
              <tr>
                <th style={thStyle}>Guthaben</th>
                <td>{ownBalance}</td>
              </tr>
            </table>
            <FormControl style={{width: "50%", marginBottom: "10px"}} type="text" placeholder="Betrag" className="mr-sm-2" value={this.state.transactionValue} onChange={this.handleInputChange}/>
            <ToggleButtonGroup style={{width: "calc(50% - 10px)", marginBottom: "10px"}} type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} variant="outline-light" onChange={(e) => this.setTransactionMode(e.currentTarget.value)}>Einzahlen</ToggleButton>
              <ToggleButton value={2} variant="outline-light" onChange={(e) => this.setTransactionMode(e.currentTarget.value)}>Auszahlen</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outline-light" disabled={this.state.transactionValueInvalid} onClick={this.handleTransaction} block>Bestätigen</Button>
          </Form>
        </Content>
      </StyledContainer>
    );
  }
}