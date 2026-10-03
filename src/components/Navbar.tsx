import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Sparkles, 
  LayoutDashboard, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShieldCheck, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    setIsSearchOpen, 
    setIsAuthModalOpen, 
    logout 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'careers', label: 'Career Explorer' },
    { id: 'courses', label: 'Courses' },
    { id: 'exams', label: 'Exams' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'ai-guide', label: 'AI Career Guide', isSpecial: true },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-xs border-b border-emerald-100/90' 
          : 'bg-white/75 backdrop-blur-md border-b border-emerald-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo - exactly matching user screenshot */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleNavClick('home')}>
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              if (item.isSpecial) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'bg-[#0D9488] text-white shadow-xs font-bold' 
                        : 'bg-emerald-50 text-[#0F766E] hover:bg-emerald-100/80 border border-emerald-200/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#0F766E] font-semibold bg-emerald-50/90 border border-emerald-200/70'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[11px] font-mono">
                Ctrl K
              </span>
            </button>

            {/* User Session Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  {currentUser.role === 'admin' ? (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-200">
                      Admin
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => { handleNavClick('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                      Student Dashboard
                    </button>

                    <button
                      onClick={() => { handleNavClick('onboarding'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-cyan-600" />
                      Edit Student Profile
                    </button>

                    <button
                      onClick={() => { handleNavClick('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-pink-600" />
                      Saved Roadmaps & Items
                    </button>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => { handleNavClick('admin'); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-amber-800 font-semibold hover:bg-amber-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        Admin Management Panel
                      </button>
                    ) : (
                      <button
                        onClick={() => { handleNavClick('admin'); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                        Admin Demo Mode
                      </button>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Log in
                </button>
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-all cursor-pointer font-bold"
                >
                  <span>Start Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 border border-emerald-200 text-[#0F766E] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.isSpecial && (
                  <span className="text-xs bg-emerald-100 text-[#0F766E] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    AI
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-[#0D9488] text-white text-center cursor-pointer shadow-xs"
              >
                Sign In / Student Demo Login
              </button>
            ) : (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 text-center cursor-pointer"
              >
                Log Out ({currentUser.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
