import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { AICareerService } from './server/aiService.ts';
import { 
  INITIAL_CAREERS, 
  INITIAL_COURSES, 
  INITIAL_EXAMS, 
  INITIAL_SCHOLARSHIPS, 
  INITIAL_ANNOUNCEMENTS 
} from './src/data/mockData.ts';
import { Career, Course, Exam, Scholarship, Announcement, StudentProfile } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store initialized with rich realistic educational data
let careers: Career[] = [...INITIAL_CAREERS];
let courses: Course[] = [...INITIAL_COURSES];
let exams: Exam[] = [...INITIAL_EXAMS];
let scholarships: Scholarship[] = [...INITIAL_SCHOLARSHIPS];
let announcements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];

const aiService = new AICareerService();

// ==========================================
// API ROUTES
// ==========================================

// 1. AI Career Guide Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { studentProfile, conversationHistory, userQuestion } = req.body;
    if (!userQuestion || typeof userQuestion !== 'string') {
      return res.status(400).json({ error: 'userQuestion is required' });
    }

    const response = await aiService.generateGuidance({
      studentProfile,
      conversationHistory: conversationHistory || [],
      userQuestion,
      careers,
      courses,
      exams,
      scholarships
    });

    res.json(response);
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({ 
      error: 'Failed to generate guidance',
      message: err.message || 'Internal server error'
    });
  }
});

// 2. Personalized Roadmap Generation
app.post('/api/roadmap/generate', (req, res) => {
  try {
    const profile: StudentProfile = req.body.profile;
    if (!profile) {
      return res.status(400).json({ error: 'Profile is required' });
    }

    // Match career based on goal or interests
    const targetGoalLower = (profile.careerGoal || '').toLowerCase();
    let matchedCareer = careers.find(c => 
      c.name.toLowerCase().includes(targetGoalLower) || 
      c.id.toLowerCase().includes(targetGoalLower)
    );

    if (!matchedCareer && profile.interests && profile.interests.length > 0) {
      const firstInterest = profile.interests[0].toLowerCase();
      matchedCareer = careers.find(c => 
        c.subjects.some(s => s.toLowerCase().includes(firstInterest)) ||
        c.skills.some(sk => sk.toLowerCase().includes(firstInterest)) ||
        c.category.toLowerCase().includes(firstInterest)
      );
    }

    // Default to software engineer if no exact match
    if (!matchedCareer) {
      matchedCareer = careers[0];
    }

    // Generate personalized match explanation
    const matchReason = `Based on your current stage (${profile.currentClass}), your background in ${profile.stream}, and your interest in ${profile.interests.slice(0, 2).join(' & ')}, ${matchedCareer.name} aligns with your preferred ${profile.budgetPreference.toLowerCase()} budget and study preferences.`;

    res.json({
      career: matchedCareer,
      studentProfile: profile,
      matchReason,
      recommendedRouteId: matchedCareer.routes[0]?.id,
      generatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate roadmap', message: err.message });
  }
});

// 3. Careers CRUD
app.get('/api/careers', (req, res) => {
  const { category, stream, search } = req.query;
  let filtered = [...careers];

  if (category && typeof category === 'string' && category !== 'All') {
    filtered = filtered.filter(c => c.category === category);
  }
  if (stream && typeof stream === 'string' && stream !== 'All') {
    filtered = filtered.filter(c => c.stream.includes(stream as any) || c.stream.includes('General'));
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  res.json(filtered);
});

app.post('/api/careers', (req, res) => {
  const newCareer: Career = {
    ...req.body,
    id: req.body.id || `career-${Date.now()}`
  };
  careers.unshift(newCareer);
  res.status(201).json(newCareer);
});

app.put('/api/careers/:id', (req, res) => {
  const index = careers.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Career not found' });
  careers[index] = { ...careers[index], ...req.body };
  res.json(careers[index]);
});

app.delete('/api/careers/:id', (req, res) => {
  careers = careers.filter(c => c.id !== req.params.id);
  res.json({ success: true, message: 'Career deleted' });
});

// 4. Courses CRUD
app.get('/api/courses', (req, res) => {
  const { stream, level, search } = req.query;
  let filtered = [...courses];

  if (stream && typeof stream === 'string' && stream !== 'All') {
    filtered = filtered.filter(c => c.stream === stream || c.stream === 'General');
  }
  if (level && typeof level === 'string' && level !== 'All') {
    filtered = filtered.filter(c => c.level === level);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.fullName.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

app.post('/api/courses', (req, res) => {
  const newCourse: Course = {
    ...req.body,
    id: req.body.id || `course-${Date.now()}`
  };
  courses.unshift(newCourse);
  res.status(201).json(newCourse);
});

app.put('/api/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Course not found' });
  courses[index] = { ...courses[index], ...req.body };
  res.json(courses[index]);
});

app.delete('/api/courses/:id', (req, res) => {
  courses = courses.filter(c => c.id !== req.params.id);
  res.json({ success: true, message: 'Course deleted' });
});

// 5. Exams CRUD
app.get('/api/exams', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...exams];

  if (category && typeof category === 'string' && category !== 'All') {
    filtered = filtered.filter(e => e.category === category);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.fullName.toLowerCase().includes(q) ||
      e.admissionScope.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

app.post('/api/exams', (req, res) => {
  const newExam: Exam = {
    ...req.body,
    id: req.body.id || `exam-${Date.now()}`
  };
  exams.unshift(newExam);
  res.status(201).json(newExam);
});

app.put('/api/exams/:id', (req, res) => {
  const index = exams.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Exam not found' });
  exams[index] = { ...exams[index], ...req.body };
  res.json(exams[index]);
});

app.delete('/api/exams/:id', (req, res) => {
  exams = exams.filter(e => e.id !== req.params.id);
  res.json({ success: true, message: 'Exam deleted' });
});

// 6. Scholarships CRUD
app.get('/api/scholarships', (req, res) => {
  const { type, state, search } = req.query;
  let filtered = [...scholarships];

  if (type && typeof type === 'string' && type !== 'All') {
    filtered = filtered.filter(s => s.type === type);
  }
  if (state && typeof state === 'string' && state !== 'All') {
    filtered = filtered.filter(s => s.state === state || s.state === 'All India');
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.provider.toLowerCase().includes(q) ||
      s.benefits.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

app.post('/api/scholarships', (req, res) => {
  const newScholarship: Scholarship = {
    ...req.body,
    id: req.body.id || `scholarship-${Date.now()}`
  };
  scholarships.unshift(newScholarship);
  res.status(201).json(newScholarship);
});

app.put('/api/scholarships/:id', (req, res) => {
  const index = scholarships.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Scholarship not found' });
  scholarships[index] = { ...scholarships[index], ...req.body };
  res.json(scholarships[index]);
});

app.delete('/api/scholarships/:id', (req, res) => {
  scholarships = scholarships.filter(s => s.id !== req.params.id);
  res.json({ success: true, message: 'Scholarship deleted' });
});

// 7. Announcements CRUD
app.get('/api/announcements', (_req, res) => {
  res.json(announcements);
});

app.post('/api/announcements', (req, res) => {
  const newAnn: Announcement = {
    ...req.body,
    id: `ann-${Date.now()}`
  };
  announcements.unshift(newAnn);
  res.status(201).json(newAnn);
});

app.delete('/api/announcements/:id', (req, res) => {
  announcements = announcements.filter(a => a.id !== req.params.id);
  res.json({ success: true, message: 'Announcement deleted' });
});

// 8. Admin Dashboard Stats
app.get('/api/stats', (_req, res) => {
  res.json({
    totalStudents: 1485,
    activeRoadmaps: 1240,
    totalCareers: careers.length,
    totalCourses: courses.length,
    totalExams: exams.length,
    totalScholarships: scholarships.length,
    aiQueriesHandled: 8492
  });
});

// 9. Global Search
app.get('/api/search', (req, res) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  if (!q) {
    return res.json({ careers: [], courses: [], exams: [], scholarships: [] });
  }

  const matchedCareers = careers.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.overview.toLowerCase().includes(q) ||
    c.skills.some(s => s.toLowerCase().includes(q)) ||
    c.entranceExams.some(e => e.toLowerCase().includes(q))
  ).slice(0, 5);

  const matchedCourses = courses.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.fullName.toLowerCase().includes(q) ||
    c.coreSubjects.some(s => s.toLowerCase().includes(q)) ||
    c.careerOptions.some(co => co.toLowerCase().includes(q))
  ).slice(0, 5);

  const matchedExams = exams.filter(e => 
    e.name.toLowerCase().includes(q) || 
    e.fullName.toLowerCase().includes(q) ||
    e.admissionScope.toLowerCase().includes(q)
  ).slice(0, 5);

  const matchedScholarships = scholarships.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.provider.toLowerCase().includes(q) ||
    s.categoryQuota.some(cq => cq.toLowerCase().includes(q))
  ).slice(0, 5);

  res.json({
    careers: matchedCareers,
    courses: matchedCourses,
    exams: matchedExams,
    scholarships: matchedScholarships
  });
});

// ==========================================
// VITE DEV MIDDLEWARE / STATIC SERVE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CareerPath CG server listening on port ${PORT}`);
  });
}

startServer();
