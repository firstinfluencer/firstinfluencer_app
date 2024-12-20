import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Brand } from '@/types';

export async function getBrandProfile(uid: string): Promise<Brand | null> {
  try {
    const docRef = doc(db, 'brands', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Brand) : null;
  } catch (error) {
    console.error('Error getting brand profile:', error);
    throw error;
  }
}

export async function updateBrandProfile(uid: string, data: Partial<Brand>): Promise<void> {
  try {
    const docRef = doc(db, 'brands', uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating brand profile:', error);
    throw error;
  }
}