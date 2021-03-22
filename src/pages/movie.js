import React, { useEffect, useState } from 'react';
import {
    useHistory,
    useParams
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LinkIcon from '@material-ui/icons/Link';
import styled from 'styled-components';
import moviePoster from "./img/moviePoster/soul_poster.jpg";
import playbtn from "./img/playbtn.svg";
import ReactPlayer from 'react-player';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MediaModule from "./modules/MediaModule";
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import BrowsingModules from "./modules/BrowsingModules";
import LoginModules from "./modules/LoginModules";

function Movie(props) {

    const history = useHistory();
    var params = useParams();
    var movieID = params.id;     // id of url "/movie/{id}" 

    //For sharing link
    const [copiedLink] = React.useState(0);

    //get movie info
    const [movies, setMovies] = useState({
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        movieLength: "",
        movieReleaseDate: "",
    });

    const [userLibraryState, setUserLibraryState] = useState([]);

    const [Icon, setIcon] = useState(LoginModules.getUserProfile().icon);

    const [reviewListState, setreviewListState] = useState([]);


    useEffect(() => {   //init loading
        MediaModule.getMovieInfo(movieID).then((doc) => {
            if (doc.exists) {
                setMovies(doc.data());
            } else {
                history.push("/browse");
            }
        });

        BrowsingModules.getAllPlaylist().then((querySnapshot) => {
            var userLibrary = [];
            querySnapshot.forEach((doc) => {
                if (userLibraryState != []) {
                    var playlist = {
                        title: doc.data().title,
                        playlistID: doc.id,
                    }
                    userLibrary.push(playlist);
                }
            });
            setUserLibraryState(userLibrary);
        });

        BrowsingModules.getReviewSnapshot(movieID)
            .onSnapshot(
                (querySnapshot) => {
                    var reviewList = [];
                    querySnapshot.forEach((doc) => {
                        reviewList.push(doc.data());
                        setreviewListState(reviewList);
                    });
                }
            )
            ;
    }, []);

    const MenuBar = () => {

        var history = useHistory();

        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={history.goBack}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const Container = styled.div`
        margin: auto;
        padding: 0;
        width: 100%;
    `;

    const BackGround = styled.div`
        background-image: url(${moviePoster});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 105%;
        position: fixed;
        top: 0;
        left: 0;
    `;

    const Blur = styled.div`
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        height: 100vh;
        width: 100%;
    `;

    const Body = styled.div`
        backface-visibility: hidden;
        position: relative;
        top: 5%;
        margin: auto;
        width: 80%;
        padding: 10px;
    `;

    const Director = () => {
        return (
            <div>
                <h3>Director</h3>
                {movies.Director}
            </div>
        );
    }

    const Cast = () => {
        return (
            <div>
                <h3>Cast</h3>
                {movies.cast}
            </div>
        );
    }

    const Description = () => {
        return (
            <div>
                <h3>Movie Description</h3>
                {movies.description}
            </div>
        );
    }

    const AddToLibrary = () => {
        const [openDialog, setOpenDialog] = React.useState(false);

        const useStyles = makeStyles((theme) => ({  //for LibMenu
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
        }));

        const LibMenu = () => {
            const [selectedPlaylist, setSelectedPlaylist] = React.useState('');
            const classes = useStyles();
            var newPlaylist = "";

            const handleClose = () => {  //for <Dialog> and cancel btn
                setOpenDialog(false);
            };

            const onclickHandler = (name) => {
                switch (name) {
                    case "ok":
                        if (selectedPlaylist === "new") {
                            if (newPlaylist === "") {
                                newPlaylist = "New Playlist";
                            }
                            // create playlist
                            BrowsingModules.createPlaylist(newPlaylist, [movieID]).then(() => {
                                console.log("BM: created playlist");
                            }).catch((e) => {
                                console.log(e.message);
                            });
                        } else {
                            console.log(selectedPlaylist);
                            // add item to exist playlist
                            BrowsingModules.getPlaylist(selectedPlaylist).then((doc) => {
                                // console.log(doc.data());
                                var newMovieIDList = doc.data().movieID;
                                newMovieIDList.push(movieID);
                                BrowsingModules.updatePlaylist(selectedPlaylist, newMovieIDList).then(() => {
                                    console.log("update playlist success");
                                });
                            });
                        }
                        handleClose();
                        break;
                    case "cancel":
                        handleClose();
                        break;

                    default:
                        break;
                }
            }

            const handleChange = (value) => {
                // console.log(value);
                setSelectedPlaylist(value || '');
            }

            const NewPlaylistField = () => {

                const onchangeHandler = (value) => {
                    newPlaylist = value;
                    // console.log(newPlaylist);
                }

                const Container = styled.div`
                    margin: 10px 0;
                `;

                if (selectedPlaylist === "new") {
                    return (
                        <Container>
                            <TextField
                                label="New Playlist"
                                variant="outlined"
                                onChange={(e) => { onchangeHandler(e.target.value); }}
                                fullWidth
                                required
                            />
                        </Container>

                    );
                } else {
                    return (<></>);
                }
            }

            const UserPlaylistMenuItem = () => {
                const res = userLibraryState.map((list) => (
                    <MenuItem value={list.playlistID}>{list.title}</MenuItem>
                ));
                return (res);
            }

            return (
                <Dialog disableBackdropClick disableEscapeKeyDown open={openDialog} onClose={handleClose}>
                    <DialogTitle>Add To Library</DialogTitle>
                    <DialogContent>
                        Please select a playlist.
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Playlist</InputLabel>
                                <Select
                                    value={selectedPlaylist}
                                    onChange={(e) => { handleChange(e.target.value); }}
                                    input={<Input />}
                                >
                                    <MenuItem value="new">New Playlist</MenuItem>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {/* show user's playlist */}
                                    {UserPlaylistMenuItem()}
                                </Select>
                                <NewPlaylistField />
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { onclickHandler("cancel"); }} color="primary">
                            Cancel
                  </Button>
                        <Button onClick={() => { onclickHandler("ok"); }} color="primary">
                            Ok
                  </Button>
                    </DialogActions>
                </Dialog>
            )
        }

        const onclickHandler = () => {
            // movieID
            setOpenDialog(true);
        }

        return (
            <div>
                <Button onClick={() => { onclickHandler(); }}>
                    <LibraryAddIcon fontSize="small" /> Add to Library
                </Button>
                <LibMenu />
            </div>
        );
    }


    const ShareLink = () => {
        return (
            <div>
                <Button onClick={() => navigator.clipboard.writeText('Should be url')}>
                    <LinkIcon fontSize="small" /> Share Link
                </Button>
            </div>
        );
    }

    const PlayButton = () => {
        var history = useHistory();
        const play = () => {
            history.push("/play");
        }

        return (
            <p>
                <center>
                    <Button fullWidth onClick={play}>
                        <img src={playbtn} width="60%" alt="Play"></img>
                    </Button>
                </center>
            </p>
        );
    }

    const Review = () => {

        const CommentContainer = styled.div`
            margin-left: 16px;
        `;

        const Comment = (props) => {
            return (
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={1}>
                                {/* icon */}
                                <Avatar
                                    alt=""
                                    src=""
                                />
                            </Grid>
                            <Grid item xs={11}>
                                {/* username */}
                                <b>{props.user}</b><br />
                                {/* date */}
                                <small>{props.date}</small>
                            </Grid>
                            <Grid item xs={12}>
                                {/* comment */}
                                <CommentContainer>
                                    {props.review}
                                </CommentContainer>
                            </Grid>
                        </Grid>

                    </Paper>

                </Grid>
            );
        }

        const CommentSection = () => {
            const showComments = () => {
                var res;

                if (reviewListState) {
                    // console.log(reviewListState);

                    // res = reviewListState.map((data) => (
                    //     <Comment user={data.userID} date={Date(data.timestamp)} review={data.review} />
                    // ));

                    res = reviewListState.map((data) => {
                        // console.log(data.timestamp.toDate().toString());
                        var date = data.timestamp.toDate().toString();
                        return (
                            <Comment user={data.userName} date={date} review={data.review} />
                        );
                    });
                } else {
                    res = <></>;
                }

                return res;
            }

            return showComments();
        }



        const ReviewField = () => {

            var review = "";

            const SendButton = () => {
                const onclickHandler = () => {
                    if (review.length !== 0) {
                        BrowsingModules.createReview(movieID, review, LoginModules.getUserProfile().name);
                    }
                }

                return (
                    <Button onClick={() => { onclickHandler(); }}>
                        <SendIcon />
                        Send
                    </Button>
                );
            }

            const CommentTextField = () => {

                const onChangeHandler = (value) => {
                    review = value;
                }

                return (
                    <TextField
                        label="Write Down Your Review"
                        variant="filled"
                        onChange={(e) => { onChangeHandler(e.target.value) }}
                        fullWidth
                    ></TextField>
                );
            }

            return (
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <Avatar
                            alt=""
                            src={Icon}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        {/* <TextField
                            label="Write Down Your Review"
                            variant="filled"
                            fullWidth
                        ></TextField> */}
                        <CommentTextField />
                    </Grid>
                    <Grid item xs={11}>

                    </Grid>
                    <Grid item xs={1}>
                        <SendButton />
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <h2>Review</h2>
                </Grid>
                <ReviewField />
                <CommentSection />
            </Grid>);
    }

    return (    //render part of this page
        <Container>
            <BackGround>
                <Blur />
            </BackGround>
            <Body>
                <MenuBar />
                {<h1>{movies.title}</h1>}
                <Grid container>
                    <Grid item xs={3}>
                        <AddToLibrary />
                        <ShareLink />
                        <PlayButton />
                        <p>
                            {movies.movieLength} | {movies.movieReleaseDate} | IMDB: {movies.imdbReview}
                        </p>
                    </Grid>
                    <Grid item xs={9}>
                        <p>
                            <center>
                                <ReactPlayer url={movies.trailerURL} width="100%" />
                            </center>
                        </p>
                    </Grid>
                    <Grid item xs={3}>
                        <Director></Director>
                        <Cast>

                        </Cast>
                    </Grid>
                    <Grid item xs={9}>
                        <Description>
                        </Description>
                    </Grid>
                    <Grid item xs={12}>
                        <Review />
                    </Grid>
                </Grid>
            </Body>


        </Container>
    );
}

export default Movie;