import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Stars } from 'lucide-react';

const loadingMessages = [
  "Analyzing your campaign requirements...",
  "Crafting the perfect campaign strategy...",
  "Identifying target audience segments...",
  "Optimizing campaign objectives...",
  "Generating creative campaign ideas...",
  "Fine-tuning campaign parameters...",
  "Preparing campaign recommendations...",
  "Almost ready with your campaign..."
];

export function CampaignLoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* Animated Icons */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <Bot className="w-full h-full text-indigo-600" />
          </motion.div>
          
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-8 h-8 text-pink-500" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [10, -10, 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          >
            <Stars className="w-8 h-8 text-purple-500" />
          </motion.div>
        </div>

        {/* Loading Messages */}
        <div className="h-20">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl text-gray-800 font-medium"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-8">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            animate={{
              width: ["0%", "100%"],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}