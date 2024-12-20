import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Tag, Users, ChevronRight } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import { CampaignDetailsModal } from './CampaignDetailsModal';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
              <p className="text-gray-600 mt-1">{campaign.category}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2">{campaign.description}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{formatCurrency(campaign.budget)}</p>
              <p className="text-xs text-gray-500">Budget</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{formatDate(campaign.startDate)}</p>
              <p className="text-xs text-gray-500">Start Date</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <Tag className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{campaign.category || 'General'}</p>
              <p className="text-xs text-gray-500">Category</p>
            </div>
          </div>
        </div>
      </motion.div>

      <CampaignDetailsModal
        campaign={showDetails ? campaign : null}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}