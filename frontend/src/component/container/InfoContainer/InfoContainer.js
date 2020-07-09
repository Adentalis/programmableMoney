import React from 'react';
import { Container, Header, Divider } from '../Container';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    color: #E6E6FA;
    position: relative;
    width: calc(100% - 200px);
    height: calc(100% - 200px);
    margin: 100px 100px 100px 100px;
`;


const Content = styled.div`
    position: relative;
    width: 100%;    
    height: calc(100% - 80px); 
    padding: 20px;
    font-size: x-large;
`;


const tableStyle = {
    width: "100%",
    height: "100%"
};

const thStyle = {
    width: "30%"
}

const Table = () => (
    <table style={tableStyle}>
        <tr>
            <th style={thStyle}>Datum</th>
            <td>XXXXX</td>
        </tr>
        <tr>
            <th tyle={thStyle}>Adresse</th>
            <td>YYYYY</td>
        </tr>
        <tr>
            <th tyle={thStyle}>Betrag</th>
            <td>ZZZZZ</td>
        </tr>
    </table> 
)

export const InfoContainer = () => (
    <StyledContainer>
        <Header>Letzte Transaktion</Header>
        <Divider />
        <Content>
            <Table />
        </Content>
    </StyledContainer>
)
