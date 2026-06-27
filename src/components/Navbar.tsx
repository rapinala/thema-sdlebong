import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogoLebong } from "./Logo";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/dataset", label: "Dataset" },
  { to: "/organisasi", label: "Organisasi" },
  { to: "/group", label: "Group" },
  { to: "/topik", label: "Topik" },
  { to: "/panduan", label: "Panduan" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-white/20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <LogoLebong className="h-10 w-10 sm:h-11 sm:w-11 transition-transform group-hover:scale-105" showText />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-lebong-700 bg-lebong-50"
                      : "text-slate-600 hover:text-lebong-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/masuk"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-lebong-600 to-lebong-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-lebong-200 transition-all hover:shadow-md hover:shadow-lebong-300 hover:-translate-y-0.5"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Masuk
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-lebong-700 bg-lebong-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/masuk"
              className="flex items-center justify-center gap-2 mt-3 rounded-lg bg-gradient-to-r from-lebong-600 to-lebong-700 px-4 py-3 text-sm font-semibold text-white shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}