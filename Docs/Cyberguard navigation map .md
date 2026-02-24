# 🗺️ CyberGuard Academy - Navigation Map

## מפת ניווט וקשרים בין דפים

---

## 🔄 User Flow - זרימת משתמש

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                PUBLIC ZONE                                   │
│                                                                              │
│   ┌─────────────┐                                                           │
│   │   Page 1    │                                                           │
│   │  Welcome    │──────────┐                                                │
│   │   Page      │          │                                                │
│   └─────────────┘          ▼                                                │
│                     ┌─────────────┐       ┌─────────────┐                   │
│                     │   Login/    │──────▶│   Page 2    │                   │
│                     │  Register   │       │  Loading    │                   │
│                     └─────────────┘       └──────┬──────┘                   │
│                                                  │                          │
└──────────────────────────────────────────────────┼──────────────────────────┘
                                                   │
                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            AUTHENTICATED ZONE                                │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         DASHBOARD (Page 3)                           │   │
│   │  ┌──────────────────────────────────────────────────────────────┐   │   │
│   │  │  Welcome Card  │  Resume Card  │  Section Grid (5 cards)     │   │   │
│   │  └──────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                │                    │                    │                   │
│                │                    │                    │                   │
│    ┌───────────┘      ┌─────────────┘      ┌─────────────┘                  │
│    │                  │                    │                                 │
│    ▼                  ▼                    ▼                                 │
│   ┌────────┐    ┌────────────┐     ┌──────────────────┐                     │
│   │Profile │    │ Flashcards │     │  LEARNING PATH   │                     │
│   │Page 10 │    │   Page 5   │     │                  │                     │
│   └────────┘    └────────────┘     │  Section Page    │                     │
│                       │            │    (Page 3.1)    │                     │
│                       ▼            │        │         │                     │
│                 ┌──────────┐       │        ▼         │                     │
│                 │ Flashcard│       │  Lesson Page     │                     │
│                 │  Study   │       │   (Page 3.2)     │                     │
│                 │ Page 5.1 │       │        │         │                     │
│                 └──────────┘       │        ▼         │                     │
│                                    │  Knowledge Check │                     │
│                                    │  (in-lesson)     │                     │
│                                    └──────────────────┘                     │
│                                              │                               │
│            ┌─────────────────────────────────┼───────────────────────┐      │
│            │                                 │                       │      │
│            ▼                                 ▼                       ▼      │
│      ┌──────────┐                     ┌──────────┐           ┌──────────┐   │
│      │   Quiz   │                     │   Exam   │           │Simulation│   │
│      │ Section  │                     │ Page 6   │           │ Page 9   │   │
│      └──────────┘                     └──────────┘           └──────────┘   │
│            │                                 │                       │      │
│            ▼                                 ▼                       ▼      │
│      ┌──────────┐                     ┌──────────┐           ┌──────────┐   │
│      │ Results  │                     │ Results  │           │ Report   │   │
│      │          │                     │          │           │ Page 9.1 │   │
│      └──────────┘                     └──────────┘           └──────────┘   │
│            │                                 │                               │
│            └─────────────┬───────────────────┘                              │
│                          ▼                                                   │
│                   ┌──────────────┐                                          │
│                   │Failed Qs     │                                          │
│                   │Review        │                                          │
│                   └──────────────┘                                          │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          NOTES (Page 8)                              │   │
│   │  Accessible from: Lessons, Profile, Sidebar                          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              ADMIN ZONE                                      │
│                                                                              │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│   │Lesson Editor │    │ Exam Builder │    │Question Bank │                  │
│   │  Page 3.2.1  │    │  Page 6.1    │    │  Page 6.2    │                  │
│   └──────────────┘    └──────────────┘    └──────────────┘                  │
│                              │                    │                          │
│                              └────────┬───────────┘                          │
│                                       ▼                                      │
│                              ┌──────────────┐                                │
│                              │  Question    │                                │
│                              │  Analysis    │                                │
│                              │  Page 6.3    │                                │
│                              └──────────────┘                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📍 Page-to-Page Connections

### From Dashboard (Page 3)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Section Card | Section Page | `/sections/:id` |
| Click "Resume Lesson" | Lesson Page | `/sections/:sectionId/:topicId` |
| Click User Avatar | Profile | `/profile` |
| Click Notifications | Notification Panel | (modal) |
| Click Search | Search Results | (modal) |

### From Section Page (Page 3.1)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Topic | Lesson Page | `/sections/:sectionId/:topicId` |
| Click "Start Quiz" | Section Quiz | `/practice/quiz/:sectionId` |
| Click "Back" | Dashboard | `/dashboard` |

### From Lesson Page (Page 3.2)

| Action | Destination | Route |
|--------|-------------|-------|
| Click "Previous" | Previous Lesson | `/sections/:sectionId/:prevTopicId` |
| Click "Next" | Next Lesson | `/sections/:sectionId/:nextTopicId` |
| Complete Quiz | Show Results | (in-page) |
| Click "Take Notes" | Note Editor | (side panel) |
| Click Sidebar Topic | Another Lesson | `/sections/:sectionId/:topicId` |

### From Exam Page (Page 6)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Question # | Jump to Question | (in-page) |
| Click "Pause" | Pause Modal | (modal) |
| Click "Submit" | Results Page | `/practice/exam/results/:examId` |
| Click "Review All" | Review Mode | (in-page) |

### From Flashcards Manager (Page 5)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Deck | Study Mode | `/flashcards/study/:deckId` |
| Click "Create Card" | Card Editor | `/flashcards/create` |
| Click "Import/Export" | Import Modal | (modal) |

### From Simulation (Page 9)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Attack Type | Load Simulation | (in-page) |
| Click "Run Attack" | Execute | (in-page) |
| Complete Simulation | Report | `/simulations/:simId/report` |
| Click "Reset" | Reset State | (in-page) |

### From Profile (Page 10)

| Action | Destination | Route |
|--------|-------------|-------|
| Click Achievement | Achievement Detail | (modal) |
| Click "Edit Profile" | Edit Modal | (modal) |
| Click Certification | Cert Detail | (modal) |
| Click Activity Item | Relevant Page | (varies) |

---

## 🧭 Global Navigation (Always Available)

### Header Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  Logo │ Search │ Dashboard │ Learning │ Practice │ 🔔 │ Avatar │
└─────────────────────────────────────────────────────────────────┘
        │         │           │           │          │      │
        │         │           │           │          │      └── Profile
        │         │           │           │          └── Notifications
        │         │           │           └── Practice Menu
        │         │           │               ├── Quiz (by section)
        │         │           │               ├── Full Exam
        │         │           │               ├── Flashcards
        │         │           │               └── Simulations
        │         │           └── Learning Menu
        │         │               ├── Section 1
        │         │               ├── Section 2
        │         │               ├── Section 3
        │         │               ├── Section 4
        │         │               └── Section 5
        │         └── Search Modal
        └── Home/Dashboard
```

### Admin Navigation (Role: Admin)

```
┌─────────────────────────────────────────────────────────────────┐
│  Standard Nav... │ Admin ▼                                      │
│                  │ ├── Lesson Manager                           │
│                  │ ├── Question Bank                            │
│                  │ ├── Exam Builder                             │
│                  │ ├── Analytics                                │
│                  │ └── User Management                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔀 State Transitions

### Quiz State Machine

```
                    ┌─────────┐
                    │  IDLE   │
                    └────┬────┘
                         │ startQuiz()
                         ▼
                    ┌─────────┐
        ┌──────────│ ACTIVE  │──────────┐
        │          └────┬────┘          │
        │               │               │
  previousQ()      answerQ()      flagQ()
        │               │               │
        │               ▼               │
        │          ┌─────────┐          │
        └─────────▶│ANSWERED │◀─────────┘
                   └────┬────┘
                        │
              ┌─────────┴─────────┐
              │                   │
         nextQ()            finishQuiz()
              │                   │
              ▼                   ▼
         ┌─────────┐        ┌─────────┐
         │ ACTIVE  │        │COMPLETE │
         │(next Q) │        └────┬────┘
         └─────────┘             │
                                 │ saveResults()
                                 ▼
                           ┌─────────┐
                           │ RESULTS │
                           └─────────┘
```

### Flashcard Study State

```
                    ┌─────────┐
                    │  IDLE   │
                    └────┬────┘
                         │ startStudy()
                         ▼
                    ┌─────────┐
                    │ SHOWING │
                    │  FRONT  │
                    └────┬────┘
                         │ flip()
                         ▼
                    ┌─────────┐
                    │ SHOWING │
                    │  BACK   │
                    └────┬────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
     rateHard()    rateMedium()   rateEasy()
           │             │             │
           └─────────────┼─────────────┘
                         │ updateProgress()
                         ▼
                    ┌─────────┐
                    │  NEXT   │
                    │  CARD   │
                    └────┬────┘
                         │
              ┌──────────┴──────────┐
              │                     │
         hasMore?              allDone?
              │                     │
              ▼                     ▼
         ┌─────────┐          ┌─────────┐
         │ SHOWING │          │COMPLETE │
         │  FRONT  │          └─────────┘
         └─────────┘
```

---

## 📊 Data Dependencies Between Pages

```
┌────────────────────────────────────────────────────────────────┐
│                        USER PROGRESS                            │
│  (Central data store that all pages read/write)                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dashboard ◄────reads────► Section Progress                    │
│      │                          │                               │
│      │                          │                               │
│  Section Page ◄──reads──► Topic Completion                     │
│      │                          │                               │
│      │                          │                               │
│  Lesson Page ──writes──► Lesson Completion                     │
│      │                          │                               │
│      │                          │                               │
│  Quiz/Exam ──writes──► Quiz Results, Failed Questions          │
│      │                          │                               │
│      │                          │                               │
│  Flashcards ──writes──► Flashcard Progress (SM-2)              │
│      │                          │                               │
│      │                          │                               │
│  Profile ◄────reads────► All Progress Data                     │
│                                 │                               │
│                                 │                               │
│  Achievements ◄──computed from──► Progress Thresholds          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Role-Based Page Access

```
┌──────────────────┬──────────────────┬──────────────────┐
│      PAGE        │      USER        │      ADMIN       │
├──────────────────┼──────────────────┼──────────────────┤
│ Welcome          │        ✅        │        ✅        │
│ Login            │        ✅        │        ✅        │
│ Dashboard        │        ✅        │        ✅        │
│ Section Page     │        ✅        │        ✅        │
│ Lesson Page      │        ✅        │        ✅        │
│ Quiz             │        ✅        │        ✅        │
│ Exam             │    ✅ (Pro)      │        ✅        │
│ Flashcards       │        ✅        │        ✅        │
│ Simulations      │    ✅ (Pro)      │        ✅        │
│ Notes            │        ✅        │        ✅        │
│ Profile          │        ✅        │        ✅        │
├──────────────────┼──────────────────┼──────────────────┤
│ Lesson Editor    │        ❌        │        ✅        │
│ Exam Builder     │        ❌        │        ✅        │
│ Question Bank    │        ❌        │        ✅        │
│ Question Analysis│        ❌        │        ✅        │
│ User Management  │        ❌        │        ✅        │
└──────────────────┴──────────────────┴──────────────────┘
```

---

## 🎯 Deep Links (Shareable URLs)

| Purpose | URL Pattern | Example |
|---------|-------------|---------|
| Specific Lesson | `/sections/:s/:t` | `/sections/2/1` (Threat Actors) |
| Section Quiz | `/practice/quiz/:s` | `/practice/quiz/4` |
| Flashcard Deck | `/flashcards/study/:d` | `/flashcards/study/social-eng` |
| Simulation | `/simulations/:id` | `/simulations/sql-injection` |
| Profile | `/profile` | `/profile` |
| Exam Results | `/practice/exam/results/:id` | `/practice/exam/results/abc123` |

---

*Navigation Map for CyberGuard Academy - Security+ Learning Platform*