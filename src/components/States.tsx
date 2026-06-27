interface LoadingProps {
  count?: number;
  variant?: "card" | "list" | "grid";
  className?: string;
}

export function LoadingSkeleton({ count = 6, variant = "card", className = "" }: LoadingProps) {
  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-slate-200" />
            <div className="w-14 h-5 bg-slate-100 rounded" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
          </div>
          <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
          <div className="flex gap-1.5 mb-4">
            <div className="h-4 w-14 bg-slate-100 rounded" />
            <div className="h-4 w-12 bg-slate-100 rounded" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <div className="h-3 bg-slate-100 rounded w-16" />
            <div className="h-3 bg-slate-100 rounded w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin text-lebong-600 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  variant?: "full" | "inline";
  usingFallback?: boolean;
}

export function ErrorState({
  message,
  onRetry,
  variant = "full",
  usingFallback = false,
}: ErrorStateProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">
          {usingFallback ? "Mode offline — menampilkan data cache lokal" : message || "Terjadi kesalahan"}
        </span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto underline hover:no-underline font-semibold"
          >
            Coba lagi
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-amber-50 text-amber-600 mb-4">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="font-display font-semibold text-slate-900 text-lg mb-1">
        {usingFallback ? "Menggunakan Data Lokal" : "Tidak dapat memuat data"}
      </h3>
      <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
        {usingFallback
          ? "Koneksi ke server CKAN terganggu. Menampilkan data dari cache lokal."
          : message || "Terjadi kesalahan saat mengambil data dari server."}
      </p>
      {onRetry && !usingFallback && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-lebong-600 hover:bg-lebong-700 text-white font-semibold px-4 py-2 text-sm transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title = "Data tidak ditemukan", message, icon }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 text-slate-400 mb-4">
        {icon || (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="font-display font-semibold text-slate-900 text-lg mb-1">{title}</h3>
      {message && <p className="text-sm text-slate-500 max-w-md mx-auto">{message}</p>}
    </div>
  );
}

export function FallbackBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
      </span>
      Offline Mode
    </span>
  );
}