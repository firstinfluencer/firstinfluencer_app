import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import { Campaign } from '@/types';
import { useCreatorSearch } from '@/hooks/useCreatorSearch';
import { CreatorCard } from '@/modules/brand/components/CreatorCard';

interface SuggestedInfluencersProps {
  campaign: Campaign;
}

export function SuggestedInfluencers({ campaign }: SuggestedInfluencersProps) {
  const { creators, loading } = useCreatorSearch({
    category: campaign.category,
    minFollowers: 1000,
    maxFollowers: undefined
  });

  if (loading || !creators.length) return null;

  // Categorize creators by follower count
  const categorizedCreators = {
    nano: creators.filter(c => c.followers.instagram < 10000),
    micro: creators.filter(c => c.followers.instagram >= 10000 && c.followers.instagram < 100000),
    macro: creators.filter(c => c.followers.instagram >= 100000 && c.followers.instagram < 1000000),
    mega: creators.filter(c => c.followers.instagram >= 1000000)
  };

  // Select top creators from each category based on engagement rate
  const getTopCreators = (creators: typeof categorizedCreators.micro, count: number) => {
    return creators
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, count);
  };

  const sections = [
    {
      title: 'Recommended Nano Influencers',
      description: '1K - 10K followers • High engagement & authenticity',
      creators: getTopCreators(categorizedCreators.nano, 3)
    },
    {
      title: 'Recommended Micro Influencers',
      description: '10K - 100K followers • Great reach & engagement balance',
      creators: getTopCreators(categorizedCreators.micro, 3)
    },
    {
      title: 'Recommended Macro Influencers',
      description: '100K - 1M followers • High reach & brand awareness',
      creators: getTopCreators(categorizedCreators.macro, 3)
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

      {sections.map((section, sectionIndex) => (
        <div key={section.title} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                {sectionIndex === 0 && (
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Best Match</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-1">{section.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.creators.map((creator, index) => (
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
      ))}
    </div>
  );
}