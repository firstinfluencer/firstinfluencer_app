import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Campaign } from '@/types';
import { toast } from 'react-hot-toast';

export function useCreatorCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);

        const campaignsRef = collection(db, 'campaigns');
        const q = query(
          campaignsRef,
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const campaignData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
            startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : new Date(data.startDate),
            endDate: data.endDate instanceof Timestamp ? data.endDate.toDate() : new Date(data.endDate)
          };
        }) as Campaign[];
        
        setCampaigns(campaignData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch campaigns'));
        toast.error('Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
}