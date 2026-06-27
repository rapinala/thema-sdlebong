type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function LogoLebong({ className = "h-10 w-10", showText = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${className} relative flex-shrink-0`}>
        <img
          src="/images/logo-lebong.png"
          alt="Logo Kabupaten Lebong"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-display font-bold text-slate-900 text-sm sm:text-base">
            Kabupaten Lebong
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">
            PROVINSI BENGKULU
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoSatuData({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <svg viewBox="0 0 60 60" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="satuDataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#satuDataGrad)" />
        <path
          d="M15 20 L25 30 L15 40 M30 20 L40 30 L30 40 M45 20 L50 25 L45 30"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-display font-bold text-slate-900 text-xs">SATU DATA</span>
        <span className="font-display font-bold text-slate-900 text-xs">INDONESIA</span>
      </div>
    </div>
  );
}

export function LogoKominfo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <svg viewBox="0 0 60 60" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kominfoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="54" height="54" rx="8" fill="url(#kominfoGrad)" />
        <path
          d="M15 25 Q30 15 45 25 M15 30 Q30 20 45 30 M15 35 Q30 25 45 35"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="30" cy="45" r="3" fill="white" />
        <path d="M30 42 L30 38" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-display font-bold text-slate-900 text-[10px]">KOMINFO SP</span>
        <span className="font-display font-medium text-slate-600 text-[10px]">Kab. Lebong</span>
      </div>
    </div>
  );
}

export function LogoBPS({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <svg viewBox="0 0 60 60" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bpsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="27" fill="url(#bpsGrad)" />
        <path
          d="M20 22 L20 40 M25 18 L25 40 M30 14 L30 40 M35 18 L35 40 M40 22 L40 40"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M18 42 L42 42" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-display font-bold text-slate-900 text-xs">BPS</span>
        <span className="font-display font-medium text-slate-600 text-[10px]">Kab. Lebong</span>
      </div>
    </div>
  );
}