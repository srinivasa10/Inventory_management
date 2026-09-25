export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductFormData {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
}

export interface InventoryStats {
  totalCount: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockCount: number;
}

export type StockFilterType = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
export type SortFieldType = 'id' | 'name' | 'price' | 'quantity';
export type SortDirectionType = 'asc' | 'desc';

export type ThemeKey = 'emerald' | 'cyber' | 'sunset' | 'ice';

export interface ThemeConfig {
  name: string;
  badge: string;
  accentGradient: string;
  btnGradient: string;
  btnShadow: string;
  cardGlow: string;
  priceColor: string;
  activeBorder: string;
  statAccents: {
    skus: string;
    value: string;
    alerts: string;
    lowStock: string;
  };
}

