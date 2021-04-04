import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import MediaModule from './modules/MediaModule';
import LoginModules from './modules/LoginModules';

function Play(props) {

    const params = useParams();
    const movieID = params.id;
    // console.log(movieID);

    // const [userPlan, setUserPlan] = useState("");
    const [movieURL, setMovieURL] = useState(MediaModule.getMovieStream(movieID));

    useEffect(()=>{
        LoginModules.getUserPlan().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().plan);
                setMovieURL(MediaModule.getMovieStream(movieID, doc.data().plan))
            });
        });
    },[]);

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
                url={movieURL}
                width="100%"
                height="100%"
                controls='true'
                playing='true'
            />
        </Container>
    );
}

export default Play;