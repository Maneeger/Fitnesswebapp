import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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
const db = getFirestore(app);
const fb_modal = document.getElementById('fbModal');
const Loginmodal = document.getElementById('loginModal');
const errormsg = document.getElementById('error-msg');
const closebuttons = document.querySelectorAll('.close-modal');
const auth = getAuth(app); // Get the auth object


// login.js

const Login = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user.uid);
    showModal(Loginmodal)
    submit.disabled = true
    // Fetch user role from Firestore
    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User role:', userData.role);
    } else {
      console.log('No such document!');
    }

    // Redirect or update UI accordingly

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then((userSnap) => {
          if (userSnap.exists()) {
            const userData = userSnap.data();
            const role = userData.role; // Assuming "role" field exists in user data

            // Redirect based on user role
            if (role === "user") {
              window.location.href = "dashboarduser.html"
            } else if (role === "admin") {
              window.location.href = "dashboardadmin.html";
            } else {
              console.error("Invalid user role:", role);
              // Handle unexpected role (optional: log out user?)
            }
          } else {
            console.log('No such document!');
          }
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      }
    });
  }
  catch (error) {
    errormsg.innerHTML = `${error}`
    showModal(fb_modal)
    submit.disabled = false;
    console.error('Error logging in user:', error);
  }
}
//



// Function to show the modal
function showModal(modalElement) {
  modalElement.classList.add('show');
  // Add the 'show' class for visibility
}
closebuttons.forEach(closeButton => {
  closeButton.addEventListener('click', hideModal);
});

// Function to hide the modal
function hideModal() {
  const displayedModals = document.querySelectorAll('.modal.show');
  displayedModals.forEach(modal => modal.classList.remove('show'));
  // Remove the 'show' class to hide
}
document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  Login(email, password)
});

