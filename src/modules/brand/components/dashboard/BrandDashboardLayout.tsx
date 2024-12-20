import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';

interface BrandDashboardLayoutProps {
  children: React.ReactNode;
}

export function BrandDashboardLayout({ children }: BrandDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}