import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import type { FilterOptions } from '@/types';

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  isLoading?: boolean;
}

export const ProductFilters = ({ onFiltersChange, isLoading }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    kategori: '',
    priceMin: undefined,
    priceMax: undefined,
    kondisi: [],
    sortBy: 'newest',
  });

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

  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'price_low', label: 'Harga Terendah' },
    { value: 'price_high', label: 'Harga Tertinggi' },
    { value: 'rating', label: 'Rating Tertinggi' },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const currentConditions = filters.kondisi || [];
    const newConditions = checked
      ? [...currentConditions, condition]
      : currentConditions.filter(c => c !== condition);
    
    handleFilterChange('kondisi', newConditions);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      kategori: 'all',
      priceMin: undefined,
      priceMax: undefined,
      kondisi: [],
      sortBy: 'newest',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="filter-section">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filter Produk</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Kategori
          </Label>
          <Select
            value={filters.kategori}
            onValueChange={(value) => handleFilterChange('kategori', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Rentang Harga
          </Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Condition Filter */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Kondisi
          </Label>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition.value} className="flex items-center space-x-2">
                <Checkbox
                  id={condition.value}
                  checked={filters.kondisi?.includes(condition.value) || false}
                  onCheckedChange={(checked) => 
                    handleConditionChange(condition.value, checked as boolean)
                  }
                />
                <Label htmlFor={condition.value} className="text-sm text-gray-700">
                  {condition.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Urutkan
          </Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange('sortBy', value as FilterOptions['sortBy'])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply/Clear Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full" 
            disabled={isLoading}
            onClick={() => onFiltersChange(filters)}
          >
            {isLoading ? 'Memfilter...' : 'Terapkan Filter'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearFilters}
          >
            Hapus Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
