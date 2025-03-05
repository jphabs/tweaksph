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

    // ✅ Update UI Based on Auth State
    function updateUI(user) {
        const userInfo = document.getElementById("user-info");
        const loginScreen = document.getElementById("loginScreen");
        const adminPanel = document.getElementById("adminPanel");

        if (user) {
            if (userInfo) userInfo.innerHTML = `✅ Logged in as: ${user.email}`;
            if (loginScreen) loginScreen.style.display = "none";
            if (adminPanel) adminPanel.style.display = "block";
        } else {
            if (userInfo) userInfo.innerHTML = "🔒 Not logged in";
            if (loginScreen) loginScreen.style.display = "block";
            if (adminPanel) adminPanel.style.display = "none";

            // 🔴 Redirect Only If On Admin Page (use absolute path)
            if (window.location.pathname.includes("tweaksph/admin.html")) {
                window.location.href = "/tweaksph/index.html"; // ✅ Absolute path redirect
            }
        }
    }
});