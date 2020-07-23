import React, { Component } from "react";
import { Container, Header, Divider, Content } from "../Container";
import { NAVIGATION_FREEZE_MONEY_TEXT } from "../../../constants";
import { Button, FormControl} from "react-bootstrap";
import Tabs from "../Tab/Tabs";

export default class FreezeMoneyContainer extends Component {
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
                  value={this.state.transactionValue}
                  onChange={this.handleInputChange}
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
                  value={this.state.transactionValue}
                  onChange={this.handleInputChange}
              />
              <Button
                  style={{
                    position: "absolute",
                    width: "calc(100% - 40px)",
                    marginTop: "10px"
                  }}
                  variant="outline-light"
                  disabled={!this.state.validFreezeTime}
                  onClick={this.submitFreezeTime}
              >
                Zurücklegen
              </Button>
            </div>
            <div label="Zurückgelegte Beträge">
              <div style={{width: "calc(100% - 40px)", height: "calc(100% - 100px)", overflow: "auto", position: "absolute" }}>
                Content to scroll
              </div>
            </div>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
