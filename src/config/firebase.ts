// src/config/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase (asegúrate de colocar tus credenciales aquí)
const firebaseConfig = {
  apiKey: "AIzaSyDOMLz42uPOUNbuE0XR8ntHEsanjyYcUMw",
  authDomain: "babycare-25580.firebaseapp.com",
  projectId: "babycare-25580",
  storageBucket: "babycare-25580.firebasestorage.app",
  messagingSenderId: "553879834481",
  appId: "1:553879834481:web:cce22ba36578cfaa3630d0",
  measurementId: "G-4VMT6YLRY6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };