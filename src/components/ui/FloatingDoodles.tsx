import React from 'react';
import { motion } from 'framer-motion';

const doodleVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const FloatingDoodles = () => {
  const doodles = [
    { id: 1, x: '10%', y: '20%', size: 'w-24 h-24', color: 'from-pink-400/30 to-purple-400/30' },
    { id: 2, x: '85%', y: '15%', size: 'w-32 h-32', color: 'from-blue-400/30 to-cyan-400/30' },
    { id: 3, x: '75%', y: '75%', size: 'w-40 h-40', color: 'from-purple-400/30 to-pink-400/30' },
    { id: 4, x: '15%', y: '85%', size: 'w-28 h-28', color: 'from-indigo-400/30 to-blue-400/30' },
    { id: 5, x: '50%', y: '50%', size: 'w-36 h-36', color: 'from-pink-400/30 to-indigo-400/30' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.id}
          className={`absolute ${doodle.size}`}
          style={{ left: doodle.x, top: doodle.y }}
          variants={doodleVariants}
          animate="animate"
        >
          <div className={`w-full h-full bg-gradient-to-r ${doodle.color} rounded-full blur-xl`} />
        </motion.div>
      ))}
    </div>
  );
};