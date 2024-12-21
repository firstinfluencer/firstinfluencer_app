import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function Contact() {
  return (
    <div id="contact" className="bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Get Started Today
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-lg leading-6 text-gray-300"
              >
                Ready to transform your influencer marketing? Fill out the form below and we'll get in touch with you shortly.
              </motion.p>
            </div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                  Company
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-200">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-200">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
                >
                  <span>Let's talk</span>
                  <Send className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}