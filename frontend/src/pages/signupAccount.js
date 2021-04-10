import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MenuBar from "./components/menuBarBeforeSignin";
import LoginModules from "./modules/LoginModules";
import Container from "./components/container";

function SignupAccount(props) {

    const account = new LoginModules.Account();
    const cardInfo = new LoginModules.CardInfo();

    const history = useHistory();

    const params = useParams();
    const planSelected = params.plan;

    useEffect(() => {
        if (planSelected) {
            console.log(planSelected);
        } else {
            history.push("/signup/plan/error");
        }
    }, []);


    var name = "", email = "", password = "";
    const [error, setError] = useState("");

    //onchange handler
    const onChangeHandler = (field, value) => {
        switch (field) {
            case "name":
                name = value;
                break;
            case "email":
                email = value;
                break;
            case "password":
                password = value;
                break;

            default:
                break;
        }
        // console.log(name, email, password);
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
                    <td>Name</td>
                    <td>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            onChange={(e) => { onChangeHandler("name", e.target.value) }}
                            fullWidth
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            onChange={(e) => { onChangeHandler("email", e.target.value) }}
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
                            onChange={(e) => { onChangeHandler("password", e.target.value) }}
                            fullWidth
                            required
                        />
                    </td>
                </tr>
            </Table>
        );
    }

    const NextButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
            >
                Next
            </Button>
        );
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        account.register(email, password, planSelected).then(() => {
            account.updateName(name).then(() => {
                history.push("/signup/payment");
            });
        }).catch((e) => {
            setError(e.code + ": " + e.message);
        });
    }

    return (
        <Container>
            <MenuBar></MenuBar>
            <form onSubmit={onSubmitHandler}>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Sign Up Page - Account Create</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <AccountForm />
                    </Grid>
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1}>
                        <NextButton />
                    </Grid>
                    <Grid item xs={12}>
                        {error}
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignupAccount;