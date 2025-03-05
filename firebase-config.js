import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("email-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userInfo = document.getElementById("user-info");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginScreen = document.getElementById("loginScreen");
    const adminPanel = document.getElementById("adminPanel");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                alert("❌ Please enter both email and password.");
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("✅ Logged in:", user);
                    updateUI(user);
                })
                .catch((error) => {
                    console.error("❌ Login Error:", error.message);
                    alert("Login failed: " + error.message);
                });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            signOut(auth)
                .then(() => {
                    console.log("✅ Logged out.");
                    updateUI(null);
                })
                .catch((error) => {
                    console.error("❌ Logout Error:", error.message);
                    alert("Logout failed: " + error.message);
                });
        });
    }

    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });

    function updateUI(user) {
        if (user) {
            if (userInfo) userInfo.innerHTML = `✅ Logged in as: ${user.email}`;
            if (loginScreen) loginScreen.style.display = "none";
            if (adminPanel) adminPanel.style.display = "block";
        } else {
            if (userInfo) userInfo.innerHTML = "🔒 Not logged in";
            if (loginScreen) loginScreen.style.display = "block";
            if (adminPanel) adminPanel.style.display = "none";
        }
    }
});