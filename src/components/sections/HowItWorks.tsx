import React from 'react';
import { Search, UserCheck, MessageSquare, Trophy } from 'lucide-react';

const steps = [
  {
    name: 'Find Influencers',
    description: 'Search through our curated network of influencers or let our AI match you with the perfect creators.',
    icon: Search,
  },
  {
    name: 'Connect & Collaborate',
    description: 'Reach out to influencers, negotiate terms, and establish partnerships seamlessly.',
    icon: UserCheck,
  },
  {
    name: 'Manage Campaigns',
    description: 'Track campaign progress, approve content, and communicate with influencers in real-time.',
    icon: MessageSquare,
  },
  {
    name: 'Measure Success',
    description: 'Access detailed analytics and insights to optimize your campaigns and maximize ROI.',
    icon: Trophy,
  },
];

export function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to success
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get your influencer marketing campaigns up and running in no time with our streamlined process.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                    {index + 1}
                  </span>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}