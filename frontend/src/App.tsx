import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { DashboardHero } from './components/DashboardHero';
import { InventoryCatalog } from './components/InventoryCatalog';
import { ToastAlert } from './components/ToastAlert';
import {
  Product,
  ProductFormData,
  InventoryStats,
  SortFieldType,
  SortDirectionType,
  ThemeKey,
} from './types/product';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormData>({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortFieldType>('id');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>('asc');
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('emerald');

  // Auto-dismiss alerts
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch all products from FastAPI backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get<Product[]>('/products');
      setProducts(Array.isArray(res.data) ? res.data : []);
      setBackendOnline(true);
      setError('');
    } catch {
      setBackendOnline(false);
      setError(`Cannot reach PostgreSQL backend at ${API_BASE_URL}. Ensure FastAPI server is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSort = (field: SortFieldType) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Inventory stats calculation matching reference numbers
  const stats: InventoryStats = useMemo(() => {
    const totalCount = products.length;
    let totalValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((p) => {
      const price = Number(p.price) || 0;
      const qty = Number(p.quantity) || 0;
      totalValue += price * qty;
      if (qty === 0) {
        outOfStockCount++;
      } else if (qty <= 50) {
        lowStockCount++;
      }
    });

    return {
      totalCount,
      totalValue,
      lowStockCount,
      outOfStockCount,
      inStockCount: totalCount - outOfStockCount,
    };
  }, [products]);

  // Sorted product list
  const sortedProducts = useMemo(() => {
    const result = [...products];

    return result.sort((a, b) => {
      let aVal: number | string = a[sortField];
      let bVal: number | string = b[sortField];

      if (sortField === 'id' || sortField === 'price' || sortField === 'quantity') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal || '').toLowerCase();
        bVal = String(bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [products, sortField, sortDirection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ id: '', name: '', description: '', price: '', quantity: '' });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const payload = {
      id: Number(form.id),
      name: form.name.trim(),
      description: form.description ? form.description.trim() : form.name.trim(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
    };

    if (isNaN(payload.id) || payload.id <= 0) {
      setError('Please provide a valid positive ID.');
      setLoading(false);
      return;
    }
    if (isNaN(payload.price) || payload.price < 0) {
      setError('Price must be a valid non-negative number.');
      setLoading(false);
      return;
    }
    if (isNaN(payload.quantity) || payload.quantity < 0) {
      setError('Quantity must be a valid non-negative number.');
      setLoading(false);
      return;
    }

    try {
      if (editId !== null) {
        await api.put(`/products/${editId}`, payload);
        setMessage(`Product #${payload.id} updated successfully!`);
      } else {
        await api.post('/products', payload);
        setMessage(`Product #${payload.id} enrolled into global inventory registry!`);
      }
      resetForm();
      fetchProducts();
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { detail?: string; message?: string } } };
      const errMsg =
        axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        (editId ? 'Failed to update product' : 'Failed to add product');
      setError(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      id: String(product.id),
      name: product.name || '',
      description: product.description || '',
      price: String(product.price ?? ''),
      quantity: String(product.quantity ?? ''),
    });
    setEditId(product.id);
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number, name: string) => {
    const ok = window.confirm(`Permanently remove "${name || `Product #${id}`}" from registry?`);
    if (!ok) return;

    setLoading(true);
    setMessage('');
    setError('');
    try {
      await api.delete(`/products/${id}`);
      setMessage(`Product #${id} removed successfully.`);
      if (editId === id) resetForm();
      fetchProducts();
    } catch {
      setError('Failed to delete product from database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 p-4 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-x-hidden">
      {/* Full-bleed Viewport Background Image */}
      <img
        src="/logistics_bg.jpg"
        alt="Logistics background"
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none brightness-95"
      />

      {/* Light Atmospheric Backdrop Overlay */}
      <div className="fixed inset-0 bg-slate-950/20 pointer-events-none z-0" />

      {/* Floating 4-point Sparkle Star outside card bottom-right */}
      <div className="fixed bottom-10 right-10 text-white/50 text-4xl pointer-events-none select-none z-0 animate-pulse">
        ✦
      </div>

      {/* Master Glass Window Card - truly transparent frosted glass */}
      <div className="relative z-10 w-full max-w-[1340px] rounded-[28px] bg-slate-900/25 backdrop-blur-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-9 my-auto">
        {/* 1. Header Component */}
        <Header
          backendOnline={backendOnline}
          loading={loading}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onRefresh={fetchProducts}
        />

        {/* Global Floating Toast */}
        <div className="mt-4">
          <ToastAlert
            message={message}
            error={error}
            onClearMessage={() => setMessage('')}
            onClearError={() => setError('')}
          />
        </div>

        {/* 2. Hero Overview & Quick Registry Layout */}
        <div className="mt-6">
          <DashboardHero
            form={form}
            editId={editId}
            loading={loading}
            totalProductsCount={products.length}
            filteredCount={products.length}
            stats={stats}
            currentTheme={currentTheme}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        </div>

        {/* 3. Inventory Catalog Table Grid */}
        <InventoryCatalog
          products={sortedProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          editId={editId}
          currentTheme={currentTheme}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;

