import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, BarChart, Zap, Star, Shield } from 'lucide-react';

const features = [
  {
    name: 'Verified Creators',
    description: 'Work with pre-vetted creators who maintain high engagement rates and authentic followers.',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Smart Matching',
    description: 'Our AI pairs you with creators who perfectly align with your brand values and target audience.',
    icon: Target,
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Real-Time Analytics',
    description: 'Track campaign performance, engagement metrics, and ROI in real-time.',
    icon: BarChart,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Quick Launch',
    description: 'Start your first campaign in minutes with our streamlined creator outreach process.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Quality Content',
    description: 'Get high-quality, authentic content that resonates with your target audience.',
    icon: Star,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Brand Safety',
    description: 'Advanced content monitoring and brand safety tools to protect your reputation.',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
  },
];

export function Features() {
  return (
    <div id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
          >
            FEATURES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-4xl font-bold text-gray-900"
          >
            Everything you need to succeed
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our platform provides all the tools you need to run successful influencer marketing campaigns
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-5`} />
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}