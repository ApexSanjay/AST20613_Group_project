import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MenuBar from "./components/menuBarBeforeSignin";
import LoginModules from "./modules/LoginModules";
import Container from "./components/container";

function SignupPayment(props) {

    var
        firstname = "",
        lastname = "",
        cardNum = "",
        explorationDate = "",
        cvv = "";

    const [error, setError] = useState("");

    const history = useHistory();
    
    //onchange handler
    const onchangeHandler = (field, value) => {
        switch (field) {
            case "firstname":
                firstname = value;
                break;
            case "lastname":
                lastname = value;
                break;
            case "cardNum":
                cardNum = value;
                break;
            case "explorationDate":
                explorationDate = value;
                break;
            case "cvv":
                cvv = value;
                break;
            default:
                break;
        }
        console.log(firstname, lastname, cardNum, explorationDate, cvv);
    }

    const CardBar = styled.div`
        border: 1px solid white;
        padding: 16px;
        margin: 3% auto 0px auto;
        width: 40%;
        text-align: center;
    `;

    const CardForm = () => {

        const Table = styled.table`
            margin: auto;
            padding: 5%;
            text-align: center;
            width: 40%;
        `;

        return (
            <Table>
                <tr>
                    <td>First Name</td>
                    <td>
                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            onChange={(e) => { onchangeHandler("firstname", e.target.value) }}
                            fullWidth
                            required
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
                            onChange={(e) => { onchangeHandler("lastname", e.target.value) }}
                            fullWidth
                            required
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
                            onChange={(e) => { onchangeHandler("cardNum", e.target.value) }}
                            fullWidth
                            required
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
                            onChange={(e) => { onchangeHandler("explorationDate", e.target.value) }}
                            fullWidth
                            required
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
                            onChange={(e) => { onchangeHandler("cvv", e.target.value) }}
                            type="password"
                            fullWidth
                            required
                        />
                    </td>
                </tr>
            </Table>
        );
    };

    const NextButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
            >
                Finish
            </Button>
        );
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        var uid = LoginModules.getUserProfile().uid;
        LoginModules.createCardInfo(uid, cvv, cardNum, explorationDate, firstname, lastname).then(()=>{
            history.push("/browse");
        }).catch((e)=>{
            setError(e.code + ": " + e.message);
        });
    }

    return (
        <Container>
            <MenuBar></MenuBar>
            <form onSubmit={onSubmitHandler}>
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
                    <Grid item xs={11}>{error}</Grid>
                    <Grid item xs={1}>
                        <NextButton />
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignupPayment;