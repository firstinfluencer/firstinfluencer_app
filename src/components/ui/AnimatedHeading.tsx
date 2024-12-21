import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHeadingProps {
  headings: string[];
  interval?: number;
}

export function AnimatedHeading({ headings, interval = 3000 }: AnimatedHeadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headings.length);
    }, interval);

    return () => clearInterval(timer);
  }, [headings.length, interval]);

  return (
    <div className="h-[120px] md:h-[144px] relative">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          {headings[currentIndex].split(' ').map((word, i, arr) => (
            <React.Fragment key={i}>
              {i === arr.length - 1 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                  {word}
                </span>
              ) : (
                `${word} `
              )}
            </React.Fragment>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}