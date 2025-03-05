// ✅ Firebase Config & Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Your Firebase Config (Replace with actual credentials from Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyAYqvRzV-wlaVPU8j1YolZLyH36PCvlT_0",
    authDomain: "tweaks-ph-login-server.firebaseapp.com",
    projectId: "tweaks-ph-login-server",
    storageBucket: "tweaks-ph-login-server.firebasestorage.app",
    messagingSenderId: "970111986272",
    appId: "1:970111986272:web:fa1d7b107608b094a67105"
  };

// ✅ Initialize Firebase & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // ✅ Export Auth so other files can use it