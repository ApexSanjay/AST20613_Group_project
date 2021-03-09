import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

import MenuBar from "./components/menuBarBeforeSignin";

import LoginModules from "./modules/LoginModules";

function Login(props) {

    var email, password;
    const [error, setError] = useState("");
    const history = useHistory();

    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const login = () => {
        // console.log(email,password);
        LoginModules.login(email, password).then(() => {
            history.push("/browse");
        }).catch((e) => {
            setError(e.code + ": " + e.message);
        });
    };

    // onChange handler
    const onEmailChange = (e) => {
        email = e.target.value;
    };

    const onPasswordChange = (e) => {
        password = e.target.value;
    };

    //btn handler
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "login":
                // history.push("/");
                login();
                break;

            default:
                break;
        }
    }

    const AccountForm = () => {

        const Form = styled.form`
            margin: auto;
            padding: 5%;
            text-align: center;
            width: 40%;
        `;

        const Table = styled.table`
            width: 100%;
        `;

        return (
            <Form>
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
                            />
                        </td>
                    </tr>
                </Table>
            </Form>
        );
    }

    const LoginButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => { btnHandler("login") }}
                fullWidth
            >
                Login
            </Button>
        );
    }

    return (
        <Container>
            <MenuBar>Login Page</MenuBar>
            <Grid container>
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
        </Container>
    );
}

export default Login;