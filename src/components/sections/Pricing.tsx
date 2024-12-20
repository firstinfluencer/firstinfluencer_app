import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 99,
    features: [
      'Up to 5 active campaigns',
      'Basic analytics',
      'Email support',
      '10 influencer connections/month',
      'Campaign management tools',
    ],
  },
  {
    name: 'Professional',
    price: 299,
    features: [
      'Unlimited campaigns',
      'Advanced analytics',
      'Priority support',
      'Unlimited influencer connections',
      'Custom reporting',
      'API access',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced API access',
      'Custom contract terms',
      'Brand safety tools',
    ],
  },
];

export function Pricing() {
  return (
    <div id="pricing" className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Plans for businesses of all sizes
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Choose the perfect plan to scale your influencer marketing efforts.
          </p>
        </div>

        <div className="mt-16 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-700 ${
                tier.featured ? 'bg-indigo-900' : 'bg-gray-800'
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-white">
                    ${typeof tier.price === 'number' ? tier.price : ''}
                  </span>
                  {typeof tier.price === 'number' && (
                    <span className="text-base font-medium text-gray-300">/month</span>
                  )}
                </p>
                <p className="mt-6">
                  <a
                    href="#contact"
                    className={`block w-full py-3 px-6 rounded-md text-center font-medium ${
                      tier.featured
                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </a>
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 h-6 w-6 text-indigo-400" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}