import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from '@material-ui/icons/Settings';

import LoginModules from "../modules/LoginModules";

const MenuBar = () => {
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
            history.push("/home");
        });
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={11}>
                    {/* <img src="#" alt="RedStream"></img> */}
                    <b>RedStream</b>
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