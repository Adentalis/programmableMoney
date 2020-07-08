import React  from 'react';
import { Container, InnerContainer } from './Container';
import styled from 'styled-components';
import {} from '../../constants';
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
        <h1 style={{color: '#E6E6FA'}}>{NAVIGATION_FREEZE_TEXT}</h1>
        
        
        <div>
        <StyledInnerContainer>
      
        <div class="md-form md-outline input-with-post-icon datepicker">
            
 <label for="example">Datum auswählen</label>
        <input placeholder="Select date" type="date" id="example" class="form-control"/>
        
        </div>
        <div class="form-group" />
                    <label for="exampleInputEmail1">Betrag </label>
                    <input type="betrag" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Betrag eingeben" />
                    
                    
                    
                    
               
        </StyledInnerContainer>
        
        <p>
        
        </p>
        <p></p>
        <button  className="buttonstyling">bestätigen</button>
        </div>          
      
                    
        


           
        
    </StyledContainer>
    
    
)
