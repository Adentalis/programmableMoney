import React from 'react';
import Tabs from './Tabs';
import { Container } from './Container';
import styled from 'styled-components';
import {NAVIGATION_FREEZE_TEXT} from '../../constants'

require('./styletab.css');

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

export const FreezeContainer = () => (
    <StyledContainer>
        <h1 style={{color: '#E6E6FA'}}>{NAVIGATION_FREEZE_TEXT}</h1>
        <Tabs>
            <div label="Überweisung senden"></div>
            <div label="Termin">After 'while, <em>Termin</em>! </div>
            <div label="Dauerauftrag ">Nothing to see here, this tab is <em>extinct</em>!</div>
        </Tabs>
    </StyledContainer>
)