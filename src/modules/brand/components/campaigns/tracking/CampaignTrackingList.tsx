import React from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { CampaignTrackingCard } from './CampaignTrackingCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface CampaignTrackingListProps {
  campaigns: Campaign[];
  loading: boolean;
}

export function CampaignTrackingList({ campaigns, loading }: CampaignTrackingListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No active campaigns</h3>
        <p className="text-gray-600">Start a campaign to track deliverables</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CampaignTrackingCard campaign={campaign} />
        </motion.div>
      ))}
    </div>
  );
}