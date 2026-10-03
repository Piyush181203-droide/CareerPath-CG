import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Scholarship } from '../types';
import { INITIAL_SCHOLARSHIPS } from '../data/mockData';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarship?: Scholarship | null;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose, scholarship }) => {
  const [userClass, setUserClass] = useState('Class 12 Passed');
  const [userState, setUserState] = useState('All India');
  const [userCategory, setUserCategory] = useState<'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'Girls Only'>('General');
  const [familyIncome, setFamilyIncome] = useState<number>(300000);
  const [evaluated, setEvaluated] = useState(false);

  if (!isOpen) return null;

  const targetList = scholarship ? [scholarship] : INITIAL_SCHOLARSHIPS;

  // Evaluation logic
  const results = targetList.map((sch) => {
    let eligible = true;
    const reasons: string[] = [];

    // Income check
    const matchIncome = sch.maxAnnualFamilyIncome.match(/₹([\d,]+)/);
    if (matchIncome) {
      const maxIncomeNum = parseInt(matchIncome[1].replace(/,/g, ''), 10);
      if (familyIncome > maxIncomeNum) {
        eligible = false;
        reasons.push(`Family income exceeds ceiling of ${sch.maxAnnualFamilyIncome}`);
      }
    }

    // Category quota check
    if (sch.categoryQuota && sch.categoryQuota.length > 0) {
      if (!sch.categoryQuota.includes(userCategory) && !sch.categoryQuota.includes('General')) {
        eligible = false;
        reasons.push(`Quota requirement: ${sch.categoryQuota.join(', ')}`);
      }
    }

    // State check
    if (sch.state !== 'All India' && userState !== 'All India' && sch.state !== userState) {
      eligible = false;
      reasons.push(`Restricted to ${sch.state} residents`);
    }

    return {
      scholarship: sch,
      isEligible: eligible,
      reasons
    };
  });

  const eligibleCount = results.filter(r => r.isEligible).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {scholarship ? `Check Eligibility: ${scholarship.name}` : 'Interactive Scholarship Eligibility Calculator'}
              </h3>
              <p className="text-xs text-slate-500">
                Instant assessment based on income ceiling, category & domicile
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Academic Level
              </label>
              <select
                value={userClass}
                onChange={(e) => { setUserClass(e.target.value); setEvaluated(false); }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
              >
                <option value="Class 10">Class 10 Student</option>
                <option value="Class 11">Class 11 (Intermediate 1st Year)</option>
                <option value="Class 12 Passed">Class 12 Passed / Fresher</option>
                <option value="Undergraduate Year 1">Undergraduate Degree (Year 1)</option>
                <option value="Diploma Year 1">Polytechnic Diploma</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reservation / Social Category
              </label>
              <select
                value={userCategory}
                onChange={(e) => { setUserCategory(e.target.value as any); setEvaluated(false); }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
              >
                <option value="General">General / Open Category</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="Girls Only">Girl Candidate (Pragati/Special)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State Domicile
              </label>
              <select
                value={userState}
                onChange={(e) => { setUserState(e.target.value); setEvaluated(false); }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
              >
                <option value="All India">All India / Central Scheme</option>
                <option value="Chhattisgarh">Chhattisgarh State</option>
                <option value="Other">Other State</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Annual Family Income
                </label>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  ₹{familyIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1200000"
                step="50000"
                value={familyIncome}
                onChange={(e) => { setFamilyIncome(Number(e.target.value)); setEvaluated(false); }}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹50K</span>
                <span>₹4.5L (NSP cap)</span>
                <span>₹8L (Govt EWS)</span>
                <span>₹12L+</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setEvaluated(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Evaluate My Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Results Block */}
          {evaluated && (
            <div className="space-y-3 pt-3 border-t border-slate-100 max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Eligibility Evaluation Results ({eligibleCount} Eligible)
                </h4>
                <span className="text-[11px] text-slate-500">Based on submitted criteria</span>
              </div>

              {results.map(({ scholarship: sch, isEligible, reasons }) => (
                <div 
                  key={sch.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isEligible 
                      ? 'border-emerald-200 bg-emerald-50/50' 
                      : 'border-slate-200 bg-slate-50/50 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isEligible ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                        <span className="font-bold text-slate-900">{sch.name}</span>
                      </div>
                      <p className="text-slate-600 pl-6">
                        <strong>Benefits:</strong> {sch.benefits}
                      </p>
                      {!isEligible && reasons.length > 0 && (
                        <p className="text-rose-600 text-[11px] pl-6">
                          ⚠️ {reasons.join(' · ')}
                        </p>
                      )}
                    </div>
                    {isEligible && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Eligible
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Notice */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>Final sanction depends on physical document verification by college nodal officers.</span>
        </div>
      </div>
    </div>
  );
};
