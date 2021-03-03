import firebase from 'firebase/app';
// import auth from "firebase/auth";

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

const signup = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};   // .then().error() is available

const register = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};   // .then().error() is available

const logout = () => {
    return firebase.auth().signOut();
};   // .then().error() is available

const LoginModules = {
    signup,
    register,
    logout,
};  // after import this file, use LoginModules.method-name() to access above methods

export default LoginModules;