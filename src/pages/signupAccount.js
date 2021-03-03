import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

import MenuBar from "./components/signupBar";

function SignupAccount(props) {

    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "continue":
                history.push("/signup/payment");
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
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                            />
                        </td>
                    </tr>
                </Table>
            </Form>
        );
    }

    const NextButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => { btnHandler("continue") }}
                fullWidth
            >
                Next
            </Button>
        );
    }

    return (
        <Container>
            <MenuBar>Sign Up Page - Account Create</MenuBar>
            <Grid container>
                <Grid item xs={12}>
                    <AccountForm />
                </Grid>
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                    <NextButton />
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignupAccount;