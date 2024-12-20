import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from './index';
import type { Campaign } from '@/types';

const campaignsCollection = collection(db, COLLECTIONS.CAMPAIGNS);

export async function createCampaign(data: Omit<Campaign, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(campaignsCollection, {
      ...data,
      createdAt: new Date().toISOString()
    });
    
    return {
      id: docRef.id,
      ...data,
      createdAt: new Date().toISOString()
    } as Campaign;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
}

export async function getBrandCampaigns(brandId: string) {
  try {
    const q = query(
      campaignsCollection, 
      where('brandId', '==', brandId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Campaign[];
  } catch (error) {
    console.error('Error getting brand campaigns:', error);
    throw error;
  }
}