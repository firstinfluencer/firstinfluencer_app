import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Campaign } from '@/types';
import { toast } from 'react-hot-toast';

export function useCreatorCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsRef = collection(db, 'campaigns');
        const q = query(
          campaignsRef,
          where('status', '==', 'active')
        );
        
        const querySnapshot = await getDocs(q);
        const campaignData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Campaign[];
        
        setCampaigns(campaignData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        toast.error('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading };
}