import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/product/ProductFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FilterOptions, Product } from '@/types';

export const ProductCatalog = () => {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState<FilterOptions>({
    kategori: '',
    priceMin: undefined,
    priceMax: undefined,
    kondisi: [],
    sortBy: 'newest',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ['/api/merch'],
    queryFn: () => api.getMerch(),
  });

  // Apply filters and sorting
  const filteredProducts = allProducts.filter((product: Product) => {
    // Category filter
    if (filters.kategori && filters.kategori !== 'all' && product.kategori !== filters.kategori) {
      return false;
    }

    // Price filter
    const price = parseFloat(product.harga);
    if (filters.priceMin && price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax && price > filters.priceMax) {
      return false;
    }

    // Condition filter
    if (filters.kondisi && filters.kondisi.length > 0) {
      if (!product.kondisi || !filters.kondisi.includes(product.kondisi)) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return parseFloat(a.harga) - parseFloat(b.harga);
      case 'price_high':
        return parseFloat(b.harga) - parseFloat(a.harga);
      case 'rating':
        return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleProductClick = (product: Product) => {
    setLocation(`/product/${product.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-4">
              Gagal memuat produk. Silakan coba lagi nanti.
            </p>
            <Button onClick={() => window.location.reload()}>
              Muat Ulang
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h1>
        <p className="text-gray-600">
          Temukan produk second-hand berkualitas dengan harga terjangkau
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters 
            onFiltersChange={setFilters}
            isLoading={isLoading}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Menampilkan {paginatedProducts.length} dari {sortedProducts.length} produk
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-3" />
                    <Skeleton className="h-6 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak ada produk ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah filter pencarian Anda atau jelajahi kategori lain
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      kategori: '',
                      priceMin: undefined,
                      priceMax: undefined,
                      kondisi: [],
                      sortBy: 'newest',
                    });
                    setCurrentPage(1);
                  }}
                >
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isVisible = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 2;
                    
                    if (!isVisible) {
                      if (page === currentPage - 3 || page === currentPage + 3) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
