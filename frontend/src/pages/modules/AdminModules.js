import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const addAdmin = (userID, role) => {
    return firebase.firestore().collection("admins").add({
        userID: userID,
        role: role
    });
}

const getAllAdmin = () => {
    return firebase.firestore().collection("admins").get();
}

const AdminModules = {
    addAdmin,
    getAllAdmin
};

export default AdminModules;