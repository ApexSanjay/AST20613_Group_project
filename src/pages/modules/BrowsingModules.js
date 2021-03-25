import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { findRenderedComponentWithType } from 'react-dom/test-utils';

const searchMovie = (keywords) => {
    //todo
    return;
};

const suggestMovie = () => {
    //todo
    return;
};

const createPlaylist = (name, movieIDList) => {
    const uid = firebase.auth().currentUser.uid;
    return firebase.firestore().collection("playlists").add({
        userID: uid,
        title: name,
        movieID: movieIDList,
    });
};  //list is an array of movie id  //.then(docRef).catch is available

const updatePlaylist = (playlistID, movieIDList) => {
    return firebase.firestore().collection("playlists").doc(playlistID).update({
        movieID: movieIDList,
    });
};  //.then().catch() is available

const removePlaylist = (playlistID) => {
    return firebase.firestore().collection("playlists").doc(playlistID).delete();
};  //.then().catch() is available

const getPlaylist = (playlistID) => {
    return firebase.firestore().collection("playlists").doc(playlistID).get();
};  //.then().catch() is available

const getAllPlaylist = () => {
    const uid = firebase.auth().currentUser.uid;
    return firebase.firestore().collection("playlists").where("userID", "==", uid).get();
}

const createReview = (movieID, review, userName) => {
    var userID = firebase.auth().currentUser.uid;

    return firebase.firestore().collection("reviews").add({
        movieID: movieID,
        review: review,
        userID: userID,
        userName: userName,
        timestamp: new Date()
    });  //.then().catch() is available
};

const removeReview = (reviewID) => {
    return firebase.firestore().collection("reviews").doc(reviewID).delete();
};  //.then().catch() is available

const getReviewSnapshot = (movieID) => {
    console.log(movieID);
    return firebase.firestore().collection("reviews").where("movieID", "==", movieID).orderBy("timestamp", "desc")
        // .onSnapshot(
        //     (querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             doc.data();
        //         });
        //     }
        // )
        ;
};  //

const getReviewOnce = (movieID) => {
    return firebase.firestore().collection("reviews").where("movieID", "==", movieID);
};  //.then().catch() is available

const getUser = (email) => {
    return firebase.firestore().collection("users").where("userEmail", "==", email).get();
}

const BrowsingModules = {
    searchMovie,
    suggestMovie,
    createPlaylist,
    updatePlaylist,
    removePlaylist,
    getPlaylist,
    getAllPlaylist,
    createReview,
    removeReview,
    getReviewSnapshot,
    getReviewOnce,
    getUser,
};

export default BrowsingModules;