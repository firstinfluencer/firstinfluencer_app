import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/sections/Hero';
import { DiscoveryInterface } from '../components/sections/DiscoveryInterface';
import { Features } from '../components/sections/Features';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Contact } from '../components/sections/Contact';
import { FloatingDoodles } from '../components/ui/FloatingDoodles';

// Lazy load less critical sections
const FeaturedInfluencers = lazy(() => import('../components/sections/FeaturedInfluencers'));
const SeasonalCampaigns = lazy(() => import('../components/sections/SeasonalCampaigns'));
const CampaignIdeas = lazy(() => import('../components/sections/CampaignIdeas'));

export function LandingPage() {
  return (
    <main>
      <FloatingDoodles />
      <Hero />
      <DiscoveryInterface />
      <Features />
      <HowItWorks />
      <Suspense fallback={<div className="h-96 bg-gray-50" />}>
        <FeaturedInfluencers />
        <SeasonalCampaigns />
        <CampaignIdeas />
      </Suspense>
      <Contact />
    </main>
  );
}