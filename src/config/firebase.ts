// firebase.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 

const firebaseConfig = {
  apiKey: "AIzaSyDOMLz42uPOUNbuE0XR8ntHEsanjyYcUMw",
  authDomain: "babycare-25580.firebaseapp.com",
  projectId: "babycare-25580",
  storageBucket: "babycare-25580.firebasestorage.app",
  messagingSenderId: "553879834481",
  appId: "1:553879834481:web:cce22ba36578cfaa3630d0",
  measurementId: "G-4VMT6YLRY6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
