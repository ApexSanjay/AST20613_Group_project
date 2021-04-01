import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from "./components/menuBar";
import Container from "./components/container";

export function ManageAdmins(props) {

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

export default ManageAdmins;