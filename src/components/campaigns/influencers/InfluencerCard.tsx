import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Users, TrendingUp, BadgeCheck } from 'lucide-react';
import { Creator } from '@/types';
import { formatNumber } from '@/utils/format';

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-48">
        <img
          src={creator.profilePicture || `https://ui-avatars.com/api/?name=${creator.displayName}`}
          alt={creator.displayName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{creator.displayName}</h3>
            {creator.platforms.instagram && (
              <Instagram className="w-4 h-4 text-pink-400" />
            )}
          </div>
          <p className="text-sm text-white/80 mt-1">{creator.location}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{formatNumber(creator.followers.instagram || 0)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Followers</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{creator.engagementRate.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Engagement</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {creator.categories.map(category => (
            <span
              key={category}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}