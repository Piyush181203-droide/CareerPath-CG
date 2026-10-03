import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_SCHOLARSHIPS } from '../data/mockData';
import { Scholarship } from '../types';
import { EligibilityModal } from '../components/EligibilityModal';

export const ScholarshipFinderView: React.FC = () => {
  const { toggleSaveItem, isItemSaved } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [selectedScholarshipForCheck, setSelectedScholarshipForCheck] = useState<Scholarship | null>(null);

  const types = ['All', 'Government', 'Private / Foundation'];
  const states = ['All', 'All India', 'Chhattisgarh'];

  const filteredScholarships = INITIAL_SCHOLARSHIPS.filter((sch) => {
    if (selectedType !== 'All' && sch.type !== selectedType) {
      return false;
    }
    if (selectedState !== 'All' && sch.state !== selectedState && sch.state !== 'All India') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sch.name.toLowerCase().includes(q) || sch.provider.toLowerCase().includes(q);
      const matchBenefits = sch.benefits.toLowerCase().includes(q);
      if (!matchName && !matchBenefits) return false;
    }
    return true;
  });

  const handleOpenEligibility = (sch?: Scholarship) => {
    setSelectedScholarshipForCheck(sch || null);
    setIsEligibilityModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-800 mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Financial Aid & Grants</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Scholarship Finder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Verified financial support for school, polytechnic, undergraduate, and professional students to eliminate financial bottlenecks.
          </p>
        </div>

        {/* Universal Eligibility Calculator CTA */}
        <button
          onClick={() => handleOpenEligibility()}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Interactive Eligibility Calculator</span>
        </button>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship name, provider, or keyword (e.g. Pragati, INSPIRE, Central Sector, Minority)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Provider Type:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedType === t ? 'bg-[#0D9488] text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">State / Region:</span>
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedState(s)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedState === s ? 'bg-[#0284C7] text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((sch) => {
          const isSaved = isItemSaved('scholarship', sch.id);

          return (
            <div
              key={sch.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      {sch.type}
                    </span>
                    <span className="text-xs text-slate-400">Region: {sch.state}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveItem('scholarship', sch.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-display">
                  {sch.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{sch.provider}</p>

                {/* Benefits highlighted */}
                <div className="my-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                  <span className="text-slate-500 text-[11px] block font-bold uppercase mb-0.5">Scholarship Grant</span>
                  <p className="font-bold text-emerald-900 text-xs sm:text-sm">{sch.benefits}</p>
                </div>

                {/* Criteria breakdown */}
                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div>
                    <strong className="text-slate-500 text-[11px] uppercase block">Eligible Education Levels</strong>
                    <span>{sch.targetClass.join(' · ')}</span>
                  </div>
                  <div>
                    <strong className="text-slate-500 text-[11px] uppercase block">Family Income Cap & Quota</strong>
                    <span>{sch.maxAnnualFamilyIncome} ceiling · {sch.categoryQuota.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={sch.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleOpenEligibility(sch)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        scholarship={selectedScholarshipForCheck}
      />

    </div>
  );
};
