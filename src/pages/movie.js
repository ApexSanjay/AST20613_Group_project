import React, { useState } from 'react';
import {
    useHistory,
    useParams
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LinkIcon from '@material-ui/icons/Link';
import styled from 'styled-components';
import moviePoster from "./img/moviePoster/soul_poster.jpg";
import playbtn from "./img/playbtn.svg";
import ReactPlayer from 'react-player';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MediaModule from "./modules/MediaModule";
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';


function Movie(props) {

    const history = useHistory();
    var params = useParams();
    var movieID = params.id;     // id of url "/movie/{id}" 

    //For sharing link
    const [copiedLink] = React.useState(0);

    //get movie info
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [movies, setMovies] = useState({
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        movieLength: "",
        movieReleaseDate: "",
    });

    if (loadingMovies) {
        MediaModule.getMovieInfo(movieID).then((doc) => {
            if (doc.exists) {
                setMovies(doc.data());
                setLoadingMovies(false);
            } else {
                history.push("/browse");
            }
        });
    }


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
    };

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
                <Button onClick={() => navigator.clipboard.writeText('Should be url')}>
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

    const Review = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <h2>Review</h2>
                </Grid>
                <Grid item xs={1}>
                    <Avatar
                        alt=""
                        src=""
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Write Down Your Review"
                        variant="filled"
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={11}>

                </Grid>
                <Grid item xs={1}>
                    <Button>
                        <SendIcon />
                        Send
                    </Button>
                </Grid>


                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <Grid container>
                            <Grid item xs={1}>

                                <Avatar
                                    alt=""
                                    src=""
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <b>User 123456</b><br />
                                <small>{Date()}</small>
                            </Grid>
                            <Grid item xs={12}>
                                Very Good!!!!!!!!
                            </Grid>
                        </Grid>

                    </Paper>

                </Grid>

            </Grid>);
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
                    <Grid item xs={12}>
                        <Review />
                    </Grid>
                </Grid>
            </Body>


        </Container>
    );
}

export default Movie;