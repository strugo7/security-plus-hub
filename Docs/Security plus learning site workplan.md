# 🎯 תכנית עבודה מלאה V2.0
# אתר למידה Security+ & SecOps

## 📋 סיכום מנהלים

| פרט | ערך |
|-----|-----|
| **שם הפרויקט** | Security+ Learning Hub |
| **מטרה** | הכנה ל-CompTIA Security+ SY0-701 + תפקידי SecOps |
| **Stack** | React 18 + TypeScript + Vite + Tailwind |
| **זמן משוער** | 40-60 שעות פיתוח |
| **Deployment** | Vercel / Netlify (חינם) |

---

# 🛠️ חלק א': Technology Stack

## Stack מאושר

```
Frontend Framework:  React 18
Language:           TypeScript (strict mode)
Build Tool:         Vite 5
Styling:            Tailwind CSS 3
Routing:            React Router 6
State Management:   React Context + useReducer
Persistence:        LocalStorage (עטיפה מותאמת)
Icons:              Lucide React
Deployment:         Vercel / Netlify
```

## למה Stack זה?

| בחירה | סיבה |
|-------|------|
| **React** | קומפוננטות חוזרות (Quiz, Cards, Progress) |
| **TypeScript** | מניעת באגים בלוגיקת Quiz ו-State |
| **Vite** | Zero config, HMR מהיר, build קטן |
| **Tailwind** | עיצוב מהיר, RTL support מובנה |
| **Context** | State גלובלי פשוט בלי Redux |

## פקודות התקנה

```bash
# יצירת פרויקט
npm create vite@latest security-plus-hub -- --template react-ts

# התקנת dependencies
cd security-plus-hub
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# הרצה
npm run dev
```

---

# 📁 חלק ב': מבנה הפרויקט

```
security-plus-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                      # Entry point
│   ├── App.tsx                       # Router setup
│   ├── index.css                     # Tailwind imports + RTL
│   │
│   ├── components/                   # Reusable components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── Tabs.tsx
│   │   ├── quiz/
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   ├── QuizResults.tsx
│   │   │   ├── QuizTimer.tsx
│   │   │   └── QuizExplanation.tsx
│   │   ├── flashcards/
│   │   │   ├── Flashcard.tsx
│   │   │   ├── FlashcardDeck.tsx
│   │   │   └── FlashcardControls.tsx
│   │   ├── learning/
│   │   │   ├── TheoryCard.tsx
│   │   │   ├── KeyTerm.tsx
│   │   │   ├── RealWorldExample.tsx
│   │   │   └── CheatSheet.tsx
│   │   └── dashboard/
│   │       ├── ProgressOverview.tsx
│   │       ├── SectionCard.tsx
│   │       ├── StreakCounter.tsx
│   │       ├── WeakAreasWidget.tsx
│   │       └── StudyStats.tsx
│   │
│   ├── pages/                        # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── sections/
│   │   │   ├── SectionLayout.tsx     # Shared layout
│   │   │   ├── Section1.tsx          # General Security Concepts
│   │   │   ├── Section2.tsx          # Threats & Vulnerabilities
│   │   │   ├── Section3.tsx          # Security Architecture
│   │   │   ├── Section4.tsx          # Security Operations
│   │   │   ├── Section5.tsx          # Program Management
│   │   │   └── topics/
│   │   │       ├── Topic_1_1.tsx     # Security Controls
│   │   │       ├── Topic_1_2.tsx     # Security Concepts
│   │   │       └── ...               # All subtopics
│   │   ├── secops/
│   │   │   ├── SecOpsIndex.tsx
│   │   │   ├── SiemBasics.tsx
│   │   │   ├── IncidentResponse.tsx
│   │   │   ├── NetworkSecurity.tsx
│   │   │   ├── EndpointSecurity.tsx
│   │   │   ├── EmailSecurity.tsx
│   │   │   ├── Scripting.tsx
│   │   │   ├── CloudSecurity.tsx
│   │   │   └── MitreAttack.tsx
│   │   ├── practice/
│   │   │   ├── PracticeIndex.tsx
│   │   │   ├── SectionQuiz.tsx
│   │   │   ├── FullExam.tsx
│   │   │   ├── Flashcards.tsx
│   │   │   ├── FailedQuestions.tsx
│   │   │   └── QuickFire.tsx
│   │   └── resources/
│   │       ├── Glossary.tsx
│   │       ├── LearningPaths.tsx
│   │       ├── Tools.tsx
│   │       └── CheatSheets.tsx
│   │
│   ├── context/                      # Global state
│   │   ├── ProgressContext.tsx
│   │   ├── QuizContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                        # Custom hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useQuiz.ts
│   │   ├── useProgress.ts
│   │   ├── useFlashcards.ts
│   │   └── useTimer.ts
│   │
│   ├── data/                         # Static data (JSON)
│   │   ├── questions/
│   │   │   ├── section1.json
│   │   │   ├── section2.json
│   │   │   ├── section3.json
│   │   │   ├── section4.json
│   │   │   ├── section5.json
│   │   │   └── fullExam.json
│   │   ├── flashcards/
│   │   │   ├── section1.json
│   │   │   └── ...
│   │   ├── glossary.json
│   │   └── sections-meta.json
│   │
│   ├── types/                        # TypeScript types
│   │   ├── question.ts
│   │   ├── flashcard.ts
│   │   ├── progress.ts
│   │   ├── section.ts
│   │   └── index.ts
│   │
│   ├── utils/                        # Helper functions
│   │   ├── storage.ts
│   │   ├── scoring.ts
│   │   ├── shuffle.ts
│   │   ├── formatters.ts
│   │   └── spacedRepetition.ts
│   │
│   └── constants/
│       ├── routes.ts
│       ├── colors.ts
│       └── config.ts
│
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

# 📊 חלק ג': TypeScript Types & Schemas

## Question Type

```typescript
// src/types/question.ts

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'multiple-select' | 'drag-drop';

export interface Question {
  id: string;                    // "1.1-001"
  type: QuestionType;
  question: string;
  options: string[];
  correct: number | number[];    // index או מערך לmultiple-select
  explanation: string;
  topic: string;                 // "1.1"
  section: number;               // 1-5
  difficulty: Difficulty;
  tags?: string[];
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number | number[]>;
  score: number;
  startTime: Date;
  endTime?: Date;
  isComplete: boolean;
}

export interface QuizResult {
  quizId: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;             // seconds
  sectionScores: Record<string, number>;
  failedQuestionIds: string[];
}
```

## Flashcard Type

```typescript
// src/types/flashcard.ts

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface Flashcard {
  id: string;                    // "fc-001"
  front: string;
  back: string;
  section: string;               // "1.2"
  tags: string[];
  difficulty: Difficulty;
}

export interface FlashcardProgress {
  cardId: string;
  masteryLevel: MasteryLevel;
  lastReviewed: string;          // ISO date
  nextReview: string;            // ISO date
  correctStreak: number;
  totalReviews: number;
}
```

## Progress Type

```typescript
// src/types/progress.ts

export interface UserProgress {
  // מידע כללי
  startDate: string;
  targetExamDate?: string;
  studyStreak: number;
  lastStudyDate: string;
  totalStudyTime: number;        // minutes
  
  // התקדמות בסקשנים
  sections: {
    [sectionId: string]: {
      completedTopics: string[];
      quizScores: QuizResult[];
      lastAccessed: string;
    };
  };
  
  // שאלות לחזרה
  failedQuestions: string[];     // question IDs
  flaggedQuestions: string[];    // saved for later
  
  // Flashcards
  flashcardProgress: FlashcardProgress[];
  
  // Full Exams
  fullExamResults: QuizResult[];
}
```

## Glossary Type

```typescript
// src/types/glossary.ts

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  hebrewTerm?: string;           // תרגום לעברית
  category: string;              // "Cryptography", "Network", etc.
  relatedTerms?: string[];
  section?: string;              // קשר לסקשן
}
```

## Section Metadata

```typescript
// src/types/section.ts

export interface Topic {
  id: string;                    // "1.1"
  title: string;
  titleHe?: string;
  description: string;
  route: string;
}

export interface Section {
  id: number;                    // 1-5
  title: string;
  titleHe?: string;
  description: string;
  color: string;                 // Tailwind color
  icon: string;                  // Lucide icon name
  weight: number;                // אחוז מהבחינה (15, 22, 18, 28, 17)
  topics: Topic[];
}
```

---

# 🎨 חלק ד': Design System

## Color Palette

```typescript
// src/constants/colors.ts

export const colors = {
  // Base (Dark Theme)
  bg: {
    primary: '#0f172a',      // slate-900
    secondary: '#1e293b',    // slate-800
    card: '#334155',         // slate-700
    hover: '#475569',        // slate-600
  },
  
  text: {
    primary: '#f1f5f9',      // slate-100
    secondary: '#94a3b8',    // slate-400
    muted: '#64748b',        // slate-500
  },
  
  // Section Colors
  sections: {
    1: '#3b82f6',            // blue-500
    2: '#ef4444',            // red-500
    3: '#22c55e',            // green-500
    4: '#f97316',            // orange-500
    5: '#a855f7',            // purple-500
  },
  
  // Status
  status: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#eab308',
    info: '#3b82f6',
  },
  
  // Quiz
  quiz: {
    correct: '#22c55e',
    incorrect: '#ef4444',
    selected: '#3b82f6',
    unselected: '#475569',
  }
};
```

## Tailwind Config

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        section: {
          1: '#3b82f6',
          2: '#ef4444',
          3: '#22c55e',
          4: '#f97316',
          5: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## RTL Support

```css
/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Fira+Code&display=swap');

/* RTL Base */
html {
  direction: rtl;
}

/* LTR for code blocks */
pre, code, .ltr {
  direction: ltr;
  text-align: left;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

/* Dark mode default */
body {
  @apply bg-slate-900 text-slate-100;
}
```

---

# 📚 חלק ה': תוכן הסילבוס המלא

## סדר עדיפויות לפי משקל בבחינה

| עדיפות | Section | משקל | נושאים |
|--------|---------|------|--------|
| 🔴 1 | Section 4: Security Operations | 28% | 9 topics |
| 🔴 2 | Section 2: Threats & Vulnerabilities | 22% | 5 topics |
| 🟡 3 | Section 3: Security Architecture | 18% | 4 topics |
| 🟡 4 | Section 5: Program Management | 17% | 6 topics |
| 🟢 5 | Section 1: General Concepts | 15% | 4 topics |

## Section 1: General Security Concepts (15%)

```
1.1 Security Controls
├── Types: Technical, Managerial, Operational, Physical
├── Categories: Preventive, Deterrent, Detective, Corrective
├── Compensating & Directive controls
└── Control frameworks: NIST, ISO 27001, CIS

1.2 Security Concepts
├── CIA Triad: Confidentiality, Integrity, Availability
├── AAA: Authentication, Authorization, Accounting
├── Non-repudiation, Gap analysis
├── Zero Trust Architecture
└── Physical security elements

1.3 Change Management
├── Business processes: Approval, ownership
├── Technical implications: Dependencies
├── Documentation requirements
└── Change types: Standard, Normal, Emergency

1.4 Cryptographic Solutions
├── PKI: CA, RA, certificates, key management
├── Symmetric: AES, DES, 3DES, Blowfish
├── Asymmetric: RSA, ECC, DH
├── Hashing: MD5, SHA-1, SHA-256, HMAC
├── Digital signatures
├── Key exchange protocols
└── Blockchain basics, Steganography
```

## Section 2: Threats, Vulnerabilities, Mitigations (22%)

```
2.1 Threat Actors
├── Types: Nation-state, Hacktivists, Insiders
├── Organized crime, Script kiddies
├── Attributes: Sophistication, resources
└── Motivations: Financial, espionage, disruption

2.2 Threat Vectors & Attack Surfaces
├── Message-based: Email, SMS, IM
├── File-based: USB, malicious attachments
├── Human vectors: Social engineering, phishing
├── Supply chain attacks
├── Wireless, Bluetooth
└── Cloud & API vectors

2.3 Types of Vulnerabilities
├── Application: Buffer overflow, injection
├── Memory: Use after free, race conditions
├── Web: XSS, SQLi, CSRF, SSRF
├── OS: Zero-day, unpatched
├── Hardware: Firmware, side-channel
└── Misconfiguration, default credentials

2.4 Indicators of Malicious Activity
├── Malware: Virus, worm, trojan, ransomware
├── Rootkits, spyware, keyloggers
├── Network: DDoS, DNS poisoning, ARP spoof
├── Man-in-the-Middle, replay attacks
└── Behavioral indicators: impossible travel

2.5 Mitigation Techniques
├── Segmentation, isolation
├── Access control, least privilege
├── Patching, configuration management
├── Encryption, monitoring
└── Security awareness training
```

## Section 3: Security Architecture (18%)

```
3.1 Architecture Models
├── Cloud: IaaS, PaaS, SaaS
├── Deployment: Public, private, hybrid
├── Serverless, microservices
├── Containerization: Docker, Kubernetes
├── SDN, SASE, Edge computing
└── IoT architecture

3.2 Applying Security Principles
├── Infrastructure placement
├── Security zones, DMZ
├── Secure protocols: HTTPS, SFTP, LDAPS
├── Network security: VLANs, ACLs, NAC
├── Wireless: WPA3, EAP, RADIUS
└── Load balancing, reverse proxy

3.3 Protecting Data
├── Classifications: Public, private, sensitive
├── Data states: At rest, in transit, in use
├── Data sovereignty, geolocation
├── DLP implementation
├── Encryption methods
├── Tokenization, masking
└── Rights management

3.4 Resiliency and Recovery
├── High availability: Clustering, failover
├── Load balancing strategies
├── Site types: Hot, warm, cold
├── Backup: Full, incremental, differential
├── Snapshots, replication
└── Testing: Tabletop, simulation, failover
```

## Section 4: Security Operations (28%) ⭐ העדיפות הגבוהה ביותר

```
4.1 Security Techniques
├── Hardening: OS, applications, endpoints
├── Secure baselines, imaging
├── Wireless security implementation
├── Application security
└── Sandboxing, input validation

4.2 Asset Management
├── Acquisition, procurement
├── Assignment, classification
├── Monitoring, tracking
├── Disposal, decommissioning
└── CMDB, inventory management

4.3 Vulnerability Management
├── Scanning: Credentialed, non-credentialed
├── SAST, DAST, IAST
├── Penetration testing
├── CVE, CVSS scoring
├── Prioritization, remediation
└── Exceptions, risk acceptance

4.4 Security Monitoring
├── SIEM implementation
├── Log management, aggregation
├── Alert configuration
├── True/false positives
└── Reporting, dashboards

4.5 Enterprise Security
├── Firewall: NGFW, WAF, UTM
├── IDS/IPS deployment
├── Proxies, reverse proxies
├── Load balancers
├── VPN: Site-to-site, remote access
├── Email gateways
└── DLP, NAC

4.6 Identity and Access Management
├── Provisioning, deprovisioning
├── Identity lifecycle
├── SSO, federation
├── MFA implementations
├── Passwordless authentication
├── RBAC, ABAC, MAC, DAC
└── PAM, identity governance

4.7 Automation and Orchestration
├── Use cases: Provisioning, escalation
├── Playbooks, runbooks
├── SOAR platforms
├── Scripting for security
└── API integration

4.8 Incident Response
├── Phases: Preparation, Detection
├── Containment, Eradication
├── Recovery, Lessons learned
├── Digital forensics
├── Evidence collection
├── Chain of custody
└── Root cause analysis

4.9 Security Data Sources
├── Log types: Firewall, application, OS
├── Network logs, flow data
├── SIEM correlation
├── Threat intelligence feeds
├── Vulnerability databases
└── Dark web monitoring
```

## Section 5: Security Program Management (17%)

```
5.1 Security Governance
├── Policies, standards, procedures
├── Guidelines, baselines
├── Governance structures
├── Roles and responsibilities
└── External regulations

5.2 Risk Management
├── Risk types: Strategic, operational
├── Qualitative analysis
├── Quantitative analysis
├── Risk response: Accept, mitigate, transfer, avoid
├── BIA: RTO, RPO, MTTR, MTBF
└── Risk register

5.3 Third-party Risk
├── Vendor assessment
├── Supply chain security
├── Due diligence
├── Contracts, SLAs
├── Vendor monitoring
└── Offboarding

5.4 Security Compliance
├── GDPR, HIPAA, PCI-DSS
├── SOX, FERPA, CCPA
├── Privacy requirements
├── Data handling
└── Consequences of non-compliance

5.5 Audits and Assessments
├── Internal vs external audits
├── Penetration testing types
├── Vulnerability assessments
├── Attestation, certification
└── Audit findings, remediation

5.6 Security Awareness
├── Training methods: CBT, gamification
├── Phishing simulations
├── Reporting mechanisms
├── Metrics, effectiveness
└── Culture development
```

---

# 🔧 חלק ו': מודול SecOps מלא (8 תחומים)

## 1. SIEM Basics

```
נושאים:
├── SOC Tiers (L1, L2, L3)
├── SIEM Architecture
├── Log Sources & Parsing
├── Normalization
├── Correlation Rules
├── Alert Triage
├── Use Cases

תרגול:
├── Splunk Fundamentals
├── ELK Stack setup
├── Writing SPL queries
├── Creating dashboards
└── Alert configuration

כלים: Splunk, ELK, Azure Sentinel, QRadar
```

## 2. Incident Response

```
נושאים:
├── IR Lifecycle
├── Playbooks & Runbooks
├── Containment strategies
├── Evidence collection
├── Chain of custody
├── Reporting
└── Post-incident review

תרגול:
├── Phishing response playbook
├── Malware containment
├── Ransomware response
└── Documentation templates
```

## 3. Network Security

```
נושאים:
├── Firewall Configuration
├── UTM Setup
├── IPS/IDS Rules
├── WAF Policies
├── VPN Configuration
├── Network Segmentation
└── Traffic Analysis

כלים:
├── pfSense / OPNsense
├── FortiGate
├── Snort / Suricata
├── Wireshark
└── Zeek

תרגול:
├── Firewall rule creation
├── VPN site-to-site setup
├── PCAP analysis
└── IDS signature writing
```

## 4. Endpoint Security

```
נושאים:
├── EDR vs AV
├── Behavioral analysis
├── Threat hunting
├── Memory forensics
├── Incident containment
└── Endpoint hardening

כלים:
├── CrowdStrike Falcon
├── SentinelOne
├── Microsoft Defender ATP
├── Carbon Black
└── Velociraptor

תרגול:
├── Alert investigation
├── IOC hunting
├── Process analysis
└── Containment actions
```

## 5. Email Security

```
נושאים:
├── Mail Flow Architecture
├── MTA/MDA concepts
├── SPF, DKIM, DMARC
├── Anti-spam filtering
├── Anti-phishing
├── Safe Links/Attachments
├── Email headers analysis
└── BEC detection

תרגול:
├── DNS record configuration
├── Header analysis
├── Phishing email triage
├── O365 Security setup
└── Quarantine management
```

## 6. Scripting & Automation

```
PowerShell:
├── Cmdlets בסיסיים
├── Working with Event Logs
├── AD queries
├── Security automation
├── Remote management
└── Scheduled tasks

Regex:
├── Pattern matching
├── Log parsing
├── Data extraction
├── SIEM query optimization
└── Validation patterns

Python (בסיסי):
├── API integration
├── Log parsing
├── Automation scripts
└── Threat intel processing
```

## 7. Cloud Security

```
Azure:
├── Azure AD Security
├── Defender for Cloud
├── Network Security Groups
├── Key Vault
├── Sentinel SIEM
└── Conditional Access

AWS:
├── IAM Best Practices
├── Security Groups
├── CloudTrail
├── GuardDuty
├── Security Hub
└── KMS

General:
├── Shared responsibility model
├── Cloud misconfigurations
├── CSPM tools
└── Cloud forensics
```

## 8. MITRE ATT&CK Framework

```
נושאים:
├── 14 Tactics overview
├── Techniques & Sub-techniques
├── Mapping real attacks
├── Detection strategies
├── ATT&CK Navigator
├── Threat intelligence
└── Purple teaming basics

תרגול:
├── זיהוי TTPs בלוגים
├── Detection rule creation
├── Attack simulation mapping
└── Coverage analysis
```

---

# 📖 חלק ז': משאבי למידה מומלצים

## לפי תחום

### Security+ (הסמכה)
| משאב | שפה | סוג | קישור |
|------|-----|-----|--------|
| Professor Messer | EN | Video | professormesser.com |
| Jason Dion | EN | Udemy | udemy.com |
| CompTIA CertMaster | EN | Official | comptia.org |
| Cybrary | EN | Video | cybrary.it |
| ExamCompass | EN | Practice | examcompass.com |

### SOC & SIEM
| משאב | שפה | סוג |
|------|-----|-----|
| Splunk Fundamentals | EN | Free course |
| LetsDefend | EN | Platform |
| Blue Team Level 1 | EN | Certification |
| CyberDefenders | EN | Labs |

### Networking & Firewall
| משאב | שפה | סוג |
|------|-----|-----|
| Fortinet NSE | EN | Free certs |
| Cisco NetAcad | EN | Courses |
| pfSense Docs | EN | Documentation |
| NetworkChuck | EN | YouTube |

### Scripting
| משאב | שפה | סוג |
|------|-----|-----|
| RegexOne | EN | Interactive |
| Regex101 | EN | Tool |
| PowerShell in a Month | EN | Book/Video |
| Microsoft Learn | EN | Official |

### Cloud Security
| משאב | שפה | סוג |
|------|-----|-----|
| Azure Fundamentals | EN | Free path |
| AWS Security | EN | Free path |
| Google Cloud Security | EN | Courses |

---

# ⏱️ חלק ח': Phases ותזמונים

## סדר פיתוח

```
Phase 1: Project Setup & Infrastructure     ~3 שעות
Phase 2: Core Components                    ~4 שעות
Phase 3: Dashboard & Navigation             ~4 שעות
Phase 4: Quiz Engine                        ~5 שעות
Phase 5: Section 4 (28% - Priority)         ~6 שעות
Phase 6: Section 2 (22%)                    ~5 שעות
Phase 7: Sections 3, 5, 1                   ~8 שעות
Phase 8: Flashcards System                  ~4 שעות
Phase 9: Full Exam Simulation               ~4 שעות
Phase 10: SecOps Module                     ~8 שעות
Phase 11: Glossary & Resources              ~3 שעות
Phase 12: Testing & Polish                  ~4 שעות
─────────────────────────────────────────────
Total:                                      ~58 שעות
```

---

## Phase 1: Project Setup & Infrastructure

**זמן משוער: 3 שעות**

```
משימות:
1. npm create vite@latest security-plus-hub -- --template react-ts
2. התקנת dependencies:
   - react-router-dom
   - lucide-react
   - tailwindcss + postcss + autoprefixer
3. הגדרת Tailwind config עם הצבעים המותאמים
4. יצירת מבנה התיקיות המלא
5. הגדרת RTL ב-index.css
6. יצירת TypeScript types (כל הקבצים ב-types/)
7. יצירת constants (routes, colors, config)

Output:
├── פרויקט React עובד
├── Tailwind מוגדר
├── Types מוכנים
└── מבנה תיקיות מלא
```

## Phase 2: Core UI Components

**זמן משוער: 4 שעות**

```
משימות:
1. Button component (variants: primary, secondary, ghost, danger)
2. Card component (with header, body, footer slots)
3. Badge component (difficulty, status)
4. ProgressBar component (animated, with percentage)
5. Tooltip component
6. Modal component
7. Accordion component
8. Tabs component

דגשים:
- כל קומפוננטה עם TypeScript props
- Tailwind לעיצוב
- תמיכה ב-RTL
- Hover/focus states

Output:
└── src/components/ui/ מלא ומוכן לשימוש
```

## Phase 3: Dashboard & Navigation

**זמן משוער: 4 שעות**

```
משימות:
1. Layout component (Header, Sidebar, Main, Footer)
2. Header: לוגו, ניווט ראשי, progress mini-display
3. Sidebar: ניווט sections, SecOps, Practice, Resources
4. Dashboard page:
   - ProgressOverview (כללי)
   - SectionCards (5 כרטיסים עם progress)
   - StreakCounter
   - WeakAreasWidget
   - RecentActivity
5. React Router setup עם כל ה-routes

Output:
├── Dashboard עובד
├── ניווט מלא
└── Responsive layout
```

## Phase 4: Quiz Engine

**זמן משוער: 5 שעות**

```
משימות:
1. useQuiz hook:
   - loadQuestions(sectionId | 'full')
   - shuffleQuestions()
   - submitAnswer()
   - calculateScore()
   - getResults()
   
2. QuizQuestion component:
   - הצגת שאלה
   - 4 אפשרויות (A, B, C, D)
   - סימון תשובה
   - Feedback (correct/incorrect)
   - Explanation modal
   
3. QuizProgress component:
   - Progress bar
   - Question counter (15/20)
   - Score live
   
4. QuizTimer component:
   - Countdown או Countup
   - Warning at 10 minutes
   
5. QuizResults component:
   - Final score
   - Breakdown by topic
   - Failed questions list
   - "Review" ו-"Retry" buttons
   
6. QuizContext:
   - Global quiz state
   - Save to localStorage on completion

Output:
├── מערכת Quiz מלאה
├── תמיכה ב-section quiz ו-full exam
└── שמירת תוצאות
```

## Phase 5: Section 4 - Security Operations (Priority!)

**זמן משוער: 6 שעות**

```
משימות:
1. Section4.tsx - עמוד ראשי עם overview
2. 9 Topic pages (4.1 - 4.9):
   - TheoryCards לכל נושא
   - KeyTerms עם tooltips
   - RealWorldExample
   - QuickQuiz (5 שאלות)
   - Navigation (prev/next)
   
3. data/questions/section4.json:
   - מינימום 30 שאלות
   - מכסה את כל 9 הנושאים
   - קשיים מעורבים
   
4. Section4 CheatSheet

דגשים:
- זה 28% מהבחינה!
- תוכן מעמיק
- דוגמאות מעשיות

Output:
├── Section 4 מלא
├── 30+ שאלות
└── CheatSheet
```

## Phase 6: Section 2 - Threats & Vulnerabilities

**זמן משוער: 5 שעות**

```
משימות:
1. Section2.tsx
2. 5 Topic pages (2.1 - 2.5)
3. data/questions/section2.json (25+ שאלות)
4. Section2 CheatSheet

Output:
├── Section 2 מלא
├── 25+ שאלות
└── CheatSheet
```

## Phase 7: Sections 3, 5, 1

**זמן משוער: 8 שעות**

```
Section 3 (18%): ~3 שעות
├── 4 Topic pages
├── 20+ שאלות
└── CheatSheet

Section 5 (17%): ~3 שעות
├── 6 Topic pages
├── 20+ שאלות
└── CheatSheet

Section 1 (15%): ~2 שעות
├── 4 Topic pages
├── 15+ שאלות
└── CheatSheet
```

## Phase 8: Flashcards System

**זמן משוער: 4 שעות**

```
משימות:
1. useFlashcards hook:
   - loadDeck(sectionId | 'all')
   - flipCard()
   - rateCard('easy' | 'medium' | 'hard')
   - getNextCard() - Spaced Repetition
   - getProgress()
   
2. Flashcard component:
   - Flip animation (CSS 3D transform)
   - Front/Back display
   - Rating buttons
   
3. FlashcardDeck component:
   - Deck selection
   - Progress display
   - Shuffle button
   
4. spacedRepetition.ts utility:
   - SM-2 algorithm בסיסי
   - Calculate next review date
   
5. flashcards JSON data:
   - 100+ cards total
   - Organized by section

Output:
├── Flashcards עובדים
├── Spaced Repetition
└── Progress tracking
```

## Phase 9: Full Exam Simulation

**זמן משוער: 4 שעות**

```
משימות:
1. FullExam.tsx page:
   - 90 שאלות
   - 90 דקות timer
   - NO immediate feedback
   - Review all answers before submit
   
2. Exam intro screen:
   - Rules
   - Time limit
   - Passing score (750/900)
   - Start button
   
3. Exam results page:
   - Final score
   - Pass/Fail status
   - Breakdown by section
   - Comparison to passing score
   - Recommendations
   
4. FailedQuestions.tsx:
   - List all failed questions
   - Filter by section
   - "Practice these" button
   - Mark as "reviewed"

Output:
├── Full exam simulation
├── 90 שאלות מעורבות
├── Failed questions review
└── Detailed analytics
```

## Phase 10: SecOps Module

**זמן משוער: 8 שעות**

```
משימות:
1. SecOpsIndex.tsx - overview page
2. 8 Topic pages:
   - SiemBasics.tsx
   - IncidentResponse.tsx
   - NetworkSecurity.tsx
   - EndpointSecurity.tsx
   - EmailSecurity.tsx
   - Scripting.tsx
   - CloudSecurity.tsx
   - MitreAttack.tsx
   
3. לכל עמוד:
   - תיאוריה
   - כלים מומלצים
   - Hands-on lab instructions
   - Commands cheatsheet
   - Interview questions

Output:
├── 8 עמודי SecOps
├── Lab instructions
└── Tool references
```

## Phase 11: Glossary & Resources

**זמן משוער: 3 שעות**

```
משימות:
1. Glossary.tsx:
   - A-Z index
   - Search functionality
   - Category filter
   - Hebrew translations
   
2. data/glossary.json:
   - 200+ terms
   - Categories: Network, Crypto, Threats, etc.
   
3. LearningPaths.tsx:
   - Recommended courses
   - Study schedules
   - Certification roadmap
   
4. Tools.tsx:
   - Security tools list
   - Free resources
   - Lab environments

Output:
├── Glossary עם חיפוש
├── 200+ מונחים
└── Resources pages
```

## Phase 12: Testing & Polish

**זמן משוער: 4 שעות**

```
משימות:
1. Cross-browser testing
2. Mobile responsiveness
3. RTL verification
4. LocalStorage edge cases
5. Performance optimization
6. Error boundaries
7. Loading states
8. Empty states
9. Final styling tweaks
10. Build & deploy

Output:
├── Bug-free site
├── Optimized build
└── Deployed to Vercel
```

---

# ✅ חלק ט': Checklist סופי

## תוכן
- [ ] Section 1: 4 topics + 15 questions + cheatsheet
- [ ] Section 2: 5 topics + 25 questions + cheatsheet
- [ ] Section 3: 4 topics + 20 questions + cheatsheet
- [ ] Section 4: 9 topics + 30 questions + cheatsheet
- [ ] Section 5: 6 topics + 20 questions + cheatsheet
- [ ] Full Exam: 90 questions
- [ ] Flashcards: 100+ cards
- [ ] Glossary: 200+ terms
- [ ] SecOps: 8 complete modules

## פיצ'רים
- [ ] Quiz engine עובד
- [ ] Flashcards עם spaced repetition
- [ ] Full exam simulation
- [ ] Failed questions review
- [ ] Progress tracking
- [ ] Streak counter
- [ ] Weak areas detection
- [ ] Glossary search
- [ ] CheatSheets

## טכני
- [ ] TypeScript strict mode
- [ ] No console errors
- [ ] Responsive (mobile-first)
- [ ] RTL support
- [ ] LocalStorage persistence
- [ ] Fast load times
- [ ] Works offline (basics)

## UX
- [ ] Clear navigation
- [ ] Immediate quiz feedback
- [ ] Progress visualization
- [ ] Accessibility basics
- [ ] Dark mode default

---

# 🚀 פקודה ראשונה לסוכן

```
צור פרויקט React + TypeScript + Vite חדש בשם "security-plus-hub".

התקן:
- react-router-dom
- lucide-react
- tailwindcss + postcss + autoprefixer

הגדר:
1. Tailwind עם הצבעים מה-Design System (sections 1-5, dark theme)
2. RTL support ב-index.css
3. מבנה התיקיות המלא לפי תכנית העבודה
4. כל קבצי ה-Types (question.ts, flashcard.ts, progress.ts, section.ts, glossary.ts)
5. קבצי Constants (routes.ts, colors.ts, config.ts)

אל תבנה עדיין קומפוננטות - רק את התשתית.
```

---

# 📝 הערות נוספות לסוכן

## Content Strategy

אם NotebookLM לא זמין:
1. צור placeholder content מובנה
2. השתמש בתוכן מה-markdown workplan
3. סמן מקומות שצריכים תוכן אמיתי עם TODO

## JSON Data

התחל עם מינימום:
- 5 שאלות לכל topic
- 10 flashcards לכל section
- 50 glossary terms

נרחיב אחר כך.

## מה לא לעשות

- ❌ אל תשתמש ב-Redux (overkill)
- ❌ אל תוסיף backend/database
- ❌ אל תשתמש ב-UI library (MUI, Chakra)
- ❌ אל תוסיף authentication

## מה כן לעשות

- ✅ TypeScript strict
- ✅ Components קטנים וממוקדים
- ✅ Custom hooks לכל לוגיקה
- ✅ Tailwind לכל העיצוב
- ✅ LocalStorage wrapper מסודר

---

*תכנית עבודה V2.0 - מעודכנת עם React/TypeScript Stack*
*נוצר: 2025*