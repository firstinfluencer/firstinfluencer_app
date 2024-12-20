import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const API_KEYS_COLLECTION = 'api_keys';
const API_KEYS_DOC_ID = 'external_services';

interface ApiKeys {
  gemini: string;
  hypeauditor: {
    authHash: string;
    authId: string;
  };
}

// Get the collection reference
const apiKeysCollection = collection(db, API_KEYS_COLLECTION);

export async function initializeApiKeys() {
  try {
    const docRef = doc(apiKeysCollection, API_KEYS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Initialize with the provided API keys
      await setDoc(docRef, {
        gemini: 'AIzaSyBE6LvsKPRjWskSHRUQNElEBLdhg2ImRNc',
        hypeauditor: {
          authHash: 'a9b76cf11206ffad41986a80f0632c7ec5c33f668faa5502b467580cc8e6ef3',
          authId: '2488028'
        }
      });
      console.log('API keys initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing API keys:', error);
    throw error;
  }
}

export async function getApiKeys(): Promise<ApiKeys | null> {
  try {
    const docRef = doc(apiKeysCollection, API_KEYS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ApiKeys;
    }
    
    // If keys don't exist, initialize them
    await initializeApiKeys();
    return getApiKeys();
  } catch (error) {
    console.error('Error fetching API keys:', error);
    throw error;
  }
}

export async function updateApiKeys(keys: Partial<ApiKeys>) {
  try {
    const docRef = doc(apiKeysCollection, API_KEYS_DOC_ID);
    await setDoc(docRef, keys, { merge: true });
    console.log('API keys updated successfully');
  } catch (error) {
    console.error('Error updating API keys:', error);
    throw error;
  }
}