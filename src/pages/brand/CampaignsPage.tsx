import React from 'react';
import { motion } from 'framer-motion';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CampaignList } from '@/modules/brand/components/campaigns/CampaignList';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { useAuth } from '@/hooks/useAuth';
import { getCompanyFromEmail } from '@/utils/format';

export function CampaignsPage() {
  const { user } = useAuth();
  const companyName = user?.email ? getCompanyFromEmail(user.email) : '';

  return (
    <BrandDashboardLayout>
      <GradientBackground>
        <div className="max-w-4xl mx-auto mt-40">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {companyName}!
              <br />
              Let's start with your first campaign.
            </h1>
            <p className="text-xl text-gray-600">
              It's the fastest way to make meaningful connections.
              <br />
              Get help from AI and be done in no time.
            </p>
          </motion.div>

          <div className="mt-16">
            <CampaignList />
          </div>
        </div>
      </GradientBackground>
    </BrandDashboardLayout>
  );
}