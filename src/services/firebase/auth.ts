import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getCompanyFromEmail } from '@/utils/format/text';
import type { CreateBrandInput } from '@/types/models/brand';
import type { CreateCreatorInput } from '@/types/models/creator';

export async function signUpBrand(email: string, password: string, brandData: Omit<CreateBrandInput, 'companyName'>) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const companyName = getCompanyFromEmail(email);
  
  // Create brand document
  await setDoc(doc(db, 'brands', userCredential.user.uid), {
    companyName,
    email,
    ...brandData,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return userCredential.user;
}

export async function signUpCreator(email: string, password: string, creatorData: CreateCreatorInput) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create creator document
  await setDoc(doc(db, 'creators', userCredential.user.uid), {
    ...creatorData,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return userCredential.user;
}