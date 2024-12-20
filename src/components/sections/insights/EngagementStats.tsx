import React from 'react';
import { TrendingUp, MessageCircle } from 'lucide-react';

interface EngagementStatsProps {
  ageGroups: Array<{ range: string; percentage: number }>;
  engagement: {
    growthRate: string;
    commentsPerPost: number;
    audienceEngagement: string;
  };
}

export function EngagementStats({ ageGroups, engagement }: EngagementStatsProps) {
  return (
    <>
      {/* Age Groups */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">AUDIENCE AGE GROUP</h4>
        <div className="space-y-3">
          {ageGroups.map(({ range, percentage }) => (
            <div key={range} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{range}</span>
                <span className="text-gray-900 font-medium">{percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${percentage * 2}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-4">GROWTH RATE</h4>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xl font-bold text-green-500">{engagement.growthRate}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">HIGHLY ENGAGING AUDIENCE</h4>
          <p className="text-gray-600">
            {engagement.audienceEngagement} of the audience engages with the content of this creator
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">COMMENTS ENGAGEMENT</h4>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <p className="text-gray-600">
              This creator drives {engagement.commentsPerPost} comments per 100 likes on the posts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}