import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import MediaModule from './modules/MediaModule';
import LoginModules from './modules/LoginModules';

function PlaySeries(props) {

    const account = new LoginModules.Account();
    const seriesInfo = new MediaModule.SeriesInfo();

    const params = useParams();
    const seriesID = params.id;
    const ep = params.ep;

    const [seriesURL, setSeriesURL] = useState(seriesInfo.getSeriesStream(seriesID, ep));

    useEffect(() => {
        console.log(seriesURL);
        account.getUserPlan().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().plan);
                setSeriesURL(seriesInfo.getSeriesStream(seriesID, ep, doc.data().plan))
            });
        });
    }, []);

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
                url={seriesURL}
                width="100%"
                height="100%"
                controls='true'
                playing='true'
            />
        </Container>
    );
}

export default PlaySeries;