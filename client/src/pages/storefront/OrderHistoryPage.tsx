import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { 
  Package,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Star,
  Download,
  Eye,
  RotateCcw
} from 'lucide-react';

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  shippingAddress: string;
  trackingNumber?: string;
}

export const OrderHistoryPage = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['/api/pembelian'],
    queryFn: () => api.getPembelian(),
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Menunggu' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Package, label: 'Diproses' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Dikirim' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Selesai' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Dibatalkan' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = searchTerm === '' || 
      order.id.toString().includes(searchTerm) ||
      order.total_harga?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o: any) => o.status === 'pending').length,
      completed: orders.filter((o: any) => o.status === 'completed').length,
      cancelled: orders.filter((o: any) => o.status === 'cancelled').length,
    };
  };

  const stats = getOrderStats();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Silakan Login
            </h2>
            <p className="text-gray-600">
              Anda perlu login untuk melihat riwayat pembelian.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Pembelian</h1>
          <p className="text-gray-600">Pantau status dan kelola pesanan Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Pesanan</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600">Menunggu</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-sm text-gray-600">Selesai</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              <p className="text-sm text-gray-600">Dibatalkan</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setSelectedStatus('all')}>
                Semua
              </TabsTrigger>
              <TabsTrigger value="pending" onClick={() => setSelectedStatus('pending')}>
                Menunggu
              </TabsTrigger>
              <TabsTrigger value="processing" onClick={() => setSelectedStatus('processing')}>
                Diproses
              </TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setSelectedStatus('completed')}>
                Selesai
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari nomor pesanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Belum Ada Pesanan
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Anda belum memiliki riwayat pembelian. Mulai berbelanja sekarang!
                  </p>
                  <Button>
                    Mulai Belanja
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order: any) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                Pesanan #{order.id}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(order.createdAt).toLocaleDateString('id-ID')}
                                </span>
                                {order.trackingNumber && (
                                  <span className="flex items-center">
                                    <Truck className="w-4 h-4 mr-1" />
                                    {order.trackingNumber}
                                  </span>
                                )}
                              </div>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Total Pembayaran</span>
                              <span className="font-semibold text-lg">
                                {formatCurrency(parseFloat(order.total_harga || '0'))}
                              </span>
                            </div>
                            {order.metode_pengiriman && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Metode Pengiriman</span>
                                <span className="text-sm capitalize">
                                  {order.metode_pengiriman.replace('_', ' ')}
                                </span>
                              </div>
                            )}
                            {order.alamat_pengiriman && (
                              <div className="flex justify-between items-start">
                                <span className="text-sm text-gray-600">Alamat Pengiriman</span>
                                <span className="text-sm text-right max-w-xs">
                                  {order.alamat_pengiriman}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 lg:ml-6">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Detail
                          </Button>
                          
                          {order.status === 'completed' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Invoice
                              </Button>
                              <Button variant="outline" size="sm">
                                <Star className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                              <Button variant="outline" size="sm">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Beli Lagi
                              </Button>
                            </>
                          )}
                          
                          {order.status === 'pending' && (
                            <Button variant="destructive" size="sm">
                              <XCircle className="w-4 h-4 mr-2" />
                              Batalkan
                            </Button>
                          )}
                          
                          {order.status === 'shipped' && (
                            <Button size="sm">
                              <Truck className="w-4 h-4 mr-2" />
                              Lacak Paket
                            </Button>
                          )}
                        </div>
                      </div>

                      {order.catatan && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Catatan: </span>
                            {order.catatan}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents would be similar but filtered */}
          <TabsContent value="pending">
            {/* Same content as "all" but filtered for pending orders */}
          </TabsContent>
          
          <TabsContent value="processing">
            {/* Same content as "all" but filtered for processing orders */}
          </TabsContent>
          
          <TabsContent value="completed">
            {/* Same content as "all" but filtered for completed orders */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};