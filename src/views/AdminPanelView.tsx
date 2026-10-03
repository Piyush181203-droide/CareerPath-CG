import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  CheckCircle2, 
  X, 
  Bell, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Career, Course, Exam, Scholarship, Announcement } from '../types';
import { 
  INITIAL_CAREERS, 
  INITIAL_COURSES, 
  INITIAL_EXAMS, 
  INITIAL_SCHOLARSHIPS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/mockData';

export const AdminPanelView: React.FC = () => {
  const { currentUser, loginAs } = useApp();

  const [activeModule, setActiveModule] = useState<'overview' | 'careers' | 'courses' | 'exams' | 'scholarships' | 'announcements'>('overview');
  
  // Local admin collections
  const [adminCareers, setAdminCareers] = useState<Career[]>(INITIAL_CAREERS);
  const [adminCourses, setAdminCourses] = useState<Course[]>(INITIAL_COURSES);
  const [adminExams, setAdminExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [adminScholarships, setAdminScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS);
  const [adminAnnouncements, setAdminAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  const [searchFilter, setSearchFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for creating new records
  const [newCareerName, setNewCareerName] = useState('');
  const [newCareerCategory, setNewCareerCategory] = useState<'Science & Tech' | 'Healthcare' | 'Commerce & Finance' | 'Law & Humanities' | 'Design & Creative' | 'Government & Defence'>('Science & Tech');
  const [newCareerOverview, setNewCareerOverview] = useState('');
  const [newCareerSalary, setNewCareerSalary] = useState('₹6,00,000 – ₹15,00,000');
  const [newCareerDuration, setNewCareerDuration] = useState('4 Years');

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'Exam Alert' | 'Scholarship Deadline' | 'Admissions' | 'Counseling'>('Exam Alert');
  const [newAnnContent, setNewAnnContent] = useState('');

  // Handle create career
  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerName.trim()) return;

    const newC: Career = {
      id: `career-${Date.now()}`,
      name: newCareerName,
      category: newCareerCategory,
      stream: ['Science', 'General'],
      overview: newCareerOverview || 'Comprehensive career pathway with structured developmental milestones.',
      eligibility: '10+2 with required subjects as per statutory council guidelines.',
      requiredEducation: 'Bachelor degree in relevant domain.',
      subjects: ['Core Discipline', 'Domain Fundamentals', 'Professional Practice'],
      entranceExams: ['National Entrance Test', 'State CET'],
      topCourses: ['Bachelor Degree Program', 'Integrated Masters'],
      skills: ['Domain Expertise', 'Problem Analysis', 'Project Management'],
      studyDuration: newCareerDuration,
      averageStartingSalary: newCareerSalary,
      jobRoles: ['Associate Specialist', 'Officer', 'Consultant'],
      higherStudies: ['Postgraduate Specialization', 'Doctoral Studies'],
      preparationStrategy: 'Systematic study of fundamentals and regular mock testing.',
      commonMistakes: ['Neglecting foundational concepts in early semesters'],
      faqs: [{ question: 'What is the entry criteria?', answer: 'Passed 10+2 in relevant stream.' }],
      routes: [
        {
          id: `r-${Date.now()}`,
          routeName: 'Route A: Direct Standard Undergraduate Path',
          badge: 'Recommended',
          description: 'Standard four-year professional progression.',
          duration: newCareerDuration,
          estimatedInvestment: 'Subsidized Govt to Moderate',
          pros: ['Direct campus placement', 'Structured curriculum'],
          cons: ['Competitive entrance cutoff'],
          steps: [
            {
              id: `st-1-${Date.now()}`,
              stepNumber: 1,
              stageName: '01 — Foundational Stage',
              title: 'Complete 10+2 with High Academic Distinction',
              timeframe: 'Class 11 & 12',
              description: 'Focus on core subjects required for national eligibility.',
              whatToStudy: ['Core stream textbooks', 'Entrance question papers'],
              importantSubjects: ['Stream Core Subjects'],
              skillsToLearn: ['Time management', 'Conceptual problem breakdown'],
              relevantExams: ['Target Entrance Exam'],
              preparationStrategy: 'Daily dedicated revision and weekly mock tests.',
              requiredDocuments: ['10th & 12th Marksheets'],
              nextAction: 'Register for entrance counseling.'
            }
          ]
        }
      ]
    };

    setAdminCareers([newC, ...adminCareers]);
    setNewCareerName('');
    setNewCareerOverview('');
    setIsAddModalOpen(false);
  };

  // Handle create announcement
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim()) return;

    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      category: newAnnCategory,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      content: newAnnContent,
      isImportant: true
    };

    setAdminAnnouncements([ann, ...adminAnnouncements]);
    setNewAnnTitle('');
    setNewAnnContent('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCareer = (id: string) => {
    if (window.confirm('Delete this career record from repository?')) {
      setAdminCareers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Delete this course record?')) {
      setAdminCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleDeleteExam = (id: string) => {
    if (window.confirm('Delete this entrance exam record?')) {
      setAdminExams(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleDeleteScholarship = (id: string) => {
    if (window.confirm('Delete this scholarship scheme record?')) {
      setAdminScholarships(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAdminAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Repository Governance & Content Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Admin Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Create, audit, publish, or remove career roadmaps, degree courses, entrance examinations, and scholarship announcements.
          </p>
        </div>

        {currentUser?.role !== 'admin' && (
          <button
            onClick={() => loginAs('admin')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all cursor-pointer self-start md:self-auto"
          >
            Switch to Full Admin Role
          </button>
        )}
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl font-bold font-display text-slate-900">1,485</span>
          <p className="text-[10px] text-emerald-600 mt-1">↑ Active counseling</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Careers</span>
            <Compass className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-2xl font-bold font-display text-slate-900">{adminCareers.length}</span>
          <p className="text-[10px] text-slate-400 mt-1">Multi-route enabled</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Courses</span>
            <BookOpen className="w-4 h-4 text-cyan-600" />
          </div>
          <span className="text-2xl font-bold font-display text-slate-900">{adminCourses.length}</span>
          <p className="text-[10px] text-slate-400 mt-1">UG & PG Degrees</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Examinations</span>
            <GraduationCap className="w-4 h-4 text-violet-600" />
          </div>
          <span className="text-2xl font-bold font-display text-slate-900">{adminExams.length}</span>
          <p className="text-[10px] text-slate-400 mt-1">National & State</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Scholarships</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold font-display text-slate-900">{adminScholarships.length}</span>
          <p className="text-[10px] text-slate-400 mt-1">Govt & Foundation</p>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Announcements & Feed' },
            { id: 'careers', label: `Careers (${adminCareers.length})` },
            { id: 'courses', label: `Courses (${adminCourses.length})` },
            { id: 'exams', label: `Exams (${adminExams.length})` },
            { id: 'scholarships', label: `Scholarships (${adminScholarships.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeModule === tab.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Search Bar for Table Views */}
      {activeModule !== 'overview' && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={`Filter ${activeModule}...`}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
          />
        </div>
      )}

      {/* MODULE 1: Announcements */}
      {activeModule === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Broadcast Alerts & Student Counseling Bulletins</span>
            </h3>
          </div>

          <div className="space-y-3">
            {adminAnnouncements.map((ann) => (
              <div 
                key={ann.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                </div>

                <button
                  onClick={() => handleDeleteAnnouncement(ann.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: Careers Management */}
      {activeModule === 'careers' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Career Name</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Starting Salary</th>
                  <th className="px-5 py-3.5">Routes</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminCareers
                  .filter(c => !searchFilter || c.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((career) => (
                    <tr key={career.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {career.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {career.category}
                      </td>
                      <td className="px-5 py-4 text-emerald-700 font-medium">
                        {career.averageStartingSalary.split('–')[0]}
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-mono">
                        {career.routes.length} pathways
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteCareer(career.id)}
                          className="text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: Courses Management */}
      {activeModule === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Course Name</th>
                  <th className="px-5 py-3.5">Level</th>
                  <th className="px-5 py-3.5">Stream</th>
                  <th className="px-5 py-3.5">Duration</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminCourses
                  .filter(c => !searchFilter || c.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {course.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-mono">
                        {course.level}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {course.stream}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {course.duration}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: Exams Management */}
      {activeModule === 'exams' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Exam Name</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Application Window</th>
                  <th className="px-5 py-3.5">Portal</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminExams
                  .filter(e => !searchFilter || e.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {exam.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {exam.category}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {exam.applicationPeriod.split('|')[0]}
                      </td>
                      <td className="px-5 py-4 text-indigo-600 font-mono text-[11px]">
                        {exam.officialWebsite}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 5: Scholarships Management */}
      {activeModule === 'scholarships' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Scholarship Scheme</th>
                  <th className="px-5 py-3.5">Provider Type</th>
                  <th className="px-5 py-3.5">Max Family Income</th>
                  <th className="px-5 py-3.5">Benefits</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminScholarships
                  .filter(s => !searchFilter || s.name.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((sch) => (
                    <tr key={sch.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {sch.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-semibold">
                        {sch.type}
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-mono">
                        {sch.maxAnnualFamilyIncome}
                      </td>
                      <td className="px-5 py-4 text-emerald-700 font-medium">
                        {sch.benefits}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDeleteScholarship(sch.id)}
                          className="text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW RECORD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create New Repository Record
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activeModule === 'overview' ? (
                <form onSubmit={handleAddAnnouncement} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Announcement / Alert Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      placeholder="e.g. JEE Main Session 2 Registration Opened"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newAnnCategory}
                      onChange={(e) => setNewAnnCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                    >
                      <option value="Exam Alert">Exam Alert</option>
                      <option value="Scholarship Deadline">Scholarship Deadline</option>
                      <option value="Admissions">Admissions</option>
                      <option value="Counseling">Counseling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alert Content / Details
                    </label>
                    <textarea
                      rows={3}
                      value={newAnnContent}
                      onChange={(e) => setNewAnnContent(e.target.value)}
                      placeholder="Details of the announcement..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  >
                    Broadcast Bulletin
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddCareer} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Career Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newCareerName}
                      onChange={(e) => setNewCareerName(e.target.value)}
                      placeholder="e.g. Biomedical Engineer"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newCareerCategory}
                      onChange={(e) => setNewCareerCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                    >
                      <option value="Science & Tech">Science & Tech</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Commerce & Finance">Commerce & Finance</option>
                      <option value="Law & Humanities">Law & Humanities</option>
                      <option value="Design & Creative">Design & Creative</option>
                      <option value="Government & Defence">Government & Defence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Overview
                    </label>
                    <textarea
                      rows={2}
                      value={newCareerOverview}
                      onChange={(e) => setNewCareerOverview(e.target.value)}
                      placeholder="Key roles and responsibilities..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={newCareerDuration}
                        onChange={(e) => setNewCareerDuration(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Avg Starting Pay</label>
                      <input
                        type="text"
                        value={newCareerSalary}
                        onChange={(e) => setNewCareerSalary(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  >
                    Add Career to Repository
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
