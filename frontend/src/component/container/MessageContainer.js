import React from 'react';
import Tabs from './Tabs';
import styled from 'styled-components';

import { NAVIGATION_MESSAGE_TEXT } from '../../constants';
import { Container, InnerContainer } from './Container';
require('./styletab.css');

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

const StyledInnerContainer = styled(InnerContainer)`
/* Special Style for inner Container */
`;


export const MessageContainer = () => (
    <StyledContainer>
        <h1 style={{ color: '#E6E6FA' }}>{NAVIGATION_MESSAGE_TEXT}</h1>
        <Tabs>
            <div label="Posteingang"  >
            </div>
            <div label="Postausgang">

            </div>
            <div label="Neu">
            </div>
        </Tabs>
        <StyledInnerContainer>

        </StyledInnerContainer>
    </StyledContainer>
)
