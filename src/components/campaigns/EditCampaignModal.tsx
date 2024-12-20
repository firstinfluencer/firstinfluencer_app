import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Campaign } from '@/types';
import { CampaignForm } from './CampaignForm';
import { useCampaigns } from '@/hooks/useCampaigns';
import { toast } from 'react-hot-toast';
import { Modal } from '../ui/Modal';

interface EditCampaignModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

export function EditCampaignModal({ campaign, onClose }: EditCampaignModalProps) {
  const { updateCampaign } = useCampaigns();
  const [loading, setLoading] = useState(false);

  if (!campaign) return null;

  const handleSubmit = async (data: Partial<Campaign>) => {
    try {
      setLoading(true);
      await updateCampaign(campaign.id, {
        ...data,
        budget: Math.round(Number(data.budget))
      });
      toast.success('Campaign updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Edit Campaign">
      <div className="p-6">
        <CampaignForm
          initialData={campaign}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </Modal>
  );
}