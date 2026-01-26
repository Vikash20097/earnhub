// Firebase configuration and initialization
// Replace the placeholders with your actual Firebase project details from the Firebase Console

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files (in a module context, but since vanilla JS, we'll use global)
window.auth = auth;
window.db = db;
