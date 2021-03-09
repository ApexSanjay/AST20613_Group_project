import React from 'react';

import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import face from "./img/face.svg";

import MenuBar from "./components/menuBar";

function Profile(props) {

    const Container = styled.div`
        margin: auto;
        width: 80%;
    `;

    const Icon = () => {

        const Pic = styled.img`
            width: 100%;
        `;

        return (
            <Pic src={face} />
        );
    }

    const Name = () => {
        return (
            <center>
                <h1>
                    User123456
                </h1>
            </center>
        );
    }

    const Playlist = () => {

        const Link = styled.a`
            color: white;
        `;

        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <p>
                        <center>
                            <h2>
                                Playlist
                            </h2>
                        </center>
                    </p>
                </Grid>
                <Grid item xs={9}>
                    {/* user playlist goes here */}
                    <p>
                        <Link href="#">playlist demo</Link>
                    </p>
                    <p>
                        <Link href="#">playlist demo</Link>
                    </p>
                    <p>
                        <Link href="#">playlist demo</Link>
                    </p>
                    <p>
                        <Link href="#">playlist demo</Link>
                    </p>
                </Grid>
            </Grid>
        );
    };

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Profile</h2>
                </Grid>
                <Grid item xs={3}>
                    <Icon />
                    <Name />
                </Grid>
                <Grid item xs={9}>
                    <Playlist />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;