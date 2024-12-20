import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Instagram } from 'lucide-react';

export function InfluencerDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">

      {/* Map View */}
      <div className="relative h-[400px] bg-gray-100 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
          alt="India Map"
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Sample Profile Dots */}
        {[
          { left: '20%', top: '30%' },
          { left: '45%', top: '40%' },
          { left: '70%', top: '35%' },
          { left: '30%', top: '60%' },
          { left: '60%', top: '55%' }
        ].map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-white overflow-hidden cursor-pointer"
            style={position}
            whileHover={{ scale: 1.2 }}
          >
            <img
              src={`https://randomuser.me/api/portraits/women/${index + 20}.jpg`}
              alt="Creator"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Results List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://randomuser.me/api/portraits/women/${index + 25}.jpg`}
                alt="Creator"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">Creator {index + 1}</h3>
                <p className="text-sm text-gray-500">Travel & Lifestyle</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}