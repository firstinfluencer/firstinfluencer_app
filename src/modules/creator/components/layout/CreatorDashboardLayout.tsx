import React from 'react';
import { CreatorSidebar } from './CreatorSidebar';

interface CreatorDashboardLayoutProps {
  children: React.ReactNode;
}

export function CreatorDashboardLayout({ children }: CreatorDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreatorSidebar />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}