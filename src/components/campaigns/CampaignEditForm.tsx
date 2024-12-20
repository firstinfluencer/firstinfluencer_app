import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { formatCurrency } from '@/utils/format';

interface CampaignEditFormProps {
  campaign: Campaign;
  onSave: (campaign: Campaign) => void;
  onCancel: () => void;
}

export function CampaignEditForm({ campaign, onSave, onCancel }: CampaignEditFormProps) {
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    budget: campaign.budget,
    category: campaign.category,
    requirements: campaign.requirements,
    startDate: campaign.startDate,
    endDate: campaign.endDate
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...campaign,
      ...formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
        <input
          type="number"
          value={formData.budget}
          onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">{formatCurrency(formData.budget)}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {[
            'Fashion',
            'Beauty',
            'Lifestyle',
            'Travel',
            'Food',
            'Technology',
            'Gaming',
            'Fitness',
            'Education'
          ].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
        <textarea
          value={formData.requirements.join('\n')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            requirements: e.target.value.split('\n').filter(Boolean)
          }))}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter each requirement on a new line"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save Changes
        </motion.button>
      </div>
    </form>
  );
}