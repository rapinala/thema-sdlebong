const articles = [
  {
    title: "Transformasi Digital Pelayanan Publik di Kabupaten Lebong",
    excerpt: "Bagaimana Pemerintah Kabupaten Lebong memanfaatkan teknologi untuk meningkatkan kualitas layanan publik dan transparansi kepada masyarakat.",
    category: "Teknologi",
    author: "Admin Diskominfo",
    date: "15 Januari 2024",
    readTime: "5 menit",
    image: "from-blue-500 via-indigo-500 to-purple-600",
    featured: true,
  },
  {
    title: "Pemberdayaan UMKM Lokal: Strategi Meningkatkan Ekonomi Daerah",
    excerpt: "Program-program inovatif dari pemerintah daerah untuk mendukung pertumbuhan UMKM dan meningkatkan kesejahteraan masyarakat.",
    category: "Ekonomi",
    author: "Dinas Koperasi",
    date: "10 Januari 2024",
    readTime: "7 menit",
    image: "from-amber-500 via-orange-500 to-red-500",
  },
  {
    title: "Pelestarian Batik Telebong: Warisan Budaya yang Tak Ternilai",
    excerpt: "Upaya pelestarian batik khas Lebong melalui pelatihan, festival budaya, dan promosi ke tingkat nasional.",
    category: "Budaya",
    author: "Disdikbud",
    date: "8 Januari 2024",
    readTime: "4 menit",
    image: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    title: "Inovasi Pertanian Berkelanjutan untuk Ketahanan Pangan",
    excerpt: "Penerapan teknologi pertanian modern dan praktik berkelanjutan untuk meningkatkan produktivitas hasil pertanian.",
    category: "Pertanian",
    author: "Dinas Pertanian",
    date: "5 Januari 2024",
    readTime: "6 menit",
    image: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    title: "Pariwisata Lebong: Pesona Alam yang Menanti Dieksplorasi",
    excerpt: "Destinasi wisata tersembunyi di Kabupaten Lebong yang menawarkan keindahan alam dan budaya autentik.",
    category: "Pariwisata",
    author: "Dispar",
    date: "3 Januari 2024",
    readTime: "5 menit",
    image: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Program Pendidikan Gratis: Membangun Generasi Unggul",
    excerpt: "Komitmen pemerintah daerah dalam menyediakan akses pendidikan berkualitas untuk seluruh lapisan masyarakat.",
    category: "Pendidikan",
    author: "Disdikbud",
    date: "28 Desember 2023",
    readTime: "4 menit",
    image: "from-violet-500 via-purple-500 to-pink-500",
  },
];

const categories = ["Semua", "Teknologi", "Ekonomi", "Budaya", "Pertanian", "Pariwisata", "Pendidikan"];

export default function TopikPage() {
  const featured = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-lebong-600">Beranda</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">Topik</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Ulasan Pemerintah
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Berita, analisis, dan ulasan mengenai kebijakan serta program-program Pemerintah
            Kabupaten Lebong untuk masyarakat.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Categories Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  idx === 0
                    ? "bg-lebong-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <article className="group bg-white rounded-3xl border border-slate-200 overflow-hidden mb-10 hover:shadow-2xl transition-all duration-300">
          <div className="grid lg:grid-cols-2">
            <div className={`relative h-64 sm:h-80 lg:h-auto bg-gradient-to-br ${featured.image} overflow-hidden`}>
              <div className="absolute inset-0 batik-divider text-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-24 w-24 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-slate-900 shadow-md">
                <svg className="h-3 w-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Unggulan
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-lebong-50 text-lebong-700 text-xs font-bold uppercase tracking-wider">
                  {featured.category}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-500">{featured.readTime} baca</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-lebong-700 transition-colors">
                {featured.title}
              </h2>

              <p className="text-slate-600 mb-6 leading-relaxed">{featured.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-lebong-500 to-lebong-700 text-white font-bold text-sm">
                    {featured.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{featured.author}</p>
                    <p className="text-xs text-slate-500">{featured.date}</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-lebong-700 hover:text-lebong-800 group/btn">
                  Baca Selengkapnya
                  <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restArticles.map((article, idx) => (
            <article
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-lebong-300 hover:shadow-xl hover:shadow-lebong-100/40 transition-all duration-300 flex flex-col"
            >
              <div className={`relative h-44 bg-gradient-to-br ${article.image} overflow-hidden`}>
                <div className="absolute inset-0 batik-divider text-white" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-12 w-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-500">{article.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-lebong-700 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white font-bold text-xs">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-900">{article.author}</p>
                      <p className="text-[10px] text-slate-500">{article.date}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-lebong-700 hover:text-lebong-800 group/btn">
                    Baca
                    <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1.5 shadow-sm">
            <button className="px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-lebong-600 text-white">1</button>
            <button className="px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100">2</button>
            <button className="px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100">12</button>
            <button className="px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}