import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, TrendingUp, Users } from 'lucide-react';
import { InfluencerInsights } from './insights/InfluencerInsights';
import { InfluencerDiscovery } from './discovery/InfluencerDiscovery';
import { CampaignReporting } from './reporting/CampaignReporting';
import { MediaPlanning } from './planning/MediaPlanning';

export function DiscoveryInterface() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'insights' | 'reporting' | 'planning'>('discovery');

  const tabs = [
    { id: 'discovery', label: 'Influencer Discovery', icon: Search },
    { id: 'insights', label: 'Influencer Insights', icon: TrendingUp },
    { id: 'reporting', label: 'Campaign Reporting', icon: BarChart2 },
    { id: 'planning', label: 'Media Planning & Outreach', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'discovery':
        return <InfluencerDiscovery />;
      case 'insights':
        return <InfluencerInsights />;
      case 'reporting':
        return <CampaignReporting />;
      case 'planning':
        return <MediaPlanning />;
      default:
        return null;
    }
  };

  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Made Influencer Marketing Campaigns<br />
            Smarter Than Ever for You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Get real time data and insights to optimize your influencer marketing campaigns.<br />
            Analyze your competitors, market and trends.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Interface Container */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                {tabs.map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              {renderContent()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}