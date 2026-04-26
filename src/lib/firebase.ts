import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH1GLjlBtUtqB-p6kvxha0JVoq-DqqrlQ",
  authDomain: "wedding03-ff818.firebaseapp.com",
  databaseURL: "https://wedding03-ff818-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding03-ff818",
  storageBucket: "wedding03-ff818.firebasestorage.app",
  messagingSenderId: "307470739649",
  appId: "1:307470739649:web:75d00404bf6ac5ee8e8c40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getDatabase(app); 
export const firestore = getFirestore(app);
export const auth = getAuth(app); // For Admin Authentication

export default app;
