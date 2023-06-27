// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfACZVuO2kO-Y7DWLoeAMIvyYW0XYNGg0",
  authDomain: "react-notes-e6b14.firebaseapp.com",
  projectId: "react-notes-e6b14",
  storageBucket: "react-notes-e6b14.appspot.com",
  messagingSenderId: "889782438494",
  appId: "1:889782438494:web:d0e6d88c528c9a322b42cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")