import { ReactNode } from 'react';
import { useAuthStore, isAdminRole, isStorefrontRole } from '@/lib/auth';
import { AuthModal } from './AuthModal';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'storefront' | UserRole;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return fallback || <AuthModal isOpen={true} onClose={() => {}} />;
  }

  if (requiredRole) {
    if (requiredRole === 'admin' && !isAdminRole(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
            <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          </div>
        </div>
      );
    }

    if (requiredRole === 'storefront' && !isStorefrontRole(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
            <p className="text-gray-600">Halaman ini hanya untuk pelanggan dan organisasi.</p>
          </div>
        </div>
      );
    }

    if (typeof requiredRole === 'string' && requiredRole !== 'admin' && requiredRole !== 'storefront' && user.role !== requiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
            <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
