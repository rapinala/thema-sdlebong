import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDatasetsSearch } from "../hooks/useCkanData";
import { LoadingSkeleton, ErrorState, EmptyState, Spinner } from "../components/States";
import { DatasetCard } from "../components/DatasetCard";

const formats = ["Semua", "CSV", "XLSX", "PDF", "SHP", "JSON"];
const sortOptions = [
  { value: "popular", label: "Paling Populer" },
  { value: "newest", label: "Terbaru" },
  { value: "name", label: "Nama A-Z" },
];

export default function DatasetPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQuery);
  const [format, setFormat] = useState("Semua");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Sync URL ?q= with input
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== search) setSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set("q", value);
    else newParams.delete("q");
    setSearchParams(newParams, { replace: true });
  };

  const { data, loading, error, usingFallback, refetch } = useDatasetsSearch(
    search,
    format,
    0,
    50,
  );

  // Client-side sort
  let results = data?.results || [];
  if (sort === "name") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "newest") {
    results = [...results].sort(
      (a, b) =>
        new Date(b.metadata_modified || 0).getTime() -
        new Date(a.metadata_modified || 0).getTime(),
    );
  } else if (sort === "popular") {
    results = [...results].sort(
      (a, b) =>
        (b.tracking_summary?.total || 0) - (a.tracking_summary?.total || 0),
    );
  }

  const totalCount = data?.count || 0;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-lebong-600">Beranda</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">Dataset</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Katalog Dataset
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Temukan dan unduh dataset sektoral dari berbagai Organisasi Perangkat Daerah (OPD) di
            lingkungan Pemerintah Kabupaten Lebong.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Offline Banner */}
        {usingFallback && (
          <div className="mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            <Spinner className="h-4 w-4" />
            <span className="font-medium">
              Mode Offline — menampilkan data dari cache lokal. Koneksi ke CKAN API terganggu.
            </span>
            <button
              onClick={refetch}
              className="ml-auto underline hover:no-underline font-semibold"
            >
              Coba lagi
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-6 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Cari Dataset</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Cari dataset atau organisasi..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-lebong-400 focus:ring-2 focus:ring-lebong-100 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Format File</label>
              <div className="flex flex-wrap gap-1.5">
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      format === f
                        ? "bg-lebong-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Urutkan</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-lebong-400 focus:ring-2 focus:ring-lebong-100 focus:outline-none text-sm bg-white"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-colors ${view === "grid" ? "bg-white shadow-sm" : ""}`}
                  aria-label="Grid view"
                >
                  <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-colors ${view === "list" ? "bg-white shadow-sm" : ""}`}
                  aria-label="List view"
                >
                  <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600">
              Menampilkan <span className="font-semibold text-slate-900">{results.length}</span> dari {totalCount.toLocaleString()} dataset
              {loading && <span className="ml-2 text-lebong-600 font-medium">(memuat...)</span>}
            </p>
            {(search || format !== "Semua") && (
              <button
                onClick={() => {
                  handleSearchChange("");
                  setFormat("Semua");
                }}
                className="text-sm text-lebong-700 hover:text-lebong-800 font-medium"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} variant={view} />
        ) : error && !usingFallback ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : results.length === 0 ? (
          <EmptyState
            title="Dataset tidak ditemukan"
            message="Coba ubah kata kunci pencarian atau filter Anda"
          />
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}