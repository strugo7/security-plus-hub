// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingPage from '../../pages/LoadingPage';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <LoadingPage />;
    if (!user) return <Navigate to="/" state={{ from: location }} replace />;
    return <>{children}</>;
}

// src/components/auth/AdminRoute.tsx — inline export for convenience
export function AdminRoute({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    if (!user || user.role !== 'admin')
        return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
}
