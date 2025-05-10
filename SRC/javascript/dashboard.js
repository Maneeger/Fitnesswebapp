import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
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

const displayUserInfo = async (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            document.getElementById('user-info').innerText = `Email: ${userData.email}, Role: ${userData.role}`;
        } else {
            console.log('No such document!');
        }
    } else {
        document.getElementById('user-info').innerText = 'No user is signed in.';
    }
};

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    displayUserInfo(user);
});
//dom
const dashboardContent = document.querySelector('.dashboard');
const links = document.querySelectorAll('.link');
const contentDivs = document.querySelectorAll('#profile, #exercise, #nutrition,#exit,#settings'); // Select all content divs

// links.forEach(link => {
//     link.addEventListener('click', (event) => {
//         event.preventDefault();
//         dashboardContent.style.display = 'none'

//         // Get the clicked link element using event.target
//         const clickedLink = event.target;

//         // Extract target content ID from clicked link's href attribute
//         const targetContent = clickedLink.getAttribute('href').substring(1);

//         let matchingDiv;
//         for (const div of contentDivs) {
//             if (div.id === targetContent) {
//                 matchingDiv = div;
//                 break; // Exit the loop once a match is found
//             }
//         }
//         // Handle potential case of no matching content
//         if (matchingDiv) {
//             // Toggle visibility using classList

//             matchingDiv.classList.remove('hide');
//             // Remove active class from all divs
//             // matchingDiv.classList.add('hide'); // Toggle active class on the matching div
//         }
//         else {
//             console.error(`Content ID "${targetContent}" not found.`);
//         }

//     });
// });


// Find the matching content div using a loop
// Alternative (using separate show/hide classes):
// contentDivs.forEach(div => div.classList.remove('show', 'hide'));
// matchingDiv.classList.add('show'); // Add show class to the matching div

// Alternative: Update dashboardContent with the content of the matching div
// dashboardContent.innerHTML = matchingDiv ? matchingDiv.innerHTML : ''; // Update only if a match is found


// closer 
const closer = document.createElement('a');
// exitmodalfunctions//
const cancelExit = document.querySelector('.cancel')
const proceedExit = document.querySelector('.proceed')
proceedExit.addEventListener('click', function () {
    window.location.href = './Home.html';
})

cancelExit.addEventListener('click', function () {
    dashboardContent.classList.remove('hidden')
    contentDivs.forEach((div) => {
        div.classList.add('hidden')
    })
})
component_closer(closer, 'click', function () {
    dashboardContent.classList.remove('hidden')
    contentDivs.forEach((div) => {
        div.classList.add('hidden')
    })
})
closer.innerHTML = `Back to dashboard`
closer.classList.add('closer')

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedLink = e.target;
        console.log(clickedLink)
        dashboardContent.classList.add('hidden')
        console.log(dashboardContent)
        const targetid = clickedLink.getAttribute('href');
        console.log(targetid)
        const sect = document.querySelector(targetid)
        console.log(sect)
        //closer/back to dashboard

        if (targetid === '#exit') {
            // Show exit section
            const exitSection = document.querySelector('#exit');
            exitSection.classList.remove('hidden');
        } else {
            // Show other sections
            sect.prepend(closer); // Add back to dashboard link
            sect.classList.remove('hidden');
        }

    })
})

function component_closer(element, event, callback) {
    element.addEventListener(event, callback)
    return callback
}

