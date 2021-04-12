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
import Avatar from '@material-ui/core/Avatar';

import SettingsIcon from '@material-ui/icons/Settings';

import LoginModules from "../modules/LoginModules";
import AdminModules from "../modules/AdminModules";
import BrowsingModules from '../modules/BrowsingModules';
import MediaModule from '../modules/MediaModule';

const MenuBar = () => {

    const account = new LoginModules.Account();
    const cardInfo = new LoginModules.CardInfo();
    const review = new BrowsingModules.Review();
    const playlist = new BrowsingModules.Playlist();
    const movieInfo = new MediaModule.MovieInfo();
    const seriesInfo = new MediaModule.SeriesInfo();
    const admin = new AdminModules.Admin();

    const [isAdmin, setIsAdmin] = useState(false);

    const userID = account.getUserProfile().uid;

    useEffect(() => { //init loading
        if (userID) {
            account.getAdminUser(userID).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setIsAdmin(true);
                })
            });
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);   // for setting icon
    const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);

    const handleClose = () => { // for setting icon
        setAnchorEl(null);
    };
    const handleAdminClose = () => { // for setting icon
        setAdminAnchorEl(null);
    };

    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);  //for 

    //btn handler
    const history = useHistory();
    const btnHandler = (btnName, e = null) => {
        switch (btnName) {
            case "movie":
                history.push("/browse");
                break;
            case "series":
                history.push("/browse/series");
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
            case "settingIcon":
                setAnchorEl(e.currentTarget);
                break;
            case "AdminButton":
                setAdminAnchorEl(e.currentTarget);
                break;
            case "manageAdmins":
                history.push("/manage/admins");
                break;
            case "manageMovies":
                history.push("/manage/movies");
                break;
            case "manageSeries":
                history.push("/manage/series");
                break;
            default:
                break;
        }
    };

    const logout = () => {
        account.logout().then(() => {
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
                    if (!querySnapshot.empty) {
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


    const SearchField = () => {
        
        var searchValue = "";

        const onSubmitHandler = (e) => {
            history.push("/search/" + searchValue);
        }

        const onChangeHandler = (value) => {
            searchValue = value;
        }

        return (
            <form noValidate autoComplete="off" onSubmit={(e)=>{onSubmitHandler(e)}}>
                <TextField label="Search" variant="outlined" onChange={(e)=>{onChangeHandler(e.target.value)}} />
            </form>
        );
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <Logo>RedStream</Logo>
                    <Button onClick={() => { btnHandler("movie") }}>Movie</Button>
                    <Button onClick={() => { btnHandler("series") }}>Series</Button>
                    <Button onClick={() => { btnHandler("myLib") }}>My Library</Button>
                    {isAdmin === true ? <Button aria-haspopup="true" onClick={(e) => { btnHandler("AdminButton", e) }}>Admin</Button> : <></>}
                    <Menu
                        anchorEl={adminAnchorEl}
                        keepMounted
                        open={Boolean(adminAnchorEl)}
                        onClose={handleAdminClose}
                    >
                        <MenuItem onClick={() => { btnHandler("manageAdmins") }}>Manage Admins</MenuItem>
                        <MenuItem onClick={() => { btnHandler("manageMovies") }}>Manage Movies</MenuItem>
                        <MenuItem onClick={() => { btnHandler("manageSeries") }}>Manage Series</MenuItem>
                    </Menu>
                </Grid>
                {/* <Grid item xs={6}> */}
                {/* <Grid container justify="flex-end"> */}
                {/* </Grid> */}
                {/* <Button>
                        <Avatar src={LoginModules.getUserProfile().icon}></Avatar>
                        {LoginModules.getUserProfile().name}
                    </Button> */}
                {/* </Grid> */}
                <Grid item xs={6}>

                    <Grid container justify="flex-end">

                        <SearchField />
                        <Button
                            onClick={() => { btnHandler("myLib") }}
                        >
                            <Avatar src={account.getUserProfile().icon}></Avatar>
                            {account.getUserProfile().name}
                        </Button>

                        <Button aria-haspopup="true" onClick={(e) => { btnHandler("settingIcon", e) }}><SettingsIcon /></Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {/* {(isAdmin === true ? <MenuItem onClick={() => { btnHandler("upload") }}>Upload</MenuItem> : <></>)} */}
                            {/* {(isAdmin === true ? <MenuItem onClick={() => { btnHandler("addAdmin") }}>Add a new Admin</MenuItem> : <></>)} */}
                            <MenuItem onClick={() => { btnHandler("manage") }}>Manage</MenuItem>
                            <MenuItem onClick={() => { btnHandler("logout") }}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                    <AdminDialog />
                </Grid>
            </Grid>
            <hr></hr>
        </div>

    );
}

export default MenuBar;