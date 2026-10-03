import React from 'react';
import { X, BookOpen, Clock, DollarSign, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Course } from '../types';
import { useApp } from '../context/AppContext';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { toggleSaveItem, isItemSaved } = useApp();

  if (!course) return null;

  const isSaved = isItemSaved('course', course.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-cyan-50/40 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 mb-1">
              <span>{course.level}</span>
              <span>·</span>
              <span>Stream: {course.stream}</span>
              <span>·</span>
              <span>{course.type} Institutions</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {course.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{course.fullName}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem('course', course.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-200 text-slate-500'
              }`}
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Duration</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                {course.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Estimated Annual Fees</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {course.approxAnnualFee}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">Course Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{course.overview}</p>
          </div>

          {/* Eligibility */}
          <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 text-xs">
            <h4 className="font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Minimum Eligibility Criteria
            </h4>
            <p className="text-slate-700">{course.eligibility}</p>
          </div>

          {/* Core Subjects */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Core Curriculum & Subjects</h4>
            <div className="flex flex-wrap gap-1.5">
              {course.coreSubjects.map((sub, i) => (
                <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Top Entrance Exams */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Primary Entrance Exams</h4>
            <div className="flex flex-wrap gap-1.5">
              {course.topExams.map((ex, i) => (
                <span key={i} className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-md border border-violet-100 font-medium">
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Developed & Career Paths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Direct Career Roles</strong>
              <p className="text-slate-600">{course.careerOptions.join(', ')}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="block text-slate-800 mb-1.5 font-bold uppercase text-[11px]">Higher Studies Options</strong>
              <p className="text-slate-600">{course.higherStudies.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
