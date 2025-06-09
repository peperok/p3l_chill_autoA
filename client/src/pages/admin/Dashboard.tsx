import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore, getRoleDisplayName } from '@/lib/auth';
import { api } from '@/lib/api';
import { 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp, 
  ShoppingCart,
  Heart,
  DollarSign,
  Calendar
} from 'lucide-react';

export const Dashboard = () => {
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
    enabled: user?.role === 'admin' || user?.role === 'owner',
  });

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter((p: any) => p.status === 'active').length,
    lowStockProducts: products.filter((p: any) => p.stok <= 5).length,
    totalPurchases: purchases.length,
    todayPurchases: purchases.filter((p: any) => {
      const today = new Date().toDateString();
      return new Date(p.createdAt).toDateString() === today;
    }).length,
    totalRevenue: purchases.reduce((sum: number, p: any) => sum + parseFloat(p.total_harga || '0'), 0),
    totalEmployees: employees.length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatsCards = () => {
    const baseCards = [
      {
        title: 'Total Produk',
        value: stats.totalProducts.toString(),
        subtitle: `${stats.activeProducts} aktif`,
        icon: Package,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      },
      {
        title: 'Transaksi Hari Ini',
        value: stats.todayPurchases.toString(),
        subtitle: `Total: ${stats.totalPurchases}`,
        icon: ShoppingCart,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      },
    ];

    const roleSpecificCards = {
      admin: [
        {
          title: 'Total Pegawai',
          value: stats.totalEmployees.toString(),
          subtitle: 'Karyawan aktif',
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
        },
      ],
      owner: [
        {
          title: 'Total Pendapatan',
          value: formatCurrency(stats.totalRevenue),
          subtitle: 'Semua waktu',
          icon: DollarSign,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
        },
      ],
      pegawai_gudang: [
        {
          title: 'Stok Menipis',
          value: stats.lowStockProducts.toString(),
          subtitle: 'Perlu restock',
          icon: Package,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
        },
      ],
    };

    const userRole = user?.role || 'admin';
    return [...baseCards, ...(roleSpecificCards[userRole as keyof typeof roleSpecificCards] || [])];
  };

  const statsCards = getStatsCards();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat Datang, {user?.name}
        </h1>
        <p className="text-gray-600">
          Dashboard {getRoleDisplayName(user?.role || 'admin')} - ReuseMart Admin
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const isLoading = productsLoading || purchasesLoading || (employeesLoading && stat.title.includes('Pegawai'));
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stat.subtitle}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Produk Terbaru</span>
              <Button variant="outline" size="sm">Lihat Semua</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada produk</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-48">
                          {product.nama_merch}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stok: {product.stok} | {formatCurrency(parseFloat(product.harga || '0'))}
                        </p>
                      </div>
                    </div>
                    <Badge variant={product.stok > 5 ? "default" : "destructive"}>
                      {product.status || 'active'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Aktivitas Terbaru</span>
              <Button variant="outline" size="sm">Lihat Semua</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {purchasesLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada transaksi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {purchases.slice(0, 5).map((purchase: any) => (
                  <div key={purchase.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Transaksi #{purchase.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(parseFloat(purchase.total_harga || '0'))} - {purchase.status || 'pending'}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                        {purchase.status || 'pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {(user?.role === 'admin' || user?.role === 'pegawai_gudang') && (
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Package className="w-6 h-6" />
                <span className="text-sm">Tambah Produk</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-sm">Kelola Transaksi</span>
              </Button>
              {user?.role === 'admin' && (
                <>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Kelola Pegawai</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Heart className="w-6 h-6" />
                    <span className="text-sm">Kelola Donasi</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
