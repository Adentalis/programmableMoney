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
      message: "",
      receiverAddress: "",
    };
    this.handleMessageText = this.handleMessageText.bind(this);
    this.handleReceiverAdress = this.handleReceiverAdress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleMessageText(e) {
    this.setState({ message: e.target.value });
  }

  handleReceiverAdress(e) {
    this.setState({ receiverAddress: e.target.value });
  }

  submitMessage() {
    console.log("Nachricht: " + this.state.message);
    console.log("Adresse des Empfängers: " + this.state.receiverAddress);
  }

  render() {
    return (
      <Container>
        <Header>{NAVIGATION_MESSAGE_TEXT}</Header>
        <Divider />
        <Content>
          <Tabs>
            <div label="Posteingang"></div>
            <div label="Postausgang"></div>
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
