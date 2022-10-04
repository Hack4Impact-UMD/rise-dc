// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDqSZT-oR6kOZaMfW0J9Rg53jJX5UhFR4E",
  authDomain: "yknot-ats.firebaseapp.com",
  projectId: "yknot-ats",
  storageBucket: "yknot-ats.appspot.com",
  messagingSenderId: "373449358865",
  appId: "1:373449358865:web:3df4c34e005443c7073bb0",
  measurementId: "G-65K7GH21NS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;