import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import MenuBar from "./components/menuBarBeforeSignin";
import Container from "./components/container";
import SnackBar from "./components/snackBar";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function SignupPlan(props) {
    const classes = useStyles();

    const params = useParams();
    const errorRedirected = params.error;

    //data handling part
    const plan = [
        "Basic",
        "Standard",
        "Premium",
    ];
    const [planSelected, setPlanSelected] = React.useState("");

    const handleChange = (event) => {
        setPlanSelected(event.target.value);
    };

    const history = useHistory();

    //btn handler
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "continue":
                history.push("/signup/account/" + planSelected);
                break;

            default:
                break;
        }
    }

    const PlanDetails = () => {

        const Table = styled.table`
            width: 90%;
            margin: auto;
        `;

        const TR = styled.tr`
            padding: 16px;
            border-bottom: 2px solid #ddd;
        `;

        const TD = styled.td`
            padding: 16px;
            border-bottom: 2px solid #ddd;
        `;

        return (
            <Table>
                <TR>
                    <TD></TD>
                    <TD><b>Basic</b></TD>
                    <TD><b>Standard</b></TD>
                    <TD><b>Premium</b></TD>
                </TR>
                <TR>
                    <TD>Monthly price</TD>
                    <TD>HK$63</TD>
                    <TD>HK$78</TD>
                    <TD>HK$93</TD>
                </TR>
                <TR>
                    <TD>Video quality</TD>
                    <TD>Good</TD>
                    <TD>Better</TD>
                    <TD>Best</TD>
                </TR>
                <TR>
                    <TD>Screens you can watch on at the same time</TD>
                    <TD>1</TD>
                    <TD>2</TD>
                    <TD>4</TD>
                </TR>
                <TR>
                    <TD>Watch on your TV, computer, mobile phone and tablet</TD>
                    <TD>✔️</TD>
                    <TD>✔️</TD>
                    <TD>✔️</TD>
                </TR>
                <TR>
                    <TD>Unlimited movies and TV shows</TD>
                    <TD>✔️</TD>
                    <TD>✔️</TD>
                    <TD>✔️</TD>
                </TR>
            </Table>
        );
    };

    const Description = () => {
        return (
            <div>
                <p>✔️No commitments, cancel anytime.</p>
                <p>✔️Everything on RedStream for one low price.</p>
                <p>✔️Unlimited viewing on all your devices.</p>
            </div>
        );
    }

    const PlanSelectField = () => {
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="plan">Plan</InputLabel>
                <Select
                    value={planSelected}
                    onChange={handleChange}
                    label="planSelected"
                >
                    <MenuItem value={plan[0]}>Basic</MenuItem>
                    <MenuItem value={plan[1]}>Standard</MenuItem>
                    <MenuItem value={plan[2]}>Premium</MenuItem>
                </Select>
            </FormControl>
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
            <MenuBar/>
            {(errorRedirected ? <SnackBar show={true}>Please selected a plan.</SnackBar> : <></>)}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Sign Up Page - Choose Your Plan</h2>
                </Grid>
                <Grid item xs={12}>
                    <PlanDetails />
                </Grid>
                <Grid items xs={7}>
                    <Description />
                </Grid>
                <Grid items xs={5}>
                    <PlanSelectField />
                </Grid>
                <Grid items xs={11}></Grid>
                <Grid items xs={1}>
                    <NextButton />
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignupPlan;