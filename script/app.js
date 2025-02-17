import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const userName = document.querySelector('#user-profile-name');
const userProfileImage = document.querySelector('#user-profile-img');
const logoutBtn = document.querySelector('#logout-btn');


onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);
        loginBtn.classList.add('d-none');
        loginUser.classList.remove('d-none');
        fetchBlogs();

        try {
            let users = await getDataFromFirestore(user.uid); 
            if (users) {
                userName.innerHTML = users.fullName;
                userProfileImage.src = users.profileImage || 'default_profile.png'; 
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
    const q = query(collection(db, "users"), where("uid", "==", uid)); 
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
        window.location.href = "login.html"; 
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Error logging out: " + error.message);
    }
});
async function fetchBlogs() {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = ""; 

    const user = auth.currentUser;
    if (!user) {
        console.log("No user is logged in.");
        return;
    }

    const q = query(collection(db, "blogs"));

    onSnapshot(q, (querySnapshot) => {
        blogList.innerHTML = ""; 

        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const shortDescription = blog.description.length > 100 ? blog.description.substring(0, 100) + "..." : blog.description;

            const blogItem = document.createElement("div");
            blogItem.classList.add("col-md-4", "mb-3");
            blogItem.innerHTML = `
                <div class="card shadow-lg border-0">
                    <img src="${blog.imageUrl}" class="card-img-top" alt="Blog Image">
                    <div class="card-body blog_card">
                        <p class="card-text">${blog.createdAt.toDate().toLocaleString()}</p>
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${shortDescription}</p>
                        <a href="singleuser.html?id=${doc.id}" class="btn btn-success">Read More</a>
                    </div>
                </div>
            `;
            blogList.appendChild(blogItem);
        });
    });
}



