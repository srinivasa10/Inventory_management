import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastAlertProps {
  message: string;
  error: string;
  onClearMessage: () => void;
  onClearError: () => void;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({
  message,
  error,
  onClearMessage,
  onClearError,
}) => {
  if (!message && !error) return null;

  return (
    <div className="space-y-3 mb-6">
      {message && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50/95 border border-emerald-200 text-emerald-800 text-sm font-semibold backdrop-blur-md shadow-md shadow-emerald-500/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span className="flex-1">{message}</span>
          <button
            onClick={onClearMessage}
            className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50/95 border border-rose-200 text-rose-800 text-sm font-semibold backdrop-blur-md shadow-md shadow-rose-500/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle size={18} className="text-rose-600 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={onClearError}
            className="text-rose-600 hover:text-rose-800 p-0.5 rounded transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
};
