import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  GitFork, 
  ArrowRight, 
  Bookmark, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_CAREERS } from '../data/mockData';
import { Career, StreamType } from '../types';

export const CareerExplorerView: React.FC = () => {
  const { setActiveCareer, setActiveRouteId, setActiveTab, setSelectedDetailCareer, toggleSaveItem, isItemSaved } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStream, setSelectedStream] = useState<string>('All');

  const categories = [
    'All',
    'Science & Tech',
    'Healthcare',
    'Commerce & Finance',
    'Law & Humanities',
    'Design & Creative',
    'Government & Defence'
  ];

  const streams = ['All', 'Science', 'Commerce', 'Arts', 'General'];

  const filteredCareers = INITIAL_CAREERS.filter((career) => {
    // Category filter
    if (selectedCategory !== 'All' && career.category !== selectedCategory) {
      return false;
    }
    // Stream filter
    if (selectedStream !== 'All' && !career.stream.includes(selectedStream as any) && !career.stream.includes('General')) {
      return false;
    }
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = career.name.toLowerCase().includes(q);
      const matchOverview = career.overview.toLowerCase().includes(q);
      const matchSkills = career.skills.some(s => s.toLowerCase().includes(q));
      const matchExams = career.entranceExams.some(e => e.toLowerCase().includes(q));
      if (!matchName && !matchOverview && !matchSkills && !matchExams) return false;
    }
    return true;
  });

  const handleLaunchRoadmap = (career: Career) => {
    setActiveCareer(career);
    if (career.routes[0]) {
      setActiveRouteId(career.routes[0].id);
    }
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#0F766E] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Interactive Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Career Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Explore diverse career trajectories, required entrance exams, study duration, starting salaries, and verified multi-route options.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto">
          Showing <strong className="text-slate-900">{filteredCareers.length}</strong> verified career paths
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by career title, entrance exam, or skill (e.g. Python, NEET, CLAT, Aviation)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
          />
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D9488] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stream Selector */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end lg:self-auto">
            <span className="text-xs font-semibold text-slate-500">Stream:</span>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="text-xs font-medium border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
            >
              {streams.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Career Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Compass className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No careers match your filters</h3>
          <p className="text-xs text-slate-500">
            Try resetting your search query or selecting "All" categories to view all pathways.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStream('All'); }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D9488] hover:bg-[#0F766E] text-white cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const isSaved = isItemSaved('career', career.id);

            return (
              <div
                key={career.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between p-6 group"
              >
                <div>
                  {/* Category & Save */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <span className="text-xs font-semibold text-[#0D9488]">
                      {career.category}
                    </span>
                    <button
                      onClick={() => toggleSaveItem('career', career.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Career'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Career Name */}
                  <h3 
                    onClick={() => setSelectedDetailCareer(career)}
                    className="text-lg font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors font-display cursor-pointer"
                  >
                    {career.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {career.overview}
                  </p>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 my-4">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Duration</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#0284C7]" />
                        {career.studyDuration}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Starting Salary</span>
                      <span className="font-bold text-[#0D9488] flex items-center gap-1 mt-0.5">
                        <DollarSign className="w-3 h-3 text-[#0D9488]" />
                        {career.averageStartingSalary.split('–')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Top Skills Tags */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Top In-Demand Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {skill}
                        </span>
                      ))}
                      {career.skills.length > 3 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{career.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Routes count */}
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-4">
                    <GitFork className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span><strong>{career.routes.length}</strong> Alternative Pathways available</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedDetailCareer(career)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleLaunchRoadmap(career)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer font-bold"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
