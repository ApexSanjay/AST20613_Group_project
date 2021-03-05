import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const getMovieStream = () => {
    //todo
    return;
};

const uploadMovie = (movieFiles) => {
    //todo
    return;
};

const transcodeMovie = (movieFiles) => {
    //may do
    return;
};

const movieInfo = (title, director, cast, description) => {
    //todo: add movie ref
    var res = {
        title: title,
        director: director,
        cast: cast,
        description: description,
    }
    return res;
};   //an container for movie info

const createMovieInfo = (movieInfo) => {
    return firebase.firestore().collection("movies").add({
        title: movieInfo.title,
        director: movieInfo.director,
        cast: movieInfo.cast,
        description: movieInfo.description,
    }); //.then(docRef).catch(); is available
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

const MediaModule = {
    getMovieStream,
    uploadMovie,
    movieInfo,
    createMovieInfo,
    updateMovieInfo,
    removeMovieInfo,
    getMovieInfo,
    transcodeMovie,
}
export default MediaModule;