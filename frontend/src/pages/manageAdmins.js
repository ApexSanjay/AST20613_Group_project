import React from 'react';
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

export function ManageAdmins(props) {

    const history = useHistory();

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={11}>
                    <h2>Manage Admins</h2>
                </Grid>
                <Grid item xs={1}>
                    {/* button */}
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Admins</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>



                                <TableRow key="row name">
                                    <TableCell component="th" scope="row">
                                        Row Name
                                        </TableCell>
                                    <TableCell align="right">Button here</TableCell>
                                </TableRow>



                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        </Container>
    );
}

export default ManageAdmins;