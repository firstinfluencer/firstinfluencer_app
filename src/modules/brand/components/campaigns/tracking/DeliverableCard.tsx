import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Video } from 'lucide-react';
import { DeliverableTimeline } from './DeliverableTimeline';

interface Deliverable {
  id: string;
  type: 'photo' | 'video' | 'reel';
  platform: 'instagram' | 'youtube' | 'tiktok';
  creatorName: string;
  status: {
    step: 'content_creation' | 'review' | 'approved' | 'published';
    status: 'completed' | 'in_progress' | 'pending';
    date?: Date;
  };
}

interface DeliverableCardProps {
  deliverable: Deliverable;
  onApprove?: () => void;
  onReject?: () => void;
}

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Video // Using Video icon for TikTok since it's not available in lucide
};

export function DeliverableCard({ deliverable, onApprove, onReject }: DeliverableCardProps) {
  const PlatformIcon = platformIcons[deliverable.platform];
  const showActions = deliverable.status.step === 'review' && 
                     deliverable.status.status === 'in_progress';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <PlatformIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{deliverable.creatorName}</h3>
              <p className="text-sm text-gray-500 capitalize">{deliverable.type}</p>
            </div>
          </div>
          
          {showActions && (
            <div className="flex space-x-3">
              <motion.button
                onClick={onReject}
                className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reject
              </motion.button>
              <motion.button
                onClick={onApprove}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Approve
              </motion.button>
            </div>
          )}
        </div>

        <DeliverableTimeline
          deliverableId={deliverable.id}
          status={deliverable.status}
        />
      </div>
    </motion.div>
  );
}