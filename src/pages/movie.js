import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LinkIcon from '@material-ui/icons/Link';

import styled from 'styled-components';

import moviePoster from "./img/soul_poster.jpg";
import playbtn from "./img/playbtn.svg";

import ReactPlayer from 'react-player'

//Movie database
import moviesN from './movieData.json';

function Movie(props) {

    const movies = moviesN[0];
    const MenuBar = () => {

        var history = useHistory();

        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={history.goBack}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    const Container = styled.div`
        margin: auto;
        padding: 0;
        width: 100%;
    `;

    const BackGround = styled.div`
        background-image: url(${moviePoster});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 105%;
        position: fixed;
        top: 0;
        left: 0;
    `;

    const Blur = styled.div`
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        height: 100vh;
        width: 100%;
    `;

    const Body = styled.div`
        backface-visibility: hidden;
        position: relative;
        top: 5%;
        margin: auto;
        width: 80%;
        padding: 10px;
    `;

    const Director = () => {
        return (
            <div>
                <h3>Director</h3>
                {movies.Director}
            </div>
        );
    }

    const Cast = () => {
        return (
            <div>
                <h3>Cast</h3>
                {movies.cast}
            </div>
        );
    }

    const Description = () => {
        return (
            <div>
                <h3>Movie Description</h3>
                {movies.description}
            </div>
        );
    }

    const AddToLibrary = () => {
        return (
            <div>
                <Button>
                    <LibraryAddIcon fontSize="small" /> Add to Library
                </Button>
            </div>
        );
    }


    const ShareLink = () => {
        return (
            <div>
                <Button onClick=''>
                    <LinkIcon fontSize="small" /> Share Link
                </Button>
            </div>
        );
    }

    const PlayButton = () => {
        var history = useHistory();
        const play = () => {
            history.push("/play");
        }

        return (
            <p>
                <center>
                    <Button fullWidth onClick={play}>
                        <img src={playbtn} width="60%" alt="Play"></img>
                    </Button>
                </center>
            </p>
        );
    }

    return (
        <Container>
            <BackGround>
                <Blur />
            </BackGround>
            <Body>
                <MenuBar />
                {<h1>{movies.title}</h1>}
                <Grid container>
                    <Grid item xs={3}>
                        <AddToLibrary />
                        <ShareLink />
                        <PlayButton />
                        <p>
                            {movies.movieLength} | {movies.movieReleaseDate} | IMDB: {movies.imdbReview}
                        </p>
                    </Grid>
                    <Grid item xs={9}>
                        <p>
                            <center>
                                <ReactPlayer url={movies.trailerURL} width="100%" />
                            </center>
                        </p>
                    </Grid>
                    <Grid item xs={3}>
                        <Director></Director>
                        <Cast>

                        </Cast>
                    </Grid>
                    <Grid item xs={9}>
                        <Description>
                        </Description>
                    </Grid>
                </Grid>
            </Body>


        </Container>
    );
}

export default Movie;