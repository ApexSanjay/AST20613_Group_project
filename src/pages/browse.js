import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
//Should be array
import moviePoster from "./img/soul_poster.jpg";
import { MovieCreationSharp } from '@material-ui/icons';
import MenuBar from "./components/menuBar";

export function Browse(props) {

    const MovieCard = () => {

        const Card = styled.div`
            width: 100%;
        `;

        const Movie = styled.img`
            height: 480px;
            border-radius: 10px;
            width: 100%;
            height: auto;
        `;
        return (
            <Card>
                <a href="movie">
                    <Movie 
                    src={moviePoster}></Movie>
                </a>
            </Card>
        );
    };

    const MovieCardRow = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
            </Grid>
        );
    }

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    return (
        <Container>
            {/* app bar */}
            <MenuBar />
            <Grid container spacing={0}>
                
                <Grid item xs={12}>
                    <h2>Movies</h2>
                </Grid>

                <Grid item xs={12}>
                    <h3>Top Rated</h3>
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Action</h3>
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Animation</h3>
                    <MovieCardRow />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Browse;