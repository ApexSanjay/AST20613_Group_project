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
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
            width="100%"
            height="100%"
            />
        </Container>
    );
}

export default Play;