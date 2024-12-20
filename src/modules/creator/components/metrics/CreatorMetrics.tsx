import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';
import { useMetrics } from '@/modules/creator/hooks/useMetrics';
import { formatNumber, formatCurrency } from '@/utils/format';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function CreatorMetrics() {
  const { metrics, loading } = useMetrics();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (!metrics) return null;

  const stats = [
    {
      label: 'Total Earnings',
      value: formatCurrency(metrics.totalEarnings),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Completed Campaigns',
      value: metrics.completedCampaigns,
      icon: Star,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Avg. Engagement',
      value: `${metrics.averageEngagement.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      label: 'Recent Growth',
      value: `+${metrics.recentGrowth.instagram || 0}%`,
      icon: Users,
      color: 'from-pink-500 to-rose-500'
    }
  ];

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
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}