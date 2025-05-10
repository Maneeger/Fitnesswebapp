
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKdqKP4_U1ta2QQza6lGWyORYCNr2FzQs",
    authDomain: "fitness--aunthentication.firebaseapp.com",
    projectId: "fitness--aunthentication",
    storageBucket: "fitness--aunthentication.appspot.com",
    messagingSenderId: "796825069947",
    appId: "1:796825069947:web:1e369d2845677d993b75de"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (email, password) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user.uid);

        // Add user role to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: 'admin' // Assign role as 'admin'
        });
        console.log('User role set to admin');
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signUp(email, password);
});