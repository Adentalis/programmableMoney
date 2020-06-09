import React from 'react';
import { render } from "react-dom";
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './component/NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import { FileTab } from './component/FileTab';




function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

       

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <FileTab>
        
      </FileTab>

     
  


    </React.Fragment>
    
    
  );
}



export default App;
