import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { InfluencerListing } from '../../types/influencer';

const COLLECTION_NAME = 'influencer_listings';

export const influencersCollection = collection(db, COLLECTION_NAME);

export async function addInfluencerListing(data: Omit<InfluencerListing, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(influencersCollection, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding influencer listing:', error);
    throw error;
  }
}

export async function getInfluencerListings(filters?: {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
}) {
  try {
    let q = query(influencersCollection, orderBy('metrics.followers', 'desc'));

    if (filters?.category) {
      q = query(q, where('category', 'array-contains', filters.category));
    }

    if (filters?.minFollowers) {
      q = query(q, where('metrics.followers', '>=', filters.minFollowers));
    }

    if (filters?.maxFollowers) {
      q = query(q, where('metrics.followers', '<=', filters.maxFollowers));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InfluencerListing[];
  } catch (error) {
    console.error('Error getting influencer listings:', error);
    throw error;
  }
}