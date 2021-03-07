import firebase from 'firebase/app';
import "firebase/firestore";

const searchMovie = (keywords) => {
    //todo
    return;
};

const suggestMovie = () => {
    //todo
    return;
};

const createPlaylist = (name, list) => {
    return firebase.firestore().collection("playlists").add({
        title: name,
        list: list,
    });
};  //list is an array of movie id  //.then(docRef).catch is available

const updatePlaylist = (playlistID, list) => {
    return firebase.firestore().collection("playlists").doc(playlistID).set({
        list: list,
    });
};  //.then().catch() is available

const removePlaylist = (playlistID) => {
    return firebase.firestore().collection("playlists").doc(playlistID).delete();
};  //.then().catch() is available

const getPlaylist = (playlistID) => {
    return firebase.firestore().collection("playlists").doc(playlistID).get();
};  //.then().catch() is available

const createReview = (movieID, review) => {
    return firebase.firestore().collection("reviews").add({
        movieID: movieID,
        review: review,
    });  //.then().catch() is available
};

const removeReview = (reviewID) => {
    return firebase.firestore().collection("reviews").doc(reviewID).delete();
};  //.then().catch() is available

const getReviewSnapshot = (movieID) => {
    return firebase.firestore().collection("reviews").where("movieID", "==", movieID).onSnapshot((doc) => {
        return doc;
    });;
};  //

const getReviewOnce = (movieID) => {
    return firebase.firestore().collection("reviews").where("movieID", "==", movieID);
};  //.then().catch() is available

const BrowsingModules = {
    searchMovie,
    suggestMovie,
    createPlaylist,
    updatePlaylist,
    removePlaylist,
    getPlaylist,
    createReview,
    removeReview,
    getReviewSnapshot,
    getReviewOnce
};

export default BrowsingModules;