import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { DeliverablesList } from '@/modules/brand/components/campaigns/tracking/DeliverablesList';
import { useCampaigns } from '@/hooks/useCampaigns';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Mock data for demonstration
const mockDeliverables = [
  {
    id: '1',
    type: 'reel' as const,
    platform: 'instagram' as const,
    creatorName: 'Sarah Johnson',
    status: {
      step: 'content_creation' as const,
      status: 'in_progress' as const,
      date: new Date()
    }
  },
  {
    id: '2',
    type: 'video' as const,
    platform: 'youtube' as const,
    creatorName: 'Mike Chen',
    status: {
      step: 'review' as const,
      status: 'in_progress' as const,
      date: new Date()
    }
  },
  {
    id: '3',
    type: 'photo' as const,
    platform: 'instagram' as const,
    creatorName: 'Emily Davis',
    status: {
      step: 'published' as const,
      status: 'completed' as const,
      date: new Date()
    }
  }
];

export function TrackCampaignPage() {
  const { campaignId } = useParams();
  const { campaigns, loading } = useCampaigns();
  const [deliverables, setDeliverables] = useState(mockDeliverables);

  const handleApproveDeliverable = (id: string) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: {
            step: 'approved',
            status: 'completed',
            date: new Date()
          }
        };
      }
      return d;
    }));
    toast.success('Content approved successfully');
  };

  const handleRejectDeliverable = (id: string) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: {
            step: 'content_creation',
            status: 'in_progress',
            date: new Date()
          }
        };
      }
      return d;
    }));
    toast.error('Content rejected');
  };
  
  if (loading) {
    return (
      <BrandDashboardLayout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      </BrandDashboardLayout>
    );
  }

  const campaign = campaigns.find(c => c.id === campaignId);
  
  if (!campaign) {
    return (
      <BrandDashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Campaign not found</h2>
          <p className="text-gray-600 mt-2">The campaign you're looking for doesn't exist.</p>
        </div>
      </BrandDashboardLayout>
    );
  }

  return (
    <BrandDashboardLayout>
      <div className="max-w-5xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
          <p className="text-gray-600 mt-2">Track deliverables and campaign progress</p>
        </div>

        <DeliverablesList 
          deliverables={deliverables}
          onApproveDeliverable={handleApproveDeliverable}
          onRejectDeliverable={handleRejectDeliverable}
        />
      </div>
    </BrandDashboardLayout>
  );
}