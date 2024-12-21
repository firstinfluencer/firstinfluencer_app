import React from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { formatDate } from '@/utils/format';
import { CampaignProgress } from './CampaignProgress';
import { useNavigate } from 'react-router-dom';

interface CampaignTrackingCardProps {
  campaign: Campaign;
}

export function CampaignTrackingCard({ campaign }: CampaignTrackingCardProps) {
  const navigate = useNavigate();
  const progress = calculateProgress(campaign);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/brand/campaigns/${campaign.id}/track`)}
      whileHover={{ y: -2 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
            <p className="text-sm text-gray-500">Started {formatDate(campaign.startDate)}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            campaign.status === 'active' 
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        </div>

        <CampaignProgress progress={progress} />

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Deliverables</span>
            <p className="font-medium">{progress.total}</p>
          </div>
          <div>
            <span className="text-gray-500">In Progress</span>
            <p className="font-medium">{progress.inProgress}</p>
          </div>
          <div>
            <span className="text-gray-500">Completed</span>
            <p className="font-medium">{progress.completed}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function calculateProgress(campaign: Campaign) {
  // In a real app, this would come from the campaign data
  const total = Math.floor(Math.random() * 10) + 5;
  const completed = Math.floor(Math.random() * total);
  const inProgress = Math.floor(Math.random() * (total - completed));

  return {
    total,
    completed,
    inProgress,
    percentage: Math.round((completed / total) * 100)
  };
}