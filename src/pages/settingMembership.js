import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SettingMenu from "./components/settingMenu";
import MenuBar from "./components/settingMenuBar";
import SettingTitle from "./components/settingTitle";
import Container from "./components/container";
import LoginModules from "./modules/LoginModules";

function SettingMembership(props) {

    const [plan, setPlan] = useState();

    const [planDetails, setPlanDetails] = useState();

    if (!plan) {
        LoginModules.getUserPlan().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data().plan);
                setPlan(doc.data().plan);
            })
        })
    }

    if (!planDetails) {
        if (plan) {
            LoginModules.getPlanDetails(plan).then((doc) => {
                // console.log(doc.id, " => ", doc.data());
                setPlanDetails({
                    price: doc.data().Price,
                    quality: doc.data().Quality,
                    maxScreens: doc.data().MaxScreens,
                });
            });
        }
    }

    console.log(planDetails);

    const PlanField = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <center>
                        Current Plan
                    </center>
                </Grid>
                <Grid item xs={9}>
                    <center>
                        <Card>
                            <CardContent>
                                <br />
                                <br />
                                <br />
                                <h1>{plan}</h1>
                                <h2>HK$ {planDetails.price} </h2>
                                <h4>Current Plan</h4>
                                <br />
                                <br />
                                <br />
                            </CardContent>
                        </Card>
                        <br />
                        <Button variant="contained" color="secondary">View more plan</Button>
                    </center>
                </Grid>
            </Grid>
        );
    }

    const MembershipSetting = () => {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <SettingTitle>Membership</SettingTitle>
                </Grid>
                <Grid item xs={12}>
                    <PlanField />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <MenuBar />
            <Grid container>
                <Grid item xs={3}><SettingMenu selected={1} /></Grid>
                <Grid item xs={9}><MembershipSetting /></Grid>
            </Grid>

        </Container>

    );
}

export default SettingMembership;