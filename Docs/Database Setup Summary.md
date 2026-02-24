# CyberGuard Academy - Database Setup Summary

**Date:** February 23, 2026
**Phase:** Backend Database Foundation
**Stack:** PostgreSQL + Prisma ORM v7.4.1

---

## Overview

This document summarizes all the work done to design and implement the complete database foundation for the CyberGuard Academy Backend - a Security+ (SY0-701) learning platform.

---

## 1. Research & Analysis

### Documents Analyzed

All 5 planning documents were thoroughly analyzed to extract entities, relationships, and data requirements:

| Document | Key Extractions |
|----------|----------------|
| **System Architecture** | TypeScript interfaces for all entities (User, Section, Topic, Lesson, Question, Quiz, Flashcard, Simulation, Note, Progress), state management, component structure, routing |
| **Workplan V2.0** | Full Security+ syllabus content (28 topics), TypeScript types, SecOps module (8 domains), phase breakdown |
| **Development Guide** | i18n setup (en/he), localStorage schema, User vs Admin roles and permissions, RTL support |
| **Navigation Map** | User flow diagrams, state machines (Quiz, Flashcard), data dependencies between pages |
| **Initial Prompt** | Project overview, code standards, agent onboarding context |

### Decisions Made

| Decision | Choice |
|----------|--------|
| Database | **PostgreSQL** |
| ORM | **Prisma v7.4.1** |
| Scope | **Database Schema Only** (no API endpoints) |

---

## 2. Database Schema Design

### Entity-Relationship Overview

```
User ──┬── UserTopicProgress ── Topic ── Section
       ├── QuizResult ── Quiz ── Section
       ├── FlashcardProgress ── Flashcard ── FlashcardDeck ── Topic/Section
       ├── FlashcardDeck (creator)
       ├── SimulationResult ── Simulation
       ├── Note ── Topic/Lesson
       ├── UserAchievement ── Achievement
       └── Quiz (creator)

Section ── Topic ── Lesson
                 ── Question
                 ── FlashcardDeck
                 ── Note
```

### 16 Database Models

| # | Model | Table Name | Purpose |
|---|-------|------------|---------|
| 1 | **User** | `users` | User accounts with roles, memberships, streaks, study stats |
| 2 | **Section** | `sections` | 5 exam domains (with weights: 15%, 22%, 18%, 28%, 17%) |
| 3 | **Topic** | `topics` | 28 topics across sections (IDs: "1.1", "2.3", etc.) |
| 4 | **Lesson** | `lessons` | Study content with Notion-style JSON blocks |
| 5 | **Question** | `questions` | Quiz questions with multiple types and difficulty |
| 6 | **Quiz** | `quizzes` | Configurable quizzes (section, topic, exam, failed, custom) |
| 7 | **QuizResult** | `quiz_results` | Per-user quiz results with section breakdown |
| 8 | **FlashcardDeck** | `flashcard_decks` | Card collections (public admin-created or user-created) |
| 9 | **Flashcard** | `flashcards` | Individual cards with Markdown front/back |
| 10 | **FlashcardProgress** | `flashcard_progress` | SM-2 spaced repetition data (easeFactor, interval, repetitions) |
| 11 | **Simulation** | `simulations` | Attack simulations (SQL injection, XSS, phishing, etc.) |
| 12 | **SimulationResult** | `simulation_results` | Per-user simulation results with technical reports |
| 13 | **Note** | `notes` | User notes linked to topics/lessons |
| 14 | **UserTopicProgress** | `user_topic_progress` | Per-user per-topic completion tracking |
| 15 | **Achievement** | `achievements` | Achievement definitions with criteria |
| 16 | **UserAchievement** | `user_achievements` | Junction table for earned achievements |

### 6 Enums

| Enum | Values |
|------|--------|
| `Role` | user, admin |
| `Membership` | free, pro, enterprise |
| `QuestionType` | single, multiple, drag-drop, true-false |
| `Difficulty` | easy, medium, hard |
| `QuizType` | section, topic, exam, failed, custom |
| `SimulationType` | sql-injection, xss, phishing, network-attack, password-cracking, social-engineering |

### Key Design Decisions

- **JSONB fields** for flexible content: Lesson blocks, Question options/correct answers, Quiz answers, Simulation tools/steps, Technical reports, Achievement criteria
- **GIN indexes** on PostgreSQL array fields (`tags` on Question, Flashcard, Note)
- **Denormalized `sectionId`** on Question and UserTopicProgress for query performance
- **SM-2 Spaced Repetition** algorithm data model for flashcard progress (easeFactor, interval, repetitions, nextReview)
- **Bilingual support** with `titleHe` / `descriptionHe` columns (English + Hebrew)
- **Cascade deletes** on FlashcardDeck → Flashcard → FlashcardProgress
- **Compound unique constraints** on (userId, topicId), (userId, cardId), (userId, achievementId)
- **Snake_case table mapping** via `@@map()` for PostgreSQL conventions

---

## 3. Files Created & Modified

### New Files

| File | Description |
|------|-------------|
| `prisma/schema.prisma` | Core database schema (~495 lines) - all 16 models, 6 enums, relations, indexes |
| `prisma/seed.ts` | Seed script (~400 lines) - 5 sections, 28 topics, 15 achievements, 1 admin user |
| `prisma.config.ts` | Prisma 7 configuration (auto-generated, loads DATABASE_URL from .env) |

### Modified Files

| File | Changes |
|------|---------|
| `package.json` | Added `db:migrate`, `db:seed`, `db:studio`, `db:reset` scripts; `prisma.seed` config; moved `prisma` to devDependencies; added `tsx`, `dotenv`, `destr` |
| `.env` | Set `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cyberguard_academy"` |
| `.gitignore` | Added `/src/generated/` (Prisma client), `.env` files |

### Dependencies Added

| Package | Type | Purpose |
|---------|------|---------|
| `@prisma/client` ^7.4.1 | dependency | Prisma ORM client |
| `prisma` ^7.4.1 | devDependency | Prisma CLI |
| `tsx` ^4.21.0 | devDependency | TypeScript execution (for seed script) |
| `dotenv` ^17.3.1 | devDependency | Environment variables |
| `destr` ^2.0.5 | dependency | JSON parsing (rc9 dependency fix) |

---

## 4. Seed Data

### 5 Sections (Security+ SY0-701 Exam Domains)

| ID | Title | Hebrew | Weight |
|----|-------|--------|--------|
| 1 | General Security Concepts | מושגי אבטחה כלליים | 15% |
| 2 | Threats, Vulnerabilities & Mitigations | איומים, פגיעויות והפחתות | 22% |
| 3 | Security Architecture | ארכיטקטורת אבטחה | 18% |
| 4 | Security Operations | תפעול אבטחה | 28% |
| 5 | Security Program Management & Oversight | ניהול תוכניות ופיקוח | 17% |

### 28 Topics (distributed across sections)

- Section 1: 4 topics (1.1 - 1.4)
- Section 2: 5 topics (2.1 - 2.5)
- Section 3: 4 topics (3.1 - 3.4)
- Section 4: 9 topics (4.1 - 4.9) — largest, matching 28% exam weight
- Section 5: 6 topics (5.1 - 5.6)

### 15 Achievements (6 categories)

| Category | Achievements |
|----------|-------------|
| Study | First Steps, Domain Master, Full Coverage |
| Quiz | Quiz Rookie, Perfect Score, Quiz Master |
| Exam | Exam Challenger, Certified Ready |
| Streak | Getting Started (3d), Week Warrior (7d), Monthly Dedication (30d) |
| Flashcard | Card Collector (50), Memory Palace (100) |
| Simulation | Cyber Warrior, Penetration Expert |

### Admin User

- Email: `admin@cyberguard.academy`
- Role: admin
- Membership: enterprise
- Permissions: lessons:manage, questions:manage, exams:manage, flashcards:manage, simulations:manage, users:manage, analytics:view

---

## 5. NPM Scripts Added

```bash
npm run db:migrate  # Run Prisma migrations (prisma migrate dev)
npm run db:seed     # Seed the database (prisma db seed)
npm run db:studio   # Open Prisma Studio GUI (prisma studio)
npm run db:reset    # Reset database and re-seed (prisma migrate reset)
```

---

## 6. GitHub Repository

- **Repository:** https://github.com/strugo7/security-plus-hub
- **Commit:** `944fc86` — `feat(db): add Prisma schema with 16 models for CyberGuard Academy`
- All database files were committed and pushed to the `main` branch

---

## 7. Issues Encountered & Resolved

| Issue | Cause | Resolution |
|-------|-------|------------|
| Prisma CLI hanging | iCloud path with spaces (`Mobile Documents/com~apple~CloudDocs`) | Validated schema via `/tmp` workaround |
| Prisma 7 generator error | Used `prisma-client-js` (Prisma 5/6) instead of `prisma-client` | Updated generator provider |
| `destr` import error | `rc9` module resolution fails with spaces in path | Installed `destr` explicitly |
| Disk full (117MB free) | `npm install` failed with ENOSPC | Ran `npm cache clean --force`, freed 4.3GB |
| node_modules corrupted | `npm install` failed midway due to disk full | Clean reinstall: `rm -rf node_modules && npm install` |
| iCloud file timeouts | Files evicted by iCloud after disk issues | Used `brctl download` to trigger re-download |

### Recommendation

Move the project from iCloud to a local folder (e.g., `~/CyberGuard-Project`) to avoid persistent path issues with Node.js CLI tools. Paths with spaces break many CLI tools including `npx`, `prisma`, and others.

---

## 8. Next Steps (Not Yet Implemented)

1. **Set up PostgreSQL locally** — Install PostgreSQL and create the `cyberguard_academy` database
2. **Run first migration** — `npm run db:migrate` to create all tables
3. **Run seed** — `npm run db:seed` to populate initial data
4. **Build API endpoints** — Express/Fastify routes for CRUD operations on all entities
5. **Authentication** — JWT-based auth with bcrypt password hashing
6. **Move project to local folder** — Avoid iCloud path issues for development
