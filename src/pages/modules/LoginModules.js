import firebase from 'firebase/app';
import "firebase/auth";

const signup = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};   // .then().catch() is available

const register = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};   // .then().catch() is available

const logout = () => {
    return firebase.auth().signOut();
};   // .then().catch() is available

const updateName = (newName) => {
    var user = firebase.auth().currentUser;

    return user.updateProfile({
        displayName: newName,
    });     // .then().catch() is available
}

const updatePassword = (newPassword) => {
    var user = firebase.auth().currentUser;

    return user.updatePassword(newPassword);
}   // .then().catch() is available

const updateIcon = (newIcon) => {
    const uid = getUserProfile().uid;
    var user = firebase.auth().currentUser;

    const iconRef = firebase.storage().ref(`/users/` + uid + `/icon`);

    return iconRef.put(newIcon).then(
        ()=>{
            return iconRef.getDownloadURL().then((url)=>{
                console.log(url);
                return user.updateProfile({
                    photoURL: url
                });
            });
        }
    );
}

const getUserProfile = () => {
    var user = firebase.auth().currentUser;
    var name, email, icon = null, uid;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        uid = user.uid;
        icon = user.photoURL;
    }

    return { name, email, icon, uid };
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