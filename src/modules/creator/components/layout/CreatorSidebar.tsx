import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import {
  Briefcase,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Users
} from 'lucide-react';

export function CreatorSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const menuItems = [
    { icon: Briefcase, label: 'Opportunities', path: '/creator-dashboard' },
    { icon: Users, label: 'My Campaigns', path: '/creator/campaigns' },
    { icon: BarChart3, label: 'Analytics', path: '/creator/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/creator/messages' },
    { icon: Settings, label: 'Settings', path: '/creator/settings' }
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Creator Dashboard
        </h2>
      </div>

      <nav className="mt-6 flex flex-col h-[calc(100%-88px)]">
        <div className="flex-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-6 py-3 space-x-3 ${
                location.pathname === item.path
                  ? 'bg-pink-50 text-pink-600 border-r-4 border-pink-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ x: 5 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleSignOut}
          className="w-full flex items-center px-6 py-3 space-x-3 text-gray-600 hover:bg-gray-50"
          whileHover={{ x: 5 }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </motion.button>
      </nav>
    </motion.div>
  );
}