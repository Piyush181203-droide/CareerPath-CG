import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  User, 
  BookOpen, 
  Heart, 
  Target, 
  Sliders, 
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfile, EducationLevel, StreamType } from '../types';

export const OnboardingView: React.FC = () => {
  const { updateStudentProfile, setActiveCareer, setActiveRouteId, setActiveTab } = useApp();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('Aman Sharma');
  const [age, setAge] = useState<number | string>(17);
  const [currentClass, setCurrentClass] = useState<EducationLevel>('Class 12');
  const [stream, setStream] = useState<StreamType>('Science');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Chemistry', 'Mathematics', 'Computer Science']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Coding & Software', 'Web Development', 'Problem Solving']);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python Basics', 'Mathematics', 'Logical Reasoning']);
  const [careerGoal, setCareerGoal] = useState<string>('Software Engineer');
  const [customGoal, setCustomGoal] = useState<string>('');
  const [preferredLocation, setPreferredLocation] = useState<string>('National & Regional Institutes');
  const [institutionType, setInstitutionType] = useState<'Government' | 'Private' | 'Both'>('Both');
  const [budgetPreference, setBudgetPreference] = useState<'Low (Govt/Subsidized)' | 'Moderate' | 'Flexible'>('Moderate');
  const [entranceInterests, setEntranceInterests] = useState<string[]>(['JEE Main', 'CGPET']);

  // Options
  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 
    'Accountancy', 'Economics', 'Business Studies', 'Political Science', 
    'History', 'Psychology', 'English', 'Geography'
  ];

  const interestOptions = [
    'Coding & Software', 'Healthcare & Medicine', 'Financial Markets', 
    'Law & Justice', 'Visual Design & UI/UX', 'Robotics & Hardware', 
    'Scientific Research', 'Public Administration (IAS)', 'Aviation & Flying', 
    'Digital Media & Content', 'Business & Startups'
  ];

  const skillOptions = [
    'Logical Reasoning', 'Mathematics', 'Communication', 'Python Basics', 
    'HTML/CSS', 'Problem Solving', 'Data Interpretation', 'Sketching/Design', 
    'Public Speaking', 'Accounting Principles'
  ];

  const popularGoals = [
    'Software Engineer',
    'Doctor / MBBS',
    'Chartered Accountant (CA)',
    'Data Scientist & AI Specialist',
    'Civil Services (IAS/IPS)',
    'Corporate Lawyer',
    'Commercial Pilot',
    'UI/UX Product Designer'
  ];

  const toggleChip = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerateRoadmap = async () => {
    setIsSubmitting(true);
    const finalGoal = customGoal.trim() ? customGoal.trim() : careerGoal;

    const profile: StudentProfile = {
      fullName: fullName || 'Student',
      age,
      currentClass,
      stream,
      subjects: selectedSubjects,
      interests: selectedInterests,
      skills: selectedSkills,
      careerGoal: finalGoal,
      preferredLocation,
      institutionType,
      budgetPreference,
      entranceExamInterest: entranceInterests
    };

    updateStudentProfile(profile);

    try {
      const res = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.matchedCareer) {
          setActiveCareer(data.matchedCareer);
          if (data.matchedCareer.routes && data.matchedCareer.routes[0]) {
            setActiveRouteId(data.matchedCareer.routes[0].id);
          }
        }
      }
    } catch (e) {
      console.warn('API error, falling back locally', e);
    } finally {
      setIsSubmitting(false);
      setActiveTab('roadmap');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-slate-800">
      
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0F766E] mb-3 uppercase">
          <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Interactive Career Roadmap Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Build Your Career Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto font-normal">
          Answer a few questions about your current schooling and passions to generate your step-by-step career path.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span className="flex items-center gap-1.5 text-[#0D9488]">
            <span className="w-5 h-5 rounded-full bg-[#0D9488] text-white flex items-center justify-center text-[10px] font-bold">
              {step}
            </span>
            Step {step} of 5: {
              step === 1 ? 'Basic Information' :
              step === 2 ? 'Education & Stream' :
              step === 3 ? 'Interests & Skills' :
              step === 4 ? 'Career Goal' : 'Preferences'
            }
          </span>
          <span className="font-mono text-[#0284C7] font-bold">{step * 20}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#0284C7] transition-all duration-300 rounded-full shadow-2xs"
            style={{ width: `${step * 20}%` }}
          />
        </div>
      </div>

      {/* Wizard Form Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-100 shadow-sm">
        
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <User className="w-4 h-4 text-[#0D9488]" />
                Step 1: Basic Information
              </h2>
              <p className="text-xs text-slate-500">Help us personalize your counsel</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aman Sharma"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="13"
                  max="35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="17"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Current Educational Stage
                </label>
                <select
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value as any)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                >
                  <option value="Class 10">Class 10 (Preparing to choose stream)</option>
                  <option value="Class 11">Class 11 (Intermediate 1st Year)</option>
                  <option value="Class 12">Class 12 (Board Exams & Entrances)</option>
                  <option value="Diploma">Polytechnic Diploma</option>
                  <option value="Undergraduate">College Undergraduate (BCA/B.Sc/B.Tech/B.Com/BA)</option>
                  <option value="Graduate">Degree Completed / Seeking PG or Placement</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Education */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0284C7]" />
                Step 2: Current Stream & Core Subjects
              </h2>
              <p className="text-xs text-slate-500">Tell us what you are currently studying</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Academic Stream
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Science', 'Commerce', 'Arts', 'Vocational'] as StreamType[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStream(st)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                        stream === st 
                          ? 'border-[#0D9488] bg-emerald-50 text-[#0F766E] shadow-2xs font-bold' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Select Your Main Subjects (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleChip(selectedSubjects, setSelectedSubjects, sub)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[#0D9488] text-white font-bold shadow-2xs' 
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Interests & Skills */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                Step 3: What Energizes You? (Interests & Strengths)
              </h2>
              <p className="text-xs text-slate-500">Pick the topics and tasks you naturally enjoy</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Primary Areas of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((int) => {
                    const isSelected = selectedInterests.includes(int);
                    return (
                      <button
                        key={int}
                        type="button"
                        onClick={() => toggleChip(selectedInterests, setSelectedInterests, int)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[#0284C7] text-white font-bold shadow-2xs' 
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{int}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Your Natural Strengths / Current Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((sk) => {
                    const isSelected = selectedSkills.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => toggleChip(selectedSkills, setSelectedSkills, sk)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-blue-600 text-white font-bold shadow-2xs' 
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{sk}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Career Goal */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Target className="w-4 h-4 text-[#0D9488]" />
                Step 4: Target Career Goal
              </h2>
              <p className="text-xs text-slate-500">Select a career or type your custom dream role</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Popular Career Aspirations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularGoals.map((goal) => {
                    const isSelected = careerGoal === goal && !customGoal.trim();
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => { setCareerGoal(goal); setCustomGoal(''); }}
                        className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0D9488] bg-emerald-50 text-[#0F766E] shadow-2xs font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#0D9488]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Or Type Your Custom Goal (Optional)
                </label>
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="e.g. AI Ethics Researcher, Neurologist, Space Scientist..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/15"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Preferences */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0284C7]" />
                Step 5: Practical Preferences & Constraints
              </h2>
              <p className="text-xs text-slate-500">Tailoring the roadmap to your real-world situation</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Institution Preference
                  </label>
                  <select
                    value={institutionType}
                    onChange={(e) => setInstitutionType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white text-slate-800 border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="Both">Both Government & Top Private</option>
                    <option value="Government">Government / Autonomous Only</option>
                    <option value="Private">Reputable Private Universities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Budget Preference
                  </label>
                  <select
                    value={budgetPreference}
                    onChange={(e) => setBudgetPreference(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white text-slate-800 border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="Moderate">Moderate (₹1L - ₹4L per year)</option>
                    <option value="Low (Govt/Subsidized)">Affordable (Govt Subsidized / Scholarships)</option>
                    <option value="Flexible">Flexible / Open</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Preferred Study Location
                </label>
                <input
                  type="text"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  placeholder="e.g. Chhattisgarh / National NITs / Metro Cities"
                  className="w-full px-3 py-2 text-xs bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Entrance Examinations You Plan to Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {['JEE Main', 'NEET-UG', 'CUET-UG', 'CLAT', 'NIMCET', 'State CET (CGPET)', 'GATE', 'CAT'].map((ex) => {
                    const isSelected = entranceInterests.includes(ex);
                    return (
                      <button
                        key={ex}
                        type="button"
                        onClick={() => toggleChip(entranceInterests, setEntranceInterests, ex)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[#0D9488] text-white font-bold shadow-2xs' 
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{ex}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div></div>}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGenerateRoadmap}
              className="px-6 py-3 rounded-2xl text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-md shadow-teal-900/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Generating AI Roadmap...' : 'Build My Career Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
