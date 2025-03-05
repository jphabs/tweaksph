document.addEventListener("DOMContentLoaded", () => {
    // ✅ Ensure Firebase is Loaded
    if (!window.firebase) {
        console.error("❌ Firebase not loaded! Check your Firebase config.");
        return;
    }

    const auth = firebase.auth(); // ✅ Use Firebase Auth
    const loginBtn = document.getElementById("email-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // ✅ Handle Login
    loginBtn?.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert("❌ Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log("✅ Logged in:", userCredential.user);
            updateUI(userCredential.user);
        } catch (error) {
            console.error("❌ Login Error:", error.message);
            alert("Login failed: " + error.message);
        }
    });

    // ✅ Handle Logout
    logoutBtn?.addEventListener("click", async () => {
        try {
            await auth.signOut();
            console.log("✅ Logged out.");
            updateUI(null);
        } catch (error) {
            console.error("❌ Logout Error:", error.message);
            alert("Logout failed: " + error.message);
        }
    });

    // ✅ Listen for Auth Changes
    auth.onAuthStateChanged((user) => {
        updateUI(user);
    });

    // ✅ Update UI & Redirect if Not Logged In
    function updateUI(user) {
        const loginScreen = document.getElementById("loginScreen");
        const adminPanel = document.getElementById("adminPanel");
        const userInfo = document.getElementById("user-info");

        if (user) {
            userInfo.innerHTML = `✅ Logged in as: ${user.email}`;
            loginScreen.style.display = "none";
            adminPanel.style.display = "block";
        } else {
            userInfo.innerHTML = "🔒 Not logged in";
            loginScreen.style.display = "block";
            adminPanel.style.display = "none";

            // 🔴 Redirect Only If On Admin Page
            if (window.location.pathname.includes("admin.html")) {
                window.location.href = "index.html"; // ✅ Redirect to Home
            }
        }
    }
});