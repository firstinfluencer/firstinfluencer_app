import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Creator } from '@/types';
import { CreatorCard } from './InfluencerCard';

interface InfluencerCategoryProps {
  title: string;
  description: string;
  creators: Creator[];
  isTopMatch?: boolean;
}

export function InfluencerCategory({ title, description, creators, isTopMatch }: InfluencerCategoryProps) {
  if (creators.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            {isTopMatch && (
              <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Best Match</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
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