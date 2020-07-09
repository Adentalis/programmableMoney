import React  from 'react';
import styled from 'styled-components';
import { Container, InnerContainer, Header, Divider, Content, Button } from '../Container';
import {NAVIGATION_FREEZE_TEXT } from '../../../constants';

const StyledContainer = styled(Container)`
    /* Special Style for  Container */
`;
const StyledInnerContainer = styled(InnerContainer)`
    /* Special Style for inner Container */
`;
export const StyledButton = styled(Button)`
    /* Special Style for inner Container */
    bottom: 50px;
`;
export const FreezeContainer = () => (
    
    <StyledContainer>
        <Header>{NAVIGATION_FREEZE_TEXT}</Header>
        <Divider />
        <Content>
            <div>
                <div class="md-form md-outline input-with-post-icon datepicker">  
                    <label>Datum auswählen</label>
                    <input placeholder="Select date" type="date" class="form-control"/>
                </div>
                <div class="form-group" />
                        <label for="exampleInputEmail1">Betrag</label>
                        <input type="betrag" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Betrag eingeben"/>
            </div>
            <StyledButton>bestätigen</StyledButton>
        </Content>
    </StyledContainer>
    
    
)
