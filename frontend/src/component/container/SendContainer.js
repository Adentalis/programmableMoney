import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import { Container, InnerContainer } from './Container';
import { NAVIGATION_SEND_TEXT } from '../../constants'
require('./styletab.css');

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

const StyledInnerContainer = styled(InnerContainer)`
/* Special Style for inner Container */
`;
export const SendContainer = () => (
    <StyledContainer>
        <h1 style={{ color: '#E6E6FA', }}>{NAVIGATION_SEND_TEXT}</h1>
        <Tabs>
            <div label="Überweisung senden"></div>
            <div label="Termin">
                <StyledInnerContainer>
                    <div class="md-form md-outline input-with-post-icon datepicker">
                        <label for="example">Datum auswählen</label>
                        <input placeholder="Select date" type="date" id="example" class="form-control" />
                    </div>
                    <p></p>
                    <p></p>
                    <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                        <label for="set-dark-theme">Wähle eine Uhrzeit</label>
                        <input type="text" id="set-dark-theme" class="form-control" placeholder="00:00" />
                        <i class="fas fa-envelope  input-prefix"></i>
                    </div>
                </StyledInnerContainer>
                <button type="button" class="btn btn-secondary btn-lg btn-block">bestätigen</button>
            </div>
            <div label="Dauerauftrag ">
                <StyledInnerContainer>
                    <div class="md-form md-outline input-with-post-icon datepicker">
                        <label for="example">Datum auswählen</label>
                        <input placeholder="Select date" type="date" id="example" class="form-control" />
                    </div>
                    <p></p>
                    <p></p>
                    <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                        <label for="set-dark-theme">Wähle eine Uhrzeit</label>
                        <input type="text" id="set-dark-theme" class="form-control" placeholder="00:00" />
                        <i class="fas fa-envelope  input-prefix"></i>
                    </div>
                </StyledInnerContainer>
                <button type="button" class="btn btn-secondary btn-lg btn-block">bestätigen</button>
            </div>
        </Tabs>
    </StyledContainer>
)
