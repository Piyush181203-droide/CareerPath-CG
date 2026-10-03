import { GoogleGenAI } from '@google/genai';
import { StudentProfile, Career, Course, Exam, Scholarship, ChatMessage } from '../src/types';

export interface AICareerContext {
  studentProfile?: StudentProfile;
  conversationHistory: ChatMessage[];
  userQuestion: string;
  careers: Career[];
  courses: Course[];
  exams: Exam[];
  scholarships: Scholarship[];
}

export interface AICareerResponse {
  answer: string;
  suggestedFollowUps: string[];
  relatedCareerId?: string;
  relatedCourseId?: string;
  isFallback: boolean;
}

export interface IAICareerService {
  generateGuidance(context: AICareerContext): Promise<AICareerResponse>;
}

/**
 * Fallback rule-based career counseling engine for offline or unconfigured API keys.
 * Handles English, Hindi, and Hinglish queries with rich structured guidance.
 */
export class FallbackCareerService implements IAICareerService {
  public async generateGuidance(context: AICareerContext): Promise<AICareerResponse> {
    const q = context.userQuestion.toLowerCase().trim();
    const profile = context.studentProfile;
    const isHindiOrHinglish = /kya|kaise|karo|batao|karna|hoga|padhna|chahiye|hai|aur|kon|koun|konsa|kis|me|mein|banu|sakte|padhai|paisa/.test(q);

    // 1. Doctor / Medical query
    if (q.includes('doctor') || q.includes('mbbs') || q.includes('medical') || q.includes('neet') || q.includes('neurosurg')) {
      if (isHindiOrHinglish) {
        return {
          answer: `### 🩺 Doctor / MBBS Career Roadmap Guide

**1. Direct Answer:**
Doctor banne ke liye aapko 12th class mein **Physics, Chemistry, aur Biology (PCB)** lena anivarya hai aur **NEET-UG** national entrance examination clear karna hoga.

**2. Complete Step-by-Step Pathway:**
- **Class 10:** Minimum 75%+ score karein aur Science stream chunein.
- **Class 11 & 12:** PCB (Physics, Chemistry, Biology) + English. NCERT textbooks ko line-by-line master karein.
- **Entrance Exam:** Class 12th ke baad **NEET-UG** exam dekar all-India rank haasil karein.
- **Undergraduate Degree:** 5.5 saal ka **MBBS** course (4.5 years academic + 1 year paid hospital rotatory internship).
- **Postgraduate (MD/MS):** Specialist ya Surgeon banne ke liye NEET-PG / NExT exam dekar 3-year MD ya MS karein.

**3. Alternative Medical Options (Agar MBBS na mile):**
1. **BDS:** Dental Surgery (5 Years)
2. **BAMS / BHMS:** Ayurvedic ya Homeopathic Medicine (5.5 Years)
3. **B.Sc Nursing / B.Pharm:** High demand in India & Abroad
4. **Allied Healthcare:** Physiotherapy (BPT), Radiology, Medical Lab Tech

**4. Relevant Entrance Exams:**
- **NEET-UG** (Single entrance for all medical colleges across India)

**5. Required Skills & Documents:**
- *Skills:* Clinical aptitude, deep biology concept retention, high stress tolerance, patient empathy.
- *Documents:* 10th & 12th Marksheets, Aadhaar Card, Domicile Certificate, Category/EWS Certificate (if applicable).

**6. Common Mistakes to Avoid:**
- Physics ko ignore karna (NEET mein rank Physics aur Chemistry ke numericals hi decide karte hain).
- NCERT chhodkar unnecessary high-level engineering books padhna.`,
          suggestedFollowUps: [
            'NEET-UG ki preparation Class 11th se kaise shuru karein?',
            'B.Sc Nursing aur B.Pharm ke career options kya hain?',
            'Government medical colleges ki approximate fees kitni hoti hai?'
          ],
          relatedCareerId: 'doctor-mbbs',
          relatedCourseId: 'mbbs',
          isFallback: true
        };
      } else {
        return {
          answer: `### 🩺 Comprehensive Medical & Doctor (MBBS) Roadmap

**1. Direct Answer:**
To become a practicing allopathic doctor in India, you must complete Class 12 with **Physics, Chemistry, Biology (PCB)**, qualify the national **NEET-UG** entrance exam, and complete a 5.5-year **MBBS** degree.

**2. Detailed Career Pathway:**
- **Stage 1 (Class 10-11):** Choose Science stream with PCB and English. Target conceptual clarity in cell biology, organic chemistry, and Newtonian mechanics.
- **Stage 2 (Class 12):** Intensive revision of NCERT syllabus (Class 11 & 12) + regular Sunday timed mock tests.
- **Stage 3 (NEET-UG):** Crack NEET-UG (720 Marks, 180 questions) to qualify for All India Quota (MCC) or State Quota counselling.
- **Stage 4 (MBBS Degree):** 4.5 years of 19 medical subjects + 1 year compulsory rotatory clinical hospital internship.
- **Stage 5 (Specialization):** Appear for NExT / NEET-PG for 3-year MD (Medicine) or MS (Surgery).

**3. Alternative Medical & Healthcare Routes:**
1. **BDS** (Bachelor of Dental Surgery)
2. **BAMS / BHMS** (Ayurvedic / Homeopathic Medicine)
3. **B.Sc Nursing** (Very high global mobility and demand in UK/USA/Gulf)
4. **B.Pharm / Pharm.D** (Pharmaceutical formulation and clinical pharmacy)

**4. Top Exams & Eligibility:**
- **Exam:** NEET-UG (Conducted annually by NTA in May)
- **Eligibility:** 10+2 with PCB (minimum 50% aggregate for General, 40% for Reserved).

**5. Common Pitfalls:**
- Spending 80% time on Biology and neglecting Physics numericals.
- Relying on excessive coaching modules without reading NCERT line-by-line.`,
          suggestedFollowUps: [
            'What is the ideal preparation strategy for NEET Physics?',
            'What are the government medical college fee structures and quotas?',
            'What are the best alternatives if I do not clear NEET on the first attempt?'
          ],
          relatedCareerId: 'doctor-mbbs',
          relatedCourseId: 'mbbs',
          isFallback: true
        };
      }
    }

    // 2. Software Engineer / Coding / Tech
    if (q.includes('software') || q.includes('coder') || q.includes('coding') || q.includes('b.tech') || q.includes('bca') || q.includes('mca') || q.includes('developer') || q.includes('programming') || q.includes('cs') || q.includes('it')) {
      if (isHindiOrHinglish) {
        return {
          answer: `### 💻 Software Engineer Banne Ka Complete Guide

**1. Direct Answer:**
Software Engineer banne ke kai raaste (routes) hain. Aap **B.Tech CSE/IT**, **BCA + MCA**, ya direct **Diploma → B.Tech Lateral Entry** ke zariye top software company mein engineer ban sakte hain.

**2. Top 3 Routes (Aapke liye kaunsa behtar hai?):**

* **Route A: Traditional B.Tech CSE (4 Years)**
  - Class 12th mein PCM (Physics, Chemistry, Maths)
  - JEE Main / State Entrance (CGPET, etc.)
  - Campus placement directly into MNCs (TCS, Infosys, Amazon, Google, Startups).

* **Route B: BCA → MCA Route (3 + 2 = 5 Years) — High Value Alternative**
  - Agar 12th mein PCM nahi tha ya JEE rank achhi nahi aayi, toh BCA karke **NIMCET** exam de sakte hain.
  - NITs aur top institutes se MCA karne par B.Tech ke barabar package milta hai.

* **Route C: Diploma in Computer Science (Polytechnic)**
  - 10th ke baad 3 saal ka Diploma, fir B.Tech 2nd year mein direct Lateral Entry.

**3. Important Skills To Learn (Year-by-Year):**
- **Year 1:** C++ ya Java, Object Oriented Programming, Git/GitHub.
- **Year 2:** Data Structures & Algorithms (DSA), Web Development (React, Node.js), SQL.
- **Year 3:** System Design basics, Cloud deployment, 2-3 live projects on GitHub.
- **Year 4:** Campus placement coding rounds, LeetCode problem solving.

**4. Relevant Entrance Exams:**
- **JEE Main & Advanced**
- **State CETs (CGPET, MHT-CET, WBJEE)**
- **NIMCET** (NIT MCA entrance)
- **CUET-UG** (Central universities BCA programs)`,
          suggestedFollowUps: [
            'BCA vs B.Tech CSE: Placements aur salary mein kya difference hai?',
            'Coding Class 11th se kaise shuru karein?',
            'Software engineering ke top scholarships kaunse hain?'
          ],
          relatedCareerId: 'software-engineer',
          relatedCourseId: 'btech-cse',
          isFallback: true
        };
      } else {
        return {
          answer: `### 💻 Comprehensive Software Engineer Roadmap

**1. Direct Answer:**
Becoming a Software Engineer does not require just one rigid path. Depending on your current education level and budget, you can choose between **B.Tech CSE**, **BCA → MCA**, or a **Polytechnic Diploma Lateral Entry**.

**2. Primary Pathways:**

* **Route 1: B.Tech in CSE / IT (4 Years)**
  - Pass 10+2 with PCM (Physics, Chemistry, Mathematics).
  - Clear **JEE Main**, **BITSAT**, or **State CET (e.g. CGPET)**.
  - Direct campus recruitment with starting packages ranging from ₹6 LPA to ₹25+ LPA.

* **Route 2: BCA + MCA Pathway (3 + 2 Years)**
  - Accessible to students even without heavy PCM background in some colleges.
  - Focuses on practical programming from Day 1.
  - Clear **NIMCET** for admission into National Institutes of Technology (NITs), yielding packages on par with B.Tech graduates.

* **Route 3: Polytechnic Diploma → B.Tech Lateral Entry**
  - Join a 3-year Diploma after Class 10 via state PPT.
  - Enter the 2nd year (3rd semester) of B.Tech CSE directly via LEET.

**3. Crucial Skills Checklist:**
- *Core Languages:* C++, Java, or Python
- *Problem Solving:* Data Structures & Algorithms (LeetCode / Codeforces)
- *Modern Tech:* React, Node.js/Go, SQL, Docker, and Cloud (AWS/GCP)
- *Version Control:* Active GitHub repository history

**4. Recommended Next Steps:**
1. Choose between B.Tech or BCA based on your Class 12 subject eligibility.
2. Build 2 functional portfolio web applications with database persistence.
3. Solve at least 150 standard DSA problems before campus placements.`,
          suggestedFollowUps: [
            'Which is better for me: BCA or B.Tech CSE?',
            'What are the most demanded tech skills for campus placements in 2026?',
            'Show me the detailed 4-year semester roadmap for B.Tech CSE.'
          ],
          relatedCareerId: 'software-engineer',
          relatedCourseId: 'btech-cse',
          isFallback: true
        };
      }
    }

    // 3. Class 10 / After 10th options
    if (q.includes('10th') || q.includes('class 10') || q.includes('tenth') || q.includes('after 10')) {
      if (isHindiOrHinglish) {
        return {
          answer: `### 🎓 Class 10th Ke Baad Kya Karein? (Detailed Guidance)

**1. Direct Answer:**
10th ke baad aapke paas 3 main streams aur professional diploma courses ke vikalp hote hain. Sahi stream ka chunaav aapke **interest**, **marks**, aur **career goal** par nirbhar karta hai.

**2. Available Streams & Career Goals:**

* **Science Stream (PCM / PCB / PCMB):**
  - *PCM (Maths):* Engineering (B.Tech), Architecture, NDA (Defence), BCA, Commercial Pilot, Merchant Navy, B.Sc.
  - *PCB (Biology):* Doctor (MBBS), BDS (Dentist), B.Sc Nursing, B.Pharm, Biotechnology, Forensic Science.
  - *Best for:* Jinko analytical problem solving, medical research ya coding pasand hai.

* **Commerce Stream (With or Without Maths):**
  - *Options:* Chartered Accountant (CA), Company Secretary (CS), CMA, B.Com, BBA, Banking & Finance, Investment Banking, Stock Market.
  - *Best for:* Jinko business, accounts, money management aur numbers pasand hain.

* **Arts / Humanities Stream:**
  - *Options:* Civil Services (IAS/IPS), Corporate Law (BA LLB / CLAT), Journalism, Psychology, UI/UX Design, Hotel Management, Teaching.
  - *Best for:* Jinko social sciences, public policy, creative writing aur civil services pasand hain.

* **Vocational & Polytechnic Diploma (Direct After 10th):**
  - 3-Year Diploma in Computer, Mechanical, Civil or Electrical Engineering.
  - Diploma ke baad direct B.Tech 2nd year mein admission milta hai.

**3. Next Recommended Action:**
Hamaare **Student Onboarding Wizard** par jaakar apna interest aur subject daalein taaki system aapke liye personalized visual roadmap generate kar sake!`,
          suggestedFollowUps: [
            'Class 11th mein Science lena chahiye ya Commerce?',
            'Polytechnic diploma 10th ke baad kaisa option hai?',
            'Commerce with Maths ke kya advantages hain?'
          ],
          isFallback: true
        };
      } else {
        return {
          answer: `### 🎓 Comprehensive Career Guidance After Class 10

**1. Direct Answer:**
After Class 10, your primary decision is selecting the right Academic Stream or Technical Diploma that aligns with your natural strengths, subject interests, and career ambitions.

**2. Stream-by-Stream Analysis:**

* **1. Science Stream:**
  - *PCM:* Ideal for Engineering (B.Tech), Architecture (B.Arch), Commercial Pilot, Merchant Navy, Defence (NDA), BCA, and pure Sciences.
  - *PCB:* Ideal for Medical (MBBS, BDS, BAMS), Nursing, Pharmacy, Allied Health Sciences, and Biotechnology.

* **2. Commerce Stream:**
  - Leads to Chartered Accountancy (CA), Company Secretary (CS), Investment Banking, Corporate Finance, Actuarial Science, and B.Com / BBA.
  - *Tip:* Opting for Commerce *with Mathematics* opens maximum university doors (like SRCC, DU, IIM Indore IPMAT).

* **3. Arts & Humanities Stream:**
  - Excellent for Civil Services (UPSC), Corporate Law (CLAT for National Law Universities), Clinical Psychology, Media & Journalism, and International Relations.

* **4. Polytechnic Diploma (3 Years):**
  - Industry-focused technical diploma with direct lateral entry into 2nd year of B.Tech without doing Class 11-12.

**3. Recommended Next Steps:**
1. Complete our **5-Step Onboarding Wizard** on the platform.
2. Review our **Career Explorer** to compare starting salaries and preparation time.`,
          suggestedFollowUps: [
            'Should I take Science or Commerce after 10th?',
            'What are the pros and cons of taking a Polytechnic Diploma after 10th?',
            'How can I become an IAS officer starting from Class 10?'
          ],
          isFallback: true
        };
      }
    }

    // 4. After 12th Science / Options
    if (q.includes('12th') || q.includes('after 12') || q.includes('science')) {
      return {
        answer: `### 🔬 Top Career Options After 12th Science

**1. PCM (Physics, Chemistry, Mathematics):**
- **Engineering (B.Tech / B.E):** Computer Science, AI/Data Science, Electronics, Mechanical, Civil via **JEE Main & State CETs**.
- **Computer Applications (BCA):** 3-year practical tech degree, followed by MCA via **NIMCET**.
- **Architecture (B.Arch):** Through JEE Main Paper 2 or NATA.
- **Commercial Pilot License (CPL):** Flying training after DGCA medical check and exams.
- **National Defence Academy (NDA):** Direct commissioned officer entry in Army, Navy, Air Force via UPSC NDA.
- **Pure Sciences (B.Sc / BS-MS):** At IISc, IISERs, NISER via IAT and NEST.

**2. PCB (Physics, Chemistry, Biology):**
- **MBBS / BDS:** Medical and Dental via **NEET-UG**.
- **AYUSH:** BAMS, BHMS, BUMS.
- **Allied Medicine:** B.Sc Nursing, Physiotherapy (BPT), Radiology, Medical Lab Technology.
- **Pharmacy:** B.Pharm (4 Years) leading to drug manufacturing, QA, and clinical research.
- **Biotechnology & Genetics:** High research scope.

**3. Interdisciplinary Options (Open to both PCM & PCB):**
- 5-Year Integrated Corporate Law (**CLAT** for NLUs)
- Bachelor of Design (**UCEED** for IITs, NID DAT)
- Management (**IPMAT** for 5-Year Integrated MBA at IIM Indore/Rohtak)`,
        suggestedFollowUps: [
          'What are high-paying career options after 12th Science other than Engineering and MBBS?',
          'How does the NDA selection process work after 12th PCM?',
          'What scholarships are available for Class 12th passed students?'
        ],
        isFallback: true
      };
    }

    // 5. CA / Commerce
    if (q.includes('ca') || q.includes('chartered') || q.includes('accountant') || q.includes('commerce')) {
      return {
        answer: `### 📊 Chartered Accountant (CA) & Commerce Career Guide

**1. Direct Answer:**
The **Chartered Accountant (CA)** credential is provided by the Institute of Chartered Accountants of India (ICAI). You can enter immediately after Class 12 via the **CA Foundation** exam or after graduation via the Direct Entry scheme.

**2. Step-by-Step CA Journey:**
- **Step 1:** Register for CA Foundation with ICAI during Class 12.
- **Step 2:** Clear CA Foundation (4 Papers: Accounts, Business Law, Quantitative Aptitude, Economics).
- **Step 3:** Enrol in CA Intermediate (Group 1 & 2) and complete ICITSS IT/Soft-skills training.
- **Step 4:** Undertake 2 Years of mandatory practical **Articleship** under a practicing Chartered Accountant.
- **Step 5:** Clear **CA Final** and receive ACA membership.

**3. Key Benefits:**
- High prestige and statutory audit authority under the Companies Act.
- Average campus placement: ₹8.5L – ₹20L per annum.
- Very low tuition fees compared to engineering/medical degrees.

**4. Common Pitfalls:**
- Neglecting ICAI study material in favor of coaching digests.
- Failing to develop strong written numerical solving speed.`,
        suggestedFollowUps: [
          'Can a science student do CA after 12th?',
          'What is the difference between CA, CS, and CMA?',
          'What is the stipend during the 2-year CA articleship?'
        ],
        relatedCareerId: 'chartered-accountant',
        isFallback: true
      };
    }

    // 6. Government jobs / Civil services
    if (q.includes('government') || q.includes('govt') || q.includes('ias') || q.includes('upsc') || q.includes('civil') || q.includes('sarkari')) {
      return {
        answer: `### 🏛️ Government Careers & Civil Services (UPSC / State PSC)

**1. Direct Answer:**
Government career opportunities range from apex executive positions (IAS, IPS, IFS via **UPSC CSE**) to banking (IBPS PO, SBI PO), defence (NDA, CDS), and state administration (State PSCs like CGPSC).

**2. Classification of Govt Careers:**
- **Executive Group A (UPSC CSE):** IAS (Collector/DM), IPS (Police Superintendent), IFS (Foreign Diplomat), IRS (Income Tax/Customs). Any graduation required, age 21–32.
- **Defence Forces:** NDA (after 12th PCM/Any), CDS / AFCAT (after graduation).
- **Banking & Insurance:** RBI Grade B, SBI PO, IBPS PO (Analytical and financial governance).
- **Technical Govt Jobs:** IES (Indian Engineering Services), GATE for PSUs (IOCL, ONGC, NTPC, BHEL).

**3. Preparation Strategy:**
- Read national daily newspapers (*The Hindu* or *Indian Express*) consistently.
- Master Class 6-12 NCERT textbooks for History, Geography, Polity, and Economics.
- Maintain a graduation degree with genuine subject depth as a secure backup career foundation.`,
        suggestedFollowUps: [
          'Which graduation course is best for UPSC preparation?',
          'How can I prepare for UPSC while doing engineering or college degree?',
          'What are the age limits and attempt limits for General/OBC/SC/ST in UPSC?'
        ],
        relatedCareerId: 'civil-services-ias',
        isFallback: true
      };
    }

    // 7. General personalized advice based on context
    const profileInfo = profile 
      ? `Based on your profile as a **${profile.currentClass}** student in **${profile.stream}** with an interest in **${profile.careerGoal || profile.interests.join(', ')}**:`
      : `Based on your question:`;

    return {
      answer: `### 🎯 CareerPath CG Guidance

${profileInfo}

**1. Immediate Recommended Steps:**
- Define your primary career goal and identify at least 2 alternative routes (e.g., Engineering vs BCA+MCA, or MBBS vs Allied Health).
- Review the specific entrance examinations required for your target field (e.g., JEE, NEET, CUET, CLAT, NIMCET).
- Check your eligibility for national and state scholarships to minimize educational costs.

**2. Practical Action Plan:**
1. Explore our **Career Explorer** tab to inspect comprehensive multi-route timelines.
2. Complete the **5-Step Onboarding Form** to generate an automated, step-by-step personalized roadmap.
3. Track key application windows in our **Examination Hub**.

Tell me more about your favorite subjects, current class, or budget preference, and I will tailor a specific roadmap for you!`,
      suggestedFollowUps: [
        'How can I generate my complete personalized roadmap?',
        'What scholarships are available for my education level?',
        'What are the highest-paying careers in my stream?'
      ],
      isFallback: true
    };
  }
}

/**
 * Server-side Gemini AI integration using modern @google/genai SDK
 */
export class GeminiCareerService implements IAICareerService {
  private ai: GoogleGenAI;
  private fallbackService: FallbackCareerService;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    this.fallbackService = new FallbackCareerService();
  }

  public async generateGuidance(context: AICareerContext): Promise<AICareerResponse> {
    try {
      const studentSummary = context.studentProfile
        ? `Student Profile:
- Name: ${context.studentProfile.fullName}
- Current Class: ${context.studentProfile.currentClass}
- Stream: ${context.studentProfile.stream}
- Subjects: ${context.studentProfile.subjects.join(', ')}
- Interests: ${context.studentProfile.interests.join(', ')}
- Career Goal: ${context.studentProfile.careerGoal}
- Budget: ${context.studentProfile.budgetPreference}
- Location: ${context.studentProfile.preferredLocation}`
        : 'Student Profile: Not specified yet.';

      const conversationContext = context.conversationHistory.slice(-6).map(m => 
        `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).join('\n\n');

      const systemInstruction = `You are CareerPath AI, the expert digital career counselor for the CareerPath CG platform.
Your mission is to guide students (Class 10, Class 11-12, college students, graduates) on careers, courses, entrance examinations, scholarships, and skill roadmaps.

Core Principles:
1. Always give student-friendly, highly actionable, structured, encouraging, and accurate advice.
2. Never force a student into only one career path; always mention smart alternative routes (e.g. For Software Engineering: B.Tech CSE, BCA->MCA, B.Sc CS, Diploma lateral entry).
3. If the user asks in Hindi or Hinglish, respond warmly in the same Hindi/Hinglish style! If English, respond in English.
4. Structure your response with clean markdown headings, bullet points, and clear sections:
   - Direct Answer
   - Detailed Pathway & Options
   - Recommended Next Steps
   - Relevant Entrance Exams & Courses
   - Key Skills & Documents Required
   - Common Mistakes to Avoid
5. At the very end of your response, output a JSON block wrapped in \`\`\`json containing an array of 3 suggested follow-up questions:
\`\`\`json
{
  "suggestedFollowUps": ["Question 1", "Question 2", "Question 3"]
}
\`\`\``;

      const prompt = `${studentSummary}

Recent Conversation:
${conversationContext}

User Question: ${context.userQuestion}

Please provide comprehensive, structured career guidance according to the instructions.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const rawText = response.text || '';
      
      // Parse suggested followups if present in JSON block
      let answer = rawText;
      let suggestedFollowUps = [
        'What entrance exams should I prepare for?',
        'What are the alternative career routes?',
        'What scholarships can I apply for?'
      ];

      const jsonMatch = rawText.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (Array.isArray(parsed.suggestedFollowUps) && parsed.suggestedFollowUps.length > 0) {
            suggestedFollowUps = parsed.suggestedFollowUps;
          }
          answer = rawText.replace(/```json\s*\{[\s\S]*?\}\s*```/, '').trim();
        } catch {
          // ignore parsing error
        }
      }

      // Check if related career can be linked
      const lower = context.userQuestion.toLowerCase();
      let relatedCareerId: string | undefined;
      if (lower.includes('software') || lower.includes('bca') || lower.includes('b.tech') || lower.includes('coding')) {
        relatedCareerId = 'software-engineer';
      } else if (lower.includes('doctor') || lower.includes('mbbs') || lower.includes('neet')) {
        relatedCareerId = 'doctor-mbbs';
      } else if (lower.includes('ca') || lower.includes('chartered') || lower.includes('commerce')) {
        relatedCareerId = 'chartered-accountant';
      } else if (lower.includes('civil') || lower.includes('ias') || lower.includes('upsc')) {
        relatedCareerId = 'civil-services-ias';
      } else if (lower.includes('law') || lower.includes('clat') || lower.includes('advocate')) {
        relatedCareerId = 'lawyer-advocate';
      }

      return {
        answer,
        suggestedFollowUps,
        relatedCareerId,
        isFallback: false
      };
    } catch (err) {
      console.warn('Gemini API call failed, invoking FallbackCareerService:', err);
      return this.fallbackService.generateGuidance(context);
    }
  }
}

/**
 * Main AI service entry point
 */
export class AICareerService implements IAICareerService {
  private service: IAICareerService;

  constructor() {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      this.service = new GeminiCareerService();
    } else {
      this.service = new FallbackCareerService();
    }
  }

  public async generateGuidance(context: AICareerContext): Promise<AICareerResponse> {
    return this.service.generateGuidance(context);
  }
}
