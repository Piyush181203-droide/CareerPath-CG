import React from 'react';
import { Compass, Sparkles, Heart, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/85 text-slate-600 border-t border-emerald-100/90 pt-16 pb-12 mt-20 relative overflow-hidden backdrop-blur-md">
      {/* Subtle footer ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-emerald-300/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full border-[2.5px] border-slate-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
              </div>
              <div className="flex items-baseline">
                <span className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                  CareerPath
                </span>
                <span className="font-display font-extrabold text-2xl text-[#0284C7] ml-0.5 tracking-tight">
                  CG
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Empowering students across India with personalized AI-powered career roadmaps, degree course navigation, entrance examination timelines, and scholarship guidance.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#0F766E] font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Glass × AI Guidance Engine Active (English + Hindi/Hinglish)</span>
            </div>
          </div>

          {/* Column 1: Explore Pathways */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Explore Pathways
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Science & Technology
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Medical & Healthcare
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Commerce & Finance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Law & Civil Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Design & Creative Fields
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Student Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Student Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('onboarding')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-slate-600"
                >
                  <span>Career Roadmap Builder</span>
                  <span className="text-[10px] bg-emerald-50 text-[#0F766E] px-1.5 py-0.5 rounded font-mono border border-emerald-200">Wizard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('ai-guide')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-slate-600"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Career Assistant</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('courses')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Course Finder (UG / PG)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('exams')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Examination Hub & Pattern
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('scholarships')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Scholarship Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Admin */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Platform & Governance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('dashboard')} 
                  className="hover:text-[#0D9488] transition-colors cursor-pointer text-left text-slate-600"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('admin')} 
                  className="hover:text-amber-700 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-amber-600 font-semibold"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Management</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://scholarships.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0D9488] transition-colors flex items-center gap-1 text-slate-500"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://jeemain.nta.nic.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0D9488] transition-colors flex items-center gap-1 text-slate-500"
                >
                  <span>NTA Examination Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="max-w-2xl text-center md:text-left">
            <p className="leading-relaxed">
              <strong className="text-slate-800">Important Note on Data:</strong> Examination dates, fee estimates, and scholarship application windows marked as demo data are representative sample calendars. For official regulatory notifications, please consult respective statutory authorities (NTA, MCC, ICAI, Consortium of NLUs, or NSP).
            </p>
          </div>
          <div className="text-center md:text-right text-slate-500">
            <p>© {new Date().getFullYear()} CareerPath CG. All rights reserved.</p>
            <p className="text-[11px] text-[#0F766E] mt-1 font-semibold">Developed by Piyush Prakash · AI Career Guidance Platform.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
