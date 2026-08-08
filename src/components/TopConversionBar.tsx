import { useState, useEffect } from "react";
import { Flame, Clock, Sparkles, Tag, ShieldCheck, X } from "lucide-react";

export function TopConversionBar() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-3 relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 font-medium">
          <span className="flex items-center gap-1 bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full font-bold text-[11px] animate-pulse border border-rose-500/40">
            <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            OFERTA FLASH
          </span>
          <span className="hidden xs:inline">¡Hasta -50% DTO en Selección Especial!</span>
          <span className="text-amber-300 font-semibold hidden md:inline">
            Código 10% EXTRA:{" "}
            <code className="bg-amber-400/20 px-1.5 py-0.5 rounded text-white border border-amber-400/30 font-mono">
              LUMINA10
            </code>
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 mx-auto sm:mx-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
            <Clock className="w-3 h-3 text-accent animate-spin-slow" />
            <span className="text-white/80 hidden xs:inline">Termina en:</span>
            <span className="font-bold text-accent">
              {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Envío Gratis &gt; $60
          </div>

          <button
            onClick={() => setVisible(false)}
            className="text-white/60 hover:text-white p-0.5 rounded transition"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
