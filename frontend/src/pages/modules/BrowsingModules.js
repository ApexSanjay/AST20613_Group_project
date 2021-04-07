import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const searchMovie = (keywords) => {
    return firebase.firestore().collection("movies")
        .where("title", ">=", keywords)
        .where("id", "==", parseInt(keywords))
        .get();
};

const getAllMovies = () => {
    return firebase.firestore().collection("movies").orderBy("id").get();
}

const suggestMovie = async () => {

    const getRandomId = (max) => {

        var id = parseInt(Math.random() * 1000);
        id %= max;
        id++;

        return id;
    }

    var movies = [];
    var res = [];

    await getAllMovies().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            movies.push(doc.data());
        });
    });

    for (var i = 0; i < 10; i++) {
        res.push(movies[getRandomId(movies.length)]);
    }

    return new Promise((resolve, reject) => {
        resolve(res);
    });

};

const createPlaylist = (name, movieIDList = [], seriesIDList = []) => {
    const uid = firebase.auth().currentUser.uid;
    return firebase.firestore().collection("playlists").add({
        userID: uid,
        title: name,
        movieID: movieIDList,
        seriesID: seriesIDList
    });
};  //list is an array of movie id  //.then(docRef).catch is available

const updatePlaylist = async (playlistID, movieIDList = null, seriesIDList = null) => {
    if (movieIDList !== null) {
        await firebase.firestore().collection("playlists").doc(playlistID).update({
            movieID: movieIDList,
        });
    }

    if (seriesIDList !== null){
        await firebase.firestore().collection("playlists").doc(playlistID).update({
            seriesID: seriesIDList,
        });
    }

    return new Promise((resolve, reject) => {
        resolve();
    });
    // return firebase.firestore().collection("playlists").doc(playlistID).update({
    //     movieID: movieIDList,
    // });
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
    return firebase.firestore().collection("reviews").where("movieID", "==", movieID)
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

const getUserIcon = (userID) => {
    return firebase.storage().ref("users/" + userID + "/icon").getDownloadURL();
}


const getSeriesReviewSnapshot = (seriesID) => {
    return firebase.firestore().collection("seriesReviews").where("seriesID", "==", seriesID)
        // .onSnapshot(
        //     (querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             doc.data();
        //         });
        //     }
        // )
        ;
};  //

const createSeriesReview = (seriesID, review, userName) => {
    var userID = firebase.auth().currentUser.uid;

    return firebase.firestore().collection("seriesReviews").add({
        seriesID: seriesID,
        review: review,
        userID: userID,
        userName: userName,
        timestamp: new Date()
    });  //.then().catch() is available
};


const removeSeriesReview = (reviewID) => {
    return firebase.firestore().collection("seriesReviews").doc(reviewID).delete();
};  //.then().catch() is available

const getAllSeries = async () => {

    var res = [];

    await firebase.firestore().collection("series").orderBy("id").get().then((querySnapshot)=>{
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc)=>{
                res.push(doc.data());
            });
        }
    });

    return new Promise((resolve, reject)=>{
        resolve(res);
    });
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
    getUserIcon,
    getAllMovies,

    getSeriesReviewSnapshot,
    createSeriesReview,
    removeSeriesReview,
    getAllSeries,

};

export default BrowsingModules;