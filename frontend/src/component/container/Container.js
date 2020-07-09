import styled from 'styled-components';

export const Container = styled.div`
    background-color: #4B0082;
    border-radius: 2.5px;
    width: calc(100% - 50px);
    min-width: 380px;
    height: calc(100% - 50px);
    min-height: 280px;
    padding: 30px;
    margin: 25px 25px 25px 25px;
    position: absolute;


    -webkit-box-shadow: 0px 0px 35px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 35px -10px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 35px -10px rgba(0,0,0,0.75);
`;

export const Header = styled.h1`
    color: #E6E6FA;

`;

export const Divider = styled.hr`
    border-top: 3px solid #bbb;
`;

export const Content = styled.div`
    position: relative;
    width: 100%;    
    height: calc(100% - 80px); 
    padding: 20px;
    font-size: x-large;
`;

export const InnerContainer= styled.div`
    background-color: #9575cd ;
    border-radius: 2.5px;
    width: 100%;
    height: 80%;
    padding: 5%;
    margin: auto;
    opacity: 0.2; 
    `;

export const styleFontText= styled.div`
    background-color: white ;
    
`;