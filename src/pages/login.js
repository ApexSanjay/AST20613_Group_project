import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MenuBar from "./components/menuBarBeforeSignin";
import LoginModules from "./modules/LoginModules";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorSnackBar from "./components/errorSnackBar"

function Login(props) {

    var params = useParams();
    var urlError = params.error;
    console.log(urlError);

    var email, password;
    const [error, setError] = useState("");
    const history = useHistory();

    // const ErrorSnackBar = () => {
    //     const [open, setOpen] = React.useState(urlError != null ? true : false);

    //     const handleClose = (event, reason) => {
    //         if (reason === 'clickaway') {
    //             return;
    //         }
    //         setOpen(false);
    //     };

    //     return (
    //         <div>
    //             <Snackbar
    //                 anchorOrigin={{
    //                     vertical: 'bottom',
    //                     horizontal: 'left',
    //                 }}
    //                 open={open}
    //                 autoHideDuration={6000}
    //                 onClose={handleClose}
    //                 message="Please Login."
    //                 action={
    //                     <React.Fragment>
    //                         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
    //                             <CloseIcon fontSize="small" />
    //                         </IconButton>
    //                     </React.Fragment>
    //                 }
    //             />
    //         </div>
    //     );
    // }

    const Container = styled.div`
        margin: auto;
        width: 80%;
    `;

    // onChange handler
    const onEmailChange = (e) => {
        email = e.target.value;
    };

    const onPasswordChange = (e) => {
        password = e.target.value;
    };

    const AccountForm = () => {
        const Table = styled.table`
            margin: auto;
            padding: 5%;
            text-align: center;
            width: 40%;
        `;

        return (
            <Table>
                <tr>
                    <td>Email</td>
                    <td>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={onEmailChange}
                            fullWidth
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={onPasswordChange}
                            fullWidth
                            required
                        />
                    </td>
                </tr>
            </Table>
        );
    }

    const LoginButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
            >
                Login
            </Button>
        );
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        LoginModules.login(email, password).then(() => {
            history.push("/browse");
        }).catch((e) => {
            setError(e.code + ": " + e.message);
        });
    }

    return (
        <Container>
            <ErrorSnackBar show={urlError != null}>Please Login.</ErrorSnackBar>
            <MenuBar />
            <form onSubmit={onSubmitHandler}>
                <Grid container>
                    <Grid item xs={12}>
                        <center>
                            <h1>Login Page</h1>
                        </center>
                    </Grid>
                    <Grid item xs={12}>
                        <AccountForm />
                    </Grid>
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1}>
                        <LoginButton />
                    </Grid>
                    <Grid item xs={12}>
                        <center>
                            {error}
                        </center>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;