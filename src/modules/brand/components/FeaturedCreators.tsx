import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useCreatorSearch } from '../hooks/useCreatorSearch';
import { CreatorCard } from './CreatorCard';

export function FeaturedCreators() {
  const { creators, loading } = useCreatorSearch({
    minFollowers: 100000, // Featured creators have 100k+ followers
    platform: 'instagram'
  });

  const featuredCreators = creators.slice(0, 3); // Show top 3 featured creators

  if (loading || featuredCreators.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Star className="w-5 h-5 text-yellow-400" />
        <h2 className="text-xl font-semibold text-gray-900">Featured Creators</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCreators.map((creator, index) => (
          <motion.div
            key={creator.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CreatorCard creator={creator} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}