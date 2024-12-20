import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { AnimatedGradientBorder } from '../ui/AnimatedGradientBorder';
import { ProfileMenu } from '../ui/ProfileMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
  ];

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const isAuthPage = location.pathname === '/auth';
  const isBrandDashboard = location.pathname.startsWith('/brand');
  const isCreatorDashboard = location.pathname.startsWith('/creator');

  // Don't show navigation items for logged-in brand users
  const showNavItems = !user || !isBrandDashboard;

  return (
    <motion.header 
      className="fixed w-full bg-white/80 backdrop-blur-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Logo />
          </div>
          
          {!isAuthPage && (
            <>
              <div className="-mr-2 -my-2 md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
              
              {showNavItems && !isCreatorDashboard && (
                <nav className="hidden md:flex space-x-10">
                  {menuItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              )}
              
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {user ? (
                  <ProfileMenu 
                    userType={isBrandDashboard ? 'brand' : 'creator'} 
                  />
                ) : (
                  <AnimatedGradientBorder>
                    <motion.button
                      onClick={handleGetStarted}
                      className="block px-6 py-2 text-base font-medium text-indigo-600 hover:text-indigo-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </AnimatedGradientBorder>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!isAuthPage && !user && isMenuOpen && (
        <motion.div
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
                  <button
                    type="button"
                    className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menuItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <AnimatedGradientBorder>
                    <motion.button
                      onClick={handleGetStarted}
                      className="block px-6 py-2 text-base font-medium text-center text-indigo-600 hover:text-indigo-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </AnimatedGradientBorder>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}