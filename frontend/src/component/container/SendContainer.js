import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import { Container } from './Container';
import {NAVIGATION_SEND_TEXT} from '../../constants'
require('./styletab.css');

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;
export const SendContainer = () => (
    <StyledContainer>
        <h1 style={{color: '#E6E6FA',}}>{NAVIGATION_SEND_TEXT}</h1>
        <Tabs>
            <div label="Überweisung senden"></div>
            <div label="Termin">
            After 'while, <em>Termin</em>!
            </div>
            <div label="Dauerauftrag ">
            Nothing to see here, this tab is <em>extinct</em>!
            </div>
        </Tabs>
    </StyledContainer>
)
