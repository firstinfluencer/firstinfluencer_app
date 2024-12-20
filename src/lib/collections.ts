import { collection } from 'firebase/firestore';
import { db } from './firebase';

export const usersCollection = collection(db, 'users');
export const campaignsCollection = collection(db, 'campaigns');
export const creatorsCollection = collection(db, 'creators');
export const brandsCollection = collection(db, 'brands');
export const applicationsCollection = collection(db, 'applications');