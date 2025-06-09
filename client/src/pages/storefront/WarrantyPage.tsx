import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Package, 
  AlertCircle,
  Search,
  FileText,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';

interface WarrantyClaim {
  id: string;
  productName: string;
  purchaseDate: string;
  warrantyPeriod: number;
  status: 'active' | 'expired' | 'claimed';
  claimDate?: string;
  description?: string;
}

export const WarrantyPage = () => {
  const [searchId, setSearchId] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);

  // Sample warranty data
  const warrantyClaims: WarrantyClaim[] = [
    {
      id: 'WRN-001-2024',
      productName: 'iPhone 12 Pro Max 128GB',
      purchaseDate: '2024-01-15',
      warrantyPeriod: 7,
      status: 'active',
    },
    {
      id: 'WRN-002-2024',
      productName: 'Jaket Kulit Vintage Premium',
      purchaseDate: '2024-01-10',
      warrantyPeriod: 7,
      status: 'active',
    },
    {
      id: 'WRN-003-2023',
      productName: 'Kamera Analog Klasik',
      purchaseDate: '2023-12-20',
      warrantyPeriod: 7,
      status: 'expired',
    },
  ];

  const handleSearch = () => {
    const claim = warrantyClaims.find(c => c.id === searchId);
    setSelectedClaim(claim || null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Berakhir</Badge>;
      case 'claimed':
        return <Badge className="bg-blue-100 text-blue-800">Diklaim</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const calculateDaysRemaining = (purchaseDate: string, warrantyDays: number) => {
    const purchase = new Date(purchaseDate);
    const expiry = new Date(purchase.getTime() + (warrantyDays * 24 * 60 * 60 * 1000));
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Garansi Kualitas ReuseMart
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Kami memberikan garansi kualitas 7 hari untuk semua produk. 
          Jika ada masalah dengan barang yang Anda beli, kami siap membantu.
        </p>
      </div>

      <Tabs defaultValue="check" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="check">Cek Garansi</TabsTrigger>
          <TabsTrigger value="policy">Kebijakan Garansi</TabsTrigger>
          <TabsTrigger value="claim">Klaim Garansi</TabsTrigger>
        </TabsList>

        {/* Check Warranty Tab */}
        <TabsContent value="check" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Cek Status Garansi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="warranty-id">ID Garansi</Label>
                  <Input
                    id="warranty-id"
                    placeholder="Masukkan ID garansi (contoh: WRN-001-2024)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} className="mt-6">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>

              {selectedClaim && (
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedClaim.productName}</CardTitle>
                        <p className="text-sm text-gray-600">ID: {selectedClaim.id}</p>
                      </div>
                      {getStatusBadge(selectedClaim.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Tanggal Pembelian</Label>
                        <p className="text-gray-900">{new Date(selectedClaim.purchaseDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Periode Garansi</Label>
                        <p className="text-gray-900">{selectedClaim.warrantyPeriod} hari</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          {selectedClaim.status === 'active' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">Garansi Aktif</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <span className="text-red-600">Garansi Berakhir</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Sisa Waktu</Label>
                        <p className="text-gray-900">
                          {selectedClaim.status === 'active' 
                            ? `${calculateDaysRemaining(selectedClaim.purchaseDate, selectedClaim.warrantyPeriod)} hari`
                            : 'Berakhir'
                          }
                        </p>
                      </div>
                    </div>

                    {selectedClaim.status === 'active' && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Garansi Anda Masih Berlaku</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Jika ada masalah dengan produk ini, Anda dapat mengajukan klaim garansi.
                        </p>
                        <Button className="mt-3 bg-green-600 hover:bg-green-700">
                          Ajukan Klaim Garansi
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {searchId && !selectedClaim && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">ID garansi tidak ditemukan. Pastikan ID yang dimasukkan benar.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warranty Policy Tab */}
        <TabsContent value="policy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Ketentuan Garansi</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Garansi 7 Hari</h4>
                    <p className="text-sm text-gray-600">Semua produk mendapat garansi kualitas selama 7 hari sejak pembelian</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Penggantian atau Pengembalian Dana</h4>
                    <p className="text-sm text-gray-600">Produk yang bermasalah dapat diganti atau dana dikembalikan 100%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Proses Cepat</h4>
                    <p className="text-sm text-gray-600">Klaim garansi diproses maksimal 2x24 jam kerja</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Gratis Ongkos Kirim</h4>
                    <p className="text-sm text-gray-600">Ongkos kirim pengembalian ditanggung ReuseMart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span>Syarat & Ketentuan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Garansi berlaku untuk kerusakan atau cacat yang tidak sesuai dengan deskripsi produk</p>
                  <p>• Produk harus dikembalikan dalam kondisi sama seperti saat diterima</p>
                  <p>• Kerusakan akibat penggunaan normal atau kelalaian pembeli tidak ditanggung</p>
                  <p>• Bukti pembelian (nota/invoice) harus disertakan saat klaim</p>
                  <p>• Produk yang sudah dimodifikasi tidak dapat diklaim garansi</p>
                  <p>• Untuk produk elektronik, garansi tidak berlaku jika segel rusak</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Jenis Masalah yang Ditanggung Garansi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Tidak Sesuai Deskripsi</h4>
                  <p className="text-xs text-gray-600">Produk tidak sesuai dengan foto atau deskripsi yang tertera</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Cacat Tersembunyi</h4>
                  <p className="text-xs text-gray-600">Kerusakan yang tidak terlihat saat pembelian namun muncul kemudian</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Kualitas Tidak Sesuai</h4>
                  <p className="text-xs text-gray-600">Produk tidak berfungsi dengan baik atau kualitas buruk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claim Warranty Tab */}
        <TabsContent value="claim" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Cara Mengajukan Klaim Garansi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-medium mb-2">Siapkan Dokumen</h4>
                  <p className="text-sm text-gray-600">ID garansi, foto produk bermasalah, dan bukti pembelian</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-blue-600">2</span>
                  </div>
                  <h4 className="font-medium mb-2">Hubungi Customer Service</h4>
                  <p className="text-sm text-gray-600">Kontak CS melalui WhatsApp, email, atau telepon</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-blue-600">3</span>
                  </div>
                  <h4 className="font-medium mb-2">Verifikasi Klaim</h4>
                  <p className="text-sm text-gray-600">Tim kami akan memverifikasi klaim dalam 1x24 jam</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-blue-600">4</span>
                  </div>
                  <h4 className="font-medium mb-2">Penyelesaian</h4>
                  <p className="text-sm text-gray-600">Penggantian produk atau pengembalian dana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak Customer Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-medium mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-600 mb-3">Chat langsung dengan CS</p>
                  <Button variant="outline" className="w-full">
                    +62 812-3456-7890
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-medium mb-2">Email</h4>
                  <p className="text-sm text-gray-600 mb-3">Kirim detail masalah via email</p>
                  <Button variant="outline" className="w-full">
                    warranty@reusemart.com
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-medium mb-2">Jam Operasional</h4>
                  <p className="text-sm text-gray-600">Senin - Sabtu</p>
                  <p className="text-sm text-gray-600">09:00 - 18:00 WIB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};