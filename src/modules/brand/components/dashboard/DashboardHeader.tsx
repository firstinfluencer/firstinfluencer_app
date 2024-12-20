import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getCompanyFromEmail } from '@/utils/format';

export function DashboardHeader() {
  const { user } = useAuth();
  const companyInitial = user?.email ? getCompanyFromEmail(user.email).charAt(0).toUpperCase() : '';

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-end items-center space-x-4">
        <motion.button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </motion.button>
        <motion.div
          className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-indigo-600 font-medium">{companyInitial}</span>
        </motion.div>
      </div>
    </div>
  );
}