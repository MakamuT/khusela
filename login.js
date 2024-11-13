import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWMV7gFn2n6WR3_rX01hk1VGGDOb2BihY",
  authDomain: "khusela-25dd4.firebaseapp.com",
  projectId: "khusela-25dd4",
  storageBucket: "khusela-25dd4.firebasestorage.app",
  messagingSenderId: "712524989014",
  appId: "1:712524989014:web:59c18ff9b4938f2ea331f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//input fields
const email = document.getElementById('emailLink').value;
const password = document.getElementById('password').value;
//submit button
const submit = document.getElementById('logIn');
submit.addEventListener('click',
  function(event){
    event.preventDefault()
    const email = document.getElementById("emailLink").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("Login Successful")
        window.location.href="chat.html"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });

  })
