import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhoto = document.getElementById("user-photo");
const userProfileName = document.getElementById("user-profile-name");
const userProfileImage = document.getElementById("user-profile-img");
const logoutBtn = document.querySelector('#logout-btn');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User Logged In:", user);

        
        loginBtn.classList.add('d-none');
        loginUser.classList.remove('d-none');

        
        userName.textContent = user.displayName || "No Name";
        userEmail.textContent = user.email || "No Email";
        userPhoto.src = user.photoURL || "default-avatar.png";
        userProfileName.textContent = user.displayName || "No Name";
        userProfileImage.src = user.photoURL || "default-avatar.png";

        try {
            let userData = await getUserData(user.uid);
            if (userData) {
                userName.textContent = userData.fullName || user.displayName || "No Name";
                userPhoto.src = userData.profileImage || user.photoURL || "default-avatar.png";
                userProfileName.textContent = userData.fullName || user.displayName || "No Name";
                userProfileImage.src = userData.profileImage || user.photoURL || "default-avatar.png";
            } else {
                console.warn("Firestore User Data Not Found");
            }
        } catch (error) {
            console.error("Error Fetching User Data:", error);
        }
    } else {
        console.warn("No user is signed in!");
        window.location.href = "login.html"; 
    }
});


async function getUserData(uid) {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let userData = null;

    querySnapshot.forEach((doc) => {
        userData = doc.data();
    });

    return userData;
}


if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log("User Logged Out");
            window.location.href = "login.html"; 
        } catch (error) {
            console.error("Error Logging Out:", error);
        }
    });
}


let userProfilePicUrl = "";
let myWidget = cloudinary.createUploadWidget({
    cloudName: 'de4qe4kqk', 
    uploadPreset: 'blog_upload_parest'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Upload Successful! Image URL:', result.info.secure_url);
        userProfilePicUrl = result.info.secure_url;
    } else if (error) {
        console.error('Upload Error:', error);
    }
});


document.getElementById("user-profile-name").addEventListener("click", function (event) {
    event.stopPropagation();
    myWidget.open();
}, false);
