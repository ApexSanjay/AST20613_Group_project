import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SettingMenu from "./components/settingMenu";
import MenuBar from "./components/settingMenuBar";
import SettingTitle from "./components/settingTitle";
import SaveButton from "./components/settingSaveButton";
import Container from "./components/container";

import LoginModules from "./modules/LoginModules";
import SnackBar from "./components/snackBar"

function SettingPassword(props) {

    var oldPwd = "", newPwd = "", confirmPwd = "";

    const [message, setMessage] = useState();

    const onchangeHandler = (name, value) => {
        switch (name) {
            case "oldPwd":
                oldPwd = value;
                break;
            case "newPwd":
                newPwd = value;
                break;
            case "confirmPwd":
                confirmPwd = value;
                break;

            default:
                break;
        }
    }

    const onClickHandler = (btnName) => {
        switch (btnName) {
            case "save":
                reset(oldPwd, newPwd, confirmPwd);
                break;
            default:
                break;
        }
    }

    const reset = (oldPwd, newPwd, confirmPwd) => {

        const isConfirmedPassword = (pwd1, pwd2) => {
            return (pwd1 === pwd2);
        }

        LoginModules.vertifyPassword(oldPwd).then(() => {
            console.log("checkOldPassword success")
            if (isConfirmedPassword(newPwd, confirmPwd)) {
                console.log("confirm pwd success");
                LoginModules.updatePassword(newPwd).then(()=>{
                    setMessage(<SnackBar show={true}>Password update success.</SnackBar>);
                }
                );
            } else {
                setMessage(<SnackBar show={true}>New Password Invalid. Please try agian.</SnackBar>);
            }
        }).catch((e) => {
            console.log(e.message);
            setMessage(<SnackBar show={true}>{e.message}</SnackBar>);
        });
    }

    const OldPasswordField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Old Password
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        label="Old Password"
                        variant="outlined"
                        defaultValue=""
                        type="password"
                        onChange={(e) => { onchangeHandler("oldPwd", e.target.value) }}
                        fullWidth
                    />
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
                    <TextField
                        label="New Password"
                        variant="outlined"
                        defaultValue=""
                        type="password"
                        onChange={(e) => { onchangeHandler("newPwd", e.target.value) }}
                        fullWidth
                    />
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
                    <TextField
                        label="Confirm New Password"
                        variant="outlined"
                        defaultValue=""
                        type="password"
                        onChange={(e) => { onchangeHandler("confirmPwd", e.target.value) }}
                        fullWidth
                    />
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
                    <SaveButton onClick={() => { onClickHandler("save") }} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <MenuBar />
            {message ? message : <></>}
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={3} /></Grid>
                <Grid item xs={9}><PasswordSetting /></Grid>
            </Grid>
        </Container>
    );
}

export default SettingPassword;