import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";

function Playlist(props) {

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