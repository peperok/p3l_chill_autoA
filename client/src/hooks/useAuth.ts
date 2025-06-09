import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore, isAdminRole } from '@/lib/auth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout: authLogout } = useAuthStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const loginPembeliMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.loginPembeli(email, password),
    onSuccess: (userData) => {
      login(userData);
      queryClient.invalidateQueries();
      toast({
        title: 'Login berhasil',
        description: `Selamat datang, ${userData.name}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Login gagal',
        description: error.message || 'Email atau password salah',
        variant: 'destructive',
      });
    },
  });

  const loginOrganisasiMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.loginOrganisasi(email, password),
    onSuccess: (userData) => {
      login(userData);
      queryClient.invalidateQueries();
      toast({
        title: 'Login berhasil',
        description: `Selamat datang, ${userData.name}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Login gagal',
        description: error.message || 'Email atau password salah',
        variant: 'destructive',
      });
    },
  });

  const loginPegawaiMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.loginPegawai(email, password),
    onSuccess: (userData) => {
      login(userData);
      queryClient.invalidateQueries();
      toast({
        title: 'Login berhasil',
        description: `Selamat datang, ${userData.name}!`,
      });
      // Redirect admin users to admin dashboard
      if (isAdminRole(userData.role)) {
        window.location.href = '/admin';
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Login gagal',
        description: error.message || 'Email atau password salah',
        variant: 'destructive',
      });
    },
  });

  const registerPembeliMutation = useMutation({
    mutationFn: (userData: {
      nama_pembeli: string;
      tlpn_pembeli: string;
      email: string;
      password: string;
    }) => api.registerPembeli({
      nama: userData.nama_pembeli,
      no_telepon: userData.tlpn_pembeli,
      email: userData.email,
      password: userData.password
    }),
    onSuccess: () => {
      toast({
        title: 'Registrasi berhasil',
        description: 'Akun Anda telah dibuat. Silakan login.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Registrasi gagal',
        description: error.message || 'Terjadi kesalahan saat membuat akun',
        variant: 'destructive',
      });
    },
  });

  const registerOrganisasiMutation = useMutation({
    mutationFn: (userData: {
      nama_organisasi: string;
      alamat_organisasi: string;
      email: string;
      password: string;
    }) => api.registerOrganisasi({
      nama_organisasi: userData.nama_organisasi,
      alamat: userData.alamat_organisasi,
      email: userData.email,
      password: userData.password
    }),
    onSuccess: () => {
      toast({
        title: 'Registrasi berhasil',
        description: 'Akun organisasi Anda telah dibuat. Silakan login.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Registrasi gagal',
        description: error.message || 'Terjadi kesalahan saat membuat akun',
        variant: 'destructive',
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const userType = user?.role === 'pembeli' ? 'pembeli' : 
                      user?.role === 'organisasi' ? 'organisasi' : 'pegawai';
      return api.logout(userType);
    },
    onSuccess: () => {
      authLogout();
      queryClient.clear();
      toast({
        title: 'Logout berhasil',
        description: 'Anda telah keluar dari sistem.',
      });
    },
  });

  return {
    user,
    isAuthenticated,
    loginPembeli: loginPembeliMutation.mutate,
    loginOrganisasi: loginOrganisasiMutation.mutate,
    loginPegawai: loginPegawaiMutation.mutate,
    registerPembeli: registerPembeliMutation.mutate,
    registerOrganisasi: registerOrganisasiMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: 
      loginPembeliMutation.isPending ||
      loginOrganisasiMutation.isPending ||
      loginPegawaiMutation.isPending ||
      registerPembeliMutation.isPending ||
      registerOrganisasiMutation.isPending ||
      logoutMutation.isPending,
  };
};
