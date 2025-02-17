import { db } from "./firebaseconfig.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// 1. Get blog ID from URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

// 2. Get blog details from Firestore
async function getBlogDetails(blogId) {
    if (!blogId) {
        console.error("No blog ID found in URL");
        return;
    }

    const blogRef = doc(db, "blogs", blogId);
    const blogSnap = await getDoc(blogRef);

    if (blogSnap.exists()) {
        const blogData = blogSnap.data();
        displayBlog(blogData);
    } else {
        console.error("Blog not found!");
    }
}

// 3. Display Blog Details
function displayBlog(blog) {
    document.getElementById("blog-title").innerText = blog.title;
    document.getElementById("blog-image").src = blog.imageUrl;
    document.getElementById("blog-content").innerText = blog.description;
    document.getElementById("blog-date").innerText = blog.createdAt.toDate().toLocaleString();
}

// Call function to fetch blog details
getBlogDetails(blogId);
