import React from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  GitFork, 
  Users, 
  Layers, 
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Bookmark,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_CAREERS, INITIAL_COURSES, INITIAL_EXAMS, INITIAL_SCHOLARSHIPS } from '../data/mockData';
import { Career } from '../types';

export const HomeView: React.FC = () => {
  const { setActiveTab, setActiveCareer, setActiveRouteId, setSelectedDetailCareer, toggleSaveItem, isItemSaved } = useApp();

  const popularCareers = INITIAL_CAREERS.slice(0, 4);
  const featuredCourses = INITIAL_COURSES.slice(0, 3);
  const upcomingExams = INITIAL_EXAMS.slice(0, 3);
  const topScholarships = INITIAL_SCHOLARSHIPS.slice(0, 3);

  const handleOpenRoadmap = (career: Career) => {
    setActiveCareer(career);
    if (career.routes[0]) {
      setActiveRouteId(career.routes[0].id);
    }
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-20 text-slate-800">
      
      {/* ========================================================
          1. HERO SECTION (Light Glass × Green × Blue Theme)
          ======================================================== */}
      <section className="relative pt-12 pb-6 overflow-hidden">
        {/* Subtle ambient light glows */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-300/20 blur-[130px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute -top-10 -right-10 w-[420px] h-[420px] bg-cyan-300/20 blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content - Matches user screenshot */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Developer Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] text-[#065F46] text-xs font-bold tracking-wider uppercase shadow-2xs">
                <span className="text-[#0D9488]">✦</span>
                <span>DEVELOPER: PIYUSH PRAKASH</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
                Turn confusion<br />
                into a <span className="text-[#0284C7]">roadmap.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Transparent glass cards, soft green surfaces and cyan-blue accents create a modern premium education product.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => setActiveTab('onboarding')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Your Journey →</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-guide')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Talk to AI</span>
                </button>
              </div>

            </div>

            {/* Right Hero Graphic - Exactly matches mockup in user image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg p-5 sm:p-6 rounded-[32px] bg-white/70 backdrop-blur-xl border border-emerald-200/80 shadow-md shadow-emerald-900/5 space-y-4">
                
                {/* Header */}
                <div className="flex items-center gap-2 pb-1">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-sm text-slate-900">CareerPath AI</span>
                    <span className="text-xs text-slate-500">· Online</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
                  </div>
                </div>

                {/* AI Prompt Bubble */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                  <span className="text-amber-500">✨</span>
                  <span>Tell me where you are today and where you want to go.</span>
                </div>

                {/* User Response Bubble - Bright Teal Pill */}
                <div className="flex justify-end">
                  <div className="p-3.5 rounded-2xl bg-[#0090A8] text-white shadow-xs text-xs sm:text-sm font-medium max-w-[85%]">
                    I like science and computers.
                  </div>
                </div>

                {/* AI Followup Bubble */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs text-xs sm:text-sm text-slate-800">
                  Here are several routes you can compare before choosing.
                </div>

                {/* Suggested Action Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      setActiveCareer(INITIAL_CAREERS[0]);
                      setActiveTab('roadmap');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-800 shadow-2xs transition-colors cursor-pointer"
                  >
                    Explore routes
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-800 shadow-2xs transition-colors cursor-pointer"
                  >
                    Compare courses
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Three Feature Highlight Cards (bottom of user screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            <div 
              onClick={() => setActiveTab('ai-guide')}
              className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-slate-900 font-bold text-base group-hover:text-[#0D9488] transition-colors">
                  ✦ AI Assistant
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Natural career conversation.
              </p>
            </div>

            <div 
              onClick={() => {
                setActiveCareer(INITIAL_CAREERS[0]);
                setActiveTab('roadmap');
              }}
              className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-slate-900 font-bold text-base group-hover:text-[#0D9488] transition-colors">
                  〰 Smart Roadmap
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Connected education stages.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('careers')}
              className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-slate-900 font-bold text-base group-hover:text-[#0D9488] transition-colors">
                  ◈ Future Skills
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Skills and preparation plan.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. STREAM CATEGORIES
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Explore Career Streams
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Whether you are entering Class 11 or deciding on a university degree, find validated career destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Science */}
          <div 
            onClick={() => setActiveTab('careers')}
            className="p-6 rounded-3xl bg-white/90 border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0D9488] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors font-display">
                Science (PCM / PCB)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Software Engineering, Medicine (MBBS), Data Science, AI/ML, Aviation Pilot, Defence (NDA), Pharmacy.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0D9488]">
              <span>View Pathways</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Commerce */}
          <div 
            onClick={() => setActiveTab('careers')}
            className="p-6 rounded-3xl bg-white/90 border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-[#0284C7] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors font-display">
                Commerce & Finance
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Chartered Accountancy (CA), Investment Banking, Corporate Law, Company Secretary, Financial Analytics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0284C7]">
              <span>View Pathways</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Arts */}
          <div 
            onClick={() => setActiveTab('careers')}
            className="p-6 rounded-3xl bg-white/90 border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                Arts & Humanities
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Civil Services (IAS/IPS), Corporate Law (CLAT), Clinical Psychology, Journalism, Public Policy, Academia.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>View Pathways</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Vocational & Design */}
          <div 
            onClick={() => setActiveTab('careers')}
            className="p-6 rounded-3xl bg-white/90 border border-emerald-100/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors font-display">
                Design & Vocational
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                UI/UX Product Design, Polytechnic Diploma to Lateral B.Tech, Animation, Digital Marketing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-pink-600">
              <span>View Pathways</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. HOW CAREERPATH CG WORKS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mb-10 relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0284C7]">
              Step-by-Step Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mt-1 text-slate-900">
              How CareerPath CG Generates Your Roadmap
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From school confusion to an actionable career blueprint with exams, scholarships, and alternative options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm font-mono shadow-2xs">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900">Student Onboarding</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tell us your current class, favorite subjects, skills, location preference, and budget goals in a friendly 5-step wizard.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-100 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm font-mono shadow-2xs">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900">Multi-Route Matching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our algorithm maps both standard paths (e.g. B.Tech) and smart alternatives (e.g. BCA→MCA or Polytechnic lateral entry).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm font-mono shadow-2xs">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900">Exams & Scholarships</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically matches verified entrance exams, deadlines, documents, and applicable government or private scholarships.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-sm font-mono shadow-2xs">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900">Interactive Tracking</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow your vertical timeline, check off completed milestones, and ask CareerPath AI follow-up questions anytime.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <span className="text-xs text-slate-600">
              Ready to generate your personalized timeline in under 2 minutes?
            </span>
            <button
              onClick={() => setActiveTab('onboarding')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Launch Onboarding Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. POPULAR CAREER PATHS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Popular Career Paths
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Top requested careers with complete multi-route timelines and entrance details.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('careers')}
            className="text-xs font-semibold text-[#0D9488] hover:text-[#0284C7] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Explore All Careers ({INITIAL_CAREERS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularCareers.map((career) => {
            const isSaved = isItemSaved('career', career.id);
            return (
              <div
                key={career.id}
                className="p-6 rounded-3xl bg-white/90 border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-xs font-semibold text-[#0D9488]">{career.category}</span>
                      <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                        {career.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleSaveItem('career', career.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {career.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/80 mb-4">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Duration</span>
                      <span className="font-semibold text-slate-800">{career.studyDuration}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Avg Starting Pay</span>
                      <span className="font-bold text-[#0D9488]">{career.averageStartingSalary.split('–')[0]}</span>
                    </div>
                  </div>

                  {/* Routes available badge */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Available Routes ({career.routes.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.routes.map((r) => (
                        <span key={r.id} className="text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                          {r.routeName.split(':')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedDetailCareer(career)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    View Breakdown
                  </button>
                  <button
                    onClick={() => handleOpenRoadmap(career)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          5. FEATURED COURSES & UPCOMING EXAMS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Courses Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Featured Degree Courses</h3>
                <p className="text-xs text-slate-500">Undergraduate & postgraduate programs</p>
              </div>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
              >
                View all courses
              </button>
            </div>

            <div className="space-y-3">
              {featuredCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveTab('courses')}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7]">{c.name}</span>
                      <span className="text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded font-mono font-semibold">{c.level}</span>
                    </div>
                    <p className="text-xs text-slate-500">{c.duration} · Stream: {c.stream}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Exams Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Major Entrance Examinations</h3>
                <p className="text-xs text-slate-500">National & university testing schedules</p>
              </div>
              <button
                onClick={() => setActiveTab('exams')}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View all exams
              </button>
            </div>

            <div className="space-y-3">
              {upcomingExams.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => setActiveTab('exams')}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">{ex.name}</span>
                      <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-semibold">{ex.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{ex.admissionScope}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. SCHOLARSHIP HIGHLIGHTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0D9488]" />
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Scholarship Opportunities
              </h2>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Government and foundation scholarships to fund your higher education without debt.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('scholarships')}
            className="text-xs font-semibold text-[#0D9488] hover:text-[#0284C7] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Check All Scholarships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topScholarships.map((sch) => (
            <div
              key={sch.id}
              className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  {sch.type}
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-display line-clamp-2">
                  {sch.name}
                </h4>
                <p className="text-xs text-slate-500">{sch.provider}</p>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                  <span className="text-slate-500 text-[11px] block">Financial Grant</span>
                  <span className="font-bold text-[#0D9488]">{sch.benefits}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-500">Max Income: {sch.maxAnnualFamilyIncome}</span>
                <button
                  onClick={() => setActiveTab('scholarships')}
                  className="font-semibold text-[#0D9488] hover:underline cursor-pointer"
                >
                  Check Criteria
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. AI CAREER GUIDE TEASER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0F766E] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>CareerPath AI Assistant</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Have Career Questions? Ask in English or Hindi.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Ask questions like "What should I do after 10th?", "How can I become a software engineer without JEE?", or "Doctor banne ke liye kya karein?" and receive an instant, structured breakdown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative z-10">
            <button
              onClick={() => setActiveTab('ai-guide')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Chat with CareerPath AI</span>
            </button>
            <button
              onClick={() => setActiveTab('onboarding')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Build My Profile First
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. WHY CAREERPATH CG & CTA
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Built for Students, Trusted by Counselors
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No gatekept information or commercial consultancy biases. Every student deserves a crystal-clear roadmap to their dream profession.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <CheckCircle2 className="w-6 h-6 text-[#0D9488] mb-2" />
            <h4 className="text-base font-bold text-slate-900">Zero Commercial Bias</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never push private universities or expensive coaching packages. Our roadmaps highlight cost-effective government options first.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <GitFork className="w-6 h-6 text-[#0284C7] mb-2" />
            <h4 className="text-base font-bold text-slate-900">Multi-Route Flexibility</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never let one entrance exam define your future. We map 3 to 5 realistic alternative pathways for every major career.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="text-base font-bold text-slate-900">Verified Regulatory Guidance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grounded in official NEP guidelines, AICTE norms, NTA schedules, and Central/State scholarship portals.
            </p>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="pt-6">
          <button
            onClick={() => setActiveTab('onboarding')}
            className="px-8 py-4 rounded-2xl text-base font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-md shadow-teal-900/10 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Create Your Personalized Career Roadmap Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};
