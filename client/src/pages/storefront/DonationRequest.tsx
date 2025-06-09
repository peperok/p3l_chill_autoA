import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/auth';
import { Heart, Calendar, Target, FileText } from 'lucide-react';

const donationRequestSchema = z.object({
  judul_donasi: z.string().min(1, 'Judul program donasi wajib diisi'),
  deskripsi: z.string().min(50, 'Deskripsi minimal 50 karakter'),
  target_donasi: z.string().min(1, 'Target donasi wajib diisi'),
  tanggal_mulai: z.string().min(1, 'Tanggal mulai wajib diisi'),
  tanggal_selesai: z.string().min(1, 'Tanggal selesai wajib diisi'),
});

type DonationRequestFormData = z.infer<typeof donationRequestSchema>;

export const DonationRequest = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonationRequestFormData>({
    resolver: zodResolver(donationRequestSchema),
    defaultValues: {
      judul_donasi: '',
      deskripsi: '',
      target_donasi: '',
      tanggal_mulai: '',
      tanggal_selesai: '',
    },
  });

  const onSubmit = async (data: DonationRequestFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the request to your API
      // For now, we'll simulate the request
      
      console.log('Donation request data:', {
        ...data,
        id_organisasi: user?.id,
        target_donasi: parseFloat(data.target_donasi),
        status: 'pending',
      });

      toast({
        title: 'Pengajuan berhasil dikirim',
        description: 'Tim kami akan meninjau pengajuan donasi Anda dalam 1-2 hari kerja.',
      });

      // Reset form
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Gagal mengirim pengajuan',
        description: error.message || 'Terjadi kesalahan saat mengirim pengajuan',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ajukan Program Donasi
        </h1>
        <p className="text-gray-600">
          Sampaikan kebutuhan donasi organisasi Anda untuk program sosial yang bermanfaat
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Detail Program Donasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Program Title */}
                <div>
                  <Label htmlFor="judul_donasi">Judul Program Donasi</Label>
                  <Input
                    id="judul_donasi"
                    placeholder="Contoh: Bantuan Sembako untuk Korban Bencana"
                    {...form.register('judul_donasi')}
                  />
                  {form.formState.errors.judul_donasi && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.judul_donasi.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="deskripsi">Deskripsi Program</Label>
                  <Textarea
                    id="deskripsi"
                    rows={6}
                    placeholder="Jelaskan detail program donasi, latar belakang, tujuan, dan bagaimana donasi akan digunakan..."
                    {...form.register('deskripsi')}
                  />
                  {form.formState.errors.deskripsi && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.deskripsi.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Minimal 50 karakter ({form.watch('deskripsi').length}/50)
                  </p>
                </div>

                {/* Target Amount */}
                <div>
                  <Label htmlFor="target_donasi">Target Donasi (Rp)</Label>
                  <Input
                    id="target_donasi"
                    placeholder="1.000.000"
                    value={formatCurrency(form.watch('target_donasi'))}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      form.setValue('target_donasi', value);
                    }}
                  />
                  {form.formState.errors.target_donasi && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.target_donasi.message}
                    </p>
                  )}
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tanggal_mulai">Tanggal Mulai</Label>
                    <Input
                      id="tanggal_mulai"
                      type="date"
                      {...form.register('tanggal_mulai')}
                    />
                    {form.formState.errors.tanggal_mulai && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.tanggal_mulai.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
                    <Input
                      id="tanggal_selesai"
                      type="date"
                      {...form.register('tanggal_selesai')}
                    />
                    {form.formState.errors.tanggal_selesai && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.tanggal_selesai.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Donasi'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organization Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Organisasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nama Organisasi</Label>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Panduan Pengajuan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Pastikan program donasi jelas dan spesifik</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Sertakan rincian penggunaan dana yang transparan</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Target donasi harus realistis dan dapat dipertanggungjawabkan</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Tim kami akan meninjau dalam 1-2 hari kerja</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Proses Persetujuan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Pengajuan Dikirim</p>
                    <p className="text-gray-600">Formulir donasi disubmit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Review Tim</p>
                    <p className="text-gray-600">1-2 hari kerja</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Publikasi Program</p>
                    <p className="text-gray-600">Jika disetujui</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
