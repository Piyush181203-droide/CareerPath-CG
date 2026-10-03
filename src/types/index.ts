export type StreamType = 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'General';

export type EducationLevel = 
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Diploma'
  | 'Graduate';

export interface TimelineStep {
  id: string;
  stepNumber: number;
  stageName: string; // e.g. "01 — Stream Selection", "04 — Entrance Exam"
  title: string;
  timeframe: string; // e.g. "Class 10 (Age 15-16)", "Year 1-2"
  description: string;
  whatToStudy: string[];
  importantSubjects: string[];
  skillsToLearn: string[];
  relevantExams: string[];
  preparationStrategy: string;
  requiredDocuments: string[];
  nextAction: string;
  isCompleted?: boolean;
}

export interface CareerRoute {
  id: string;
  routeName: string; // e.g. "Route A: Traditional B.Tech Route"
  badge: string; // e.g. "Most Popular", "Cost-Effective", "Lateral Entry"
  description: string;
  duration: string; // e.g. "4 Years", "3 + 2 Years"
  estimatedInvestment: string; // e.g. "₹4L - ₹12L" or "Affordable Govt"
  pros: string[];
  cons: string[];
  steps: TimelineStep[];
}

export interface Career {
  id: string;
  name: string;
  category: 'Science & Tech' | 'Healthcare' | 'Commerce & Finance' | 'Law & Humanities' | 'Design & Creative' | 'Government & Defence';
  stream: StreamType[];
  overview: string;
  eligibility: string;
  requiredEducation: string;
  subjects: string[];
  entranceExams: string[];
  topCourses: string[];
  skills: string[];
  studyDuration: string;
  averageStartingSalary: string;
  jobRoles: string[];
  higherStudies: string[];
  preparationStrategy: string;
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  routes: CareerRoute[];
  isFeatured?: boolean;
  iconName?: string;
}

export interface Course {
  id: string;
  name: string;
  fullName: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certification';
  stream: StreamType;
  duration: string;
  eligibility: string;
  coreSubjects: string[];
  topExams: string[];
  careerOptions: string[];
  higherStudies: string[];
  skillsDeveloped: string[];
  type: 'Government' | 'Private' | 'Both';
  approxAnnualFee: string;
  overview: string;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: 'Engineering' | 'Medical' | 'Law' | 'Civil Services' | 'Defence' | 'Management' | 'University';
  eligibility: string;
  applicationPeriod: string; // Clearly labeled demo dates
  examPattern: string;
  subjects: string[];
  preparationStrategy: string;
  requiredDocuments: string[];
  admissionScope: string;
  officialWebsite: string;
  frequency: string;
  isDemoData: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: 'Government' | 'Private / Foundation';
  targetClass: string[];
  eligibleStream: StreamType[];
  state: string; // e.g. "All India", "Chhattisgarh", "National"
  categoryQuota: ('General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'Girls Only')[];
  maxAnnualFamilyIncome: string; // e.g. "₹2,50,000" or "₹8,00,000"
  benefits: string; // e.g. "₹12,000 to ₹20,000 per annum"
  lastDateInfo: string;
  documentsRequired: string[];
  applicationProcess: string;
  officialLink: string;
  isDemoData: boolean;
}

export interface StudentProfile {
  fullName: string;
  age: number | string;
  currentClass: EducationLevel;
  stream: StreamType;
  subjects: string[];
  interests: string[];
  skills: string[];
  careerGoal: string;
  preferredLocation: string;
  institutionType: 'Government' | 'Private' | 'Both';
  budgetPreference: 'Low (Govt/Subsidized)' | 'Moderate' | 'Flexible';
  entranceExamInterest: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  profile?: StudentProfile;
  savedCareers: string[];
  savedCourses: string[];
  savedExams: string[];
  savedScholarships: string[];
  savedRoadmapIds: string[];
  completedSteps: string[]; // step IDs marked done
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  relatedCareerId?: string;
  relatedCourseId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Exam Alert' | 'Scholarship Deadline' | 'Admissions' | 'Counseling';
  date: string;
  content: string;
  linkText?: string;
  isImportant?: boolean;
}
