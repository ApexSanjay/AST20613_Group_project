import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

// const searchMovie = (keywords) => {
//     return firebase.firestore().collection("movies")
//         .where("title", ">=", keywords)
//         .where("id", "==", parseInt(keywords))
//         .get();
// };

// const getAllMovies = () => {
//     return firebase.firestore().collection("movies").orderBy("id").get();
// }

// const suggestMovie = async () => {

//     const getRandomId = (max) => {

//         var id = parseInt(Math.random() * 1000);
//         id %= max;
//         id++;

//         return id;
//     }

//     var movies = [];
//     var res = [];

//     await getAllMovies().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             movies.push(doc.data());
//         });
//     });

//     for (var i = 0; i < 10; i++) {
//         res.push(movies[getRandomId(movies.length)]);
//     }

//     return new Promise((resolve, reject) => {
//         resolve(res);
//     });

// };

// const suggestSeries = async () => {

//     var res = [];

//     await getAllSeries().then((allSeries) => {
//         res = allSeries
//     });

//     return new Promise((resolve, reject) => {
//         resolve(res);
//     });
// };

// const createPlaylist = (name, movieIDList = [], seriesIDList = []) => {
//     const uid = firebase.auth().currentUser.uid;
//     return firebase.firestore().collection("playlists").add({
//         userID: uid,
//         title: name,
//         movieID: movieIDList,
//         seriesID: seriesIDList
//     });
// };  //list is an array of movie id  //.then(docRef).catch is available

// const updatePlaylist = async (playlistID, movieIDList = null, seriesIDList = null) => {
//     if (movieIDList !== null) {
//         await firebase.firestore().collection("playlists").doc(playlistID).update({
//             movieID: movieIDList,
//         });
//     }

//     if (seriesIDList !== null){
//         await firebase.firestore().collection("playlists").doc(playlistID).update({
//             seriesID: seriesIDList,
//         });
//     }

//     return new Promise((resolve, reject) => {
//         resolve();
//     });
//     // return firebase.firestore().collection("playlists").doc(playlistID).update({
//     //     movieID: movieIDList,
//     // });
// };  //.then().catch() is available

// const removePlaylist = (playlistID) => {
//     return firebase.firestore().collection("playlists").doc(playlistID).delete();
// };  //.then().catch() is available

// const getPlaylist = (playlistID) => {
//     return firebase.firestore().collection("playlists").doc(playlistID).get();
// };  //.then().catch() is available

// const getAllPlaylist = () => {
//     const uid = firebase.auth().currentUser.uid;
//     return firebase.firestore().collection("playlists").where("userID", "==", uid).get();
// }

// const createReview = (movieID, review, userName) => {
//     var userID = firebase.auth().currentUser.uid;

//     return firebase.firestore().collection("reviews").add({
//         movieID: movieID,
//         review: review,
//         userID: userID,
//         userName: userName,
//         timestamp: new Date()
//     });  //.then().catch() is available
// };

// const removeReview = (reviewID) => {
//     return firebase.firestore().collection("reviews").doc(reviewID).delete();
// };  //.then().catch() is available

// const getReviewSnapshot = (movieID) => {
//     return firebase.firestore().collection("reviews").where("movieID", "==", movieID)
//         // .onSnapshot(
//         //     (querySnapshot) => {
//         //         querySnapshot.forEach((doc) => {
//         //             doc.data();
//         //         });
//         //     }
//         // )
//         ;
// };  //


// const getReviewOnce = (movieID) => {
//     return firebase.firestore().collection("reviews").where("movieID", "==", movieID);
// };  //.then().catch() is available




// const getSeriesReviewSnapshot = (seriesID) => {
//     return firebase.firestore().collection("seriesReviews").where("seriesID", "==", seriesID)
//         // .onSnapshot(
//         //     (querySnapshot) => {
//         //         querySnapshot.forEach((doc) => {
//         //             doc.data();
//         //         });
//         //     }
//         // )
//         ;
// };  //

// const createSeriesReview = (seriesID, review, userName) => {
//     var userID = firebase.auth().currentUser.uid;

//     return firebase.firestore().collection("seriesReviews").add({
//         seriesID: seriesID,
//         review: review,
//         userID: userID,
//         userName: userName,
//         timestamp: new Date()
//     });  //.then().catch() is available
// };


// const removeSeriesReview = (reviewID) => {
//     return firebase.firestore().collection("seriesReviews").doc(reviewID).delete();
// };  //.then().catch() is available

// const getAllSeries = async () => {

//     var res = [];

//     await firebase.firestore().collection("series").orderBy("id").get().then((querySnapshot) => {
//         if (!querySnapshot.empty) {
//             querySnapshot.forEach((doc) => {
//                 res.push(doc.data());
//             });
//         }
//     });

//     return new Promise((resolve, reject) => {
//         resolve(res);
//     });
// }

// const BrowsingModules = {
//     searchMovie,
//     suggestMovie,
//     createPlaylist,
//     updatePlaylist,
//     removePlaylist,
//     getPlaylist,
//     getAllPlaylist,
//     createReview,
//     removeReview,
//     getReviewSnapshot,
//     getReviewOnce,
//     getUser,
//     getUserIcon,
//     getAllMovies,

//     getSeriesReviewSnapshot,
//     createSeriesReview,
//     removeSeriesReview,
//     getAllSeries,
//     suggestSeries,

// };

// export default BrowsingModules;

class Playlist {
    createPlaylist = (name, movieIDList = [], seriesIDList = []) => {
        const uid = firebase.auth().currentUser.uid;
        return firebase.firestore().collection("playlists").add({
            userID: uid,
            title: name,
            movieID: movieIDList,
            seriesID: seriesIDList
        });
    };  //list is an array of movie id  //.then(docRef).catch is available

    updatePlaylist = async (playlistID, movieIDList = null, seriesIDList = null) => {
        if (movieIDList !== null) {
            await firebase.firestore().collection("playlists").doc(playlistID).update({
                movieID: movieIDList,
            });
        }

        if (seriesIDList !== null) {
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

    removePlaylist = (playlistID) => {
        return firebase.firestore().collection("playlists").doc(playlistID).delete();
    };  //.then().catch() is available

    getPlaylist = (playlistID) => {
        return firebase.firestore().collection("playlists").doc(playlistID).get();
    };  //.then().catch() is available

    getAllPlaylist = () => {
        const uid = firebase.auth().currentUser.uid;
        return firebase.firestore().collection("playlists").where("userID", "==", uid).get();
    }
}

class Review {

    createReview = (movieID, review, userName) => {
        var userID = firebase.auth().currentUser.uid;

        return firebase.firestore().collection("reviews").add({
            movieID: movieID,
            review: review,
            userID: userID,
            userName: userName,
            timestamp: new Date()
        });  //.then().catch() is available
    };

    removeReview = (reviewID) => {
        return firebase.firestore().collection("reviews").doc(reviewID).delete();
    };  //.then().catch() is available

    getReviewSnapshot = (movieID) => {
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

    getReviewOnce = (movieID) => {
        return firebase.firestore().collection("reviews").where("movieID", "==", movieID);
    };  //.then().catch() is available


    getSeriesReviewSnapshot = (seriesID) => {
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

    createSeriesReview = (seriesID, review, userName) => {
        var userID = firebase.auth().currentUser.uid;

        return firebase.firestore().collection("seriesReviews").add({
            seriesID: seriesID,
            review: review,
            userID: userID,
            userName: userName,
            timestamp: new Date()
        });  //.then().catch() is available
    };

    removeSeriesReview = (reviewID) => {
        return firebase.firestore().collection("seriesReviews").doc(reviewID).delete();
    };  //.then().catch() is available

}

class Suggest {
    getAllSeries = async () => {

        var res = [];

        await firebase.firestore().collection("series").orderBy("id").get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                });
            }
        });

        return new Promise((resolve, reject) => {
            resolve(res);
        });
    }

    searchMovie = (keywords) => {
        return firebase.firestore().collection("movies")
            .where("title", ">=", keywords)
            .where("id", "==", parseInt(keywords))
            .get();
    };

    getAllMovies = () => {
        return firebase.firestore().collection("movies").orderBy("id").get();
    }

    suggestMovie = async () => {

        const getRandomId = (max) => {

            var id = parseInt(Math.random() * 1000);
            id %= max;
            id++;

            return id;
        }

        var movies = [];
        var res = [];

        await firebase.firestore().collection("movies").orderBy("id").get().then((querySnapshot) => {
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

    suggestSeries = async () => {

        const getAllSeries = async () => {

            var res = [];
    
            await firebase.firestore().collection("series").orderBy("id").get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        res.push(doc.data());
                    });
                }
            });
    
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        }

        var res = [];

        await getAllSeries().then((allSeries) => {
            res = allSeries
        });

        return new Promise((resolve, reject) => {
            resolve(res);
        });
    };
}

export default { Review, Playlist , Suggest};