// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMQRBuPLxaaaaszK_6S84rrs8aANOZIBY",
  authDomain: "email-password-b7b54.firebaseapp.com",
  projectId: "email-password-b7b54",
  storageBucket: "email-password-b7b54.firebasestorage.app",
  messagingSenderId: "506661812721",
  appId: "1:506661812721:web:a969e0621b7d0fc2462c50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);