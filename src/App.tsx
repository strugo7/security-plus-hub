import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './constants/routes';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / pre-auth pages (no AppLayout) */}
        <Route path={routes.HOME} element={<LandingPage />} />
        <Route path={routes.LOADING} element={<LoadingPage />} />

        {/* App pages (AppLayout already included inside each page) */}
        <Route path={routes.DASHBOARD} element={<Dashboard />} />
        <Route path={routes.PROFILE} element={<ProfilePage />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div
              style={{ background: '#0d1117', color: '#e6edf3', minHeight: '100vh' }}
              className="flex items-center justify-center text-xl font-mono"
            >
              404 — Page not found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
