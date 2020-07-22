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
      getSendMessagesKey: [],
      getReceivedMessagesKey: [],
    };

    this.handleMessageText = this.handleMessageText.bind(this);
    this.handleReceiverAdress = this.handleReceiverAdress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);

    this.MAXIMUM_MESSAGES = 5;
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Bank;

    //init the 5 sendMessages
    let getSendMessagesKey = [];
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      getSendMessagesKey[i] = contract.methods["getSendMessages"].cacheCall(i);
    }
    this.setState({ getSendMessagesKey });

    //init the 5 sendMessages
    let getReceivedMessagesKey = [];
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      getReceivedMessagesKey[i] = contract.methods[
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

  createSendMessagesContent() {
    const { Bank } = this.props.drizzleState.contracts;

    //load the messages from the SC
    const lastMessage = [];
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      lastMessage[i] = Bank.getSendMessages[this.state.getSendMessagesKey[i]];
    }

    //wait for all MessagesLoaded
    if (this.allMessagesLoaded(lastMessage)) {
      return lastMessage.map((message, index) => (
        <div key={index}>
          <table>
            <tr>
              <th>Datum</th>
              <td>
                {new Date(
                  1000 * parseInt(message.value[2]) + 3600000
                ).toLocaleString()}
              </td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{message.value[0]}</td>
            </tr>
            <tr>
              <th>Nachricht</th>
              <td>{message.value[1]}</td>
            </tr>
          </table>
          ---------------
        </div>
      ));
    }
  }

  createReceivedMessagesContent() {
    const { Bank } = this.props.drizzleState.contracts;

    //load the messages from the SC
    const lastRecievedMessage = [];
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      lastRecievedMessage[i] = Bank.getReceivedMessages[this.state.getReceivedMessagesKey[i]];
    }

    //wait for all MessagesLoaded
    if (this.allMessagesLoaded(lastRecievedMessage)) {
      return lastRecievedMessage.map((message, index) => (
        <div key={index}>
          <table>
            <tr>
              <th>Datum</th>
              <td>
                {new Date(
                  1000 * parseInt(message.value[2]) + 3600000
                ).toLocaleString()}
              </td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{message.value[0]}</td>
            </tr>
            <tr>
              <th>Nachricht</th>
              <td>{message.value[1]}</td>
            </tr>
          </table>
          ---------------
        </div>
      ));
    }
  }

  allMessagesLoaded(messages) {
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      if (messages[i] === undefined) return false;
    }
    return true;
  }

  render() {
    return (
      <Container>
        <Header>{NAVIGATION_MESSAGE_TEXT}</Header>
        <Divider />
        <Content>
          <Tabs>
            <div label="Posteingang">{this.createReceivedMessagesContent()}</div>
            <div label="Postausgang">{this.createSendMessagesContent()}</div>
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
