import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';

interface InfluencerMetricsProps {
  metrics: {
    followers: string;
    engagementRate: string;
    estimatedReach: string;
  };
}

export function InfluencerMetrics({ metrics }: InfluencerMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Followers</p>
            <p className="text-lg font-bold">{metrics.followers}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">E.Rate</p>
            <p className="text-lg font-bold">{metrics.engagementRate}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Est. Reach</p>
            <p className="text-lg font-bold">{metrics.estimatedReach}</p>
          </div>
        </div>
      </div>
    </div>
  );
}