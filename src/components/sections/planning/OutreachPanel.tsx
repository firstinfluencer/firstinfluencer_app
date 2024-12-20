import React from 'react';
import { motion } from 'framer-motion';

interface OutreachPanelProps {
  selectedInfluencers: string[];
}

export function OutreachPanel({ selectedInfluencers }: OutreachPanelProps) {
  if (selectedInfluencers.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Selected Influencers</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {selectedInfluencers.map((id) => (
          <div
            key={id}
            className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
              {id[0].toUpperCase()}
            </div>
            <span className="text-sm text-indigo-600">Influencer {id}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Send Outreach Message
      </motion.button>
    </div>
  );
}