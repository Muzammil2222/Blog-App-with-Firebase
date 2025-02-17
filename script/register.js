import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const form = document.querySelector('#form');
const email = document.querySelector('#registerEmail');
const password = document.querySelector('#registerPassword');
const fullName = document.querySelector('#fullName');


let userProfilePicUrl = ""

let myWidget = cloudinary.createUploadWidget({
    cloudName: 'de4qe4kqk', // Verify this
    uploadPreset: 'blog_upload_parest' // Update with the correct upload preset
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Upload Successful! Image URL:', result.info.secure_url);
        userProfilePicUrl = result.info.secure_url;
    } else if (error) {
        console.error('Upload Error:', error);
    }
});

document.getElementById("upload_widget").addEventListener("click", function (event) {
    event.stopPropagation();
    myWidget.open();
}, false);

form.addEventListener('submit', event => {
  event.preventDefault()
  console.log(email.value);
  console.log(password.value);
  console.log(fullName.value);
  
  createUserWithEmailAndPassword(auth, email.value, password.value )
      .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);

          try {
              const docRef = await addDoc(collection(db, "users"), {
                  fullName: fullName.value,
                  email: email.value,
                  profileImage: userProfilePicUrl,
                  uid: user.uid
              });
              console.log("Document written with ID: ", docRef.id);
              window.location.href = "index.html";
          } catch (e) {
               if (error.code === 'auth/email-already-in-use') {
      alert("Yeh email already registered hai!");
    } else {
      alert(error.message);
    }
          }
     })
      .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          p.innerHTML = errorMessage
      });
})
