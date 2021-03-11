import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";
import { useHistory } from 'react-router';

export function Upload(props) {

    const [file, setFile] = useState(null);
    const [input, setInput] = useState({
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        movieLength: "",
        movieReleaseDate: ""
    });
    const history = useHistory();

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    var data = input;

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();

    //title
    function getSteps() {
        return ['Select Movie File', 'Input Movie Data', 'Confirm Info'];
    }

    //body component of the step
    function getStepContent(stepIndex) {

        const SelectFile = () => {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Select Movie File</h2>
                        <input
                            type="file"
                            onChange={(e) => {
                                // file = e.target.files;
                                // setFile(e.target.files);
                                console.log(e.target.files);
                            }}
                            defaultValue={file}
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
                            />
                        </Grid>
                    </Grid>
                );
            };

            return (
                <form>
                    <h2>Input Movie Data</h2>
                    <TitleField />
                    <DescriptionField />
                    <DirectorField />
                    <CastField />
                    <TrailerURLField />
                    <IMDBReviewField />
                    <MovieLengthField />
                    <MovieReleaseDateField />
                </form>
            );
        };

        const Confirm = () => {

            function createRow(rowName, value) {
                return { rowName, value };
            }

            const rows = [
                createRow('Title', input.title),
                createRow('Description', input.description),
                createRow('Director', input.Director),
                createRow('Cast', input.cast),
                createRow('Trailer URL', input.trailerURL),
                createRow('IMDB Review', input.imdbReview),
                createRow('Movie Length', input.movieLength),
                createRow('Movie Release Date', input.movieReleaseDate),
            ];
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Confirm Info</h2>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.rowName}
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            );
        };

        switch (stepIndex) {
            case 0:
                return <SelectFile />;
            case 1:
                return <InputData />;
            case 2:
                return <Confirm />;
            default:
                return 'Unknown stepIndex';
        }
    }

    const Body = () => {
        const [activeStep, setActiveStep] = React.useState(0);
        const steps = getSteps();

        const handleNext = () => {  //next button
            setInput(data);
            console.log(input);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleUpload = () => {
            // setActiveStep(0);
            history.push("/");
        };

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleUpload}>upload</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                    </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <h1>Upload Movie</h1>
                </Grid>
                <Grid item xs={12}>
                    <Body />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Upload;