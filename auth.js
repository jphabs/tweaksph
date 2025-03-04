import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const adminPanel = document.getElementById("adminPanel");
    const loginBtn = document.getElementById("email-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const userInfo = document.getElementById("user-info");

    if (loginBtn && logoutBtn && emailInput && passwordInput) {
        loginBtn.addEventListener("click", async () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                alert("❌ Please enter both email and password.");
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("✅ Logged in:", userCredential.user);
                updateUI(userCredential.user);
            } catch (error) {
                console.error("❌ Login Error:", error.message);
                alert("Login failed: " + error.message);
            }
        });

        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                console.log("✅ Logged out.");
                updateUI(null);
            } catch (error) {
                console.error("❌ Logout Error:", error.message);
                alert("Logout failed: " + error.message);
            }
        });
    }
});

// ✅ Auto-Check User Login State
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

// ✅ Update UI Based on Auth State
function updateUI(user) {
    const loginScreen = document.getElementById("loginScreen");
    const adminPanel = document.getElementById("adminPanel");
    const userInfo = document.getElementById("user-info");

    if (user) {
        if (userInfo) userInfo.innerHTML = `✅ Logged in as: ${user.email}`;
        if (loginScreen) loginScreen.style.display = "none";
        if (adminPanel) adminPanel.style.display = "block"; // ✅ Show Admin Panel
    } else {
        if (userInfo) userInfo.innerHTML = "🔒 Not logged in";
        if (loginScreen) loginScreen.style.display = "block"; // ✅ Show Login Screen
        if (adminPanel) adminPanel.style.display = "none";   // ✅ Hide Admin Panel

        // 🔴 Redirect If Trying to Access Admin Page Without Login
        if (window.location.pathname.includes("/tweaksph/admin.html")) {
            window.location.replace("/tweaksph/index.html");
        }
    }
}