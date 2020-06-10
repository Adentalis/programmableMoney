import React from 'react';
import Tabs from './Tabs';
import { Container } from './Container';
require('./styletab.css');

export const MessageContainer = () => (
    <Container>
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
    </Container>
)
