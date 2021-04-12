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

    const movieInfo = new MediaModule.MovieInfo();
    const seriesInfo = new MediaModule.SeriesInfo();

    var posterFile = null;
    const [newID, setNewID] = useState();
    const [uploading, setUploading] = useState(false);

    const [seasonNum, setSeasonNum] = useState(0);
    const [seasons, setSeasons] = useState([]);

    const history = useHistory();

    var data = {
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        showLength: "",
        showReleaseDate: ""
    }

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        seriesInfo.getNewSeriesID().then((id) => {
            setNewID(id);
        });
    }, []);

    const AddSeasonButton = () => {

        var num;

        const onClickHandler = () => {
            if (num) {
                setSeasonNum(seasonNum + 1);
                seasons.push(num)
                console.log(seasons);
            }
        }

        const onChangeHandler = (value) => {
            num = value;

        }

        return (
            <div>
                <TextField
                    label="Season"
                    type="number"
                    defaultValue={num}
                    onChange={(e) => { onChangeHandler(e.target.value) }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { onClickHandler() }}
                >
                    Add Season
            </Button>
            </div>
        );
    }

    const SeasonField = (props) => {

        var seasonNum = parseInt(props.season);

        var contents = {
            season: 1,

        };

        const [fileNum, setFileNum] = useState(1);

        const updateContents = (contentID, title = null, files = null) => {
            console.log("seasonNum", seasonNum);

            if (seasonNum === 1) {
                if (!data.seasonOne) {
                    data.seasonOne = [];
                }
                var id = seasonNum.toString() + contentID.toString();
                data.seasonOne[contentID - 1] = { id: id, title: title };
            }
            if (seasonNum === 2) {
                if (!data.seasonTwo) {
                    data.seasonTwo = [];
                }
                data.seasonTwo[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 3) {
                if (!data.seasonThree) {
                    data.seasonThree = [];
                }
                data.seasonThree[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 4) {
                if (!data.seasonFour) {
                    data.seasonFour = [];
                }
                data.seasonFour[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 5) {
                if (!data.seasonFive) {
                    data.seasonFive = [];
                }
                data.seasonFive[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 6) {
                if (!data.seasonSix) {
                    data.seasonSix = [];
                }
                data.seasonSix[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 7) {
                if (!data.seasonSeven) {
                    data.seasonSeven = [];
                }
                data.seasonSeven[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 8) {
                if (!data.seasonEight) {
                    data.seasonEight = [];
                }
                data.seasonEight[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 9) {
                if (!data.seasonNine) {
                    data.seasonNine = [];
                }
                data.seasonNine[contentID - 1] = { contentID, title };
            }
            if (seasonNum === 10) {
                if (!data.seasonTen) {
                    data.seasonTen = [];
                }
                data.seasonTen[contentID - 1] = { contentID, title };
            }
            // if (contentID !== null) {
            //     if (title !== null) {

            //     }
            //     if (files !== null) {

            //     }
            // }
            console.log(data);
        }

        const SeasonNumberField = (props) => {

            return (
                <h3>Season {props.season}</h3>
            );
        }

        const SelectFile = (props) => {

            var file, title, id = props.id + 1;

            const onChangeHandler = (field, value) => {
                // file = value;
                // console.log(file);
                switch (field) {
                    case "file":
                        file = value;
                        break;
                    case "title":
                        title = value;
                        break;
                    default:
                        break;
                }
                // console.log(file, title);
                // contents[id - 1] = { season, id, title };
                updateContents(id, title, file);
            }

            return (
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <input
                            name="movie"
                            type="file"
                            onChange={(e) => {
                                // console.log(e.target.files[0]);
                                // movieFile = e.target.files[0];
                                onChangeHandler("file", e.target.files[0]);
                            }}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            onChange={(e) => { onChangeHandler("title", e.target.value) }}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
            );
        };

        const AddMoreFileButton = () => {

            const onClickHandler = () => {
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
            var temp = [];
            for (var i = 0; i < fileNum; i++) {
                temp.push("something");
            }

            return temp.map((item, i) => {
                return (<SelectFile id={i} />);
            });
        }

        return (
            <tr>
                <td><SeasonNumberField season={seasonNum} /></td>
                <td>
                    {displayFileField()}
                    <AddMoreFileButton />
                </td>
            </tr>
        );
    }

    const displaySeasonField = () => {

        return seasons.map((item, i) => {
            return (
                <SeasonField season={item} />
            );
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
                case "showLength":
                    data.showLength = value;
                    break;
                case "showReleaseDate":
                    data.showReleaseDate = value;
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
        const ShowLengthField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Show Length
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Show Length"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("showLength", e.target.value) }}
                            defaultValue={data.movieLength}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            );
        };
        const ShowReleaseDateField = () => {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        Show Release Date
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Show Release Date"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("showReleaseDate", e.target.value) }}
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
                <ShowLengthField />
                <ShowReleaseDateField />
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

        setUploading(true);
        console.log(data, newID);
        data.id = newID;
        seriesInfo.createSeriesInfo(newID.toString(), data).then((docRef) => {
            console.log(docRef);
            console.log("uploaded info");
            seriesInfo.uploadSeriesPoster(newID.toString(), posterFile).then(() => {
                console.log("uploaded poster");
                history.push("/series/" + newID);
            });
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
                        <table border="1" width="100%">
                            <tr>
                                <td><h4><center>Seasons</center></h4></td>
                                <td><h4><center>Files</center></h4></td>
                            </tr>
                            {displaySeasonField()}
                            {/* <tr>
                                <td><SeasonNumberField /></td>
                                <td>
                                    {displayFileField()}
                                    <AddMoreFileButton />
                                </td>
                            </tr> */}
                            <tr>
                                <td colSpan="2">
                                    <center>
                                        <AddSeasonButton />
                                    </center>
                                </td>
                            </tr>
                        </table>
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