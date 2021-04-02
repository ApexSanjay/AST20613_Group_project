import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from "./components/menuBar";
import Container from "./components/container";
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import MediaModule from './modules/MediaModule';

export function ManageMovies(props) {

    const history = useHistory();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const [movieDataState, setMovieDataState] = useState([]);

    const [loadMovieCount, setLoadMovieCount] = useState(0);


    var movieData = movieDataState;

    useEffect(() => {
        MediaModule.getAllMovies(loadMovieCount).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                movieData.push(doc.data());
            });
            setMovieDataState([...movieData]);
        });

    }, [loadMovieCount])

    const UploadMovieButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            history.push("/upload");
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                    fullWidth
                >
                    Upload a new movie
                </Button>
            </Container>

        );
    };

    const OpenButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            history.push("/movie/" + props.id);
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                >
                    Open
                </Button>
            </Container>

        );
    };

    const EditButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            history.push("/editMovie/" + props.id);
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                >
                    Edit
                </Button>
            </Container>

        );
    };

    const RemoveButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {

        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                >
                    Remove
                </Button>
            </Container>

        );
    };

    const showMovieRow = () => {

        console.log("showMovieRow", loadMovieCount);

        return movieDataState.map((data) => {

            console.log(data.id);

            return (
                <>
                    <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                            {data.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {data.title}
                        </TableCell>
                        <TableCell align="right">
                            <OpenButton id={data.id} /> 
                            <EditButton id={data.id} />
                            <RemoveButton id={data.id} />
                        </TableCell>
                    </TableRow>
                </>
            );
        })
    }


    const LoadMoreButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            var count = loadMovieCount + 10;
            setLoadMovieCount(count);
        }

        return (
            <center>
                <Container>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onclickHandler}
                    >
                        Load More
                </Button>
                </Container>
            </center>


        );
    };


    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <h2>Manage Movies</h2>
                </Grid>
                <Grid item xs={2}>
                    <UploadMovieButton />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Movies Name</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showMovieRow()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <LoadMoreButton />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ManageMovies;