<!-- firebase-config.js -->
<script>
  // Your Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyAYqvRzV-wlaVPU8j1YolZLyH36PCvlT_0",
    authDomain: "tweaks-ph-login-server.firebaseapp.com",
    projectId: "tweaks-ph-login-server",
    storageBucket: "tweaks-ph-login-server.appspot.com", // Fixed: .appspot.com
    messagingSenderId: "970111986272",
    appId: "1:970111986272:web:fa1d7b107608b094a67105"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Optionally, assign auth to a global variable:
  window.auth = firebase.auth();
</script>