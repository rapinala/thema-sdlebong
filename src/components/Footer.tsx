import { LogoSatuData, LogoKominfo, LogoBPS } from "./Logo";
import { Link } from "react-router-dom";

function FooterLogoLebong() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/images/logo-lebong.png"
        alt="Logo Kabupaten Lebong"
        className="h-10 sm:h-12 w-auto object-contain"
      />
      <div className="flex flex-col leading-tight">
        <span className="font-display font-bold text-slate-900 text-[11px] sm:text-xs">
          KABUPATEN
        </span>
        <span className="font-display font-bold text-slate-900 text-[11px] sm:text-xs">
          LEBONG
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Partner Logos */}
        <div className="mb-12 pb-10 border-b border-slate-800">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-8 font-medium">
            Didukung Oleh
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-items-center max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-3 sm:p-4 w-full max-w-[200px] flex items-center justify-center hover:scale-105 transition-transform">
              <FooterLogoLebong />
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 w-full max-w-[200px] hover:scale-105 transition-transform">
              <LogoSatuData className="h-10 sm:h-12 mx-auto" />
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 w-full max-w-[200px] hover:scale-105 transition-transform">
              <LogoKominfo className="h-10 sm:h-12 mx-auto" />
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 w-full max-w-[200px] hover:scale-105 transition-transform">
              <LogoBPS className="h-10 sm:h-12 mx-auto" />
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-lebong.png"
                alt="Logo Kabupaten Lebong"
                className="h-12 w-auto object-contain bg-white rounded-lg p-1"
              />
              <div>
                <p className="font-display font-bold text-white text-sm">Portal Satu Data</p>
                <p className="font-display font-bold text-white text-sm">Kabupaten Lebong</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Portal resmi pengelolaan data terpadu Pemerintah Kabupaten Lebong untuk mendukung
              transparansi dan pengambilan keputusan berbasis data.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/", label: "Beranda" },
                { to: "/dataset", label: "Dataset" },
                { to: "/organisasi", label: "Organisasi" },
                { to: "/group", label: "Group" },
                { to: "/topik", label: "Topik" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-slate-400 hover:text-lebong-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm">Bantuan</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/panduan" className="text-slate-400 hover:text-lebong-400 transition-colors">
                  Panduan CKAN
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-lebong-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-lebong-400 transition-colors">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-lebong-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm">Kontak</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <svg className="h-4 w-4 mt-0.5 text-lebong-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Raya Lebong, Kabupaten Lebong, Provinsi Bengkulu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-4 w-4 text-lebong-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>satudata@lebonk.go.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-4 w-4 text-lebong-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(0738) 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Pemerintah Kabupaten Lebong. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-slate-500">
            Bagian dari inisiatif <span className="text-lebong-400 font-medium">Satu Data Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}