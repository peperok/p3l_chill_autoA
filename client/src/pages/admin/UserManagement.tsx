import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { Plus, Edit, Trash2, Search, Users, Building, UserCheck } from 'lucide-react';

const employeeSchema = z.object({
  nama_pegawai: z.string().min(1, 'Nama pegawai wajib diisi'),
  jabatan: z.string().min(1, 'Jabatan wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  tgl_lahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: employees = [], isLoading: employeesLoading, error: employeesError } = useQuery({
    queryKey: ['/api/pegawai'],
    queryFn: () => api.getPegawai(),
    enabled: user?.role === 'admin',
  });

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      nama_pegawai: '',
      jabatan: '',
      email: '',
      password: '',
      tgl_lahir: '',
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: (data: EmployeeFormData) => api.createPegawai(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pegawai'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: 'Pegawai berhasil dibuat',
        description: 'Data pegawai baru telah ditambahkan.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal membuat pegawai',
        description: error.message || 'Terjadi kesalahan saat membuat pegawai',
        variant: 'destructive',
      });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeFormData> }) =>
      api.updatePegawai(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pegawai'] });
      setIsDialogOpen(false);
      setEditingEmployee(null);
      form.reset();
      toast({
        title: 'Pegawai berhasil diperbarui',
        description: 'Perubahan telah disimpan.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal memperbarui pegawai',
        description: error.message || 'Terjadi kesalahan saat memperbarui pegawai',
        variant: 'destructive',
      });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: number) => api.deletePegawai(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pegawai'] });
      toast({
        title: 'Pegawai berhasil dihapus',
        description: 'Data pegawai telah dihapus.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal menghapus pegawai',
        description: error.message || 'Terjadi kesalahan saat menghapus pegawai',
        variant: 'destructive',
      });
    },
  });

  const filteredEmployees = employees.filter((employee: any) =>
    employee.nama_pegawai?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.jabatan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: EmployeeFormData) => {
    if (editingEmployee) {
      updateEmployeeMutation.mutate({ id: editingEmployee.id, data });
    } else {
      createEmployeeMutation.mutate(data);
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee);
    form.reset({
      nama_pegawai: employee.nama_pegawai || '',
      jabatan: employee.jabatan || '',
      email: employee.email || '',
      password: '',
      tgl_lahir: employee.tgl_lahir ? new Date(employee.tgl_lahir).toISOString().split('T')[0] : '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pegawai ini?')) {
      deleteEmployeeMutation.mutate(id);
    }
  };

  const positions = [
    'Administrator',
    'Pegawai Gudang',
    'Customer Service',
    'Owner',
    'Manager',
    'Supervisor',
  ];

  const getPositionBadge = (jabatan: string) => {
    const positionMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', color: string }> = {
      'Administrator': { variant: 'default', color: 'bg-red-100 text-red-800' },
      'Owner': { variant: 'default', color: 'bg-purple-100 text-purple-800' },
      'Manager': { variant: 'secondary', color: 'bg-blue-100 text-blue-800' },
      'Pegawai Gudang': { variant: 'outline', color: 'bg-green-100 text-green-800' },
      'Customer Service': { variant: 'outline', color: 'bg-yellow-100 text-yellow-800' },
    };
    return positionMap[jabatan] || { variant: 'outline' as const, color: 'bg-gray-100 text-gray-800' };
  };

  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Akses Ditolak
            </h2>
            <p className="text-gray-600">
              Anda tidak memiliki izin untuk mengakses halaman ini.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola data pegawai dan organisasi</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employees" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Pegawai</span>
          </TabsTrigger>
          <TabsTrigger value="consigners" className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4" />
            <span>Penitip</span>
          </TabsTrigger>
          <TabsTrigger value="organizations" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Organisasi</span>
          </TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari pegawai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingEmployee(null);
                  form.reset();
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pegawai
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingEmployee ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="nama_pegawai">Nama Lengkap</Label>
                    <Input
                      id="nama_pegawai"
                      placeholder="Masukkan nama lengkap"
                      {...form.register('nama_pegawai')}
                    />
                    {form.formState.errors.nama_pegawai && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.nama_pegawai.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="jabatan">Jabatan</Label>
                    <Select
                      value={form.watch('jabatan')}
                      onValueChange={(value) => form.setValue('jabatan', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jabatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.jabatan && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.jabatan.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">
                      {editingEmployee ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password'}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...form.register('password', { 
                        required: !editingEmployee ? 'Password wajib diisi' : false 
                      })}
                    />
                    {form.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                    <Input
                      id="tgl_lahir"
                      type="date"
                      {...form.register('tgl_lahir')}
                    />
                    {form.formState.errors.tgl_lahir && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.tgl_lahir.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createEmployeeMutation.isPending || updateEmployeeMutation.isPending}
                    >
                      {createEmployeeMutation.isPending || updateEmployeeMutation.isPending
                        ? 'Menyimpan...'
                        : editingEmployee
                        ? 'Perbarui'
                        : 'Simpan'
                      }
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Pegawai ({filteredEmployees.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : employeesError ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Gagal Memuat Data
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Terjadi kesalahan saat memuat data pegawai
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Coba Lagi
                  </Button>
                </div>
              ) : filteredEmployees.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'Tidak ada pegawai ditemukan' : 'Belum ada pegawai'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? 'Coba ubah kata kunci pencarian Anda'
                      : 'Mulai dengan menambahkan pegawai pertama'
                    }
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Pegawai
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pegawai</TableHead>
                        <TableHead>Jabatan</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tanggal Lahir</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee: any) => {
                        const badgeInfo = getPositionBadge(employee.jabatan || '');
                        return (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary">
                                    {(employee.nama_pegawai || '').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {employee.nama_pegawai || 'N/A'}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    ID: {employee.id}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={badgeInfo.color}>
                                {employee.jabatan || 'N/A'}
                              </Badge>
                            </TableCell>
                            <TableCell>{employee.email || 'N/A'}</TableCell>
                            <TableCell>
                              {employee.tgl_lahir 
                                ? new Date(employee.tgl_lahir).toLocaleDateString('id-ID')
                                : 'N/A'
                              }
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(employee)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(employee.id)}
                                  disabled={deleteEmployeeMutation.isPending}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consigners Tab */}
        <TabsContent value="consigners" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Data Penitip
              </h3>
              <p className="text-gray-600">
                Data penitip dikelola melalui halaman Manajemen Penitipan
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Data Organisasi
              </h3>
              <p className="text-gray-600">
                Organisasi dapat mendaftar sendiri melalui halaman pendaftaran
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
