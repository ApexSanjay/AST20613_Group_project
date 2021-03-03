import React from 'react';
import styled from 'styled-components';
import {
    useHistory
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import PaymentIcon from '@material-ui/icons/Payment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function SettingMenu(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState((props.selected ? props.selected : 0));

    const history = useHistory();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0:   //profile
                history.push("/setting/profile");
                break;
            case 1:   //membership
                history.push("/setting/membership");
                break;
            case 2:   //payment   
                history.push("/setting/payment");
                break;
            case 3:   //password
                history.push("/setting/password");
                break;
            default:
                break;
        }
    };

    const Container = styled.div`
        padding: 16px;
    `;

    return (
        <Container>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <CardMembershipIcon />
                        </ListItemIcon>
                        <ListItemText primary="Membership" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Payment" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Password" />
                    </ListItem>
                </List>
            </div>
        </Container>
    );
};

export default SettingMenu;