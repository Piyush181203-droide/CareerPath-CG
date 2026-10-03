import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Bookmark, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_COURSES } from '../data/mockData';
import { Course } from '../types';
import { CourseDetailModal } from '../components/CourseDetailModal';

export const CourseFinderView: React.FC = () => {
  const { toggleSaveItem, isItemSaved } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const streams = ['All', 'Science', 'Commerce', 'General'];
  const levels = ['All', 'Undergraduate', 'Postgraduate'];

  const filteredCourses = INITIAL_COURSES.filter((course) => {
    if (selectedStream !== 'All' && course.stream !== selectedStream && course.stream !== 'General') {
      return false;
    }
    if (selectedLevel !== 'All' && course.level !== selectedLevel) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = course.name.toLowerCase().includes(q) || course.fullName.toLowerCase().includes(q);
      const matchSubjects = course.coreSubjects.some(s => s.toLowerCase().includes(q));
      const matchCareers = course.careerOptions.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchSubjects && !matchCareers) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-xs font-semibold text-cyan-800 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>Academic Degree Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Course Finder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Compare undergraduate, postgraduate, and professional degrees across disciplines with curriculum highlights and career relevance.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto">
          Showing <strong className="text-slate-900">{filteredCourses.length}</strong> university degrees
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by degree name, subject, or target career (e.g. BCA, MBBS, Law, Computer Science)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Stream:</span>
            {streams.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStream(s)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedStream === s ? 'bg-cyan-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Level:</span>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLevel === l ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = isItemSaved('course', course.id);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {course.level}
                    </span>
                    <span className="text-xs text-slate-400">Stream: {course.stream}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveItem('course', course.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <h3 
                  onClick={() => setActiveCourseModal(course)}
                  className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors font-display cursor-pointer"
                >
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{course.fullName}</p>

                <p className="text-xs text-slate-600 line-clamp-2 my-3 leading-relaxed">
                  {course.overview}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Duration</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-cyan-600" />
                      {course.duration.split('(')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Est. Annual Fees</span>
                    <span className="font-bold text-slate-800 truncate block mt-0.5" title={course.approxAnnualFee}>
                      {course.approxAnnualFee.split(';')[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Subjects
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {course.coreSubjects.slice(0, 3).join(', ')}...
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {course.type} Institutions
                </span>
                <button
                  onClick={() => setActiveCourseModal(course)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CourseDetailModal
        course={activeCourseModal}
        onClose={() => setActiveCourseModal(null)}
      />

    </div>
  );
};
