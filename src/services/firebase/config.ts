import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const API_KEYS_COLLECTION = 'api_keys';
const API_KEYS_DOC = 'external_services';

interface ApiKeys {
  gemini: string;
  hypeauditor: {
    authHash: string;
    authId: string;
  };
}

export async function storeApiKeys(keys: Partial<ApiKeys>) {
  try {
    const docRef = doc(db, API_KEYS_COLLECTION, API_KEYS_DOC);
    const existingDoc = await getDoc(docRef);
    
    if (existingDoc.exists()) {
      // Update existing keys while preserving others
      await setDoc(docRef, { ...existingDoc.data(), ...keys }, { merge: true });
    } else {
      // Create new document with keys
      await setDoc(docRef, keys);
    }
    
    console.log('API keys stored successfully');
  } catch (error) {
    console.error('Error storing API keys:', error);
    throw error;
  }
}

export async function getApiKeys(): Promise<ApiKeys | null> {
  try {
    const docRef = doc(db, API_KEYS_COLLECTION, API_KEYS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ApiKeys;
    }
    return null;
  } catch (error) {
    console.error('Error fetching API keys:', error);
    throw error;
  }
}