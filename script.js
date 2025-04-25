// function showSignup() {
//   document.getElementById("loginForm").classList.add("hidden");
//   document.getElementById("signupForm").classList.remove("hidden");
// }

// function showLogin() {
//   document.getElementById("signupForm").classList.add("hidden");
//   document.getElementById("loginForm").classList.remove("hidden");
// }

// function login() {
//   const user = document.getElementById("loginUsername").value;
//   const pass = document.getElementById("loginPassword").value;
//   if (user && pass) {
//     window.location.href = "upload.html";
//   } else {
//     alert("Please enter username and password.");
//   }
// }

// function signup() {
//   const user = document.getElementById("signupUsername").value;
//   const pass = document.getElementById("signupPassword").value;
//   if (user && pass) {
//     alert("Signup successful. You can now login.");
//     showLogin();
//   } else {
//     alert("Please fill all signup fields.");
//   }
// }


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAe44p-GHUWgb5BLndsjMlpxlhj14Zr73A",
  authDomain: "health-connect-2d235.firebaseapp.com",
  databaseURL: "https://health-connect-2d235-default-rtdb.firebaseio.com",
  projectId: "health-connect-2d235",
  storageBucket: "health-connect-2d235.appspot.com",
  messagingSenderId: "466769571310",
  appId: "1:466769571310:web:d332ea19b8a85c528332ff",
  measurementId: "G-14SRZ07W2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Show Signup
window.showSignup = function () {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
};

// Show Login
window.showLogin = function () {
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
};

// Signup
window.signup = function () {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (username && password) {
    const userId = `user_${Date.now()}`;
    set(ref(db, 'users/' + userId), {
      username: username,
      password: password // ⚠️ Do not store plain text passwords in real apps
    }).then(() => {
      alert("Signup successful. You can now login.");
      showLogin();
    }).catch((error) => {
      console.error("Signup error:", error);
      alert("Signup failed.");
    });
  } else {
    alert("Please fill all signup fields.");
  }
};

// Login
window.login = function () {
  const enteredUsername = document.getElementById("loginUsername").value.trim();
  const enteredPassword = document.getElementById("loginPassword").value;

  if (!enteredUsername || !enteredPassword) {
    alert("Please enter username and password.");
    return;
  }

  const dbRef = ref(db);
  get(child(dbRef, 'users')).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      let matched = false;

      for (let key in users) {
        if (users[key].username === enteredUsername && users[key].password === enteredPassword) {
          matched = true;
          break;
        }
      }

      if (matched) {
        window.location.href = "upload.html"; // Redirect to upload page
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("No users found.");
    }
  }).catch((error) => {
    console.error("Login error:", error);
    alert("Login failed. Try again.");
  });
};
