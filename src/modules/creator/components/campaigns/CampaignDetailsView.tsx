import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Tag, Check } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

interface CampaignDetailsViewProps {
  campaign: Campaign;
  onBack: () => void;
}

export function CampaignDetailsView({ campaign, onBack }: CampaignDetailsViewProps) {
  // Extract industry and title from description
  const [industry, title, ...descriptionLines] = campaign.description.split('\n');
  const cleanDescription = descriptionLines.join('\n').trim();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <motion.button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 mb-4"
          whileHover={{ x: -4 }}
        >
          ← Back to campaigns
        </motion.button>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">{industry}</p>
          <h2 className="text-2xl font-bold text-gray-900">{campaign.title}</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-lg font-semibold">{formatCurrency(campaign.budget)}</p>
              <p className="text-sm text-gray-600">Campaign Budget</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-lg font-semibold">{formatDate(campaign.startDate)}</p>
              <p className="text-sm text-gray-600">Start Date</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <Tag className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-lg font-semibold">{campaign.category}</p>
              <p className="text-sm text-gray-600">Category</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{cleanDescription}</p>
          </div>

          {campaign.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <div className="space-y-2">
                {campaign.requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-gray-600">{req}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}