import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Compass, BookOpen, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Career, Course, Exam, Scholarship } from '../types';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab, setActiveCareer, setSelectedDetailCareer } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'careers' | 'courses' | 'exams' | 'scholarships'>('all');
  const [results, setResults] = useState<{
    careers: Career[];
    courses: Course[];
    exams: Exam[];
    scholarships: Scholarship[];
  }>({ careers: [], courses: [], exams: [], scholarships: [] });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ careers: [], courses: [], exams: [], scholarships: [] });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ careers: [], courses: [], exams: [], scholarships: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const totalResults = 
    results.careers.length + 
    results.courses.length + 
    results.exams.length + 
    results.scholarships.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, courses, exams, scholarships (e.g. JEE, MCA, Doctor, Pragati)..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded font-medium cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('careers')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'careers' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Careers ({results.careers.length})
          </button>
          <button
            onClick={() => setActiveFilter('courses')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'courses' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Courses ({results.courses.length})
          </button>
          <button
            onClick={() => setActiveFilter('exams')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'exams' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Exams ({results.exams.length})
          </button>
          <button
            onClick={() => setActiveFilter('scholarships')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'scholarships' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Scholarships ({results.scholarships.length})
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="py-8 text-center text-xs text-slate-500">
              Searching career knowledge base...
            </div>
          )}

          {!isLoading && query && totalResults === 0 && (
            <div className="py-10 text-center">
              <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No direct results found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for broader keywords like "Science", "B.Tech", "Doctor", "NEET", or "NSP".
              </p>
            </div>
          )}

          {!query && (
            <div className="py-6 text-center">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Software Engineer', 'NEET-UG', 'BCA to MCA', 'JEE Main', 'Pragati Scholarship', 'CA Foundation'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Careers Section */}
          {(activeFilter === 'all' || activeFilter === 'careers') && results.careers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                <span>Careers</span>
              </div>
              <div className="space-y-1.5">
                {results.careers.map((career) => (
                  <div
                    key={career.id}
                    onClick={() => {
                      setSelectedDetailCareer(career);
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-indigo-50/60 border border-slate-100 hover:border-indigo-100 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {career.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{career.overview}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Section */}
          {(activeFilter === 'all' || activeFilter === 'courses') && results.courses.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                <span>Courses</span>
              </div>
              <div className="space-y-1.5">
                {results.courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      setActiveTab('courses');
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-cyan-50/60 border border-slate-100 hover:border-cyan-100 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {course.name}
                      </h4>
                      <p className="text-xs text-slate-500">{course.fullName} · {course.duration}</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {course.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exams Section */}
          {(activeFilter === 'all' || activeFilter === 'exams') && results.exams.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-violet-500" />
                <span>Examinations</span>
              </div>
              <div className="space-y-1.5">
                {results.exams.map((exam) => (
                  <div
                    key={exam.id}
                    onClick={() => {
                      setActiveTab('exams');
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-violet-50/60 border border-slate-100 hover:border-violet-100 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                        {exam.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{exam.admissionScope}</p>
                    </div>
                    <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-semibold">
                      {exam.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scholarships Section */}
          {(activeFilter === 'all' || activeFilter === 'scholarships') && results.scholarships.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Scholarships</span>
              </div>
              <div className="space-y-1.5">
                {results.scholarships.map((sch) => (
                  <div
                    key={sch.id}
                    onClick={() => {
                      setActiveTab('scholarships');
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-100 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {sch.name}
                      </h4>
                      <p className="text-xs text-slate-500">{sch.benefits}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                      {sch.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Press ESC to close</span>
          <span>CareerPath CG AI Index</span>
        </div>
      </div>
    </div>
  );
};
