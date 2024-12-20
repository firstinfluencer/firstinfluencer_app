import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Campaign } from '@/types';
import { useCreatorSearch } from '@/hooks/useCreatorSearch';
import { InfluencerCategory } from './InfluencerCategory';
import { categorizeInfluencers, getTopCreatorsByEngagement } from '@/utils/influencers';

interface SuggestedInfluencersProps {
  campaign: Campaign;
}

export function SuggestedInfluencers({ campaign }: SuggestedInfluencersProps) {
  const { creators, loading } = useCreatorSearch({
    category: campaign.category,
    minFollowers: 1000
  });

  if (loading || !creators.length) return null;

  const categorized = categorizeInfluencers(creators);
  const sections = [
    {
      title: 'Recommended Nano Influencers',
      description: '1K - 10K followers • High engagement & authenticity',
      creators: getTopCreatorsByEngagement(categorized.nano, 3),
      isTopMatch: campaign.budget < 50000
    },
    {
      title: 'Recommended Micro Influencers',
      description: '10K - 100K followers • Great reach & engagement balance',
      creators: getTopCreatorsByEngagement(categorized.micro, 3),
      isTopMatch: campaign.budget >= 50000 && campaign.budget < 200000
    },
    {
      title: 'Recommended Macro Influencers',
      description: '100K - 1M followers • High reach & brand awareness',
      creators: getTopCreatorsByEngagement(categorized.macro, 3),
      isTopMatch: campaign.budget >= 200000
    }
  ].filter(section => section.creators.length > 0);

  return (
    <div className="mt-12 space-y-12">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Users className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold">Suggested Creators</h2>
      </div>

      {sections.map((section) => (
        <InfluencerCategory
          key={section.title}
          title={section.title}
          description={section.description}
          creators={section.creators}
          isTopMatch={section.isTopMatch}
        />
      ))}
    </div>
  );
}