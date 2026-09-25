import React from 'react';
import {
  Boxes,
  DollarSign,
  AlertTriangle,
  AlertCircle,
  PlusCircle,
  Edit3,
  X,
} from 'lucide-react';
import { ProductFormData, InventoryStats, ThemeKey } from '../types/product';
import { THEMES } from '../utils/themes';

interface DashboardHeroProps {
  form: ProductFormData;
  editId: number | null;
  loading: boolean;
  totalProductsCount: number;
  filteredCount: number;
  stats: InventoryStats;
  currentTheme: ThemeKey;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  form,
  editId,
  loading,
  totalProductsCount,
  filteredCount,
  stats,
  currentTheme,
  onChange,
  onSubmit,
  onReset,
}) => {
  const theme = THEMES[currentTheme];

  const currency = (n: number) => {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
      {/* Left Column: Heading + Subtitle + 4 Transparent Stat Cards */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-[1.15]">
            Global Inventory Overview:
            <br />
            <span className={`bg-gradient-to-r ${theme.accentGradient} bg-clip-text text-transparent`}>
              Real-time visibility and control.
            </span>
          </h2>
          <p className="text-sm text-slate-300/80 mt-2 mb-6">
            Showing {filteredCount} of {totalProductsCount} products across all zones.
          </p>
        </div>

        {/* 4 Transparent Glass Stat Cards in a Single Horizontal Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
          {/* 1. Core SKUs */}
          <div className={`group rounded-2xl bg-slate-900/30 hover:bg-slate-900/45 backdrop-blur-md border border-white/15 ${theme.cardGlow} p-3.5 flex items-center gap-3 shadow-lg transition-all hover:-translate-y-0.5`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${theme.statAccents.skus}`}>
              <Boxes size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-100 block truncate transition-colors">
                Core SKUs: {stats.totalCount}
              </span>
            </div>
          </div>

          {/* 2. Valuation */}
          <div className={`group rounded-2xl bg-slate-900/30 hover:bg-slate-900/45 backdrop-blur-md border border-white/15 ${theme.cardGlow} p-3.5 flex items-center gap-3 shadow-lg transition-all hover:-translate-y-0.5`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${theme.statAccents.value}`}>
              <DollarSign size={20} />
            </div>
            <div className="min-w-0">
              <span className={`text-sm sm:text-base font-extrabold font-mono block truncate ${theme.priceColor}`}>
                ${currency(stats.totalValue)}
              </span>
            </div>
          </div>

          {/* 3. Alerts */}
          <div className={`group rounded-2xl bg-slate-900/30 hover:bg-slate-900/45 backdrop-blur-md border border-white/15 ${theme.cardGlow} p-3.5 flex items-center gap-3 shadow-lg transition-all hover:-translate-y-0.5`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${theme.statAccents.alerts}`}>
              <AlertTriangle size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-100 block truncate transition-colors">
                Alerts: {stats.outOfStockCount > 0 ? `${stats.outOfStockCount} Out` : 'Stocks'}
              </span>
            </div>
          </div>

          {/* 4. Low Stock */}
          <div className={`group rounded-2xl bg-slate-900/30 hover:bg-slate-900/45 backdrop-blur-md border border-white/15 ${theme.cardGlow} p-3.5 flex items-center gap-3 shadow-lg transition-all hover:-translate-y-0.5`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${theme.statAccents.lowStock}`}>
              <AlertCircle size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-100 block truncate transition-colors">
                {stats.lowStockCount} Low Stock
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Quick Product Registry Transparent Glass Card */}
      <div className={`w-full rounded-2xl bg-slate-900/30 hover:bg-slate-900/45 border border-white/15 p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition-all ${theme.cardGlow}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>{editId ? `Edit Product #${editId}` : 'Quick Product Registry'}</span>
            {editId && <span className="text-xs text-amber-400 font-mono">(Editing)</span>}
          </h3>
          {editId && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <X size={12} />
              <span>Cancel</span>
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-2.5">
          {/* Product ID */}
          <div>
            <label htmlFor="prod-id" className="block text-[11px] font-medium text-slate-300 mb-1">
              Product ID
            </label>
            <input
              id="prod-id"
              type="number"
              name="id"
              placeholder="e.g. 101"
              value={form.id}
              onChange={onChange}
              required
              disabled={!!editId}
              className={`w-full bg-slate-950/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:bg-slate-950/60 focus:border-white/40 focus:ring-1 focus:ring-white/20 font-mono shadow-inner ${
                editId ? 'opacity-50 cursor-not-allowed bg-black/40' : ''
              }`}
            />
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="prod-name" className="block text-[11px] font-medium text-slate-300 mb-1">
              Product Name
            </label>
            <input
              id="prod-name"
              type="text"
              name="name"
              placeholder="e.g. specifications, features, or notes"
              value={form.name}
              onChange={onChange}
              required
              className="w-full bg-slate-950/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:bg-slate-950/60 focus:border-white/40 focus:ring-1 focus:ring-white/20 shadow-inner"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="prod-desc" className="block text-[11px] font-medium text-slate-300 mb-1">
              Description
            </label>
            <input
              id="prod-desc"
              type="text"
              name="description"
              placeholder="e.g. Wireless Mouse, 24 inch Monitor"
              value={form.description}
              onChange={onChange}
              className="w-full bg-slate-950/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:bg-slate-950/60 focus:border-white/40 focus:ring-1 focus:ring-white/20 shadow-inner"
            />
          </div>

          {/* Price & Quantity Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="prod-price" className="block text-[11px] font-medium text-slate-300 mb-1">
                Unit Price ($)
              </label>
              <input
                id="prod-price"
                type="number"
                step="0.01"
                min="0"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={onChange}
                required
                className="w-full bg-slate-950/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:bg-slate-950/60 focus:border-white/40 focus:ring-1 focus:ring-white/20 font-mono shadow-inner"
              />
            </div>

            <div>
              <label htmlFor="prod-qty" className="block text-[11px] font-medium text-slate-300 mb-1">
                Stock Units
              </label>
              <input
                id="prod-qty"
                type="number"
                min="0"
                name="quantity"
                placeholder="0"
                value={form.quantity}
                onChange={onChange}
                required
                className="w-full bg-slate-950/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:bg-slate-950/60 focus:border-white/40 focus:ring-1 focus:ring-white/20 font-mono shadow-inner"
              />
            </div>
          </div>

          {/* Action Button: Dynamic Theme Gradient Pill Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3.5 py-2.5 rounded-xl ${theme.btnGradient} ${theme.btnShadow} active:scale-[0.98] text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50`}
          >
            {editId ? <Edit3 size={14} /> : <PlusCircle size={14} />}
            <span>{editId ? 'Update Product' : 'Add to Inventory'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

