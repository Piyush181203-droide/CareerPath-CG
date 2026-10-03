import React, { useState } from 'react';
import { X, User, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAs, setCurrentUser } = useApp();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [educationLevel, setEducationLevel] = useState<'Class 10' | 'Class 11' | 'Class 12' | 'Undergraduate'>('Class 12');

  if (!isAuthModalOpen) return null;

  const handleCustomRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCurrentUser({
      id: `user-${Date.now()}`,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@student.careerpathcg.edu`,
      role: 'student',
      profile: {
        fullName: name,
        age: 17,
        currentClass: educationLevel,
        stream: 'Science',
        subjects: ['Mathematics', 'Science'],
        interests: ['Technology', 'Problem Solving'],
        skills: ['Computer Literacy'],
        careerGoal: 'Software Engineer',
        preferredLocation: 'National Institutes',
        institutionType: 'Both',
        budgetPreference: 'Moderate',
        entranceExamInterest: ['JEE Main']
      },
      savedCareers: [],
      savedCourses: [],
      savedExams: [],
      savedScholarships: [],
      savedRoadmapIds: [],
      completedSteps: []
    });

    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {isRegisterMode ? 'Create Student Account' : 'Welcome to CareerPath CG'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Access personalized roadmaps, bookmarks & AI chat
            </p>
          </div>
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Quick Demo Logins Banner */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Quick 1-Click Demo Profiles
            </p>
            
            <button
              onClick={() => loginAs('student')}
              className="w-full p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488]">
                    Aman Sharma (Student Demo)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Class 12 · PCM · Aspiring Software Engineer
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0D9488] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => loginAs('admin')}
              className="w-full p-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/60 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                    Administrator Demo
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Full CRUD rights for careers, exams, courses & scholarships
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase">Or Custom Profile</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Custom Student Form */}
          <form onSubmit={handleCustomRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Patel"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Class / Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0D9488] bg-white"
              >
                <option value="Class 10">Class 10 (School Board)</option>
                <option value="Class 11">Class 11 (Intermediate / +1)</option>
                <option value="Class 12">Class 12 (Board & Entrances / +2)</option>
                <option value="Undergraduate">College / Undergraduate Degree</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-lg text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all cursor-pointer"
            >
              Continue to Platform
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          CareerPath CG respects student privacy. No unsolicited emails.
        </div>
      </div>
    </div>
  );
};
