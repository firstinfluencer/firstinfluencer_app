import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineStepProps {
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: Date;
  isLast?: boolean;
}

export function TimelineStep({ label, status, date, isLast }: TimelineStepProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-300" />;
    }
  };

  return (
    <div className="relative flex items-start">
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-200" />
      )}

      {/* Step Icon */}
      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 ${
        status === 'completed' ? 'border-green-500' :
        status === 'in_progress' ? 'border-blue-500' :
        'border-gray-200'
      }`}>
        {getStatusIcon()}
      </div>

      {/* Step Content */}
      <div className="ml-4">
        <h4 className="text-base font-medium text-gray-900">{label}</h4>
        <p className={`text-sm ${
          status === 'completed' ? 'text-green-600' :
          status === 'in_progress' ? 'text-blue-600' :
          'text-gray-500'
        }`}>
          {date.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}