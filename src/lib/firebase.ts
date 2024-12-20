import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD75jSxC3AfA_KC-fgiYuO6rYWUiUo31aA",
  authDomain: "first-influencer.firebaseapp.com",
  projectId: "first-influencer",
  storageBucket: "first-influencer.firebasestorage.app",
  messagingSenderId: "1038339031875",
  appId: "1:1038339031875:web:e92a0e69a30dadff7b25f6",
  measurementId: "G-ZPEBVCPDQH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
  });
} catch (err) {
  console.warn('Error enabling persistence:', err);
}