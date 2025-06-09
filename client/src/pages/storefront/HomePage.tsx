import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/ProductCard';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { ArrowRight, Users, Box, Handshake, Leaf } from 'lucide-react';

export const HomePage = () => {
  const { user } = useAuthStore();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/merch'],
    queryFn: () => api.getMerch(),
  });

  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);

  const categories = [
    { name: 'Elektronik', icon: '📱', count: 245 },
    { name: 'Fashion', icon: '👕', count: 189 },
    { name: 'Furnitur', icon: '🪑', count: 156 },
    { name: 'Otomotif', icon: '🚗', count: 98 },
    { name: 'Buku & Media', icon: '📚', count: 134 },
    { name: 'Olahraga', icon: '⚽', count: 87 },
  ];

  const stats = [
    { label: 'Produk Tersedia', value: '15,248', icon: Box },
    { label: 'Pelanggan Senang', value: '8,592', icon: Users },
    { label: 'Transaksi Sukses', value: '24,196', icon: Handshake },
    { label: 'CO₂ Terhemat', value: '127 ton', icon: Leaf },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Belanja Berkelanjutan, Hemat & Berkualitas
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Temukan produk second-hand berkualitas dengan harga terjangkau. 
                Dukung ekonomi sirkular dan lindungi lingkungan!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
                    Jelajahi Katalog
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                {user?.role === 'organisasi' && (
                  <Link href="/donations/request">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-primary"
                    >
                      Ajukan Donasi
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Sustainable shopping marketplace"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Kategori Populer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/catalog?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} produk
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Produk Unggulan</h2>
            <Link href="/catalog">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onProductClick={(product) => {
                    window.location.href = `/product/${product.id}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Mengapa Pilih ReuseMart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Garansi Kualitas
                </h3>
                <p className="text-gray-600">
                  Setiap produk telah melewati pengecekan kualitas dan dilengkapi garansi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Pengiriman Aman
                </h3>
                <p className="text-gray-600">
                  Sistem pengiriman terpercaya dengan tracking real-time
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Ramah Lingkungan
                </h3>
                <p className="text-gray-600">
                  Berkontribusi pada ekonomi sirkular dan pengurangan limbah
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action for Organizations */}
      {user?.role === 'organisasi' && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Untuk Organisasi Sosial
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Ajukan permintaan donasi untuk kegiatan sosial Anda. 
              Kami mendukung program-program yang bermanfaat untuk masyarakat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donations/request">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
                  Ajukan Donasi
                </Button>
              </Link>
              <Link href="/donations">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Lihat Program Aktif
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
