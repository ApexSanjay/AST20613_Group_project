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
import BrowsingModules from "./modules/BrowsingModules";
import Fuse from 'fuse.js';

export function Search(props) {

    const history = useHistory();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const params = useParams();
    const keywords = params.value;

    const [searchResult, setSearchResult] = useState([]);

    console.log(searchResult);

    useEffect(() => {

        BrowsingModules.getAllMovies().then((querySnapshot) => {

            var moviesData = [];

            querySnapshot.forEach((doc) => {
                moviesData.push(doc.data());
            });

            const options = {
                includeScore: true,
                keys: ['title', 'id']
            }

            const fuse = new Fuse(moviesData, options);

            setSearchResult(fuse.search(keywords));

        });
    }, [keywords]);

    const WatchButton = (props) => {

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
                    Go
                </Button>
            </Container>
        );
    }

    const showResultRows = () => {

        return searchResult.map((result) => {

            return (
                <TableRow key={result.item.id}>
                    <TableCell component="th" scope="row">
                        {result.item.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {result.item.title}
                    </TableCell>
                    <TableCell align="right">
                        <WatchButton id={result.item.id} />
                    </TableCell>
                </TableRow>
            );
        });
    }

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Search Result - {keywords}</h2>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell><b>Movie Title</b></TableCell>
                                    <TableCell align="right"><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {showResultRows()}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Search;