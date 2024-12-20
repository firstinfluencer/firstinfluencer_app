import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface EngagementChartProps {
  historical: number;
  actual: number;
}

export function EngagementChart({ historical, actual }: EngagementChartProps) {
  const progress = ((actual - historical) / historical) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <span className="text-sm font-medium text-indigo-600">Progress</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">HISTORICAL</span>
            <span className="font-medium">{historical.toFixed(2)}m</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              className="h-full bg-gray-300 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">ACTUAL</span>
            <span className="font-medium">{actual.toFixed(2)}m</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}