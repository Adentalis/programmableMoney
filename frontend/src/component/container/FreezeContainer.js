import React  from 'react';
// import React ,{useState} from 'react';
// import Tabs from './Tabs';
import { Container, InnerContainer } from './Container';
import styled from 'styled-components';
import {} from '../../constants';
import {NAVIGATION_FREEZE_TEXT } from '../../constants';
//import 'react-datepicker/dist/react-datepicker.css'
// import DatePicker from 'react-datepicker';
require('./styletab.css');


const StyledContainer = styled(Container)`
    /* Special Style for  Container */
`;
const StyledInnerContainer = styled(InnerContainer)`
/* Special Style for inner Container */
`;
// const [startDate, setStartDate] = useState(new Date());


export const FreezeContainer = () => (
    
    <StyledContainer>
        <h1 style={{color: '#E6E6FA'}}>{NAVIGATION_FREEZE_TEXT}</h1>
        {/* <Tabs>
            <div label="Überweisung senden" >></div>
            <div label="Termin">After 'while, <em>Termin</em>! </div>
            <div label="Dauerauftrag ">Nothing to see here, this tab is <em>extinct</em>!</div>
        </Tabs> */}
        
        <StyledInnerContainer>
        
    {/* <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    /> */}
           </StyledInnerContainer>
        
    </StyledContainer>
    
)
