import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Import pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { BrandDashboard } from './pages/BrandDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { MyCampaignsPage } from './pages/brand/MyCampaignsPage';
import { CreateCampaignPage } from './pages/brand/CreateCampaignPage';
import { BrandOnboarding } from './components/onboarding/BrandOnboarding';
import { WelcomePage } from './pages/brand/WelcomePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/brand/onboarding" element={<BrandOnboarding />} />
            <Route path="/brand/welcome" element={<WelcomePage />} />
            <Route
              path="/brand-dashboard"
              element={
                <ProtectedRoute userType="brand">
                  <BrandDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand/campaigns"
              element={
                <ProtectedRoute userType="brand">
                  <MyCampaignsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand/campaigns/create"
              element={
                <ProtectedRoute userType="brand">
                  <CreateCampaignPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator-dashboard"
              element={
                <ProtectedRoute userType="creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}