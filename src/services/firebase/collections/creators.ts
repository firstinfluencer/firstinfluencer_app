import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Creator, CreateCreatorInput, UpdateCreatorInput } from '@/types/models/creator';

const COLLECTION = 'creators';
const creatorsRef = collection(db, COLLECTION);

export async function createCreator(uid: string, data: CreateCreatorInput): Promise<Creator> {
  const now = new Date();
  const creator: Creator = {
    id: uid,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await setDoc(doc(creatorsRef, uid), creator);
  return creator;
}

export async function getCreator(uid: string): Promise<Creator | null> {
  const docRef = doc(creatorsRef, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as Creator : null;
}

export async function updateCreator(uid: string, data: UpdateCreatorInput): Promise<void> {
  const docRef = doc(creatorsRef, uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date()
  });
}