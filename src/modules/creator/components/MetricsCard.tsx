import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/format';

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: 'trending' | 'users' | 'earnings';
}

export function MetricsCard({ title, value, trend, icon }: MetricsCardProps) {
  const icons = {
    trending: TrendingUp,
    users: Users,
    earnings: DollarSign
  };

  const Icon = icons[icon];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
          <Icon className="w-5 h-5 text-pink-600" />
        </div>
        <h3 className="text-gray-600 font-medium">{title}</h3>
      </div>
      <div className="flex items-end space-x-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${
            trend > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </motion.div>
  );
}