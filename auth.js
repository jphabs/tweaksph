// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAYqvRzV-wlaVPU8j1YolZLyH36PCvlT_0",
    authDomain: "tweaks-ph-login-server.firebaseapp.com",
    projectId: "tweaks-ph-login-server",
    storageBucket: "tweaks-ph-login-server.firebasestorage.app",
    messagingSenderId: "970111986272",
    appId: "1:970111986272:web:fa1d7b107608b094a67105"
  };

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Google Login Function
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");

  if (loginBtn && logoutBtn && userInfo) {
    loginBtn.addEventListener("click", function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          userInfo.innerHTML = `Logged in as: ${user.displayName}`;
          loginBtn.style.display = "none";
          logoutBtn.style.display = "block";
        })
        .catch((error) => console.error(error.message));
    });

    // ✅ Logout Function
    logoutBtn.addEventListener("click", function () {
      auth.signOut().then(() => {
        userInfo.innerHTML = "Logged out";
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
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
    if (userInfo) userInfo.innerHTML = `Logged in as: ${user.displayName}`;
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";

    // ✅ Redirect if trying to access admin.html while logged out
    if (window.location.pathname.includes("admin.html")) {
      console.log("User is authenticated, access granted.");
    }
  } else {
    if (userInfo) userInfo.innerHTML = "Not logged in";
    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";

    if (window.location.pathname.includes("admin.html")) {
      alert("Access denied! You must be logged in.");
      window.location.href = "index.html"; // Redirect to homepage
    }
  }
});