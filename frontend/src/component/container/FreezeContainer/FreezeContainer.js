import React, { Component } from "react";
import { Container, Header, Divider, Content, Button } from "../Container";
import { NAVIGATION_FREEZE_TEXT } from "../../../constants";

export default class FreezeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freezeTime: "",
    };
    this.submitFreezeTime = this.submitFreezeTime.bind(this);
    this.handleFreezeTimeChange = this.handleFreezeTimeChange.bind(this);
  }

  handleFreezeTimeChange(e) {
    console.log("Ein korrektes Datum wurde ausgewählt :)");
    this.setState({ freezeTime: e.target.value });
  }

  submitFreezeTime() {
    var selectedTime = new Date(this.state.freezeTime);
    var now = new Date();
    var timeInSecondsToFreeze = Math.floor((selectedTime - now) / 1000);
    if(timeInSecondsToFreeze > 0)
    console.log(timeInSecondsToFreeze + " Sekunden zum einfrieren");
  }

  render() {
    return (
      <Container>
        <Header>{NAVIGATION_FREEZE_TEXT}</Header>
        <Divider />
        <Content>
          <div>
            <div class="md-form md-outline input-with-post-icon datepicker">
              <label>Bis wann soll Ihr Geld eingefroren werden?</label>
              <input
                id="freezeTimePicker"
                placeholder="Select date"
                type="datetime-local"
                class="form-control"
                //value="2020-07-09T13:00"
                onChange={this.handleFreezeTimeChange}
              />
            </div>
            <div class="form-group" />
          </div>
          <Button onClick={this.submitFreezeTime}>Bestätigen</Button>
        </Content>
      </Container>
    );
  }
}
