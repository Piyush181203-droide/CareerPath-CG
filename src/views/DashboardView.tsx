import React, { useState } from 'react';
import { 
  User, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Layers,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_CAREERS, INITIAL_COURSES, INITIAL_EXAMS, INITIAL_SCHOLARSHIPS } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    activeCareer, 
    activeRouteId, 
    completedSteps, 
    setActiveTab, 
    setSelectedDetailCareer
  } = useApp();

  const [activeBookmarkTab, setActiveBookmarkTab] = useState<'careers' | 'courses' | 'exams' | 'scholarships'>('careers');

  const selectedRoute = activeCareer.routes.find(r => r.id === activeRouteId) || activeCareer.routes[0];
  const steps = selectedRoute?.steps || [];
  const doneCount = steps.filter(s => completedSteps.includes(s.id)).length;
  const progressPercent = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

  // Filter saved items from IDs in user state
  const savedCareersList = INITIAL_CAREERS.filter(c => currentUser?.savedCareers?.includes(c.id));
  const savedCoursesList = INITIAL_COURSES.filter(c => currentUser?.savedCourses?.includes(c.id));
  const savedExamsList = INITIAL_EXAMS.filter(e => currentUser?.savedExams?.includes(e.id));
  const savedScholarshipsList = INITIAL_SCHOLARSHIPS.filter(s => currentUser?.savedScholarships?.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-800">
      
      {/* 1. Welcome & Profile Card - Light Glass Theme */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/90 to-cyan-50/90 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-[#0F766E] text-xs font-bold uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Student Career Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Welcome back, {currentUser ? currentUser.name : 'Student'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {currentUser?.profile 
                ? `${currentUser.profile.currentClass} · ${currentUser.profile.stream} Stream · Career Goal: ${currentUser.profile.careerGoal}`
                : 'Plan your higher education steps with personalized roadmaps and active tracking.'
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('onboarding')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 transition-all cursor-pointer shadow-2xs"
            >
              Update Academic Profile
            </button>
            <button
              onClick={() => setActiveTab('ai-guide')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Talk to CareerPath AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Active Roadmap Progress Spotlight */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Current Active Goal
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0D9488]" />
              <span>{activeCareer.name} ({selectedRoute?.routeName.split(':')[0]})</span>
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Continue Active Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar & Stat Highlights */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">
              Your {activeCareer.name} roadmap is <strong className="text-[#0D9488]">{progressPercent}% complete</strong>.
            </span>
            <span className="text-slate-500 font-mono">
              {doneCount} of {steps.length} milestones finished
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#0284C7] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Next Immediate Action Card */}
        {steps.length > doneCount && (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">
                Next Milestone to Complete: {steps[doneCount]?.stageName} - {steps[doneCount]?.title}
              </span>
              <p className="text-slate-600">
                Action: {steps[doneCount]?.nextAction}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="font-bold text-[#0D9488] hover:underline flex-shrink-0 cursor-pointer"
            >
              Open Milestone Details
            </button>
          </div>
        )}
      </div>

      {/* 3. Dashboard Grid: Upcoming Exams & Saved Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Saved Items Tabs */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#0D9488]" />
              <span>Your Saved Bookmarks</span>
            </h3>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
            <button
              onClick={() => setActiveBookmarkTab('careers')}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeBookmarkTab === 'careers' ? 'border-[#0D9488] text-[#0D9488] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Careers ({savedCareersList.length})
            </button>
            <button
              onClick={() => setActiveBookmarkTab('courses')}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeBookmarkTab === 'courses' ? 'border-[#0D9488] text-[#0D9488] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Courses ({savedCoursesList.length})
            </button>
            <button
              onClick={() => setActiveBookmarkTab('exams')}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeBookmarkTab === 'exams' ? 'border-[#0D9488] text-[#0D9488] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Exams ({savedExamsList.length})
            </button>
            <button
              onClick={() => setActiveBookmarkTab('scholarships')}
              className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                activeBookmarkTab === 'scholarships' ? 'border-[#0D9488] text-[#0D9488] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Scholarships ({savedScholarshipsList.length})
            </button>
          </div>

          {/* Bookmarks List */}
          <div className="space-y-3">
            {activeBookmarkTab === 'careers' && (
              savedCareersList.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No careers saved yet. Explore Career Explorer to bookmark pathways.</p>
              ) : (
                savedCareersList.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.category} · {c.studyDuration}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDetailCareer(c)}
                      className="text-xs font-semibold text-[#0D9488] hover:underline cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                ))
              )
            )}

            {activeBookmarkTab === 'courses' && (
              savedCoursesList.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No courses saved yet.</p>
              ) : (
                savedCoursesList.map((crs) => (
                  <div key={crs.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-cyan-300 transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{crs.name}</h4>
                      <p className="text-xs text-slate-500">{crs.duration} · {crs.level}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
                    >
                      Explore
                    </button>
                  </div>
                ))
              )
            )}

            {activeBookmarkTab === 'exams' && (
              savedExamsList.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No exams saved yet.</p>
              ) : (
                savedExamsList.map((ex) => (
                  <div key={ex.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ex.name}</h4>
                      <p className="text-xs text-slate-500">{ex.admissionScope}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('exams')}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Check Dates
                    </button>
                  </div>
                ))
              )
            )}

            {activeBookmarkTab === 'scholarships' && (
              savedScholarshipsList.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No scholarships saved yet.</p>
              ) : (
                savedScholarshipsList.map((sch) => (
                  <div key={sch.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{sch.name}</h4>
                      <p className="text-xs text-slate-500">{sch.benefits}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('scholarships')}
                      className="text-xs font-semibold text-[#0D9488] hover:underline cursor-pointer"
                    >
                      Criteria
                    </button>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Examination Watchlist & Quick Actions */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <span>Upcoming Exam Windows</span>
            </h3>

            <div className="space-y-3">
              {INITIAL_EXAMS.slice(0, 3).map((e) => (
                <div key={e.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{e.name}</strong>
                    <span className="text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-1.5 py-0.5 rounded font-semibold">
                      {e.category}
                    </span>
                  </div>
                  <p className="text-slate-500 line-clamp-1">{e.applicationPeriod}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('exams')}
              className="w-full py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 text-center cursor-pointer block"
            >
              View Full Exam Calendar
            </button>
          </div>

          {/* Quick AI Prompt Card */}
          <div className="bg-gradient-to-tr from-emerald-50/80 to-cyan-50/80 rounded-3xl p-6 border border-emerald-100 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0D9488]" />
              Ask CareerPath AI
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have doubts regarding colleges, cutoff percentiles, or course vs stream decisions?
            </p>
            <button
              onClick={() => setActiveTab('ai-guide')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white transition-colors shadow-2xs cursor-pointer"
            >
              Start Instant Counselor Chat
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
