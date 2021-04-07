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
import defaultMoviePoster from "./img/moviePoster/soul_poster.jpg";
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
import SnackBar from "./components/snackBar";
import EditIcon from '@material-ui/icons/Edit';

function Series(props) {

    const [shareSnackBarOpen, setShareSnackBarOpen] = useState(false);
    const [updatePlaylistSnackBarOpen, setUpdatePlaylistSnackBarOpen] = useState(false);

    const [seriesPoster, setSeriesPoster] = useState(defaultMoviePoster);
    const [removeCommentSnackBar, setRemoveCommentSnackBar] = useState(false);

    const history = useHistory();
    var params = useParams();
    var seriesID = params.id;     // id of url "/movie/{id}" 

    //get movie info
    const [movies, setMovies] = useState({
        title: "",
        description: "",
        Director: "",
        cast: [],
        trailerURL: "",
        imdbReview: "",
        showLength: "",
        showReleaseDate: "",
    });

    const [userLibraryState, setUserLibraryState] = useState([]);

    const [Icon] = useState(LoginModules.getUserProfile().icon);

    const [reviewListState, setreviewListState] = useState([]);

    const [isAdmin, setIsAdmin] = useState(false);

    const userID = LoginModules.getUserProfile().uid;

    useEffect(() => {   //init loading

        //isAdmin
        LoginModules.getAdminUser(userID).then((querySnapshot) => {
            querySnapshot.forEach(item => {
                setIsAdmin(true);
            });
        });

        //series info
        MediaModule.getSeriesInfo(seriesID.toString()).then((data) => {
            // console.log(data);
            setMovies(data);
        });

        //series poster
        MediaModule.getSeriesPoster(seriesID).then((url) => {
            setSeriesPoster(url);
        })

        //reviews
        BrowsingModules.getSeriesReviewSnapshot(seriesID)
            .onSnapshot(
                (querySnapshot) => {
                    var reviewList = [];
                    querySnapshot.forEach((doc) => {
                        reviewList.push({ id: doc.id, data: doc.data() });
                        setreviewListState([...reviewList]);
                    });
                }
            )
        ;
        
        //playlist
        BrowsingModules.getAllPlaylist().then((querySnapshot) => {
            var userLibrary = [];
            querySnapshot.forEach((doc) => {
                if (userLibraryState !== []) {
                    var playlist = {
                        title: doc.data().title,
                        playlistID: doc.id,
                    }
                    userLibrary.push(playlist);
                }
            });
            setUserLibraryState(userLibrary);
        });

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
        background-image: url(${seriesPoster});
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

        const displayCast = () => {
            var res = "";
            for (var i in movies.cast) {
                res += movies.cast[i];
                if (i !== (movies.cast.length - 1)) {
                    res += ", ";
                }
            }
            return res;
        }

        return (
            <div>
                <h3>Cast</h3>
                {displayCast()}
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
            const [selectedPlaylist, setSelectedPlaylist] = React.useState("new");
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
                            BrowsingModules.createPlaylist(newPlaylist, [], [seriesID]).then(() => {
                                // console.log("BM: created playlist");
                                setUpdatePlaylistSnackBarOpen(true);
                            }).catch((e) => {
                                console.log(e.message);
                            });
                        } else {
                            // console.log(selectedPlaylist);
                            // add item to exist playlist
                            BrowsingModules.getPlaylist(selectedPlaylist).then((doc) => {
                                console.log(doc.data());
                                var newSeriesIDList = doc.data().seriesID;
                                newSeriesIDList.push(seriesID);
                                // console.log(newSeriesIDList);
                                BrowsingModules.updatePlaylist(selectedPlaylist, null , newSeriesIDList).then(() => {
                                    setUpdatePlaylistSnackBarOpen(true);
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
                setSelectedPlaylist(value || '');
            }

            const NewPlaylistField = () => {

                const onchangeHandler = (value) => {
                    newPlaylist = value;
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

        const onClickHandler = () => {
            navigator.clipboard.writeText(window.location.href);
            setShareSnackBarOpen(true);
        }

        return (
            <div>
                <Button onClick={() => onClickHandler()}>
                    <LinkIcon fontSize="small" /> Share Link
                </Button>
            </div>
        );
    }

    const EditMovie = () => {

        const onClickHandler = () => {
            // history.push("/editSeries/" + seriesID);
        }

        return (
            <div>
                <Button onClick={() => onClickHandler()}>
                    <EditIcon fontSize="small" /> Edit Movie
                </Button>
            </div>
        );
    }

    const PlayButton = () => {
        var history = useHistory();
        const play = () => {
            history.push("/play/series" + seriesID);
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

            const [UserIcon, setUserIcon] = useState();

            const CommentUserID = props.userID;

            useEffect(() => {
                BrowsingModules.getUserIcon(props.userID).then((url) => {
                    setUserIcon(url);
                });
            }, []);

            const RemoveCommentButton = (props) => {

                const commentID = props.id;

                const onclickHandler = () => {
                    BrowsingModules.removeSeriesReview(commentID).then(() => {
                        console.log("Success");
                        setRemoveCommentSnackBar(true);
                        window.location.reload();
                    }).catch((e) => {
                        console.log(e.message);
                    });
                }

                console.log(userID, CommentUserID, userID === CommentUserID);
                if (isAdmin || userID === CommentUserID) {
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { onclickHandler(commentID) }}
                        >
                            Remove
                        </Button>
                    );
                } else {
                    return (<div></div>);
                }


            }

            return (
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <Grid container spacing={4}>
                            <Grid item xs={1}>
                                {/* icon */}
                                <Avatar
                                    alt=""
                                    src={UserIcon}
                                />
                            </Grid>
                            <Grid item xs={11}>
                                {/* username */}
                                <b>{props.user}</b><br />
                                {/* date */}
                                <small>{props.date}</small>
                            </Grid>
                            <Grid item xs={9}>
                                {/* comment */}
                                <CommentContainer>
                                    {props.review}
                                </CommentContainer>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container justify="flex-end">
                                    <RemoveCommentButton id={props.commentID} />
                                </Grid>
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
                    res = reviewListState.map((data) => {
                        var date = data.data.timestamp.toDate().toString();
                        return (
                            <Comment userID={data.data.userID} user={data.data.userName} date={date} review={data.data.review} commentID={data.id} />
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
                        BrowsingModules.createSeriesReview(seriesID, review, LoginModules.getUserProfile().name);
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
            <SnackBar show={shareSnackBarOpen}>Link Copied.</SnackBar>
            <SnackBar show={updatePlaylistSnackBarOpen}>Update Success.</SnackBar>
            <SnackBar show={removeCommentSnackBar}>Update Success.</SnackBar>
            <Body>
                <MenuBar />
                {<h1>{movies.title}</h1>}
                <Grid container>
                    <Grid item xs={3}>
                        <AddToLibrary />
                        <ShareLink />
                        {(isAdmin ? <EditMovie /> : <></>)}
                        {/* <EditMovie /> */}
                        <PlayButton />
                        <p>
                            {movies.showLength} | {movies.showReleaseDate} | IMDB: {movies.imdbReview}
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

export default Series;