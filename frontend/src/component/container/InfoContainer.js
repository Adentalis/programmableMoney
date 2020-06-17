import React from 'react';
import { Container } from './Container';
import styled from 'styled-components';
import { INFOCONTAINER_LAST_TRANSACTION_TEXT} from '../../constants';
require('./styletab.css');


const StyledContainer = styled(Container)`
`;

const LastTransaction = styled.h1`
    color: #E6E6FA;
    top: 10%;
    position: sticky;
`;

const Amount = styled.h1`
    color: #E6E6FA;
    position: sticky;
    top: 50%;
    bottom: 50%;
`;

const Date = styled.h1`
    color: #E6E6FA;
    bottom: 10px;
    position: sticky;
`;

export const InfoContainer = () => (
    <StyledContainer>
        <LastTransaction>Letzte Transaktion</LastTransaction>
        <Amount>dsa</Amount>
        <Date>dsadsa</Date>
        
        {/*
        <p >
       
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
        */}
        
            
    </StyledContainer>
)
