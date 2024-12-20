import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getCompanyFromEmail } from '@/utils/format';
import type { Brand } from '@/types';

export async function signUpBrand(email: string, password: string): Promise<string> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const companyName = getCompanyFromEmail(email);
  
  // Create initial brand profile
  const brandData: Omit<Brand, 'uid'> = {
    companyName,
    email,
    industry: '',
    description: '',
    location: '',
    createdAt: new Date()
  };

  // Save brand data
  await setDoc(doc(db, 'brands', userCredential.user.uid), brandData);

  return userCredential.user.uid;
}

export async function signInBrand(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}