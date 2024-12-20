import React from 'react';
import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  const gradients = [
    { id: 1, x: '10%', y: '20%', color: 'from-indigo-200/30 to-indigo-100/30' },
    { id: 2, x: '85%', y: '15%', color: 'from-pink-200/30 to-purple-200/30' },
    { id: 3, x: '75%', y: '75%', color: 'from-purple-200/30 to-indigo-200/30' },
    { id: 4, x: '15%', y: '85%', color: 'from-blue-200/30 to-indigo-200/30' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      {gradients.map((gradient) => (
        <motion.div
          key={gradient.id}
          className="absolute w-96 h-96 -z-10"
          style={{ left: gradient.x, top: gradient.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${gradient.color} rounded-full blur-3xl`} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}