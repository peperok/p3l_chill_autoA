import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { 
  Heart,
  Gift,
  Users,
  CheckCircle,
  Info,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface DonationRequest {
  id: number;
  nama_organisasi: string;
  deskripsi: string;
  kategori_barang: string;
  jumlah_dibutuhkan: number;
  batas_waktu: string;
  kontak: string;
  alamat: string;
  status: 'active' | 'fulfilled' | 'expired';
  created_at: string;
}

export const DonationPage = () => {
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    deskripsi: '',
    kategori_barang: '',
    jumlah_dibutuhkan: '',
    batas_waktu: '',
    alamat: '',
    kontak: '',
  });

  // Sample donation requests data
  const donationRequests: DonationRequest[] = [
    {
      id: 1,
      nama_organisasi: "Yayasan Pendidikan Anak Bangsa",
      deskripsi: "Membutuhkan laptop bekas untuk program pembelajaran digital anak-anak kurang mampu",
      kategori_barang: "Elektronik",
      jumlah_dibutuhkan: 10,
      batas_waktu: "2024-02-15",
      kontak: "021-5555-1234",
      alamat: "Jl. Pendidikan No. 123, Jakarta Selatan",
      status: "active",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      nama_organisasi: "Panti Asuhan Kasih Sayang",
      deskripsi: "Memerlukan pakaian layak pakai untuk anak-anak usia 5-15 tahun",
      kategori_barang: "Pakaian",
      jumlah_dibutuhkan: 50,
      batas_waktu: "2024-02-28",
      kontak: "021-5555-5678",
      alamat: "Jl. Kasih No. 456, Bekasi",
      status: "active",
      created_at: "2024-01-20"
    },
    {
      id: 3,
      nama_organisasi: "Perpustakaan Desa Harapan",
      deskripsi: "Mencari buku-buku pelajaran dan novel untuk memperkaya koleksi perpustakaan desa",
      kategori_barang: "Buku",
      jumlah_dibutuhkan: 100,
      batas_waktu: "2024-03-10",
      kontak: "0821-9999-8888",
      alamat: "Desa Harapan, Bogor",
      status: "active",
      created_at: "2024-01-25"
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitDonation = async () => {
    if (!user) {
      toast({
        title: "Silakan login terlebih dahulu",
        description: "Anda harus login sebagai organisasi untuk membuat permintaan donasi.",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== 'organisasi') {
      toast({
        title: "Akses ditolak",
        description: "Hanya organisasi yang dapat membuat permintaan donasi.",
        variant: "destructive",
      });
      return;
    }

    try {
      // In real app, this would call the API
      console.log('Submitting donation request:', formData);
      
      toast({
        title: "Permintaan donasi berhasil dibuat",
        description: "Permintaan Anda akan ditampilkan setelah diverifikasi.",
      });

      setShowForm(false);
      setFormData({
        deskripsi: '',
        kategori_barang: '',
        jumlah_dibutuhkan: '',
        batas_waktu: '',
        alamat: '',
        kontak: '',
      });
    } catch (error) {
      toast({
        title: "Gagal membuat permintaan",
        description: "Terjadi kesalahan, silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'fulfilled':
        return <Badge className="bg-blue-100 text-blue-800">Terpenuhi</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Berakhir</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Program Donasi ReuseMart
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Menghubungkan organisasi yang membutuhkan dengan orang-orang yang ingin berbagi. 
          Mari bersama-sama memberikan kehidupan kedua untuk barang-barang yang masih layak pakai.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="p-6">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">152</h3>
            <p className="text-gray-600">Donasi Terkumpul</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">45</h3>
            <p className="text-gray-600">Organisasi Terbantu</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Gift className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">28</h3>
            <p className="text-gray-600">Permintaan Aktif</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Request Button */}
      {user?.role === 'organisasi' && (
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Gift className="w-5 h-5 mr-2" />
            Buat Permintaan Donasi
          </Button>
        </div>
      )}

      {/* Donation Request Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buat Permintaan Donasi Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="deskripsi">Deskripsi Kebutuhan</Label>
              <Textarea
                id="deskripsi"
                placeholder="Jelaskan barang apa yang dibutuhkan dan untuk keperluan apa..."
                value={formData.deskripsi}
                onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kategori">Kategori Barang</Label>
                <Input
                  id="kategori"
                  placeholder="contoh: Elektronik, Pakaian, Buku"
                  value={formData.kategori_barang}
                  onChange={(e) => handleInputChange('kategori_barang', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="jumlah">Jumlah Dibutuhkan</Label>
                <Input
                  id="jumlah"
                  type="number"
                  placeholder="Jumlah item yang dibutuhkan"
                  value={formData.jumlah_dibutuhkan}
                  onChange={(e) => handleInputChange('jumlah_dibutuhkan', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="batas_waktu">Batas Waktu</Label>
                <Input
                  id="batas_waktu"
                  type="date"
                  value={formData.batas_waktu}
                  onChange={(e) => handleInputChange('batas_waktu', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="kontak">Kontak</Label>
                <Input
                  id="kontak"
                  placeholder="Nomor telepon atau email"
                  value={formData.kontak}
                  onChange={(e) => handleInputChange('kontak', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="alamat">Alamat Lengkap</Label>
              <Textarea
                id="alamat"
                placeholder="Alamat lengkap untuk pengiriman donasi..."
                value={formData.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSubmitDonation} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Kirim Permintaan
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Donation Requests */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Permintaan Donasi Aktif</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {donationRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.nama_organisasi}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Kategori: {request.kategori_barang}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{request.deskripsi}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-2" />
                    <span>Dibutuhkan: {request.jumlah_dibutuhkan} item</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Batas waktu: {new Date(request.batas_waktu).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{request.kontak}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{request.alamat}</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Donasikan Barang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Cara Berdonasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Pilih Permintaan</h3>
              <p className="text-sm text-gray-600">Lihat daftar permintaan donasi yang sesuai dengan barang yang ingin Anda sumbangkan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Hubungi Organisasi</h3>
              <p className="text-sm text-gray-600">Kontak organisasi melalui nomor atau email yang tertera untuk koordinasi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Kirim atau Antar</h3>
              <p className="text-sm text-gray-600">Kirimkan barang sesuai kesepakatan atau antar langsung ke alamat yang ditentukan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};