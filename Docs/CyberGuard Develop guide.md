# 🎯 CyberGuard Academy - Development Agent Guide

## מדריך פיתוח לסוכן AI | Master Reference Document

---

## 📋 מטרת המסמך

מסמך זה מהווה את ה-**Source of Truth** עבור סוכן הפיתוח. הוא מכיל:
1. מבנה הניווט המלא
2. הנחיות להפיכת HTML סטטי לקומפוננטות דינמיות
3. מערכת i18n (עברית/אנגלית)
4. LocalStorage schema
5. הבדלים בין User ל-Admin

---

## 🗂️ קבצי העיצוב המקוריים

| קובץ | תיאור | Route |
|------|-------|-------|
| `Page_1_-_Welcome_Page_English__LTR_.html` | דף כניסה | `/` |
| `Page_2_-_Loading_page__LTR_.html` | מסך טעינה | (component) |
| `Page_3_-_Dashboard_Homepage_English__LTR_.html` | דשבורד ראשי | `/dashboard` |
| `Page_3_1_-_Sub_domain_page_Eanglish__LTR_.html` | עמוד Section | `/sections/:sectionId` |
| `Page_3_2_-_Lesson_Page_with_navigation_bar_English__LTR_.html` | עמוד שיעור | `/sections/:sectionId/:topicId` |
| `Page_3_2_-_Lesson_Page_with_note_taking_English__LTR_.html` | שיעור + הערות | `/sections/:sectionId/:topicId` |
| `Page_3_2_1_-_admin_lesson_editor__notion_style_.html` | עורך שיעורים (Admin) | `/admin/lessons/:id/edit` |
| `Page_5_-_Flashcards_Manager_Eanglish__LTR_.html` | ניהול כרטיסיות | `/flashcards` |
| `Page_5_1_-_Flashcard_view_English__LTR_.html` | למידת כרטיסיות | `/flashcards/study/:deckId` |
| `Page_6_-_Exam_interface_English__LTR_.html` | ממשק מבחן | `/practice/exam` |
| `Page_6_1_-_exam_builder__drag___drop_interface.html` | בונה מבחנים (Admin) | `/admin/exams/builder` |
| `Page_6_2_-_Question_Bank_Manager.html` | בנק שאלות (Admin) | `/admin/questions` |
| `Page_6_3_-_Question_Analysis.html` | ניתוח שאלות (Admin) | `/admin/questions/analysis` |
| `Page_8_-_Note_Archive_English__LTR_.html` | ארכיון הערות | `/notes` |
| `Page_9_-_cyber_attack_simulation.html` | סימולציית התקפה | `/simulations/:simId` |
| `Page_9_1_-_simulation_success___technical_report.html` | דוח טכני | `/simulations/:simId/report` |
| `Page_10_-_Profile_Page.html` | פרופיל משתמש | `/profile` |
| `404_Page.html` | דף שגיאה | `*` |

---

## 🛤️ מבנה הניווט (Routing)

### Route Tree

```
/                                    → WelcomePage
/login                               → LoginPage
/dashboard                           → DashboardPage (protected)
│
├── /sections/:sectionId             → SectionPage
│   └── /sections/:sectionId/:topicId → LessonPage
│
├── /practice
│   ├── /practice/quiz/:sectionId?   → QuizPage
│   ├── /practice/exam               → ExamPage
│   └── /practice/exam/results/:id   → ExamResultsPage
│
├── /flashcards                      → FlashcardsManagerPage
│   ├── /flashcards/study/:deckId?   → FlashcardStudyPage
│   └── /flashcards/create           → FlashcardCreatePage
│
├── /simulations                     → SimulationsLibraryPage
│   ├── /simulations/:simId          → SimulationPage
│   └── /simulations/:simId/report   → SimulationReportPage
│
├── /notes                           → NotesArchivePage
├── /profile                         → ProfilePage
│
└── /admin (AdminRoute - role check)
    ├── /admin/lessons               → AdminLessonsPage
    ├── /admin/lessons/:id/edit      → LessonEditorPage
    ├── /admin/exams/builder         → ExamBuilderPage
    ├── /admin/questions             → QuestionBankPage
    └── /admin/questions/analysis    → QuestionAnalysisPage
```

### Router Configuration

```tsx
// src/routes/index.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from '@/components/auth';
import { AppLayout, AdminLayout, PublicLayout } from '@/components/layout';

// Pages
import {
  WelcomePage,
  LoginPage,
  DashboardPage,
  SectionPage,
  LessonPage,
  QuizPage,
  ExamPage,
  ExamResultsPage,
  FlashcardsManagerPage,
  FlashcardStudyPage,
  SimulationsLibraryPage,
  SimulationPage,
  SimulationReportPage,
  NotesArchivePage,
  ProfilePage,
  NotFoundPage,
  // Admin
  AdminLessonsPage,
  LessonEditorPage,
  ExamBuilderPage,
  QuestionBankPage,
  QuestionAnalysisPage,
} from '@/pages';

export const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <WelcomePage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },

  // Protected User Routes
  {
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      
      // Learning
      { path: '/sections/:sectionId', element: <SectionPage /> },
      { path: '/sections/:sectionId/:topicId', element: <LessonPage /> },
      
      // Practice
      { path: '/practice/quiz/:sectionId?', element: <QuizPage /> },
      { path: '/practice/exam', element: <ExamPage /> },
      { path: '/practice/exam/results/:examId', element: <ExamResultsPage /> },
      
      // Flashcards
      { path: '/flashcards', element: <FlashcardsManagerPage /> },
      { path: '/flashcards/study/:deckId?', element: <FlashcardStudyPage /> },
      { path: '/flashcards/create', element: <FlashcardCreatePage /> },
      
      // Simulations
      { path: '/simulations', element: <SimulationsLibraryPage /> },
      { path: '/simulations/:simId', element: <SimulationPage /> },
      { path: '/simulations/:simId/report', element: <SimulationReportPage /> },
      
      // Notes & Profile
      { path: '/notes', element: <NotesArchivePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },

  // Admin Routes
  {
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { path: '/admin/lessons', element: <AdminLessonsPage /> },
      { path: '/admin/lessons/:lessonId/edit', element: <LessonEditorPage /> },
      { path: '/admin/exams/builder/:examId?', element: <ExamBuilderPage /> },
      { path: '/admin/questions', element: <QuestionBankPage /> },
      { path: '/admin/questions/analysis', element: <QuestionAnalysisPage /> },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);
```

---

## 🌐 מערכת i18n (עברית/אנגלית)

### Setup

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Configuration

```tsx
// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import he from './locales/he.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Locale Files Structure

```
src/i18n/
├── index.ts
└── locales/
    ├── en.json
    └── he.json
```

### English Locale (en.json)

```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "submit": "Submit",
    "search": "Search",
    "close": "Close"
  },
  
  "nav": {
    "dashboard": "Dashboard",
    "learning": "Learning",
    "practice": "Practice",
    "flashcards": "Flashcards",
    "simulations": "Simulations",
    "notes": "Notes",
    "profile": "Profile",
    "admin": "Admin",
    "logout": "Logout"
  },
  
  "welcome": {
    "title": "Welcome to",
    "brand": "CyberGuard Academy",
    "subtitle": "Advanced cyber defense training platform.",
    "cta": "INITIALIZE SYSTEM ACCESS",
    "secure": "Secure Connection: TLS 1.3",
    "serverOnline": "SERVER: ONLINE"
  },
  
  "dashboard": {
    "welcomeBack": "Welcome back, {{name}}",
    "resumeLesson": "Resume Lesson",
    "inProgress": "In Progress",
    "overallProgress": "Overall Progress",
    "examDomains": "Exam Domains",
    "completed": "Completed",
    "notStarted": "Not Started",
    "started": "Started",
    "reviewDomain": "Review Domain",
    "startDomain": "Start Domain",
    "continue": "Continue"
  },
  
  "sections": {
    "section1": {
      "title": "General Security Concepts",
      "description": "Compare and contrast various types of security controls, fundamental security principles, and change management."
    },
    "section2": {
      "title": "Threats, Vulnerabilities & Mitigations",
      "description": "Analyze potential indicators to determine the type of attack. Understand actors, vectors, and intelligence sources."
    },
    "section3": {
      "title": "Security Architecture",
      "description": "Implement security implications of different architecture models. Secure enterprise infrastructure and data."
    },
    "section4": {
      "title": "Security Operations",
      "description": "Apply appropriate incident response procedures. Use data sources to support an investigation."
    },
    "section5": {
      "title": "Program Management & Oversight",
      "description": "Summarize elements of effective security governance. Explain risk management processes and compliance."
    }
  },
  
  "topics": {
    "1.1": "Security Controls",
    "1.2": "Security Concepts",
    "1.3": "Change Management",
    "1.4": "Cryptographic Solutions",
    "2.1": "Threat Actors",
    "2.2": "Threat Vectors and Attack Surfaces",
    "2.3": "Types of Vulnerabilities",
    "2.4": "Indicators of Malicious Activity",
    "2.5": "Mitigation Techniques",
    "3.1": "Architecture Models",
    "3.2": "Applying Security Principles",
    "3.3": "Protecting Data",
    "3.4": "Resiliency and Recovery",
    "4.1": "Security Techniques",
    "4.2": "Asset Management",
    "4.3": "Vulnerability Management",
    "4.4": "Security Monitoring",
    "4.5": "Enterprise Security",
    "4.6": "Identity and Access Management",
    "4.7": "Automation and Orchestration",
    "4.8": "Incident Response",
    "4.9": "Security Data Sources",
    "5.1": "Security Governance",
    "5.2": "Risk Management",
    "5.3": "Third-party Risk",
    "5.4": "Security Compliance",
    "5.5": "Audits and Assessments",
    "5.6": "Security Awareness"
  },
  
  "exam": {
    "title": "Security+ Exam Simulation",
    "timer": "Time Remaining",
    "progress": "Progress",
    "question": "Question",
    "of": "of",
    "flagForReview": "Flag for Review",
    "pause": "Pause",
    "help": "Help",
    "questionMap": "Question Map",
    "reviewAll": "Review All",
    "current": "Current",
    "answered": "Answered",
    "flagged": "Flagged",
    "submitExam": "Submit Exam",
    "confirmSubmit": "Are you sure you want to submit?"
  },
  
  "flashcards": {
    "title": "Flashcard Manager",
    "totalCards": "Total Cards",
    "toReview": "To Review",
    "importExport": "Import/Export",
    "searchDecks": "Search decks...",
    "front": "Front (Term / Question)",
    "back": "Back (Definition / Answer)",
    "tags": "Tags",
    "addTag": "+ Add tag",
    "saveCard": "Save Card",
    "saveAndAddAnother": "Save & Add Another",
    "livePreview": "Live Preview",
    "clickToFlip": "Click to flip",
    "easy": "Easy",
    "medium": "Medium",
    "hard": "Hard"
  },
  
  "simulation": {
    "title": "Cyber Attack Simulation",
    "attackLibrary": "Attack Library",
    "toolbox": "Toolbox",
    "runAttack": "Run Attack",
    "reset": "Reset",
    "serverQueryLogs": "Server Query Logs",
    "difficulty": "Difficulty",
    "estimatedTime": "Est. Time"
  },
  
  "profile": {
    "title": "Profile",
    "editProfile": "Edit Profile",
    "shareProfile": "Share Profile",
    "currentRank": "Current Rank",
    "achievements": "Achievements & Badges",
    "viewAll": "View All",
    "certifications": "Certifications",
    "recentActivity": "Recent Activity",
    "earned": "EARNED",
    "locked": "LOCKED",
    "level": "Level",
    "joined": "Joined"
  },
  
  "admin": {
    "lessonEditor": "Lesson Editor",
    "examBuilder": "Exam Builder",
    "questionBank": "Question Bank",
    "questionAnalysis": "Question Analysis",
    "saveDraft": "Save Draft",
    "publish": "Publish",
    "questionPool": "Question Pool",
    "totalQuestions": "Total Questions",
    "totalPoints": "Total Points",
    "randomizeQuestions": "Randomize Questions",
    "showExplanations": "Show Explanations"
  }
}
```

### Hebrew Locale (he.json)

```json
{
  "common": {
    "loading": "טוען...",
    "save": "שמור",
    "cancel": "ביטול",
    "delete": "מחק",
    "edit": "ערוך",
    "back": "חזור",
    "next": "הבא",
    "previous": "הקודם",
    "submit": "שלח",
    "search": "חיפוש",
    "close": "סגור"
  },
  
  "nav": {
    "dashboard": "לוח בקרה",
    "learning": "למידה",
    "practice": "תרגול",
    "flashcards": "כרטיסיות",
    "simulations": "סימולציות",
    "notes": "הערות",
    "profile": "פרופיל",
    "admin": "ניהול",
    "logout": "התנתק"
  },
  
  "welcome": {
    "title": "ברוכים הבאים ל",
    "brand": "CyberGuard Academy",
    "subtitle": "פלטפורמת אימון מתקדמת להגנת סייבר.",
    "cta": "התחל גישה למערכת",
    "secure": "חיבור מאובטח: TLS 1.3",
    "serverOnline": "שרת: פעיל"
  },
  
  "dashboard": {
    "welcomeBack": "ברוך שובך, {{name}}",
    "resumeLesson": "המשך שיעור",
    "inProgress": "בתהליך",
    "overallProgress": "התקדמות כללית",
    "examDomains": "תחומי הבחינה",
    "completed": "הושלם",
    "notStarted": "לא התחיל",
    "started": "התחיל",
    "reviewDomain": "סקירת תחום",
    "startDomain": "התחל תחום",
    "continue": "המשך"
  },
  
  "sections": {
    "section1": {
      "title": "מושגי אבטחה כלליים",
      "description": "השוואה בין סוגי בקרות אבטחה, עקרונות אבטחה בסיסיים וניהול שינויים."
    },
    "section2": {
      "title": "איומים, פגיעויות והפחתות",
      "description": "ניתוח אינדיקטורים פוטנציאליים לזיהוי סוג ההתקפה. הבנת שחקנים, וקטורים ומקורות מודיעין."
    },
    "section3": {
      "title": "ארכיטקטורת אבטחה",
      "description": "יישום השלכות אבטחה של מודלים ארכיטקטוניים שונים. אבטחת תשתית ונתונים ארגוניים."
    },
    "section4": {
      "title": "תפעול אבטחה",
      "description": "יישום נהלי תגובה לאירועים. שימוש במקורות נתונים לתמיכה בחקירה."
    },
    "section5": {
      "title": "ניהול תוכניות ופיקוח",
      "description": "סיכום אלמנטים של ממשל אבטחה אפקטיבי. הסבר תהליכי ניהול סיכונים ותאימות."
    }
  },
  
  "topics": {
    "1.1": "בקרות אבטחה",
    "1.2": "מושגי אבטחה",
    "1.3": "ניהול שינויים",
    "1.4": "פתרונות קריפטוגרפיים",
    "2.1": "שחקני איום",
    "2.2": "וקטורי איום ומשטחי תקיפה",
    "2.3": "סוגי פגיעויות",
    "2.4": "אינדיקטורים לפעילות זדונית",
    "2.5": "טכניקות הפחתה",
    "3.1": "מודלים ארכיטקטוניים",
    "3.2": "יישום עקרונות אבטחה",
    "3.3": "הגנה על נתונים",
    "3.4": "עמידות והתאוששות",
    "4.1": "טכניקות אבטחה",
    "4.2": "ניהול נכסים",
    "4.3": "ניהול פגיעויות",
    "4.4": "ניטור אבטחה",
    "4.5": "אבטחה ארגונית",
    "4.6": "ניהול זהויות וגישה",
    "4.7": "אוטומציה ותזמור",
    "4.8": "תגובה לאירועים",
    "4.9": "מקורות נתוני אבטחה",
    "5.1": "ממשל אבטחה",
    "5.2": "ניהול סיכונים",
    "5.3": "סיכוני צד שלישי",
    "5.4": "תאימות אבטחה",
    "5.5": "ביקורות והערכות",
    "5.6": "מודעות אבטחה"
  },
  
  "exam": {
    "title": "סימולציית בחינת Security+",
    "timer": "זמן נותר",
    "progress": "התקדמות",
    "question": "שאלה",
    "of": "מתוך",
    "flagForReview": "סמן לבדיקה",
    "pause": "השהה",
    "help": "עזרה",
    "questionMap": "מפת שאלות",
    "reviewAll": "סקור הכל",
    "current": "נוכחי",
    "answered": "נענה",
    "flagged": "מסומן",
    "submitExam": "הגש בחינה",
    "confirmSubmit": "האם אתה בטוח שברצונך להגיש?"
  },
  
  "flashcards": {
    "title": "מנהל כרטיסיות",
    "totalCards": "סה״כ כרטיסיות",
    "toReview": "לחזרה",
    "importExport": "ייבוא/ייצוא",
    "searchDecks": "חפש חפיסות...",
    "front": "קדמי (מונח / שאלה)",
    "back": "אחורי (הגדרה / תשובה)",
    "tags": "תגיות",
    "addTag": "+ הוסף תגית",
    "saveCard": "שמור כרטיס",
    "saveAndAddAnother": "שמור והוסף עוד",
    "livePreview": "תצוגה מקדימה",
    "clickToFlip": "לחץ להפוך",
    "easy": "קל",
    "medium": "בינוני",
    "hard": "קשה"
  },
  
  "simulation": {
    "title": "סימולציית התקפת סייבר",
    "attackLibrary": "ספריית התקפות",
    "toolbox": "ארגז כלים",
    "runAttack": "הרץ התקפה",
    "reset": "אפס",
    "serverQueryLogs": "לוגי שאילתות שרת",
    "difficulty": "רמת קושי",
    "estimatedTime": "זמן משוער"
  },
  
  "profile": {
    "title": "פרופיל",
    "editProfile": "ערוך פרופיל",
    "shareProfile": "שתף פרופיל",
    "currentRank": "דרגה נוכחית",
    "achievements": "הישגים ותגים",
    "viewAll": "צפה בהכל",
    "certifications": "הסמכות",
    "recentActivity": "פעילות אחרונה",
    "earned": "הושג",
    "locked": "נעול",
    "level": "רמה",
    "joined": "הצטרף"
  },
  
  "admin": {
    "lessonEditor": "עורך שיעורים",
    "examBuilder": "בונה מבחנים",
    "questionBank": "בנק שאלות",
    "questionAnalysis": "ניתוח שאלות",
    "saveDraft": "שמור טיוטה",
    "publish": "פרסם",
    "questionPool": "מאגר שאלות",
    "totalQuestions": "סה״כ שאלות",
    "totalPoints": "סה״כ נקודות",
    "randomizeQuestions": "ערבב שאלות",
    "showExplanations": "הצג הסברים"
  }
}
```

### RTL Support

```tsx
// src/hooks/useDirection.ts

import { useTranslation } from 'react-i18next';

export function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return { isRTL, dir };
}

// Usage in App.tsx or Layout
function App() {
  const { dir } = useDirection();
  
  return (
    <html dir={dir} className="dark">
      {/* ... */}
    </html>
  );
}
```

### Language Switcher Component

```tsx
// src/components/ui/LanguageSwitcher.tsx

import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    localStorage.setItem('language', newLang);
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg 
                 bg-slate-800 hover:bg-slate-700 transition-colors"
    >
      <span className="material-symbols-outlined text-sm">translate</span>
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'עברית' : 'English'}
      </span>
    </button>
  );
}
```

---

## 💾 LocalStorage Schema

### Storage Keys

```typescript
// src/constants/storage.ts

export const STORAGE_KEYS = {
  // Auth
  AUTH_USER: 'cyberguard_user',
  AUTH_TOKEN: 'cyberguard_token',
  
  // Preferences
  LANGUAGE: 'cyberguard_language',
  THEME: 'cyberguard_theme',
  
  // Progress (per user)
  PROGRESS: (userId: string) => `cyberguard_progress_${userId}`,
  
  // Quiz State (temporary)
  ACTIVE_QUIZ: 'cyberguard_active_quiz',
  
  // Flashcard Progress
  FLASHCARD_PROGRESS: (userId: string) => `cyberguard_flashcards_${userId}`,
  
  // Notes
  NOTES: (userId: string) => `cyberguard_notes_${userId}`,
  
  // User Flashcard Decks (custom)
  USER_DECKS: (userId: string) => `cyberguard_user_decks_${userId}`,
} as const;
```

### Data Structures

```typescript
// src/types/storage.ts

// User stored in LocalStorage
interface StoredUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  membership: 'free' | 'pro';
  createdAt: string;
}

// Progress stored per user
interface StoredProgress {
  version: number;  // For migrations
  userId: string;
  
  // Section completion
  sections: {
    [sectionId: number]: {
      completedTopics: string[];       // ["1.1", "1.2"]
      lastAccessedTopic?: string;
      completionPercentage: number;    // 0-100
    };
  };
  
  // Quiz results
  quizHistory: {
    id: string;
    type: 'section' | 'exam';
    sectionId?: number;
    score: number;
    totalQuestions: number;
    percentage: number;
    date: string;
    failedQuestionIds: string[];
  }[];
  
  // Failed questions for review
  failedQuestions: string[];  // Question IDs
  
  // Study streak
  streak: {
    current: number;
    longest: number;
    lastStudyDate: string;
  };
  
  // Time tracking
  totalStudyMinutes: number;
  
  // Achievements
  achievements: {
    id: string;
    earnedAt: string;
  }[];
}

// Flashcard progress (SM-2 algorithm)
interface StoredFlashcardProgress {
  [cardId: string]: {
    easeFactor: number;      // Default 2.5
    interval: number;        // Days
    repetitions: number;
    nextReview: string;      // ISO date
    lastReview: string;
  };
}

// Notes
interface StoredNotes {
  [noteId: string]: {
    id: string;
    title: string;
    content: string;         // Markdown
    topicId?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    isPinned: boolean;
  };
}
```

### useLocalStorage Hook

```typescript
// src/hooks/useLocalStorage.ts

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        
        // Dispatch event for other tabs
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
```

---

## 👥 User vs Admin - הבדלים

### בדיקת תפקיד

```typescript
// src/hooks/useAuth.ts

export function useAuth() {
  const [user] = useLocalStorage<StoredUser | null>(STORAGE_KEYS.AUTH_USER, null);
  
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPro: user?.membership === 'pro',
  };
}
```

### תצוגה מותנית

```tsx
// Example: Header with admin link

function Header() {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  
  return (
    <header>
      {/* ... standard nav ... */}
      
      {isAdmin && (
        <Link to="/admin/questions" className="...">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          {t('nav.admin')}
        </Link>
      )}
    </header>
  );
}
```

### דפים ייחודיים לכל תפקיד

| דף | User | Admin |
|----|------|-------|
| Dashboard | רואה התקדמות אישית | רואה התקדמות + קישור לניהול |
| Lesson | צופה בתוכן | צופה + כפתור עריכה |
| Quiz | עושה Quiz | עושה + גישה לבונה |
| Flashcards | לומד + יוצר אישיים | לומד + מנהל גלובליים |
| Questions | ❌ | ניהול מלא |
| Analytics | ❌ | צפייה בסטטיסטיקות |

---

## 🔄 הפיכת HTML סטטי לדינמי

### עקרונות

1. **זהה את הנתונים הדינמיים** - שם משתמש, התקדמות, תוצאות
2. **צור Types** - הגדר interfaces עבור הנתונים
3. **השתמש ב-Hooks** - משוך נתונים מ-Context או LocalStorage
4. **השתמש ב-t()** - החלף טקסט קשיח בתרגומים

### דוגמה: Dashboard Welcome Card

**לפני (סטטי):**
```html
<h2 class="text-3xl font-bold mb-6">Welcome back, Alex</h2>
```

**אחרי (דינמי):**
```tsx
function WelcomeSection() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  return (
    <h2 className="text-3xl font-bold mb-6">
      {t('dashboard.welcomeBack', { name: user?.name })}
    </h2>
  );
}
```

### דוגמה: Section Card עם התקדמות

**לפני (סטטי):**
```html
<div class="w-full h-1.5 bg-[#233648] rounded-full">
  <div class="h-full bg-primary rounded-full w-[45%]"></div>
</div>
<span>45%</span>
```

**אחרי (דינמי):**
```tsx
function SectionCard({ section }: { section: Section }) {
  const { t } = useTranslation();
  const { progress } = useProgress();
  
  const sectionProgress = progress.sections[section.id];
  const percentage = sectionProgress?.completionPercentage ?? 0;
  
  return (
    <div className="...">
      <h4>{t(`sections.section${section.id}.title`)}</h4>
      <p>{t(`sections.section${section.id}.description`)}</p>
      
      <div className="w-full h-1.5 bg-[#233648] rounded-full">
        <div 
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span>{percentage}%</span>
    </div>
  );
}
```

### דוגמה: Admin-Only Button

```tsx
function LessonPage() {
  const { isAdmin } = useAuth();
  const { lessonId } = useParams();
  
  return (
    <div>
      {/* Lesson content */}
      
      {isAdmin && (
        <Link 
          to={`/admin/lessons/${lessonId}/edit`}
          className="fixed bottom-4 right-4 p-3 bg-primary rounded-full shadow-lg"
        >
          <span className="material-symbols-outlined">edit</span>
        </Link>
      )}
    </div>
  );
}
```

---

## 📊 Syllabus Data Structure

```typescript
// src/data/syllabus.ts

export const SECURITY_PLUS_SYLLABUS = {
  sections: [
    {
      id: 1,
      weight: 15,
      icon: 'shield',
      color: 'blue',
      topics: [
        { id: '1.1', order: 1 },
        { id: '1.2', order: 2 },
        { id: '1.3', order: 3 },
        { id: '1.4', order: 4 },
      ],
    },
    {
      id: 2,
      weight: 22,
      icon: 'bug_report',
      color: 'red',
      topics: [
        { id: '2.1', order: 1 },
        { id: '2.2', order: 2 },
        { id: '2.3', order: 3 },
        { id: '2.4', order: 4 },
        { id: '2.5', order: 5 },
      ],
    },
    {
      id: 3,
      weight: 18,
      icon: 'architecture',
      color: 'green',
      topics: [
        { id: '3.1', order: 1 },
        { id: '3.2', order: 2 },
        { id: '3.3', order: 3 },
        { id: '3.4', order: 4 },
      ],
    },
    {
      id: 4,
      weight: 28,
      icon: 'terminal',
      color: 'orange',
      topics: [
        { id: '4.1', order: 1 },
        { id: '4.2', order: 2 },
        { id: '4.3', order: 3 },
        { id: '4.4', order: 4 },
        { id: '4.5', order: 5 },
        { id: '4.6', order: 6 },
        { id: '4.7', order: 7 },
        { id: '4.8', order: 8 },
        { id: '4.9', order: 9 },
      ],
    },
    {
      id: 5,
      weight: 17,
      icon: 'gavel',
      color: 'purple',
      topics: [
        { id: '5.1', order: 1 },
        { id: '5.2', order: 2 },
        { id: '5.3', order: 3 },
        { id: '5.4', order: 4 },
        { id: '5.5', order: 5 },
        { id: '5.6', order: 6 },
      ],
    },
  ],
} as const;

// Helper to get section by ID
export function getSection(id: number) {
  return SECURITY_PLUS_SYLLABUS.sections.find(s => s.id === id);
}

// Helper to get topic by ID
export function getTopic(topicId: string) {
  const sectionId = parseInt(topicId.split('.')[0]);
  const section = getSection(sectionId);
  return section?.topics.find(t => t.id === topicId);
}
```

---

## ✅ Checklist לסוכן הפיתוח

### לכל קומפוננטה חדשה:

- [ ] השתמש ב-TypeScript strict
- [ ] הוסף תרגומים ל-en.json ו-he.json
- [ ] השתמש ב-`t()` לכל טקסט
- [ ] תמוך ב-RTL (השתמש ב-`start`/`end` במקום `left`/`right`)
- [ ] קרא נתוני משתמש מ-useAuth()
- [ ] קרא התקדמות מ-useProgress()
- [ ] בדוק הרשאות (isAdmin) לפני הצגת תוכן Admin

### לכל דף חדש:

- [ ] הוסף ל-router
- [ ] עטוף ב-ProtectedRoute או AdminRoute
- [ ] הוסף ניווט (breadcrumbs, back button)
- [ ] הוסף loading state
- [ ] הוסף error handling
- [ ] וודא responsive design

### RTL Tips:

```css
/* במקום */
margin-left: 1rem;
/* השתמש ב */
margin-inline-start: 1rem;

/* במקום */
text-align: left;
/* השתמש ב */
text-align: start;

/* במקום */
padding-left: 1rem;
padding-right: 2rem;
/* השתמש ב */
padding-inline-start: 1rem;
padding-inline-end: 2rem;
```

---

## 📁 מבנה תיקיות מומלץ

```
src/
├── components/
│   ├── ui/              # Atoms (Button, Card, etc.)
│   ├── layout/          # AppLayout, Header, Sidebar
│   ├── auth/            # ProtectedRoute, LoginForm
│   ├── dashboard/       # Dashboard-specific
│   ├── learning/        # Lesson components
│   ├── quiz/            # Quiz components
│   ├── flashcards/      # Flashcard components
│   ├── simulation/      # Simulation components
│   └── admin/           # Admin-only components
│
├── pages/
│   ├── public/          # Welcome, Login, 404
│   ├── user/            # Dashboard, Lessons, etc.
│   └── admin/           # Admin pages
│
├── hooks/
│   ├── useAuth.ts
│   ├── useProgress.ts
│   ├── useLocalStorage.ts
│   └── useDirection.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── ProgressContext.tsx
│
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       └── he.json
│
├── data/
│   ├── syllabus.ts
│   ├── questions/
│   └── flashcards/
│
├── types/
│   ├── user.ts
│   ├── content.ts
│   ├── quiz.ts
│   └── storage.ts
│
├── constants/
│   ├── routes.ts
│   ├── storage.ts
│   └── colors.ts
│
├── utils/
│   ├── storage.ts
│   └── helpers.ts
│
└── routes/
    └── index.tsx
```

---

*מסמך זה הוא ה-Source of Truth לפיתוח CyberGuard Academy*
*עדכון אחרון: פברואר 2026*