// src/App.tsx
// Main application with providers, i18n, and full routing

import './i18n'; // Must be imported before any component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ProtectedRoute, AdminRoute } from './components/auth/ProtectedRoute';
import { routes } from './constants/routes';
import LoadingPage from './pages/LoadingPage';

// ── Eagerly loaded (small, above-the-fold) ───────────────────────────────
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

// ── Lazy loaded ──────────────────────────────────────────────────────────
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SectionPage = lazy(() => import('./pages/SectionPage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const FlashcardsManagerPage = lazy(() => import('./pages/FlashcardsManagerPage'));
const FlashcardStudyPage = lazy(() => import('./pages/FlashcardStudyPage'));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const NotesArchivePage = lazy(() => import('./pages/NotesArchivePage'));
const SimulationPage = lazy(() => import('./pages/SimulationPage'));
const SimulationReportPage = lazy(() => import('./pages/SimulationReportPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage'));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'));

function AppFallback() {
  return <LoadingPage />;
}

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <Suspense fallback={<AppFallback />}>
            <Routes>
              {/* ── Public ─────────────────────────────────────────── */}
              <Route path={routes.HOME} element={<LandingPage />} />
              <Route path={routes.LOADING} element={<LoadingPage />} />

              {/* ── Protected: User ────────────────────────────────── */}
              <Route
                path={routes.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.PROFILE}
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Learning — Section & Lesson */}
              <Route
                path={routes.SECTIONS.DETAIL}
                element={
                  <ProtectedRoute>
                    <SectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.SECTIONS.LESSON}
                element={
                  <ProtectedRoute>
                    <LessonPage />
                  </ProtectedRoute>
                }
              />

              {/* Practice / Exam */}
              <Route
                path={routes.PRACTICE.EXAM}
                element={
                  <ProtectedRoute>
                    <ExamPage />
                  </ProtectedRoute>
                }
              />

              {/* Flashcards */}
              <Route
                path={routes.FLASHCARDS.MANAGER}
                element={
                  <ProtectedRoute>
                    <FlashcardsManagerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.FLASHCARDS.STUDY}
                element={
                  <ProtectedRoute>
                    <FlashcardStudyPage />
                  </ProtectedRoute>
                }
              />

              {/* Simulations */}
              <Route
                path={routes.SIMULATIONS.LIST}
                element={
                  <ProtectedRoute>
                    <SimulationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.SIMULATIONS.REPORT}
                element={
                  <ProtectedRoute>
                    <SimulationReportPage />
                  </ProtectedRoute>
                }
              />

              {/* Notes */}
              <Route
                path={routes.NOTES}
                element={
                  <ProtectedRoute>
                    <NotesArchivePage />
                  </ProtectedRoute>
                }
              />

              {/* ── Admin ──────────────────────────────────────────── */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/content"
                element={
                  <AdminRoute>
                    <AdminContentPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <AdminRoute>
                    <AdminAnalyticsPage />
                  </AdminRoute>
                }
              />


              {/* ── 404 ────────────────────────────────────────────── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
