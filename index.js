// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwlopx55qcpJ3XZaAK54pb7ZbEyseiXx8",
  authDomain: "attendancce-48f4f.firebaseapp.com",
  projectId: "attendancce-48f4f",
  storageBucket: "attendancce-48f4f.appspot.com",
  messagingSenderId: "26630879752",
  appId: "1:26630879752:web:e15b3931015d00075eefbd",
  measurementId: "G-JHHW6T3H1N"
};
0
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
