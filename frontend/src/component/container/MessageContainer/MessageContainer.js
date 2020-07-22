import React, { Component } from "react";
import Tabs from "../Tab/Tabs";
import { NAVIGATION_MESSAGE_TEXT } from "../../../constants";
import {
  Container,
  Header,
  Divider,
  Content,
} from "../Container";

import { Form,Button } from "react-bootstrap";

require("../textfield.css");

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessageText: "",
      newMessageReceiver: "",
      newMessageReceiverInvalid: true,
      newMessageTextInvalid: true,
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
    if ((e.target.value).length > 0) {
      this.setState({ newMessageTextInvalid: false });
    } else {
      this.setState({ newMessageTextInvalid: true });
    }
  }

  handleReceiverAdress(e) {
    this.setState({ newMessageReceiver: e.target.value });
    var validation = {
      isAddress: function (str) {
        var pattern = /^0x[a-f,0-9,A-F]+$/;
        return pattern.test(str); // returns a boolean
      },
    };
    if (validation.isAddress(e.target.value) && (e.target.value).length == 42) {
      this.setState({ newMessageReceiverInvalid: false });
    } else {
      this.setState({ newMessageReceiverInvalid: true });
    }
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
    this.state.newMessageText = "";
    this.state.newMessageReceiver = "";
    this.state.newMessageReceiverInvalid = true;
    this.state.newMessageTextInvalid = true;
  }

  createSendMessagesContent() {
    const { Bank } = this.props.drizzleState.contracts;

    //load the messages from the SC
    const lastMessageSend = [];
    for (let i = 0; i < this.MAXIMUM_MESSAGES; i++) {
      lastMessageSend[i] = Bank.getSendMessages[this.state.getSendMessagesKey[i]];
    }

    //wait for all MessagesLoaded
    if (this.allMessagesLoaded(lastMessageSend)) {
      return this.createMessageContent(lastMessageSend);
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
    if (this.allMessagesLoaded(lastRecievedMessage)){
      return this.createMessageContent(lastRecievedMessage);
    }
  }

  createMessageContent(lastMessage){
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
              <Form.Group controlId="newForm.AddressInput">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="address" placeholder="0x0000000000000000000000000000000000000000" value={this.state.newMessageReceiver} onChange={this.handleReceiverAdress}/>
              </Form.Group>
              <Form.Group controlId="newForm.MessageInput">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control style={{ position: "absolute", height: "calc(100% - 270px)", width: "calc(100% - 40px)", resize: "none"}} as="textarea" placeholder="Hier können Sie Ihre Nachricht eingeben..." value={this.state.newMessageText} onChange={this.handleMessageText}/>
              </Form.Group>
              <Button style={{ position: "absolute", width: "calc(100% - 40px)", bottom: "10px"}} variant="outline-light" disabled={this.state.newMessageReceiverInvalid || this.state.newMessageTextInvalid} onClick={this.submitMessage}>
                Senden
              </Button>
            </div>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
