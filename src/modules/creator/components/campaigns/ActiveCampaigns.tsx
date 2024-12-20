import React from 'react';
import { motion } from 'framer-motion';
import { useCampaigns } from '@/hooks/useCampaigns';
import { CampaignCard } from './CampaignCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function ActiveCampaigns() {
  const { campaigns, loading } = useCampaigns();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');

  if (activeCampaigns.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No active campaigns</h3>
        <p className="text-gray-600">Check back later for new opportunities</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
        <span className="text-sm text-gray-600">{activeCampaigns.length} opportunities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCampaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CampaignCard campaign={campaign} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}