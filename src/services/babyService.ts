// src/services/babyService.ts

import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Guardar datos del bebé
export const saveBabyData = async (userId: string, babyData: any) => {
  try {
    const dataToSave = { ...babyData };

    // 🔄 Convertir string a Date si es necesario
    if (dataToSave.birthdate && typeof dataToSave.birthdate === 'string') {
      dataToSave.birthdate = new Date(dataToSave.birthdate);
    }

    console.log("Guardando en Firestore:", dataToSave);

    await setDoc(doc(db, 'babies', userId), dataToSave);
  } catch (error) {
    console.error('Error saving baby data:', error);
    throw error;
  }
};

// Obtener los datos del bebé
export const getBabyData = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'babies', userId));
  return docSnap.exists() ? docSnap.data() : null;
};

// Actualizar los datos del bebé
export const updateBabyData = async (userId: string, updatedData: any) => {
  const babyRef = doc(db, 'babies', userId);
  await updateDoc(babyRef, updatedData);
};