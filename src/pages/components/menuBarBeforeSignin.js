import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import {
    Link,
} from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

    const Logo = (props) => {
        const StyledLink = styled(Link)`
            text-decoration: none;
            font-weight: bold;
            color: white;
        `;

        return (
            <Typography style={{ paddingTop: 5 }}>
                <StyledLink to="/">
                    {props.children}
                </StyledLink>
            </Typography>
        );
    };


    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    {/* <img src="#" alt="RedStream"></img> */}
                    <Logo>RedStream</Logo>
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