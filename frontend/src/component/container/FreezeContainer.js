import React from 'react';
import Tabs from './Tabs';
import { Container } from './Container';
require('./styletab.css');


export const FreezeContainer = () => (
    <Container>
        <div style={{backgroundColor: '#4B0082', width: '50vh', height: '50vh', borderRadius: 50, padding: '20px'} }>
        <h1 style={{color: '#E6E6FA'}}>Geld senden</h1>
        <Tabs>
            <div label="Überweisung senden"></div>
            <div label="Termin">After 'while, <em>Termin</em>! </div>
            <div label="Dauerauftrag ">Nothing to see here, this tab is <em>extinct</em>!</div>
        </Tabs>
        </div>
    </Container>
)
