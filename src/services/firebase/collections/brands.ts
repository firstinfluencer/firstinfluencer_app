import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Brand, CreateBrandInput, UpdateBrandInput } from '@/types/models/brand';

const COLLECTION = 'brands';
const brandsRef = collection(db, COLLECTION);

export async function createBrand(uid: string, data: CreateBrandInput): Promise<Brand> {
  const now = new Date();
  const brand: Brand = {
    id: uid,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await setDoc(doc(brandsRef, uid), brand);
  return brand;
}

export async function getBrand(uid: string): Promise<Brand | null> {
  const docRef = doc(brandsRef, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as Brand : null;
}

export async function updateBrand(uid: string, data: UpdateBrandInput): Promise<void> {
  const docRef = doc(brandsRef, uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date()
  });
}