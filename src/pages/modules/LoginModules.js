import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};   // .then().catch() is available

const register = (email, password, plan) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential)=>{
        var uid = userCredential.user.uid;
        return firebase.firestore().collection("plan").add({
            userID: uid,
            plan: plan
        });
    });
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
        () => {
            return iconRef.getDownloadURL().then((url) => {
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

const getLoginStatus = () => {
    var user = firebase.auth().currentUser;
    if (user != null) {
        return true;
    } else {
        return false;
    }
}

const createCardInfo = (userID, cvv, cardNum, explorationDate, firstName, lastName) => {
    const info = {
        UserID: userID,
        CVV: cvv,
        CardNumber: cardNum,
        ExplorationDate: explorationDate,
        FirstName: firstName,
        LastName: lastName,
    }
    console.log(info);

    return firebase.firestore().collection("cardInfo").add(info);
}

const updateCardInfo = (cardID, userID, cvv, cardNum, explorationDate, firstName, lastName) => {
    const info = {
        UserID: userID,
        CVV: cvv,
        CardNumber: cardNum,
        ExplorationDate: explorationDate,
        FirstName: firstName,
        LastName: lastName,
    }
    console.log(info);
    return firebase.firestore().collection("cardInfo").doc(cardID).update(info);
}

const getCardInfo = (userID) => {
    return firebase.firestore().collection("cardInfo").where("UserID", "==", userID).get();
    //(querySnapshot) => {
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    // });
}

const getAdminUser = (userID) => {
    return firebase.firestore().collection("admins").where("userID", "==", userID).get();
        //(querySnapshot) => {
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    // });
}

const LoginModules = {
    login,
    register,
    logout,
    updateName,
    updateIcon,
    updatePassword,
    getUserProfile,
    getLoginStatus,
    createCardInfo,
    updateCardInfo,
    getCardInfo,
    getAdminUser
};  // after importing this file, use LoginModules.method_name() to access above methods

export default LoginModules;