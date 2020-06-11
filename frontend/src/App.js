import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './component/NavigationBar';
import { SendContainer, MessageContainer, FreezeContainer, InfoContainer } from './component';
import styled from 'styled-components';


const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(496px, 1fr));
  background-color: #483d8b;
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Left = styled.div`
  padding: 30px;
`;

const Right = styled.div`
  padding: 30px;
`;

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Body>
          <Left>
            <Switch>
              <Route path="/message" component={MessageContainer} />
              <Route path="/send" component={SendContainer} />
              <Route path="/freeze" component={FreezeContainer} />
            </Switch>
          </Left>
          <Right>
            <InfoContainer />
          </Right>
        </Body>
      </Router>
    </React.Fragment>
  );
}

export default App;
