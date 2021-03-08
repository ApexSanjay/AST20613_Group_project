import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import ReactPlayer from 'react-player'

import MenuBar from "./components/signupBar";

function Play(props) {

    const Container = styled.div`
        margin: auto;
        width: 100%;
        height: 97vh;
        color: white;
        padding: 0;
    `;

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "continue":
                history.push("/signup/payment");
                break;
            default:
                break;
        }
    }


    return (
        <Container>
            <ReactPlayer 
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            width="100%"
            height="100%"
            />
        </Container>
    );
}

export default Play;