import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

import face from "./img/face.svg";

import MenuBar from "./components/settingMenuBar";
import SettingMenu from "./components/settingMenu";
import SettingTitle from "./components/settingTitle";
import SaveButton from "./components/settingSaveButton";

function SettingProfile(props) {
    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const NameField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Name
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            defaultValue="User123456"
                            fullWidth
                        />
                    </center>
                </Grid>
            </Grid>
        );
    };

    const IconField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Icon
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <img src={face} width="80%" alt="icon"></img> <br />
                        <Button variant="contained" color="Secondary">Click to upload a new image</Button>
                    </center>
                </Grid>
            </Grid>
        );
    }

    const ProfileSetting = () => {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <SettingTitle>Profile</SettingTitle>
                </Grid>
                <Grid item xs={12}>
                    <NameField />
                    <IconField />
                    <SaveButton />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={0} /></Grid>
                <Grid item xs={9}><ProfileSetting /></Grid>
            </Grid>
        </Container>

    );
}

export default SettingProfile;