import React from 'react';
import { render } from "react-dom";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './component/NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import styled from 'styled-components';
import Tabs from './component/Tabs';
require('./component/styletab.css');



const GridWrapper = styled.div`
  display: grid;
  
  grid-gap: 100px;
  margin-top: 1em;
  margin-left: 10em;
  margin-right: 6em;
  grid-template-columns: repeat(25, 2fr);
  grid-auto-rows: minmax(100px, auto);
`;




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

      <GridWrapper>
        <div
          style={{
            backgroundColor: '#483d8b',
            width: '450px',
            height: '450px',
            borderRadius: 50,

            padding: '20px',


          }}
        >



          <h1>Geld senden</h1>
          <Tabs>
            <div label="Überweisung senden">
              Zahlungsempfänger , <em>Zahlungsempfänger</em>
            </div>
            <div label="Termin">
              After 'while, <em>Termin</em>!
      </div>
            <div label="Dauerauftrag ">
              Nothing to see here, this tab is <em>extinct</em>!
      </div>
          </Tabs>

        </div>
      </GridWrapper>



    </React.Fragment>

  );
}



export default App;
