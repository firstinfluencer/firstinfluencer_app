import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoodleBackground from '../ui/DoodleBackground';

export function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <DoodleBackground />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-600 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">The Future of Creator Marketing</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Connect with Amazing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                Creators
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find and collaborate with verified creators who align with your brand. 
              Launch campaigns that resonate with your audience and drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium text-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gray-100 text-gray-900 font-medium text-lg hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}