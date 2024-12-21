import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Campaign } from '@/types';
import { CampaignTimeline } from '@/components/campaigns/timeline/CampaignTimeline';
import { formatCurrency } from '@/utils/format';

interface TrackCampaignSectionProps {
  campaign: Campaign;
}

export function TrackCampaignSection({ campaign }: TrackCampaignSectionProps) {
  // Mock metrics for demonstration
  const metrics = {
    reach: 125000,
    engagement: 4.8,
    impressions: 250000,
    budget: {
      total: campaign.budget,
      spent: campaign.budget * 0.6,
      remaining: campaign.budget * 0.4
    }
  };

  return (
    <div className="space-y-8">
      {/* Campaign Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Campaign Progress</h3>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000"
            style={{ width: '40%' }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>40% Complete</span>
          <span>{formatDate(campaign.endDate)}</span>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold">{metrics.reach.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-pink-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold">{metrics.engagement}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <BarChart2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Impressions</p>
              <p className="text-2xl font-bold">{metrics.impressions.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget Spent</p>
              <p className="text-2xl font-bold">{formatCurrency(metrics.budget.spent)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Campaign Timeline */}
      <CampaignTimeline campaign={campaign} />

      {/* Budget Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Budget Overview</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total Budget</span>
          <span className="font-medium">{formatCurrency(metrics.budget.total)}</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
            style={{ width: '60%' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-500">60% spent</span>
          <span className="text-gray-500">{formatCurrency(metrics.budget.remaining)} remaining</span>
        </div>
      </div>
    </div>
  );
}