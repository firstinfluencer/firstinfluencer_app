import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, MessageSquare, Settings, LogOut, PlusCircle, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export function DashboardSidebar() {
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
    { icon: Users, label: 'Creators', path: '/brand-dashboard' },
    {
      icon: Briefcase,
      label: 'Campaigns',
      path: '/brand/campaigns',
      subItems: [
        { icon: PlusCircle, label: 'Create Campaign', path: '/brand/campaigns/create' },
      ]
    },
    { icon: BarChart3, label: 'Analytics', path: '/brand/analytics' },
    { icon: MessageSquare, label: 'Messages', path: '/brand/messages' },
    { icon: Settings, label: 'Settings', path: '/brand/settings' },
  ];

  return (
    <motion.div 
      className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Brand Dashboard
        </h2>
      </div>
      
      <nav className="mt-6 flex flex-col h-[calc(100%-88px)]">
        <div className="flex-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              <motion.button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-6 py-3 space-x-3 ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                whileHover={{ x: 5 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>

              {item.subItems?.map((subItem) => (
                <motion.button
                  key={subItem.label}
                  onClick={() => navigate(subItem.path)}
                  className={`w-full flex items-center px-10 py-2 space-x-3 ${
                    location.pathname === subItem.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <subItem.icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{subItem.label}</span>
                </motion.button>
              ))}
            </div>
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