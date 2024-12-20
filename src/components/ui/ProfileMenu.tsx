import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Bell,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProfileMenuProps {
  userType: 'brand' | 'creator';
}

export function ProfileMenu({ userType }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const getInitials = () => {
    if (!user?.email) return '??';
    return user.email
      .split('@')[0]
      .split('.')
      .map(part => part[0].toUpperCase())
      .join('');
  };

  const menuItems = [
    {
      icon: userType === 'brand' ? Briefcase : User,
      label: userType === 'brand' ? 'Brand Profile' : 'Creator Profile',
      onClick: () => navigate(`/${userType}-dashboard`),
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      onClick: () => navigate('/messages'),
      badge: '3',
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      onClick: handleSignOut,
      danger: true,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <motion.button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </motion.button>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`w-8 h-8 rounded-lg ${
              userType === 'brand' 
                ? 'bg-gradient-to-br from-indigo-100 to-indigo-200' 
                : 'bg-gradient-to-br from-pink-100 to-purple-200'
            } flex items-center justify-center`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <span className={`text-sm font-medium ${
              userType === 'brand' ? 'text-indigo-600' : 'text-pink-600'
            }`}>
              {getInitials()}
            </span>
          </motion.div>
          <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-40"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {userType === 'brand' ? 'Brand Account' : 'Creator Account'}
                </p>
              </div>
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => {
                      setIsOpen(false);
                      item.onClick();
                    }}
                    className={`w-full flex items-center space-x-3 p-2.5 rounded-lg text-left ${
                      item.danger 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}