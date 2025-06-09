import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useAuthStore } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { ArrowLeft, CreditCard, Truck, MapPin } from 'lucide-react';

const checkoutSchema = z.object({
  alamat_pengiriman: z.string().min(1, 'Alamat pengiriman wajib diisi'),
  metode_pengiriman: z.enum(['kurir', 'ambil_sendiri'], {
    required_error: 'Pilih metode pengiriman',
  }),
  catatan: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      alamat_pengiriman: '',
      metode_pengiriman: 'kurir',
      catatan: '',
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      // Create pembelian
      const pembelian = await api.createPembelian();
      
      // You would normally create detail_pembelian entries here
      // and handle payment processing
      
      return pembelian;
    },
    onSuccess: (data) => {
      clearCart();
      toast({
        title: 'Pesanan berhasil dibuat',
        description: `Pesanan #${data.id} telah dibuat. Silakan lakukan pembayaran.`,
      });
      // Redirect to order confirmation page
      window.location.href = `/orders/${data.id}`;
    },
    onError: (error: any) => {
      toast({
        title: 'Gagal membuat pesanan',
        description: error.message || 'Terjadi kesalahan saat memproses pesanan',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    createOrderMutation.mutate(data);
  };

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(typeof price === 'string' ? parseFloat(price) : price);
  };

  const subtotal = getTotalPrice();
  const shippingCost = form.watch('metode_pengiriman') === 'kurir' ? 25000 : 0;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-gray-600 mb-4">
              Tidak ada produk dalam keranjang untuk di-checkout
            </p>
            <Link href="/catalog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lanjut Belanja
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/catalog" className="inline-flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali Belanja
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Alamat Pengiriman</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="alamat_pengiriman">Alamat Lengkap</Label>
                  <Textarea
                    id="alamat_pengiriman"
                    placeholder="Masukkan alamat pengiriman lengkap..."
                    {...form.register('alamat_pengiriman')}
                  />
                  {form.formState.errors.alamat_pengiriman && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.alamat_pengiriman.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Metode Pengiriman</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={form.watch('metode_pengiriman')}
                  onValueChange={(value) => form.setValue('metode_pengiriman', value as 'kurir' | 'ambil_sendiri')}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="kurir" id="kurir" />
                    <Label htmlFor="kurir" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Kurir (Rp 25.000)</div>
                        <div className="text-sm text-gray-600">Dikirim dengan kurir terpercaya</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="ambil_sendiri" id="ambil_sendiri" />
                    <Label htmlFor="ambil_sendiri" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Ambil Sendiri (Gratis)</div>
                        <div className="text-sm text-gray-600">Ambil di toko kami</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.metode_pengiriman && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.metode_pengiriman.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Catatan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Catatan untuk penjual (opsional)..."
                  {...form.register('catatan')}
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Metode Pembayaran</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Transfer Bank</div>
                  <div className="text-sm text-gray-600">
                    Pembayaran melalui transfer bank (BCA, Mandiri, BNI)
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.productName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="font-medium">
                      {formatPrice(parseFloat(item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Cost Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={createOrderMutation.isPending}
                className="w-full"
                size="lg"
              >
                {createOrderMutation.isPending ? 'Memproses...' : `Bayar ${formatPrice(total)}`}
              </Button>

              <p className="text-xs text-gray-600 text-center">
                Dengan melanjutkan, Anda menyetujui{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                kami
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
