import React from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

interface CampaignCardProps {
  campaign: Campaign;
  onApply?: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onApply }: CampaignCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      whileHover={{ y: -4 }}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Budget</span>
            <span className="font-medium">{formatCurrency(campaign.budget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">{campaign.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>
        </div>

        {onApply && (
          <motion.button
            onClick={() => onApply(campaign)}
            className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}