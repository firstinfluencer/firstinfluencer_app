import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, TrendingUp, DollarSign, Users } from 'lucide-react';
import { InfluencerList } from './InfluencerList';
import { EngagementChart } from './EngagementChart';

export function CampaignReporting() {
  const campaignData = {
    engagements: {
      total: '2.48m',
      likes: '2,280,163',
      comments: '203,803',
      engagementRate: '3.74%',
      cpe: 'Rs. 1.29'
    },
    campaign: {
      hashtag: '#swiggyindia',
      budgetSpent: '3.02m',
      influencersLive: '14/16',
      postsLive: '12/16',
      estimatedReach: '27.01m'
    },
    historicalEngagement: {
      historical: 1.90,
      actual: 2.48
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Reporting</h2>
        <p className="text-gray-600">
          Track your campaign metrics in your dashboard with real time updates. Analyze and measure the impact of your influencer marketing campaigns
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">ENGAGEMENTS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-600">Likes</span>
                </div>
                <span className="font-medium">{campaignData.engagements.likes}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Comments</span>
                </div>
                <span className="font-medium">{campaignData.engagements.comments}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">E.Rate</span>
                </div>
                <span className="font-medium">{campaignData.engagements.engagementRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-600">CPE</span>
                </div>
                <span className="font-medium">{campaignData.engagements.cpe}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">{campaignData.campaign.hashtag}</h3>
                <div className="mt-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm inline-flex">
                  Budget spent: {campaignData.campaign.budgetSpent}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">INFLUENCERS LIVE</span>
                <span className="font-medium text-indigo-600">{campaignData.campaign.influencersLive}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">NO. OF POSTS LIVES</span>
                <span className="font-medium text-indigo-600">{campaignData.campaign.postsLive}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">EST. CAMPAIGN REACH</span>
                <span className="font-medium">{campaignData.campaign.estimatedReach}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">HISTORICAL VS ACTUAL ENGAGEMENT</h3>
            <EngagementChart 
              historical={campaignData.historicalEngagement.historical}
              actual={campaignData.historicalEngagement.actual}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">CAMPAIGN INFLUENCERS</h3>
            <InfluencerList />
          </div>
        </div>
      </div>
    </div>
  );
}