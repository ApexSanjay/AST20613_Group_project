import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from "./components/menuBar";
import Container from "./components/container";
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AdminModules from "./modules/AdminModules";
import BrowsingModules from './modules/BrowsingModules';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export function ManageAdmins(props) {

    const history = useHistory();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);

    const [adminDataState, setAdminDataState] = useState([]);
    var adminData = adminDataState;

    useEffect(() => {
        AdminModules.getAllAdmin().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                // doc.data().userID
                adminData.push({ id: doc.id, data: doc.data() });
            });
            for (var i in adminData) {
                AdminModules.getAdminEmail(adminData[i].data.userID).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data().userEmail);
                        for (var j in adminData) {
                            if (adminData[j].data.userID === doc.data().userID) {
                                adminData[j].data["email"] = doc.data().userEmail;
                            }
                        }
                    });
                    setAdminDataState([...adminData]);

                });

            }
        });

    }, []);

    const AddAdminButton = (props) => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
            setOpenAdminDialog(true);
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                    fullWidth
                >
                    Add a new Admin
                </Button>
            </Container>

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

    const RemoveAdminButton = () => {

        const Container = styled.div`
            display: inline;
            margin: 5px;
        `;

        const onclickHandler = () => {
        }

        return (
            <Container>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onclickHandler}
                >
                    Remove
                </Button>
            </Container>
        );
    }

    const showAdminRows = () => {

        return adminDataState.map((data) => {

            return (
                <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                        {data.data.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {data.data.role}
                    </TableCell>
                    <TableCell align="right">
                        <RemoveAdminButton />
                    </TableCell>
                </TableRow>
            );
        });
    }

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <h2>Manage Admins</h2>
                </Grid>
                <Grid item xs={2}>
                    {/* button */}
                    <AddAdminButton />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Admins</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {showAdminRows()}

                                {/* <TableRow key="row name">
                                    <TableCell component="th" scope="row">
                                        Row Name
                                        </TableCell>
                                    <TableCell align="right">Button here</TableCell>
                                </TableRow> */}



                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <AdminDialog />

            </Grid>
        </Container>
    );
}

export default ManageAdmins;