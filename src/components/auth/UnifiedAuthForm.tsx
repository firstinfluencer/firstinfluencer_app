import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, UserCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

type AccountType = 'brand' | 'creator' | null;
type AuthMode = 'signin' | 'signup';

export function UnifiedAuthForm() {
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (accountType) {
      setAccountType(null);
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return;

    try {
      if (authMode === 'signup') {
        if (accountType === 'brand') {
          const domain = email.split('@')[1];
          const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
          if (freeEmailProviders.includes(domain)) {
            toast.error('Please use your work email address');
            return;
          }
        }
        await signUp(email, password);
        toast.success('Account created successfully! 🎉');
      } else {
        await signIn(email, password);
        toast.success('Welcome back! 👋');
      }

      navigate(accountType === 'brand' ? '/brand-dashboard' : '/creator-dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!accountType ? (
                <motion.div
                  key="account-selector"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                      Welcome to FirstInfluencer
                    </h1>
                    <p className="mt-3 text-gray-600">
                      Choose your account type to continue
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        type: 'brand',
                        icon: Building2,
                        title: 'Brand Account',
                        description: 'For companies looking to collaborate with creators',
                        gradient: 'from-indigo-50 to-indigo-100',
                        iconColor: 'text-indigo-600'
                      },
                      {
                        type: 'creator',
                        icon: UserCircle,
                        title: 'Creator Account',
                        description: 'For influencers and content creators',
                        gradient: 'from-pink-50 to-pink-100',
                        iconColor: 'text-pink-600'
                      }
                    ].map((option) => (
                      <motion.button
                        key={option.type}
                        onClick={() => setAccountType(option.type as AccountType)}
                        className={`w-full p-6 rounded-2xl bg-gradient-to-r ${option.gradient} hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                            <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                          </div>
                          <div className="ml-4 text-left">
                            <h3 className="text-xl font-semibold text-gray-900">{option.title}</h3>
                            <p className="text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative space-y-8"
                >
                  <motion.button
                    onClick={handleBack}
                    className="absolute -left-2 -top-2 p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>

                  <div className="text-center pt-6">
                    <motion.div 
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${
                        accountType === 'brand'
                          ? 'bg-gradient-to-r from-indigo-50 to-indigo-100'
                          : 'bg-gradient-to-r from-pink-50 to-pink-100'
                      } flex items-center justify-center`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {accountType === 'brand' ? (
                        <Building2 className="w-10 h-10 text-indigo-600" />
                      ) : (
                        <UserCircle className="w-10 h-10 text-pink-600" />
                      )}
                    </motion.div>

                    <h2 className="text-3xl font-bold">
                      {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {accountType === 'brand'
                        ? 'Connect with amazing creators for your brand'
                        : 'Share your creativity with amazing brands'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {authMode === 'signup' && (
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">
                          {accountType === 'brand' ? 'Company Name' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-12 w-full px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={accountType === 'brand' ? 'Your company name' : 'Your full name'}
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        {accountType === 'brand' ? 'Work Email' : 'Email address'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 w-full px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={accountType === 'brand' ? 'you@company.com' : 'you@example.com'}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                        required
                      />
                      {authMode === 'signin' && (
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mt-2"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className={`w-full h-12 rounded-xl text-white font-medium ${
                        accountType === 'brand'
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700'
                          : 'bg-gradient-to-r from-pink-600 to-purple-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {authMode === 'signin' ? 'Sign in' : 'Create account'}
                    </motion.button>

                    <p className="text-center text-sm text-gray-600">
                      {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {authMode === 'signin' ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}