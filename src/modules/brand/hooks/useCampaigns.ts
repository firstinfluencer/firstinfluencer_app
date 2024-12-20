import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Campaign } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { where } from 'firebase/firestore';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { queryDocuments, addDocument, updateDocument } = useFirestore('campaigns');

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user?.uid) return;
      try {
        const results = await queryDocuments(where('brandId', '==', user.uid));
        setCampaigns(results as Campaign[]);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  const createCampaign = async (data: Omit<Campaign, 'id' | 'brandId' | 'createdAt'>) => {
    if (!user?.uid) return;
    try {
      const campaignId = crypto.randomUUID();
      const campaign: Campaign = {
        id: campaignId,
        brandId: user.uid,
        ...data,
        createdAt: new Date()
      };
      await addDocument(campaignId, campaign);
      setCampaigns([...campaigns, campaign]);
      return campaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  };

  const updateCampaign = async (id: string, data: Partial<Campaign>) => {
    try {
      await updateDocument(id, data);
      setCampaigns(campaigns.map(c => 
        c.id === id ? { ...c, ...data } : c
      ));
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  };

  return { campaigns, loading, createCampaign, updateCampaign };
}