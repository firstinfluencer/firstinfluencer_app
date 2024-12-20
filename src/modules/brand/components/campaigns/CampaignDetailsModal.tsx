import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, Tag, Bot } from 'lucide-react';
import type { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  if (!campaign) return null;

  // Format text with bold sections and bullet points
  const formatContent = (text: string) => {
    const sections = text.split('\n\n').filter(Boolean);
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0];
      const content = lines.slice(1);

      return (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {formatBoldText(title)}
          </h3>
          <div className="space-y-2">
            {content.map((line, lineIndex) => (
              <p key={lineIndex} className="text-gray-600">
                {formatBoldText(line.replace(/^[•-]\s*/, '• '))}
              </p>
            ))}
          </div>
        </div>
      );
    });
  };

  const formatBoldText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-x-4 top-[80px] bottom-[5%] md:inset-x-[10%] bg-white rounded-2xl shadow-xl overflow-hidden z-50 mt-16"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{campaign.title}</h2>
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
        <div className="p-6 overflow-y-auto max-h-[calc(100%-8rem)]">
          {/* Campaign Details */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">
                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-medium">{formatCurrency(campaign.budget)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <Tag className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{campaign.category}</p>
              </div>
            </div>
          </div>

          {/* AI Generated Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
            {formatContent(campaign.description)}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}