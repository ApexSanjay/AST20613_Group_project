import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';

function Play(props) {

    const params = useParams();
    const movieID = params.id;
    console.log(movieID);

    const Container = styled.div`
        margin: auto;
        width: 100%;
        height: 97vh;
        color: white;
        padding: 0;
    `;

    const movieURL = "http://localhost:4000/play/" + movieID + "/" + movieID + ".m3u8";

    return (
        <Container>
            <ReactPlayer 
            url={movieURL}
            width="100%"
            height="100%"
            controls='true'
            playing='true'
            />
        </Container>
    );
}

// http://localhost:8000/encoded/example.mp4.m3u8

export default Play;