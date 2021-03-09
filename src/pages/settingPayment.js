import React from 'react';

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

function SettingPayment(props) {
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    //data handling part
    const cardType = [
        "Credit Card",
        "Debit Card",
    ]
    const [card, setCard] = React.useState("");
    const handlePaymentTypeChange = (event) => {
        setCard(event.target.value);
    };


    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

    const PaymentTypeField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Type
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="paymentType">Type</InputLabel>
                        <Select
                            labelId="paymentType"
                            id="paymentType"
                            value={card}
                            onChange={handlePaymentTypeChange}
                            label="card"
                        >
                            <MenuItem value={cardType[0]}>Credit Card</MenuItem>
                            <MenuItem value={cardType[1]}>Debit Card</MenuItem>
                        </Select>
                    </FormControl>
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
                <Grid item xs={8}>
                    <center>
                        <TextField
                            id="cardNum"
                            label="Card Number"
                            variant="outlined"
                            fullWidth
                            defaultValue="5xxx-xxxx-xxxx-xxxx"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </center>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="secondary" fullWidth>Edit</Button>
                </Grid>
            </Grid>
        );
    }

    const ExpiringDateField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        MM/YY
                            </center>
                </Grid>
                <Grid item xs={4}>
                    <center>
                        <TextField
                            id="mm"
                            label="MM"
                            variant="outlined"
                            fullWidth
                            defaultValue="07"
                        />
                    </center>
                </Grid>
                <Grid item xs={5}>
                    <center>
                        <TextField
                            id="dd"
                            label="DD"
                            variant="outlined"
                            fullWidth
                            defaultValue="25"
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
                            fullWidth
                            defaultValue=""
                        />
                    </center>
                </Grid>
            </Grid>
        );
    }

    const PaymentSetting = () => {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <SettingTitle>Payment</SettingTitle>
                </Grid>
                <Grid item xs={12}>
                    <PaymentTypeField />
                    <CardNumberField />
                    <ExpiringDateField />
                    <CVVField />
                    <SaveButton />
                </Grid>
            </Grid>
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