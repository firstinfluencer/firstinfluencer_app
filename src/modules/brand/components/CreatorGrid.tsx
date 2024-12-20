import React from 'react';
import { motion } from 'framer-motion';
import { Creator } from '@/types';
import { CreatorCard } from './CreatorCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface CreatorGridProps {
  creators: Creator[];
  loading: boolean;
}

export function CreatorGrid({ creators, loading }: CreatorGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No creators found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}