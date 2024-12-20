import React from 'react';
import { motion } from 'framer-motion';

const DoodleBackground: React.FC = () => {
  const doodles = [
    { id: 1, x: '10%', y: '20%', rotate: 15 },
    { id: 2, x: '85%', y: '15%', rotate: -20 },
    { id: 3, x: '75%', y: '75%', rotate: 45 },
    { id: 4, x: '15%', y: '85%', rotate: -15 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.id}
          className="absolute"
          style={{ left: doodle.x, top: doodle.y }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: doodle.rotate,
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-32 h-32 bg-gradient-to-r from-pink-200 to-pink-100 rounded-full opacity-20 blur-xl" />
        </motion.div>
      ))}
    </div>
  );
};

export default DoodleBackground;