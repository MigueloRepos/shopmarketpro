import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle2, X } from "lucide-react";
import { fmt } from "@/lib/catalog";

const RECENT_SALES = [
  {
    name: "Carlos M.",
    city: "Madrid",
    product: "Auriculares Wireless Pro",
    price: 129.99,
    time: "hace 2 min",
  },
  {
    name: "Lucía R.",
    city: "Barcelona",
    product: "Reloj Inteligente Ultra",
    price: 89.99,
    time: "hace 4 min",
  },
  {
    name: "Marcos T.",
    city: "Valencia",
    product: "Mochila Antirrobo Tech",
    price: 49.99,
    time: "hace 7 min",
  },
  {
    name: "Elena V.",
    city: "Sevilla",
    product: "Proyector Portátil HD",
    price: 189.99,
    time: "hace 11 min",
  },
  {
    name: "Javier P.",
    city: "Bilbao",
    product: "Lámpara LED Minimalista",
    price: 34.99,
    time: "hace 15 min",
  },
];

export function SalesNotificationTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // First display after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || !visible) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Show next sale after 12 seconds
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % RECENT_SALES.length);
      setVisible(true);
    }, 14000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [visible, dismissed, index]);

  if (dismissed || !visible) return null;

  const current = RECENT_SALES[index];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm glass-strong rounded-2xl p-3 border border-white/80 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/20 text-accent grid place-items-center shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
              {current.name}{" "}
              <span className="font-normal text-muted-foreground">de {current.city}</span>
            </span>
            <span className="text-[10px] text-muted-foreground shrink-0">{current.time}</span>
          </div>
          <p className="text-xs font-semibold text-accent truncate mt-0.5">
            Compró {current.product}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Compra Verificada
            </span>
            <span className="text-[11px] font-medium">{fmt(current.price)}</span>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground p-1 transition"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
