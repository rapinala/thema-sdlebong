import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePortalStats, useFeaturedDatasets } from "../hooks/useCkanData";
import { LoadingSkeleton, ErrorState, Spinner } from "../components/States";
import { DatasetCard } from "../components/DatasetCard";
import { CKAN_CONFIG } from "../config/ckan";

const slides = [
  {
    image: "/images/slide-batik.jpg",
    title: "Batik Telebong",
    subtitle: "Warisan Kearifan Lokal",
    description: "Keindahan motif batik asli Kabupaten Lebong yang penuh makna filosofis",
  },
  {
    image: "/images/slide-landscape.jpg",
    title: "Alam Pegunungan Bengkulu",
    subtitle: "Pesona Alam",
    description: "Keindahan alam hijau yang mempesona di dataran tinggi Lebong",
  },
  {
    image: "/images/slide-culture.jpg",
    title: "Budaya Rejang",
    subtitle: "Tradisi Lestari",
    description: "Warisan budaya masyarakat Rejang yang terus dilestarikan",
  },
  {
    image: "/images/slide-waterfall.jpg",
    title: "Air Terjun Tersembunyi",
    subtitle: "Keajaiban Alam",
    description: "Pesona alam tropis yang masih alami dan menawan",
  },
];

function StatIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    database: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    building: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    tag: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    users: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats, loading: statsLoading, usingFallback: statsFallback } = usePortalStats();
  const { data: featured, loading: featuredLoading } = useFeaturedDatasets(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      label: "Total Dataset",
      value: statsLoading ? "..." : (stats?.datasets?.toLocaleString() || "0"),
      icon: "database",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Organisasi",
      value: statsLoading ? "..." : (stats?.organizations?.toLocaleString() || "0"),
      icon: "building",
      color: "from-lebong-500 to-lebong-600",
    },
    {
      label: "Topik Aktif",
      value: statsLoading ? "..." : (stats?.groups?.toLocaleString() || "0"),
      icon: "tag",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Pengguna",
      value: statsLoading ? "..." : (stats?.users?.toLocaleString() || "0"),
      icon: "users",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* API Status Badge */}
      {statsFallback && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-xs text-amber-800">
            <Spinner className="h-3 w-3" />
            <span className="font-medium">
              Mode Offline — menampilkan data cache. CKAN API: {CKAN_CONFIG.baseUrl}
            </span>
          </div>
        </div>
      )}

      {/* Hero Section with Slideshow */}
      <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1500 ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`h-full w-full object-cover ${
                  idx === currentSlide ? "animate-ken-burns" : ""
                }`}
              />
            </div>
          ))}
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="absolute inset-0 opacity-[0.04] batik-divider text-white pointer-events-none" />

        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group flex items-center gap-2 transition-all"
              aria-label={`Slide ${idx + 1}`}
            >
              <span
                className={`text-white text-xs font-medium transition-all duration-300 ${
                  idx === currentSlide ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              >
                0{idx + 1}
              </span>
              <span
                className={`block transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? "w-10 h-1 bg-white"
                    : "w-6 h-1 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 min-h-[90vh] lg:min-h-screen flex flex-col">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
            <div className="lg:col-span-7 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lebong-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lebong-400"></span>
                </span>
                <span className="text-white/90">{slides[currentSlide].subtitle}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-4 animate-fade-in-up">
                Portal <span className="bg-gradient-to-r from-lebong-300 via-amber-300 to-lebong-200 bg-clip-text text-transparent">Satu Data</span>
                <br />
                Kabupaten Lebong
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed animate-fade-in">
                Akses terpadu data sektoral Pemerintah Kabupaten Lebong. Mendukung transparansi,
                akurasi, dan pemanfaatan data untuk pengambilan kebijakan yang lebih baik.
              </p>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 max-w-2xl animate-fade-in-up">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/dataset?q=${encodeURIComponent(searchQuery)}`;
                  }}
                  className="flex items-center"
                >
                  <div className="flex items-center flex-1 pl-3 sm:pl-4">
                    <svg className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari dataset, misalnya: data penduduk..."
                      className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-lebong-600 to-lebong-700 hover:from-lebong-700 hover:to-lebong-800 text-white font-semibold px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                  >
                    Cari Data
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 animate-fade-in-up">
                <span className="text-xs text-white/60 font-medium mr-1 self-center">Populer:</span>
                {["Penduduk", "Kesehatan", "Pendidikan", "Pertanian"].map((tag) => (
                  <Link
                    key={tag}
                    to={`/dataset?q=${tag.toLowerCase()}`}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-medium text-white/90 transition-all hover:scale-105"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-end items-end self-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-lebong-400/30 to-amber-400/30 blur-3xl rounded-full animate-float" />
                <img
                  src="/images/officials.png"
                  alt="Bupati dan Wakil Bupati Lebong"
                  className="relative max-h-[600px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-widest">Jelajahi</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-6 sm:p-8 lg:p-10 border border-slate-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {statsData.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`text-center sm:text-left ${idx > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}`}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                    <div
                      className={`flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                    >
                      <StatIcon icon={stat.icon} />
                    </div>
                    <div>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium pl-0 sm:pl-15">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Datasets */}
      <section className="py-16 sm:py-20 lg:py-24 bg-batik-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-lebong-600 uppercase tracking-wider mb-2">
                Unggulan
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Dataset Pilihan
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Dataset paling populer dan banyak diakses oleh masyarakat
              </p>
            </div>
            <Link
              to="/dataset"
              className="inline-flex items-center gap-2 text-lebong-700 hover:text-lebong-800 font-semibold text-sm group"
            >
              Lihat Semua Dataset
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {featuredLoading ? (
            <LoadingSkeleton count={4} />
          ) : featured && featured.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((ds, idx) => (
                <DatasetCard key={ds.id} dataset={ds} featured={idx === 0} />
              ))}
            </div>
          ) : (
            <ErrorState message="Tidak ada dataset yang dapat ditampilkan" />
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-sm font-semibold text-lebong-600 uppercase tracking-wider mb-2">
              Akses Cepat
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Jelajahi Portal Data
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                to: "/dataset",
                title: "Katalog Dataset",
                desc: "Jelajahi ratusan dataset sektoral",
                icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z M9 11h6",
                color: "from-blue-500 to-cyan-500",
              },
              {
                to: "/organisasi",
                title: "Organisasi OPD",
                desc: "Daftar organisasi perangkat daerah",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3",
                color: "from-lebong-500 to-lebong-600",
              },
              {
                to: "/group",
                title: "Grup Data",
                desc: "Telusuri berdasarkan kategori sektoral",
                icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
                color: "from-purple-500 to-pink-500",
              },
              {
                to: "/topik",
                title: "Ulasan Pemerintah",
                desc: "Berita dan analisis kebijakan",
                icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2",
                color: "from-amber-500 to-orange-500",
              },
              {
                to: "/panduan",
                title: "Panduan CKAN",
                desc: "Tutorial penggunaan portal data",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253",
                color: "from-rose-500 to-red-500",
              },
              {
                to: "/masuk",
                title: "Login Pengguna",
                desc: "Masuk untuk mengelola dataset",
                icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7",
                color: "from-slate-700 to-slate-900",
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 shadow-md group-hover:bg-white/20 group-hover:backdrop-blur-sm`}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-white text-lg mb-2 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors">
                    {item.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lebong-700 group-hover:text-white transition-colors">
                    Buka
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}