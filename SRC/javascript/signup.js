
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
const db = getFirestore(app);
const fb_modal = document.getElementById('fbModal');
const error_msg = document.getElementById('error-msg')
const signupmodal = document.getElementById('signupSuccessModal');
const closeButtons = document.querySelectorAll('.close-modal');
const form = document.getElementById('signupForm');



const signUp = async (email, password) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential)
        const user = userCredential.user;
        const formData = new FormData(form); // Get form data
        const username = formData.get('username');
        const fullname = formData.get('fullname');
        const role = form.elements['role'].value;
        console.log(role)
        // 
        console.log('User created:', user.uid);
        showModal(signupmodal)
        submit.disabled = true

        // Add user role to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: username,
            fullname: fullname,
            role: role // Assign role as 'admin'
        });
        console.log('User role set to user');
        window.location.href = './Login.html';
    } catch (error) {
        error_msg.innerHTML = `${error}`
        showModal(fb_modal)
        submit.disabled = false
        console.error('Error creating user:', error);
    }
};


const emptymodal = document.getElementById('emptyModal')





// Function to show the modal
function showModal(modalElement) {
    modalElement.classList.add('show');
    // Add the 'show' class for visibility
}
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', hideModal);
});

// Function to hide the modal
function hideModal() {
    const displayedModals = document.querySelectorAll('.modal.show');
    displayedModals.forEach(modal => modal.classList.remove('show'));
    // Remove the 'show' class to hide
}


// Function to check for empty fields
function hasEmptyFields(form) {
    const inputs = form.querySelectorAll('input'); // Select required inputs and textareas

    for (const input of inputs) {
        if (input.value.trim() === '') {
            return true; // If any required field is empty, return true
        }
    }
    return false; // If all required fields are filled, return false
}





document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    if (hasEmptyFields(form)) {
        // / Prevent form submission if there are empty fields
        ; // Show the modal with the warning message
        showModal(emptymodal)
    }
    else {
        submit.disabled = true

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signUp(email, password);


        // ... (Firebase authentication logic using username, email, password)

        // Save user data with role to Firestore (after successful signup)
    }


});