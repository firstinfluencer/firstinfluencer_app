import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onBack: () => void;
}

export function AuthFormLayout({ children, title, subtitle, onBack }: AuthFormLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="relative">
        <motion.button
          onClick={onBack}
          className="absolute -left-4 -top-4 p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        {children}
      </div>
    </motion.div>
  );
}