import React  from 'react';
import styled from 'styled-components';
import { Container, InnerContainer, Header, Divider, Content } from './Container';
import {NAVIGATION_FREEZE_TEXT } from '../../constants';
import './FreezeContainer.css';
require('./styletab.css');


const StyledContainer = styled(Container)`
    /* Special Style for  Container */
`;
const StyledInnerContainer = styled(InnerContainer)`
    /* Special Style for inner Container */
`;

export const FreezeContainer = () => (
    
    <StyledContainer>
        <Header>{NAVIGATION_FREEZE_TEXT}</Header>
        <Divider />
        <Content>
            <StyledInnerContainer>
            <div class="md-form md-outline input-with-post-icon datepicker">  
                <label>Datum auswählen</label>
                <input placeholder="Select date" type="date" class="form-control"/>
            </div>
            <div class="form-group" />
                    <label for="exampleInputEmail1">Betrag </label>
                    <input type="betrag" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Betrag eingeben" />
            </StyledInnerContainer>
            <button className="buttonstyling">bestätigen</button>
        </Content>
    </StyledContainer>
    
    
)
