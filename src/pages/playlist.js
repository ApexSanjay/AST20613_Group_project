import React, { useState, useEffect } from 'react';
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
    const [playlist, setPlaylist] = useState();
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [movieListState, setMovieListState] = useState();
    var movieList = [];

    console.log(movieListState);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    useEffect(() => {   //init loading
        if (playlistID != null && !playlist) {
            BrowsingModules.getPlaylist(playlistID).then((doc) => {
                if (doc.exists) {
                    // console.log(doc.data());
                    setPlaylistTitle(doc.data().title);
                    setPlaylist(doc.data().movieID);
                } else {
                    //doc not exist
                    console.log("doc not exist");
                }
            });
        }

        //get movie title
        if (playlist) {
            // console.log(parseInt(playlist[1]));

            var formattedPlaylist = [];

            for(var i in playlist){
                formattedPlaylist.push(parseInt(playlist[i]))
            }

            MediaModule.getMovieInfos(formattedPlaylist).then((querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("empty");
                } else {
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        movieList.push(doc.data());
                        if(movieList.length === playlist.length){
                            setMovieListState(movieList);
                        }
                    });
                }
            }).catch((e) => {
                console.log(e.message);
            });
        }

    }, [playlist]);


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
        var res;

        if (movieListState) {
            res = movieListState.map((movie, i) => (
                <TableRow key={movie.title}>
                    <TableCell component="th" scope="row">
                        {movie.title}
                    </TableCell>
                    <TableCell align="right"><WatchButton /><RemoveButton /></TableCell>
                </TableRow>
            ));
        }


        return res;
    }

    const PlaylistTable = () => {




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