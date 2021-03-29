import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";

import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SettingsIcon from '@material-ui/icons/Settings';

import LoginModules from "../modules/LoginModules";
import AdminModules from "../modules/AdminModules";
import BrowsingModules from '../modules/BrowsingModules';

const MenuBar = () => {

    const [isAdmin, setIsAdmin] = useState(false);

    const userID = LoginModules.getUserProfile().uid;

    useEffect(() => { //init loading
        if (userID) {
            LoginModules.getAdminUser(userID).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setIsAdmin(true);
                })
            });
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);   // for setting icon

    const handleClick = (event) => {    // for setting icon
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { // for setting icon
        setAnchorEl(null);
    };

    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);  //for 

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
            case "addAdmin":
                setOpenAdminDialog(true);
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

    const AdminDialog = () => {

        var email = "";
        var role = "";

        const handleClose = () => {
            setOpenAdminDialog(false);
        };

        const onSubmitHandler = () => {
            console.log("Clicked");
            if (email.length !== 0 && role.length !== 0) {
                // console.log(email, role);
                BrowsingModules.getUser(email).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                        var uid;
                        querySnapshot.forEach((doc) => {
                            uid = doc.data().userID;
                            AdminModules.addAdmin(uid, role).then(() => {
                                handleClose();
                                console.log("done");
                            });
                        });
                    } else {
                        console.log("no this user");
                    }

                }).catch((e) => {
                    console.log(e.message);
                });

            }
        }

        return (
            <div>
                <Dialog open={openAdminDialog} onClose={handleClose}>
                    <DialogTitle>Add a new Admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new admin to this website, please input a email address here. Please be noticed that he/she must register before becoming a admin.
                  </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            label="Role"
                            onChange={(e) => { role = e.target.value; }}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            type="email"
                            label="Email Address"
                            onChange={(e) => { email = e.target.value; }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                  </Button>
                        <Button onClick={() => { onSubmitHandler() }} color="primary">
                            Add
                  </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={11}>
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
                        {(isAdmin === true ? <MenuItem onClick={() => { btnHandler("upload") }}>Upload</MenuItem> : <></>)}
                        {(isAdmin === true ? <MenuItem onClick={() => { btnHandler("addAdmin") }}>Add a new Admin</MenuItem> : <></>)}
                        <MenuItem onClick={() => { btnHandler("manage") }}>Manage</MenuItem>
                        <MenuItem onClick={() => { btnHandler("logout") }}>Logout</MenuItem>
                    </Menu>
                    <AdminDialog />
                </Grid>
            </Grid>
            <hr></hr>
        </div>

    );
}

export default MenuBar;