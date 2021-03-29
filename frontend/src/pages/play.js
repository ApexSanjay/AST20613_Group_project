import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'

function Play(props) {

    const Container = styled.div`
        margin: auto;
        width: 100%;
        height: 97vh;
        color: white;
        padding: 0;
    `;

    return (
        <Container>
            <ReactPlayer 
            url='http://localhost:8000/encoded/example.mp4.m3u8' 
            width="100%"
            height="100%"
            controls='true'
            playing='true'
            />
        </Container>
    );
}

export default Play;