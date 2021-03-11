import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import face from "./img/face.svg";
import MenuBar from "./components/menuBar";
import LoginModules from "./modules/LoginModules";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moviePoster from "./img/moviePoster/soul_poster.jpg";

function Profile(props) {

    var profile = LoginModules.getUserProfile();
    const [icon, setIcon] = useState(LoginModules.getUserProfile().icon != null ? LoginModules.getUserProfile().icon : face);

    const history = useHistory();

    const Container = styled.div`
        margin: auto;
        width: 80%;
    `;

    const useStyles = makeStyles({
        media: {
            height: 360,
        },
    });
    const classes = useStyles();

    const Icon = () => {

        const Pic = styled.img`
            width: 100%;
        `;

        return (
            <Pic src={icon} />
        );
    }

    const Name = () => {
        return (
            <center>
                <h1>
                    {profile.name}
                </h1>
            </center>
        );
    }

    const Playlist = () => {

        const ListCard = () => {

            const onclickHandler = (name) => {
                switch (name) {
                    case "view":
                        history.push("/playlist/123");
                        break;
                    case "remove":
                        break;
                    default:
                        break;
                }
            }

            return (
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea onClick={()=>{onclickHandler("view");}}>
                            <CardMedia
                                className={classes.media}
                                image={moviePoster}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Playlist 1
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={()=>{onclickHandler("view");}}>
                                View
                        </Button>
                            <Button size="small" color="primary">
                                Delete
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p>
                        <center>
                            <h2>
                                Playlist
                            </h2>
                        </center>
                    </p>
                </Grid>
                {/* user playlist goes here */}
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
            </Grid>
        );
    };

    return (
        <Container>
            <MenuBar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2>Profile</h2>
                </Grid>
                <Grid item xs={3}>
                    <Icon />
                    <Name />
                </Grid>
                <Grid item xs={9}>
                    <Playlist />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;