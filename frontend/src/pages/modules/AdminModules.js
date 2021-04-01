import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const addAdmin = (userID, role) => {
    return firebase.firestore().collection("admins").add({
        userID: userID,
        role: role
    });
}

const removeAdmin = (userID) => {
    return firebase.firestore().collection("admins").where("userID", "==", userID).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var docID = doc.id;
            return firebase.firestore().collection("admins").doc(docID).delete().then(()=>{
                console.log("remove success");
                window.location.reload();   //reload page
            });
        });
    })
}

const getAllAdmin = () => {
    return firebase.firestore().collection("admins").get();
}

const getAdminEmail = (adminUserID) => {
    return firebase.firestore().collection("users").where("userID", "==", adminUserID).get();
}

const AdminModules = {
    addAdmin,
    removeAdmin,
    getAllAdmin,
    getAdminEmail
};

export default AdminModules;