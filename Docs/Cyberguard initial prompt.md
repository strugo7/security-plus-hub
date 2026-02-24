# 🚀 CyberGuard Academy - Initial Agent Prompt

## פרומפט ראשוני לסוכן הפיתוח

---

## 📋 העתק את הפרומפט הבא והדבק לסוכן:

---

# Project Onboarding: CyberGuard Academy

## 🎯 Project Overview

You are now the lead developer for **CyberGuard Academy** - an interactive learning platform for CompTIA Security+ (SY0-701) certification preparation.

### Project Goals
1. Help users prepare for the Security+ certification exam
2. Provide interactive learning experiences (lessons, quizzes, flashcards, simulations)
3. Track individual user progress with LocalStorage
4. Support both Hebrew (RTL) and English (LTR) interfaces
5. Differentiate between regular users and admins

### Tech Stack
```
- React 18 + TypeScript (strict mode)
- Vite 5
- Tailwind CSS 3
- React Router 6
- i18next (for translations)
- LocalStorage (for data persistence)
- Deployed on Vercel
```

---

## 📚 Reference Documents

I have prepared three comprehensive documents that you MUST read and follow:

### 1. CYBERGUARD_DEVELOPMENT_GUIDE.md (PRIMARY)
This is your **Source of Truth**. It contains:
- Complete routing configuration
- i18n setup with en.json and he.json translations
- LocalStorage schema and hooks
- User vs Admin role differences
- Examples of converting static HTML to dynamic React
- RTL support guidelines
- Development checklist

### 2. CYBERGUARD_SYSTEM_ARCHITECTURE.md
Technical reference containing:
- Full TypeScript interfaces for all entities
- State management (React Context)
- Component structure
- Design system (colors, typography)

### 3. CYBERGUARD_NAVIGATION_MAP.md
Visual reference containing:
- User flow diagrams
- Page-to-page connections
- State machines for Quiz and Flashcards
- Data dependencies

---

## 🎨 Design Source Files

The project includes **15+ HTML design files** that represent the visual design. These are located in the project files:

| File | Purpose |
|------|---------|
| `Page_1_*.html` | Welcome/Landing page |
| `Page_2_*.html` | Loading screen |
| `Page_3_*.html` | Dashboard |
| `Page_3_1_*.html` | Section page |
| `Page_3_2_*.html` | Lesson page |
| `Page_3_2_1_*.html` | Lesson editor (Admin) |
| `Page_5_*.html` | Flashcards manager |
| `Page_5_1_*.html` | Flashcard study |
| `Page_6_*.html` | Exam interface |
| `Page_6_1_*.html` | Exam builder (Admin) |
| `Page_6_2_*.html` | Question bank (Admin) |
| `Page_6_3_*.html` | Question analysis (Admin) |
| `Page_8_*.html` | Notes archive |
| `Page_9_*.html` | Attack simulation |
| `Page_9_1_*.html` | Simulation report |
| `Page_10_*.html` | User profile |
| `404_Page.html` | 404 error page |

**Your job**: Convert these static HTML files into dynamic React components while:
- Preserving the exact visual design (Tailwind classes, layout, colors)
- Making content dynamic (user data, progress, translations)
- Adding interactivity (state management, navigation)

---

## 🔄 How We Work Together

### Development Workflow

```
1. I will request a feature or page
2. You will:
   a. Read the relevant HTML design file
   b. Reference the Development Guide for specifications
   c. Create React component(s) with TypeScript
   d. Include i18n translations (both en and he)
   e. Add necessary hooks and state management
   f. Ensure RTL support
3. I will review and request changes if needed
4. Repeat
```

### Code Standards

When writing code, ALWAYS:

1. **Use TypeScript strict mode**
   ```typescript
   // ✅ Good
   interface Props {
     title: string;
     onClose: () => void;
   }
   
   // ❌ Bad
   function Component(props: any) { ... }
   ```

2. **Use translations for ALL text**
   ```tsx
   // ✅ Good
   const { t } = useTranslation();
   <h1>{t('dashboard.welcomeBack', { name: user.name })}</h1>
   
   // ❌ Bad
   <h1>Welcome back, {user.name}</h1>
   ```

3. **Support RTL (use logical properties)**
   ```css
   /* ✅ Good */
   margin-inline-start: 1rem;
   padding-inline-end: 2rem;
   text-align: start;
   
   /* ❌ Bad */
   margin-left: 1rem;
   padding-right: 2rem;
   text-align: left;
   ```

4. **Get user data from hooks**
   ```tsx
   // ✅ Good
   const { user, isAdmin } = useAuth();
   const { progress } = useProgress();
   
   // ❌ Bad
   const user = { name: 'Alex', role: 'admin' }; // hardcoded
   ```

5. **Check roles before rendering admin content**
   ```tsx
   // ✅ Good
   {isAdmin && <AdminPanel />}
   
   // ❌ Bad
   <AdminPanel /> // visible to everyone
   ```

6. **Preserve the original design exactly**
   - Copy Tailwind classes from HTML files
   - Keep the same color scheme
   - Maintain spacing and layout
   - Use the same icons (Material Symbols)

---

## 📁 Project Structure

Follow this structure when creating files:

```
src/
├── components/
│   ├── ui/              # Button, Card, Badge, etc.
│   ├── layout/          # AppLayout, Header, Sidebar
│   ├── auth/            # ProtectedRoute, LoginForm
│   ├── dashboard/       # WelcomeCard, SectionGrid
│   ├── learning/        # LessonContent, LessonSidebar
│   ├── quiz/            # QuizQuestion, QuizTimer
│   ├── flashcards/      # FlashcardViewer, DeckList
│   ├── simulation/      # SimulationWorkspace
│   └── admin/           # ExamBuilder, QuestionEditor
│
├── pages/
│   ├── public/          # WelcomePage, LoginPage
│   ├── user/            # DashboardPage, LessonPage
│   └── admin/           # QuestionBankPage
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
├── types/
│   └── *.ts
│
└── routes/
    └── index.tsx
```

---

## 🎓 Security+ Content Structure

The platform covers 5 exam domains with 28 topics total:

```
Section 1: General Security Concepts (15%)
├── 1.1 Security Controls
├── 1.2 Security Concepts
├── 1.3 Change Management
└── 1.4 Cryptographic Solutions

Section 2: Threats, Vulnerabilities & Mitigations (22%)
├── 2.1 Threat Actors
├── 2.2 Threat Vectors and Attack Surfaces
├── 2.3 Types of Vulnerabilities
├── 2.4 Indicators of Malicious Activity
└── 2.5 Mitigation Techniques

Section 3: Security Architecture (18%)
├── 3.1 Architecture Models
├── 3.2 Applying Security Principles
├── 3.3 Protecting Data
└── 3.4 Resiliency and Recovery

Section 4: Security Operations (28%)
├── 4.1 Security Techniques
├── 4.2 Asset Management
├── 4.3 Vulnerability Management
├── 4.4 Security Monitoring
├── 4.5 Enterprise Security
├── 4.6 Identity and Access Management
├── 4.7 Automation and Orchestration
├── 4.8 Incident Response
└── 4.9 Security Data Sources

Section 5: Security Program Management (17%)
├── 5.1 Security Governance
├── 5.2 Risk Management
├── 5.3 Third-party Risk
├── 5.4 Security Compliance
├── 5.5 Audits and Assessments
└── 5.6 Security Awareness
```

---

## ✅ Ready to Start

Please confirm you understand the project by:

1. Summarizing the main goals of CyberGuard Academy
2. Listing the key technical requirements (i18n, RTL, LocalStorage, roles)
3. Explaining how you'll convert HTML designs to React components

Once confirmed, I'll give you the first development task.

---

## 🚦 First Task Preview

After you confirm understanding, your first task will be:

**Set up the project infrastructure:**
1. Configure i18next with the translation files
2. Create the useLocalStorage and useAuth hooks
3. Set up the router with protected routes
4. Create the base layout components (AppLayout, Header)

Let's build something great! 🚀

---

# סוף הפרומפט

---

## 💡 טיפים לשימוש

### לפני שליחת הפרומפט:
1. העלה את 3 קבצי ה-MD לפרויקט או לשיחה
2. ודא שקבצי ה-HTML נגישים לסוכן

### אחרי שליחת הפרומפט:
1. חכה לאישור הבנה מהסוכן
2. התחל עם משימות קטנות (infrastructure first)
3. בדוק כל קומפוננטה לפני שממשיכים

### משימות מומלצות לפי סדר:
```
1. Infrastructure (i18n, hooks, router)
2. Layout (Header, Sidebar, AppLayout)
3. Auth (Login, ProtectedRoute)
4. Dashboard
5. Section & Lesson pages
6. Quiz system
7. Flashcards
8. Simulations
9. Profile & Notes
10. Admin features
```

---

## 🔄 פרומפטים להמשך

### כשרוצים לבנות דף חדש:
```
Build the [PAGE_NAME] page based on [HTML_FILE].

Requirements:
- Match the design exactly
- Use translations from the i18n files
- Get user data from useAuth()
- Get progress from useProgress()
- Support RTL
- [Any specific requirements]

Reference the DEVELOPMENT_GUIDE.md for specifications.
```

### כשרוצים לתקן בעיה:
```
There's an issue with [COMPONENT]:
[Describe the issue]

Expected behavior:
[What should happen]

Current behavior:
[What's happening now]

Please fix while maintaining:
- TypeScript strict mode
- i18n translations
- RTL support
```

### כשרוצים להוסיף פיצ'ר:
```
Add [FEATURE] to [COMPONENT/PAGE].

Specifications:
- [Spec 1]
- [Spec 2]

Make sure to:
- Add translations to both en.json and he.json
- Update types if needed
- Follow the existing code patterns
```