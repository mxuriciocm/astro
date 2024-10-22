// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_i-HlY8sWyMti_zPKSu3SYX_vIxpI5kE",
  authDomain: "astro-authentication-67a9d.firebaseapp.com",
  projectId: "astro-authentication-67a9d",
  storageBucket: "astro-authentication-67a9d.appspot.com",
  messagingSenderId: "682374970385",
  appId: "1:682374970385:web:fa0dddaad62c7ba74f45b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {
  app,
  auth,
};
