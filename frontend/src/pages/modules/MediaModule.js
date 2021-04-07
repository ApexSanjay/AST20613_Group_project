import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import axios from 'axios';

const getMovieStream = (movieID, plan = "Basic") => {

    var movieURL = "http://localhost:4000/play/480p/" + movieID + "/" + movieID + ".m3u8";
    if (plan === "Basic") {
        movieURL = "http://localhost:4000/play/480p/" + movieID + "/" + movieID + ".m3u8";
    } else if (plan === "Standard") {
        movieURL = "http://localhost:4000/play/1080p/" + movieID + "/" + movieID + ".m3u8";
    } else if (plan === "Premium") {
        movieURL = "http://localhost:4000/play/4k/" + movieID + "/" + movieID + ".m3u8";
    }

    return movieURL;
};

const uploadMovie = (movieID, file) => {
    const data = new FormData();
    data.append("movie", file);
    return axios.post("http://localhost:4000/upload/" + movieID, data)
    // .then(res => { // then print response status
    //     console.log(res.statusText);
    // })
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
    if (!isNaN(id)) {
        id = id.toString();
    }
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

const getNewSeriesID = async () => {

    var id = -1;
    await firebase.firestore().collection("series").orderBy("id", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().id > id) {
                id = doc.data().id;
            }
        })
    });

    return new Promise((resolve, reject) => {
        resolve(id + 1);
    })
}

const getMovies = (startFrom) => {
    return firebase.firestore().collection("movies").orderBy("id", "asc").startAt(startFrom).endAt(startFrom + 10 - 1).get();
}

const removeMovie = async (id) => {

    await axios.get("http://localhost:4000/remove/" + id).then((res) => {
        console.log(res.data);
        removeMovieInfo(id);
    }).catch((e) => {
        console.log(e.message);
    });

    if (typeof id === 'number') {
        id = id.toString();
    }

    await firebase.firestore().collection("reviews").where("movieID", "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            firebase.firestore().collection("reviews").doc(doc.id).delete().then(() => {
                console.log("removed reviews of the movies");
            });
        });
    });

    await firebase.firestore().collection("playlist").where("movieID", "array-contains", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            var temp = doc.data();
            var temp_movieID = [];
            temp.movieID.forEach((item) => {
                if (item !== id) {
                    temp_movieID.push(item);
                }
            });
            firebase.firestore().collection("playlist").doc(doc.id).update({
                movieID: temp_movieID
            }).then(() => {
                console.log("removed movie from playlist");
            });
        });
    });

    return new Promise((resolve, reject) => {
        resolve();
    });

    // await removeMovieInfo().then(()=>{
    //     console.log("Remove Movie Info Success.");
    // });

}

const createSeriesInfo = (id, seriesInfo) => {
    return firebase.firestore().collection("series").doc(id).set(seriesInfo); //.then(docRef).catch(); is available
};

const updateSeriesInfo = (id, seriesInfo) => {
    return firebase.firestore().collection("series").doc(id).set(seriesInfo);
};  //.then().catch() is available

const removeSeriesInfo = (id) => {
    if (!isNaN(id)) {
        id = id.toString();
    }
    return firebase.firestore().collection("series").doc(id).delete();
};  //.then().catch() is available

const MediaModule = {
    getMovieStream,
    uploadMovie,
    removeMovie,
    movieInfo,
    createMovieInfo,
    updateMovieInfo,
    removeMovieInfo,
    createSeriesInfo,
    updateSeriesInfo,
    removeSeriesInfo,
    getMovieInfo,
    getMovieInfos,
    uploadPoster,
    getMoviePoster,
    getNewMovieID,
    getNewSeriesID,
    getMovies
}
export default MediaModule;