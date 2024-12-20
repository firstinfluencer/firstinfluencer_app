import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Rocket } from 'lucide-react';

export function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Connect with Creators',
      description: 'Find and collaborate with pre-vetted creators who align with your brand values.'
    },
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'Our AI helps you find the perfect creators based on your goals and audience.'
    },
    {
      icon: Rocket,
      title: 'Launch Campaigns',
      description: 'Create and manage influencer campaigns with powerful automation tools.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to FirstInfluencer! 🎉
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Let's help you grow your brand with authentic creator partnerships
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="p-3 bg-indigo-100 rounded-xl w-fit">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={() => navigate('/brand-dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}