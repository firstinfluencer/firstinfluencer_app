import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      whileHover={{ x: -4 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </motion.button>
  );
}