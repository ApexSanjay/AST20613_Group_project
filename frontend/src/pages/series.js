import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";
import Container from "./components/container";

export function Series(props) {

    const [ids, setIds] = useState();
    const [movieCardInfoState, setMovieCardInfoState] = useState([]);

    const getRandomIds = (num) => {
        var ids = [];

        for (var i = 0; i < num; i++) {
            var id = parseInt(Math.random() * 1000);
            id %= 100;
            id++;

            ids.push(id);
        }

        return ids;
    }

    const SeriesRow = () =>{
        //Make row style
        return(
            <Grid>
                
            </Grid>
        );
    };

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