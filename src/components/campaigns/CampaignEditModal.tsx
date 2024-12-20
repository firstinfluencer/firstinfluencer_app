import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Campaign } from '@/types';
import { CampaignForm } from './CampaignForm';

interface CampaignEditModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
}

export function CampaignEditModal({ campaign, onClose, onSave }: CampaignEditModalProps) {
  const [editedCampaign, setEditedCampaign] = useState<Partial<Campaign>>(campaign || {});

  const handleChange = (field: keyof Campaign, value: any) => {
    setEditedCampaign(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (campaign && editedCampaign) {
      onSave({ ...campaign, ...editedCampaign });
      onClose();
    }
  };

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
        className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-[20%] md:right-[20%] bg-white rounded-2xl shadow-xl overflow-hidden z-50 mt-24"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Edit Campaign</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <CampaignForm
              campaign={editedCampaign}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={onClose}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}