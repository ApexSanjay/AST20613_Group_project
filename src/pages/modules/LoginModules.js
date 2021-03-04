import firebase from 'firebase/app';

const signup = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};   // .then().error() is available

const register = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};   // .then().error() is available

const logout = () => {
    return firebase.auth().signOut();
};   // .then().error() is available

const updateName = (newName) => {
    var user = firebase.auth().currentUser;

    return user.updateProfile({
        displayName: newName,
    });     // .then().error() is available
}

const updatePassword = (newPassword) => {
    var user = firebase.auth().currentUser;

    return user.updatePassword(newPassword).then(function () {
        // Update successful.
    });     // .then().error() is available
}

const updateIcon = () => {
    //todo
    return;
}

const getUserProfile = () => {
    //todo: icon

    var user = firebase.auth().currentUser;
    var name, email, icon = null;

    if (user != null) {
        name = user.displayName;
        email = user.email;
    }

    return { name, email, icon };
}

const LoginModules = {
    signup,
    register,
    logout,
    updateName,
    updateIcon,
    updatePassword,
    getUserProfile,
};  // after importing this file, use LoginModules.method_name() to access above methods

export default LoginModules;