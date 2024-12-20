import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AccountTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  onClick: () => void;
}

export function AccountTypeCard({
  icon: Icon,
  title,
  description,
  gradient,
  iconColor,
  onClick,
}: AccountTypeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center p-6 rounded-xl bg-gradient-to-r ${gradient} transition-all duration-300`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/50 backdrop-blur-sm`}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </motion.div>
      <div className="ml-4 text-left">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </motion.button>
  );
}