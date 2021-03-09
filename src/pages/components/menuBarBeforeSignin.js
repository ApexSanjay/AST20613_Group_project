import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const MenuBar = () => {

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "signup":
                history.push("/signup");
                break;
            case "login":
                history.push("/login");
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    {/* <img src="#" alt="RedStream"></img> */}
                    <b>RedStream</b>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => { btnHandler("signup") }}>signup</Button>
                    <Button onClick={() => { btnHandler("login") }}>login</Button>
                </Grid>
            </Grid>
            <hr></hr>
        </div>

    );
};

export default MenuBar;