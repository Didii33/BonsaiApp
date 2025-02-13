import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8AQIlrh-wK1ken2YNPPupycc47-UJPig",
  authDomain: "bonsaiapp-cfe83.firebaseapp.com",
  projectId: "bonsaiapp-cfe83",
  storageBucket: "bonsaiapp-cfe83.firebasestorage.app",
  messagingSenderId: "596359983425",
  appId: "1:596359983425:web:c4fc04b1e33ab7f2e6f1c0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
