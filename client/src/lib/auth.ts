import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserRole } from '@/types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: AuthUser) => {
        localStorage.setItem('auth_token', user.token);
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (userData: Partial<AuthUser>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const isAdminRole = (role: UserRole): boolean => {
  return ['admin', 'owner', 'cs', 'pegawai_gudang', 'penitip'].includes(role);
};

export const isStorefrontRole = (role: UserRole): boolean => {
  return ['pembeli', 'organisasi'].includes(role);
};

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    pembeli: 'Pembeli',
    organisasi: 'Organisasi',
    admin: 'Administrator',
    penitip: 'Penitip',
    owner: 'Owner',
    cs: 'Customer Service',
    pegawai_gudang: 'Pegawai Gudang',
  };
  return roleNames[role] || role;
};
