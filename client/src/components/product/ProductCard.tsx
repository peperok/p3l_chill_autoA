import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      productName: product.nama_merch,
      price: product.harga,
      quantity: 1,
      image: product.foto_utama,
    });

    toast({
      title: 'Produk ditambahkan',
      description: `${product.nama_merch} telah ditambahkan ke keranjang`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist',
      description: `${product.nama_merch} ${isWishlisted ? 'dihapus dari' : 'ditambahkan ke'} wishlist`,
    });
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getConditionBadge = (kondisi?: string) => {
    const conditionMap = {
      'sangat_baik': { label: 'Sangat Baik', variant: 'default' as const },
      'baik': { label: 'Baik', variant: 'secondary' as const },
      'cukup': { label: 'Cukup', variant: 'outline' as const },
    };
    
    const condition = kondisi || 'baik';
    return conditionMap[condition as keyof typeof conditionMap] || conditionMap.baik;
  };

  const conditionInfo = getConditionBadge(product.kondisi);

  return (
    <Card 
      className="product-card cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      <div className="relative">
        {product.foto_utama ? (
          <img
            src={product.foto_utama}
            alt={product.nama_merch}
            className="w-full h-48 object-cover rounded-t-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <Badge variant={conditionInfo.variant}>
            {conditionInfo.label}
          </Badge>
        </div>
        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(parseFloat(product.rating || '0'))
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.jumlah_review || 0})
            </span>
          </div>
          
          {product.stok <= 5 && product.stok > 0 && (
            <Badge variant="outline" className="text-xs">
              Stok: {product.stok}
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.nama_merch}
        </h3>
        
        {product.deskripsi && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.deskripsi}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.harga)}
            </span>
            {product.kategori && (
              <div className="text-xs text-gray-500 mt-1">
                {product.kategori}
              </div>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stok === 0}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah</span>
          </Button>
        </div>
        
        {product.stok === 0 && (
          <div className="mt-2">
            <Badge variant="destructive" className="w-full justify-center">
              Stok Habis
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
