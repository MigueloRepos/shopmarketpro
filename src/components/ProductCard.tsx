import { useState, useEffect } from "react";
import {
  Heart,
  Share2,
  X,
  MessageCircle,
  Star,
  Plus,
  Copy,
  Twitter,
  Store,
  CheckCircle2,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useShop } from "@/lib/cart";
import { toast } from "sonner";
import { fmt } from "@/lib/catalog";

export const productImages: Record<string, string> = {
  "Auriculares Pro X":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
  "Smartwatch Series 9":
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=80",
  "Altavoz Inalámbrico":
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80",
  "Mochila Minimal 2.0":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
  "Cámara Mini 4K":
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80",
  "Lámpara LED Inteligente":
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80",
  "Teclado Mecánico Pro":
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80",
  "Mouse Inalámbrico Ergonómico":
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80",
  "Cargador 3 en 1 MagSafe":
    "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=500&auto=format&fit=crop&q=80",
  "Botella Térmica 500ml":
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80",
  "Soporte Ajustable Laptop":
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80",
  "Power Bank 20K Ultra":
    "https://images.unsplash.com/photo-1609592424109-dd772f4405f6?w=500&auto=format&fit=crop&q=80",
  "Cable USB-C a C 100W":
    "https://images.unsplash.com/photo-1558537554-1cd5f4f815e1?w=500&auto=format&fit=crop&q=80",
  "Auriculares On-Ear Lite":
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
  "Organizador de Cables":
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80",
  "Drone Mini 2":
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=80",
  "Proyector Portátil":
    "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop&q=80",
  "Hub USB-C 7 en 1":
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=80",
  "Luz RGB Inteligente":
    "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500&auto=format&fit=crop&q=80",
  'Monitor Portátil 15.6"':
    "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format&fit=crop&q=80",
};

export interface ProductCardProps {
  name: string;
  price: number;
  old?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  compact?: boolean;
  image?: string;
  seller?: string;
  sellerVerified?: boolean;
  stock?: number;
}

export const productCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 16,
      mass: 0.8,
    },
  },
};

export function ProductCard({
  name,
  price,
  old,
  rating,
  reviews,
  badge,
  compact,
  image,
  seller,
  sellerVerified = true,
  stock,
}: ProductCardProps) {
  const { add, setCartOpen } = useShop();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSimulatedLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const discount = old ? Math.round(((old - price) / old) * 100) : 0;

  // Generate deterministic low stock (2-5) for some items to show the US low-stock label
  const displayStock =
    stock !== undefined
      ? stock
      : name.charCodeAt(0) % 3 === 0
        ? (name.charCodeAt(1) % 4) + 2
        : undefined;

  // Use custom image if provided, fall back to known Unsplash mock images, or a general default.
  const imageUrl =
    image ||
    productImages[name] ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80";

  const isLoading = isSimulatedLoading || !imgLoaded;

  return (
    <motion.div
      variants={productCardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group glass rounded-2xl p-3 flex flex-col gap-2 relative overflow-hidden border border-white/60 hover:shadow-xl transition-all duration-300"
    >
      {badge && (
        <Badge className="absolute top-4 left-4 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full z-10 border-0 font-bold text-[10px]">
          {badge}
        </Badge>
      )}
      {discount > 0 && (
        <Badge className="absolute top-4 right-4 bg-rose-500 hover:bg-rose-500 text-white rounded-full z-10 border-0 font-bold text-[10px] shadow-sm">
          -{discount}% DTO
        </Badge>
      )}

      {/* Top Right Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-all duration-300">
        <button
          aria-label="Favorito"
          className="w-8 h-8 rounded-full glass-strong hover:bg-white/80 grid place-items-center shadow-sm active:scale-95 transition cursor-pointer"
        >
          <Heart className="w-4 h-4 text-foreground/80 hover:text-rose-500 transition-colors" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSharing(true);
          }}
          aria-label="Compartir producto"
          className="w-8 h-8 rounded-full glass-strong hover:bg-white/80 grid place-items-center shadow-sm active:scale-95 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-foreground/80 hover:text-accent transition-colors" />
        </button>
      </div>

      <div
        className={`relative rounded-xl overflow-hidden bg-secondary/30 ${
          compact ? "aspect-square" : "aspect-[4/3]"
        }`}
      >
        {isLoading && <div className="absolute inset-0 animate-shimmer z-10" />}
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Share Options Panel Overlay */}
        {isSharing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-20 flex flex-col justify-between p-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Compartir
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSharing(false);
                }}
                className="w-6 h-6 rounded-full glass hover:bg-white/80 flex items-center justify-center transition cursor-pointer"
                aria-label="Cerrar opciones de compartir"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 my-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const text = encodeURIComponent(
                    `¡Mira este producto en Lumina! 🌟\n*${name}* - ${fmt(price)}\nhttps://lumina.store/#catalogo`,
                  );
                  window.open(`https://wa.me/?text=${text}`, "_blank");
                  setIsSharing(false);
                  toast.success("Enlace preparado para WhatsApp");
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                WhatsApp
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const text = encodeURIComponent(
                    `¡Me encanta este producto de Lumina! 🌟\n${name} - ${fmt(price)}\nhttps://lumina.store/#catalogo`,
                  );
                  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
                  setIsSharing(false);
                  toast.success("Enlace preparado para X");
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-black hover:bg-neutral-900 text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Twitter className="w-3.5 h-3.5 fill-current" />X / Twitter
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const url = `${window.location.origin}/#producto-${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))}`;
                  navigator.clipboard?.writeText(url);
                  setIsSharing(false);
                  toast.success("Enlace copiado", {
                    description: url,
                  });
                }}
                className="w-full py-1.5 px-3 rounded-lg glass-strong hover:bg-white/40 border border-white/60 text-foreground font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar enlace
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="px-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1 text-[11px] font-semibold text-accent/90 truncate">
            <Sparkles className="w-3 h-3 text-accent shrink-0" />
            <span>Tienda Oficial Lumina</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-500/10 shrink-0" />
          </div>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[40px]">{name}</h3>
          {rating !== undefined && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{rating}</span>
              {reviews && <span>({reviews})</span>}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 space-y-3.5">
          {/* Price & Stock/Delivery Row */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider leading-none mb-1">
                Precio Especial
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-lg text-foreground tracking-tight">
                  {fmt(price)}
                </span>
                {old && (
                  <span className="text-xs text-muted-foreground line-through font-medium">
                    {fmt(old)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              {displayStock !== undefined && displayStock > 0 && displayStock <= 5 ? (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/15 text-rose-600 dark:text-rose-400 font-bold text-[9px] animate-pulse-soft">
                  <span className="relative flex h-1 w-1 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-rose-600 dark:bg-rose-400"></span>
                  </span>
                  ¡Solo {displayStock} left!
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full">
                  <Zap className="w-2.5 h-2.5 fill-current text-emerald-500" /> Envío 24h
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="flex gap-2 w-full">
            <button
              onClick={() => {
                add({ name, price, image: imageUrl });
                setCartOpen(true);
                toast.success(`Iniciando pedido para: ${name}`);
              }}
              className="flex-1 relative group/btn h-10 rounded-xl bg-accent text-accent-foreground font-black text-xs hover-glow-accent shadow-md cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden transition-all duration-300 border border-accent/20 tracking-wider uppercase"
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent-foreground fill-current animate-pulse-soft" />
                PEDIR AHORA
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-fuchsia-500 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => {
                add({ name, price, image: imageUrl });
                toast.success(`${name} añadido al carrito`);
              }}
              aria-label="Añadir al carrito"
              className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground border border-black/10 dark:border-white/10 grid place-items-center hover:scale-102 active:scale-98 transition cursor-pointer shrink-0"
              title="Añadir al carrito"
            >
              <Plus className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductCardSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div className="glass rounded-2xl p-3 flex flex-col gap-2 relative overflow-hidden animate-pulse">
      {/* Image container skeleton with matching aspect ratio */}
      <div
        className={`relative rounded-xl overflow-hidden bg-muted-foreground/10 ${
          compact ? "aspect-square" : "aspect-[4/3]"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Info container skeleton */}
      <div className="px-1 flex-1 flex flex-col justify-between">
        <div className="space-y-2 mt-1">
          {/* Title skeleton */}
          <div className="h-4 bg-muted-foreground/15 rounded-md w-11/12" />
          <div className="h-4 bg-muted-foreground/15 rounded-md w-2/3" />

          {/* Star Rating skeleton */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="w-3.5 h-3.5 bg-muted-foreground/15 rounded-full" />
            <div className="h-3 bg-muted-foreground/15 rounded-md w-8" />
            <div className="h-3 bg-muted-foreground/15 rounded-md w-12" />
          </div>
        </div>

        {/* Price & Action skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-1.5">
            <div className="h-5 bg-muted-foreground/20 rounded-md w-14" />
            <div className="h-3.5 bg-muted-foreground/10 rounded-md w-8" />
          </div>
          <div className="w-8 h-8 rounded-full bg-muted-foreground/20 shrink-0 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
