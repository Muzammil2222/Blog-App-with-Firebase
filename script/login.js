import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const form = document.querySelector('form');
const email = document.querySelector('#loginEmail');
const password = document.querySelector('#loginPassword');


form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(email.value);
    console.log(password.value);



signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location = "index.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})
  