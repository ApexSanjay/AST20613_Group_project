var fs = require('fs');
var firebase = require('firebase');
//Firebase Content
const firebaseConfig = {
    apiKey: "AIzaSyDvYUabb_1GGZOHPLa2gOz3nqWGG5sYKIs",
    authDomain: "redstream-d1a42.firebaseapp.com",
    projectId: "redstream-d1a42",
    storageBucket: "redstream-d1a42.appspot.com",
    messagingSenderId: "194906792996",
    appId: "1:194906792996:web:7560022676a7f7161b24b1",
    measurementId: "G-3ESESXD7K5"
};

firebase.initializeApp(firebaseConfig);

var haveErrorData = false;

fs.readFile('seriesData.json', 'utf8', (err, fileContent) => {
    if (err) {
    } else {
        data = JSON.parse(fileContent.toString());
        // console.log(data[0]);
        console.log("Checking data...");
        var count = 0;
        for (var i in data) {
            count++;
            if (!data[i].id) {
                console.log(count, "id");
                haveErrorData = true;
            }
            if (!data[i].title) {
                console.log(count, "title");
                haveErrorData = true;
            }
            if (!data[i].description) {
                console.log(count, "description");
                haveErrorData = true;
            }
            if (!data[i].Director) {
                console.log(count, "Director");
                haveErrorData = true;
            }
            if (!data[i].cast) {
                console.log(count, "cast");
                haveErrorData = true;
            }
            if (!data[i].trailerURL) {
                console.log(count, "trailerURL");
                haveErrorData = true;
            }
            if (!data[i].imdbReview) {
                console.log(count, "imdbReview");
                haveErrorData = true;
            }
            if (!data[i].movieLength) {
                console.log(count, "showLength");
                haveErrorData = true;
            }
            if (!data[i].movieReleaseDate) {
                console.log(count, "showReleaseDate");
                haveErrorData = true;
            }
        }
        if (haveErrorData) {
            console.log("Please fix before uploading");
        } else {
            console.log("regenerating id");
            var newData = [];
            count = 1;
            for(var i in data){
                newData.push({
                    id: (count++),
                    title: data[i].title,
                    description: data[i].description,
                    Director: data[i].Director,
                    cast: data[i].cast,
                    trailerURL: data[i].trailerURL,
                    imdbReview: data[i].imdbReview,
                    showLength: data[i].showLength,
                    showReleaseDate: data[i].showReleaseDate,
                    //Test this
                    seasonOne:data[i].seasonOne,
                    seasonTwo:data[i].seasonTwo,
                    seasonThree:data[i].seasonThree,
                    seasonFour:data[i].seasonFour,
                    seasonFive:data[i].seasonFive
                });
            }
            console.log("Uploading data...");
            for (var i in newData) {
                // console.log(newData[i].id);
                firebase.firestore().collection("test").doc(newData[i].id.toString()).set(newData[i]).then(() => { console.log("success") }).catch((e) => { console.log("fail"); });
            }
            console.log("end");
        }
    }
})