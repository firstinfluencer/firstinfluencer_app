import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ApplyModalProps {
  campaign: Campaign;
  onClose: () => void;
  onApply: (proposal: string, rate: number) => void;
}

export function ApplyModal({ campaign, onClose, onApply }: ApplyModalProps) {
  const [proposal, setProposal] = useState('');
  const [rate, setRate] = useState(campaign.budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(proposal, rate);
  };

  return (
    <>
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
        className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-xl shadow-xl z-50"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Apply for Campaign</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Proposal
            </label>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe how you would approach this campaign..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rate (Budget: {formatCurrency(campaign.budget)})
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              min={0}
              max={campaign.budget}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Send Application</span>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </>
  );
}