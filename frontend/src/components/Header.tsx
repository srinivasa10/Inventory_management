import React from 'react';
import { Package, RefreshCw, Palette } from 'lucide-react';
import { ThemeKey } from '../types/product';
import { THEMES } from '../utils/themes';

interface HeaderProps {
  backendOnline: boolean | null;
  loading: boolean;
  currentTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  backendOnline,
  loading,
  currentTheme,
  onThemeChange,
  onRefresh,
}) => {
  const theme = THEMES[currentTheme];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.12]">
      {/* Brand Icon + Name & Subtitle */}
      <div className="flex items-center gap-3.5">
        <div className="relative group">
          <div
            className={`absolute -inset-1 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300 bg-gradient-to-r ${theme.accentGradient}`}
          />
          <div className="relative w-11 h-11 rounded-xl bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20 shrink-0">
            <Package size={22} className="stroke-[2.2] text-white" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              InventoryTrac
            </h1>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-300/80 font-medium">Real-Time Product Catalog &amp; Stock Manager</p>
        </div>
      </div>

      {/* Right Controls: Theme Selector + Status & Sync */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Color Theme Selector */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/40 border border-white/15 backdrop-blur-md">
          <Palette size={13} className="text-slate-300 ml-1.5 mr-0.5" />
          <div className="flex items-center gap-1">
            {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
              const active = currentTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onThemeChange(key)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    active
                      ? `${THEMES[key].btnGradient} shadow-sm`
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                  title={`Switch to ${THEMES[key].name}`}
                >
                  {THEMES[key].name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Database Status Pill */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
            backendOnline
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : backendOnline === false
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {backendOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                backendOnline ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : backendOnline === false ? 'bg-rose-500' : 'bg-amber-400'
              }`}
            ></span>
          </span>
          <span className="tracking-wide">
            {backendOnline ? 'Database Live' : backendOnline === false ? 'API Offline' : 'Connecting...'}
          </span>
        </div>

        {/* Sync Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/15 hover:border-white/30 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={13} className={`text-slate-200 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};

