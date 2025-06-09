import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { Recycle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

const registerPembeliSchema = z.object({
  nama_pembeli: z.string().min(1, 'Nama wajib diisi'),
  tlpn_pembeli: z.string().min(1, 'Nomor telepon wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

const registerOrganisasiSchema = z.object({
  nama_organisasi: z.string().min(1, 'Nama organisasi wajib diisi'),
  alamat_organisasi: z.string().min(1, 'Alamat organisasi wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

const adminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'pembeli' | 'organisasi' | 'admin';
}

export const AuthModal = ({ isOpen, onClose, defaultTab = 'pembeli' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isRegistering, setIsRegistering] = useState(false);
  const { 
    loginPembeli, 
    loginOrganisasi, 
    loginPegawai,
    registerPembeli, 
    registerOrganisasi, 
    isLoading 
  } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerPembeliForm = useForm({
    resolver: zodResolver(registerPembeliSchema),
    defaultValues: {
      nama_pembeli: '',
      tlpn_pembeli: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerOrganisasiForm = useForm({
    resolver: zodResolver(registerOrganisasiSchema),
    defaultValues: {
      nama_organisasi: '',
      alamat_organisasi: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const adminLoginForm = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    if (activeTab === 'pembeli') {
      loginPembeli(data);
    } else if (activeTab === 'organisasi') {
      loginOrganisasi(data);
    }
    onClose();
  };

  const handleAdminLogin = (data: z.infer<typeof adminLoginSchema>) => {
    loginPegawai(data);
    onClose();
  };

  const handleRegisterPembeli = (data: z.infer<typeof registerPembeliSchema>) => {
    const { confirmPassword, ...registrationData } = data;
    registerPembeli(registrationData);
    setIsRegistering(false);
  };

  const handleRegisterOrganisasi = (data: z.infer<typeof registerOrganisasiSchema>) => {
    const { confirmPassword, ...registrationData } = data;
    registerOrganisasi(registrationData);
    setIsRegistering(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center">
            {isRegistering ? 'Daftar ke ReuseMart' : 'Masuk ke ReuseMart'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pembeli">Pembeli</TabsTrigger>
            <TabsTrigger value="organisasi">Organisasi</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="pembeli" className="space-y-4">
            {!isRegistering ? (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsRegistering(true)}
                  >
                    Belum punya akun? Daftar sekarang
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={registerPembeliForm.handleSubmit(handleRegisterPembeli)} className="space-y-4">
                <div>
                  <Label htmlFor="nama_pembeli">Nama Lengkap</Label>
                  <Input
                    id="nama_pembeli"
                    placeholder="Masukkan nama lengkap"
                    {...registerPembeliForm.register('nama_pembeli')}
                  />
                  {registerPembeliForm.formState.errors.nama_pembeli && (
                    <p className="text-sm text-destructive mt-1">
                      {registerPembeliForm.formState.errors.nama_pembeli.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="tlpn_pembeli">Nomor Telepon</Label>
                  <Input
                    id="tlpn_pembeli"
                    placeholder="081234567890"
                    {...registerPembeliForm.register('tlpn_pembeli')}
                  />
                  {registerPembeliForm.formState.errors.tlpn_pembeli && (
                    <p className="text-sm text-destructive mt-1">
                      {registerPembeliForm.formState.errors.tlpn_pembeli.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    {...registerPembeliForm.register('email')}
                  />
                  {registerPembeliForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {registerPembeliForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...registerPembeliForm.register('password')}
                  />
                  {registerPembeliForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {registerPembeliForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...registerPembeliForm.register('confirmPassword')}
                  />
                  {registerPembeliForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {registerPembeliForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Daftar'}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsRegistering(false)}
                  >
                    Sudah punya akun? Masuk sekarang
                  </button>
                </div>
              </form>
            )}
          </TabsContent>

          <TabsContent value="organisasi" className="space-y-4">
            {!isRegistering ? (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <Label htmlFor="org-email">Email</Label>
                  <Input
                    id="org-email"
                    type="email"
                    placeholder="organisasi@email.com"
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="org-password">Password</Label>
                  <Input
                    id="org-password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsRegistering(true)}
                  >
                    Belum terdaftar? Daftar organisasi
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={registerOrganisasiForm.handleSubmit(handleRegisterOrganisasi)} className="space-y-4">
                <div>
                  <Label htmlFor="nama_organisasi">Nama Organisasi</Label>
                  <Input
                    id="nama_organisasi"
                    placeholder="Masukkan nama organisasi"
                    {...registerOrganisasiForm.register('nama_organisasi')}
                  />
                  {registerOrganisasiForm.formState.errors.nama_organisasi && (
                    <p className="text-sm text-destructive mt-1">
                      {registerOrganisasiForm.formState.errors.nama_organisasi.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="alamat_organisasi">Alamat Organisasi</Label>
                  <Textarea
                    id="alamat_organisasi"
                    placeholder="Masukkan alamat lengkap organisasi"
                    {...registerOrganisasiForm.register('alamat_organisasi')}
                  />
                  {registerOrganisasiForm.formState.errors.alamat_organisasi && (
                    <p className="text-sm text-destructive mt-1">
                      {registerOrganisasiForm.formState.errors.alamat_organisasi.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="org-reg-email">Email</Label>
                  <Input
                    id="org-reg-email"
                    type="email"
                    placeholder="organisasi@email.com"
                    {...registerOrganisasiForm.register('email')}
                  />
                  {registerOrganisasiForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {registerOrganisasiForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="org-password">Password</Label>
                  <Input
                    id="org-password"
                    type="password"
                    placeholder="••••••••"
                    {...registerOrganisasiForm.register('password')}
                  />
                  {registerOrganisasiForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {registerOrganisasiForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="org-confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="org-confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...registerOrganisasiForm.register('confirmPassword')}
                  />
                  {registerOrganisasiForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {registerOrganisasiForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Daftar Organisasi'}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsRegistering(false)}
                  >
                    Sudah terdaftar? Masuk sekarang
                  </button>
                </div>
              </form>
            )}
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <form onSubmit={adminLoginForm.handleSubmit(handleAdminLogin)} className="space-y-4">
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@reusemart.com"
                  {...adminLoginForm.register('email')}
                />
                {adminLoginForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {adminLoginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  {...adminLoginForm.register('password')}
                />
                {adminLoginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {adminLoginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Memproses...' : 'Masuk Admin'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
