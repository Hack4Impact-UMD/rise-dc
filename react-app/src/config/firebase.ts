// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAy9GLcZ03dfe31fGK2vxmmCgFno8X3Hpg",
  authDomain: "rise-dc-fd5a6.firebaseapp.com",
  projectId: "rise-dc-fd5a6",
  storageBucket: "rise-dc-fd5a6.appspot.com",
  messagingSenderId: "650118133496",
  appId: "1:650118133496:web:e3dca21534a8947100ad0d",
  measurementId: "G-CRHN8KVGQK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export default app;
