import React, { useState } from 'react';
import { 
  Compass, 
  GitFork, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Printer, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TimelineStep } from '../types';

export const RoadmapView: React.FC = () => {
  const { 
    currentUser, 
    activeCareer, 
    activeRouteId, 
    setActiveRouteId, 
    completedSteps, 
    toggleStepComplete,
    toggleSaveItem,
    isItemSaved,
    setActiveTab
  } = useApp();

  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);

  const selectedRoute = activeCareer.routes.find(r => r.id === activeRouteId) || activeCareer.routes[0];
  const steps = selectedRoute?.steps || [];

  // Calculate completion percentage
  const totalSteps = steps.length;
  const doneCount = steps.filter(s => completedSteps.includes(s.id)).length;
  const progressPercent = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

  const isSaved = isItemSaved('career', activeCareer.id);

  const toggleExpand = (stepId: string) => {
    setExpandedStepId(prev => (prev === stepId ? null : stepId));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-slate-800">
      
      {/* 1. Header Banner & Profile Summary */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0F766E] mb-2 uppercase">
              <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Personalized Interactive Career Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {activeCareer.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {activeCareer.overview}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => toggleSaveItem('career', activeCareer.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Roadmap'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-guide')}
              className="p-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI About This Path</span>
            </button>
          </div>
        </div>

        {/* Student Profile Match Strip */}
        {currentUser?.profile && (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">
                Personalized for: {currentUser.name} ({currentUser.profile.currentClass} · {currentUser.profile.stream})
              </span>
              <p className="text-slate-600">
                Matches your interest in <strong className="text-[#0284C7]">{currentUser.profile.interests.slice(0, 3).join(', ')}</strong> with <strong className="text-[#0D9488]">{currentUser.profile.budgetPreference.toLowerCase()}</strong> budget.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('onboarding')}
              className="text-xs font-semibold text-[#0284C7] hover:underline flex-shrink-0 cursor-pointer"
            >
              Edit Profile Parameters
            </button>
          </div>
        )}

        {/* Dynamic Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              Roadmap Journey Progress: <span className="text-[#0D9488]">{doneCount} of {totalSteps} milestones achieved</span>
            </span>
            <span className="font-bold text-[#0284C7] font-mono text-sm">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#0284C7] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Click the check circle on each milestone to record your academic progress.
          </p>
        </div>

      </div>

      {/* 2. Route Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <GitFork className="w-5 h-5 text-[#0284C7]" />
              <span>Choose Your Route ({activeCareer.routes.length} Available)</span>
            </h3>
            <p className="text-xs text-slate-600">
              Multiple pathways lead to becoming a {activeCareer.name}. Select the best match for your marks, entry stage, and budget.
            </p>
          </div>
        </div>

        {/* Route Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeCareer.routes.map((route) => {
            const isCurrent = route.id === selectedRoute.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setActiveRouteId(route.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0D9488] text-white font-bold border-transparent shadow-xs'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {route.badge}
                  </span>
                  <span className={`text-xs font-mono font-semibold ${isCurrent ? 'text-teal-100' : 'text-[#0284C7]'}`}>
                    {route.duration}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold truncate mb-1">
                  {route.routeName}
                </h4>
                <p className={`text-[11px] line-clamp-2 ${isCurrent ? 'text-teal-50 font-normal' : 'text-slate-500 font-normal'}`}>
                  {route.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Route Info Box */}
        {selectedRoute && (
          <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs text-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-700">
              <span><strong>Active Route:</strong> {selectedRoute.routeName}</span>
              <span><strong>Estimated Investment:</strong> {selectedRoute.estimatedInvestment}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0D9488] font-semibold">✓ {selectedRoute.pros[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. VERTICAL TIMELINE ROADMAP */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wider">
            Step-by-Step Vertical Timeline
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {steps.length} Milestones · Interactive Progression
          </span>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-teal-400 before:to-[#0284C7] space-y-6">
          
          {steps.map((stepItem: TimelineStep) => {
            const isCompleted = completedSteps.includes(stepItem.id);
            const isExpanded = expandedStepId === stepItem.id;

            return (
              <div key={stepItem.id} className="relative group">
                
                {/* Node Milestone Dot / Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleStepComplete(stepItem.id)}
                  title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  className={`absolute -left-6 sm:-left-8 top-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer z-10 ${
                    isCompleted
                      ? 'bg-[#0D9488] border-teal-600 text-white shadow-xs'
                      : 'bg-white border-slate-300 text-transparent hover:border-[#0D9488] hover:text-[#0D9488]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>

                {/* Milestone Card */}
                <div 
                  className={`rounded-2xl border transition-all ${
                    isCompleted 
                      ? 'bg-emerald-50/60 border-emerald-200 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  
                  {/* Step Card Header */}
                  <div 
                    onClick={() => toggleExpand(stepItem.id)}
                    className="p-5 cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-[#0284C7] font-mono">{stepItem.stageName}</span>
                        <span>·</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {stepItem.timeframe}
                        </span>
                        {isCompleted && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Done
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                        {stepItem.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-normal">
                        {stepItem.description}
                      </p>
                    </div>

                    <button 
                      type="button"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#0284C7]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>
                  </div>

                  {/* Expandable Step Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-150">
                      
                      {/* What to study & Important Subjects */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                          <strong className="block text-[#0F766E] font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#0D9488]" />
                            What to Study
                          </strong>
                          <ul className="space-y-1 text-slate-700">
                            {stepItem.whatToStudy.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#0D9488]">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-100">
                          <strong className="block text-[#0369A1] font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-[#0284C7]" />
                            Important Subjects & Focus Areas
                          </strong>
                          <div className="flex flex-wrap gap-1.5">
                            {stepItem.importantSubjects.map((sub, i) => (
                              <span key={i} className="bg-white border border-cyan-200 text-cyan-800 px-2 py-0.5 rounded font-medium text-[11px]">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Skills to Learn & Relevant Exams */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <strong className="block text-slate-800 font-bold uppercase text-[11px] mb-1.5">
                            Practical Skills to Master
                          </strong>
                          <ul className="space-y-1 text-slate-600">
                            {stepItem.skillsToLearn.map((sk, i) => (
                              <li key={i}>✓ {sk}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                          <strong className="block text-blue-700 font-bold uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                            Relevant Entrance Examinations
                          </strong>
                          <div className="flex flex-wrap gap-1.5">
                            {stepItem.relevantExams.map((ex, i) => (
                              <span key={i} className="bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-medium text-[11px]">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Preparation Strategy */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <strong className="text-[#0D9488] block font-bold uppercase text-[11px] mb-1">
                          Preparation Strategy
                        </strong>
                        <p className="text-slate-600 leading-relaxed font-normal">
                          {stepItem.preparationStrategy}
                        </p>
                      </div>

                      {/* Required Documents & Next Action */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <strong className="text-slate-500 block text-[11px] uppercase mb-1 font-bold">
                            Required Documents at this Stage
                          </strong>
                          <p className="text-slate-600">
                            {stepItem.requiredDocuments.join(', ')}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                          <strong className="text-[#0F766E] block text-[11px] uppercase font-bold mb-0.5">
                            Next Immediate Action
                          </strong>
                          <p className="text-[#0D9488] font-semibold">
                            {stepItem.nextAction}
                          </p>
                        </div>
                      </div>

                      {/* Mark Complete Checkbox in expanded footer */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => toggleStepComplete(stepItem.id)}
                          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCompleted
                              ? 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                              : 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isCompleted ? 'Mark as Incomplete' : 'Mark Milestone as Completed'}</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Target Destination Celebration Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200 text-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left relative z-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#0284C7]">
            Target Destination Reached
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-900">
            Professional {activeCareer.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
            Starting packages range from {activeCareer.averageStartingSalary}. With ongoing technical updates and domain mastery, your trajectory expands into global leadership.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai-guide')}
          className="px-6 py-3 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 relative z-10"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask CareerPath AI Anything</span>
        </button>
      </div>

    </div>
  );
};
