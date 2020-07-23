import React, { Component } from "react";
import { Container, Header, Divider, Content } from "../Container";
import { NAVIGATION_FREEZE_MONEY_TEXT } from "../../../constants";
import {Button, Form, FormControl} from "react-bootstrap";
import Tabs from "../Tab/Tabs";

export default class FreezeMoneyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freezeValue: null,
      freezeValueInvalid: true,

      freezeTime: null,
      freezeTimeInvalid: true,

      freezeMessage: null,
      freezeMessageInvalid: true,

      transactionValue: "",

      getFreezeTransactionKey: [],
    };
    this.handleFreezeValueChange = this.handleFreezeValueChange.bind(this);
    this.handleFreezeTimeChange = this.handleFreezeTimeChange.bind(this);
    this.handleFreezeMessageChange = this.handleFreezeMessageChange.bind(this);

    this.submitFreezeTransaction = this.submitFreezeTransaction.bind(this);

    this.getNowFormatet = this.getNowFormatet.bind(this);
    this.sortFreezeTransactionsByReleaseDate = this.sortFreezeTransactionsByReleaseDate.bind(this);
    this.MAXIMUM_FREEZE_TRANSACTIONS = 5;
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    //init the 5 FreezeTransactions
    let getFreezeTransactionKey = [];
    for (let i = 0; i < this.MAXIMUM_FREEZE_TRANSACTIONS; i++) {
      getFreezeTransactionKey[i] = contract.methods["getFreezeTransaction"].cacheCall(i);
    }
    this.setState({ getFreezeTransactionKey });
  }

  handleFreezeValueChange(e) {
    this.setState({ freezeValue: e.target.value });
    var newValue = e.target.value;
    var validation = {
      isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str); // returns a boolean
      },
    };
    if (validation.isNumber(newValue)) {
      this.setState({ freezeValueInvalid: false });
    } else {
      this.setState({ freezeValueInvalid: true });
    }
  }

  handleFreezeTimeChange(e) {
    this.setState({ freezeTime: e.target.value });
    if((e.target.value).length > 0) {
      this.setState({freezeTimeInvalid: false});
    }else{
      this.setState({freezeTimeInvalid: true});
    }
  }

  handleFreezeMessageChange(e) {
    this.setState({ freezeMessage: e.target.value });
    if((e.target.value).length > 0) {
      this.setState({freezeMessageInvalid: false});
    }else{
      this.setState({freezeMessageInvalid: true});
    }
  }

  async sendFreezeTime(value, timeInSecondsToFreeze, message){
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;
    contract.methods["createFreezeTranaction"].cacheSend(timeInSecondsToFreeze, value, message, {
      from: drizzleState.accounts[0],
    });
  }

  submitFreezeTransaction(){
    var selectedTime = new Date(this.state.freezeTime);
    var now = new Date();
    var timeInSecondsToFreeze = Math.floor((selectedTime - now) / 1000);

    console.log("freeze - Value: " + this.state.freezeValue + " Time " + this.state.freezeTime + "(" + timeInSecondsToFreeze + ") Message" + this.state.freezeMessage);
    this.sendFreezeTime(this.state.freezeValue, timeInSecondsToFreeze, this.state.freezeMessage);

    this.setState({ freezeMessage: '', freezeMessageInvalid: true, freezeValue: '', freezeValueInvalid: true, freezeTime: '', freezeTimeInvalid: true });
  }

  getNowFormatet(){
    var today = new Date()
    var tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    var dd = tomorrow.getDate();

    var mm = tomorrow.getMonth()+1;
    var yyyy = tomorrow.getFullYear();
    if(dd<10)
    {
      dd='0'+dd;
    }

    if(mm<10)
    {
      mm='0'+mm;
    }
    tomorrow = yyyy + '-' + mm + '-' + dd;
    return tomorrow;
  }

  sortFreezeTransactionsByReleaseDate(freezeTransactions) {
    return freezeTransactions.sort((freezeTransactionA, freezeTransactionB) => {
      return freezeTransactionA.value[2] - freezeTransactionB.value[2];
    });
  }

  createFreezeTransactionContent() {
    const { Bank } = this.props.drizzleState.contracts;

    const lastFreezeTransaction = [];
    for (let i = 0; i < this.MAXIMUM_FREEZE_TRANSACTIONS; i++) {
      lastFreezeTransaction[i] =
          Bank.getFreezeTransaction[this.state.getFreezeTransactionKey[i]];
    }
    //wait for all Transactions loaded
    if (this.allFreezeTransactionsLoaded(lastFreezeTransaction)) {
      return this.createAllFreezeTransactionContent(lastFreezeTransaction);
    }
  }


  createAllFreezeTransactionContent(allFreezeTransactions) {
    let filledFreezeTransaction = allFreezeTransactions.filter(
        (freezeTransaction) => freezeTransaction.value[1] !== ""
    );
    filledFreezeTransaction = this.sortFreezeTransactionsByReleaseDate(filledFreezeTransaction);

    return filledFreezeTransaction.map((freezeTransaction, index) => (
        <div key={index}>
          <hr style={(index != 0) ? {borderTop: "3px solid #bbb"} : {borderTop: "0px solid #bbb"}}/>
          <div>
            <div>
              <b>Zweck</b>
            </div>
            <div style={{ paddingLeft: "10px", width: "100%", overflow: "visible"}}>
              {freezeTransaction.value[2]}
            </div>
          </div>
          <div>
            <div>
              <b>Betrag</b>
            </div>
            <div style={{ paddingLeft: "10px", width: "100%"}}>
              {freezeTransaction.value[1]}
            </div>
          </div>
          <div>
            <div>
              <b>Freischaltdatum</b>
            </div>
            <div style={{ paddingLeft: "10px", width: "100%"}}>
              {new Date(
                  1000 * parseInt(freezeTransaction.value[0]) + 3600000
              ).toLocaleString()}
            </div>
          </div>
        </div>
    ));
  }

  allFreezeTransactionsLoaded(lastFreezeTransaction) {
    for (let i = 0; i < this.MAXIMUM_FREEZE_TRANSACTIONS; i++) {
      if (lastFreezeTransaction[i] === undefined) return false;
    }
    return true;
  }

  render() {
    this.getNowFormatet();
    return (
      <Container>
        <Header>{NAVIGATION_FREEZE_MONEY_TEXT}</Header>
        <Divider />
        <Content>
          <Tabs>
            <div label="Neu">
              <label>Welchen Betrag möchten Sie zurücklegen?</label>
              <FormControl
                  style={{ width: "100%", marginBottom: "10px" }}
                  type="text"
                  placeholder="100000000"
                  className="mr-sm-2"
                  value={this.state.freezeValue}
                  onChange={this.handleFreezeValueChange}
              />
              <label>Bis wann möchten Sie diesen Betrag zurücklegen?</label>
              <input
                style={{ width: "100%", marginBottom: "10px" }}
                placeholder="Select date"
                type="date"
                class="form-control"
                min={this.getNowFormatet()}
                value={this.state.freezeTime}
                onChange={this.handleFreezeTimeChange}
              />
              <label>Zweck</label>
              <FormControl
                  style={{ width: "100%", marginBottom: "10px" }}
                  type="text"
                  placeholder="Sparen für schlechte Zeiten"
                  className="mr-sm-2"
                  value={this.state.freezeMessage}
                  onChange={this.handleFreezeMessageChange}
              />
              <Button
                  style={{
                    position: "absolute",
                    width: "calc(100% - 40px)",
                    marginTop: "10px"
                  }}
                  variant="outline-light"
                  disabled={this.state.freezeValueInvalid || this.state.freezeTimeInvalid || this.state.freezeMessageInvalid}
                  onClick={this.submitFreezeTransaction}
              >
                Zurücklegen
              </Button>
            </div>
            <div label="Zurückgelegte Beträge">
              <div style={{width: "calc(100% - 40px)", height: "calc(100% - 100px)", overflow: "auto", position: "absolute" }}>
                {this.createFreezeTransactionContent()}
              </div>
            </div>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
