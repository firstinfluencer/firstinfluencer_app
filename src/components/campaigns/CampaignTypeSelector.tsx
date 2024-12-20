import React from 'react';
import { motion } from 'framer-motion';
import { Bot, PenTool, Clock } from 'lucide-react';

interface CampaignTypeSelectorProps {
  onSelect: (type: 'ai' | 'manual') => void;
}

export function CampaignTypeSelector({ onSelect }: CampaignTypeSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">
        How would you like to create your campaign?
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          onClick={() => onSelect('ai')}
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build with AI</h3>
            <p className="text-gray-600 mb-4">
              Let AI help you create the perfect campaign in minutes
            </p>
            <div className="flex items-center text-sm text-indigo-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>~5 minutes</span>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelect('manual')}
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <PenTool className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build Manually</h3>
            <p className="text-gray-600 mb-4">
              Create your campaign from scratch with full control
            </p>
            <div className="flex items-center text-sm text-pink-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>~15 minutes</span>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}