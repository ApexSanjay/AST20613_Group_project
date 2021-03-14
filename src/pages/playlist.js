import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MenuBar from "./components/menuBar";
import { useParams } from 'react-router-dom';
import BrowsingModules from "./modules/BrowsingModules"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SnackBar from "./components/snackBar";
import Container from "./components/container";
import MediaModule from "./modules/MediaModule";

function Playlist(props) {

    const params = useParams();
    const playlistID = params.id;
    const [loadingPlaylist, setLoadingPlaylist] = useState(true);
    const [playlist, setPlaylist] = useState();
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [movieListState, setMovieListState] = useState([]);
    const [loadingMovieInfo, setLoadingMovieInfo] = useState(true);

    var movieList = movieListState;

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    if (loadingPlaylist) {
        if (playlistID != null) {
            BrowsingModules.getPlaylist(playlistID).then((doc) => {
                if (doc.exists) {
                    // console.log(doc.data());
                    setPlaylistTitle(doc.data().title);
                    setPlaylist(doc.data().movieID);
                    setLoadingPlaylist(false);
                } else {
                    //doc not exist
                    console.log(doc.exists);
                }
            });
        } else {
            console.log("??");
        }
    }

    if (loadingPlaylist === false) {
        //get movie title
        for (var i in playlist) {
            // console.log(playlist[i]);
            MediaModule.getMovieInfo(playlist[i]).then((doc) => {
                if (doc.exists) {
                    // console.log(doc.data().id);
                    var movieAlreadyExist = false;
                    for (var j in movieList) {
                        if (movieList[j].id === doc.data().id) {
                            movieAlreadyExist = true;
                        }
                    }
                    if (!movieAlreadyExist) {
                        movieList.push(
                            {
                                id: doc.data().id,
                                title: doc.data().title,
                            }
                        );

                        setMovieListState(movieList);
                        setLoadingMovieInfo(false);
                    }
                }
            });
        }
    }

    const PlaylistTable = () => {

        const WatchButton = () => {

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
                        Watch
                    </Button>
                </Container>

            );
        };
        const RemoveButton = () => {

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


        const showMovieInfo = () => {

            // var res = (<></>);
            var res;

            // if (!loadingMovieInfo) {
            res = movieList.map((movie, i) => (
                    <TableRow key={movie.title}>
                        <TableCell component="th" scope="row">
                            {movie.title}
                        </TableCell>
                        <TableCell align="right"><WatchButton /><RemoveButton /></TableCell>
                    </TableRow>
                ));
            // }


            return res;
        }

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Movie Title</b></TableCell>
                            <TableCell align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showMovieInfo()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


    return (
        <Container>
            <SnackBar show={() => { if (playlistID) { return false; } else { return true; } }}>No Playlist ID in URL.</SnackBar>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>{playlistTitle}</h2>
                </Grid>
                <Grid item xs={12}>
                    <PlaylistTable />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Playlist;