import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Campaign } from '@/types';
import { formatCurrency } from '@/utils/format';
import { FormField } from './form/FormField';
import { FormTextArea } from './form/FormTextArea';
import { FormSelect } from './form/FormSelect';
import { FormDateRange } from './form/FormDateRange';

interface CampaignFormProps {
  initialData: Campaign;
  onSubmit: (data: Partial<Campaign>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function CampaignForm({ initialData, onSubmit, onCancel, loading }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    budget: initialData.budget,
    category: initialData.category,
    requirements: initialData.requirements,
    startDate: initialData.startDate,
    endDate: initialData.endDate
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Campaign Title"
        type="text"
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
        helperText={formatCurrency(formData.budget)}
        required
      />

      <FormSelect
        label="Category"
        value={formData.category}
        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        options={[
          'Fashion',
          'Beauty',
          'Lifestyle',
          'Travel',
          'Food',
          'Technology',
          'Gaming',
          'Fitness',
          'Education'
        ]}
      />

      <FormTextArea
        label="Requirements"
        value={formData.requirements.join('\n')}
        onChange={(value) => setFormData(prev => ({
          ...prev,
          requirements: value.split('\n').filter(Boolean)
        }))}
        rows={4}
        placeholder="Enter each requirement on a new line"
      />

      <FormDateRange
        startDate={formData.startDate}
        endDate={formData.endDate}
        onStartDateChange={(value) => setFormData(prev => ({ ...prev, startDate: new Date(value) }))}
        onEndDateChange={(value) => setFormData(prev => ({ ...prev, endDate: new Date(value) }))}
      />

      <div className="flex justify-end space-x-4 pt-6">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white"
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