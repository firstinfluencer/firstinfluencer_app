import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Campaign } from '@/types';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CampaignList } from '@/modules/brand/components/campaigns/CampaignList';
import { EditCampaignModal } from '@/components/campaigns/EditCampaignModal';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { GradientBackground } from '@/components/ui/GradientBackground';

export function MyCampaignsPage() {
  const navigate = useNavigate();
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  return (
    <BrandDashboardLayout>
      <GradientBackground>
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

          <ErrorBoundary>
            <CampaignList onEdit={setEditingCampaign} />
          </ErrorBoundary>

          <EditCampaignModal
            campaign={editingCampaign}
            onClose={() => setEditingCampaign(null)}
          />
        </div>
      </GradientBackground>
    </BrandDashboardLayout>
  );
}

export default MyCampaignsPage;