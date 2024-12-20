import React from 'react';
import { motion } from 'framer-motion';
import { Building2, UserCircle } from 'lucide-react';

interface AccountTypeSelectorProps {
  onSelect: (type: 'brand' | 'creator') => void;
}

export function AccountTypeSelector({ onSelect }: AccountTypeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-center mb-3">Join FirstInfluencer</h1>
      <p className="text-gray-600 text-center mb-8">Choose your account type to get started</p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('brand')}
        className="w-full flex items-center p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200"
      >
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="ml-4 text-left">
          <h3 className="text-xl font-semibold text-gray-900">Brand Account</h3>
          <p className="text-gray-600">For companies looking to collaborate with creators</p>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('creator')}
        className="w-full flex items-center p-6 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition-all duration-200"
      >
        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
          <UserCircle className="w-6 h-6 text-pink-600" />
        </div>
        <div className="ml-4 text-left">
          <h3 className="text-xl font-semibold text-gray-900">Creator Account</h3>
          <p className="text-gray-600">For influencers and content creators</p>
        </div>
      </motion.button>
    </motion.div>
  );
}