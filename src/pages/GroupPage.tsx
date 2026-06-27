import { Link } from "react-router-dom";
import { useGroups } from "../hooks/useCkanData";
import { LoadingSkeleton, ErrorState, EmptyState, Spinner } from "../components/States";

const iconMap: Record<string, string> = {
  kependudukan:
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  kesehatan:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  pendidikan:
    "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  pertanian:
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  ekonomi:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  infrastruktur:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m9 0a1 1 0 011-1h2a1 1 0 011 1m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1",
  lingkungan:
    "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  pariwisata:
    "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
  keuangan:
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
};

const colorPalette: Array<{ color: string; bgLight: string; textColor: string }> = [
  { color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50", textColor: "text-blue-700" },
  { color: "from-rose-500 to-pink-600", bgLight: "bg-rose-50", textColor: "text-rose-700" },
  { color: "from-amber-500 to-orange-600", bgLight: "bg-amber-50", textColor: "text-amber-700" },
  { color: "from-green-500 to-emerald-600", bgLight: "bg-green-50", textColor: "text-green-700" },
  { color: "from-yellow-500 to-amber-600", bgLight: "bg-yellow-50", textColor: "text-yellow-700" },
  { color: "from-slate-500 to-gray-700", bgLight: "bg-slate-50", textColor: "text-slate-700" },
  { color: "from-emerald-500 to-teal-600", bgLight: "bg-emerald-50", textColor: "text-emerald-700" },
  { color: "from-pink-500 to-rose-600", bgLight: "bg-pink-50", textColor: "text-pink-700" },
  { color: "from-purple-500 to-violet-600", bgLight: "bg-purple-50", textColor: "text-purple-700" },
];

const defaultIcon =
  "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z";

export default function GroupPage() {
  const { data: groups, loading, error, usingFallback, refetch } = useGroups();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-lebong-600">Beranda</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">Group</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Katalog Group Data
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Jelajahi dataset berdasarkan kategori sektoral. Pilih grup untuk melihat dataset
            terkait dari berbagai Organisasi Perangkat Daerah.
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

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error && !usingFallback ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : !groups || groups.length === 0 ? (
          <EmptyState title="Group tidak ditemukan" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((group, idx) => {
              const palette = colorPalette[idx % colorPalette.length];
              const iconPath = iconMap[group.name?.toLowerCase()] || defaultIcon;
              return (
                <Link
                  key={group.id}
                  to={`/dataset?q=groups:${group.name}`}
                  className="group relative bg-white rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${palette.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative p-6 sm:p-7">
                    {group.image_display_url ? (
                      <img
                        src={group.image_display_url}
                        alt={group.display_name}
                        className="h-14 w-14 rounded-2xl object-cover mb-5 ring-2 ring-slate-100"
                      />
                    ) : (
                      <div
                        className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${palette.color} text-white shadow-lg mb-5 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all`}
                      >
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={iconPath}
                          />
                        </svg>
                      </div>
                    )}

                    <h3 className="font-display font-bold text-slate-900 group-hover:text-white text-xl mb-2 transition-colors">
                      {group.display_name}
                    </h3>
                    {group.description && (
                      <p className="text-sm text-slate-500 group-hover:text-white/85 transition-colors mb-6 leading-relaxed line-clamp-3">
                        {group.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 group-hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2.5 py-1 rounded-md ${palette.bgLight} ${palette.textColor} group-hover:bg-white/20 group-hover:text-white text-xs font-bold transition-all`}
                        >
                          {(group.package_count ?? 0).toLocaleString()} Dataset
                        </div>
                      </div>
                      <svg
                        className="h-5 w-5 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}