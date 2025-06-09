import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { 
  Heart,
  ShoppingCart,
  Search,
  Trash2,
  Star,
  Eye,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

interface WishlistItem {
  id: number;
  productId: number;
  productName: string;
  price: string;
  originalPrice?: string;
  image?: string;
  category: string;
  rating: string;
  reviewCount: number;
  availability: 'in_stock' | 'out_of_stock' | 'low_stock';
  addedDate: string;
}

export const WishlistPage = () => {
  const { user } = useAuthStore();
  const { addItem } = useCart();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample wishlist data - in real app this would come from API
  const wishlistItems: WishlistItem[] = [
    {
      id: 1,
      productId: 1,
      productName: "iPhone 12 Pro Max 128GB",
      price: "8500000",
      originalPrice: "9000000",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Elektronik",
      rating: "4.8",
      reviewCount: 24,
      availability: "in_stock",
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      productId: 2,
      productName: "Jaket Kulit Vintage Premium",
      price: "250000",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Fashion",
      rating: "4.5",
      reviewCount: 16,
      availability: "low_stock",
      addedDate: "2024-01-20"
    },
    {
      id: 3,
      productId: 3,
      productName: "Meja Kerja Kayu Vintage",
      price: "450000",
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      category: "Furnitur",
      rating: "4.7",
      reviewCount: 12,
      availability: "out_of_stock",
      addedDate: "2024-01-10"
    }
  ];

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (itemId: number) => {
      // In real app, this would call API to remove from wishlist
      return Promise.resolve();
    },
    onSuccess: () => {
      toast({
        title: "Produk dihapus dari wishlist",
        description: "Produk berhasil dihapus dari daftar keinginan Anda.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
    },
  });

  const addToCartHandler = (item: WishlistItem) => {
    if (item.availability === 'out_of_stock') {
      toast({
        title: "Produk tidak tersedia",
        description: "Produk ini sedang tidak tersedia.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: 1,
      image: item.image,
    });

    toast({
      title: "Ditambahkan ke keranjang",
      description: `${item.productName} telah ditambahkan ke keranjang.`,
    });
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'in_stock':
        return <Badge className="bg-green-100 text-green-800">Tersedia</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-100 text-yellow-800">Stok Terbatas</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-800">Habis</Badge>;
      default:
        return null;
    }
  };

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Silakan Login
            </h2>
            <p className="text-gray-600">
              Anda perlu login untuk melihat wishlist.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist</h1>
          <p className="text-gray-600">
            {filteredItems.length} produk dalam daftar keinginan Anda
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Semua Kategori' : category}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wishlist Kosong
              </h3>
              <p className="text-gray-600 mb-6">
                Belum ada produk yang ditambahkan ke wishlist. Mulai menjelajahi produk dan tambahkan yang Anda sukai!
              </p>
              <Button>
                Jelajahi Produk
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                    {getAvailabilityBadge(item.availability)}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.productName}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {item.rating} ({item.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(parseInt(item.price))}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(parseInt(item.originalPrice))}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => addToCartHandler(item)}
                      disabled={item.availability === 'out_of_stock'}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.availability === 'out_of_stock' ? 'Habis' : 'Keranjang'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlistMutation.mutate(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Ditambahkan {new Date(item.addedDate).toLocaleDateString('id-ID')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-48 h-48 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900 mt-1">
                            {item.productName}
                          </h3>
                        </div>
                        {getAvailabilityBadge(item.availability)}
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {item.rating} ({item.reviewCount} review)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(parseInt(item.price))}
                        </span>
                        {item.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatCurrency(parseInt(item.originalPrice))}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        Ditambahkan pada {new Date(item.addedDate).toLocaleDateString('id-ID')}
                      </p>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={() => addToCartHandler(item)}
                          disabled={item.availability === 'out_of_stock'}
                          className="min-w-40"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {item.availability === 'out_of_stock' ? 'Stok Habis' : 'Tambah ke Keranjang'}
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Detail
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlistMutation.mutate(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};