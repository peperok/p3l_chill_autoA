import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
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
import { 
  Search, 
  Heart, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Target,
  Calendar,
  TrendingUp,
  Users
} from 'lucide-react';

interface DonationRequest {
  id: number;
  judul_donasi: string;
  deskripsi: string;
  target_donasi: string;
  donasi_terkumpul: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  tanggal_mulai: string;
  tanggal_selesai: string;
  organisasi: {
    id: number;
    nama_organisasi: string;
    email: string;
  };
  createdAt: string;
}

export const DonationManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonation, setSelectedDonation] = useState<DonationRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Mock data for donations - in real app this would come from API
  const mockDonations: DonationRequest[] = [
    {
      id: 1,
      judul_donasi: 'Bantuan Sembako untuk Korban Bencana Alam',
      deskripsi: 'Program bantuan sembako untuk korban bencana alam di daerah terdampak. Bantuan akan disalurkan dalam bentuk beras, minyak goreng, gula, dan kebutuhan pokok lainnya.',
      target_donasi: '50000000',
      donasi_terkumpul: '32500000',
      status: 'active',
      tanggal_mulai: '2024-01-15',
      tanggal_selesai: '2024-03-15',
      organisasi: {
        id: 1,
        nama_organisasi: 'Yayasan Peduli Sesama',
        email: 'info@pedulisesama.org'
      },
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      judul_donasi: 'Program Beasiswa untuk Anak Kurang Mampu',
      deskripsi: 'Program beasiswa pendidikan untuk anak-anak dari keluarga kurang mampu di daerah pedesaan. Dana akan digunakan untuk biaya sekolah, seragam, dan alat tulis.',
      target_donasi: '100000000',
      donasi_terkumpul: '0',
      status: 'pending',
      tanggal_mulai: '2024-02-01',
      tanggal_selesai: '2024-12-31',
      organisasi: {
        id: 2,
        nama_organisasi: 'Yayasan Cahaya Pendidikan',
        email: 'kontak@cahayapendidikan.org'
      },
      createdAt: '2024-01-25'
    },
    {
      id: 3,
      judul_donasi: 'Pembangunan Fasilitas Air Bersih',
      deskripsi: 'Pembangunan fasilitas air bersih untuk masyarakat desa terpencil yang belum memiliki akses air bersih yang memadai.',
      target_donasi: '75000000',
      donasi_terkumpul: '75000000',
      status: 'completed',
      tanggal_mulai: '2023-06-01',
      tanggal_selesai: '2023-12-31',
      organisasi: {
        id: 3,
        nama_organisasi: 'Komunitas Air Sehat',
        email: 'info@airsehat.org'
      },
      createdAt: '2023-05-20'
    },
  ];

  const approveDonationMutation = useMutation({
    mutationFn: async (id: number) => {
      // In real app, this would call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      toast({
        title: 'Donasi disetujui',
        description: 'Program donasi telah disetujui dan akan dipublikasikan.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal menyetujui donasi',
        description: error.message || 'Terjadi kesalahan saat menyetujui donasi',
        variant: 'destructive',
      });
    },
  });

  const rejectDonationMutation = useMutation({
    mutationFn: async (id: number) => {
      // In real app, this would call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      toast({
        title: 'Donasi ditolak',
        description: 'Program donasi telah ditolak.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal menolak donasi',
        description: error.message || 'Terjadi kesalahan saat menolak donasi',
        variant: 'destructive',
      });
    },
  });

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch = 
      donation.judul_donasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.organisasi.nama_organisasi.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'Menunggu Review', variant: 'outline' as const, color: 'text-yellow-600 bg-yellow-50' },
      approved: { label: 'Disetujui', variant: 'default' as const, color: 'text-blue-600 bg-blue-50' },
      active: { label: 'Aktif', variant: 'default' as const, color: 'text-green-600 bg-green-50' },
      completed: { label: 'Selesai', variant: 'secondary' as const, color: 'text-gray-600 bg-gray-50' },
      rejected: { label: 'Ditolak', variant: 'destructive' as const, color: 'text-red-600 bg-red-50' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const calculateProgress = (collected: string, target: string) => {
    const progress = (parseFloat(collected) / parseFloat(target)) * 100;
    return Math.min(progress, 100);
  };

  const getDonationStats = () => {
    const totalRequests = mockDonations.length;
    const pendingRequests = mockDonations.filter(d => d.status === 'pending').length;
    const activePrograms = mockDonations.filter(d => d.status === 'active').length;
    const completedPrograms = mockDonations.filter(d => d.status === 'completed').length;
    const totalFundsRaised = mockDonations.reduce((sum, d) => sum + parseFloat(d.donasi_terkumpul), 0);

    return {
      totalRequests,
      pendingRequests,
      activePrograms,
      completedPrograms,
      totalFundsRaised,
    };
  };

  const stats = getDonationStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Donasi</h1>
          <p className="text-gray-600">Kelola program donasi dan permintaan dari organisasi</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permintaan</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menunggu Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Program Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activePrograms}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedPrograms}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dana Terkumpul</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(stats.totalFundsRaised.toString())}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari program donasi atau organisasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Semua
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Aktif
              </Button>
              <Button
                variant={statusFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('completed')}
              >
                Selesai
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Program Donasi ({filteredDonations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDonations.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'Tidak ada program ditemukan' : 'Belum ada program donasi'}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Coba ubah kata kunci pencarian Anda'
                  : 'Program donasi akan muncul di sini setelah organisasi mengajukan permintaan'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Donasi</TableHead>
                    <TableHead>Organisasi</TableHead>
                    <TableHead>Target & Progress</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => {
                    const statusInfo = getStatusBadge(donation.status);
                    const progress = calculateProgress(donation.donasi_terkumpul, donation.target_donasi);
                    
                    return (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              {donation.judul_donasi}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {donation.deskripsi}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {donation.organisasi.nama_organisasi}
                            </p>
                            <p className="text-sm text-gray-600">
                              {donation.organisasi.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{formatCurrency(donation.donasi_terkumpul)}</span>
                              <span className="text-gray-500">
                                {formatCurrency(donation.target_donasi)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500">
                              {progress.toFixed(1)}% tercapai
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(donation.tanggal_mulai).toLocaleDateString('id-ID')}</p>
                            <p className="text-gray-500">
                              s/d {new Date(donation.tanggal_selesai).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedDonation(donation)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Detail
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Detail Program Donasi</DialogTitle>
                                </DialogHeader>
                                {selectedDonation && (
                                  <div className="space-y-6">
                                    <div>
                                      <h3 className="text-lg font-semibold mb-2">
                                        {selectedDonation.judul_donasi}
                                      </h3>
                                      <Badge className={getStatusBadge(selectedDonation.status).color}>
                                        {getStatusBadge(selectedDonation.status).label}
                                      </Badge>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Deskripsi Program</h4>
                                      <p className="text-gray-600">{selectedDonation.deskripsi}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <Card>
                                        <CardContent className="p-4">
                                          <h4 className="font-medium text-gray-900 mb-2">Organisasi</h4>
                                          <div className="space-y-1">
                                            <p className="font-medium">{selectedDonation.organisasi.nama_organisasi}</p>
                                            <p className="text-sm text-gray-600">{selectedDonation.organisasi.email}</p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardContent className="p-4">
                                          <h4 className="font-medium text-gray-900 mb-2">Target & Progress</h4>
                                          <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                              <span>Terkumpul:</span>
                                              <span className="font-medium">
                                                {formatCurrency(selectedDonation.donasi_terkumpul)}
                                              </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                              <span>Target:</span>
                                              <span className="font-medium">
                                                {formatCurrency(selectedDonation.target_donasi)}
                                              </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                              <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ 
                                                  width: `${calculateProgress(
                                                    selectedDonation.donasi_terkumpul, 
                                                    selectedDonation.target_donasi
                                                  )}%` 
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Periode Program</h4>
                                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                          {new Date(selectedDonation.tanggal_mulai).toLocaleDateString('id-ID')} - {' '}
                                          {new Date(selectedDonation.tanggal_selesai).toLocaleDateString('id-ID')}
                                        </span>
                                      </div>
                                    </div>

                                    {selectedDonation.status === 'pending' && (
                                      <div className="flex space-x-3">
                                        <Button
                                          onClick={() => approveDonationMutation.mutate(selectedDonation.id)}
                                          disabled={approveDonationMutation.isPending}
                                          className="flex-1"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Setujui Program
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={() => rejectDonationMutation.mutate(selectedDonation.id)}
                                          disabled={rejectDonationMutation.isPending}
                                          className="flex-1"
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />
                                          Tolak Program
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {donation.status === 'pending' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => approveDonationMutation.mutate(donation.id)}
                                  disabled={approveDonationMutation.isPending}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => rejectDonationMutation.mutate(donation.id)}
                                  disabled={rejectDonationMutation.isPending}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
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
    </div>
  );
};
