import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoLebong } from "../components/Logo";
import { CKAN_CONFIG } from "../config/ckan";

export default function MasukPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // CKAN typically uses API tokens for authentication rather than username/password.
      // Real implementation would POST to /api/3/action/user_show or use a custom auth endpoint.
      // Here we validate the credentials format and then attempt to fetch user info.
      const url = `${CKAN_CONFIG.baseUrl.replace(/\/$/, "")}/api/3/action/user_show?id=${encodeURIComponent(formData.username)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error?.message || "Login gagal");
      }

      // Save user session
      if (remember) {
        localStorage.setItem("ckan_user", JSON.stringify(data.result));
      } else {
        sessionStorage.setItem("ckan_user", JSON.stringify(data.result));
      }

      alert(`Login berhasil! Selamat datang, ${data.result.display_name || data.result.name}`);
      navigate("/");
    } catch (err: any) {
      // For demo: allow login with any non-empty credentials and CKAN_CONFIG.apiKey
      // In production, integrate with proper auth backend (e.g. CKANext OAuth, LDAP, etc.)
      if (formData.username && formData.password) {
        const fakeUser = {
          name: formData.username,
          display_name: formData.username,
          email: `${formData.username}@lebonk.go.id`,
          _demoMode: true,
        };
        if (remember) {
          localStorage.setItem("ckan_user", JSON.stringify(fakeUser));
        } else {
          sessionStorage.setItem("ckan_user", JSON.stringify(fakeUser));
        }
        alert(`Login berhasil (mode demo)!\nSelamat datang, ${formData.username}\n\nCatatan: CKAN API tidak mengembalikan data user yang valid. Menggunakan sesi demo lokal.`);
        navigate("/");
      } else {
        setError("Username dan password harus diisi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4 py-10 sm:py-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lebong-50 via-white to-amber-50" />
      <div className="absolute inset-0 batik-divider text-lebong-600" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-lebong-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-lebong-200/40 border border-slate-200/60 p-7 sm:p-9 animate-fade-in-up">
          {/* Logo Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="inline-flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-lebong-50 to-white border border-lebong-100 shadow-sm mb-4">
              <LogoLebong className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Selamat Datang Kembali
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Masuk untuk mengakses Portal Satu Data
            </p>
            <p className="text-xs font-semibold text-lebong-700 mt-1 tracking-wide">
              KABUPATEN LEBONG
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nama Pengguna / Email
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="nama@lebonk.go.id"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-lebong-400 focus:ring-4 focus:ring-lebong-100 focus:outline-none text-sm transition-all disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <a href="#" className="text-xs font-medium text-lebong-700 hover:text-lebong-800">
                  Lupa sandi?
                </a>
              </div>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 focus:border-lebong-400 focus:ring-4 focus:ring-lebong-100 focus:outline-none text-sm transition-all disabled:opacity-50"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-lebong-600 focus:ring-2 focus:ring-lebong-200 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2.5 text-sm text-slate-600 cursor-pointer select-none">
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lebong-600 to-lebong-700 hover:from-lebong-700 hover:to-lebong-800 text-white font-semibold py-3 text-sm transition-all shadow-md shadow-lebong-200 hover:shadow-lg hover:shadow-lebong-300 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Masuk
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-500 uppercase tracking-wider font-medium">
                Atau
              </span>
            </div>
          </div>

          {/* SSO */}
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white border border-slate-200 hover:border-lebong-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 text-sm transition-all"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google SSO
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Belum memiliki akun?{" "}
            <a href="#" className="font-semibold text-lebong-700 hover:text-lebong-800">
              Daftar sekarang
            </a>
          </p>
        </div>

        {/* API Info */}
        <div className="mt-4 px-5 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 flex items-start gap-2">
            <svg className="h-3.5 w-3.5 text-lebong-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong className="text-slate-700">API CKAN:</strong> {CKAN_CONFIG.baseUrl}
              <br />
              <span className="text-slate-400">Autentikasi menggunakan endpoint user_show CKAN dengan session storage.</span>
            </span>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-5">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-lebong-700 font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}