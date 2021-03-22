import React, { useEffect, useState } from 'react';
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
import Container from "./components/container";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import BrowsingModules from "./modules/BrowsingModules";

function Profile(props) {

    var profile = LoginModules.getUserProfile();
    const [icon, setIcon] = useState(LoginModules.getUserProfile().icon != null ? LoginModules.getUserProfile().icon : face);
    const history = useHistory();
    const [Lib, setLib] = useState([]);

    useEffect(() => {
        BrowsingModules.getAllPlaylist().then((querySnapshot) => {
            var allPlaylist = [];
            querySnapshot.forEach((doc) => {
                var playlist = {
                    playlistTitle: doc.data().title,
                    playlistID: doc.id,
                };
                allPlaylist.push(playlist);
            });
            setLib(allPlaylist);
        });
    }, []);

    const useStyles = makeStyles({
        media: {
            height: 400,
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

        const showAllCard = () => {
            const res = Lib.map((list) => (
                <ListCard name={list.playlistTitle} playlistID={list.playlistID} />
            ));
            return res;
        }

        const ListCard = (props) => {

            const onclickHandler = (name) => {
                switch (name) {
                    case "view":
                        history.push("/playlist/" + props.playlistID);
                        break;
                    case "remove":
                        break;
                    default:
                        break;
                }
            }

            return (
                <SplideSlide>
                    <Card>
                        <CardActionArea onClick={() => { onclickHandler("view"); }}>
                            <CardMedia
                                className={classes.media}
                                image={moviePoster}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => { onclickHandler("view"); }}>
                                View
                        </Button>
                            <Button size="small" color="primary">
                                Delete
                        </Button>
                        </CardActions>
                    </Card>
                </SplideSlide>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h3>Playlist</h3>
                </Grid>
                {/* user playlist goes here */}
                <Grid item xs={12}>
                    <Splide options={{
                        rewind: true,
                        perPage: 3,
                        gap: '1rem',
                    }}>
                        {showAllCard()}
                    </Splide>
                </Grid>
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