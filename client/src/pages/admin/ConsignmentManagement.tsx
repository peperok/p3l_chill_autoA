import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { Search, Handshake, Eye, Upload, Clock, CheckCircle } from 'lucide-react';

export const ConsignmentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsigner, setSelectedConsigner] = useState<any>(null);
  const { user } = useAuthStore();

  // Mock data - in real app, this would come from API
  const mockConsigners = [
    {
      id: 1,
      nama_penitip: 'Budi Santoso',
      alamat_penitip: 'Jl. Merdeka No. 123, Jakarta',
      tlpn_penitip: '081234567890',
      email: 'budi@email.com',
      status: 'approved',
      ktp_path: null,
      createdAt: '2024-01-15',
      items: [
        { id: 1, nama: 'iPhone 12', status: 'sold', harga: 8500000 },
        { id: 2, nama: 'Laptop Gaming', status: 'available', harga: 12000000 },
      ]
    },
    {
      id: 2,
      nama_penitip: 'Sari Dewi',
      alamat_penitip: 'Jl. Sudirman No. 456, Bandung',
      tlpn_penitip: '087654321098',
      email: 'sari@email.com',
      status: 'pending',
      ktp_path: null,
      createdAt: '2024-01-20',
      items: [
        { id: 3, nama: 'Kamera DSLR', status: 'available', harga: 5500000 },
      ]
    },
  ];

  const filteredConsigners = mockConsigners.filter((consigner) =>
    consigner.nama_penitip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consigner.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'Menunggu', variant: 'outline' as const },
      approved: { label: 'Disetujui', variant: 'default' as const },
      rejected: { label: 'Ditolak', variant: 'destructive' as const },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const getItemStatusBadge = (status: string) => {
    const statusMap = {
      available: { label: 'Tersedia', variant: 'default' as const },
      sold: { label: 'Terjual', variant: 'secondary' as const },
      expired: { label: 'Kadaluarsa', variant: 'destructive' as const },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.available;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotalRevenue = (items: any[]) => {
    return items
      .filter(item => item.status === 'sold')
      .reduce((sum, item) => sum + item.harga, 0);
  };

  const getPageTitle = () => {
    if (user?.role === 'penitip') {
      return 'Barang Titipan Saya';
    }
    return 'Manajemen Penitipan';
  };

  const getPageDescription = () => {
    if (user?.role === 'penitip') {
      return 'Kelola barang titipan dan lihat status penjualan';
    }
    return 'Kelola data penitip dan barang titipan';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600">{getPageDescription()}</p>
        </div>
        {user?.role !== 'penitip' && (
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload KTP
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={user?.role === 'penitip' ? 'Cari barang...' : 'Cari penitip...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats for Penitip */}
      {user?.role === 'penitip' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Barang</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Barang Terjual</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Menunggu</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 8.5M</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === 'penitip' ? 'Daftar Barang Titipan' : 'Daftar Penitip'} 
            ({filteredConsigners.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredConsigners.length === 0 ? (
            <div className="text-center py-12">
              <Handshake className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'Tidak ada data ditemukan' : 'Belum ada data penitipan'}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Coba ubah kata kunci pencarian Anda'
                  : 'Data penitipan akan muncul di sini'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penitip</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Jumlah Barang</TableHead>
                    <TableHead>Pendapatan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsigners.map((consigner) => {
                    const statusInfo = getStatusBadge(consigner.status);
                    const totalRevenue = calculateTotalRevenue(consigner.items);
                    
                    return (
                      <TableRow key={consigner.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {consigner.nama_penitip}
                            </p>
                            <p className="text-sm text-gray-600 truncate max-w-48">
                              {consigner.alamat_penitip}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{consigner.email}</p>
                            <p className="text-sm text-gray-600">{consigner.tlpn_penitip}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span>{consigner.items.length}</span>
                            <span className="text-gray-500">barang</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatCurrency(totalRevenue)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(consigner.createdAt).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedConsigner(consigner)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Detail
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detail Penitipan - {consigner.nama_penitip}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Consigner Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-base">Informasi Penitip</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Nama:</span>
                                        <p>{consigner.nama_penitip}</p>
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Email:</span>
                                        <p>{consigner.email}</p>
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Telepon:</span>
                                        <p>{consigner.tlpn_penitip}</p>
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Alamat:</span>
                                        <p>{consigner.alamat_penitip}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-base">Statistik</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Barang:</span>
                                        <span className="font-medium">{consigner.items.length}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Terjual:</span>
                                        <span className="font-medium text-green-600">
                                          {consigner.items.filter(item => item.status === 'sold').length}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Tersedia:</span>
                                        <span className="font-medium text-blue-600">
                                          {consigner.items.filter(item => item.status === 'available').length}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Pendapatan:</span>
                                        <span className="font-medium text-green-600">
                                          {formatCurrency(totalRevenue)}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Items List */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-base">Daftar Barang</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {consigner.items.map((item: any) => {
                                        const itemStatusInfo = getItemStatusBadge(item.status);
                                        return (
                                          <div 
                                            key={item.id} 
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                          >
                                            <div>
                                              <p className="font-medium">{item.nama}</p>
                                              <p className="text-sm text-gray-600">
                                                {formatCurrency(item.harga)}
                                              </p>
                                            </div>
                                            <Badge variant={itemStatusInfo.variant}>
                                              {itemStatusInfo.label}
                                            </Badge>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </DialogContent>
                          </Dialog>
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
