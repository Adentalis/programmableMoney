import React from 'react';
import Tabs from '../Tab/Tabs';
import styled from 'styled-components';
import { NAVIGATION_MESSAGE_TEXT } from '../../../constants';
import { Container, Header, Divider, Content, Button, Textarea } from '../Container';
require( '../textfield.css' );

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

export const StyledButton = styled(Button)`
    /* Special Style for Button */
`;

export const StyledTextArea = styled(Textarea)`
    /* Special Style for Textarea */

`;


export const MessageContainer = () => (
    <StyledContainer>
        <Header>{NAVIGATION_MESSAGE_TEXT}</Header>
        <Divider />
        <Content>
            <Tabs>
                <div label="Posteingang">

                </div>
                <div label="Postausgang">

                </div>
                <div label="Neu">
                    <StyledTextArea placeholder="Hier Nachricht verfassen"></StyledTextArea>
                    <StyledTextArea placeholder="Hier Absenderadresse hinzufügen"></StyledTextArea>
                    <StyledButton type="button" >Abschicken</StyledButton>
                </div>
            </Tabs>
        </Content>
    </StyledContainer>
)
