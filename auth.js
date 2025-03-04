// ✅ Import Firebase Config from `firebase-config.js`
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ Initialize Firebase (Only If Not Already Initialized)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Google Login Function
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");

    if (loginBtn && logoutBtn && userInfo) {
        loginBtn.addEventListener("click", function () {
            const provider = new GoogleAuthProvider();
            
            // 🔄 Uses Redirect for Better Mobile Support
            signInWithRedirect(auth, provider).catch((error) => {
                console.error("Login Error:", error.message);
                alert("Login failed: " + error.message);
            });
        });

        // ✅ Logout Function
        logoutBtn.addEventListener("click", function () {
            signOut(auth)
                .then(() => {
                    userInfo.innerHTML = "Logged out";
                    loginBtn.style.display = "block";
                    logoutBtn.style.display = "none";
                })
                .catch((error) => {
                    console.error("Logout Error:", error.message);
                    alert("Logout failed: " + error.message);
                });
        });
    }
});

// ✅ Auto-Check User Login State
onAuthStateChanged(auth, (user) => {
    const userInfo = document.getElementById("user-info");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (user) {
        if (userInfo) userInfo.innerHTML = `Logged in as: ${user.displayName}`;
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
        
        // ✅ Only Allow Admin Page Access If Logged In
        if (window.location.pathname.includes("admin.html")) {
            console.log("User is authenticated, access granted.");
        }
    } else {
        if (userInfo) userInfo.innerHTML = "Not logged in";
        if (loginBtn) loginBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";

        // 🔴 Fixes Redirect Delay (Runs BEFORE Page Loads)
        if (window.location.pathname.includes("admin.html")) {
            window.location.replace("index.html"); // Instant Redirect
        }
    }
});