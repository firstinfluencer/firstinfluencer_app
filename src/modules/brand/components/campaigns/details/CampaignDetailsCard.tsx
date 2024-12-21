import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Tag, Users } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import { CampaignDetailsModal } from './modals/CampaignDetailsModal';

interface CampaignDetailsCardProps {
  campaign: Campaign;
  onUpdate: (id: string, data: Partial<Campaign>) => Promise<void>;
}

export function CampaignDetailsCard({ campaign, onUpdate }: CampaignDetailsCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setShowDetails(true)}
        whileHover={{ y: -2 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
              <p className="text-sm text-gray-500">Created {formatDate(campaign.createdAt)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              campaign.status === 'active' 
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {campaign.status ? campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1) : 'Draft'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
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
              <p className="text-sm font-medium">{campaign.category}</p>
              <p className="text-xs text-gray-500">Category</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">0</p>
              <p className="text-xs text-gray-500">Applications</p>
            </div>
          </div>
        </div>
      </motion.div>

      {showDetails && (
        <CampaignDetailsModal
          campaign={campaign}
          onClose={() => setShowDetails(false)}
          onEdit={() => {
            // Handle edit functionality
            setShowDetails(false);
          }}
        />
      )}
    </>
  );
}