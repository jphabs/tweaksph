// ✅ Import Firebase Config
import { firebaseConfig } from "./firebase-config.js";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// ✅ Email/Password Login
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginBtn && logoutBtn && userInfo) {
        loginBtn.addEventListener("click", function () {
            const email = emailInput.value;
            const password = passwordInput.value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Logged in:", user);
                    userInfo.innerHTML = `Logged in as: ${user.email}`;
                    loginBtn.style.display = "none";
                    logoutBtn.style.display = "block";
                })
                .catch((error) => {
                    console.error("Login Error:", error.message);
                    alert("Login failed: " + error.message);
                });
        });

        logoutBtn.addEventListener("click", function () {
            auth.signOut()
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
auth.onAuthStateChanged((user) => {
    const userInfo = document.getElementById("user-info");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (user) {
        if (userInfo) userInfo.innerHTML = `Logged in as: ${user.email}`;
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";

        // ✅ Redirect to Admin Page If Logged In
        if (window.location.pathname.includes("admin.html")) {
            console.log("User is authenticated, access granted.");
        }
    } else {
        if (userInfo) userInfo.innerHTML = "Not logged in";
        if (loginBtn) loginBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";

        // 🔴 Redirect If Trying to Access Admin Page Without Login
        if (window.location.pathname.includes("admin.html")) {
            window.location.replace("index.html");
        }
    }
});