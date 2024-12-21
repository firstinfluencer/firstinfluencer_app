import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { FormField } from './FormField';
import { FormTextArea } from './FormTextArea';
import { FormDateRange } from './FormDateRange';

interface CampaignEditFormProps {
  campaign: Campaign;
  onSave: (data: Partial<Campaign>) => Promise<void>;
  onCancel: () => void;
}

export function CampaignEditForm({ campaign, onSave, onCancel }: CampaignEditFormProps) {
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    budget: campaign.budget,
    category: campaign.category,
    requirements: campaign.requirements.join('\n'),
    startDate: campaign.startDate,
    endDate: campaign.endDate
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({
        ...formData,
        requirements: formData.requirements.split('\n').filter(Boolean)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <FormField
        label="Campaign Title"
        value={formData.title}
        onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
        required
      />

      <FormTextArea
        label="Description"
        value={formData.description}
        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
        rows={6}
        required
      />

      <FormField
        label="Budget (INR)"
        type="number"
        value={formData.budget}
        onChange={(value) => setFormData(prev => ({ ...prev, budget: parseInt(value) }))}
        required
      />

      <FormField
        label="Category"
        value={formData.category}
        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        required
      />

      <FormTextArea
        label="Requirements"
        value={formData.requirements}
        onChange={(value) => setFormData(prev => ({ ...prev, requirements: value }))}
        placeholder="Enter each requirement on a new line"
        rows={4}
      />

      <FormDateRange
        startDate={formData.startDate}
        endDate={formData.endDate}
        onStartDateChange={(value) => setFormData(prev => ({ ...prev, startDate: new Date(value) }))}
        onEndDateChange={(value) => setFormData(prev => ({ ...prev, endDate: new Date(value) }))}
      />

      <div className="flex justify-end space-x-4">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </form>
  );
}