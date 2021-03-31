import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const getMovieStream = () => {
    //todo
    return;
};

const uploadMovie = (files) => {
    //todo
    return;
};

const uploadPoster = (movieID, file) => {
    return firebase.storage().ref("posters/" + movieID + ".jpg").put(file);
    //.then .catch
};

const movieInfo = (
    id,
    title,
    description,
    director,
    cast,
    trailerURL,
    imdbReview,
    movieLength,
    movieReleaseDate
) => {
    //todo: add movie ref
    var res = {
        id: id,
        title: title,
        description: description,
        Director: director,
        cast: cast,
        trailerURL: trailerURL,
        imdbReview: imdbReview,
        movieLength: movieLength,
        movieReleaseDate: movieReleaseDate,
    }
    return res;
};   //an container for movie info

const createMovieInfo = (movieID, movieInfo) => {
    return firebase.firestore().collection("movies").doc(movieID).set(movieInfo); //.then(docRef).catch(); is available
};

const updateMovieInfo = (id, movieInfo) => {
    return firebase.firestore().collection("movies").doc(id).set(movieInfo);
};  //.then().catch() is available

const removeMovieInfo = (id) => {
    return firebase.firestore().collection("movies").doc(id).delete();
};  //.then().catch() is available

const getMovieInfo = (id) => {
    return firebase.firestore().collection("movies").doc(id).get();
};  //.then(doc).catch() is available

const getMovieInfos = (IDList) => {
    return firebase.firestore().collection("movies").where("id", "in", IDList).get();
};

const getMoviePoster = (movieID) => {
    return firebase.storage().ref("posters/" + movieID + ".jpg").getDownloadURL();  //.then.catch
}

const getNewMovieID = () => {
    return firebase.firestore().collection("movies").orderBy("id", "desc").get();
}

const MediaModule = {
    getMovieStream,
    uploadMovie,
    movieInfo,
    createMovieInfo,
    updateMovieInfo,
    removeMovieInfo,
    getMovieInfo,
    getMovieInfos,
    uploadPoster,
    getMoviePoster,
    getNewMovieID,
}
export default MediaModule;