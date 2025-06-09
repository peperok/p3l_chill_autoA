import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
import { api } from '@/lib/api';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import type { Product } from '@/types';

const productSchema = z.object({
  nama_merch: z.string().min(1, 'Nama produk wajib diisi'),
  deskripsi: z.string().optional(),
  kategori: z.string().optional(),
  harga: z.string().min(1, 'Harga wajib diisi'),
  stok: z.number().min(0, 'Stok tidak boleh negatif'),
  kondisi: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ProductManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/merch'],
    queryFn: () => api.getMerch(),
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nama_merch: '',
      deskripsi: '',
      kategori: '',
      harga: '',
      stok: 0,
      kondisi: 'baik',
    },
  });

  const createProductMutation = useMutation({
    mutationFn: (data: ProductFormData) => api.createMerch({
      nama_merch: data.nama_merch,
      stok: data.stok,
      deskripsi: data.deskripsi,
      kategori: data.kategori,
      harga: data.harga,
      kondisi: data.kondisi,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/merch'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: 'Produk berhasil dibuat',
        description: 'Produk baru telah ditambahkan ke katalog.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal membuat produk',
        description: error.message || 'Terjadi kesalahan saat membuat produk',
        variant: 'destructive',
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) =>
      api.updateMerch(id, {
        nama_merch: data.nama_merch,
        stok: data.stok,
        deskripsi: data.deskripsi,
        kategori: data.kategori,
        harga: data.harga,
        kondisi: data.kondisi,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/merch'] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      form.reset();
      toast({
        title: 'Produk berhasil diperbarui',
        description: 'Perubahan telah disimpan.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal memperbarui produk',
        description: error.message || 'Terjadi kesalahan saat memperbarui produk',
        variant: 'destructive',
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => api.deleteMerch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/merch'] });
      toast({
        title: 'Produk berhasil dihapus',
        description: 'Produk telah dihapus dari katalog.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal menghapus produk',
        description: error.message || 'Terjadi kesalahan saat menghapus produk',
        variant: 'destructive',
      });
    },
  });

  const filteredProducts = products.filter((product: Product) =>
    product.nama_merch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.kategori && product.kategori.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      nama_merch: product.nama_merch,
      deskripsi: product.deskripsi || '',
      kategori: product.kategori || '',
      harga: product.harga,
      stok: product.stok,
      kondisi: product.kondisi || 'baik',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const categories = [
    'Elektronik',
    'Fashion',
    'Furnitur',
    'Otomotif',
    'Buku & Media',
    'Olahraga',
    'Rumah Tangga',
    'Hobi & Koleksi',
  ];

  const conditions = [
    { value: 'sangat_baik', label: 'Sangat Baik' },
    { value: 'baik', label: 'Baik' },
    { value: 'cukup', label: 'Cukup' },
  ];

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-4">
              Gagal memuat data produk. Silakan coba lagi nanti.
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600">Kelola katalog produk ReuseMart</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProduct(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nama_merch">Nama Produk</Label>
                  <Input
                    id="nama_merch"
                    placeholder="Masukkan nama produk"
                    {...form.register('nama_merch')}
                  />
                  {form.formState.errors.nama_merch && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.nama_merch.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="kategori">Kategori</Label>
                  <Select
                    value={form.watch('kategori')}
                    onValueChange={(value) => form.setValue('kategori', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="kondisi">Kondisi</Label>
                  <Select
                    value={form.watch('kondisi')}
                    onValueChange={(value) => form.setValue('kondisi', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kondisi" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="harga">Harga (Rp)</Label>
                  <Input
                    id="harga"
                    type="number"
                    placeholder="0"
                    {...form.register('harga')}
                  />
                  {form.formState.errors.harga && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.harga.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="stok">Stok</Label>
                  <Input
                    id="stok"
                    type="number"
                    placeholder="0"
                    {...form.register('stok', { valueAsNumber: true })}
                  />
                  {form.formState.errors.stok && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.stok.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    rows={4}
                    placeholder="Masukkan deskripsi produk"
                    {...form.register('deskripsi')}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                >
                  {createProductMutation.isPending || updateProductMutation.isPending
                    ? 'Menyimpan...'
                    : editingProduct
                    ? 'Perbarui'
                    : 'Simpan'
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'Tidak ada produk ditemukan' : 'Belum ada produk'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? 'Coba ubah kata kunci pencarian Anda'
                  : 'Mulai dengan menambahkan produk pertama Anda'
                }
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Kondisi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.nama_merch}
                            </p>
                            {product.deskripsi && (
                              <p className="text-sm text-gray-600 truncate max-w-48">
                                {product.deskripsi}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.kategori || (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{formatPrice(product.harga)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{product.stok}</span>
                          {product.stok <= 5 && product.stok > 0 && (
                            <Badge variant="outline" className="text-orange-600">
                              Menipis
                            </Badge>
                          )}
                          {product.stok === 0 && (
                            <Badge variant="destructive">Habis</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {product.kondisi === 'sangat_baik' && 'Sangat Baik'}
                          {product.kondisi === 'baik' && 'Baik'}
                          {product.kondisi === 'cukup' && 'Cukup'}
                          {!product.kondisi && 'Baik'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            disabled={deleteProductMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
