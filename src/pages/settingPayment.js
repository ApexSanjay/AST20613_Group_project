import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';

import MenuBar from "./components/settingMenuBar";
import SettingMenu from "./components/settingMenu";
import SettingTitle from "./components/settingTitle";
import SaveButton from "./components/settingSaveButton";

import LoginModules from "./modules/LoginModules";
import { useHistory } from 'react-router';

function SettingPayment(props) {

    const [cardInfoID, setCardInfoID] = useState();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [cardNum, setCardNum] = useState("");
    const [explorationDate, setExplorationDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [error, setError] = useState("");

    var newData = {
        firstname: firstname,
        lastname: lastname,
        cardNum: cardNum,
        explorationDate: explorationDate,
        cvv: cvv
    }

    const userid = LoginModules.getUserProfile().uid;
    const history = useHistory();

    LoginModules.getCardInfo(userid).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            // console.log(data);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setCardNum(data.CardNumber);
            setExplorationDate(data.ExplorationDate);
            setCVV(data.CVV);
            setCardInfoID(doc.id);
        });
    });

    //onchangehandler
    const onchangeHandler = (field, value) => {
        switch (field) {
            case "firstname":
                newData.firstname = value;
                break;
            case "lastname":
                newData.lastname = value;
                break;
            case "cardNum":
                newData.cardNum = value;
                break;
            case "explorationDate":
                newData.explorationDate = value;
                break;
            case "cvv":
                newData.cvv = value;
                break;
            default:
                break;
        }
        console.log(newData);
    }

    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const FirstNameField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        First Name
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="firstname"
                            label="First Name"
                            variant="outlined"
                            onChange={(e)=>{onchangeHandler("firstname", e.target.value)}}
                            fullWidth
                            required
                            defaultValue={firstname}
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const LastNameField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Last Name
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="lastname"
                            label="Last Name"
                            variant="outlined"
                            onChange={(e)=>{onchangeHandler("lastname", e.target.value)}}
                            fullWidth
                            required
                            defaultValue={lastname}
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const CardNumberField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Card Number
                            </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="cardNum"
                            label="Card Number"
                            variant="outlined"
                            onChange={(e)=>{onchangeHandler("cardNum", e.target.value)}}
                            fullWidth
                            required
                            defaultValue={cardNum}
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const ExpiringDateField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Exploration Date
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="explorationDate"
                            label="Exploration Date"
                            variant="outlined"
                            onChange={(e)=>{onchangeHandler("explorationDate", e.target.value)}}
                            fullWidth
                            required
                            defaultValue={explorationDate}
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const CVVField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        CVV
                            </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <TextField
                            id="cvv"
                            label="CVV"
                            variant="outlined"
                            onChange={(e)=>{onchangeHandler("cvv", e.target.value)}}
                            fullWidth
                            required
                            defaultValue={cvv}
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const onSubmitHandler = (e) => {

        e.preventDefault();
        LoginModules.updateCardInfo(
            cardInfoID,
            userid,
            newData.cvv,
            newData.cardNum,
            newData.explorationDate,
            newData.firstname,
            newData.lastname
        ).then(()=>{
            setError("update success");
            history.push("/setting/payment");
        }).catch((e)=>{
            setError(e.code + ": " + e.message);
        });
    }

    const PaymentSetting = () => {
        return (
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <SettingTitle>Payment</SettingTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <FirstNameField />
                        <LastNameField />
                        <CardNumberField />
                        <ExpiringDateField />
                        <CVVField />
                        <SaveButton />
                    </Grid>
                    <Grid item xs={12}>
                        {error}
                    </Grid>
                </Grid>
            </form>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={2} /></Grid>
                <Grid item xs={9}><PaymentSetting /></Grid>
            </Grid>
        </Container>

    );
}

export default SettingPayment;