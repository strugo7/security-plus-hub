// ============================================================================
// CyberGuard Academy - Database Seed
// Initial data: Sections, Topics, Achievements, Admin User
// ============================================================================

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding CyberGuard Academy database...\n');

  // ========================================================================
  // 1. SECTIONS (5 exam domains)
  // ========================================================================
  console.log('📚 Creating Sections...');

  const sections = [
    {
      id: 1,
      title: 'General Security Concepts',
      titleHe: 'מושגי אבטחה כלליים',
      description: 'Compare and contrast various types of security controls, fundamental security principles, and change management.',
      descriptionHe: 'השוואה בין סוגי בקרות אבטחה, עקרונות אבטחה בסיסיים וניהול שינויים.',
      weight: 15,
      icon: 'shield',
      color: 'blue',
      order: 1,
    },
    {
      id: 2,
      title: 'Threats, Vulnerabilities & Mitigations',
      titleHe: 'איומים, פגיעויות והפחתות',
      description: 'Analyze potential indicators to determine the type of attack. Understand actors, vectors, and intelligence sources.',
      descriptionHe: 'ניתוח אינדיקטורים פוטנציאליים לזיהוי סוג ההתקפה. הבנת שחקנים, וקטורים ומקורות מודיעין.',
      weight: 22,
      icon: 'bug_report',
      color: 'red',
      order: 2,
    },
    {
      id: 3,
      title: 'Security Architecture',
      titleHe: 'ארכיטקטורת אבטחה',
      description: 'Implement security implications of different architecture models. Secure enterprise infrastructure and data.',
      descriptionHe: 'יישום השלכות אבטחה של מודלים ארכיטקטוניים שונים. אבטחת תשתית ונתונים ארגוניים.',
      weight: 18,
      icon: 'architecture',
      color: 'green',
      order: 3,
    },
    {
      id: 4,
      title: 'Security Operations',
      titleHe: 'תפעול אבטחה',
      description: 'Apply appropriate incident response procedures. Use data sources to support an investigation.',
      descriptionHe: 'יישום נהלי תגובה לאירועים. שימוש במקורות נתונים לתמיכה בחקירה.',
      weight: 28,
      icon: 'terminal',
      color: 'orange',
      order: 4,
    },
    {
      id: 5,
      title: 'Security Program Management & Oversight',
      titleHe: 'ניהול תוכניות ופיקוח',
      description: 'Summarize elements of effective security governance. Explain risk management processes and compliance.',
      descriptionHe: 'סיכום אלמנטים של ממשל אבטחה אפקטיבי. הסבר תהליכי ניהול סיכונים ותאימות.',
      weight: 17,
      icon: 'gavel',
      color: 'purple',
      order: 5,
    },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where: { id: section.id },
      update: section,
      create: section,
    });
  }
  console.log(`  ✅ ${sections.length} sections created\n`);

  // ========================================================================
  // 2. TOPICS (28 topics across 5 sections)
  // ========================================================================
  console.log('📖 Creating Topics...');

  const topics = [
    // Section 1: General Security Concepts (15%)
    { id: '1.1', sectionId: 1, title: 'Security Controls', titleHe: 'בקרות אבטחה', description: 'Types: Technical, Managerial, Operational, Physical. Categories: Preventive, Deterrent, Detective, Corrective.', order: 1 },
    { id: '1.2', sectionId: 1, title: 'Security Concepts', titleHe: 'מושגי אבטחה', description: 'CIA Triad, AAA, Non-repudiation, Gap analysis, Zero Trust Architecture.', order: 2 },
    { id: '1.3', sectionId: 1, title: 'Change Management', titleHe: 'ניהול שינויים', description: 'Business processes, Technical implications, Documentation requirements, Change types.', order: 3 },
    { id: '1.4', sectionId: 1, title: 'Cryptographic Solutions', titleHe: 'פתרונות קריפטוגרפיים', description: 'PKI, Symmetric/Asymmetric encryption, Hashing, Digital signatures, Key exchange.', order: 4 },

    // Section 2: Threats, Vulnerabilities & Mitigations (22%)
    { id: '2.1', sectionId: 2, title: 'Threat Actors', titleHe: 'שחקני איום', description: 'Nation-state, Hacktivists, Insiders, Organized crime, Script kiddies. Attributes and motivations.', order: 1 },
    { id: '2.2', sectionId: 2, title: 'Threat Vectors and Attack Surfaces', titleHe: 'וקטורי איום ומשטחי תקיפה', description: 'Message-based, File-based, Human vectors, Supply chain, Wireless, Cloud & API vectors.', order: 2 },
    { id: '2.3', sectionId: 2, title: 'Types of Vulnerabilities', titleHe: 'סוגי פגיעויות', description: 'Application, Memory, Web (XSS, SQLi, CSRF), OS, Hardware, Misconfiguration.', order: 3 },
    { id: '2.4', sectionId: 2, title: 'Indicators of Malicious Activity', titleHe: 'אינדיקטורים לפעילות זדונית', description: 'Malware types, Network attacks (DDoS, DNS poisoning), MitM, Behavioral indicators.', order: 4 },
    { id: '2.5', sectionId: 2, title: 'Mitigation Techniques', titleHe: 'טכניקות הפחתה', description: 'Segmentation, Access control, Patching, Encryption, Monitoring, Security awareness.', order: 5 },

    // Section 3: Security Architecture (18%)
    { id: '3.1', sectionId: 3, title: 'Architecture Models', titleHe: 'מודלים ארכיטקטוניים', description: 'Cloud (IaaS, PaaS, SaaS), Serverless, Microservices, Containerization, SDN, IoT.', order: 1 },
    { id: '3.2', sectionId: 3, title: 'Applying Security Principles', titleHe: 'יישום עקרונות אבטחה', description: 'Security zones, DMZ, Secure protocols, VLANs, ACLs, NAC, Wireless security.', order: 2 },
    { id: '3.3', sectionId: 3, title: 'Protecting Data', titleHe: 'הגנה על נתונים', description: 'Data classifications, Data states, DLP, Encryption, Tokenization, Rights management.', order: 3 },
    { id: '3.4', sectionId: 3, title: 'Resiliency and Recovery', titleHe: 'עמידות והתאוששות', description: 'High availability, Load balancing, Site types, Backup strategies, Testing methods.', order: 4 },

    // Section 4: Security Operations (28%) - Highest weight!
    { id: '4.1', sectionId: 4, title: 'Security Techniques', titleHe: 'טכניקות אבטחה', description: 'Hardening, Secure baselines, Wireless security, Application security, Sandboxing.', order: 1 },
    { id: '4.2', sectionId: 4, title: 'Asset Management', titleHe: 'ניהול נכסים', description: 'Acquisition, Assignment, Monitoring, Disposal, CMDB, Inventory management.', order: 2 },
    { id: '4.3', sectionId: 4, title: 'Vulnerability Management', titleHe: 'ניהול פגיעויות', description: 'Scanning, SAST/DAST/IAST, Penetration testing, CVE, CVSS, Remediation.', order: 3 },
    { id: '4.4', sectionId: 4, title: 'Security Monitoring', titleHe: 'ניטור אבטחה', description: 'SIEM, Log management, Alert configuration, True/false positives, Dashboards.', order: 4 },
    { id: '4.5', sectionId: 4, title: 'Enterprise Security', titleHe: 'אבטחה ארגונית', description: 'Firewall (NGFW, WAF), IDS/IPS, Proxies, VPN, Email gateways, DLP, NAC.', order: 5 },
    { id: '4.6', sectionId: 4, title: 'Identity and Access Management', titleHe: 'ניהול זהויות וגישה', description: 'Provisioning, SSO, Federation, MFA, RBAC/ABAC/MAC/DAC, PAM.', order: 6 },
    { id: '4.7', sectionId: 4, title: 'Automation and Orchestration', titleHe: 'אוטומציה ותזמור', description: 'Playbooks, Runbooks, SOAR, Scripting for security, API integration.', order: 7 },
    { id: '4.8', sectionId: 4, title: 'Incident Response', titleHe: 'תגובה לאירועים', description: 'IR phases, Digital forensics, Evidence collection, Chain of custody, Root cause analysis.', order: 8 },
    { id: '4.9', sectionId: 4, title: 'Security Data Sources', titleHe: 'מקורות נתוני אבטחה', description: 'Log types, SIEM correlation, Threat intelligence, Vulnerability databases.', order: 9 },

    // Section 5: Security Program Management & Oversight (17%)
    { id: '5.1', sectionId: 5, title: 'Security Governance', titleHe: 'ממשל אבטחה', description: 'Policies, Standards, Procedures, Guidelines, Governance structures, Roles.', order: 1 },
    { id: '5.2', sectionId: 5, title: 'Risk Management', titleHe: 'ניהול סיכונים', description: 'Risk types, Qualitative/Quantitative analysis, Risk response, BIA (RTO, RPO, MTTR).', order: 2 },
    { id: '5.3', sectionId: 5, title: 'Third-party Risk', titleHe: 'סיכוני צד שלישי', description: 'Vendor assessment, Supply chain security, Due diligence, SLAs, Monitoring.', order: 3 },
    { id: '5.4', sectionId: 5, title: 'Security Compliance', titleHe: 'תאימות אבטחה', description: 'GDPR, HIPAA, PCI-DSS, SOX, Privacy requirements, Data handling.', order: 4 },
    { id: '5.5', sectionId: 5, title: 'Audits and Assessments', titleHe: 'ביקורות והערכות', description: 'Internal/External audits, Penetration testing, Vulnerability assessments, Attestation.', order: 5 },
    { id: '5.6', sectionId: 5, title: 'Security Awareness', titleHe: 'מודעות אבטחה', description: 'Training methods, Phishing simulations, Reporting mechanisms, Culture development.', order: 6 },
  ];

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: topic,
      create: topic,
    });
  }
  console.log(`  ✅ ${topics.length} topics created\n`);

  // ========================================================================
  // 3. ACHIEVEMENTS (15 predefined achievements)
  // ========================================================================
  console.log('🏆 Creating Achievements...');

  const achievements = [
    // Study achievements
    {
      id: 'first-lesson',
      title: 'First Steps',
      titleHe: 'צעדים ראשונים',
      description: 'Complete your first lesson',
      descriptionHe: 'השלם את השיעור הראשון שלך',
      icon: 'school',
      color: 'blue',
      category: 'study',
      criteria: { type: 'lessonsCompleted', value: 1 },
      order: 1,
    },
    {
      id: 'section-complete',
      title: 'Domain Master',
      titleHe: 'מאסטר תחום',
      description: 'Complete all topics in one section',
      descriptionHe: 'השלם את כל הנושאים בתחום אחד',
      icon: 'emoji_events',
      color: 'gold',
      category: 'study',
      criteria: { type: 'sectionCompleted', value: 1 },
      order: 2,
    },
    {
      id: 'all-sections',
      title: 'Full Coverage',
      titleHe: 'כיסוי מלא',
      description: 'Complete all 28 topics across all 5 sections',
      descriptionHe: 'השלם את כל 28 הנושאים ב-5 התחומים',
      icon: 'military_tech',
      color: 'purple',
      category: 'study',
      criteria: { type: 'topicsCompleted', count: 28 },
      order: 3,
    },

    // Quiz achievements
    {
      id: 'first-quiz',
      title: 'Quiz Rookie',
      titleHe: 'טירון בוחן',
      description: 'Complete your first quiz',
      descriptionHe: 'השלם את הבוחן הראשון שלך',
      icon: 'quiz',
      color: 'green',
      category: 'quiz',
      criteria: { type: 'quizzesCompleted', value: 1 },
      order: 4,
    },
    {
      id: 'perfect-quiz',
      title: 'Perfect Score',
      titleHe: 'ציון מושלם',
      description: 'Score 100% on any quiz',
      descriptionHe: 'קבל ציון 100% בבוחן כלשהו',
      icon: 'stars',
      color: 'gold',
      category: 'quiz',
      criteria: { type: 'quizScore', minPercentage: 100 },
      order: 5,
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      titleHe: 'מאסטר בחנים',
      description: 'Complete 10 quizzes',
      descriptionHe: 'השלם 10 בחנים',
      icon: 'workspace_premium',
      color: 'blue',
      category: 'quiz',
      criteria: { type: 'quizzesCompleted', value: 10 },
      order: 6,
    },

    // Exam achievements
    {
      id: 'first-exam',
      title: 'Exam Challenger',
      titleHe: 'מתמודד בחינה',
      description: 'Complete your first full exam simulation',
      descriptionHe: 'השלם את סימולציית הבחינה הראשונה שלך',
      icon: 'assignment',
      color: 'orange',
      category: 'exam',
      criteria: { type: 'examsCompleted', value: 1 },
      order: 7,
    },
    {
      id: 'exam-pass',
      title: 'Certified Ready',
      titleHe: 'מוכן להסמכה',
      description: 'Pass a full exam simulation (≥75%)',
      descriptionHe: 'עבור סימולציית בחינה מלאה (≥75%)',
      icon: 'verified',
      color: 'green',
      category: 'exam',
      criteria: { type: 'examPassed', minPercentage: 75 },
      order: 8,
    },

    // Streak achievements
    {
      id: 'streak-3',
      title: 'Getting Started',
      titleHe: 'מתחילים',
      description: 'Study 3 days in a row',
      descriptionHe: 'למד 3 ימים ברצף',
      icon: 'local_fire_department',
      color: 'orange',
      category: 'streak',
      criteria: { type: 'streak', value: 3 },
      order: 9,
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      titleHe: 'לוחם שבועי',
      description: 'Study 7 days in a row',
      descriptionHe: 'למד 7 ימים ברצף',
      icon: 'local_fire_department',
      color: 'red',
      category: 'streak',
      criteria: { type: 'streak', value: 7 },
      order: 10,
    },
    {
      id: 'streak-30',
      title: 'Monthly Dedication',
      titleHe: 'מסירות חודשית',
      description: 'Study 30 days in a row',
      descriptionHe: 'למד 30 ימים ברצף',
      icon: 'local_fire_department',
      color: 'purple',
      category: 'streak',
      criteria: { type: 'streak', value: 30 },
      order: 11,
    },

    // Flashcard achievements
    {
      id: 'flashcard-50',
      title: 'Card Collector',
      titleHe: 'אספן כרטיסיות',
      description: 'Review 50 flashcards',
      descriptionHe: 'סקור 50 כרטיסיות',
      icon: 'style',
      color: 'blue',
      category: 'flashcard',
      criteria: { type: 'flashcardsReviewed', value: 50 },
      order: 12,
    },
    {
      id: 'flashcard-master',
      title: 'Memory Palace',
      titleHe: 'ארמון הזיכרון',
      description: 'Master 100 flashcards',
      descriptionHe: 'שלוט ב-100 כרטיסיות',
      icon: 'psychology',
      color: 'purple',
      category: 'flashcard',
      criteria: { type: 'flashcardsMastered', value: 100 },
      order: 13,
    },

    // Simulation achievements
    {
      id: 'first-sim',
      title: 'Cyber Warrior',
      titleHe: 'לוחם סייבר',
      description: 'Complete your first attack simulation',
      descriptionHe: 'השלם את סימולציית ההתקפה הראשונה שלך',
      icon: 'security',
      color: 'red',
      category: 'simulation',
      criteria: { type: 'simulationsCompleted', value: 1 },
      order: 14,
    },
    {
      id: 'sim-all',
      title: 'Penetration Expert',
      titleHe: 'מומחה חדירה',
      description: 'Complete all attack simulations',
      descriptionHe: 'השלם את כל סימולציות ההתקפה',
      icon: 'shield_with_heart',
      color: 'gold',
      category: 'simulation',
      criteria: { type: 'allSimulationsCompleted' },
      order: 15,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: achievement,
      create: achievement,
    });
  }
  console.log(`  ✅ ${achievements.length} achievements created\n`);

  // ========================================================================
  // 4. ADMIN USER (default admin for development)
  // ========================================================================
  console.log('👤 Creating Admin user...');

  // Password: "admin123" - bcrypt hash (change in production!)
  const adminPasswordHash = '$2b$10$EIXk0c.kxHqJ8qVqH5Z5C.Q6R7xR1Y1xH4bB9Qw3P5mK7N8R1S2V6';

  await prisma.user.upsert({
    where: { email: 'admin@cyberguard.academy' },
    update: {},
    create: {
      email: 'admin@cyberguard.academy',
      passwordHash: adminPasswordHash,
      name: 'CyberGuard Admin',
      role: 'admin',
      membership: 'enterprise',
      permissions: [
        'lessons:manage',
        'questions:manage',
        'exams:manage',
        'flashcards:manage',
        'simulations:manage',
        'users:manage',
        'analytics:view',
      ],
      language: 'en',
    },
  });
  console.log('  ✅ Admin user created (admin@cyberguard.academy)\n');

  // ========================================================================
  // SUMMARY
  // ========================================================================
  console.log('════════════════════════════════════════════');
  console.log('🎉 Seed completed successfully!');
  console.log('════════════════════════════════════════════');
  console.log(`  📚 Sections:     ${sections.length}`);
  console.log(`  📖 Topics:       ${topics.length}`);
  console.log(`  🏆 Achievements: ${achievements.length}`);
  console.log(`  👤 Admin User:   1`);
  console.log('════════════════════════════════════════════\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
