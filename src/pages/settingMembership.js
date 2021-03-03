import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styled from 'styled-components';

import SettingMenu from "./components/settingMenu";
import MenuBar from "./components/settingMenuBar";
import SettingTitle from "./components/settingTitle";


function SettingMembership(props) {
    const Container = styled.div`
        padding: 2%;
        margin: auto;
        width: 80%;
        color: white;
    `;

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
                                <h1>Basic Membership</h1>
                                <h2>HK$ 29.99 / Year</h2>
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