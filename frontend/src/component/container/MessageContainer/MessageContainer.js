import React, { Component } from "react";
import Tabs from "../Tab/Tabs";
import { NAVIGATION_MESSAGE_TEXT } from "../../../constants";
import {
  Container,
  Header,
  Divider,
  Content,
  Button,
  Textarea,
} from "../Container";
require("../textfield.css");

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessageText: "",
      newMessageReceiver: "",
      sendMessageKey: null,
      getSendMessagesKey: null,
      getReceivedMessagesKey: null,
    };

    this.handleMessageText = this.handleMessageText.bind(this);
    this.handleReceiverAdress = this.handleReceiverAdress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    //init the 5 sendMessages
    let getSendMessagesKey = [];
    for (let i = 0; i <= 4; i++) {
      getSendMessagesKey = contract.methods["getSendMessages"].cacheCall(i);
    }
    this.setState({ getSendMessagesKey });

    //init the 5 sendMessages
    let getReceivedMessagesKey = [];
    for (let i = 0; i <= 4; i++) {
      getReceivedMessagesKey = contract.methods[
        "getReceivedMessages"
      ].cacheCall(i);
    }
    this.setState({ getReceivedMessagesKey });
  }

  handleMessageText(e) {
    this.setState({ newMessageText: e.target.value });
  }

  handleReceiverAdress(e) {
    this.setState({ newMessageReceiver: e.target.value });
  }

  async submitMessage() {
    console.log("Nachricht: " + this.state.newMessageText);
    console.log("Adresse des Empfängers: " + this.state.newMessageReceiver);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Bank;

    contract.methods["sendMessage"].cacheSend(
      this.state.newMessageText,
      this.state.newMessageReceiver,
      { from: drizzleState.accounts[0] }
    );
  }

  render() {
    return (
      <Container>
        <Header>{NAVIGATION_MESSAGE_TEXT}</Header>
        <Divider />
        <Content>
          <Tabs>
            <div label="Posteingang">test</div>
            <div label="Postausgang">testr2323</div>
            <div label="Neu">
              <Textarea
                placeholder="Ihre Nachricht..."
                onChange={this.handleMessageText}
              ></Textarea>
              <input
                placeholder="Adresse des Empfängers"
                onChange={this.handleReceiverAdress}
              />
              <Button onClick={this.submitMessage}>Abschicken</Button>
            </div>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
