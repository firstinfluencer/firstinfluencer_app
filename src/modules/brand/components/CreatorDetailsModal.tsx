import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Globe, Users, Heart, MessageCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { HypeAuditorMetrics } from '@/types/api';
import { formatNumber } from '@/utils/format';

interface CreatorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: HypeAuditorMetrics;
}

export function CreatorDetailsModal({ isOpen, onClose, metrics }: CreatorDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-[20%] md:right-[20%] bg-gray-50 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="h-full flex flex-col">
              {/* Header with Cover Image */}
              <div className="relative h-64 bg-gradient-to-br from-pink-500 to-purple-500">
                <img
                  src={metrics.profilePicture}
                  alt={metrics.username}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Profile Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center space-x-4">
                    <img
                      src={metrics.profilePicture}
                      alt={metrics.username}
                      className="w-20 h-20 rounded-xl object-cover border-4 border-white"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">@{metrics.username}</h2>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Instagram className="w-4 h-4" />
                          <span>Instagram Creator</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{metrics.audienceData.topCountries[0]?.country || 'Global'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { label: 'Followers', value: formatNumber(metrics.followers), icon: Users },
                      { label: 'Avg. Likes', value: formatNumber(metrics.avgLikes), icon: Heart },
                      { label: 'Avg. Comments', value: formatNumber(metrics.avgComments), icon: MessageCircle },
                      { label: 'Engagement', value: `${metrics.engagement.toFixed(2)}%`, icon: TrendingUp }
                    ].map((metric) => (
                      <div key={metric.label} className="bg-white rounded-xl p-4 shadow-sm">
                        <metric.icon className="w-5 h-5 text-pink-500 mb-2" />
                        <div className="text-lg font-bold">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Audience Demographics */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Audience Demographics</h3>
                    <div className="grid grid-cols-2 gap-8">
                      {/* Gender Distribution */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-4">Gender Split</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Male</span>
                              <span>{metrics.audienceData.genderSplit.male}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${metrics.audienceData.genderSplit.male}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Female</span>
                              <span>{metrics.audienceData.genderSplit.female}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-pink-500 rounded-full"
                                style={{ width: `${metrics.audienceData.genderSplit.female}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Age Distribution */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-4">Age Distribution</h4>
                        <div className="space-y-3">
                          {metrics.audienceData.ageRanges.map((age) => (
                            <div key={age.range}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{age.range}</span>
                                <span>{age.percentage.toFixed(1)}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 rounded-full"
                                  style={{ width: `${age.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Posts */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Recent Posts</h3>
                    <div className="space-y-4">
                      {metrics.recentPosts.map((post) => (
                        <a
                          key={post.url}
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-5 h-5 text-pink-500" />
                              <span className="font-medium">{formatNumber(post.likes)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-5 h-5 text-blue-500" />
                              <span className="font-medium">{formatNumber(post.comments)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              <span className="font-medium">{post.engagement.toFixed(2)}%</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t">
                <button
                  onClick={() => {/* Implement contact/collaboration logic */}}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-colors"
                >
                  Contact Creator
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}