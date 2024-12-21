import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, TrendingUp, Send, MapPin, Users, Instagram } from 'lucide-react';

const steps = [
  {
    id: 'discovery',
    title: 'Influencer Discovery',
    icon: Search,
    description: 'Use 20+ filters to build your influencer list from a growing dataset of top influencers based on demographics, keywords, category, budget, and more.'
  },
  {
    id: 'insights',
    title: 'Influencer Insights',
    icon: BarChart2,
    description: 'Get real time data and insights to optimize your influencer marketing campaigns. Analyze your competitors, market and trends.'
  },
  {
    id: 'reporting',
    title: 'Campaign Reporting',
    icon: TrendingUp,
    description: 'Track your campaign metrics in your dashboard with real time updates. Analyze and measure the impact of your influencer marketing campaigns'
  },
  {
    id: 'planning',
    title: 'Media Planning & Outreach',
    icon: Send,
    description: 'Turn influencer data & insights to build media plans that hit positive impact then automate your influencer outreach process easier.'
  }
];

export function MarketingSteps() {
  const [activeStep, setActiveStep] = useState('discovery');

  const renderVisualization = () => {
    switch (activeStep) {
      case 'discovery':
        return (
          <div className="relative bg-white rounded-xl p-8 shadow-sm">
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <Instagram className="w-4 h-4 mr-2" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Location</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span>Audience</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg opacity-50" />
              <div className="relative p-6">
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mb-3" />
                      <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-50 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'insights':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-4">Audience Demographics</h4>
                <div className="space-y-4">
                  {['Bangalore', 'Mumbai', 'Delhi', 'Chennai'].map((city, i) => (
                    <div key={city} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{city}</span>
                      <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${80 - (i * 15)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-4">Engagement Rate</h4>
                <div className="h-48 flex items-end space-x-6">
                  {[60, 80, 40, 90, 50].map((height, i) => (
                    <div key={i} className="flex-1">
                      <div 
                        className="bg-gradient-to-t from-pink-500 to-indigo-500 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Made Influencer Marketing Campaigns
            <br />
            Smarter Than Ever for You
          </motion.h2>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full shadow-sm p-2">
            {steps.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeStep === step.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {step.title}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {steps.find(s => s.id === activeStep)?.description}
            </p>
          </motion.div>

          {renderVisualization()}
        </div>
      </div>
    </div>
  );
}