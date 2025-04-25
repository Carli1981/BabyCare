import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // o '../firebase' según la ubicación real

export const saveBabyData = async (userId: string, babyData: any) => {
  await setDoc(doc(db, 'babies', userId), babyData);
};

export const getBabyData = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'babies', userId));
  return docSnap.exists() ? docSnap.data() : null;
};
