//makeadmin
// makeAdmin.js
// makeAdmin.js
(function () {
    window.makeAdmin = async function (userId) {
        try {
            await firebase.firestore().doc(`users/${userId}`).update({
                role: "admin"
            });
            console.log("User role updated to admin");
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };
})();





// checkAdmin.js
// checkAdmin.js
(function () {
    window.isAdmin = async function (userId) {
        try {
            const userDoc = await firebase.firestore().doc(`users/${userId}`).get();
            if (userDoc.exists() && userDoc.data().role === "admin") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error checking admin role:", error);
            return false;
        }
    };
})();
