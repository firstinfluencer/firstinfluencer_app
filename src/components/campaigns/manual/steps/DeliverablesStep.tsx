import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Video } from 'lucide-react';

interface DeliverablesStepProps {
  formData: {
    platforms: {
      instagram: boolean;
      youtube: boolean;
      tiktok: boolean;
    };
    contentTypes: {
      photos: boolean;
      videos: boolean;
      reels: boolean;
    };
    requirements: string[];
  };
  onChange: (field: string, value: any) => void;
}

export function DeliverablesStep({ formData, onChange }: DeliverablesStepProps) {
  const platforms = [
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      color: 'pink'
    },
    {
      id: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      color: 'red'
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      icon: Video,
      color: 'purple'
    }
  ];

  const contentTypes = [
    {
      id: 'photos',
      label: 'Photos',
      description: 'High-quality product photos'
    },
    {
      id: 'videos',
      label: 'Videos',
      description: 'Engaging video content'
    },
    {
      id: 'reels',
      label: 'Reels/Stories',
      description: 'Short-form vertical videos'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Platforms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Platforms
        </label>
        <div className="grid grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => {
                onChange('platforms', {
                  ...formData.platforms,
                  [platform.id]: !formData.platforms[platform.id as keyof typeof formData.platforms]
                });
              }}
              className={`p-4 rounded-xl text-left border-2 ${
                formData.platforms[platform.id as keyof typeof formData.platforms]
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <platform.icon className={`w-5 h-5 text-${platform.color}-500`} />
                <span className="font-medium">{platform.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Content types
        </label>
        <div className="grid grid-cols-3 gap-4">
          {contentTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => {
                onChange('contentTypes', {
                  ...formData.contentTypes,
                  [type.id]: !formData.contentTypes[type.id as keyof typeof formData.contentTypes]
                });
              }}
              className={`p-4 rounded-xl text-left border-2 ${
                formData.contentTypes[type.id as keyof typeof formData.contentTypes]
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-medium text-gray-900">{type.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content requirements
        </label>
        <textarea
          value={formData.requirements.join('\n')}
          onChange={(e) => {
            const requirements = e.target.value
              .split('\n')
              .map(req => req.trim())
              .filter(Boolean);
            onChange('requirements', requirements);
          }}
          placeholder="Enter each requirement on a new line..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Add specific instructions for creators
        </p>
      </div>
    </div>
  );
}