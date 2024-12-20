import React from 'react';
import { motion } from 'framer-motion';
import { useInfluencerListings } from '../../hooks/useInfluencerListings';
import { InfluencerCard } from './InfluencerCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface InfluencerListProps {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
}

export function InfluencerList({ category, minFollowers, maxFollowers }: InfluencerListProps) {
  const { listings, loading, error } = useInfluencerListings({
    category,
    minFollowers,
    maxFollowers
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading influencers. Please try again later.
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No influencers found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((influencer, index) => (
        <motion.div
          key={influencer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InfluencerCard influencer={influencer} />
        </motion.div>
      ))}
    </div>
  );
}