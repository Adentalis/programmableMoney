import React, { Component } from "react";
import { Container, Header, Divider } from "../Container";
import styled from "styled-components";
import {
  Button,
  Form,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

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
  marginBottom: "20px",
};

const thStyle = {
  width: "30%",
};

export default class InfoContainer extends Component {
  state = {
    transactionMode: 1,
    transactionValue: "",
    transactionValueInvalid: true,
    ownBalanceDataKey: null,
    ownFreeTimeDataKey: null,
    blockchainTime: null,

  };

  componentDidMount() {
    this.handleAmountChanged = this.handleAmountChanged.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.deposit = this.deposit.bind(this);
    this.getKeys();
  }

  setTransactionMode(mode) {
    //1 = einzahlen
    //2 = auszahlen

    this.setState({ transactionMode: mode });
  }

  handleInputChange = (e) => {
    this.setState({ transactionValue: e.target.value });
    var validation = {
      isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str); // returns a boolean
      },
    };
    if (validation.isNumber(e.target.value)) {
      this.setState({ transactionValueInvalid: false });
    } else {
      this.setState({ transactionValueInvalid: true });
    }
  };

  handleAmountChanged = (e) => {
    this.setState({ transactionValue: e.target.value });
    var newValue = e.target.value;
    var validation = {
      isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str); // returns a boolean
      },
    };
    if (validation.isNumber(newValue)) {
      this.setState({ transactionValueInvalid: false });
    } else {
      this.setState({ transactionValueInvalid: true });
    }
  };

  handleTransaction = async () => {
    if (this.state.transactionValueInvalid) {
      console.log("Invalid input for transcation");
      return;
    }
    if (this.state.transactionMode === 1) {
      await this.deposit();
    } else if (this.state.transactionMode === 2) {
      await this.withdraw();
    }
    this.setState({ transactionValue: "" });
    this.setState({ transactionValueInvalid: true });
    this.getKeys();
  };

  deposit() {
    const { transactionValue } = this.state;
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;
    console.log("Deposit " + transactionValue);
    contract.methods["deposit"].cacheSend({
      value: transactionValue,
      from: drizzleState.accounts[0],
    });
  }

  withdraw = async () => {
    console.log("Withdraw " + this.state.transactionValue);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;

    contract.methods["withdraw"].cacheSend({ from: drizzleState.accounts[0] });
  };

  getKeys() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    // get and save the key for the variable we are interested in
    const ownBalanceDataKey = contract.methods["getOwnBalance"].cacheCall();
    this.setState({ ownBalanceDataKey });
    const ownFreeTimeDataKey = contract.methods["getOwnFreezeEnd"].cacheCall();
    this.setState({ ownFreeTimeDataKey });
    const blockchainTime = contract.methods["getCurrentTime"].cacheCall();
    this.setState({ blockchainTime });
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
    const ownBalanceResponse = Bank.getOwnBalance[this.state.ownBalanceDataKey];
    const ownBalance = ownBalanceResponse && ownBalanceResponse.value;

    const ownFreezeTimeResponse = Bank.getOwnFreezeEnd[this.state.ownFreeTimeDataKey];
    const ownFreezeTime = ownFreezeTimeResponse && ownFreezeTimeResponse.value;

    const blockchainTimeResponse = Bank.getCurrentTime[this.state.blockchainTime];
    const blockchainTime = blockchainTimeResponse && blockchainTimeResponse.value;

    const now = new Date();
    const lastBlock = new Date(1000* parseInt(blockchainTime));
    var secondsSinceLastBlock = Math.round(((now - lastBlock) / 1000) - 3600);

    return (
      <StyledContainer>
        <Header>Bankosolo</Header>
        <Divider />
        <Content>
          <Form inline>
            <table style={tableStyle}>
              <tr>
                <th style={thStyle}>Letzter Block vor: </th>
                <td>{secondsSinceLastBlock} Sekunden </td>
              </tr>
              <tr>
                <th style={thStyle}>Geld eingefroren bis:</th>
                <td>{ownFreezeTime}</td>
              </tr>
              <tr>
                <th style={thStyle}>Guthaben: </th>
                <td>{this.formatEth(ownBalance)}</td>
              </tr>
            </table>
            <FormControl
              style={{ width: "50%", marginBottom: "10px" }}
              type="text"
              placeholder="Betrag"
              className="mr-sm-2"
              value={this.state.transactionValue}
              onChange={this.handleInputChange}
            />
            <ToggleButtonGroup
              style={{ width: "calc(50% - 10px)", marginBottom: "10px" }}
              type="radio"
              name="options"
              defaultValue={1}
            >
              <ToggleButton
                value={1}
                variant="outline-light"
                onChange={(e) => this.setTransactionMode(e.currentTarget.value)}
              >
                Einzahlen
              </ToggleButton>
              <ToggleButton
                value={2}
                variant="outline-light"
                onChange={(e) => this.setTransactionMode(e.currentTarget.value)}
              >
                Auszahlen
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="outline-light"
              disabled={this.state.transactionValueInvalid}
              onClick={this.handleTransaction}
              block
            >
              Bestätigen
            </Button>
          </Form>
        </Content>
      </StyledContainer>
    );
  }
}