import React from 'react';
import { CreatorSidebar } from '@/modules/creator/components/layout/CreatorSidebar';
import { CampaignList } from '@/modules/creator/components/campaigns/CampaignList';
import { CreatorMetrics } from '@/modules/creator/components/metrics/CreatorMetrics';

export function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreatorSidebar />
      
      <div className="ml-64 p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">Here are your latest opportunities</p>
          </div>

          <CreatorMetrics />

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Available Campaigns</h2>
            </div>
            <CampaignList />
          </div>
        </div>
      </div>
    </div>
  );
}