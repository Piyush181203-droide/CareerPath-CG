import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Bookmark, 
  Share2,
  GitFork
} from 'lucide-react';
import { Career } from '../types';
import { useApp } from '../context/AppContext';

interface CareerDetailModalProps {
  career: Career | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ career, onClose }) => {
  const { setActiveCareer, setActiveRouteId, setActiveTab, toggleSaveItem, isItemSaved } = useApp();
  const [activeTab, setActiveTabLocal] = useState<'overview' | 'routes' | 'strategy' | 'faqs'>('overview');

  if (!career) return null;

  const isSaved = isItemSaved('career', career.id);

  const handleLaunchRoadmap = (routeId?: string) => {
    setActiveCareer(career);
    if (routeId) {
      setActiveRouteId(routeId);
    } else if (career.routes[0]) {
      setActiveRouteId(career.routes[0].id);
    }
    onClose();
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30 flex items-start justify-between">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
              <span>{career.category}</span>
              <span>·</span>
              <span>Streams: {career.stream.join(', ')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {career.name}
            </h2>
            <p className="text-xs text-slate-600 line-clamp-2">
              {career.overview}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem('career', career.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-600' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={isSaved ? 'Saved in bookmarks' : 'Save career'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTabLocal('overview')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#0D9488] text-[#0D9488]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Requirements
          </button>
          <button
            onClick={() => setActiveTabLocal('routes')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'routes'
                ? 'border-[#0D9488] text-[#0D9488]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Alternative Routes ({career.routes.length})</span>
          </button>
          <button
            onClick={() => setActiveTabLocal('strategy')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'strategy'
                ? 'border-[#0D9488] text-[#0D9488]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Preparation & Pitfalls
          </button>
          <button
            onClick={() => setActiveTabLocal('faqs')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-[#0D9488] text-[#0D9488]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            FAQs & Insights
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stat Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Typical Duration</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    {career.studyDuration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Avg Starting Package</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    {career.averageStartingSalary}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Level</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-violet-500" />
                    Undergraduate / Professional
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Routes Available</span>
                  <span className="font-bold text-indigo-600 flex items-center gap-1 mt-0.5">
                    <GitFork className="w-3.5 h-3.5" />
                    {career.routes.length} Pathways
                  </span>
                </div>
              </div>

              {/* Eligibility & Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Eligibility Criteria
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {career.eligibility}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Required Education
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {career.requiredEducation}
                  </p>
                </div>
              </div>

              {/* Entrance Exams & Top Courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    Key Entrance Exams
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {career.entranceExams.map((exam, i) => (
                      <span key={i} className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-md border border-violet-100 font-medium">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    Recommended Degree Courses
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {career.topCourses.map((c, i) => (
                      <span key={i} className="text-xs bg-cyan-50 text-cyan-800 px-2.5 py-1 rounded-md border border-cyan-100 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills & Job Roles */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Core Skills to Acquire
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-white text-slate-700 px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      ✓ {skill}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-4 mb-2">
                  Common Job Roles in Industry
                </h4>
                <p className="text-xs text-slate-600">
                  {career.jobRoles.join(' · ')}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Multiple Routes */}
          {activeTab === 'routes' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                💡 <strong>Multiple Paths to the Same Career:</strong> CareerPath CG does not force you into one fixed route. Compare investment, duration, and admission requirements below to pick your best fit.
              </div>

              <div className="space-y-4">
                {career.routes.map((route, idx) => (
                  <div 
                    key={route.id}
                    className="p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all bg-white shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{route.routeName}</h4>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                          {route.badge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span>Duration: <strong className="text-slate-800">{route.duration}</strong></span>
                        <span>Est. Cost: <strong className="text-slate-800">{route.estimatedInvestment}</strong></span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-4">{route.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                      <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100">
                        <strong className="text-emerald-800 block mb-1 text-[11px] uppercase">Advantages</strong>
                        <ul className="space-y-1 text-slate-700">
                          {route.pros.map((p, i) => (
                            <li key={i}>• {p}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-100">
                        <strong className="text-amber-800 block mb-1 text-[11px] uppercase">Considerations / Challenges</strong>
                        <ul className="space-y-1 text-slate-700">
                          {route.cons.map((c, i) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchRoadmap(route.id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore {route.routeName.split(':')[0]} Visual Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Strategy & Pitfalls */}
          {activeTab === 'strategy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  Recommended Preparation Strategy
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {career.preparationStrategy}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {career.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Higher Studies & Research Avenues
                </h4>
                <p className="text-xs text-slate-600">
                  {career.higherStudies.join(' · ')}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {career.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Select this career to unlock your step-by-step vertical roadmap
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => handleLaunchRoadmap()}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <span>Build My Personalized Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
