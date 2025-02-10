import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const userName = document.querySelector('#user-profile-name');
const userProfileImage = document.querySelector('#user-profile-img');
const defaultDiv = document.querySelector('default');
const logoutBtn = document.querySelector('#logout-btn');


onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);
        loginBtn.classList.add('d-none');
        loginUser.classList.remove('d-none');

        try {
            let users = await getDataFromFirestore(user.uid); // Pass UID to function
            if (users) {
                userName.innerHTML = users.fullName;
                userProfileImage.src = users.profileImage || 'default_profile.png'; // Default image fallback
            } else {
                console.error('User data not found in Firestore');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        window.location = "login.html";
    }
});


async function getDataFromFirestore(uid) {
    let user = null;
    const q = query(collection(db, "users"), where("uid", "==", uid)); // Use UID from function parameter
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        user = doc.data();
    });

    return user;
}


logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
        window.location.href = "login.html"; // Redirect properly
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Error logging out: " + error.message);
    }
});

