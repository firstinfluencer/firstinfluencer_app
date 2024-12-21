import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertCircle, Package, Camera, Send } from 'lucide-react';
import { formatDate } from '@/utils/format';

interface DeliverableStatus {
  step: 'content_creation' | 'review' | 'approved' | 'published';
  status: 'completed' | 'in_progress' | 'pending';
  date?: Date;
  details?: string;
}

interface DeliverableTimelineProps {
  deliverableId: string;
  status: DeliverableStatus;
}

export function DeliverableTimeline({ status }: DeliverableTimelineProps) {
  const steps = [
    {
      id: 'content_creation',
      label: 'Content Creation',
      icon: Camera,
      date: status.date,
      description: 'Creator is working on the content'
    },
    {
      id: 'review',
      label: 'Under Review',
      icon: Package,
      description: 'Content submitted for review'
    },
    {
      id: 'approved',
      label: 'Approved',
      icon: Check,
      description: 'Content approved by brand'
    },
    {
      id: 'published',
      label: 'Published',
      icon: Send,
      description: 'Content live on platform'
    }
  ];

  const getStepStatus = (stepId: string) => {
    if (status.step === stepId) return status.status;
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === status.step);
    return stepIndex < currentIndex ? 'completed' : 'pending';
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-8">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(step.id);
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start"
            >
              <div className={`
                relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2
                ${stepStatus === 'completed' ? 'border-green-500 bg-green-50' :
                  stepStatus === 'in_progress' ? 'border-blue-500 bg-blue-50 animate-pulse' :
                  'border-gray-200 bg-white'}
              `}>
                {stepStatus === 'completed' && <Check className="w-6 h-6 text-green-500" />}
                {stepStatus === 'in_progress' && <Clock className="w-6 h-6 text-blue-500" />}
                {stepStatus === 'pending' && <step.icon className="w-6 h-6 text-gray-400" />}
              </div>

              <div className="ml-4 min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">{step.label}</div>
                <div className="mt-1 text-sm text-gray-500">{step.description}</div>
                {status.step === step.id && status.date && (
                  <div className="mt-1 text-sm text-gray-400">
                    {formatDate(status.date)}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}