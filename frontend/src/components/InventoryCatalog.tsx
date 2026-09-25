import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Edit3, Trash2 } from 'lucide-react';
import { Product, SortFieldType, SortDirectionType, ThemeKey } from '../types/product';
import { THEMES } from '../utils/themes';

interface InventoryCatalogProps {
  products: Product[];
  sortField: SortFieldType;
  sortDirection: SortDirectionType;
  editId: number | null;
  currentTheme: ThemeKey;
  onSort: (field: SortFieldType) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number, name: string) => void;
}

export const InventoryCatalog: React.FC<InventoryCatalogProps> = ({
  products,
  sortField,
  sortDirection,
  editId,
  currentTheme,
  onSort,
  onEdit,
  onDelete,
}) => {
  const theme = THEMES[currentTheme];

  const currency = (n: number) => {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const renderSortIcon = (field: SortFieldType) => {
    if (sortField !== field) {
      return <ArrowUpDown size={11} className="text-slate-400 opacity-60 group-hover:opacity-100" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={11} className="text-white" />
    ) : (
      <ArrowDown size={11} className="text-white" />
    );
  };

  return (
    <div className="mt-8">
      {/* Catalog Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <span>Inventory Catalog</span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
            {products.length} Items Live
          </span>
        </h3>
      </div>

      {/* Transparent Frosted Glass Table Grid */}
      <div className="overflow-x-auto rounded-2xl border border-white/15 bg-slate-900/25 backdrop-blur-xl shadow-2xl">
        <table className="w-full border-collapse text-left text-sm min-w-[620px]">
          <thead>
            <tr className="border-b border-white/15 text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-slate-900/40">
              <th
                onClick={() => onSort('id')}
                className="group px-4 py-3.5 cursor-pointer select-none hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ID</span>
                  {renderSortIcon('id')}
                </div>
              </th>
              <th
                onClick={() => onSort('name')}
                className="group px-4 py-3.5 cursor-pointer select-none hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>PRODUCT DETAILS</span>
                  {renderSortIcon('name')}
                </div>
              </th>
              <th
                onClick={() => onSort('price')}
                className="group px-4 py-3.5 cursor-pointer select-none hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>PRICE</span>
                  {renderSortIcon('price')}
                </div>
              </th>
              <th
                onClick={() => onSort('quantity')}
                className="group px-4 py-3.5 cursor-pointer select-none hover:text-white transition-colors text-center"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>STATUS &amp; STOCK</span>
                  {renderSortIcon('quantity')}
                </div>
              </th>
              <th className="px-4 py-3.5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08]">
            {products.map((p) => {
              const qty = Number(p.quantity) || 0;
              const isOutOfStock = qty === 0;

              return (
                <tr
                  key={p.id}
                  className={`group transition-all duration-150 ${
                    editId === p.id
                      ? `${theme.activeBorder} border-l-4`
                      : 'hover:bg-white/[0.06] bg-transparent'
                  }`}
                >
                  {/* ID */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-300 font-mono">
                    #{p.id}
                  </td>

                  {/* Product Details: Name + Subtitle */}
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm leading-snug group-hover:text-slate-100 transition-colors">
                        {p.name}
                      </span>
                      {p.description && (
                        <span className="text-xs text-slate-400 leading-tight mt-0.5">
                          {p.description}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Price */}
                  <td className={`px-4 py-3.5 whitespace-nowrap text-right font-mono font-bold text-sm ${theme.priceColor}`}>
                    ${currency(p.price)}
                  </td>

                  {/* Status & Stock */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
                        isOutOfStock
                          ? 'bg-rose-500/15 border-rose-500/35 text-rose-300'
                          : 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOutOfStock ? 'bg-rose-400' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                        }`}
                      ></span>
                      <span>{isOutOfStock ? 'Out of Stock' : 'In Stock'}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(p)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-slate-200 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                        title="Edit product"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDelete(p.id, p.name)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                        title="Delete product"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 text-xs italic">
                  No products in inventory catalog.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

