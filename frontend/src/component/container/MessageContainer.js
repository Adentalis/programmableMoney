import React from 'react';
import Tabs from './Tabs';
import styled from 'styled-components';

import { NAVIGATION_MESSAGE_TEXT } from '../../constants';
import { Container, InnerContainer } from './Container';
require( './textfield.css');
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
                <StyledInnerContainer>
                </StyledInnerContainer>
            </div>
            <div label="Postausgang">
                <StyledInnerContainer></StyledInnerContainer>
            </div>
            <div label="Neu">
                <StyledInnerContainer>
                    <div class="form-group shadow-textarea">
                         <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Hier Nachricht verfassen"></textarea>
                    </div>


                    <div class="form-group shadow-textarea">

                        <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Hier Absenderadresse hinzufügen"></textarea>
                    </div>
                    
                    <button type="button" class="btn btn-secondary center">Abschicken</button>
                   
                    </StyledInnerContainer>
                <button type="button" class="btn btn-secondary btn-lg btn-block">abschicken</button>
            </div>
        </Tabs>

    </StyledContainer>
)
