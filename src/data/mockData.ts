import { Career, Course, Exam, Scholarship, Announcement, User } from '../types';

export const INITIAL_CAREERS: Career[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer / Architect',
    category: 'Science & Tech',
    stream: ['Science', 'General'],
    overview: 'Design, develop, test, and maintain enterprise software, distributed cloud systems, mobile apps, and scalable web solutions that power modern technology products.',
    eligibility: 'Pass 10+2 with Physics, Mathematics, and Chemistry / Computer Science, or equivalent Diploma / Degree.',
    requiredEducation: 'B.Tech / B.E in CSE/IT, or BCA followed by MCA, or B.Sc CS / IT.',
    subjects: ['Mathematics', 'Computer Science', 'Data Structures', 'Algorithms', 'Operating Systems', 'System Design'],
    entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CETs (CGPET, MHT-CET, WBJEE)', 'NIMCET', 'GATE'],
    topCourses: ['B.Tech Computer Science', 'B.Tech Information Technology', 'BCA', 'MCA', 'B.Sc Computer Science'],
    skills: ['Data Structures & Algorithms', 'Full Stack Development', 'Git & CI/CD', 'Cloud Platforms (GCP/AWS)', 'SQL/NoSQL Databases', 'System Design'],
    studyDuration: '3 to 5 Years (depending on route)',
    averageStartingSalary: '₹6,00,000 – ₹18,00,000 per annum',
    jobRoles: ['Frontend Engineer', 'Backend Engineer', 'Full Stack Developer', 'Cloud Architect', 'DevOps Specialist', 'Tech Lead'],
    higherStudies: ['M.Tech in CSE / AI', 'MS in Computer Science (Abroad)', 'MBA in Technology Management'],
    preparationStrategy: 'Master high school mathematics and logic early. Start learning one core programming language (Python, C++ or Java). Build practical personal projects and participate in open-source and hackathons.',
    commonMistakes: [
      'Focusing exclusively on theory while neglecting hands-on coding and Git repos.',
      'Assuming that only Tier-1 engineering colleges produce successful software developers.',
      'Ignoring fundamentals like Data Structures, Networking, and Database design.',
      'Neglecting communication and problem-framing abilities during campus placements.'
    ],
    faqs: [
      {
        question: 'Can I become a Software Engineer through BCA instead of B.Tech?',
        answer: 'Yes! Route C (BCA + MCA) or direct BCA with strong GitHub portfolio and DSA skills is a proven, cost-effective route to top product engineering firms.'
      },
      {
        question: 'Is coding difficult for students from Hindi medium backgrounds?',
        answer: 'Not at all. Programming is purely logical syntax and mathematical thinking. Thousands of top Indian software leaders started in state board regional medium schools.'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'se-route-a',
        routeName: 'Route A: Direct Engineering (B.Tech / B.E CSE)',
        badge: 'Premier & Most Popular',
        description: 'Traditional 4-year undergraduate engineering degree after 12th PCM. Direct entry to top campus recruitment drives.',
        duration: '4 Years',
        estimatedInvestment: '₹4.5L - ₹14L (Govt subsidized to Tier-1)',
        pros: ['Direct campus placement from top MNCs', 'Comprehensive hardware-software curriculum', 'Universally recognized abroad for MS'],
        cons: ['High entrance competition (JEE Main/Adv)', 'Rigorous 4-year academic syllabus'],
        steps: [
          {
            id: 'se-ra-1',
            stepNumber: 1,
            stageName: '01 — Class 10 Foundation',
            title: 'Solidify Mathematics & Logical Reasoning',
            timeframe: 'Class 10 (Age 15-16)',
            description: 'Focus on scoring $\\ge 75\\%$ in Class 10 board exams with special focus on Mathematics and Science. Explore basic computational logic.',
            whatToStudy: ['Algebra', 'Geometry', 'Physics & Chemistry fundamentals', 'Basic Python/Scratch syntax (optional)'],
            importantSubjects: ['Mathematics', 'Science', 'English'],
            skillsToLearn: ['Logical deduction', 'Problem breakdown', 'Basic computer literacy'],
            relevantExams: ['NTSE', 'Class 10 Board Examinations'],
            preparationStrategy: 'Target NCERT conceptual clarity. Solve previous 5 years question papers.',
            requiredDocuments: ['Class 10 Admit Card', 'Aadhaar Card', 'Birth Certificate'],
            nextAction: 'Choose Science stream with PCM (Physics, Chemistry, Mathematics) for Class 11.'
          },
          {
            id: 'se-ra-2',
            stepNumber: 2,
            stageName: '02 — Stream Selection & Class 11-12',
            title: 'PCM + Computer Science & JEE Preparation',
            timeframe: 'Class 11 & 12 (Age 16-18)',
            description: 'Enrol in PCM. Begin disciplined preparation for national (JEE Main/Advanced) and state engineering entrance examinations (CGPET, etc.).',
            whatToStudy: ['Mechanics, Electromagnetism', 'Calculus, Vectors, Coordinate Geometry', 'Organic/Inorganic Chemistry', 'C++ or Python in School CS'],
            importantSubjects: ['Physics', 'Mathematics', 'Chemistry', 'Computer Science'],
            skillsToLearn: ['Time management under speed tests', 'Problem solving in code'],
            relevantExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CET (CGPET/MHT-CET)'],
            preparationStrategy: 'Complete NCERT twice, then practice 30+ mock tests and previous 10 years JEE question papers.',
            requiredDocuments: ['10th Marksheet', 'Category Certificate (if applicable)', 'State Domicile Certificate'],
            nextAction: 'Register for JEE Main sessions in November/December.'
          },
          {
            id: 'se-ra-3',
            stepNumber: 3,
            stageName: '03 — Entrance & College Admission',
            title: 'Counselling & Seat Allocation (JoSAA / CSAB / State)',
            timeframe: 'Post Class 12 (May - August)',
            description: 'Appear for JEE Main/State exams. Participate in JoSAA/State counselling rounds to secure B.Tech CSE or IT branch.',
            whatToStudy: ['Review college branch placement statistics', 'Research accreditation (NAAC/NBA)'],
            importantSubjects: ['Seat Acceptance Fees', 'Branch Preference List'],
            skillsToLearn: ['Decision making', 'Financial planning / Education loan research'],
            relevantExams: ['JoSAA Counselling Rounds', 'State Online Counselling'],
            preparationStrategy: 'Lock choices carefully, placing top NITs, IIITs, GFTIs, and reputable state universities at top.',
            requiredDocuments: ['JEE Rank Card', '12th Marksheet', 'Transfer & Migration Certificate', 'Income Certificate (for fee concession)'],
            nextAction: 'Join college orientation and establish your development environment on day 1.'
          },
          {
            id: 'se-ra-4',
            stepNumber: 4,
            stageName: '04 — Degree Year 1 & 2',
            title: 'Data Structures, Core Languages & Web Fundamentals',
            timeframe: 'B.Tech Years 1 & 2',
            description: 'Build command over C++/Java and master Data Structures & Algorithms. Build your first responsive web applications and maintain an active GitHub profile.',
            whatToStudy: ['Arrays, Linked Lists, Trees, Graphs, Dynamic Programming', 'Object Oriented Programming', 'DBMS & SQL', 'Web Stack (React, Node.js)'],
            importantSubjects: ['Data Structures', 'Discrete Mathematics', 'Computer Architecture'],
            skillsToLearn: ['Git & GitHub', 'LeetCode/Codeforces solving (200+ problems)', 'Clean code architecture'],
            relevantExams: ['Semester Exams (Maintain CGPA > 7.5)'],
            preparationStrategy: 'Dedicate 1 hour daily to DSA problem solving and 1 hour to mini project development.',
            requiredDocuments: ['College ID', 'Semester Grade Cards'],
            nextAction: 'Apply for summer internships and open-source contribution programs (GSoC, Hackathons).'
          },
          {
            id: 'se-ra-5',
            stepNumber: 5,
            stageName: '05 — Degree Year 3 & 4 (Placement)',
            title: 'Internship, Production Projects & Placement Drives',
            timeframe: 'B.Tech Years 3 & 4',
            description: 'Complete a summer software engineering internship. Prepare for on-campus and off-campus tech interviews covering System Design, DSA, and CS fundamentals.',
            whatToStudy: ['Low Level & High Level System Design', 'Operating Systems & Networking', 'Behavioral HR Interview Questions'],
            importantSubjects: ['Distributed Systems', 'Cloud Deployment'],
            skillsToLearn: ['Mock Technical Interviews', 'Docker & Cloud Hosting', 'Resume Crafting'],
            relevantExams: ['Campus Placement Coding Rounds', 'GATE (Optional for PSUs/M.Tech)'],
            preparationStrategy: 'Build 2 full-scale deployed full-stack applications with authentication, databases, and CI/CD pipelines.',
            requiredDocuments: ['Professional Resume', 'Degree Provisional Certificate', 'Internship Certificate'],
            nextAction: 'Accept engineering offer letter or transition to Product Engineer role.'
          }
        ]
      },
      {
        id: 'se-route-b',
        routeName: 'Route B: BCA → MCA Pathway',
        badge: 'High Value / Non-Engineering Alternative',
        description: 'Start with 3-year BCA (open to Science, Commerce, and Arts with Math in some colleges), followed by 2-year MCA through NIMCET.',
        duration: '3 + 2 = 5 Years',
        estimatedInvestment: '₹2.5L - ₹6L (Highly affordable)',
        pros: ['Hands-on programming from Day 1', 'Open to wider streams than just pure PCM', 'NIMCET grants entry to prestigious NITs with identical placement packages'],
        cons: ['Requires 5 years total rather than 4', 'Requires clearing NIMCET for top Tier-1 institutes'],
        steps: [
          {
            id: 'se-rb-1',
            stepNumber: 1,
            stageName: '01 — Class 12 Completion',
            title: 'Pass 10+2 with Mathematics / Computer Application',
            timeframe: 'Class 12',
            description: 'Pass 10+2 with Mathematics or Computer Science. Check college criteria (many BCA programs accept Commerce with Maths or Science).',
            whatToStudy: ['Mathematics basics', 'Logic & Statistics'],
            importantSubjects: ['Mathematics', 'English'],
            skillsToLearn: ['Typing speed', 'Basic programming logic'],
            relevantExams: ['CUET-UG', 'University BCA Entrance Exams'],
            preparationStrategy: 'Maintain > 60% in board exams and prepare for CUET.',
            requiredDocuments: ['12th Marksheet', 'School Leaving Certificate'],
            nextAction: 'Secure admission to reputable BCA college.'
          },
          {
            id: 'se-rb-2',
            stepNumber: 2,
            stageName: '02 — BCA Degree & Development',
            title: 'Practical Software Skills & NIMCET Prep',
            timeframe: 'BCA Years 1–3',
            description: 'Gain hands-on software development experience. In Year 3, focus on Higher Mathematics preparation for NIMCET (NIT MCA entrance).',
            whatToStudy: ['Advanced Mathematics for NIMCET', 'Web & App Development', 'Python / Java', 'Database Management'],
            importantSubjects: ['Calculus', 'Coordinate Geometry', 'Probability', 'DBMS'],
            skillsToLearn: ['Full Stack Web Development', 'SQL', 'Data Structures'],
            relevantExams: ['NIMCET', 'MAH MCA CET', 'State MCA Entrance Exams'],
            preparationStrategy: 'Solve 10 years NIMCET past papers. Focus 60% on Mathematics and 40% on Computer Awareness & Reasoning.',
            requiredDocuments: ['BCA Graduation Degree / Marksheets'],
            nextAction: 'Appear for NIMCET and participate in NIT MCA seat counselling.'
          },
          {
            id: 'se-rb-3',
            stepNumber: 3,
            stageName: '03 — MCA at Top Institute & Placement',
            title: 'Master of Computer Applications & Campus Hiring',
            timeframe: 'MCA Years 1–2',
            description: 'Study 2-year MCA curriculum at NIT Trichy, Surathkal, Allahabad, or state universities. Participate in campus hiring alongside B.Tech students.',
            whatToStudy: ['Enterprise Software Development', 'Cloud Architecture', 'Artificial Intelligence Basics'],
            importantSubjects: ['Design & Analysis of Algorithms', 'Cloud Computing'],
            skillsToLearn: ['Production-grade software testing', 'System design'],
            relevantExams: ['On-campus placement drives (Amazon, Microsoft, TCS, Infosys, Startups)'],
            preparationStrategy: 'Leverage strong 3-year prior BCA coding foundation to outperform in practical rounds.',
            requiredDocuments: ['MCA Degree', 'Portfolio link', 'Resume'],
            nextAction: 'Begin Software Engineer career.'
          }
        ]
      },
      {
        id: 'se-route-c',
        routeName: 'Route C: Polytechnic Diploma → Lateral B.Tech',
        badge: 'Cost-Effective / Skill-First',
        description: 'Complete a 3-year Diploma in Computer Science / IT right after Class 10, then enter 2nd year of B.Tech through Lateral Entry (LEET / CGPET Lateral).',
        duration: '3 Years Diploma + 3 Years B.Tech = 6 Years',
        estimatedInvestment: '₹1.5L - ₹4L',
        pros: ['Direct practical engineering after 10th', 'No 11-12 coaching stress', 'Strong laboratory exposure'],
        cons: ['Takes 1 extra year overall', 'Limited seats in Tier-1 colleges for lateral entry'],
        steps: [
          {
            id: 'se-rc-1',
            stepNumber: 1,
            stageName: '01 — Post Class 10 Polytechnic Exam',
            title: 'Appear for Polytechnic Entrance (PPT)',
            timeframe: 'After Class 10 (Age 15)',
            description: 'Clear state PPT (Polytechnic Entrance Test) and secure Computer Science or IT branch in a Govt Polytechnic.',
            whatToStudy: ['10th Mathematics and Science'],
            importantSubjects: ['Maths', 'Physics', 'Chemistry'],
            skillsToLearn: ['Hands-on computer hardware & lab basics'],
            relevantExams: ['State PPT (e.g. CGPPT)'],
            preparationStrategy: 'Review 9th and 10th science & math syllabus.',
            requiredDocuments: ['10th Certificate', 'Domicile Certificate'],
            nextAction: 'Complete 3-year Diploma with First Class distinction.'
          },
          {
            id: 'se-rc-2',
            stepNumber: 2,
            stageName: '02 — Lateral Entry to B.Tech 2nd Year',
            title: 'Clear LEET and Complete Engineering Degree',
            timeframe: 'Years 4–6',
            description: 'Directly join the 3rd semester (2nd year) of B.Tech CSE in recognized engineering colleges without losing time on general 1st year physics/chemistry.',
            whatToStudy: ['Advanced Engineering Mathematics', 'Algorithms and Operating Systems'],
            importantSubjects: ['Computer Networks', 'Software Engineering'],
            skillsToLearn: ['Competitive coding', 'Modern frameworks'],
            relevantExams: ['State Lateral Entry Entrance Test (CG Lateral Entry)'],
            preparationStrategy: 'Prepare diploma core CS subjects thoroughly.',
            requiredDocuments: ['Diploma Certificate', 'Rank Card'],
            nextAction: 'Graduate with full B.Tech degree and enter software industry.'
          }
        ]
      }
    ]
  },
  {
    id: 'doctor-mbbs',
    name: 'Doctor (MBBS & Specialization)',
    category: 'Healthcare',
    stream: ['Science'],
    overview: 'Diagnose illnesses, prescribe medical treatments, perform surgical interventions, and preserve human life through evidence-based healthcare practice.',
    eligibility: 'Class 12 with Physics, Chemistry, Biology/Biotechnology and English with minimum 50% aggregate (40% for reserved categories).',
    requiredEducation: 'MBBS (5.5 years including 1-year rotatory internship) + MD/MS for specialist practice.',
    subjects: ['Human Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology', 'Forensic Medicine', 'Surgery', 'Medicine'],
    entranceExams: ['NEET-UG (National Eligibility cum Entrance Test)', 'NEET-PG / NExT (for post-graduate MD/MS)'],
    topCourses: ['MBBS (Bachelor of Medicine & Bachelor of Surgery)', 'BDS (Dental)', 'BAMS (Ayurveda)', 'BHMS (Homeopathy)'],
    skills: ['Clinical Diagnosis', 'Patient Empathy', 'Surgical Dexterity', 'Emergency Triage', 'Ethical Decision Making', 'Pharmacology Knowledge'],
    studyDuration: '5.5 Years for MBBS + 3 Years for MD/MS specialization',
    averageStartingSalary: '₹8,00,000 – ₹18,00,000 per annum (increases significantly after MD/MS)',
    jobRoles: ['Medical Officer', 'General Physician', 'Resident Doctor', 'Surgeon', 'Consultant Specialist', 'Hospital Administrator'],
    higherStudies: ['MD (Doctor of Medicine)', 'MS (Master of Surgery)', 'DM / M.Ch (Super-speciality)'],
    preparationStrategy: 'Master NCERT Biology line-by-line. Dedicate daily revision to Physics numericals and Chemistry mechanisms. Take at least 40 full-length timed NEET-UG mock tests.',
    commonMistakes: [
      'Neglecting Physics thinking Biology alone will secure an MBBS seat.',
      'Studying advanced college-level books rather than mastering 100% of NCERT biology.',
      'Underestimating negative marking in NEET-UG.'
    ],
    faqs: [
      {
        question: 'Is NEET compulsory for government as well as private medical colleges?',
        answer: 'Yes, NEET-UG is the single mandatory entrance exam for all medical admissions (AIIMS, JIPMER, Govt, Private & Deemed) across India.'
      },
      {
        question: 'What are alternatives if I do not get MBBS?',
        answer: 'BDS, BAMS, BHMS, B.Sc Nursing, B.Pharm, and Allied Healthcare (Physiotherapy, Radiology, Medical Lab Technology) offer fantastic clinical careers.'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'doc-route-a',
        routeName: 'Route A: NEET-UG → Government MBBS College',
        badge: 'Golden Standard',
        description: 'Clear NEET-UG with high percentile to secure admission in Government Medical Colleges with nominal fee structure.',
        duration: '5.5 Years',
        estimatedInvestment: '₹50,000 - ₹2,00,000 (Govt Medical College total fees)',
        pros: ['Highest patient footfall and clinical exposure', 'Very low tuition fee', 'Prestigious alumni network'],
        cons: ['Extremely competitive cutoff (typically 620+ out of 720 for general category)'],
        steps: [
          {
            id: 'doc-ra-1',
            stepNumber: 1,
            stageName: '01 — Class 10 to 11 Transition',
            title: 'Choose Science (PCB) Stream',
            timeframe: 'Class 10 & 11',
            description: 'Select Physics, Chemistry, Biology and English. Build crystal-clear basics in Cell Biology, Genetics, and General Chemistry.',
            whatToStudy: ['NCERT Class 11 Biology', 'Physical Chemistry basics', 'Mechanics in Physics'],
            importantSubjects: ['Biology (Botany + Zoology)', 'Physics', 'Chemistry'],
            skillsToLearn: ['Diagrammatic memory', 'Flashcard active recall', 'Speed reading'],
            relevantExams: ['Class 10 Boards', 'Olympiads'],
            preparationStrategy: 'Maintain separate notes for plant and animal classification mnemonics.',
            requiredDocuments: ['Class 10 Marksheet', 'Identity Proof'],
            nextAction: 'Begin solving chapter-wise previous 15 years NEET questions.'
          },
          {
            id: 'doc-ra-2',
            stepNumber: 2,
            stageName: '02 — Class 12 & NEET-UG Examination',
            title: 'Master NCERT & Crack NEET-UG',
            timeframe: 'Class 12 (May of Year 12)',
            description: 'Balance 12th Board examinations with NEET-UG preparation. Practice solving 180 questions in 3 hours 20 minutes.',
            whatToStudy: ['Genetics & Evolution', 'Human Physiology', 'Organic Chemistry', 'Modern Physics & Optics'],
            importantSubjects: ['Botany', 'Zoology', 'Chemistry', 'Physics'],
            skillsToLearn: ['Negative marking avoidance', 'OMR bubbling accuracy'],
            relevantExams: ['NEET-UG'],
            preparationStrategy: 'Solve 1 full mock test every Sunday from January to April.',
            requiredDocuments: ['NEET Admit Card', 'Aadhaar Card', 'Passport Photos as per NTA specs'],
            nextAction: 'Attend MCC (Medical Counselling Committee) and State Quota counselling.'
          },
          {
            id: 'doc-ra-3',
            stepNumber: 3,
            stageName: '03 — MBBS Degree & Rotatory Internship',
            title: '4.5 Years Clinical Studies + 1 Year Internship',
            timeframe: 'Age 18 to 24',
            description: 'Complete 3 professional phases of MBBS spanning 19 subjects followed by 12 months compulsory paid hospital rotatory internship.',
            whatToStudy: ['Pre-clinical (Anatomy, Physiology)', 'Para-clinical (Pathology, Pharmacology)', 'Clinical (Medicine, Surgery, OBG, Pediatrics)'],
            importantSubjects: ['Internal Medicine', 'General Surgery', 'Obstetrics & Gynaecology'],
            skillsToLearn: ['History taking', 'Clinical examination', 'Suturing', 'Venipuncture', 'Basic Life Support (BLS)'],
            relevantExams: ['MBBS Professional University Exams', 'NExT Step 1'],
            preparationStrategy: 'Regular bedside clinical postings in hospital wards.',
            requiredDocuments: ['MBBS Degree Certificate', 'State Medical Council Permanent Registration'],
            nextAction: 'Practice as Medical Officer or prepare for NEET-PG/NExT for MD/MS specialization.'
          }
        ]
      }
    ]
  },
  {
    id: 'chartered-accountant',
    name: 'Chartered Accountant (CA)',
    category: 'Commerce & Finance',
    stream: ['Commerce', 'Science', 'Arts'],
    overview: 'Oversee corporate financial reporting, statutory audits, direct and indirect taxation, corporate law advisory, and strategic investment guidance.',
    eligibility: 'Pass 10+2 in any stream (Commerce, Science, or Arts) for Foundation route; or Bachelor degree with 55% (Commerce) / 60% (Other) for Direct Entry.',
    requiredEducation: 'ICAI CA Foundation → CA Intermediate → 2-Year Practical Articleship → CA Final.',
    subjects: ['Accounting', 'Business Laws', 'Taxation (Direct & GST)', 'Cost Management', 'Auditing & Assurance', 'Financial Management', 'Strategic Management'],
    entranceExams: ['CA Foundation (conducted by ICAI)', 'CA Intermediate', 'CA Final'],
    topCourses: ['ICAI CA Program', 'B.Com (Hons) simultaneously', 'CS (Company Secretary)', 'CMA'],
    skills: ['Auditing & Forensic Review', 'Tax Strategy & Compliance', 'Financial Modeling', 'Corporate Governance', 'Risk Assessment'],
    studyDuration: '4.5 to 5 Years',
    averageStartingSalary: '₹8,50,000 – ₹20,00,000 per annum',
    jobRoles: ['Statutory Auditor', 'Tax Consultant', 'Chief Financial Officer (CFO)', 'Investment Banker', 'Forensic Auditor', 'Independent Practitioner'],
    higherStudies: ['CFA (Chartered Financial Analyst)', 'DISA', 'MBA in Finance (IIMs)'],
    preparationStrategy: 'Focus on conceptual depth in accounting principles and tax law provisions. Consistent daily study of 6-8 hours with regular written practice under exam conditions.',
    commonMistakes: [
      'Reading theory without practicing numerical accounting problems on paper.',
      'Treating Articleship casually instead of absorbing real-world client auditing experience.',
      'Neglecting ICAI Study Material in favor of arbitrary private coaching notes.'
    ],
    faqs: [
      {
        question: 'Can a Science student pursue CA after 12th?',
        answer: 'Absolutely! Many of the all-India top CA rank-holders come from Science backgrounds due to their strong analytical and numerical reasoning capabilities.'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'ca-route-a',
        routeName: 'Route A: Foundation Route after Class 12',
        badge: 'Fastest Direct Route',
        description: 'Register with ICAI during Class 12 and appear for CA Foundation examination immediately after 12th board exams.',
        duration: '4.5 Years',
        estimatedInvestment: '₹1.5L - ₹3L (ICAI fee + training)',
        pros: ['Direct progression without waiting for graduation', 'Earn stipend during articleship', 'High prestige qualification'],
        cons: ['Low pass percentage requiring extreme self-discipline and perseverance'],
        steps: [
          {
            id: 'ca-ra-1',
            stepNumber: 1,
            stageName: '01 — CA Foundation Registration',
            title: 'Register with ICAI & Appear in Foundation Exam',
            timeframe: 'Class 12 / Post Boards',
            description: 'Register with ICAI by the deadline. Study 4 papers: Accounting, Business Laws, Quantitative Aptitude, and Business Economics.',
            whatToStudy: ['Financial Accounting', 'Mercantile Laws', 'Business Mathematics & Statistics', 'Micro/Macro Economics'],
            importantSubjects: ['Accounting', 'Business Laws'],
            skillsToLearn: ['Fast manual calculation', 'Legal answer framing'],
            relevantExams: ['ICAI CA Foundation Exam (June / December)'],
            preparationStrategy: 'Complete 100% of ICAI Module illustrations and RTPs (Revision Test Papers).',
            requiredDocuments: ['Class 12 Admit Card/Marksheet', 'ICAI Registration Form'],
            nextAction: 'Score $\\ge 40\\%$ per subject and $\\ge 50\\%$ aggregate to clear Foundation.'
          },
          {
            id: 'ca-ra-2',
            stepNumber: 2,
            stageName: '02 — CA Intermediate & Articleship',
            title: 'Clear Inter (Group 1 & 2) & 2-Year Practical Training',
            timeframe: 'Years 2–3',
            description: 'Clear CA Intermediate 6 subjects. Complete ICITSS computer/soft-skill training and commence 2-year mandatory articleship with a practicing CA firm.',
            whatToStudy: ['Advanced Accounting', 'Corporate and Other Laws', 'Taxation (Income Tax + GST)', 'Cost and Management Accounting', 'Auditing and Ethics'],
            importantSubjects: ['Taxation', 'Auditing'],
            skillsToLearn: ['Tally/SAP', 'Client communication', 'Vouching & Verification', 'ITR & GST filing'],
            relevantExams: ['CA Intermediate Exams', 'ICITSS Assessment'],
            preparationStrategy: 'Balance 35 hours weekly firm articleship with early morning and evening revision.',
            requiredDocuments: ['Foundation Pass Certificate', 'Articleship Deed Form 102/103'],
            nextAction: 'Complete articleship and prepare for CA Final.'
          },
          {
            id: 'ca-ra-3',
            stepNumber: 3,
            stageName: '03 — CA Final & ICAI Membership',
            title: 'Clear CA Final & Receive ACA Credential',
            timeframe: 'Year 4.5',
            description: 'Appear for CA Final examination in the last 6 months of articleship. Clear both groups to be admitted as an Associate Chartered Accountant.',
            whatToStudy: ['Financial Reporting (Ind AS)', 'Strategic Financial Management', 'Advanced Auditing', 'Direct & International Tax Laws', 'Indirect Tax Laws'],
            importantSubjects: ['Ind AS', 'International Taxation'],
            skillsToLearn: ['Executive presentation', 'Cross-border tax planning'],
            relevantExams: ['CA Final Examination'],
            preparationStrategy: 'Solve Mock Test Papers (MTPs) under 3-hour strict time constraint.',
            requiredDocuments: ['Articleship Completion Certificate', 'Final Pass Certificate'],
            nextAction: 'Participate in ICAI Campus Placement or launch independent audit practice.'
          }
        ]
      }
    ]
  },
  {
    id: 'civil-services-ias',
    name: 'Civil Services Officer (IAS / IPS / IFS)',
    category: 'Government & Defence',
    stream: ['Arts', 'Science', 'Commerce', 'General'],
    overview: 'Administer government departments, formulate public policies, implement developmental schemes, maintain law and order, and represent India globally.',
    eligibility: 'Any recognized Bachelor degree in any discipline. Age 21 to 32 years (relaxations for OBC/SC/ST).',
    requiredEducation: 'Graduation in Arts (BA), Science (B.Sc/B.Tech), Commerce (B.Com) or Medicine (MBBS).',
    subjects: ['Indian Polity & Constitution', 'Modern & Ancient History', 'Geography', 'Economics & Public Finance', 'Ethics & Integrity', 'Environment & Science', 'Current Affairs'],
    entranceExams: ['UPSC Civil Services Examination (CSE)', 'State Public Service Commission Exams (CGPSC, UPPSC, MPPSC)'],
    topCourses: ['BA in Political Science / History', 'B.Tech', 'B.Sc Economics', 'LLB'],
    skills: ['Policy Formulation', 'Public Administration', 'Crisis Leadership', 'Analytical Essay Writing', 'Interpersonal Diplomacy'],
    studyDuration: 'Graduation (3-4 years) + 1-2 years dedicated preparation',
    averageStartingSalary: '₹75,000 – ₹1,50,000 per month + Government Accommodation & Perquisites',
    jobRoles: ['Sub-Divisional Magistrate (SDM)', 'District Magistrate / Collector', 'Superintendent of Police (IPS)', 'Diplomat / Ambassador (IFS)', 'Cabinet Secretary'],
    higherStudies: ['Master in Public Policy (LKY, Harvard Kennedy, Oxford)', 'PhD in Governance'],
    preparationStrategy: 'Read standard newspapers (The Hindu / Indian Express) daily. Master NCERT textbooks Class 6-12 for foundational subjects. Practice answer writing daily for Mains GS papers.',
    commonMistakes: [
      'Collecting excessive books without revising 1-2 standard references repeatedly.',
      'Postponing Mains answer-writing practice until after Prelims result.',
      'Selecting an Optional subject based on trends rather than personal interest and syllabus overlap.'
    ],
    faqs: [
      {
        question: 'Does my graduation degree subject matter for UPSC?',
        answer: 'Not in eligibility. Engineers, Doctors, BA and B.Com graduates compete on equal footing in General Studies.'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'upsc-route-a',
        routeName: 'Route A: Direct Graduation + UPSC CSE',
        badge: 'Most Direct Path',
        description: 'Prepare systematically during the final two years of graduation to appear in UPSC immediately upon turning 21.',
        duration: 'Graduation (3-4 Yrs) + 1 Year Exam Cycle',
        estimatedInvestment: '₹30,000 - ₹1.5L (Self-study + Test series)',
        pros: ['Direct highest-ranking public executive authority in the country', 'Immense public impact', 'Job security & prestige'],
        cons: ['Low selection ratio (less than 0.1%) requiring a backup career plan'],
        steps: [
          {
            id: 'upsc-s1',
            stepNumber: 1,
            stageName: '01 — Foundational Graduation Years',
            title: 'Complete Degree with High Intellectual Curiosity',
            timeframe: 'College Years 1 & 2 (Age 18-20)',
            description: 'Focus on college degree while systematically reading Class 6-12 NCERTs in History, Geography, Polity, and Economics.',
            whatToStudy: ['Indian Constitution', 'Freedom Struggle', 'Physical Geography', 'Macroeconomics'],
            importantSubjects: ['General Studies', 'Daily Newspaper Analysis'],
            skillsToLearn: ['Summary writing', 'Critical analysis of national issues'],
            relevantExams: ['University Semester Exams'],
            preparationStrategy: 'Read The Hindu editorial page daily and maintain thematic digital notes.',
            requiredDocuments: ['College Enrolment Card'],
            nextAction: 'Choose and finalize your UPSC Optional Subject.'
          },
          {
            id: 'upsc-s2',
            stepNumber: 2,
            stageName: '02 — Prelims & Mains Preparation',
            title: 'Prelims Mock Tests & Answer Writing',
            timeframe: 'Final Year & Age 21',
            description: 'Appear for UPSC Prelims (GS Paper 1 + CSAT). If qualified, sit for the 9 subjective papers of UPSC Mains written examination.',
            whatToStudy: ['GS Papers 1, 2, 3, 4', 'Essay Paper', 'Optional Subject Papers 1 & 2', 'CSAT Aptitude'],
            importantSubjects: ['Ethics, Integrity & Aptitude', 'Governance'],
            skillsToLearn: ['Structured 150-word & 250-word answer drafting within 7 minutes'],
            relevantExams: ['UPSC CSE Prelims', 'UPSC CSE Mains'],
            preparationStrategy: 'Write at least 25 Mains full-length papers with peer and mentor feedback.',
            requiredDocuments: ['Degree Certificate', 'UPSC DAF (Detailed Application Form)'],
            nextAction: 'Attend Personality Test (Interview) at Dholpur House, New Delhi.'
          },
          {
            id: 'upsc-s3',
            stepNumber: 3,
            stageName: '03 — LBSNAA Academy & Service Allocation',
            title: 'Training at LBSNAA Mussoorie & Cadre Posting',
            timeframe: 'Post Selection',
            description: 'Foundation course at Lal Bahadur Shastri National Academy of Administration followed by district training as Assistant Collector / ASP.',
            whatToStudy: ['Law & Land Revenue Code', 'District Administration', 'Firearms & Horse Riding (for IPS)'],
            importantSubjects: ['Administrative Law', 'Public Finance'],
            skillsToLearn: ['Public grievance handling', 'Disaster management'],
            relevantExams: ['UPSC Final Merit List'],
            preparationStrategy: 'Service allotment based on all-India rank and category preference.',
            requiredDocuments: ['Medical Fitness Report', 'Attestation Forms'],
            nextAction: 'Assume responsibility as civil servant.'
          }
        ]
      }
    ]
  },
  {
    id: 'lawyer-advocate',
    name: 'Corporate Lawyer / Judicial Magistrate',
    category: 'Law & Humanities',
    stream: ['Arts', 'Commerce', 'Science', 'General'],
    overview: 'Advise corporations on mergers & compliance, litigate criminal/civil cases in courts, draft international contracts, or serve as a judicial magistrate.',
    eligibility: '10+2 with minimum 45% aggregate in any stream for 5-Year Integrated LLB; or Graduation for 3-Year LLB.',
    requiredEducation: 'BA LLB / BBA LLB (5 Years) or LLB (3 Years) followed by All India Bar Examination (AIBE).',
    subjects: ['Constitutional Law', 'Contract Law', 'Criminal Law (IPC/BNS)', 'Corporate Law', 'Intellectual Property Rights', 'International Law'],
    entranceExams: ['CLAT (Common Law Admission Test)', 'AILET (NLU Delhi)', 'SLAT', 'State Law CETs'],
    topCourses: ['BA LLB (Hons)', 'BBA LLB (Hons)', 'B.Com LLB', 'LLM'],
    skills: ['Legal Research & Drafting', 'Cross-Examination', 'Moot Court Advocacy', 'Contract Negotiation', 'Statutory Interpretation'],
    studyDuration: '5 Years (Integrated) or 3 Years (Post-Graduation)',
    averageStartingSalary: '₹6,00,000 – ₹16,00,000 per annum (higher in Tier-1 Law Firms like CAM/SAM/AZB)',
    jobRoles: ['Corporate Associate', 'Litigation Advocate', 'In-House Legal Counsel', 'Judicial Magistrate (Civil Judge)', 'Legal Journalist'],
    higherStudies: ['LLM (Master of Laws)', 'Judicial Services Examination', 'Civil Judge Exam'],
    preparationStrategy: 'Read extensively to build reading speed for 120-question comprehension-based CLAT. Practice critical reasoning, legal deductions, and English vocabulary.',
    commonMistakes: [
      'Memorizing IPC sections instead of learning comprehension and application of legal principles for CLAT.',
      'Neglecting internships during 5-year law school.',
      'Overlooking moot court competitions.'
    ],
    faqs: [
      {
        question: 'Do I need Science or Commerce for law?',
        answer: 'Any stream is eligible. Humanities, Commerce, and Science students all succeed in CLAT and National Law Universities (NLUs).'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'law-route-a',
        routeName: 'Route A: 5-Year Integrated Law via CLAT (NLUs)',
        badge: 'Premier Route',
        description: 'Direct entry into prestigious National Law Universities (NLSIU Bangalore, NALSAR, etc.) straight after Class 12.',
        duration: '5 Years',
        estimatedInvestment: '₹8L - ₹15L (NLU subsidized to self-financed)',
        pros: ['Direct campus placement in top corporate law firms', 'High global recognition for LLM abroad', 'Vibrant mooting and research culture'],
        cons: ['Rigorous CLAT competition with speed-comprehension testing'],
        steps: [
          {
            id: 'law-s1',
            stepNumber: 1,
            stageName: '01 — Class 12 & CLAT Exam',
            title: 'Prepare Reading Comprehension & Legal Reasoning',
            timeframe: 'Class 11 & 12',
            description: 'Appear for CLAT in December of Class 12. Focus on Reading Speed, Current Legal Affairs, and Critical Reasoning.',
            whatToStudy: ['English Comprehension', 'Current Affairs & GK', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
            importantSubjects: ['English', 'Legal Principles'],
            skillsToLearn: ['Reading 300 words/minute', 'Fallacy identification'],
            relevantExams: ['CLAT-UG', 'AILET'],
            preparationStrategy: 'Solve 40 full-length timed CLAT mock tests.',
            requiredDocuments: ['10th & 12th Marksheets', 'Category Certificate'],
            nextAction: 'Participate in Consortium of NLUs counselling.'
          },
          {
            id: 'law-s2',
            stepNumber: 2,
            stageName: '02 — 5-Year Law School & Internships',
            title: 'Court & Firm Internships with Moot Courts',
            timeframe: 'Years 1 to 5',
            description: 'Undertake mandatory winter and summer internships with Trial Courts, High Court Advocates, NGOs, and Corporate Law Firms.',
            whatToStudy: ['Company Law', 'Arbitration', 'Constitutional Law', 'M&A Due Diligence'],
            importantSubjects: ['Civil Procedure Code', 'Corporate Jurisprudence'],
            skillsToLearn: ['Legal drafting', 'SCC Online / Manupatra search', 'Contract review'],
            relevantExams: ['Bar Council AIBE (All India Bar Exam)'],
            preparationStrategy: 'Participate in national and international moot court competitions.',
            requiredDocuments: ['Provisional Law Degree', 'Internship Certificates'],
            nextAction: 'Enrol with State Bar Council and join firm or litigation practice.'
          }
        ]
      }
    ]
  },
  {
    id: 'data-scientist-ai',
    name: 'Data Scientist & AI/ML Engineer',
    category: 'Science & Tech',
    stream: ['Science'],
    overview: 'Develop artificial intelligence models, machine learning pipelines, predictive analytics engines, and neural networks to extract insights and automate intelligence.',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/CS; graduation in Engineering, Mathematics, Statistics, or Computer Science.',
    requiredEducation: 'B.Tech CSE/Data Science/AI, or B.Sc in Statistics/Mathematics followed by M.Sc / MCA / M.Tech.',
    subjects: ['Linear Algebra', 'Multivariate Calculus', 'Probability & Statistics', 'Machine Learning', 'Deep Learning', 'Natural Language Processing (NLP)', 'Python / R'],
    entranceExams: ['JEE Main', 'GATE (CS/DA)', 'IIT JAM (for M.Sc in Math/Stats)', 'CUET-PG'],
    topCourses: ['B.Tech in Artificial Intelligence & Data Science', 'B.Sc Data Science', 'M.Tech AI', 'M.Sc Data Science'],
    skills: ['Python / PyTorch / TensorFlow', 'Pandas & NumPy', 'SQL & Vector Databases', 'LLM Fine-tuning & Prompt Engineering', 'Statistical Hypothesis Testing'],
    studyDuration: '4 Years (B.Tech) or 3+2 Years (B.Sc + M.Sc)',
    averageStartingSalary: '₹8,00,000 – ₹22,00,000 per annum',
    jobRoles: ['Machine Learning Engineer', 'Data Scientist', 'AI Research Assistant', 'Computer Vision Specialist', 'Business Intelligence Analyst'],
    higherStudies: ['MS in AI (USA/Europe)', 'PhD in Machine Learning', 'M.Tech in Data Analytics'],
    preparationStrategy: 'Master university-level statistics, probability distributions, and vector algebra. Build real machine learning models on Kaggle datasets and deploy them as live web APIs.',
    commonMistakes: [
      'Using machine learning libraries like scikit-learn without understanding the mathematical assumptions behind algorithms.',
      'Neglecting SQL and data cleaning which consumes 70% of real-world data science time.'
    ],
    faqs: [
      {
        question: 'Is heavy mathematics required for AI & Data Science?',
        answer: 'Yes. Linear Algebra, Matrix operations, Calculus, and Probability form the mathematical foundation of Neural Networks and Optimization.'
      }
    ],
    isFeatured: true,
    routes: [
      {
        id: 'ds-route-a',
        routeName: 'Route A: B.Tech in CSE / AI & Data Science',
        badge: 'Industry Standard',
        description: '4-year engineering program with specialized electives in Artificial Intelligence, Deep Learning, and Cloud ML operations.',
        duration: '4 Years',
        estimatedInvestment: '₹4L - ₹12L',
        pros: ['Direct industry placement into AI teams', 'Access to high-compute GPU labs', 'Holistic CS engineering base'],
        cons: ['Continuous rapid technology evolution requiring weekly self-learning'],
        steps: [
          {
            id: 'ds-s1',
            stepNumber: 1,
            stageName: '01 — Mathematics & High School Science',
            title: 'Master Calculus, Vectors & Matrices',
            timeframe: 'Class 11 & 12',
            description: 'Excel in Mathematics with deep intuition for probability, matrix transformations, and derivatives.',
            whatToStudy: ['Calculus', 'Matrices & Determinants', 'Probability Distributions'],
            importantSubjects: ['Mathematics', 'Computer Science'],
            skillsToLearn: ['Python syntax', 'Analytical thinking'],
            relevantExams: ['JEE Main', 'State CETs'],
            preparationStrategy: 'Understand geometric representations of mathematical equations.',
            requiredDocuments: ['10th & 12th Board Certificates'],
            nextAction: 'Enrol in B.Tech Computer Science or AI specialization.'
          },
          {
            id: 'ds-s2',
            stepNumber: 2,
            stageName: '02 — Engineering & Kaggle Projects',
            title: 'Model Training, Deep Learning & Internships',
            timeframe: 'College Years 2–4',
            description: 'Participate in Kaggle competitions, build end-to-end ML pipelines with FastAPI, and deploy machine learning models on cloud platforms.',
            whatToStudy: ['Regression, Decision Trees, XGBoost', 'Transformers, CNNs, RNNs', 'MLOps (Docker, MLflow)'],
            importantSubjects: ['Machine Learning', 'Big Data Systems'],
            skillsToLearn: ['PyTorch', 'Data Visualization', 'Model Evaluation Metrics'],
            relevantExams: ['Campus Placements', 'GATE Data Science & AI (DA)'],
            preparationStrategy: 'Publish 3 portfolio projects on HuggingFace and GitHub with live demo links.',
            requiredDocuments: ['Degree Certificate', 'Portfolio Link'],
            nextAction: 'Join tech unicorn or enterprise AI lab as Data Scientist.'
          }
        ]
      }
    ]
  },
  {
    id: 'commercial-pilot',
    name: 'Commercial Pilot (Aviation)',
    category: 'Science & Tech',
    stream: ['Science'],
    overview: 'Operate passenger, cargo, and corporate aircraft across domestic and international routes, ensuring flight safety, navigational accuracy, and passenger comfort.',
    eligibility: '10+2 with Physics and Mathematics (minimum 50% aggregate). Class 2 and Class 1 DGCA Medical clearance.',
    requiredEducation: 'DGCA Commercial Pilot License (CPL) training with 200 flying hours + Type Rating (Airbus A320 / Boeing 737).',
    subjects: ['Air Navigation', 'Aviation Meteorology', 'Air Regulations', 'Technical General (Aircraft Systems)', 'Technical Specific', 'Radio Telephony (RTR)'],
    entranceExams: ['IGRUA Entrance Exam', 'Airline Cadet Pilot Selection Programs (IndiGo, Air India)'],
    topCourses: ['CPL Ground Classes', 'B.Sc in Aviation (Optional)', 'Flying School Training (India or Abroad)'],
    skills: ['Situational Awareness', 'Cockpit Resource Management', 'Instrument Flying', 'Emergency Calmness', 'Spatial Navigation'],
    studyDuration: '1.5 to 2.5 Years',
    averageStartingSalary: '₹18,00,000 – ₹35,00,000 per annum (First Officer)',
    jobRoles: ['Junior First Officer', 'First Officer', 'Captain / Commander', 'Flight Instructor', 'Chief Pilot'],
    higherStudies: ['ATPL (Airline Transport Pilot License)', 'Type Rating Examiner / Instructor'],
    preparationStrategy: 'Clear DGCA theory examinations first. Maintain immaculate physical health, 6/6 eye vision (with or without corrective lenses as per DGCA norms).',
    commonMistakes: [
      'Starting expensive flying hours before securing Class 1 DGCA Medical fitness certificate.',
      'Underestimating ground theory study in Aviation Meteorology and Navigation.'
    ],
    faqs: [
      {
        question: 'What is the approximate cost of getting a Commercial Pilot License?',
        answer: 'Training in India or abroad costs approximately ₹35 Lakhs to ₹55 Lakhs for 200 flying hours, plus ₹15-20 Lakhs for Type Rating.'
      }
    ],
    isFeatured: false,
    routes: [
      {
        id: 'pilot-route-a',
        routeName: 'Route A: Airline Cadet Pilot Program',
        badge: 'Guaranteed Job Letter',
        description: 'Join airline-partnered cadet programs (e.g. IndiGo Cadet Pilot Program) with structured selection from day one.',
        duration: '18–24 Months',
        estimatedInvestment: '₹60L - ₹85L (Financed via specialized aviation education loans)',
        pros: ['Letter of Intent (job assurance) prior to training commencement', 'Integrated Type Rating', 'Fastest airline cockpit entry'],
        cons: ['High capital investment'],
        steps: [
          {
            id: 'pilot-s1',
            stepNumber: 1,
            stageName: '01 — 10+2 Physics & Maths & DGCA Medical',
            title: 'Clear Class 2 & Class 1 Medical Fitness',
            timeframe: 'Age 17-18',
            description: 'Obtain medical fitness approval from DGCA-approved medical examiners.',
            whatToStudy: ['Physics & Maths 10+2 revision', 'Pilot Aptitude Tests (ADAPT / COMPASS)'],
            importantSubjects: ['Physics', 'Mathematics', 'English'],
            skillsToLearn: ['Multitasking', 'Hand-eye-foot coordination'],
            relevantExams: ['Cadet Pilot Screening', 'Wombat Psychometric Tests'],
            preparationStrategy: 'Practice joystick simulator coordination and numerical aptitude.',
            requiredDocuments: ['DGCA Class 1 Medical Certificate', 'Passport'],
            nextAction: 'Sign training agreement and commence ground school.'
          },
          {
            id: 'pilot-s2',
            stepNumber: 2,
            stageName: '02 — Flying Hours & DGCA CPL',
            title: 'Complete 200 Flight Hours & Type Rating',
            timeframe: 'Months 6 to 24',
            description: 'Fly single-engine and multi-engine aircraft, log night and cross-country hours, and complete simulator type rating on A320 / B737.',
            whatToStudy: ['Aircraft Systems', 'Standard Operating Procedures (SOPs)'],
            importantSubjects: ['Radio Telephony', 'Aviation Regulations'],
            skillsToLearn: ['Instrument approach', 'Emergency checklists'],
            relevantExams: ['DGCA CPL Flight Checkrides'],
            preparationStrategy: 'Thorough chair flying and checklist memorization.',
            requiredDocuments: ['Logbook signed by Chief Flying Instructor', 'CPL License'],
            nextAction: 'Join commercial airline as Junior First Officer.'
          }
        ]
      }
    ]
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX & Digital Product Designer',
    category: 'Design & Creative',
    stream: ['Arts', 'Science', 'Commerce', 'General'],
    overview: 'Design intuitive interfaces, interactive user journeys, visual design systems, and delightful digital user experiences for modern mobile and web applications.',
    eligibility: '10+2 in any stream (Science, Commerce, or Arts) with creative aptitude.',
    requiredEducation: 'B.Des (Bachelor of Design) or Bachelor in Computer Science / Fine Arts / Self-Taught with exceptional portfolio.',
    subjects: ['Human-Computer Interaction (HCI)', 'Typography & Visual Hierarchy', 'User Research & Persona Mapping', 'Wireframing & Prototyping', 'Design Systems'],
    entranceExams: ['UCEED (IIT Bombay)', 'NID DAT (National Institute of Design)', 'NIFT', 'Private Design CETs'],
    topCourses: ['B.Des in Interaction Design', 'B.Des in Product Design', 'B.Sc in Multimedia & Animation'],
    skills: ['Figma & Prototyping', 'Design Systems (Tokens, Auto-layout)', 'Information Architecture', 'Usability Testing', 'Frontend Basics (HTML/CSS)'],
    studyDuration: '4 Years (B.Des) or 1-2 Years (Self-Taught Portfolio)',
    averageStartingSalary: '₹5,50,000 – ₹15,00,000 per annum',
    jobRoles: ['UI Designer', 'UX Researcher', 'Product Designer', 'Design Systems Engineer', 'Interaction Designer'],
    higherStudies: ['M.Des (IDC IIT Bombay, NID)', 'Master in Human-Computer Interaction (HCI)'],
    preparationStrategy: 'Observe daily digital products. Cultivate design taste and sketch visual solutions. Build an online case study portfolio showcasing user research, wireframes, and high-fidelity Figma prototypes.',
    commonMistakes: [
      'Creating pretty mockups without explaining the user problem or design rationale.',
      'Relying solely on Behance screenshots instead of interactive, clickable prototypes.'
    ],
    faqs: [
      {
        question: 'Can someone without drawing or sketching skills become a UX Designer?',
        answer: 'Yes! UI/UX design is rooted in psychology, information architecture, logic, and component modularity rather than traditional fine art drawing.'
      }
    ],
    isFeatured: false,
    routes: [
      {
        id: 'des-route-a',
        routeName: 'Route A: B.Des via UCEED (IITs) or NID',
        badge: 'Premier Design Institutes',
        description: 'Crack UCEED for IIT Bombay, IIT Delhi, IIT Guwahati, or NID DAT for National Institute of Design.',
        duration: '4 Years',
        estimatedInvestment: '₹4L - ₹10L',
        pros: ['World-class design studios and mentorship', 'High-paying campus offers from global tech companies', 'Multidisciplinary research'],
        cons: ['Selective entrance test with creative observation tasks'],
        steps: [
          {
            id: 'des-s1',
            stepNumber: 1,
            stageName: '01 — Visual Observation & UCEED Exam',
            title: 'Creative Aptitude & Spatial Reasoning',
            timeframe: 'Class 12',
            description: 'Prepare for UCEED / NID DAT testing visual perception, perspective drawing, and problem identification.',
            whatToStudy: ['Perspective drawing', 'Design principles', 'Spatial visualization', 'General awareness'],
            importantSubjects: ['Design Thinking', 'Visual Arts'],
            skillsToLearn: ['Rapid ideation sketching', 'Storyboarding'],
            relevantExams: ['UCEED', 'NID DAT'],
            preparationStrategy: 'Practice previous 10 years papers and sketch daily everyday objects in 1-point and 2-point perspective.',
            requiredDocuments: ['12th Marksheet', 'Admit Card'],
            nextAction: 'Join B.Des degree program.'
          },
          {
            id: 'des-s2',
            stepNumber: 2,
            stageName: '02 — Design School & Live Case Studies',
            title: 'Master Figma, Usability Testing & Design Systems',
            timeframe: 'Years 2 to 4',
            description: 'Build 3 comprehensive end-to-end design case studies covering discovery, user interviews, wireframes, component design, and micro-interactions.',
            whatToStudy: ['Cognitive ergonomics', 'Micro-interactions', 'Accessibility (WCAG)'],
            importantSubjects: ['Interface Architecture', 'User Psychology'],
            skillsToLearn: ['Figma variables', 'User testing interviews', 'Design critique'],
            relevantExams: ['Portfolio Reviews'],
            preparationStrategy: 'Publish case studies on personal portfolio website with live Figma prototypes.',
            requiredDocuments: ['Design Portfolio', 'Resume'],
            nextAction: 'Join product startup or design consultancy as Product Designer.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech Computer Science & Engineering',
    fullName: 'Bachelor of Technology in Computer Science & Engineering',
    level: 'Undergraduate',
    stream: 'Science',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/CS with min 60% aggregate.',
    coreSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Theory of Computation', 'Artificial Intelligence'],
    topExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CETs (CGPET, WBJEE)'],
    careerOptions: ['Software Engineer', 'Cloud Architect', 'Cybersecurity Analyst', 'Product Engineer'],
    higherStudies: ['M.Tech', 'MS in Computer Science', 'MBA in Tech Management'],
    skillsDeveloped: ['Coding in C++/Java/Python', 'System Architecture', 'Algorithmic Problem Solving', 'Database Design'],
    type: 'Both',
    approxAnnualFee: '₹40,000 (Govt NIT/IIT) to ₹2,50,000 (Private Universities)',
    overview: 'The gold standard undergraduate engineering degree for entering the global technology and software industries.'
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Applications)',
    fullName: 'Bachelor of Computer Applications',
    level: 'Undergraduate',
    stream: 'General',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in any stream (Science, Commerce, or Arts) with Mathematics/Computer Application in most universities with min 50%.',
    coreSubjects: ['Programming in C & C++', 'Web Technologies (HTML/CSS/JS)', 'Database Management (SQL)', 'Software Engineering', 'Mobile App Development'],
    topExams: ['CUET-UG', 'IPU CET', 'University Entrance Exams'],
    careerOptions: ['Web Developer', 'Junior Software Developer', 'Database Administrator', 'QA Engineer'],
    higherStudies: ['MCA (Master of Computer Applications)', 'M.Sc IT', 'MBA'],
    skillsDeveloped: ['Application Development', 'Database Querying', 'Frontend & Backend Basics'],
    type: 'Both',
    approxAnnualFee: '₹30,000 to ₹1,20,000',
    overview: 'Practical, software-oriented 3-year bachelor degree providing immediate industry coding skills without intensive physics/chemistry coursework.'
  },
  {
    id: 'mca',
    name: 'MCA (Master of Computer Applications)',
    fullName: 'Master of Computer Applications',
    level: 'Postgraduate',
    stream: 'General',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Passed BCA / B.Sc CS / B.Sc IT or any degree with Mathematics at 10+2 level or Graduation level with min 50%.',
    coreSubjects: ['Advanced Algorithms', 'Cloud Computing', 'Machine Learning', 'Network Security', 'Enterprise Java / Node.js'],
    topExams: ['NIMCET (for NITs)', 'MAH MCA CET', 'CUET-PG', 'State MCA CETs'],
    careerOptions: ['Software Architect', 'Senior Software Engineer', 'DevOps Engineer', 'Technical Lead'],
    higherStudies: ['PhD in Computer Science', 'Executive MBA'],
    skillsDeveloped: ['Enterprise Architecture', 'Cloud Deployment', 'Advanced Problem Solving'],
    type: 'Both',
    approxAnnualFee: '₹50,000 (Govt NITs) to ₹1,80,000 (Private Institutes)',
    overview: 'Premier 2-year postgraduate program that elevates BCA/B.Sc graduates to equivalent compensation and hiring parity with B.Tech CSE graduates.'
  },
  {
    id: 'mbbs',
    name: 'MBBS (Medicine & Surgery)',
    fullName: 'Bachelor of Medicine and Bachelor of Surgery',
    level: 'Undergraduate',
    stream: 'Science',
    duration: '5.5 Years (4.5 Years Academics + 1 Year Internship)',
    eligibility: '10+2 with Physics, Chemistry, Biology and English with min 50% marks; qualified NEET-UG.',
    coreSubjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Forensic Medicine', 'Ophthalmology', 'ENT', 'General Medicine', 'General Surgery', 'Pediatrics'],
    topExams: ['NEET-UG'],
    careerOptions: ['Medical Officer', 'General Physician', 'Resident Doctor', 'Clinical Researcher'],
    higherStudies: ['MD (Doctor of Medicine)', 'MS (Master of Surgery)', 'DNB'],
    skillsDeveloped: ['Clinical Diagnosis', 'Patient Management', 'Surgical Procedures', 'Emergency Response'],
    type: 'Both',
    approxAnnualFee: '₹15,000 - ₹80,000 (Govt Medical Colleges); ₹8L - ₹20L (Private Medical Colleges)',
    overview: 'The primary medical qualification required to practice modern medicine and healthcare in India.'
  },
  {
    id: 'bcom-hons',
    name: 'B.Com (Honours)',
    fullName: 'Bachelor of Commerce (Honours)',
    level: 'Undergraduate',
    stream: 'Commerce',
    duration: '3 Years (or 4 Years under NEP 2020)',
    eligibility: '10+2 with Commerce or Mathematics with min 50% aggregate.',
    coreSubjects: ['Financial Accounting', 'Corporate Accounting', 'Business Law', 'Direct & Indirect Taxes', 'Auditing', 'Financial Management'],
    topExams: ['CUET-UG (Delhi University, BHU, etc.)', 'Christ University Entrance', 'NMIMS NPAT'],
    careerOptions: ['Financial Analyst', 'Accountant', 'Tax Associate', 'Audit Assistant'],
    higherStudies: ['CA', 'CS', 'CMA', 'M.Com', 'MBA in Finance'],
    skillsDeveloped: ['Balance sheet preparation', 'Financial ratio analysis', 'Tax computations', 'Corporate regulatory compliance'],
    type: 'Both',
    approxAnnualFee: '₹15,000 to ₹1,50,000',
    overview: 'A rigorous foundation in finance, corporate governance, auditing, and modern business operations.'
  },
  {
    id: 'ba-llb',
    name: 'BA LLB (Integrated Law)',
    fullName: 'Bachelor of Arts & Bachelor of Legislative Law (Integrated)',
    level: 'Undergraduate',
    stream: 'General',
    duration: '5 Years (10 Semesters)',
    eligibility: '10+2 in any discipline with min 45% aggregate; qualified CLAT or university law entrance.',
    coreSubjects: ['Political Science', 'Sociology', 'Constitutional Law', 'Law of Torts', 'Law of Crimes', 'Jurisprudence', 'Corporate Law', 'Cyber Law'],
    topExams: ['CLAT', 'AILET', 'SLAT', 'LSAT India'],
    careerOptions: ['Corporate Lawyer', 'Advocate in High Court/Supreme Court', 'Legal Advisor', 'Civil Judge'],
    higherStudies: ['LLM', 'Judicial Services Examination', 'Civil Services'],
    skillsDeveloped: ['Legal drafting', 'Moot court argumentation', 'Case law research', 'Cross-examination techniques'],
    type: 'Both',
    approxAnnualFee: '₹1,50,000 to ₹3,00,000 (NLUs)',
    overview: 'Integrated 5-year law degree combining humanities foundation with rigorous legal scholarship and practical courtroom internships.'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    category: 'Engineering',
    eligibility: 'Passed Class 12 with Physics, Mathematics, and Chemistry/Tech subject. No age limit.',
    applicationPeriod: 'Session 1: Nov-Dec | Session 2: Feb-March (Demo Calendar)',
    examPattern: 'Computer Based Test (CBT), 90 questions (attempt 75), 300 total marks. +4 for correct, -1 for negative.',
    subjects: ['Physics (100 Marks)', 'Chemistry (100 Marks)', 'Mathematics (100 Marks)'],
    preparationStrategy: 'Strict adherence to NCERT textbooks for Chemistry; HC Verma and DC Pandey for Physics; Cengage or RD Sharma for Mathematics. Daily timed mock tests.',
    requiredDocuments: ['Class 10 Marksheet', 'Class 12 Marksheet/Admit Card', 'Category/EWS Certificate', 'Aadhaar Card'],
    admissionScope: 'NITs, IIITs, CFTIs, Top State Engineering Colleges & qualifier for JEE Advanced (IITs)',
    officialWebsite: 'https://jeemain.nta.nic.in',
    frequency: 'Conducted Twice a Year',
    isDemoData: true
  },
  {
    id: 'neet-ug',
    name: 'NEET-UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    category: 'Medical',
    eligibility: 'Passed 10+2 with Physics, Chemistry, Biology/Biotech with min 50% (40% for reserved). Minimum age 17 years.',
    applicationPeriod: 'February to March (Demo Calendar)',
    examPattern: 'Pen and Paper (OMR) format, 200 questions (attempt 180), 720 total marks. Duration: 3 hours 20 minutes.',
    subjects: ['Biology (Botany + Zoology: 360 Marks)', 'Chemistry (180 Marks)', 'Physics (180 Marks)'],
    preparationStrategy: 'Read NCERT Biology 15+ times line by line. Practice 5,000+ numericals for Physics & Chemistry. Take 30+ Sunday full-length timed tests.',
    requiredDocuments: ['Passport photo with white background and name/date', 'Postcard size photo', 'Left and right hand fingers and thumb impression', 'Aadhaar Card'],
    admissionScope: 'MBBS, BDS, BAMS, BHMS, BUMS, B.Sc Nursing across all medical colleges in India including AIIMS & JIPMER',
    officialWebsite: 'https://neet.nta.nic.in',
    frequency: 'Once a Year (Typically May)',
    isDemoData: true
  },
  {
    id: 'nimcet',
    name: 'NIMCET',
    fullName: 'NIT MCA Common Entrance Test',
    category: 'Engineering',
    eligibility: 'BCA / B.Sc CS / B.Sc with Mathematics/Statistics with min 60% aggregate (55% for SC/ST).',
    applicationPeriod: 'March to April (Demo Calendar)',
    examPattern: 'Computer Based Test (CBT), 120 questions, 1000 total marks. Mathematics carries 600 marks (50 questions × 12 marks).',
    subjects: ['Mathematics (50 questions)', 'Analytical Ability & Logical Reasoning (40 questions)', 'Computer Awareness (20 questions)', 'General English (10 questions)'],
    preparationStrategy: 'Heavy focus on 11th and 12th standard Mathematics (Calculus, Coordinate Geometry, Trigonometry, Vectors). Solve past 15 years NIMCET question papers.',
    requiredDocuments: ['Graduation Marksheets', 'Category Certificate', 'Aadhaar Card'],
    admissionScope: 'Direct admission to MCA programs at top NITs (Trichy, Surathkal, Allahabad, Warangal, Kurukshetra, Raipur, etc.)',
    officialWebsite: 'https://nimcet.in',
    frequency: 'Once a Year (Typically June)',
    isDemoData: true
  },
  {
    id: 'clat',
    name: 'CLAT-UG',
    fullName: 'Common Law Admission Test',
    category: 'Law',
    eligibility: 'Class 12 in any stream with min 45% marks (40% for SC/ST). No upper age limit.',
    applicationPeriod: 'July to October (Exam held in December) (Demo Calendar)',
    examPattern: 'Offline Pen & Paper test, 120 questions, 120 marks. Duration: 2 hours. Negative marking: 0.25. Comprehension-based passages followed by objective MCQs.',
    subjects: ['English Language', 'Current Affairs & General Knowledge', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    preparationStrategy: 'Develop rapid reading speed of 300+ words per minute. Read quality editorials and monthly legal review digests. Practice timed passage analysis.',
    requiredDocuments: ['10th and 12th Marksheets', 'Caste/Domicile Certificate', 'Passport Photograph'],
    admissionScope: '24 National Law Universities (NLUs) across India for 5-Year Integrated BA/BBA LLB programs',
    officialWebsite: 'https://consortiumofnlus.ac.in',
    frequency: 'Once a Year (December)',
    isDemoData: true
  },
  {
    id: 'cuet-ug',
    name: 'CUET-UG',
    fullName: 'Common University Entrance Test (Undergraduate)',
    category: 'University',
    eligibility: 'Passed Class 12 in relevant stream. Subject choices based on desired university course criteria.',
    applicationPeriod: 'February to March (Demo Calendar)',
    examPattern: 'Hybrid (CBT / Pen & Paper), multiple choice questions based strictly on Class 12 NCERT syllabus.',
    subjects: ['Section 1A & 1B: Languages', 'Section 2: Domain Specific Subjects (Physics, Accountancy, History, etc.)', 'Section 3: General Test'],
    preparationStrategy: 'Thoroughly revise Class 12 NCERT textbooks for your chosen domain subjects. Practice chapter-wise MCQs.',
    requiredDocuments: ['Class 10 & 12 Marksheets', 'Category Certificate', 'Photo and Signature'],
    admissionScope: 'Central Universities (Delhi University, BHU, JNU, Jamia) and participating state & private universities',
    officialWebsite: 'https://cuetug.ntaonline.in',
    frequency: 'Once a Year (May)',
    isDemoData: true
  }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'central-sector-scheme',
    name: 'Central Sector Scheme of Scholarships for College & University Students',
    provider: 'Ministry of Education, Government of India',
    type: 'Government',
    targetClass: ['Class 12 Passed', 'Undergraduate Year 1'],
    eligibleStream: ['Science', 'Commerce', 'Arts'],
    state: 'All India',
    categoryQuota: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    maxAnnualFamilyIncome: '₹4,50,000',
    benefits: '₹12,000 per annum for graduation (3 years) + ₹20,000 per annum for post-graduation',
    lastDateInfo: '31st October (Demo Calendar Date)',
    documentsRequired: ['Class 12 Marksheet', 'Income Certificate by competent authority', 'Bank Passbook linked with Aadhaar', 'College Bonafide Certificate'],
    applicationProcess: 'Register on the National Scholarship Portal (NSP) → Complete Aadhaar KYC → Upload documents → Institutional verification.',
    officialLink: 'https://scholarships.gov.in',
    isDemoData: true
  },
  {
    id: 'aicte-pragati',
    name: 'AICTE Pragati Scholarship Scheme for Girl Students',
    provider: 'All India Council for Technical Education (AICTE)',
    type: 'Government',
    targetClass: ['Undergraduate Year 1', 'Diploma Year 1'],
    eligibleStream: ['Science', 'Vocational'],
    state: 'All India',
    categoryQuota: ['Girls Only'],
    maxAnnualFamilyIncome: '₹8,00,000',
    benefits: '₹50,000 per annum for every year of technical degree/diploma education',
    lastDateInfo: '15th November (Demo Calendar Date)',
    documentsRequired: ['AICTE approved college admission letter', 'Tuition fee receipt', 'Family Income Certificate', 'Aadhaar Card'],
    applicationProcess: 'Apply online on National Scholarship Portal under AICTE section with valid college enrolment number.',
    officialLink: 'https://www.aicte-india.org',
    isDemoData: true
  },
  {
    id: 'inspire-she',
    name: 'INSPIRE Scholarship for Higher Education (SHE)',
    provider: 'Department of Science and Technology (DST), Govt of India',
    type: 'Government',
    targetClass: ['Class 12 Passed', 'Undergraduate Year 1'],
    eligibleStream: ['Science'],
    state: 'All India',
    categoryQuota: ['General', 'OBC', 'SC', 'ST'],
    maxAnnualFamilyIncome: 'No specific income cap (Merit in Top 1% of 12th Board)',
    benefits: '₹80,000 per annum (₹60,000 cash + ₹20,000 summer research mentorship project allowance)',
    lastDateInfo: '31st December (Demo Calendar Date)',
    documentsRequired: ['12th Board Marksheet showing Top 1% ranking', 'B.Sc / BS / Integrated M.Sc Enrolment Certificate', 'Endorsement Form by College Principal'],
    applicationProcess: 'Apply via online-inspire.gov.in portal after release of board cut-off percentiles.',
    officialLink: 'https://online-inspire.gov.in',
    isDemoData: true
  },
  {
    id: 'reliance-foundation-ug',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    type: 'Private / Foundation',
    targetClass: ['Undergraduate Year 1'],
    eligibleStream: ['Science', 'Commerce', 'Arts', 'General'],
    state: 'All India',
    categoryQuota: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    maxAnnualFamilyIncome: '₹15,00,000 (Preference to income under ₹2,50,000)',
    benefits: 'Up to ₹2,00,000 over the duration of the undergraduate degree course',
    lastDateInfo: '15th October (Demo Calendar Date)',
    documentsRequired: ['12th Marksheet', 'College Admission Proof', 'Family Income Proof', 'Online Aptitude Test Score'],
    applicationProcess: 'Complete application on Reliance Foundation scholarships portal → Take 60-minute online proctored aptitude test.',
    officialLink: 'https://www.reliancefoundation.org',
    isDemoData: true
  },
  {
    id: 'chhattisgarh-post-matric',
    name: 'Chhattisgarh Post-Matric Scholarship Scheme',
    provider: 'Tribal & Scheduled Caste Development Dept, Govt of Chhattisgarh',
    type: 'Government',
    targetClass: ['Class 11', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma'],
    eligibleStream: ['Science', 'Commerce', 'Arts', 'Vocational'],
    state: 'Chhattisgarh',
    categoryQuota: ['SC', 'ST', 'OBC'],
    maxAnnualFamilyIncome: '₹2,50,000 (OBC/SC/ST)',
    benefits: '100% Tuition fee reimbursement + Monthly maintenance allowance',
    lastDateInfo: '30th November (Demo Calendar Date)',
    documentsRequired: ['Chhattisgarh Domicile Certificate', 'Permanent Caste Certificate', 'Income Certificate', 'College Fee Receipt'],
    applicationProcess: 'Apply on Chhattisgarh Post-Matric Scholarship Portal (postmatric-scholarship.cg.nic.in).',
    officialLink: 'https://postmatric-scholarship.cg.nic.in',
    isDemoData: true
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'JEE Main 2026 Session 1 Registration Window Open (Sample Notice)',
    category: 'Exam Alert',
    date: 'Demo Notice - Oct 2026',
    content: 'National Testing Agency invites online applications for JEE (Main) 2026 Session 1 for admission to NITs, IIITs and CFTIs.',
    linkText: 'Check Eligibility & Pattern',
    isImportant: true
  },
  {
    id: 'ann-2',
    title: 'National Scholarship Portal (NSP) Verification Deadline Extended',
    category: 'Scholarship Deadline',
    date: 'Demo Notice - Oct 2026',
    content: 'All state and central department scholarship applicants are advised to complete institutional e-KYC before the cutoff date.',
    linkText: 'View Scholarships',
    isImportant: false
  },
  {
    id: 'ann-3',
    title: 'Specialized Webinar: Software Engineering Career Roadmaps (B.Tech vs BCA/MCA)',
    category: 'Counseling',
    date: 'Demo Notice - Weekly Series',
    content: 'Join CareerPath CG expert counselors for a live Q&A exploring cost-effective engineering alternative routes.',
    linkText: 'Ask CareerPath AI',
    isImportant: false
  }
];

export const DEMO_STUDENT: User = {
  id: 'student-demo-1',
  name: 'Aman Sharma',
  email: 'aman.student@careerpathcg.edu',
  role: 'student',
  profile: {
    fullName: 'Aman Sharma',
    age: 17,
    currentClass: 'Class 12',
    stream: 'Science',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    interests: ['Coding & Software', 'Web Development', 'Problem Solving', 'Robotics'],
    skills: ['Python Basics', 'Mathematics', 'HTML/CSS'],
    careerGoal: 'Software Engineer',
    preferredLocation: 'National & Regional Institutes',
    institutionType: 'Both',
    budgetPreference: 'Moderate',
    entranceExamInterest: ['JEE Main', 'CGPET', 'BITSAT']
  },
  savedCareers: ['software-engineer', 'data-scientist-ai'],
  savedCourses: ['btech-cse', 'bca', 'mca'],
  savedExams: ['jee-main', 'nimcet'],
  savedScholarships: ['central-sector-scheme', 'aicte-pragati'],
  savedRoadmapIds: ['software-engineer'],
  completedSteps: ['se-ra-1']
};

export const DEMO_ADMIN: User = {
  id: 'admin-demo-1',
  name: 'Admin Coordinator',
  email: 'admin@careerpathcg.edu',
  role: 'admin',
  savedCareers: [],
  savedCourses: [],
  savedExams: [],
  savedScholarships: [],
  savedRoadmapIds: [],
  completedSteps: []
};
