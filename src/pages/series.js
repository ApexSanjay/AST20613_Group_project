import React from 'react';
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import MenuBar from "./components/menuBar";

export function Series(props) {

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    return (
        <Container>
            {/* app bar */}
            <MenuBar />
            <Grid container spacing={0}>
                {/* do your things here */}
                
                {/* (xs sum == 12) === a row */}
                <Grid item xs={12}> 
                </Grid>

            </Grid>
        </Container>
    );
}

export default Series;