import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BrandProfile, CreateBrandInput, UpdateBrandInput } from './types';

const COLLECTION = 'brands';

export async function createBrand(uid: string, data: CreateBrandInput): Promise<BrandProfile> {
  const now = new Date();
  const brand: BrandProfile = {
    id: uid,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  const docRef = doc(db, COLLECTION, uid);
  await setDoc(docRef, brand);
  return brand;
}

export async function getBrand(uid: string): Promise<BrandProfile | null> {
  const docRef = doc(db, COLLECTION, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as BrandProfile) : null;
}

export async function updateBrand(uid: string, data: UpdateBrandInput): Promise<void> {
  const docRef = doc(db, COLLECTION, uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date()
  });
}