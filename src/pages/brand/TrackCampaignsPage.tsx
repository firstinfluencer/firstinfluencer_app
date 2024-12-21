import React from 'react';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CampaignTrackingList } from '@/modules/brand/components/campaigns/tracking/CampaignTrackingList';
import { useCampaigns } from '@/hooks/useCampaigns';

export function TrackCampaignsPage() {
  const { campaigns, loading } = useCampaigns();

  return (
    <BrandDashboardLayout>
      <div className="max-w-5xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Track Campaigns</h1>
          <p className="text-gray-600 mt-2">Monitor your campaign progress and deliverables</p>
        </div>

        <CampaignTrackingList 
          campaigns={campaigns}
          loading={loading}
        />
      </div>
    </BrandDashboardLayout>
  );
}