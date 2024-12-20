import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Creator } from '@/types';
import { useAuth } from '@/hooks/useAuth';

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
  const { getDocument, queryDocuments } = useFirestore('creators');

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user?.uid) return;
      try {
        const creatorData = await getDocument(user.uid) as Creator;
        const completedCampaigns = await queryDocuments(
          where('creatorId', '==', user.uid),
          where('status', '==', 'completed')
        );

        const totalEarnings = completedCampaigns.reduce(
          (sum, campaign) => sum + campaign.payment,
          0
        );

        setMetrics({
          totalEarnings,
          completedCampaigns: completedCampaigns.length,
          averageEngagement: creatorData.engagementRate,
          recentGrowth: {
            instagram: 5.2, // These would come from analytics in a real app
            youtube: 3.8,
            tiktok: 7.1
          }
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user]);

  return { metrics, loading };
}