import React from 'react';
import { motion } from 'framer-motion';

interface AuthButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant: 'brand' | 'creator';
  children: React.ReactNode;
}

export function AuthButton({
  type = 'button',
  onClick,
  variant,
  children,
}: AuthButtonProps) {
  const gradients = {
    brand: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800',
    creator: 'from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative w-full py-3.5 px-4 rounded-xl text-white font-medium overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]}`} />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
      <span className="relative">{children}</span>
    </motion.button>
  );
}