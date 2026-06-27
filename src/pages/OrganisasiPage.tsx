import { useState } from "react";
import { useOrganizations } from "../hooks/useCkanData";
import { LoadingSkeleton, ErrorState, EmptyState, Spinner } from "../components/States";

const sectors = ["Semua", "Pemerintahan", "Kesehatan", "Pendidikan", "Ekonomi", "Lingkungan", "Infrastruktur"];

const colorPalette = [
  "from-blue-500 to-blue-600",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-red-500",
  "from-slate-500 to-slate-700",
  "from-green-500 to-emerald-600",
  "from-indigo-500 to-blue-700",
  "from-purple-500 to-violet-600",
  "from-teal-500 to-cyan-600",
  "from-yellow-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-emerald-500 to-green-600",
  "from-orange-500 to-red-500",
];

export default function OrganisasiPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("Semua");

  const { data: organizations, loading, error, usingFallback, refetch } = useOrganizations();

  const filtered = (organizations || []).filter((org) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      org.title.toLowerCase().includes(q) ||
      org.name.toLowerCase().includes(q) ||
      (org.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-lebong-600">Beranda</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">Organisasi</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Katalog Organisasi
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Daftar Organisasi Perangkat Daerah (OPD) di lingkungan Pemerintah Kabupaten Lebong yang
            berkontribusi menyediakan data publik.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {usingFallback && (
          <div className="mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            <Spinner className="h-4 w-4" />
            <span className="font-medium">Mode Offline — menampilkan data cache lokal</span>
            <button
              onClick={refetch}
              className="ml-auto underline hover:no-underline font-semibold"
            >
              Coba lagi
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari organisasi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-lebong-400 focus:ring-2 focus:ring-lebong-100 focus:outline-none text-sm transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    sector === s
                      ? "bg-lebong-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">
            Total <span className="font-semibold text-slate-900">{filtered.length}</span> organisasi terdaftar
            {loading && <span className="ml-2 text-lebong-600 font-medium">(memuat...)</span>}
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton count={8} />
        ) : error && !usingFallback ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : filtered.length === 0 ? (
          <EmptyState title="Organisasi tidak ditemukan" message="Coba ubah kata kunci pencarian" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((org, idx) => {
              const acronym = org.title
                .replace(/Dinas|Badan|Bagian|Kantor|Departement/g, "")
                .trim()
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .slice(0, 6)
                .toUpperCase() || org.name.slice(0, 4).toUpperCase();
              const color = colorPalette[idx % colorPalette.length];
              return (
                <article
                  key={org.id}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-lebong-300 hover:shadow-xl hover:shadow-lebong-100/40 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className={`h-24 bg-gradient-to-br ${color} relative overflow-hidden`}>
                    {org.image_url ? (
                      <img
                        src={org.image_url}
                        alt={org.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 batik-divider text-white" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-display font-bold text-2xl tracking-wide drop-shadow-md">
                            {acronym}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-bold text-slate-900 mb-1 leading-snug group-hover:text-lebong-700 transition-colors line-clamp-2 min-h-[2.75rem]">
                      {org.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 truncate">{org.name}</p>
                    {org.description && (
                      <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {org.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-lebong-50 text-lebong-700">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-display font-bold text-slate-900 text-sm">
                            {(org.package_count ?? 0).toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                            Dataset
                          </div>
                        </div>
                      </div>
                      <svg
                        className="h-4 w-4 text-slate-300 group-hover:text-lebong-600 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}