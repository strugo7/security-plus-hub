# 🏗️ CyberGuard Academy - System Architecture

## מסמך אדריכלות מלא | Security+ Learning Platform

---

## 📋 תוכן עניינים

1. [סקירת המערכת](#overview)
2. [מפת האתר](#sitemap)
3. [תפקידי משתמשים](#user-roles)
4. [מבנה הניתוב (Routing)](#routing)
5. [מודלים של נתונים (Data Models)](#data-models)
6. [מערכת העצבים (State Management)](#state-management)
7. [מבנה קומפוננטות](#component-structure)
8. [Design System](#design-system)

---

## 🎯 סקירת המערכת {#overview}

### שם הפרויקט
**CyberGuard Academy** - פלטפורמת למידה להכנה ל-CompTIA Security+ SY0-701

### מטרות
- הכנה להסמכת Security+
- הכנה לתפקיד SecOps/Cyber Implementer
- למידה אינטראקטיבית עם סימולציות

### Stack טכנולוגי
```
Frontend:
├── React 18 + TypeScript (strict)
├── Vite 5 (build tool)
├── Tailwind CSS 3
├── React Router 6
├── shadcn/ui components
└── Lucide React icons

State:
├── React Context + useReducer
├── LocalStorage (persistence)
└── (Optional) Supabase (multi-user)

MCPs:
├── shadcn/ui
├── Context7
└── Superpowers
```

---

## 🗺️ מפת האתר {#sitemap}

```
CyberGuard Academy
│
├── 🔓 PUBLIC ROUTES
│   ├── /                     → Welcome Page (Page 1)
│   ├── /login                → Login/Register
│   └── /404                  → Not Found (404 Page)
│
├── 🔐 USER ROUTES (Authenticated)
│   │
│   ├── /dashboard            → Dashboard Homepage (Page 3)
│   │
│   ├── /sections
│   │   ├── /sections/:sectionId                → Section Overview (Page 3.1)
│   │   │   └── Example: /sections/1            → "General Security Concepts"
│   │   │
│   │   └── /sections/:sectionId/:topicId       → Lesson Page (Page 3.2)
│   │       └── Example: /sections/2/1          → "2.1 Threat Actors"
│   │
│   ├── /practice
│   │   ├── /practice/quiz/:sectionId?          → Section Quiz
│   │   ├── /practice/exam                      → Full Exam Simulation (Page 6)
│   │   ├── /practice/exam/results/:examId      → Exam Results
│   │   └── /practice/failed                    → Failed Questions Review
│   │
│   ├── /flashcards
│   │   ├── /flashcards                         → Flashcard Manager (Page 5)
│   │   ├── /flashcards/study/:deckId?          → Study Mode (Page 5.1)
│   │   └── /flashcards/create                  → Create Flashcard
│   │
│   ├── /simulations
│   │   ├── /simulations                        → Simulation Library (Page 9)
│   │   ├── /simulations/:simId                 → Active Simulation
│   │   └── /simulations/:simId/report          → Technical Report (Page 9.1)
│   │
│   ├── /notes                                  → Note Archive (Page 8)
│   │
│   └── /profile                                → User Profile (Page 10)
│
└── 👑 ADMIN ROUTES
    │
    ├── /admin/lessons
    │   ├── /admin/lessons                      → Lesson Manager
    │   └── /admin/lessons/:lessonId/edit       → Lesson Editor (Page 3.2.1)
    │
    ├── /admin/exams
    │   ├── /admin/exams                        → Exam Manager
    │   ├── /admin/exams/builder                → Exam Builder (Page 6.1)
    │   └── /admin/exams/builder/:examId        → Edit Exam
    │
    ├── /admin/questions
    │   ├── /admin/questions                    → Question Bank (Page 6.2)
    │   ├── /admin/questions/create             → Create Question
    │   ├── /admin/questions/:questionId/edit   → Edit Question
    │   └── /admin/questions/analysis           → Question Analysis (Page 6.3)
    │
    ├── /admin/flashcards                       → Flashcard Manager (Admin)
    │
    ├── /admin/simulations                      → Simulation Manager
    │
    └── /admin/users                            → User Management
```

---

## 👥 תפקידי משתמשים {#user-roles}

### User (משתמש רגיל)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user';
  membership: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}
```

**יכולות:**
| פעולה | גישה |
|-------|------|
| צפייה בשיעורים | ✅ |
| ביצוע Quiz | ✅ |
| ביצוע Exam | ✅ (Pro) |
| כרטיסיות - למידה | ✅ |
| כרטיסיות - יצירה אישית | ✅ |
| סימולציות | ✅ (Pro) |
| הערות אישיות | ✅ |
| עריכת פרופיל | ✅ |
| צפייה בהתקדמות | ✅ |

### Admin (מנהל מערכת)

```typescript
interface Admin {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin';
  permissions: AdminPermission[];
  createdAt: Date;
}

type AdminPermission = 
  | 'lessons:manage'
  | 'questions:manage'
  | 'exams:manage'
  | 'flashcards:manage'
  | 'simulations:manage'
  | 'users:manage'
  | 'analytics:view';
```

**יכולות נוספות:**
| פעולה | גישה |
|-------|------|
| כל יכולות User | ✅ |
| עריכת שיעורים | ✅ |
| ניהול בנק שאלות | ✅ |
| בניית מבחנים | ✅ |
| ניתוח שאלות | ✅ |
| ניהול כרטיסיות (גלובלי) | ✅ |
| ניהול סימולציות | ✅ |
| ניהול משתמשים | ✅ |

---

## 🛤️ מבנה הניתוב {#routing}

### Route Configuration

```typescript
// src/routes/index.tsx

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  
  // Protected User Routes
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      
      // Learning
      { path: 'sections/:sectionId', element: <SectionPage /> },
      { path: 'sections/:sectionId/:topicId', element: <LessonPage /> },
      
      // Practice
      { path: 'practice/quiz/:sectionId?', element: <QuizPage /> },
      { path: 'practice/exam', element: <ExamPage /> },
      { path: 'practice/exam/results/:examId', element: <ExamResultsPage /> },
      { path: 'practice/failed', element: <FailedQuestionsPage /> },
      
      // Flashcards
      { path: 'flashcards', element: <FlashcardsManagerPage /> },
      { path: 'flashcards/study/:deckId?', element: <FlashcardStudyPage /> },
      { path: 'flashcards/create', element: <FlashcardCreatePage /> },
      
      // Simulations
      { path: 'simulations', element: <SimulationsLibraryPage /> },
      { path: 'simulations/:simId', element: <SimulationPage /> },
      { path: 'simulations/:simId/report', element: <SimulationReportPage /> },
      
      // Notes & Profile
      { path: 'notes', element: <NotesArchivePage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  
  // Admin Routes
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { path: 'lessons', element: <AdminLessonsPage /> },
      { path: 'lessons/:lessonId/edit', element: <LessonEditorPage /> },
      { path: 'exams', element: <AdminExamsPage /> },
      { path: 'exams/builder/:examId?', element: <ExamBuilderPage /> },
      { path: 'questions', element: <QuestionBankPage /> },
      { path: 'questions/create', element: <QuestionCreatePage /> },
      { path: 'questions/:questionId/edit', element: <QuestionEditPage /> },
      { path: 'questions/analysis', element: <QuestionAnalysisPage /> },
      { path: 'flashcards', element: <AdminFlashcardsPage /> },
      { path: 'simulations', element: <AdminSimulationsPage /> },
      { path: 'users', element: <UserManagementPage /> },
    ],
  },
  
  // Error Routes
  { path: '*', element: <NotFoundPage /> },
]);
```

### Route Guards

```typescript
// src/components/auth/ProtectedRoute.tsx

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// src/components/auth/AdminRoute.tsx

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
```

---

## 📊 מודלים של נתונים {#data-models}

### Content Structure (Security+ Syllabus)

```typescript
// src/types/content.ts

export interface Section {
  id: number;                    // 1-5
  title: string;                 // "General Security Concepts"
  description: string;
  weight: number;                // Exam weight percentage
  icon: string;                  // Material icon name
  color: SectionColor;
  topics: Topic[];
}

export interface Topic {
  id: string;                    // "1.1", "2.3", etc.
  sectionId: number;
  title: string;                 // "Security Controls"
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: LessonBlock[];        // Notion-style blocks
  estimatedMinutes: number;
  order: number;
}

export interface LessonBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'table' | 'callout' | 'quiz' | 'diagram';
  content: any;                  // Type depends on block type
}

export type SectionColor = 'blue' | 'red' | 'green' | 'orange' | 'purple';

// Security+ Content Map
export const SECTIONS: Section[] = [
  {
    id: 1,
    title: 'General Security Concepts',
    weight: 15,
    icon: 'shield',
    color: 'blue',
    topics: [
      { id: '1.1', title: 'Security Controls', ... },
      { id: '1.2', title: 'Security Concepts', ... },
      { id: '1.3', title: 'Change Management', ... },
      { id: '1.4', title: 'Cryptographic Solutions', ... },
    ]
  },
  {
    id: 2,
    title: 'Threats, Vulnerabilities, and Mitigations',
    weight: 22,
    icon: 'bug_report',
    color: 'red',
    topics: [
      { id: '2.1', title: 'Threat Actors', ... },
      { id: '2.2', title: 'Threat Vectors and Attack Surfaces', ... },
      { id: '2.3', title: 'Types of Vulnerabilities', ... },
      { id: '2.4', title: 'Indicators of Malicious Activity', ... },
      { id: '2.5', title: 'Mitigation Techniques', ... },
    ]
  },
  {
    id: 3,
    title: 'Security Architecture',
    weight: 18,
    icon: 'architecture',
    color: 'green',
    topics: [
      { id: '3.1', title: 'Architecture Models', ... },
      { id: '3.2', title: 'Applying Security Principles', ... },
      { id: '3.3', title: 'Protecting Data', ... },
      { id: '3.4', title: 'Resiliency and Recovery', ... },
    ]
  },
  {
    id: 4,
    title: 'Security Operations',
    weight: 28,
    icon: 'terminal',
    color: 'orange',
    topics: [
      { id: '4.1', title: 'Security Techniques', ... },
      { id: '4.2', title: 'Asset Management', ... },
      { id: '4.3', title: 'Vulnerability Management', ... },
      { id: '4.4', title: 'Security Monitoring', ... },
      { id: '4.5', title: 'Enterprise Security', ... },
      { id: '4.6', title: 'Identity and Access Management', ... },
      { id: '4.7', title: 'Automation and Orchestration', ... },
      { id: '4.8', title: 'Incident Response', ... },
      { id: '4.9', title: 'Security Data Sources', ... },
    ]
  },
  {
    id: 5,
    title: 'Security Program Management and Oversight',
    weight: 17,
    icon: 'gavel',
    color: 'purple',
    topics: [
      { id: '5.1', title: 'Security Governance', ... },
      { id: '5.2', title: 'Risk Management', ... },
      { id: '5.3', title: 'Third-party Risk', ... },
      { id: '5.4', title: 'Security Compliance', ... },
      { id: '5.5', title: 'Audits and Assessments', ... },
      { id: '5.6', title: 'Security Awareness', ... },
    ]
  },
];
```

### Quiz & Exam Models

```typescript
// src/types/quiz.ts

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single' | 'multiple' | 'drag-drop' | 'true-false';

export interface Question {
  id: string;                    // "4.1-001"
  type: QuestionType;
  question: string;
  options: string[];
  correct: number | number[];    // Index(es)
  explanation: string;
  topicId: string;               // "4.1"
  sectionId: number;             // 4
  difficulty: Difficulty;
  tags: string[];
  assets?: QuestionAsset[];      // Images, code snippets
  points?: number;               // For custom exams
}

export interface QuestionAsset {
  type: 'image' | 'code' | 'table';
  content: string;
  caption?: string;
}

export interface Quiz {
  id: string;
  type: 'section' | 'topic' | 'exam' | 'failed' | 'custom';
  title: string;
  questions: Question[];
  timeLimit?: number;            // Seconds (0 = no limit)
  passingScore?: number;         // Percentage
  showFeedback: boolean;         // Immediate or at end
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  sectionBreakdown: Record<number, { correct: number; total: number }>;
  failedQuestionIds: string[];
  passed: boolean;
}
```

### Flashcard Models

```typescript
// src/types/flashcard.ts

export interface FlashcardDeck {
  id: string;
  title: string;
  description?: string;
  topicId?: string;              // Optional - user decks may not have
  sectionId?: number;
  cardCount: number;
  isPublic: boolean;             // Admin-created = public
  createdBy: string;             // User ID
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;                 // Term/Question (Markdown)
  back: string;                  // Definition/Answer (Markdown)
  tags: string[];
  createdAt: string;
  
  // Spaced Repetition Data (per user)
  // Stored separately in FlashcardProgress
}

export interface FlashcardProgress {
  cardId: string;
  userId: string;
  easeFactor: number;            // SM-2 algorithm
  interval: number;              // Days until next review
  repetitions: number;
  nextReview: string;            // ISO date
  lastReview?: string;
}
```

### User Progress Models

```typescript
// src/types/progress.ts

export interface UserProgress {
  userId: string;
  
  // Study Progress
  sections: Record<number, SectionProgress>;
  
  // Quiz/Exam History
  quizResults: QuizResult[];
  
  // Failed Questions
  failedQuestionIds: string[];
  
  // Flashcard Progress
  flashcardProgress: FlashcardProgress[];
  
  // Study Streaks
  studyStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  
  // Achievements
  achievements: Achievement[];
  
  // Statistics
  totalStudyTime: number;        // Minutes
  totalQuestionsAnswered: number;
  accuracy: number;              // Percentage
}

export interface SectionProgress {
  sectionId: number;
  completedTopics: string[];     // Topic IDs
  quizScores: QuizResult[];
  lastAccessed?: string;
  completionPercentage: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
  isLocked: boolean;
}
```

### Simulation Models

```typescript
// src/types/simulation.ts

export type SimulationType = 
  | 'sql-injection'
  | 'xss'
  | 'phishing'
  | 'network-attack'
  | 'password-cracking'
  | 'social-engineering';

export interface Simulation {
  id: string;
  type: SimulationType;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  objectives: string[];
  tools: SimulationTool[];
  steps: SimulationStep[];
  relatedTopics: string[];       // Topic IDs
}

export interface SimulationTool {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
}

export interface SimulationStep {
  id: string;
  instruction: string;
  hint?: string;
  validation: SimulationValidation;
}

export interface SimulationValidation {
  type: 'code' | 'action' | 'answer';
  expected: string | string[];
}

export interface SimulationResult {
  id: string;
  simulationId: string;
  userId: string;
  completedAt: string;
  score: number;
  stepsCompleted: number;
  totalSteps: number;
  report: TechnicalReport;
}

export interface TechnicalReport {
  attackType: string;
  vulnerability: string;
  impact: string;
  mitigation: string[];
  cweId?: string;
  cvssScore?: number;
}
```

### Note Models

```typescript
// src/types/note.ts

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;               // Markdown
  topicId?: string;              // Associated topic
  lessonId?: string;             // Associated lesson
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  color?: string;
}
```

---

## 🧠 מערכת העצבים (State Management) {#state-management}

### Context Architecture

```
Contexts
├── AuthContext          → User authentication state
├── ProgressContext      → Learning progress & stats
├── QuizContext          → Active quiz state
├── FlashcardContext     → Flashcard study state
├── NotificationContext  → Toast notifications
└── ThemeContext         → Dark/Light mode
```

### AuthContext

```typescript
// src/context/AuthContext.tsx

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthState & AuthActions | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      dispatch({ type: 'RESTORE_SESSION', payload: JSON.parse(stored) });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);
  
  // ... actions implementation
  
  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### ProgressContext

```typescript
// src/context/ProgressContext.tsx

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
}

interface ProgressActions {
  // Section/Topic Progress
  markTopicComplete: (topicId: string) => void;
  updateLessonProgress: (lessonId: string, percentage: number) => void;
  
  // Quiz Progress
  saveQuizResult: (result: QuizResult) => void;
  addFailedQuestion: (questionId: string) => void;
  removeFailedQuestion: (questionId: string) => void;
  
  // Flashcard Progress
  updateFlashcardProgress: (cardId: string, quality: number) => void;
  
  // Streaks
  updateStreak: () => void;
  
  // Achievements
  checkAndUnlockAchievements: () => void;
  
  // Stats
  addStudyTime: (minutes: number) => void;
}

// Local Storage Key
const PROGRESS_KEY = 'cyberguard-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    `${PROGRESS_KEY}-${user?.id}`,
    createInitialProgress(user?.id)
  );
  
  // Computed values
  const overallProgress = useMemo(() => {
    if (!progress) return 0;
    const sectionWeights = { 1: 15, 2: 22, 3: 18, 4: 28, 5: 17 };
    let weighted = 0;
    for (const [sectionId, section] of Object.entries(progress.sections)) {
      weighted += section.completionPercentage * (sectionWeights[Number(sectionId)] / 100);
    }
    return Math.round(weighted);
  }, [progress]);
  
  // ... actions implementation
}
```

### QuizContext

```typescript
// src/context/QuizContext.tsx

interface QuizState {
  quiz: Quiz | null;
  currentIndex: number;
  answers: Record<string, number | number[] | null>;
  startTime: Date | null;
  isComplete: boolean;
  showExplanation: boolean;
  flaggedQuestions: Set<string>;
}

type QuizAction =
  | { type: 'START_QUIZ'; payload: Quiz }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: number | number[] } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'TOGGLE_FLAG'; payload: string }
  | { type: 'SHOW_EXPLANATION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        quiz: action.payload,
        currentIndex: 0,
        answers: {},
        startTime: new Date(),
        isComplete: false,
        showExplanation: false,
        flaggedQuestions: new Set(),
      };
    
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
        showExplanation: state.quiz?.showFeedback ?? false,
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, (state.quiz?.questions.length ?? 1) - 1),
        showExplanation: false,
      };
    
    // ... more cases
    
    default:
      return state;
  }
}
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    AuthProvider                           │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │                 ProgressProvider                    │  │   │
│  │  │  ┌──────────────────────────────────────────────┐  │  │   │
│  │  │  │               QuizProvider                    │  │  │   │
│  │  │  │  ┌────────────────────────────────────────┐  │  │  │   │
│  │  │  │  │           FlashcardProvider             │  │  │  │   │
│  │  │  │  │  ┌──────────────────────────────────┐  │  │  │  │   │
│  │  │  │  │  │        NotificationProvider       │  │  │  │  │   │
│  │  │  │  │  │  ┌────────────────────────────┐  │  │  │  │  │   │
│  │  │  │  │  │  │         Router              │  │  │  │  │  │   │
│  │  │  │  │  │  │  ┌──────────────────────┐  │  │  │  │  │  │   │
│  │  │  │  │  │  │  │        Pages          │  │  │  │  │  │  │   │
│  │  │  │  │  │  │  └──────────────────────┘  │  │  │  │  │  │   │
│  │  │  │  │  │  └────────────────────────────┘  │  │  │  │  │   │
│  │  │  │  │  └──────────────────────────────────┘  │  │  │  │   │
│  │  │  │  └────────────────────────────────────────┘  │  │  │   │
│  │  │  └──────────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    LocalStorage                          │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐    │    │
│  │  │    auth     │ │   progress  │ │   flashcards    │    │    │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 מבנה קומפוננטות {#component-structure}

```
src/
├── components/
│   ├── ui/                          # shadcn + custom atoms
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   ├── Dialog.tsx
│   │   ├── Tabs.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── AppLayout.tsx            # Main app layout with sidebar
│   │   ├── AdminLayout.tsx          # Admin-specific layout
│   │   ├── PublicLayout.tsx         # Landing/login layout
│   │   ├── Header.tsx               # Top navigation
│   │   ├── Sidebar.tsx              # Section navigation
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── AdminRoute.tsx
│   │
│   ├── dashboard/
│   │   ├── WelcomeCard.tsx          # "Welcome back, Alex"
│   │   ├── ResumeCard.tsx           # Continue learning card
│   │   ├── SectionGrid.tsx          # 5 section cards
│   │   ├── SectionCard.tsx          # Individual section card
│   │   ├── ProgressOverview.tsx
│   │   └── QuickActions.tsx
│   │
│   ├── learning/
│   │   ├── LessonSidebar.tsx        # Topic navigation
│   │   ├── LessonContent.tsx        # Main lesson area
│   │   ├── LessonBlock.tsx          # Content block renderer
│   │   ├── DefinitionCard.tsx       # Key term callout
│   │   ├── DiagramViewer.tsx        # Interactive diagrams
│   │   ├── KnowledgeCheck.tsx       # In-lesson quiz
│   │   └── LessonProgress.tsx       # Progress bar
│   │
│   ├── quiz/
│   │   ├── QuizContainer.tsx        # Main quiz wrapper
│   │   ├── QuizQuestion.tsx         # Question display
│   │   ├── QuizOptions.tsx          # Answer options
│   │   ├── QuizExplanation.tsx      # Post-answer explanation
│   │   ├── QuizProgress.tsx         # Progress indicator
│   │   ├── QuizTimer.tsx            # Countdown timer
│   │   ├── QuizMap.tsx              # Question grid (exam)
│   │   ├── QuizResults.tsx          # Final results
│   │   └── QuizReview.tsx           # Review wrong answers
│   │
│   ├── flashcards/
│   │   ├── DeckList.tsx             # Deck sidebar
│   │   ├── DeckCard.tsx             # Deck preview
│   │   ├── FlashcardEditor.tsx      # Create/edit card
│   │   ├── FlashcardViewer.tsx      # Study mode
│   │   ├── FlashcardFlip.tsx        # Flip animation
│   │   ├── DifficultyButtons.tsx    # Easy/Medium/Hard
│   │   └── StudyProgress.tsx        # Session stats
│   │
│   ├── simulation/
│   │   ├── SimulationLibrary.tsx    # Attack list
│   │   ├── SimulationCard.tsx       # Attack preview
│   │   ├── SimulationWorkspace.tsx  # Main simulation area
│   │   ├── Toolbox.tsx              # Draggable tools
│   │   ├── AttackVisualizer.tsx     # Visual attack flow
│   │   ├── QueryLog.tsx             # Server log display
│   │   └── TechnicalReport.tsx      # Post-simulation report
│   │
│   ├── notes/
│   │   ├── NotesList.tsx
│   │   ├── NoteCard.tsx
│   │   ├── NoteEditor.tsx
│   │   └── NoteTags.tsx
│   │
│   ├── profile/
│   │   ├── ProfileHeader.tsx        # Avatar, name, rank
│   │   ├── StatsGrid.tsx            # Statistics cards
│   │   ├── SkillRadar.tsx           # Section proficiency
│   │   ├── AchievementGrid.tsx      # Badges
│   │   ├── CertificationCard.tsx    # Cert countdown
│   │   └── ActivityFeed.tsx         # Recent activity
│   │
│   └── admin/
│       ├── LessonEditor.tsx         # Notion-style editor
│       ├── QuestionEditor.tsx       # Question CRUD
│       ├── ExamBuilder.tsx          # Drag & drop builder
│       ├── QuestionBank.tsx         # Question list
│       ├── QuestionAnalytics.tsx    # Stats & charts
│       └── UserTable.tsx            # User management
│
├── pages/
│   ├── public/
│   │   ├── WelcomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── user/
│   │   ├── DashboardPage.tsx
│   │   ├── SectionPage.tsx
│   │   ├── LessonPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── ExamPage.tsx
│   │   ├── ExamResultsPage.tsx
│   │   ├── FailedQuestionsPage.tsx
│   │   ├── FlashcardsManagerPage.tsx
│   │   ├── FlashcardStudyPage.tsx
│   │   ├── FlashcardCreatePage.tsx
│   │   ├── SimulationsLibraryPage.tsx
│   │   ├── SimulationPage.tsx
│   │   ├── SimulationReportPage.tsx
│   │   ├── NotesArchivePage.tsx
│   │   └── ProfilePage.tsx
│   │
│   └── admin/
│       ├── AdminLessonsPage.tsx
│       ├── LessonEditorPage.tsx
│       ├── AdminExamsPage.tsx
│       ├── ExamBuilderPage.tsx
│       ├── QuestionBankPage.tsx
│       ├── QuestionCreatePage.tsx
│       ├── QuestionEditPage.tsx
│       ├── QuestionAnalysisPage.tsx
│       ├── AdminFlashcardsPage.tsx
│       ├── AdminSimulationsPage.tsx
│       └── UserManagementPage.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useProgress.ts
│   ├── useQuiz.ts
│   ├── useFlashcards.ts
│   ├── useTimer.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
│
├── context/
│   ├── AuthContext.tsx
│   ├── ProgressContext.tsx
│   ├── QuizContext.tsx
│   ├── FlashcardContext.tsx
│   ├── NotificationContext.tsx
│   └── ThemeContext.tsx
│
├── data/
│   ├── sections.json                # Section/Topic structure
│   ├── questions/
│   │   ├── section1.json
│   │   ├── section2.json
│   │   └── ...
│   ├── flashcards/
│   │   └── ...
│   ├── simulations/
│   │   └── ...
│   └── achievements.json
│
├── types/
│   ├── user.ts
│   ├── content.ts
│   ├── quiz.ts
│   ├── flashcard.ts
│   ├── progress.ts
│   ├── simulation.ts
│   └── note.ts
│
├── utils/
│   ├── storage.ts
│   ├── scoring.ts
│   ├── shuffle.ts
│   ├── spacedRepetition.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── constants/
│   ├── routes.ts
│   ├── colors.ts
│   └── config.ts
│
└── styles/
    └── globals.css
```

---

## 🎨 Design System {#design-system}

### Color Palette (from designs)

```typescript
// tailwind.config.ts

export const colors = {
  // Primary
  primary: '#137fec',       // Main blue
  'primary-dark': '#0f65bd',
  accent: '#00e5ff',        // Cyan accent
  
  // Backgrounds
  'background-dark': '#101922',
  'card-dark': '#192633',
  'panel-dark': '#1a2634',
  'surface-dark': '#1e293b',
  
  // Borders
  'border-dark': '#233648',
  
  // Text
  'text-primary': '#ffffff',
  'text-secondary': '#92adc9',
  'text-muted': '#64748b',
  
  // Section Colors
  section: {
    1: '#3b82f6',  // blue
    2: '#ef4444',  // red
    3: '#22c55e',  // green
    4: '#f97316',  // orange
    5: '#a855f7',  // purple
  },
  
  // Status
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#3b82f6',
};
```

### Typography

```css
/* From designs */
font-family: {
  display: ['Lexend', 'Space Grotesk', 'sans-serif'],
  body: ['Heebo', 'Noto Sans', 'sans-serif'],
  mono: ['Courier New', 'monospace'],
}
```

### Spacing Scale

```
p-2  = 8px
p-3  = 12px
p-4  = 16px
p-6  = 24px
p-8  = 32px
p-10 = 40px
```

### Effects

```css
/* Glow effects from designs */
.glow-primary {
  box-shadow: 0 0 15px rgba(19, 127, 236, 0.4);
}

.glow-success {
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
}

/* Cyber grid background */
.cyber-grid {
  background-image: 
    linear-gradient(#1e293b 1px, transparent 1px),
    linear-gradient(90deg, #1e293b 1px, transparent 1px);
  background-size: 40px 40px;
}
```

---

## 📋 סיכום

### מה יש לנו:
- ✅ 15+ דפים מעוצבים
- ✅ 2 תפקידי משתמש (User/Admin)
- ✅ 28 Topics ב-5 Sections
- ✅ מערכת Quiz + Exam מלאה
- ✅ Flashcards עם Spaced Repetition
- ✅ סימולציות התקפה אינטראקטיביות
- ✅ מערכת הערות
- ✅ פרופיל עם הישגים

### מה צריך לבנות:
1. **Phase 1**: Infrastructure (Vite + React + TS + Tailwind)
2. **Phase 2**: Auth + Routing + Layouts
3. **Phase 3**: Dashboard + Section/Lesson pages
4. **Phase 4**: Quiz/Exam system
5. **Phase 5**: Flashcards
6. **Phase 6**: Simulations
7. **Phase 7**: Notes + Profile
8. **Phase 8**: Admin features

### Next Steps:
```
1. התקן Superpowers plugin
2. הגדר MCPs (shadcn, context7)
3. העתק Skills לפרויקט
4. התחל ב-Phase 1 עם brainstorming
```

---

*מסמך אדריכלות זה מבוסס על ניתוח 15 קבצי עיצוב מ-Google Stitch*