import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw, Filter } from "lucide-react";
import { useCategories } from "@/hooks/useCPUData";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  coreRange: [number, number];
  priceRange: [number, number];
  tdpRange: [number, number];
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  brands: [],
  coreRange: [2, 64],
  priceRange: [0, 10000],
  tdpRange: [15, 280],
};

export const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [hasChanges, setHasChanges] = useState(false);
  const { data: availableCategories, isLoading } = useCategories();

  const brands = ['Intel', 'AMD'];

  const updateFilter = (key: keyof FilterState, value: string[] | [number, number]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', newCategories);
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    updateFilter('brands', newBrands);
  };

  const applyFilters = () => {
    onFilterChange?.(filters);
    setHasChanges(false);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onFilterChange?.(DEFAULT_FILTERS);
    setHasChanges(false);
  };

  return (
    <Card className="p-6 space-y-6 glass animate-fade-in sticky top-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="hover:text-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-primary">Category</Label>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-6 w-full" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {availableCategories?.map((cat) => (
              <div 
                key={cat} 
                className="flex items-center space-x-2 group hover:translate-x-1 transition-transform"
              >
                <Checkbox 
                  id={cat} 
                  checked={filters.categories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label 
                  htmlFor={cat} 
                  className="text-sm cursor-pointer group-hover:text-primary transition-colors"
                >
                  {cat}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-primary">Brand</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div 
              key={brand} 
              className="flex items-center space-x-2 group hover:translate-x-1 transition-transform"
            >
              <Checkbox 
                id={brand} 
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor={brand} 
                className="text-sm cursor-pointer group-hover:text-primary transition-colors"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Cores */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-primary">Cores</Label>
          <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
            {filters.coreRange[0]}-{filters.coreRange[1]}
          </span>
        </div>
        <Slider 
          value={filters.coreRange} 
          onValueChange={(val) => updateFilter('coreRange', val as [number, number])} 
          max={64} 
          min={2} 
          step={2}
          className="cursor-pointer"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-primary">Price</Label>
          <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
            ${filters.priceRange[0]}-${filters.priceRange[1]}
          </span>
        </div>
        <Slider 
          value={filters.priceRange} 
          onValueChange={(val) => updateFilter('priceRange', val as [number, number])} 
          max={10000} 
          min={0} 
          step={100}
          className="cursor-pointer"
        />
      </div>

      {/* TDP */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold text-primary">TDP</Label>
          <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
            {filters.tdpRange[0]}-{filters.tdpRange[1]}W
          </span>
        </div>
        <Slider 
          value={filters.tdpRange} 
          onValueChange={(val) => updateFilter('tdpRange', val as [number, number])} 
          max={280} 
          min={15} 
          step={5}
          className="cursor-pointer"
        />
      </div>

      <Button 
        onClick={applyFilters}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        disabled={!hasChanges}
      >
        <Filter className="w-4 h-4 mr-2" />
        Apply Filters
      </Button>
    </Card>
  );
};
