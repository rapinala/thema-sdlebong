import { useState } from "react";
import { CKAN_CONFIG } from "../config/ckan";

const sections = [
  {
    id: "intro",
    title: "Pendahuluan",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    content: [
      {
        heading: "Apa itu Portal Satu Data?",
        body: "Portal Satu Data Kabupaten Lebong adalah platform resmi yang digunakan untuk mengelola, berbagi, dan mengakses data sektoral dari berbagai Organisasi Perangkat Daerah (OPD) di lingkungan Pemerintah Kabupaten Lebong. Portal ini dibangun menggunakan CKAN (Comprehensive Knowledge Archive Network), sebuah sistem manajemen data terbuka yang digunakan secara luas di berbagai negara.",
      },
      {
        heading: "Tujuan Portal",
        body: "Portal ini bertujuan untuk mendukung transparansi data, meningkatkan kualitas pengambilan keputusan berbasis data, memfasilitasi kolaborasi antar OPD, serta memberikan akses data publik yang mudah dan terstruktur bagi masyarakat umum.",
      },
      {
        heading: "Manfaat bagi Pengguna",
        body: "Masyarakat dapat dengan mudah mencari dan mengunduh data yang mereka butuhkan. Peneliti dan akademisi dapat menggunakan data untuk keperluan riset. Sementara itu, pengambil kebijakan dapat memanfaatkan data untuk analisis dan perumusan kebijakan yang lebih baik.",
      },
    ],
  },
  {
    id: "search",
    title: "Cara Mencari Dataset",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    content: [
      {
        heading: "Pencarian Dasar",
        body: "Gunakan kolom pencarian di halaman Beranda atau halaman Dataset. Ketik kata kunci yang relevan dengan data yang Anda cari, misalnya 'penduduk', 'kesehatan', atau 'pendidikan'. Sistem akan menampilkan dataset yang sesuai dengan kata kunci Anda.",
      },
      {
        heading: "Pencarian Lanjutan",
        body: "Anda dapat menggunakan filter untuk mempersempit hasil pencarian berdasarkan format file (CSV, XLSX, PDF, SHP), tag, atau organisasi tertentu. Kombinasikan beberapa filter untuk hasil yang lebih spesifik.",
      },
      {
        heading: "Menggunakan Tag",
        body: "Tag adalah label kategori yang dilampirkan pada setiap dataset. Klik tag pada dataset untuk melihat dataset lain dengan kategori serupa. Ini membantu Anda menemukan data terkait dalam topik yang sama.",
      },
    ],
  },
  {
    id: "browse",
    title: "Menjelajahi Katalog",
    icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    content: [
      {
        heading: "Halaman Dataset",
        body: "Pada halaman Dataset, Anda akan menemukan katalog lengkap semua dataset yang tersedia. Anda dapat melihat dataset dalam tampilan grid atau daftar, mengurutkan berdasarkan popularitas atau tanggal, dan memfilter sesuai kebutuhan.",
      },
      {
        heading: "Halaman Organisasi",
        body: "Halaman Organisasi menampilkan daftar semua OPD yang telah mempublikasikan dataset. Klik kartu organisasi untuk melihat detail dan dataset yang dipublikasikan oleh organisasi tersebut.",
      },
      {
        heading: "Halaman Group",
        body: "Halaman Group mengelompokkan dataset berdasarkan kategori sektoral seperti Pendidikan, Kesehatan, atau Pertanian. Cara ini memudahkan Anda menemukan data berdasarkan topik tertentu.",
      },
    ],
  },
  {
    id: "download",
    title: "Mengunduh Dataset",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    content: [
      {
        heading: "Langkah Mengunduh",
        body: "Buka halaman detail dataset dengan mengklik judul dataset. Pada halaman detail, Anda akan melihat informasi lengkap termasuk deskripsi, metadata, dan pranala unduh. Klik tombol 'Unduh' untuk mulai mengunduh file.",
      },
      {
        heading: "Format File",
        body: "Dataset tersedia dalam berbagai format: CSV untuk data tabular yang dapat dibuka dengan Excel atau LibreOffice, XLSX untuk spreadsheet Excel, PDF untuk dokumen, dan SHP untuk data geospasial yang dapat dibuka dengan software GIS.",
      },
      {
        heading: "Lisensi dan Penggunaan",
        body: "Setiap dataset memiliki lisensi yang menentukan bagaimana data dapat digunakan. Mohon untuk membaca dan memahami lisensi sebelum menggunakan data untuk kepentingan publikasi atau komersial.",
      },
    ],
  },
  {
    id: "contribute",
    title: "Berkontribusi Data",
    icon: "M12 4v16m8-8H4",
    content: [
      {
        heading: "Pendaftaran Akun",
        body: "Untuk berkontribusi data, Anda perlu memiliki akun di Portal Satu Data. Klik tombol 'Masuk' di navbar dan pilih 'Daftar' jika Anda belum memiliki akun. Akun hanya tersedia untuk perwakilan OPD yang berwenang.",
      },
      {
        heading: "Mengunggah Dataset",
        body: "Setelah masuk, klik tombol 'Tambah Dataset' pada dashboard Anda. Isi formulir dengan informasi yang lengkap termasuk judul, deskripsi, tag, dan organisasi. Unggah file dataset dalam format yang didukung.",
      },
      {
        heading: "Validasi Data",
        body: "Setiap dataset yang diunggah akan melalui proses validasi oleh管理员 Portal. Pastikan data Anda akurat, terkini, dan sesuai dengan standar metadata yang ditetapkan sebelum mengajukan publikasi.",
      },
    ],
  },
  {
    id: "api",
    title: "API dan Integrasi",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    content: [
      {
        heading: "Konfigurasi Portal Ini",
        body: `Portal Satu Data Kabupaten Lebong saat ini terhubung ke instance CKAN pada alamat: ${CKAN_CONFIG.baseUrl}. Konfigurasi ini dapat diubah melalui environment variables VITE_CKAN_BASE_URL dan VITE_CKAN_API_KEY saat build.`,
      },
      {
        heading: "Mengakses API",
        body: "Portal Satu Data menyediakan API (Application Programming Interface) CKAN standar yang memungkinkan developer untuk mengintegrasikan data ke dalam aplikasi mereka. Endpoint utama yang tersedia: package_search (mencari dataset), package_show (detail dataset), organization_list, organization_show, group_list, dan group_show.",
      },
      {
        heading: "Autentikasi API",
        body: "Untuk menggunakan API dengan akses tulis (create/update/delete), Anda memerlukan API key yang dapat diperoleh melalui halaman profil akun CKAN Anda setelah login. API key berfungsi sebagai identifikasi dan otorisasi akses, dikirim melalui header Authorization.",
      },
      {
        heading: "Contoh Penggunaan",
        body: `Contoh GET request untuk mencari dataset: GET ${CKAN_CONFIG.baseUrl}/api/3/action/package_search?q=penduduk&rows=10. Respons akan berformat JSON dengan struktur { success, result: { count, results: [...] } }. Lihat dokumentasi resmi CKAN untuk detail lengkap.`,
      },
    ],
  },
  {
    id: "faq",
    title: "Pertanyaan Umum",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    content: [
      {
        heading: "Apakah data dapat digunakan secara gratis?",
        body: "Ya, sebagian besar data di Portal Satu Data dapat diakses secara gratis oleh masyarakat. Beberapa data mungkin memiliki lisensi khusus yang membatasi penggunaan untuk kepentingan tertentu. Selalu periksa lisensi dataset sebelum digunakan.",
      },
      {
        heading: "Bagaimana jika data tidak dapat dimuat?",
        body: "Jika koneksi ke server CKAN terganggu, Portal akan otomatis menampilkan data dari cache lokal sehingga Anda tetap dapat menelusuri katalog. Coba lagi beberapa saat, atau periksa koneksi internet Anda.",
      },
      {
        heading: "Apakah data selalu diperbarui?",
        body: "Setiap OPD bertanggung jawab untuk memperbarui data mereka secara berkala. Tanggal pembaruan terakhir ditampilkan pada metadata dataset. Beberapa dataset mungkin diperbarui lebih sering dari yang lain tergantung pada sifat datanya.",
      },
    ],
  },
];

export default function PanduanPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ [sections[0].id]: true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveId(id);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <a href="/" className="hover:text-lebong-600">Beranda</a>
            <span>/</span>
            <span className="text-slate-900 font-medium">Panduan</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Panduan CKAN
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Dokumentasi lengkap cara menggunakan Portal Satu Data Kabupaten Lebong. Pelajari
            cara mencari, mengunduh, dan berkontribusi data dengan mudah.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-full mb-4 flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 text-lebong-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Daftar Panduan
          </span>
          <svg className={`h-4 w-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className={`lg:col-span-3 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl border border-slate-200 p-3 lg:sticky lg:top-24 shadow-sm">
              <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Daftar Panduan
              </p>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      toggleSection(section.id);
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                      activeId === section.id
                        ? "bg-lebong-50 text-lebong-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                    </svg>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* API Key Box */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-lebong-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-wider">API Key CKAN</p>
                </div>
                <p className="text-xs text-white/70 mb-2">Endpoint aktif:</p>
                <code className="block text-[10px] bg-black/30 rounded px-2 py-1.5 font-mono break-all text-lebong-300">
                  {CKAN_CONFIG.baseUrl}
                </code>
                <p className="text-[10px] text-white/60 mt-2">
                  {CKAN_CONFIG.apiKey ? "✓ API key terkonfigurasi" : "⚠ API key belum diatur (mode publik)"}
                </p>
              </div>

              <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-lebong-500 to-lebong-700 text-white">
                <p className="text-sm font-semibold mb-1">Butuh Bantuan?</p>
                <p className="text-xs text-white/85 mb-3">Tim kami siap membantu Anda</p>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-bold hover:gap-2 transition-all">
                  Hubungi Kami
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 space-y-4">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden scroll-mt-24 shadow-sm"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-lebong-50 text-lebong-700 flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                        {section.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">{section.content.length} bagian</p>
                    </div>
                  </div>
                  <svg
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      openSections[section.id] ? "rotate-180 text-lebong-600" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openSections[section.id] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2.5 flex items-center gap-2">
                            <span className="flex items-center justify-center h-6 w-6 rounded-md bg-lebong-100 text-lebong-700 text-xs font-bold">
                              {idx + 1}
                            </span>
                            {item.heading}
                          </h3>
                          <p className="text-slate-600 leading-relaxed text-sm sm:text-base pl-8">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            <div className="bg-gradient-to-br from-lebong-50 to-amber-50 rounded-2xl border border-lebong-200 p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-md mb-4">
                <svg className="h-7 w-7 text-lebong-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
                Masih punya pertanyaan?
              </h3>
              <p className="text-slate-600 mb-5 max-w-md mx-auto">
                Tim dukungan kami siap membantu Anda dalam menggunakan Portal Satu Data Kabupaten Lebong.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-lebong-600 hover:bg-lebong-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors shadow-sm"
                >
                  Hubungi Support
                </a>
                <a
                  href={`${CKAN_CONFIG.baseUrl}/api/3/action/help_show`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 text-sm transition-colors border border-slate-200"
                >
                  Lihat Dokumentasi API
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}