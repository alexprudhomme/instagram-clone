// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxYqxHAsOz5vb0t7ejhzmujjE7FkYHTws",
  authDomain: "instagram-clone-2f29e.firebaseapp.com",
  projectId: "instagram-clone-2f29e",
  storageBucket: "instagram-clone-2f29e.appspot.com",
  messagingSenderId: "252927383708",
  appId: "1:252927383708:web:8c5c47fe9418fbfa383559",
  measurementId: "G-T7WWWHMD0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {db, auth, storage}