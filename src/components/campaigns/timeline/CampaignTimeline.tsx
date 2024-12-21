import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Campaign } from '@/types';
import { formatDate } from '@/utils/format';

interface CampaignTimelineProps {
  campaign: Campaign;
}

export function CampaignTimeline({ campaign }: CampaignTimelineProps) {
  // Define timeline steps with their statuses
  const steps = [
    { 
      id: 'accepted',
      label: 'Campaign Accepted',
      status: 'completed',
      date: campaign.createdAt
    },
    {
      id: 'content_creation',
      label: 'Content Creation',
      status: 'in_progress',
      date: new Date(campaign.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'review',
      label: 'Content Review',
      status: 'pending',
      date: new Date(campaign.createdAt.getTime() + 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'publishing',
      label: 'Content Publishing',
      status: 'pending',
      date: new Date(campaign.createdAt.getTime() + 21 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'completed',
      label: 'Campaign Completed',
      status: 'pending',
      date: campaign.endDate
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Campaign Timeline</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-500 to-gray-200" 
             style={{ 
               backgroundSize: '100% 40%',
               backgroundRepeat: 'no-repeat'
             }} 
        />
        
        {/* Timeline Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start group"
            >
              {/* Step Circle */}
              <div className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 transition-colors ${
                step.status === 'completed' ? 'border-indigo-500 text-indigo-500' :
                step.status === 'in_progress' ? 'border-indigo-500 text-indigo-500 animate-pulse' :
                'border-gray-200 text-gray-400'
              }`}>
                {step.status === 'completed' && <Check className="w-6 h-6" />}
                {step.status === 'in_progress' && <Clock className="w-6 h-6" />}
                {step.status === 'pending' && <AlertCircle className="w-6 h-6" />}
              </div>

              {/* Step Content */}
              <div className="ml-4 flex-1">
                <h4 className={`text-lg font-medium ${
                  step.status === 'completed' ? 'text-indigo-600' :
                  step.status === 'in_progress' ? 'text-indigo-600' :
                  'text-gray-500'
                }`}>
                  {step.label}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatDate(step.date)}
                </p>
              </div>

              {/* Hover Card with Details */}
              <div className="absolute left-20 top-0 hidden group-hover:block">
                <div className="bg-white rounded-lg shadow-lg p-4 w-64">
                  <h5 className="font-medium text-gray-900 mb-2">{step.label}</h5>
                  <p className="text-sm text-gray-600">
                    {step.status === 'completed' && 'This step has been completed'}
                    {step.status === 'in_progress' && 'This step is currently in progress'}
                    {step.status === 'pending' && 'This step is pending completion'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}