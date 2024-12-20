import React from 'react';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CreatorsSection } from '@/modules/brand/components/CreatorsSection';

export function BrandDashboard() {
  return (
    <BrandDashboardLayout>
      <CreatorsSection />
    </BrandDashboardLayout>
  );
}