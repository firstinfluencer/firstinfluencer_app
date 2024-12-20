import React from 'react';
import { motion } from 'framer-motion';
import { AudienceDemographics } from './AudienceDemographics';
import { InfluencerMetrics } from './InfluencerMetrics';
import { EngagementStats } from './EngagementStats';

export function InfluencerInsights() {
  const mockData = {
    influencer: {
      name: 'Ankita Kumar',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 9.1,
      tier: 'Top 1%',
      metrics: {
        followers: '1.5M',
        engagementRate: '4.94%',
        estimatedReach: '468.7K'
      }
    },
    demographics: {
      locations: [
        { city: 'Bangalore', percentage: '22%' },
        { city: 'Mumbai', percentage: '16%' },
        { city: 'Hyderabad', percentage: '12%' },
        { city: 'Chennai', percentage: '12%' },
        { city: 'Pune', percentage: '09%' }
      ],
      gender: {
        male: 77.45,
        female: 22.55
      },
      ageGroups: [
        { range: '13-17', percentage: 5 },
        { range: '18-24', percentage: 15 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 25 },
        { range: '45-54', percentage: 10 }
      ]
    },
    engagement: {
      growthRate: '+8.7%',
      commentsPerPost: 0.24,
      audienceEngagement: '4.94%'
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      {/* Influencer Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative">
          <img
            src={mockData.influencer.avatar}
            alt={mockData.influencer.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
            Excellent
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">{mockData.influencer.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold text-indigo-600">{mockData.influencer.rating}</span>
            <span className="text-sm text-gray-500">{mockData.influencer.tier}</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <InfluencerMetrics metrics={mockData.influencer.metrics} />

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Left Column */}
        <div className="space-y-8">
          <AudienceDemographics 
            locations={mockData.demographics.locations}
            gender={mockData.demographics.gender}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <EngagementStats 
            ageGroups={mockData.demographics.ageGroups}
            engagement={mockData.engagement}
          />
        </div>
      </div>
    </div>
  );
}