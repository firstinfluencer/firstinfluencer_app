import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creatorHandles } from '@/data/creators';
import { CreatorCard } from './CreatorCard';
import { CreatorDetailsModal } from './CreatorDetailsModal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { fetchCreatorMetrics } from '@/services/api/hypeauditor';
import { CreatorMetrics } from '@/types/api';

interface CreatorListProps {
  searchTerm: string;
  filters: {
    category: string;
    minFollowers: number;
    maxFollowers?: number;
    platform: 'instagram' | 'tiktok' | 'youtube';
  };
}

export function CreatorList({ searchTerm, filters }: CreatorListProps) {
  const [creators, setCreators] = useState<Array<CreatorMetrics>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState<CreatorMetrics | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const metrics = await Promise.all(
          creatorHandles.map(handle => fetchCreatorMetrics(handle))
        );
        setCreators(metrics);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const filteredCreators = creators.filter(creator => {
    if (searchTerm && !creator.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filters.category && !creator.categories.includes(filters.category)) {
      return false;
    }

    if (filters.minFollowers && creator.followers < filters.minFollowers) {
      return false;
    }

    if (filters.maxFollowers && creator.followers > filters.maxFollowers) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredCreators.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No creators found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CreatorCard
                metrics={creator}
                onClick={() => setSelectedCreator(creator)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <CreatorDetailsModal
        isOpen={!!selectedCreator}
        onClose={() => setSelectedCreator(null)}
        metrics={selectedCreator!}
      />
    </>
  );
}