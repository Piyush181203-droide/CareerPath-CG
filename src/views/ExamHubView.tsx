import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Calendar, 
  FileText, 
  Bookmark, 
  ArrowRight, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_EXAMS } from '../data/mockData';
import { Exam } from '../types';
import { ExamDetailModal } from '../components/ExamDetailModal';

export const ExamHubView: React.FC = () => {
  const { toggleSaveItem, isItemSaved } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeExamModal, setActiveExamModal] = useState<Exam | null>(null);

  const categories = [
    'All',
    'Engineering',
    'Medical',
    'Law',
    'University'
  ];

  const filteredExams = INITIAL_EXAMS.filter((exam) => {
    if (selectedCategory !== 'All' && exam.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = exam.name.toLowerCase().includes(q) || exam.fullName.toLowerCase().includes(q);
      const matchScope = exam.admissionScope.toLowerCase().includes(q);
      const matchSubjects = exam.subjects.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchScope && !matchSubjects) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-xs font-semibold text-[#0369A1] mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>National Testing Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Examination Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Syllabus breakdown, question paper patterns, application timelines, and preparation strategies for major entrance tests.
          </p>
        </div>

        {/* Data Notice Badge */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Dates shown are standard annual cycles (Sample Calendar Data). Check official links for official session notifications.</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entrance exams (e.g. JEE Main, NEET, CLAT, NIMCET, CUET)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-slate-500">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c ? 'bg-[#0284C7] text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isSaved = isItemSaved('exam', exam.id);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded font-bold">
                      {exam.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{exam.frequency}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveItem('exam', exam.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <h3 
                  onClick={() => setActiveExamModal(exam)}
                  className="text-lg font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors font-display cursor-pointer"
                >
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{exam.fullName}</p>

                {/* Admission scope */}
                <div className="my-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px] block font-bold uppercase mb-0.5">Admission Scope</span>
                  <p className="text-slate-700 line-clamp-2">{exam.admissionScope}</p>
                </div>

                {/* Dates & Format */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0" />
                    <span><strong>Window:</strong> {exam.applicationPeriod.split('|')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0" />
                    <span className="line-clamp-1"><strong>Format:</strong> {exam.examPattern.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-[#0284C7] flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setActiveExamModal(exam)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-50 hover:bg-cyan-100 text-[#0369A1] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Full Pattern & Syllabus</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ExamDetailModal
        exam={activeExamModal}
        onClose={() => setActiveExamModal(null)}
      />

    </div>
  );
};
