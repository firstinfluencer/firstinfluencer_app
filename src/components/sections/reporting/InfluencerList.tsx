import React from 'react';
import { motion } from 'framer-motion';

export function InfluencerList() {
  const influencers = Array(14).fill(null).map((_, i) => ({
    id: i,
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
    isLive: Math.random() > 0.2
  }));

  return (
    <div className="flex flex-wrap gap-2">
      {influencers.map((influencer) => (
        <motion.div
          key={influencer.id}
          className="relative"
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={influencer.avatar}
            alt={`Influencer ${influencer.id + 1}`}
            className="w-10 h-10 rounded-full"
          />
          {influencer.isLive && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </motion.div>
      ))}
    </div>
  );
}