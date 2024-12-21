import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  if (!campaign) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-[20%] md:right-[20%] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{campaign.title}</h2>
                <p className="text-gray-600 mt-1">{campaign.category}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Key Details */}
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

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Campaign Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{campaign.description}</p>
              </div>

              {/* Requirements */}
              {campaign.requirements && campaign.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <div className="space-y-3">
                    {campaign.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-gray-600">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}