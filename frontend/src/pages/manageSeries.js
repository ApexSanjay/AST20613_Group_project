import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from "./components/menuBar";
import Container from "./components/container";
import { useHistory, useParams } from 'react-router';
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
import BrowsingModules from './modules/BrowsingModules';

export function ManageSeries(props) {

    const history = useHistory();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const [seriesDataState, setSeriesDataState] = useState([]);

    const params = useParams();
    const searchValue = params.search;

    useEffect(() => {
        BrowsingModules.getAllSeries().then((allSeries)=>{
            setSeriesDataState(allSeries);
        });
    }, [])

    const UploadSeriesButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            history.push("/upload/series");
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                    fullWidth
                >
                    Upload a new series
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
            history.push("/series/" + props.id);
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
            MediaModule.removeSeriesInfo(props.id).then(()=>{
                window.location.reload();
            });
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

        return seriesDataState.map((data) => {

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

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h2>Manage Series{searchValue ? "- Searching " + searchValue : ""}</h2>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="flex-end">
                        <UploadSeriesButton />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell><b>Series Name</b></TableCell>
                                    <TableCell align="right"><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showMovieRow()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ManageSeries;