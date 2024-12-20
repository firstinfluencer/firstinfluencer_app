import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Users, TrendingUp, MapPin, BadgeCheck } from 'lucide-react';
import { InfluencerListing } from '../../types/influencer';
import { formatNumber } from '../../utils/format';

interface InfluencerCardProps {
  influencer: InfluencerListing;
  onClick?: () => void;
}

export function InfluencerCard({ influencer, onClick }: InfluencerCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={influencer.profilePicture}
          alt={influencer.fullName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{influencer.fullName}</h3>
            {influencer.isVerified && (
              <BadgeCheck className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {influencer.location}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          {influencer.platforms.instagram && (
            <Instagram className="w-5 h-5 text-pink-500" />
          )}
          {influencer.platforms.youtube && (
            <Youtube className="w-5 h-5 text-red-500" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Users className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-sm font-medium">{formatNumber(influencer.metrics.followers)}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-sm font-medium">{influencer.metrics.engagement.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Engagement</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {influencer.category.map(cat => (
            <span
              key={cat}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}