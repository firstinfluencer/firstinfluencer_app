import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

interface Metrics {
  totalEarnings: number;
  completedCampaigns: number;
  averageEngagement: number;
  recentGrowth: {
    instagram?: number;
    youtube?: number;
    tiktok?: number;
  };
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user?.uid) return;

      try {
        // Fetch completed campaigns
        const campaignsRef = collection(db, 'campaigns');
        const campaignsQuery = query(
          campaignsRef,
          where('creatorId', '==', user.uid),
          where('status', '==', 'completed')
        );
        
        const campaignsSnapshot = await getDocs(campaignsQuery);
        const completedCampaigns = campaignsSnapshot.docs;
        
        // Calculate total earnings
        const totalEarnings = completedCampaigns.reduce(
          (sum, doc) => sum + (doc.data().payment || 0), 
          0
        );

        // Set mock data for now
        setMetrics({
          totalEarnings,
          completedCampaigns: completedCampaigns.length,
          averageEngagement: 4.8,
          recentGrowth: {
            instagram: 5.2,
            youtube: 3.8,
            tiktok: 7.1
          }
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast.error('Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user]);

  return { metrics, loading };
}