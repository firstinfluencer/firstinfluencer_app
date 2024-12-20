import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface Influencer {
  id: string;
  name: string;
  cost: string;
  likes: string;
  engagementRate: string;
  followers: string;
  followerGrowth: string;
}

interface InfluencerTableProps {
  influencers: Influencer[];
  selectedInfluencers: string[];
  onSelect: (ids: string[]) => void;
}

export function InfluencerTable({ influencers, selectedInfluencers, onSelect }: InfluencerTableProps) {
  const toggleInfluencer = (id: string) => {
    if (selectedInfluencers.includes(id)) {
      onSelect(selectedInfluencers.filter(i => i !== id));
    } else {
      onSelect([...selectedInfluencers, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E.Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {influencers.map((influencer) => (
            <motion.tr
              key={influencer.id}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedInfluencers.includes(influencer.id) ? 'bg-indigo-50' : ''
              }`}
              onClick={() => toggleInfluencer(influencer.id)}
              whileHover={{ scale: 1.01 }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.name)}&background=random`}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{influencer.cost}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{influencer.likes}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{influencer.engagementRate}</td>
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm text-gray-900">{influencer.followers}</div>
                  <div className="text-sm text-green-600">+{influencer.followerGrowth}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Play className="w-4 h-4 text-indigo-600" />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}