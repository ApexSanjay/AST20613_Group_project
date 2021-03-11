import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";
import { useParams } from 'react-router-dom';
import BrowsingModule from "./modules/BrowsingModules"

function Playlist(props) {

    const params = useParams();
    const playlistID = params.id;

    BrowsingModule.getPlaylist(playlistID).then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
        }
    }).catch((e) => {
        
    });

    const Container = styled.div`
        margin: auto;
        width: 80%;
    `;


    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Playlist</h2>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Playlist;