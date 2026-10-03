/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { CareerDetailModal } from './components/CareerDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { OnboardingView } from './views/OnboardingView';
import { RoadmapView } from './views/RoadmapView';
import { AIChatView } from './views/AIChatView';
import { CareerExplorerView } from './views/CareerExplorerView';
import { CourseFinderView } from './views/CourseFinderView';
import { ExamHubView } from './views/ExamHubView';
import { ScholarshipFinderView } from './views/ScholarshipFinderView';
import { DashboardView } from './views/DashboardView';
import { AdminPanelView } from './views/AdminPanelView';

const MainLayout: React.FC = () => {
  const { activeTab, selectedDetailCareer, setSelectedDetailCareer } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F8F5] text-slate-900 font-sans relative overflow-x-hidden bg-neural-grid selection:bg-teal-500 selection:text-white">
      {/* Ambient background pastel glows */}
      <div className="fixed -top-40 -left-20 w-[550px] h-[550px] bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-20 -right-24 w-[480px] h-[480px] bg-cyan-400/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 -left-32 w-[420px] h-[420px] bg-teal-400/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed -bottom-20 right-10 w-[350px] h-[350px] bg-blue-400/12 rounded-full blur-[130px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'onboarding' && <OnboardingView />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'ai-guide' && <AIChatView />}
        {activeTab === 'careers' && <CareerExplorerView />}
        {activeTab === 'courses' && <CourseFinderView />}
        {activeTab === 'exams' && <ExamHubView />}
        {activeTab === 'scholarships' && <ScholarshipFinderView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'admin' && <AdminPanelView />}
      </main>

      {/* Footer is displayed on all views except full-height AI Chat */}
      {activeTab !== 'ai-guide' && <Footer />}

      {/* Global Modals */}
      <GlobalSearchModal />
      <AuthModal />
      <CareerDetailModal
        career={selectedDetailCareer}
        onClose={() => setSelectedDetailCareer(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
