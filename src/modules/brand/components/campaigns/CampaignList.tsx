import React from 'react';
import { motion } from 'framer-motion';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Campaign } from '@/types';
import { CampaignCard } from './CampaignCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface CampaignListProps {
  onEdit?: (campaign: Campaign) => void;
}

export function CampaignList({ onEdit }: CampaignListProps) {
  const { campaigns, loading } = useCampaigns();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!campaigns?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
        <p className="text-gray-600">Create your first campaign to start connecting with creators</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {campaigns.map((campaign) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CampaignCard 
            campaign={campaign}
            onEdit={() => onEdit?.(campaign)}
          />
        </motion.div>
      ))}
    </div>
  );
}