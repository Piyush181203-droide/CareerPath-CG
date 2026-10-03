# CareerPath CG
### AI-Powered Career, Course, Examination & Scholarship Guidance Platform
> *"Your Career. Your Roadmap. Your Future."*

---

## 📌 Project Overview
**CareerPath CG** is a modern full-stack digital career counselor and higher education guidance platform built for students transitioning across critical academic crossroads (Class 10, Class 11–12, Undergraduate, and Postgraduate).

The platform replaces generic advice with **personalized, multi-route vertical career roadmaps**, taking into account a student's schooling level, stream, subjects, natural aptitudes, location preferences, and family budget.

---

## 🌟 Key Capabilities & Features

### 1. Personalized Multi-Route Career Roadmaps
- Does not lock students into a single rigid path.
- Example: **Software Engineer** roadmap features **Route A** (Direct 4-Year B.Tech CSE), **Route B** (BCA → MCA via NIMCET), and **Route C** (Polytechnic Diploma → Lateral B.Tech 2nd Year).
- Step-by-step vertical timeline with 5 to 13 milestones covering:
  - *What to study*
  - *Important subjects*
  - *Core skills to master*
  - *Relevant entrance examinations*
  - *Required documents*
  - *Interactive progress checklist (% completion calculator)*

### 2. Bilingual AI Career Counselor (`CareerPath AI`)
- Server-side AI layer using `@google/genai` (with `gemini-3.8-flash`).
- **Zero frontend API key exposure**: secure server-side endpoints proxy all requests.
- **High-Availability Fallback AI**: includes a rule-based AI counselor when offline or when no API key is attached, ensuring the app always functions seamlessly.
- **Multilingual Support**: natively understands and responds in **English**, **Hindi (हिंदी)**, and **Hinglish**.

### 3. Student Onboarding Wizard
- Professional 5-step interactive wizard:
  - **Step 1:** Basic Student Profile (Name, Age, Current Education Stage)
  - **Step 2:** Academic Stream & Core Subjects (PCM, PCB, Commerce, Arts, Vocational)
  - **Step 3:** Natural Strengths & Subject Passions (Interactive chips)
  - **Step 4:** Target Career Aspiration
  - **Step 5:** Practical Preferences (Govt/Private, Budget preference, Location, Entrance willingness)

### 4. Career Explorer, Course Finder & Examination Hub
- **Career Explorer**: Detailed career profiles including eligibility, starting salary packages, job roles, pitfalls, and FAQs.
- **Course Finder**: UG and PG degree breakdown (duration, eligibility, curriculum, fees, career outcomes).
- **Examination Hub**: Standard application windows, question patterns, syllabus, and official portal links (JEE Main, NEET-UG, NIMCET, CLAT, CUET-UG, etc.).

### 5. Scholarship Finder with Interactive Eligibility Calculator
- Central, state, and foundation scholarships (NSP Central Sector, AICTE Pragati for Girls, DST INSPIRE, Reliance Foundation, Chhattisgarh Post-Matric).
- Interactive **Eligibility Calculator Modal** evaluating candidate class, social category quota, state domicile, and annual family income ceiling.

### 6. Student Dashboard & Bookmark System
- Interactive roadmap progress indicator (e.g., *"Your Software Engineering roadmap is 42% complete"*).
- Saved bookmarks for Careers, Degree Courses, Entrance Exams, and Scholarships.
- Upcoming examination deadline reminders.

### 7. Administrative Management Console
- Platform telemetry and statistics (Total Students, Roadmaps, Careers, Courses, Exams, Scholarships).
- Full CRUD operations: Create, update, audit, or delete database repository entries.
- Broadcast Counseling Alerts and notification bulletins.

---

## 🏗️ Technical Architecture

```
CareerPath CG
├── server.ts                    # Express backend with Vite SPA dev middlewares & production static handler
├── server/
│   └── aiService.ts             # IAICareerService abstraction + Gemini + High-Availability Fallback Engine
├── src/
│   ├── types/index.ts           # Unified TypeScript entities (Career, Route, Step, Course, Exam, Scholarship, User)
│   ├── data/mockData.ts         # Seed database of Indian & global educational pathways
│   ├── context/AppContext.tsx   # Central React state (Auth, Saved items, Active roadmap, Search, Modals)
│   ├── components/
│   │   ├── Navbar.tsx           # Glassmorphic responsive header with search shortcut (Ctrl+K) & user drawer
│   │   ├── Footer.tsx           # Editorial footer with regulatory notices and quick links
│   │   ├── GlobalSearchModal.tsx# Instant multi-category live search
│   │   ├── AuthModal.tsx        # 1-click Demo Student & Admin profile switcher
│   │   ├── CareerDetailModal.tsx# Deep-dive breakdown of careers & alternative routes
│   │   ├── CourseDetailModal.tsx# Degree syllabus, eligibility & fee breakdown
│   │   ├── ExamDetailModal.tsx  # Exam pattern, scoring rules & official links
│   │   └── EligibilityModal.tsx # Interactive scholarship eligibility evaluator
│   └── views/
│       ├── HomeView.tsx         # Hero section, stream explorer, popular paths & featured hubs
│       ├── OnboardingView.tsx   # 5-step personalized roadmap wizard
│       ├── RoadmapView.tsx      # Vertical timeline with completion checklists & alternative routes
│       ├── AIChatView.tsx       # Conversational AI assistant with suggestions & prompt chips
│       ├── CareerExplorerView.tsx # Career catalog with stream & category filters
│       ├── CourseFinderView.tsx # Degree course catalog with UG/PG filters
│       ├── ExamHubView.tsx      # Entrance examinations directory
│       ├── ScholarshipFinderView.tsx # Financial aid finder
│       ├── DashboardView.tsx    # Student dashboard & progress tracking
│       └── AdminPanelView.tsx   # Repository management and system metrics
└── index.html                   # HTML entry point with Plus Jakarta Sans & Outfit typography
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (v18.x or v20.x+)
- npm or yarn

### Installation
```bash
# 1. Clone repository & install dependencies
npm install

# 2. Configure environment variables (optional)
cp .env.example .env
# Set GEMINI_API_KEY in .env if you wish to use live Google Gemini AI
```

### Running the Application
```bash
# Starts both Express backend and Vite client on port 3000
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Production Build
```bash
npm run build
npm start
```

---

## 🔐 Credentials & Quick Demo Access
- **Student Profile**: Aman Sharma (Class 12 PCM, targeting Software Engineering)
- **Admin Profile**: Direct 1-click switch in the Auth dialog or top navigation bar to test all CRUD management capabilities.
