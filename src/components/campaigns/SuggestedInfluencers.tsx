import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Campaign } from '@/types';
import { useCreatorSearch } from '@/hooks/useCreatorSearch';
import { CreatorCard } from '@/modules/brand/components/CreatorCard';

interface SuggestedInfluencersProps {
  campaign: Campaign;
}

export function SuggestedInfluencers({ campaign }: SuggestedInfluencersProps) {
  const { creators, loading } = useCreatorSearch({
    category: campaign.category,
    minFollowers: campaign.budget < 100000 ? 10000 : 50000,
    maxFollowers: campaign.budget < 100000 ? 50000 : undefined
  });

  const suggestedCreators = creators.slice(0, 3);

  if (loading || suggestedCreators.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Users className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold">Suggested Influencers</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestedCreators.map((creator, index) => (
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