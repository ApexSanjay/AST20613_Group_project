import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import styled from 'styled-components';

import SettingMenu from "./components/settingMenu";
import MenuBar from "./components/settingMenuBar";
import SettingTitle from "./components/settingTitle";
import SaveButton from "./components/settingSaveButton";


function SettingPassword(props) {
    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const OldPasswordField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Old Password
                            </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="outlined-basic"
                            label="Old Password"
                            variant="outlined"
                            fullWidth
                            defaultValue=""
                            type="password"
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const NewPasswordField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        New Password
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            defaultValue=""
                            type="password"
                        />
                    </center>
                </Grid>

            </Grid>
        );
    }

    const ConfirmPasswordField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Confirm New Password
                            </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="outlined-basic"
                            label="Confirm New Password"
                            variant="outlined"
                            fullWidth
                            defaultValue=""
                            type="password"
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const PasswordSetting = () => {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <SettingTitle>Change Password</SettingTitle>
                </Grid>
                <Grid item xs={12}>
                    <OldPasswordField />
                    <NewPasswordField />
                    <ConfirmPasswordField />
                    <SaveButton />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={3} /></Grid>
                <Grid item xs={9}><PasswordSetting /></Grid>
            </Grid>
        </Container>
    );
}

export default SettingPassword;