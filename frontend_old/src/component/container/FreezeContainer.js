import React  from 'react';
import styled from 'styled-components';
import { Container, InnerContainer, Header, Divider, Content } from './Container';
import {NAVIGATION_FREEZE_TEXT } from '../../constants';
import {} from '../../constants';

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
                
            <label for="example">Datum auswählen</label>
            <input placeholder="Select date" type="date" id="example" class="form-control"/>
            
            </div>
        
            </StyledInnerContainer>
        </Content>
        
    </StyledContainer>
    
    
)
