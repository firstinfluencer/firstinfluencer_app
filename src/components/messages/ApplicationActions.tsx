import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApplications } from '@/hooks/useApplications';

interface ApplicationActionsProps {
  applicationId: string;
  onActionComplete: () => void;
}

export function ApplicationActions({ applicationId, onActionComplete }: ApplicationActionsProps) {
  const { updateApplicationStatus } = useApplications();

  const handleAction = async (status: 'accepted' | 'rejected') => {
    try {
      await updateApplicationStatus(applicationId, status);
      toast.success(`Application ${status === 'accepted' ? 'accepted' : 'rejected'} successfully`);
      onActionComplete();
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application status');
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <motion.button
        onClick={() => handleAction('accepted')}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Check className="w-4 h-4" />
        <span>Accept</span>
      </motion.button>

      <motion.button
        onClick={() => handleAction('rejected')}
        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-4 h-4" />
        <span>Reject</span>
      </motion.button>
    </div>
  );
}