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
      test: "",
    };
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
              <Textarea placeholder="Hier Nachricht verfassen"></Textarea>
              <Textarea placeholder="Hier Absenderadresse hinzufügen"></Textarea>
              <Button type="button">Abschicken</Button>
            </div>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
