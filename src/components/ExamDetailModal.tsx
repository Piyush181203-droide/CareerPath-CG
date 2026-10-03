import React from 'react';
import { X, GraduationCap, Calendar, FileText, CheckCircle2, Bookmark, ExternalLink, AlertCircle } from 'lucide-react';
import { Exam } from '../types';
import { useApp } from '../context/AppContext';

interface ExamDetailModalProps {
  exam: Exam | null;
  onClose: () => void;
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({ exam, onClose }) => {
  const { toggleSaveItem, isItemSaved } = useApp();

  if (!exam) return null;

  const isSaved = isItemSaved('exam', exam.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-violet-50/40 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 mb-1">
              <span>{exam.category}</span>
              <span>·</span>
              <span>{exam.frequency}</span>
              {exam.isDemoData && (
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono">
                  Sample Calendar Dates
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {exam.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{exam.fullName}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem('exam', exam.id)}
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
          {/* Key Dates & Admission Scope */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Application Window</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-violet-600" />
                {exam.applicationPeriod}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Admission Scope</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                {exam.admissionScope}
              </span>
            </div>
          </div>

          {/* Exam Pattern & Format */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Examination Pattern & Marking Scheme
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {exam.examPattern}
            </p>
            <div className="space-y-1">
              <strong className="text-[11px] text-slate-400 uppercase tracking-wider block">Subjects / Sections</strong>
              <div className="flex flex-wrap gap-1.5">
                {exam.subjects.map((sub, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 text-xs">
            <h4 className="font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Candidate Eligibility Criteria
            </h4>
            <p className="text-slate-700">{exam.eligibility}</p>
          </div>

          {/* Preparation Strategy */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Recommended Preparation Strategy
            </h4>
            <p className="text-slate-600 leading-relaxed">{exam.preparationStrategy}</p>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Documents Required for Registration</h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              {exam.requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <a
            href={exam.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5"
          >
            <span>Visit Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
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
