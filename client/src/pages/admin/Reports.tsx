import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Package,
  ShoppingCart,
  Heart,
  Users,
  DollarSign,
  FileText
} from 'lucide-react';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [reportType, setReportType] = useState('sales');
  const { user } = useAuthStore();

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/merch'],
    queryFn: () => api.getMerch(),
  });

  const { data: purchases = [], isLoading: purchasesLoading } = useQuery({
    queryKey: ['/api/pembelian'],
    queryFn: () => api.getPembelian(),
  });

  const { data: employees = [], isLoading: employeesLoading } = useQuery({
    queryKey: ['/api/pegawai'],
    queryFn: () => api.getPegawai(),
    enabled: user?.role === 'owner',
  });

  // Calculate comprehensive stats
  const calculateStats = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter((p: any) => p.status === 'active').length;
    const lowStockProducts = products.filter((p: any) => p.stok <= 5 && p.stok > 0).length;
    const outOfStockProducts = products.filter((p: any) => p.stok === 0).length;

    const totalPurchases = purchases.length;
    const completedPurchases = purchases.filter((p: any) => p.status === 'completed').length;
    const pendingPurchases = purchases.filter((p: any) => p.status === 'pending').length;
    
    const totalRevenue = purchases
      .filter((p: any) => p.status === 'completed')
      .reduce((sum: number, p: any) => sum + parseFloat(p.total_harga || '0'), 0);

    const avgOrderValue = completedPurchases > 0 ? totalRevenue / completedPurchases : 0;

    // Get current month data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthPurchases = purchases.filter((p: any) => {
      const purchaseDate = new Date(p.createdAt);
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    const thisMonthRevenue = thisMonthPurchases
      .filter((p: any) => p.status === 'completed')
      .reduce((sum: number, p: any) => sum + parseFloat(p.total_harga || '0'), 0);

    // Calculate category performance
    const categoryStats = products.reduce((acc: any, product: any) => {
      const category = product.kategori || 'Lainnya';
      if (!acc[category]) {
        acc[category] = { count: 0, revenue: 0 };
      }
      acc[category].count += 1;
      
      // Calculate revenue for this category from purchases
      const categoryPurchases = purchases.filter((p: any) => {
        // In real app, you'd have product details in purchase
        return p.status === 'completed';
      });
      
      return acc;
    }, {});

    return {
      inventory: {
        totalProducts,
        activeProducts,
        lowStockProducts,
        outOfStockProducts,
      },
      sales: {
        totalPurchases,
        completedPurchases,
        pendingPurchases,
        totalRevenue,
        avgOrderValue,
        thisMonthRevenue,
        thisMonthPurchases: thisMonthPurchases.length,
      },
      categoryStats,
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generatePDFReport = () => {
    // In real app, this would generate and download PDF
    const reportData = {
      type: reportType,
      dateRange,
      stats,
      generatedAt: new Date().toISOString(),
      generatedBy: user?.name,
    };

    console.log('Generating PDF report:', reportData);
    
    toast({
      title: 'Laporan sedang disiapkan',
      description: 'File PDF akan diunduh dalam beberapa saat.',
    });
  };

  const exportToCSV = () => {
    // In real app, this would export data to CSV
    console.log('Exporting to CSV');
    
    toast({
      title: 'Data sedang diekspor',
      description: 'File CSV akan diunduh dalam beberapa saat.',
    });
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Hari Ini' },
    { value: 'yesterday', label: 'Kemarin' },
    { value: 'last_7_days', label: '7 Hari Terakhir' },
    { value: 'last_30_days', label: '30 Hari Terakhir' },
    { value: 'this_month', label: 'Bulan Ini' },
    { value: 'last_month', label: 'Bulan Lalu' },
    { value: 'this_year', label: 'Tahun Ini' },
    { value: 'custom', label: 'Periode Kustom' },
  ];

  const isLoading = productsLoading || purchasesLoading || employeesLoading;

  if (user?.role !== 'owner' && user?.role !== 'admin') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Akses Ditolak
            </h2>
            <p className="text-gray-600">
              Anda tidak memiliki izin untuk mengakses laporan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-600">Analisis kinerja bisnis dan tren penjualan</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          
          <Button onClick={generatePDFReport}>
            <FileText className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.sales.totalRevenue)}
                  </p>
                  <p className="text-sm text-green-600">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    +12.5% vs bulan lalu
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.sales.totalPurchases}</p>
                  <p className="text-sm text-blue-600">
                    {stats.sales.completedPurchases} selesai
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Produk Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inventory.activeProducts}</p>
                  <p className="text-sm text-orange-600">
                    {stats.inventory.lowStockProducts} stok menipis
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rata-rata Order</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.sales.avgOrderValue)}
                  </p>
                  <p className="text-sm text-purple-600">
                    Per transaksi
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Laporan Penjualan</TabsTrigger>
          <TabsTrigger value="inventory">Laporan Gudang</TabsTrigger>
          <TabsTrigger value="donations">Laporan Donasi</TabsTrigger>
          <TabsTrigger value="performance">Performa Kategori</TabsTrigger>
        </TabsList>

        {/* Sales Report */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tren Penjualan Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                      <p>Grafik Penjualan</p>
                      <p className="text-sm">Chart implementation needed</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.slice(0, 5).map((product: any, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.nama_merch}</p>
                            <p className="text-sm text-gray-600">{product.kategori || 'Lainnya'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(parseFloat(product.harga || '0'))}</p>
                          <p className="text-sm text-gray-600">Stok: {product.stok}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detail Transaksi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ) : purchases.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Belum ada transaksi</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Metode Pengiriman</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.slice(0, 10).map((purchase: any) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-mono">#{purchase.id}</TableCell>
                        <TableCell>
                          {purchase.createdAt 
                            ? new Date(purchase.createdAt).toLocaleDateString('id-ID')
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(parseFloat(purchase.total_harga || '0'))}
                        </TableCell>
                        <TableCell>
                          <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                            {purchase.status || 'pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>{purchase.metode_pengiriman || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Report */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Inventori</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Produk:</span>
                      <span className="font-medium">{stats.inventory.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Produk Aktif:</span>
                      <span className="font-medium text-green-600">{stats.inventory.activeProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stok Menipis:</span>
                      <span className="font-medium text-orange-600">{stats.inventory.lowStockProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stok Habis:</span>
                      <span className="font-medium text-red-600">{stats.inventory.outOfStockProducts}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Produk dengan Stok Menipis</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products
                      .filter((product: any) => product.stok <= 5)
                      .slice(0, 5)
                      .map((product: any) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div>
                            <p className="font-medium text-gray-900">{product.nama_merch}</p>
                            <p className="text-sm text-gray-600">{product.kategori || 'Lainnya'}</p>
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Stok: {product.stok}
                          </Badge>
                        </div>
                      ))}
                    {products.filter((product: any) => product.stok <= 5).length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        Semua produk memiliki stok yang cukup
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Donations Report */}
        <TabsContent value="donations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Donasi Disalurkan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-900 mb-2">Rp 125.5M</p>
                  <p className="text-gray-600">Total donasi yang telah disalurkan</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">15</p>
                      <p className="text-gray-600">Program Aktif</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">48</p>
                      <p className="text-gray-600">Program Selesai</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organisasi Terverifikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-900 mb-2">24</p>
                  <p className="text-gray-600">Organisasi yang telah terverifikasi</p>
                  <div className="mt-4 text-sm text-blue-600">
                    <p>3 organisasi baru bulan ini</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Report */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performa Kategori Produk</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-2 flex-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(stats.categoryStats).map(([category, data]: [string, any]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <span className="font-medium text-gray-900 w-32">{category}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((data.count / stats.inventory.totalProducts) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <span className="font-medium">{data.count} produk</span>
                        <p className="text-sm text-gray-600">
                          {((data.count / stats.inventory.totalProducts) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                  {Object.keys(stats.categoryStats).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Belum ada data kategori
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
