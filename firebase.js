
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAraxtT2NS8FQCzZRPtXAPfLKpGQTX3odQ",
    authDomain: "drive-live-1c830.firebaseapp.com",
    projectId: "drive-live-1c830",
    storageBucket: "drive-live-1c830.appspot.com",
    messagingSenderId: "634415858554",
    appId: "1:634415858554:web:d13a225c19cd81c38f8cc3"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage, db };
