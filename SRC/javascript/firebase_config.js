import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// firebaseConfig.js
const firebaseConfig = {
    apiKey: "AIzaSyCKdqKP4_U1ta2QQza6lGWyORYCNr2FzQs",
    authDomain: "fitness--aunthentication.firebaseapp.com",
    projectId: "fitness--aunthentication",
    storageBucket: "fitness--aunthentication.appspot.com",
    messagingSenderId: "796825069947",
    appId: "1:796825069947:web:1e369d2845677d993b75de"
};
// Ensure firebase is defined

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
