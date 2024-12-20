import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface CampaignPromptProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export function CampaignPrompt({ value, onChange, onSubmit, onBack, loading }: CampaignPromptProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., I'm looking for travel influencers to promote our new luggage collection, focusing on durability and adventure-ready features..."
          className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
        <Sparkles className="absolute right-4 top-4 text-indigo-500 w-5 h-5" />
      </div>

      <div className="flex justify-end">
        <motion.button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium flex items-center space-x-2 ${
            loading || !value.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
          whileHover={{ scale: loading || !value.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !value.trim() ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Continue</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}