import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Application } from '@/types';
import { useAuth } from './useAuth';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.uid) return;
      try {
        const q = query(
          collection(db, 'applications'),
          where('brandId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const apps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Application[];
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const updateApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    const docRef = doc(db, 'applications', applicationId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date()
    });
    
    // Update local state
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  return { applications, loading, updateApplicationStatus };
}