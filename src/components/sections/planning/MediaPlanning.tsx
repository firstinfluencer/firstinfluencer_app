import React from 'react';
import { Play, TrendingUp, Users, DollarSign } from 'lucide-react';

export function MediaPlanning() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800/70 mb-2">Media Planning & Outreach</h2>
        <p className="text-gray-600/60">
          Turn influencer data & insights to build media plans that hit positive impact then automate your influencer outreach process easier.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Static Influencer Table */}
        <div className="col-span-2">
          <div className="bg-white/40 backdrop-blur-xl rounded-xl shadow-sm overflow-hidden border border-gray-100/40">
            <div className="px-6 py-4 bg-gray-50/40 border-b border-gray-200/40">
              <div className="text-sm font-medium text-gray-500/70">TOP PERFORMING INFLUENCERS</div>
            </div>
            <div className="divide-y divide-gray-200/40">
              {[
                {
                  name: 'Ankita Kumar',
                  category: 'Lifestyle & Travel',
                  likes: '3.4m',
                  engagementRate: '4.5%',
                  followers: '8.1m',
                  growth: '47.5%'
                },
                {
                  name: 'Ashna Zaveri',
                  category: 'Fashion & Beauty',
                  likes: '1.9m',
                  engagementRate: '5.2%',
                  followers: '4.2m',
                  growth: '24.5%'
                }
              ].map((influencer, index) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200/40 overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.name)}&background=random`}
                        alt=""
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900/60">{influencer.name}</div>
                      <div className="text-sm text-gray-500/60">{influencer.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-sm text-gray-900/60">{influencer.followers}</div>
                      <div className="text-sm text-green-600/60">+{influencer.growth}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900/60">{influencer.likes}</div>
                      <div className="text-sm text-gray-500/60">{influencer.engagementRate}</div>
                    </div>
                    <Play className="w-4 h-4 text-gray-400/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics Panel */}
        <div className="space-y-6">
          <div className="bg-white/40 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-gray-100/40">
            <div className="text-lg font-medium text-gray-900/70 mb-6">Performance Overview</div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100/40 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600/70" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500/60">Total Reach</div>
                    <div className="font-semibold text-gray-900/60">12.3M</div>
                  </div>
                </div>
                <div className="text-sm text-green-600/70">+24.5%</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100/40 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600/70" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500/60">Avg Engagement</div>
                    <div className="font-semibold text-gray-900/60">4.8%</div>
                  </div>
                </div>
                <div className="text-sm text-green-600/70">+2.1%</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-100/40 rounded-lg">
                    <DollarSign className="w-5 h-5 text-pink-600/70" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500/60">Cost per Engagement</div>
                    <div className="font-semibold text-gray-900/60">₹1.24</div>
                  </div>
                </div>
                <div className="text-sm text-green-600/70">-8.3%</div>
              </div>
            </div>
          </div>

          {/* Campaign Status */}
          <div className="bg-white/40 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-gray-100/40">
            <div className="text-lg font-medium text-gray-900/70 mb-6">Campaign Status</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600/60">Active Campaigns</span>
                <span className="font-medium text-gray-900/60">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600/60">Pending Approvals</span>
                <span className="font-medium text-gray-900/60">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600/60">Content Delivered</span>
                <span className="font-medium text-gray-900/60">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}