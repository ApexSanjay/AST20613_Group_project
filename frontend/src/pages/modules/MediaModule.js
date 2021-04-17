import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import axios from 'axios';

class MovieInfo {

    getMovieStream = (movieID, plan = "Basic") => {

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

    uploadMovie = (movieID, file) => {
        const data = new FormData();
        data.append("movie", file);
        return axios.post("http://localhost:4000/upload/" + movieID, data)
        // .then(res => { // then print response status
        //     console.log(res.statusText);
        // })
    };

    uploadPoster = (movieID, file) => {
        return firebase.storage().ref("posters/" + movieID + ".jpg").put(file);
        //.then .catch
    };

    createMovieInfo = (movieID, movieInfo) => {
        return firebase.firestore().collection("movies").doc(movieID).set(movieInfo); //.then(docRef).catch(); is available
    };

    updateMovieInfo = (id, movieInfo) => {
        return firebase.firestore().collection("movies").doc(id).set(movieInfo);
    };  //.then().catch() is available

    removeMovieInfo = (id) => {
        if (!isNaN(id)) {
            id = id.toString();
        }
        return firebase.firestore().collection("movies").doc(id).delete();
    };  //.then().catch() is available

    getMovieInfo = (id) => {
        return firebase.firestore().collection("movies").doc(id).get();
    };  //.then(doc).catch() is available

    getMovieInfos = (IDList = []) => {
        if (IDList.length !== 0) {
            return firebase.firestore().collection("movies").where("id", "in", IDList).get();
        } else {
            return firebase.firestore().collection("movies").where("id", "==", -99999).get();
        }
    };

    getMoviePoster = (movieID) => {
        return firebase.storage().ref("posters/" + movieID + ".jpg").getDownloadURL();  //.then.catch
    }

    getNewMovieID = () => {
        return firebase.firestore().collection("movies").orderBy("id", "desc").get();
    }

    getMovies = (startFrom) => {
        return firebase.firestore().collection("movies").orderBy("id", "asc").startAt(startFrom).endAt(startFrom + 10 - 1).get();
    }

    removeMovie = async (id) => {

        await axios.get("http://localhost:4000/remove/" + id).then((res) => {
            console.log(res.data);
            // removeMovieInfo(id);
        }).catch((e) => {
            console.log(e.message);
        });

        await firebase.firestore().collection("movies").doc(id).delete();

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

}

class SeriesInfo {

    uploadSeriesPoster = (id, file) => {
        return firebase.storage().ref("seriesPosters/" + id + ".jpg").put(file);
        //.then .catch
    };

    getNewSeriesID = async () => {

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


    createSeriesInfo = (id, seriesInfo) => {
        console.log(seriesInfo);
        return firebase.firestore().collection("series").doc(id).set(seriesInfo); //.then(docRef).catch(); is available
    };

    updateSeriesInfo = (id, seriesInfo) => {
        return firebase.firestore().collection("series").doc(id).set(seriesInfo);
    };  //.then().catch() is available

    removeSeriesInfo = (id) => {
        if (!isNaN(id)) {
            id = id.toString();
        }
        return firebase.firestore().collection("series").doc(id).delete();
    };  //.then().catch() is available

    getSeriesInfo = async (id) => {

        var data = null;

        await firebase.firestore().collection("series").doc(id).get().then((doc) => {
            data = doc.data();
        });

        return new Promise((resolve, reject) => {
            if (data !== null) {
                resolve(data);
            } else {
                reject();
            }
        });
    };  //.then(doc).catch() is available


    getSeriesInfos = (IDList = []) => {
        if (IDList.length !== 0) {
            return firebase.firestore().collection("series").where("id", "in", IDList).get();
        } else {
            return firebase.firestore().collection("series").where("id", "==", -99999).get();
        }
    };

    getSeriesPoster = (id) => {
        return firebase.storage().ref("seriesPosters/" + id + ".jpg").getDownloadURL();  //.then.catch
    }

    uploadSeries = (seriesID, ep, file) => {
        const data = new FormData();
        data.append("series", file);
        return axios.post("http://localhost:4000/uploadSeries/" + seriesID + "/" + ep, data);
        // .then(res => { // then print response status
        //     console.log(res.statusText);
        // })
    }

    getSeriesStream = (seriesID, ep, plan = "Basic") => {

        var movieURL = "http://localhost:4000/playSeries/480p/" + seriesID + "/" + ep + "/" + ep + ".m3u8";
        if (plan === "Basic") {
            movieURL = "http://localhost:4000/playSeries/480p/" + seriesID + "/" + ep+ "/" + ep + ".m3u8";
        } else if (plan === "Standard") {
            movieURL = "http://localhost:4000/playSeries/1080p/" + seriesID + "/" + ep+ "/" + ep + ".m3u8";
        } else if (plan === "Premium") {
            movieURL = "http://localhost:4000/playSeries/4k/" + seriesID + "/" + ep+ "/" + ep + ".m3u8";
        }

        return movieURL;
    };
}

export default { MovieInfo, SeriesInfo }