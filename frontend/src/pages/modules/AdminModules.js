import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const addAdmin = (userID, role) => {
    return firebase.firestore().collection("admins").add({
        userID: userID,
        role: role
    });
}

const AdminModules = {
    addAdmin,

};

export default AdminModules;