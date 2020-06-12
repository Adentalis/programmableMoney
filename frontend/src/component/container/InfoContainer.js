import React from 'react';
import { Container } from './Container';
import styled from 'styled-components';
require('./styletab.css');


const StyledContainer = styled(Container)`
`;



export const InfoContainer = () => (
    <StyledContainer>
        <h1 style={{color: '#E6E6FA',}}> Letzte Transaktion</h1>
        <p >
       
        <br></br> 
        <br></br> 
        <br></br> 
        <h1 style={{color: '#E6E6FA',}}>Name:</h1>  
        <br></br>
        <br></br> 
        <br></br> 
        <br></br> 
        <br></br> 
        <h1 style={{color: '#E6E6FA',}}>Betrag:</h1>  
        <br></br>
        <br></br> 
        <br></br> 
        <br></br> 
        <br></br> 
        <h1 style={{color: '#E6E6FA',}}>Datum:</h1>  
        </p>
      
        
            
    </StyledContainer>
)
