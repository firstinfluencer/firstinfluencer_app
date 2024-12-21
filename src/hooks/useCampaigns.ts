import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Campaign } from '@/types';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCampaigns = useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      const campaignsRef = collection(db, 'campaigns');
      const q = query(
        campaignsRef,
        where('brandId', '==', user.uid)
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
  }, [user?.uid]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const updateCampaign = async (campaignId: string, data: Partial<Campaign>) => {
    try {
      const campaignRef = doc(db, 'campaigns', campaignId);
      await updateDoc(campaignRef, {
        ...data,
        updatedAt: new Date()
      });

      // Update local state
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, ...data }
            : campaign
        )
      );

      return true;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  };

  const launchCampaign = async (campaignData: Omit<Campaign, 'id' | 'brandId' | 'createdAt'>) => {
    if (!user?.uid) {
      toast.error('You must be logged in to create a campaign');
      return;
    }

    try {
      const campaignsRef = collection(db, 'campaigns');
      const newCampaign = {
        ...campaignData,
        brandId: user.uid,
        createdAt: new Date(),
        status: campaignData.status || 'draft',
        budget: Math.round(Number(campaignData.budget))
      };

      const docRef = await addDoc(campaignsRef, newCampaign);
      const campaign = { id: docRef.id, ...newCampaign };
      
      setCampaigns(prev => [...prev, campaign]);
      return campaign;
    } catch (error) {
      console.error('Error launching campaign:', error);
      toast.error('Failed to create campaign');
      throw error;
    }
  };

  return {
    campaigns,
    loading,
    launchCampaign,
    updateCampaign,
    refreshCampaigns: fetchCampaigns
  };
}