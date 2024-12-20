import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';

interface CreatorCardProps {
  name: string;
  image: string;
  category: string;
  followers: string;
  platforms: ('instagram' | 'tiktok' | 'youtube')[];
  delay?: number;
}

const platformIcons = {
  instagram: Instagram,
  tiktok: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  youtube: Youtube,
};

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  name, 
  image, 
  category, 
  followers, 
  platforms,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold">{name}</h3>
          <p className="text-white/80 text-sm">{category}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform];
              return (
                <Icon 
                  key={platform} 
                  className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer" 
                />
              );
            })}
          </div>
          <span className="text-sm font-medium text-gray-600">{followers} followers</span>
        </div>
      </div>
    </motion.div>
  );
};