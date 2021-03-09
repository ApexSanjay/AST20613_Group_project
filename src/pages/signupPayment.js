import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

import MenuBar from "./components/menuBarBeforeSignin";

function SignupPayment(props) {

    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const history = useHistory();

    //btn handler
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "continue":
                history.push("/browse");
                break;

            default:
                break;
        }
    }

    const CardBar = styled.div`
        border: 1px solid white;
        padding: 16px;
        margin: 3% auto 0px auto;
        width: 40%;
        text-align: center;
    `;

    const CardForm = () => {
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
                        <td>First Name</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Card Number</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="Card Number"
                                variant="outlined"
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Exploration Date</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="DDYY"
                                variant="outlined"
                                fullWidth
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Security Code</td>
                        <td>
                            <TextField
                                id="outlined-basic"
                                label="CVV"
                                variant="outlined"
                                type="password"
                                fullWidth
                            />
                        </td>
                    </tr>
                </Table>
            </Form>
        );
    };

    const NextButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => { btnHandler("continue") }}
                fullWidth
            >
                Finish
            </Button>
        );
    }

    return (
        <Container>
            <MenuBar></MenuBar>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Sign Up Page - Set up your Payment</h2>
                </Grid>
                <Grid item xs={12}>
                    <CardBar>
                        Credit card or Debit card
                    </CardBar>
                    <CardForm />
                </Grid>
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                    <NextButton />
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignupPayment;