import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { HypeAuditorMetrics } from '@/types/api';
import { formatNumber } from '@/utils/format';

interface CreatorMetricsProps {
  metrics: HypeAuditorMetrics;
}

export function CreatorMetrics({ metrics }: CreatorMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Followers',
            value: formatNumber(metrics.followers),
            icon: Users,
            color: 'from-blue-500 to-indigo-500'
          },
          {
            label: 'Engagement Rate',
            value: `${metrics.engagement.toFixed(2)}%`,
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500'
          },
          {
            label: 'Avg. Likes',
            value: formatNumber(metrics.avgLikes),
            icon: Heart,
            color: 'from-pink-500 to-rose-500'
          },
          {
            label: 'Avg. Comments',
            value: formatNumber(metrics.avgComments),
            icon: MessageCircle,
            color: 'from-purple-500 to-indigo-500'
          }
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-4"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audience Demographics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Audience Demographics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Gender Split</h4>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${metrics.audienceData.genderSplit.male}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {metrics.audienceData.genderSplit.male}% Male
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${metrics.audienceData.genderSplit.female}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {metrics.audienceData.genderSplit.female}% Female
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Top Countries</h4>
              <div className="space-y-2">
                {metrics.audienceData.topCountries.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{country.country}</span>
                    <span className="text-sm font-medium">{country.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Posts Performance</h3>
          <div className="space-y-4">
            {metrics.recentPosts.map((post) => (
              <div key={post.url} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{formatNumber(post.comments)}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}