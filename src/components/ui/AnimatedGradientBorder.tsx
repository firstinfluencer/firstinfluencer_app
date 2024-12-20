import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedGradientBorder: React.FC<AnimatedGradientBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative rounded-xl ${className}`}>
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% auto',
        }}
      />
      <div className="relative bg-white rounded-xl">
        {children}
      </div>
    </div>
  );
};