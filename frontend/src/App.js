import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './component/NavigationBar';
import { SendContainer, MessageContainer, FreezeContainer } from './component';
import styled from 'styled-components';


const Body = styled.div`
  display: grid;
  grid-template-columns: auto 30%;
  grid-template-rows: 100%;
  background-color: #483d8b;
  position: fixed;
  width: 100%;
  height: 100%;
`;


function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Body>
          <Switch>
            <Route path="/message" component={MessageContainer} />
            <Route path="/send" component={SendContainer} />
            <Route path="/freeze" component={FreezeContainer} />
          </Switch>
        </Body>
      </Router>
    </React.Fragment>
  );
}

export default App;
