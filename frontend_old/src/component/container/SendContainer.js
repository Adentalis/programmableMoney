import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import { Container, InnerContainer, Header, Divider, Content } from './Container';
import { NAVIGATION_SEND_TEXT } from '../../constants'

const StyledContainer = styled(Container)`
    /* Special Style for inner Container */
`;

const StyledInnerContainer = styled(InnerContainer)`
    /* Special Style for inner Container */
`;
export const SendContainer = () => (
    <StyledContainer>
        <Header>{NAVIGATION_SEND_TEXT}</Header>
        <Divider />
        <Content>
            <Tabs>
                <div label="Überweisung senden"></div>
                <div label="Termin">
                    <StyledInnerContainer>
                        <div class="md-form md-outline input-with-post-icon datepicker">
                            <label for="example">Datum auswählen</label>
                            <input placeholder="Select date" type="date" id="example" class="form-control" />
                        </div>
                        <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                            <label for="set-dark-theme">Wähle eine Uhrzeit</label>
                            <input type="text" id="set-dark-theme" class="form-control" placeholder="00:00"/>
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
                        <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                            <label for="set-dark-theme">Wähle eine Uhrzeit</label>
                            <input type="text" id="set-dark-theme" class="form-control" placeholder="00:00"/>
                            <i class="fas fa-envelope input-prefix"></i>
                        </div>
                    </StyledInnerContainer>
                    <button type="button" class="btn btn-secondary btn-lg btn-block">bestätigen</button>
                </div>
            </Tabs>
        </Content>
    </StyledContainer>
)
