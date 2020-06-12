import React from 'react';
import Tabs from './Tabs';
import styled from 'styled-components';
import { Container } from './Container';
import {NAVIGATION_MESSAGE_TEXT} from '../../constants'

require('./styletab.css');

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

export const MessageContainer = () => (
    <StyledContainer>
        <h1 style={{color: '#E6E6FA'}}>{NAVIGATION_MESSAGE_TEXT}</h1>
        <Tabs>
            <div label="Posteingang"style={{color: '#E6E6FA'}}></div>
            <div label="Postausgang">
            After 'while, <em>Termin</em>!
            </div>
            <div label="Neu">
           </div>
        </Tabs>
    </StyledContainer>
)
