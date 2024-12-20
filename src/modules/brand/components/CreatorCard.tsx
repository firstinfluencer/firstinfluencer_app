import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Users, TrendingUp, BadgeCheck } from 'lucide-react';
import { CreatorMetrics } from '@/types/api';
import { formatNumber } from '@/utils/format';

interface CreatorCardProps {
  metrics: CreatorMetrics;
  onClick: () => void;
}

export function CreatorCard({ metrics, onClick }: CreatorCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      {/* Profile Image Section - Top 2/3 */}
      <div className="relative h-[300px]">
        <img
          src={metrics.profilePicture}
          alt={metrics.username}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback to UI Avatars if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${metrics.username}&size=300&background=random`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold">@{metrics.username}</h3>
            {metrics.isVerified && <BadgeCheck className="w-5 h-5 text-blue-400" />}
          </div>
          <p className="text-white/90 text-sm line-clamp-2">{metrics.bio}</p>
        </div>
      </div>

      {/* Metrics Section - Bottom 1/3 */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold">{formatNumber(metrics.followers)}</span>
            </div>
            <p className="text-xs text-gray-600">Followers</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold">{metrics.engagement.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-gray-600">Engagement</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {metrics.categories.map(category => (
            <span
              key={category}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}