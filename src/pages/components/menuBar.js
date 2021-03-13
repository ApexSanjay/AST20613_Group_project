import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";

import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from '@material-ui/icons/Settings';

import LoginModules from "../modules/LoginModules";

const MenuBar = () => {

    const [isAdmin, setIsAdmin] = useState(false);

    const userID = LoginModules.getUserProfile().uid;
    if (userID) {
        LoginModules.getAdminUser(userID).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                setIsAdmin(true);
            })
        });
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName) => {
        switch (btnName) {
            case "movie":
                history.push("/browse");
                break;
            case "series":
                history.push("/series");
                break;
            case "myLib":
                history.push("/profile");
                break;
            case "upload":
                history.push("/upload");
                break;
            case "manage":
                history.push("/setting");
                break;
            case "logout":
                logout();
                break;
            default:
                break;
        }
    };

    const logout = () => {
        LoginModules.logout().then(() => {
            history.push("/");
        });
    }

    const Logo = (props) => {
        const StyledLink = styled(Link)`
            text-decoration: none;
            font-weight: bold;
            color: white;
        `;

        return (
            <StyledLink to="/">
                {props.children}
            </StyledLink>
        );
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={11}>
                    {/* <img src="#" alt="RedStream"></img> */}
                    <Logo>RedStream</Logo>
                    <Button onClick={() => { btnHandler("movie") }}>Movie</Button>
                    <Button onClick={() => { btnHandler("series") }}>Series</Button>
                    <Button onClick={() => { btnHandler("myLib") }}>My Library</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><SettingsIcon /></Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {(isAdmin == true? <MenuItem onClick={() => { btnHandler("upload") }}>Upload</MenuItem> : <></>)}
                        <MenuItem onClick={() => { btnHandler("manage") }}>Manage</MenuItem>
                        <MenuItem onClick={() => { btnHandler("logout") }}>Logout</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <hr></hr>
        </div>

    );
}

export default MenuBar;