import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { routes } from './constants/routes';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<LandingPage />} />
        <Route path={routes.LOADING} element={<LoadingPage />} />
        <Route path={routes.DASHBOARD} element={<Dashboard />} />

        {/* Wrap other pages in Layout if needed */}
        <Route path="*" element={
          <Layout>
            <div className="p-4">Page not found (404)</div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
