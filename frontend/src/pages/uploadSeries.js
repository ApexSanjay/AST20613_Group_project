import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuBar from "./components/menuBar";
import { useHistory } from 'react-router';
import Container from "./components/container";
import MediaModule from "./modules/MediaModule";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

export function UploadSeries(props) {

    var movieFile = null;
    var posterFile = null;
    const [newID, setNewID] = useState();
    // console.log(newID);
    const [uploading, setUploading] = useState(false);

    const [fileNum, setFileNum] = useState(1);
    console.log(fileNum);

    const history = useHistory();

    var data = {
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        movieLength: "",
        movieReleaseDate: ""
    }

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        MediaModule.getNewSeriesID().then((id)=>{
            // console.log(id);
            setNewID(id);
        });
    }, []);

    const SelectFile = () => {

        const onChangeHandler = (value) => {

        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <input
                        name="movie"
                        type="file"
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            movieFile = e.target.files[0];
                        }}
                        defaultValue={movieFile}
                        required
                    />

                </Grid>
                <Grid item xs={6}>
                <TextField
                        label="Title"
                        variant="outlined"
                        onChange={(e)=>{onChangeHandler(e.target.value)}}
                        defaultValue={data.description}
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
        );
    };

    const AddMoreFileButton = () => {

        const onClickHandler = () => {
            console.log("onClickHandler");
            setFileNum(fileNum + 1);
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { onClickHandler() }}
                    >
                        Add More Files
            </Button>
                </Grid>
            </Grid>

        );
    }

    const displayFileField = () => {
        console.log("displayFileField");
        var temp = [];
        for (var i = 0; i < fileNum; i++) {
            temp.push("something");
        }

        return temp.map((item, i) => {
            console.log("map");
            return (<SelectFile />);
        });
    }

    const SelectPoster = () => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h2>Select Poster</h2>
                    <input
                        name="movie"
                        type="file"
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            posterFile = e.target.files[0];
                        }}
                        defaultValue={posterFile}
                        required
                    />
                </Grid>
            </Grid>
        );
    };

    const InputData = () => {

        //onchangehandler
        const onchangeHandler = (field, value) => {
            switch (field) {
                case "title":
                    data.title = value;
                    break;
                case "description":
                    data.description = value;
                    break;
                case "Director":
                    data.Director = value;
                    break;
                case "cast":
                    data.cast = value;
                    break;
                case "trailerURL":
                    data.trailerURL = value;
                    break;
                case "imdbReview":
                    data.imdbReview = value;
                    break;
                case "movieLength":
                    data.movieLength = value;
                    break;
                case "movieReleaseDate":
                    data.movieReleaseDate = value;
                    break;

                default:
                    break;
            }
        }

        const TitleField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Title
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("title", e.target.value) }}
                            defaultValue={data.title}
                            fullWidth
                            required
                        />

                    </Grid>
                </Grid>
            );
        };
        const DescriptionField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Description
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("description", e.target.value) }}
                            defaultValue={data.description}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const DirectorField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Director
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Director"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("Director", e.target.value) }}
                            defaultValue={data.Director}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const CastField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Cast
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Cast"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("cast", e.target.value) }}
                            defaultValue={data.cast}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const TrailerURLField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Trailer URL
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Trailer URL"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("trailerURL", e.target.value) }}
                            defaultValue={data.trailerURL}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const IMDBReviewField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        IMDB Review
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="IMDB Review"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("imdbReview", e.target.value) }}
                            defaultValue={data.imdbReview}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const MovieLengthField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Movie Length
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Movie Length"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("movieLength", e.target.value) }}
                            defaultValue={data.movieLength}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const MovieReleaseDateField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Movie Release Date
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Movie Release Date"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("movieReleaseDate", e.target.value) }}
                            defaultValue={data.movieReleaseDate}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };

        return (
            <div>
                <h2>Input Series Data</h2>
                <TitleField />
                <DescriptionField />
                <DirectorField />
                <CastField />
                <TrailerURLField />
                <IMDBReviewField />
                <MovieLengthField />
                <MovieReleaseDateField />
            </div>
        );
    };

    const SubmitButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Submit
            </Button>
        );
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log("submit");

        setUploading(true);

        //upload movie
        MediaModule.uploadMovie(newID, movieFile).then(() => {
            console.log("movie upload success");

            //upload poster
            MediaModule.uploadPoster(newID, posterFile).then(() => {

                console.log("poster upload success");

                //upload movie data
                var movieData = {
                    ...data,
                    id: newID
                }
                // console.log(movieData);

                MediaModule.createMovieInfo(newID.toString(), movieData).then(() => {
                    console.log("movie info upload success");
                    setUploading(false);
                    history.push("/movie/" + newID);

                }).catch((e) => {
                    console.log(e.message);
                    setUploading(false);
                });

            }).catch((e) => {
                console.log(e.message);
                setUploading(false);
            });

        }).catch((e) => {
            console.log(e.message);
            setUploading(false);
        });
    }

    return (
        <Container>
            <MenuBar />
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>Upload Movie</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Select File</h2>
                        {displayFileField()}
                        <AddMoreFileButton />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectPoster />
                    </Grid>
                    <Grid item xs={12}>
                        <InputData />
                    </Grid>
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1}>
                        <SubmitButton />
                    </Grid>

                </Grid>
            </form>
            <Backdrop className={classes.backdrop} open={uploading}>
                <CircularProgress color="inherit" />
                Uploading... <br />
                This can takes several minutes.<br />
                Please do not close this page.<br />
            </Backdrop>
        </Container>
    );
}

export default UploadSeries;