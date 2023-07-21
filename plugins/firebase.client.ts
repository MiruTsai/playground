// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOnzrOcLscmiaPoFbaVD0VPGxnW65oYK4",
  authDomain: "playground-alita.firebaseapp.com",
  projectId: "playground-alita",
  storageBucket: "playground-alita.appspot.com",
  messagingSenderId: "1046110152121",
  appId: "1:1046110152121:web:ae9358e2cc2d5912610268",
  measurementId: "G-RR8PJZN71W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)