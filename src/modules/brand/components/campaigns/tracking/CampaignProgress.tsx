import React from 'react';
import { motion } from 'framer-motion';

interface CampaignProgressProps {
  progress: {
    percentage: number;
    total: number;
    completed: number;
    inProgress: number;
  };
}

export function CampaignProgress({ progress }: CampaignProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{progress.percentage}% Complete</span>
        <span className="text-gray-500">
          {progress.completed}/{progress.total} Deliverables
        </span>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}