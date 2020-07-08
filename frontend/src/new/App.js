import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './component/NavigationBar';
import { SendContainer, MessageContainer, FreezeContainer, InfoContainer } from './component';
 

function App() {
  return (
    <React.Fragment>
      <Router> 
        <NavigationBar />
        <div className ="content">
          <div className="left">
            <Switch>
              <Route path="/message" component={MessageContainer} />
              <Route path="/send" component={SendContainer} />
              <Route path="/freeze" component={FreezeContainer} />
            </Switch>
          </div>
          <div className="right">
            <InfoContainer />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
