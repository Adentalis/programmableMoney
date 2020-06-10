import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
require('./styletab.css');

const GridWrapper = styled.div`
  display: grid;
  margin-top: 8em;
  margin-left: 10em;
  margin-right: 6em;
  margin-bottom: 10em;
  grid-template-columns: repeat(25, auto);
  grid-auto-rows: minmax(100px, auto);
`;

export const MessageContainer = () => (
    <div className="alignment">
        <GridWrapper>
            <div style={{backgroundColor: '#4B0082',width: '50vh',height: '50vh',borderRadius: 50,padding: '20px',}}>
            <h1 style={{color: '#E6E6FA',}}>Nachrichten</h1>
            <Tabs>
                <div label="Überweisung senden"></div>
                <div label="Termin">
                After 'while, <em>Termin</em>!
                </div>
                <div label="Dauerauftrag ">
                Nothing to see here, this tab is <em>extinct</em>!
                </div>
            </Tabs>
            </div>
        </GridWrapper>
    </div>
)
