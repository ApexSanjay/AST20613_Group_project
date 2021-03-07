import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styled from 'styled-components';

//Should be array
import moviePoster from "./img/soul_poster.jpg";

export function Browse(props) {

    const MenuBar = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        //btn handler
        const history = useHistory();
        const btnHandler = (btnName) => {
            switch (btnName) {
                case "movie":
                    history.push("/browse");
                    break;
                case "series":
                    history.push("/series");
                    break;
                case "myLib":
                    history.push("/lib");
                    break;
                case "manage":
                    history.push("/setting");
                    break;
                case "logout":
                    history.push("/signup");
                    break;
                default:
                    break;
            }
        };

        return (
            <div>
                <Grid container>
                    <Grid item xs={11}>
                        {/* <img src="#" alt="RedStream"></img> */}
                        <b>RedStream</b>
                        <Button onClick={() => { btnHandler("movie") }}>Movie</Button>
                        <Button onClick={() => { btnHandler("series") }}>Series</Button>
                        <Button onClick={() => { btnHandler("myLib") }}>My Library</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><SettingsIcon /></Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { btnHandler("manage") }}>Manage</MenuItem>
                            <MenuItem onClick={() => { btnHandler("logout") }}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
                <hr></hr>
            </div>

        );
    }

    const MovieCard = () => {

        const Card = styled.div`
            width: 100%;
        `;

        const Movie = styled.img`
            height: 480px;
            border-radius: 10px;
            width: 100%;
            height: auto;
        `;
        return (
            <Card>

                <a href="movie">
                    <Movie src={moviePoster}></Movie>
                </a>
            </Card>
        );
    };

    const MovieCardRow = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MovieCard />
                </Grid>
            </Grid>
        );
    }

    const Container = styled.div`
        width: 80%;
        margin: auto;
    `;

    return (
        <Container>
            {/* app bar */}
            <MenuBar />
            <Grid container spacing={0}>
                
                <Grid item xs={12}>
                    <h2>Movies</h2>
                </Grid>

                <Grid item xs={12}>
                    <h3>Top Rated</h3>
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Action</h3>
                    <MovieCardRow />
                </Grid>

                <Grid item xs={12}>
                    <h3>Animation</h3>
                    <MovieCardRow />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Browse;