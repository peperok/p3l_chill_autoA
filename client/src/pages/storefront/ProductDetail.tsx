import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  ArrowLeft,
  Plus,
  Minus,
  Share2,
  MessageCircle
} from 'lucide-react';
import type { Product } from '@/types';

interface ProductDetailProps {
  productId: number;
}

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/merch', productId],
    queryFn: () => api.getMerchById(productId),
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['/api/merch'],
    queryFn: () => api.getMerch(),
    select: (data) => data
      .filter((p: Product) => p.id !== productId && p.kategori === product?.kategori)
      .slice(0, 4),
    enabled: !!product,
  });

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product.id,
      productName: product.nama_merch,
      price: product.harga,
      quantity,
      image: product.foto_utama,
    });

    toast({
      title: 'Produk ditambahkan',
      description: `${product.nama_merch} sebanyak ${quantity} item telah ditambahkan ke keranjang`,
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist',
      description: `${product?.nama_merch} ${isWishlisted ? 'dihapus dari' : 'ditambahkan ke'} wishlist`,
    });
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getConditionInfo = (kondisi?: string) => {
    const conditions = {
      'sangat_baik': { label: 'Sangat Baik', color: 'bg-green-100 text-green-800' },
      'baik': { label: 'Baik', color: 'bg-blue-100 text-blue-800' },
      'cukup': { label: 'Cukup', color: 'bg-yellow-100 text-yellow-800' },
    };
    return conditions[kondisi as keyof typeof conditions] || conditions.baik;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="w-full h-96 rounded-lg mb-4" />
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Produk Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-4">
              Produk yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Link href="/catalog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Katalog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = [product.foto_utama, ...(product.foto_tambahan || [])].filter(Boolean);
  const conditionInfo = getConditionInfo(product.kondisi);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-primary">Beranda</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-primary">Katalog</Link>
        <span>/</span>
        <span className="text-gray-900">{product.nama_merch}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={images[selectedImage] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'}
              alt={product.nama_merch}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
              }}
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.nama_merch} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge className={conditionInfo.color}>
              {conditionInfo.label}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleWishlistToggle}>
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.nama_merch}
          </h1>

          {product.kategori && (
            <div className="text-sm text-gray-600 mb-4">
              Kategori: <span className="font-medium">{product.kategori}</span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(parseFloat(product.rating || '0'))
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating || '0'} ({product.jumlah_review || 0} ulasan)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.harga)}
            </span>
          </div>

          {/* Description */}
          {product.deskripsi && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
              <p className="text-gray-600">{product.deskripsi}</p>
            </div>
          )}

          {/* Stock & Quantity */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Stok: {product.stok}</span>
              {product.stok <= 5 && product.stok > 0 && (
                <Badge variant="outline" className="text-orange-600">
                  Stok Terbatas
                </Badge>
              )}
            </div>

            {product.stok > 0 && (
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stok, quantity + 1))}
                    disabled={quantity >= product.stok}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            {product.stok > 0 ? (
              <Button 
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
            ) : (
              <Button disabled className="w-full" size="lg">
                Stok Habis
              </Button>
            )}
            
            <Button variant="outline" className="w-full" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Tanya Penjual
            </Button>
          </div>

          {/* Product Features */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Garansi kualitas 7 hari</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Gratis ongkir untuk pembelian {'>'} Rp 500.000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produk Serupa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct: Product) => (
              <Card key={relatedProduct.id} className="product-card cursor-pointer">
                <div className="relative">
                  <img
                    src={relatedProduct.foto_utama || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'}
                    alt={relatedProduct.nama_merch}
                    className="w-full h-48 object-cover rounded-t-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.nama_merch}
                  </h3>
                  <div className="text-lg font-bold text-primary">
                    {formatPrice(relatedProduct.harga)}
                  </div>
                  <Link href={`/product/${relatedProduct.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Lihat Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
