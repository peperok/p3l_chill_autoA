import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { 
  Gift,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Trophy,
  Crown,
  Sparkles,
  Calendar,
  ShoppingBag,
  Coins
} from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'product' | 'service' | 'exclusive';
  image?: string;
  validUntil?: string;
  available: boolean;
  limitedQuantity?: number;
  remainingQuantity?: number;
}

interface Transaction {
  id: number;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: string;
  orderId?: string;
}

export const RewardsPage = () => {
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample user points data
  const userPoints = {
    current: 1250,
    lifetime: 3420,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 750,
  };

  // Sample rewards data
  const rewards: Reward[] = [
    {
      id: 1,
      name: "Diskon 10%",
      description: "Potongan 10% untuk pembelian berikutnya, maksimal Rp 50.000",
      pointsCost: 500,
      category: "discount",
      validUntil: "2024-03-31",
      available: true,
    },
    {
      id: 2,
      name: "Gratis Ongkir",
      description: "Bebas ongkos kirim untuk seluruh Indonesia, berlaku 1x",
      pointsCost: 300,
      category: "service",
      validUntil: "2024-02-29",
      available: true,
    },
    {
      id: 3,
      name: "Tas Eksklusif ReuseMart",
      description: "Tas canvas premium dengan logo ReuseMart, edisi terbatas",
      pointsCost: 2000,
      category: "product",
      available: true,
      limitedQuantity: 50,
      remainingQuantity: 12,
    },
    {
      id: 4,
      name: "Early Access Sale",
      description: "Akses khusus ke sale eksklusif 24 jam sebelum publik",
      pointsCost: 1000,
      category: "exclusive",
      available: true,
    },
    {
      id: 5,
      name: "Diskon 25%",
      description: "Potongan 25% untuk pembelian berikutnya, maksimal Rp 100.000",
      pointsCost: 1500,
      category: "discount",
      validUntil: "2024-04-15",
      available: true,
    },
    {
      id: 6,
      name: "Personal Shopping Assistant",
      description: "Konsultasi gratis dengan shopping assistant selama 1 jam",
      pointsCost: 800,
      category: "service",
      available: false,
    }
  ];

  // Sample transaction history
  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'earned',
      points: 50,
      description: 'Pembelian iPhone 12 Pro Max',
      date: '2024-01-20',
      orderId: 'ORD-001'
    },
    {
      id: 2,
      type: 'earned',
      points: 25,
      description: 'Review produk',
      date: '2024-01-18',
    },
    {
      id: 3,
      type: 'redeemed',
      points: -300,
      description: 'Tukar: Gratis Ongkir',
      date: '2024-01-15',
    },
    {
      id: 4,
      type: 'earned',
      points: 100,
      description: 'Bonus registrasi',
      date: '2024-01-10',
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discount': return <Gift className="w-4 h-4" />;
      case 'product': return <ShoppingBag className="w-4 h-4" />;
      case 'service': return <Star className="w-4 h-4" />;
      case 'exclusive': return <Crown className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const filteredRewards = rewards.filter(reward => 
    selectedCategory === 'all' || reward.category === selectedCategory
  );

  const canAfford = (pointsCost: number) => userPoints.current >= pointsCost;

  const handleRedeem = (reward: Reward) => {
    if (!canAfford(reward.pointsCost)) {
      toast({
        title: "Poin tidak mencukupi",
        description: `Anda membutuhkan ${reward.pointsCost - userPoints.current} poin lagi.`,
        variant: "destructive",
      });
      return;
    }

    if (!reward.available) {
      toast({
        title: "Reward tidak tersedia",
        description: "Reward ini sedang tidak tersedia.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reward berhasil ditukar!",
      description: `Anda telah menukar ${reward.name} dengan ${reward.pointsCost} poin.`,
    });
  };

  const tierProgress = (userPoints.current / (userPoints.current + userPoints.pointsToNextTier)) * 100;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Silakan Login
            </h2>
            <p className="text-gray-600">
              Anda perlu login untuk melihat poin reward.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Poin Reward</h1>
          <p className="text-gray-600">Kumpulkan poin dan tukar dengan reward menarik</p>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Points */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Poin Saat Ini</h3>
                  <p className="text-3xl font-bold text-blue-600">{userPoints.current.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <Badge className={getTierColor(userPoints.tier)}>
                    <Trophy className="w-4 h-4 mr-1" />
                    {userPoints.tier}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {userPoints.pointsToNextTier} poin lagi ke {userPoints.nextTier}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress ke {userPoints.nextTier}</span>
                  <span>{Math.round(tierProgress)}%</span>
                </div>
                <Progress value={tierProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Lifetime Stats */}
          <Card>
            <CardContent className="p-6 text-center">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Total Poin</h3>
              <p className="text-2xl font-bold text-purple-600">{userPoints.lifetime.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Sepanjang masa</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Tukar Reward</TabsTrigger>
            <TabsTrigger value="history">Riwayat Poin</TabsTrigger>
            <TabsTrigger value="earning">Cara Mendapat Poin</TabsTrigger>
          </TabsList>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                Semua
              </Button>
              <Button
                variant={selectedCategory === 'discount' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('discount')}
                size="sm"
              >
                <Gift className="w-4 h-4 mr-2" />
                Diskon
              </Button>
              <Button
                variant={selectedCategory === 'product' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('product')}
                size="sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Produk
              </Button>
              <Button
                variant={selectedCategory === 'service' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('service')}
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Layanan
              </Button>
              <Button
                variant={selectedCategory === 'exclusive' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('exclusive')}
                size="sm"
              >
                <Crown className="w-4 h-4 mr-2" />
                Eksklusif
              </Button>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className={`${!reward.available ? 'opacity-50' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(reward.category)}
                        <CardTitle className="text-lg">{reward.name}</CardTitle>
                      </div>
                      {!reward.available && (
                        <Badge variant="secondary">Habis</Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                    
                    {reward.limitedQuantity && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tersisa</span>
                          <span>{reward.remainingQuantity}/{reward.limitedQuantity}</span>
                        </div>
                        <Progress 
                          value={(reward.remainingQuantity! / reward.limitedQuantity) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {reward.validUntil && (
                      <p className="text-xs text-gray-500 mb-3 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Berlaku hingga {new Date(reward.validUntil).toLocaleDateString('id-ID')}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span className="font-bold text-lg">{reward.pointsCost.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">poin</span>
                      </div>
                      
                      <Button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford(reward.pointsCost) || !reward.available}
                        size="sm"
                      >
                        {!canAfford(reward.pointsCost) ? 'Poin Kurang' : 'Tukar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi Poin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'earned' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <Gift className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(transaction.date).toLocaleDateString('id-ID')}
                            {transaction.orderId && (
                              <span className="ml-2">• Order #{transaction.orderId}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <p className="font-bold">
                          {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                        </p>
                        <p className="text-sm">poin</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earning Tab */}
          <TabsContent value="earning">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cara Mendapat Poin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Berbelanja</h4>
                      <p className="text-sm text-gray-600">Dapatkan 1 poin untuk setiap Rp 10.000 pembelian</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Review Produk</h4>
                      <p className="text-sm text-gray-600">25 poin untuk setiap review dengan foto</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Referral</h4>
                      <p className="text-sm text-gray-600">100 poin saat teman melakukan pembelian pertama</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Ulang Tahun</h4>
                      <p className="text-sm text-gray-600">Bonus 200 poin di hari ulang tahun Anda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tier Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">Bronze (0-499 poin)</h4>
                    <p className="text-sm text-orange-700">• Akses ke reward dasar</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800">Silver (500-1499 poin)</h4>
                    <p className="text-sm text-gray-700">• 5% bonus poin dari pembelian</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <h4 className="font-medium text-yellow-800">Gold (1500-2999 poin) ⭐</h4>
                    <p className="text-sm text-yellow-700">• 10% bonus poin • Akses early sale</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Platinum (3000+ poin)</h4>
                    <p className="text-sm text-purple-700">• 15% bonus poin • Personal assistant • Exclusive rewards</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};