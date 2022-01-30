import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpLJR4qWmwg07hqEThxmVxwDv7sjk0054",
  authDomain: "reac-app-7584d.firebaseapp.com",
  projectId: "reac-app-7584d",
  storageBucket: "reac-app-7584d.appspot.com",
  messagingSenderId: "462603068801",
  appId: "1:462603068801:web:253dba6be062fe81d5f480",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
