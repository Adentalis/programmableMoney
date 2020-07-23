import React, { Component } from "react";
import { Container, Header, Divider, Content, Button } from "../Container";
import { NAVIGATION_FREEZE_TEXT } from "../../../constants";

export default class FreezeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freezeTime: "2020-07-25T00:00",
      validFreezeTime: false,
    };
    this.submitFreezeTime = this.submitFreezeTime.bind(this);
    this.handleFreezeTimeChange = this.handleFreezeTimeChange.bind(this);
  }

  handleFreezeTimeChange(e) {
    this.setState({ validFreezeTime: true });
    this.setState({ freezeTime: e.target.value });
  }

  submitFreezeTime() {
    var selectedTime = new Date(this.state.freezeTime);
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
          new Date(selectedTime).toLocaleString() +
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

  render() {
    return (
      <Container>
        <Header>{NAVIGATION_FREEZE_TEXT}</Header>
        <Divider />
        <Content>
          <div>
            <div class="md-form md-outline input-with-post-icon datepicker">
              <label>Bis wann soll Ihr Konto gesperrt werden?</label>
              <input
                id="freezeTimePicker"
                placeholder="Select date"
                type="datetime-local"
                class="form-control"
                value={this.state.freezeTime}
                onChange={this.handleFreezeTimeChange}
              />
            </div>
            <div class="form-group" />
          </div>
          <Button
            style={{
              position: "absolute",
              width: "calc(100% - 40px)",
              height: "calc(10%)",
            }}
            variant="outline-light"
            disabled={!this.state.validFreezeTime}
            onClick={this.submitFreezeTime}
          >
            Konto sperren
          </Button>
        </Content>
      </Container>
    );
  }
}
