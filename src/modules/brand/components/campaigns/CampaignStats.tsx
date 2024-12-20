import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

const stats = [
  {
    label: 'Active Campaigns',
    value: '12',
    trend: '+2',
    icon: Target,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    label: 'Total Reach',
    value: '2.4M',
    trend: '+15%',
    icon: Users,
    color: 'from-green-500 to-emerald-500'
  },
  {
    label: 'Avg. Engagement',
    value: '4.8%',
    trend: '+0.5%',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500'
  },
  {
    label: 'Total Spent',
    value: formatCurrency(125000),
    trend: '+12%',
    icon: DollarSign,
    color: 'from-orange-500 to-red-500'
  }
];

export function CampaignStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}