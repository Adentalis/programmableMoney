import React, { Component } from "react";
import { Container, Header, Divider, Content } from "../Container";
import { NAVIGATION_FREEZE_CONTRACT_TEXT } from "../../../constants";
import { Form, Button } from "react-bootstrap";

export default class FreezeContractContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freezeTime: "2020-07-25T00:00",
      validFreezeTime: false,
    };
    this.submitFreezeTime = this.submitFreezeTime.bind(this);
    this.handleFreezeTimeChange = this.handleFreezeTimeChange.bind(this);
    this.getNowFormatet = this.getNowFormatet.bind(this);
  }

  handleFreezeTimeChange(e) {
    this.setState({ freezeTime: e.target.value });
    if((e.target.value).length > 0) {
      this.setState({validFreezeTime: true});
    }else{
      this.setState({validFreezeTime: false});
    }
  }

  submitFreezeTime() {
    var selectedTime = new Date(this.state.freezeTime);
    selectedTime = selectedTime - 1000 *(60*60*3);
    var now = new Date();
    var timeInSecondsToFreeze = Math.floor((selectedTime - now) / 1000);
    if (isNaN(timeInSecondsToFreeze)) {
      alert("Bitte trage Sie ein gültiges Datum ein!");
    } else if (timeInSecondsToFreeze < 0) {
      alert(
        "Ihr ausgewähltes Datum liegt in der Vergangenheit! Bitte ein zukünftiges Datum auswählen."
      );
    } else if (timeInSecondsToFreeze < 300) {
      alert(
        "Ihr ausgewähltes Datum liegt nur innerhalb von 5 Minuten in der Zukunft, und könnte somit eventuell nicht rechtzeitig bearbeitet werden!"
      );
      this.sendFreezeTime(timeInSecondsToFreeze);

    } else {
      alert(
        "Ihr Konto wird bis zum " +
          (new Date(selectedTime)).toLocaleString() +
          " gespert werden!"
      );
      this.sendFreezeTime(timeInSecondsToFreeze);
    }
  }
  
  async sendFreezeTime(timeInSecondsToFreeze){
    console.log(timeInSecondsToFreeze + " Sekunden zum einfrieren");
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;
    contract.methods["freezeMoney"].cacheSend(timeInSecondsToFreeze, {
      from: drizzleState.accounts[0],
    });
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

  render() {
    this.getNowFormatet();
    return (
      <Container>
        <Header>{NAVIGATION_FREEZE_CONTRACT_TEXT}</Header>
        <Divider />
        <Content>
          <div>
            <div class="md-form md-outline input-with-post-icon datepicker">
              <label>Bis wann soll Ihr Konto gesperrt werden?</label>
              <input
                id="freezeTimePicker"
                placeholder="Select date"
                type="date"
                class="form-control"
                min={this.getNowFormatet()}
                value={this.state.freezeTime}
                onChange={this.handleFreezeTimeChange}
              />
            </div>
            <div class="form-group" />
          </div>{
          <Button
              style={{
                position: "absolute",
                width: "calc(100% - 40px)",
                bottom: "10px",
              }}
              variant="outline-light"
              disabled={!this.state.validFreezeTime}
              onClick={this.submitFreezeTime}
          >
            Senden
          </Button>/*
          <Button
            style={{
y
            }}
            variant="outline-light"
            disabled={!this.state.validFreezeTime}
            onClick={this.submitFreezeTime}
          >

            Konto sperren
          </Button>
          */}
        </Content>
      </Container>
    );
  }
}
