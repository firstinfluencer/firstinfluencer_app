import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CampaignDetailsCard } from '@/modules/brand/components/campaigns/details/CampaignDetailsCard';
import { useCampaigns } from '@/hooks/useCampaigns';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function MyCampaignsPage() {
  const navigate = useNavigate();
  const { campaigns, loading, updateCampaign } = useCampaigns();

  const handleUpdateCampaign = async (campaignId: string, data: any) => {
    try {
      await updateCampaign(campaignId, data);
      toast.success('Campaign updated successfully');
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    }
  };

  return (
    <BrandDashboardLayout>
      <div className="space-y-8 mt-24">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-600 mt-1">Manage and track your influencer campaigns</p>
          </div>

          <motion.button
            onClick={() => navigate('/brand/campaigns/create')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Campaign</span>
          </motion.button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600">Create your first campaign to start connecting with creators</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <CampaignDetailsCard
                key={campaign.id}
                campaign={campaign}
                onUpdate={handleUpdateCampaign}
              />
            ))}
          </div>
        )}
      </div>
    </BrandDashboardLayout>
  );
}