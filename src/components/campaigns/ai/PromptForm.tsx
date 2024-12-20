import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

interface PromptFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function PromptForm({ value, onChange, onSubmit, onBack, loading }: PromptFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., I'm looking for travel influencers to promote our new luggage collection. We want to highlight the durability and adventure-ready features..."
          className="w-full h-48 px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
        <Sparkles className="absolute right-4 top-4 text-indigo-500 w-5 h-5" />
      </div>

      <div className="flex justify-between items-center">
        <BackButton onClick={onBack} />

        <motion.button
          type="submit"
          disabled={loading || !value.trim()}
          className={`px-6 py-3 rounded-xl text-white font-medium flex items-center space-x-2 ${
            loading || !value.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
          }`}
          whileHover={loading || !value.trim() ? {} : { scale: 1.02 }}
          whileTap={loading || !value.trim() ? {} : { scale: 0.98 }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Generate Campaign</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}