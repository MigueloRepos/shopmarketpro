import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Play,
  Laptop,
  Headphones,
  Home as HomeIcon,
  Watch,
  Dumbbell,
  Flower2,
  Star,
  Plus,
  Truck,
  ShieldCheck,
  LifeBuoy,
  Award,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
  ChevronRight,
  Zap,
  Users,
  Target,
  Eye,
  MessageCircleHeart,
  Share2,
  X,
  MessageCircle,
  Copy,
  Store,
  Building2,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShopProvider, useShop } from "@/lib/cart";
import { CartSheet } from "@/components/CartSheet";
import { ThumbNav } from "@/components/ThumbNav";
import { ShoppingAssistant } from "@/components/ShoppingAssistant";
import {
  ProductCard,
  productCardVariants,
  ProductCardSkeleton,
  productImages,
} from "@/components/ProductCard";
import { TopConversionBar } from "@/components/TopConversionBar";
import { SalesNotificationTicker } from "@/components/SalesNotificationTicker";
import heroImg from "@/assets/hero-headphones.jpg";
import aboutImg from "@/assets/about-showroom.jpg";
import { useLocalizedCopy } from "@/lib/copywriting";
import { csvProducts, allProducts, featuredVendors } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

/* ------------------------------ Data ------------------------------ */
const categories = [
  { name: "Tecnología", icon: Laptop, hue: "from-blue-200/60 to-blue-400/40" },
  { name: "Audio", icon: Headphones, hue: "from-violet-200/60 to-fuchsia-300/40" },
  { name: "Hogar", icon: HomeIcon, hue: "from-orange-200/60 to-rose-300/40" },
  { name: "Accesorios", icon: Watch, hue: "from-emerald-200/60 to-teal-300/40" },
  { name: "Deporte", icon: Dumbbell, hue: "from-sky-200/60 to-cyan-300/40" },
  { name: "Belleza", icon: Flower2, hue: "from-pink-200/60 to-rose-300/40" },
];

const bestSellers = [
  { name: "Auriculares Pro X", price: 129.99, old: 179.99, rating: 4.9, reviews: 1240 },
  { name: "Smartwatch Series 9", price: 199.99, old: 249.99, rating: 4.8, reviews: 890 },
  { name: "Altavoz Inalámbrico", price: 89.99, old: 119.99, rating: 4.9, reviews: 654 },
  { name: "Mochila Minimal 2.0", price: 69.99, old: 99.99, rating: 4.7, reviews: 432 },
  { name: "Cámara Mini 4K", price: 159.99, old: 219.99, rating: 4.8, reviews: 1120 },
];

const products = [
  { name: "Lámpara LED Inteligente", price: 49.99 },
  { name: "Teclado Mecánico Pro", price: 99.99 },
  { name: "Mouse Inalámbrico Ergonómico", price: 39.99 },
  { name: "Cargador 3 en 1 MagSafe", price: 59.99 },
  { name: "Botella Térmica 500ml", price: 29.99 },
  { name: "Soporte Ajustable Laptop", price: 34.99 },
  { name: "Power Bank 20K Ultra", price: 49.99 },
  { name: "Cable USB-C a C 100W", price: 19.99 },
  { name: "Auriculares On-Ear Lite", price: 59.99 },
  { name: "Organizador de Cables", price: 14.99 },
];

const recent = [
  { name: "Drone Mini 2", price: 299.99 },
  { name: "Proyector Portátil", price: 189.99 },
  { name: "Hub USB-C 7 en 1", price: 49.99 },
  { name: "Luz RGB Inteligente", price: 24.99 },
  { name: 'Monitor Portátil 15.6"', price: 159.99 },
];

const benefits = [
  {
    icon: Award,
    title: "Calidad Premium",
    desc: "Productos seleccionados bajo los más altos estándares.",
    hue: "text-violet-500 bg-violet-100/60",
  },
  {
    icon: Truck,
    title: "Envío Rápido",
    desc: "Entregas en 24 a 48 horas en todo el país.",
    hue: "text-emerald-500 bg-emerald-100/60",
  },
  {
    icon: ShieldCheck,
    title: "Garantía Extendida",
    desc: "Hasta 2 años de garantía en nuestros productos.",
    hue: "text-blue-500 bg-blue-100/60",
  },
  {
    icon: LifeBuoy,
    title: "Soporte 24/7",
    desc: "Atención personalizada siempre que la necesites.",
    hue: "text-rose-500 bg-rose-100/60",
  },
];

/* ------------------------------ Helpers ------------------------------ */
const fmt = (n: number) => `$${n.toFixed(2)}`;

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-3xl ${className}`}>{children}</div>;
}

/* ------------------------------ Sections ------------------------------ */
function Navbar() {
  const { count, setCartOpen, setAssistantOpen, add, setPaymentInstructionsOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchVal.trim()) {
      navigate({ to: "/tienda", search: { q: searchVal.trim() } });
      setIsFocused(false);
    }
  };

  const filteredQuickProducts = useMemo(() => {
    if (!searchVal.trim()) return [];
    const q = searchVal.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)),
      )
      .slice(0, 5);
  }, [searchVal]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky z-50 transition-all duration-500 ${
        scrolled ? "top-2 mx-4 md:mx-8 max-w-7xl lg:mx-auto left-0 right-0" : "top-4 mx-3 md:mx-6"
      }`}
    >
      <div
        className={`transition-all duration-500 rounded-full flex items-center gap-3 border ${
          scrolled
            ? "glass-strong py-2.5 px-5 shadow-lg border-white/60"
            : "glass-subtle py-4 px-6 border-transparent bg-white/10 shadow-none"
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="font-black text-lg tracking-tight">LUMINA</span>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent uppercase tracking-wider">
            Tienda Oficial
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-1 ml-2 text-sm font-medium">
          <a
            href="#inicio"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Inicio
          </a>
          <Link
            to="/tienda"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 font-semibold text-accent flex items-center gap-1"
          >
            Tienda
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </Link>
          <a
            href="#categorias"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Categorías
          </a>
          <a
            href="#nosotros"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Nosotros
          </a>
          <a
            href="#contacto"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Contacto
          </a>
          <button
            onClick={() => setPaymentInstructionsOpen(true)}
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 font-semibold text-accent cursor-pointer text-sm"
          >
            Cómo Pagar
          </button>
        </div>

        <div
          className="hidden md:flex items-center flex-1 max-w-xs ml-auto"
          ref={searchContainerRef}
        >
          <div className="relative w-full group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-accent" />
            <Input
              type="text"
              value={searchVal}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                setSearchVal(e.target.value);
                setIsFocused(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Buscar en la tienda oficial..."
              className={`pl-10 pr-4 rounded-full bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-all duration-300 placeholder:text-muted-foreground/70 ${
                scrolled ? "h-8 text-xs" : "h-9 text-sm"
              }`}
            />

            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 p-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col gap-2.5 max-h-[380px] w-80 md:w-96 right-0 md:left-auto"
                >
                  {/* Empty state: popular suggestions & recommended */}
                  {!searchVal.trim() ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1.5 block">
                          Búsquedas populares
                        </span>
                        <div className="flex flex-wrap gap-1.5 px-2">
                          {["Auriculares", "Reloj", "Proyector", "Altavoz"].map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => {
                                setSearchVal(term);
                                setIsFocused(true);
                              }}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-accent/15 hover:text-accent border border-black/5 dark:border-white/5 transition-colors duration-200 text-foreground cursor-pointer font-semibold"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-black/5 dark:border-white/5 pt-2.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1.5 block">
                          Productos Recomendados
                        </span>
                        <div className="flex flex-col gap-1">
                          {allProducts.slice(0, 3).map((p) => {
                            const img =
                              p.image ||
                              productImages[p.name] ||
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80";
                            return (
                              <div
                                key={p.name}
                                onClick={() => {
                                  navigate({ to: "/tienda", search: { q: p.name } });
                                  setIsFocused(false);
                                }}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer group/item"
                              >
                                <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-black/5 dark:border-white/5">
                                  <img
                                    src={img}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-semibold text-[11px] text-foreground truncate block text-left">
                                    {p.name}
                                  </span>
                                  <span className="text-[9px] text-muted-foreground block font-medium text-left">
                                    {p.category || "Electrónica"}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-accent whitespace-nowrap mr-1">
                                  {fmt(p.price)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Search results state */
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1">
                        Resultados encontrados
                      </span>
                      {filteredQuickProducts.length === 0 ? (
                        <div className="text-center py-6 px-4">
                          <p className="text-xs text-muted-foreground font-medium">
                            No se encontraron productos para{" "}
                            <strong className="text-foreground">"{searchVal}"</strong>
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 max-h-[260px] overflow-y-auto pr-0.5">
                          {filteredQuickProducts.map((p) => {
                            const img =
                              p.image ||
                              productImages[p.name] ||
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80";
                            return (
                              <div
                                key={p.name}
                                onClick={() => {
                                  navigate({ to: "/tienda", search: { q: p.name } });
                                  setIsFocused(false);
                                }}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer group/item text-left"
                              >
                                <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-black/5 dark:border-white/5">
                                  <img
                                    src={img}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-bold text-[11px] text-foreground truncate block text-left">
                                    {p.name}
                                  </span>
                                  <span className="text-[9px] text-muted-foreground block font-semibold uppercase tracking-wider text-left">
                                    {p.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-black text-accent whitespace-nowrap">
                                    {fmt(p.price)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      add(p);
                                      toast.success(`Añadido al carrito: ${p.name}`);
                                    }}
                                    className="p-1 rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer flex items-center justify-center"
                                    title="Añadir al carrito"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-1 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            navigate({ to: "/tienda", search: { q: searchVal.trim() } });
                            setIsFocused(false);
                          }}
                          className="text-[10px] font-bold text-accent hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          Ver todos los resultados <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-1.5 ml-auto md:ml-2">
          <button
            aria-label="Asistente IA"
            onClick={() => setAssistantOpen(true)}
            className="p-2 rounded-full hover:bg-white/60 transition"
          >
            <MessageCircleHeart className="w-5 h-5" />
          </button>
          <button
            aria-label="Carrito"
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/60 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold min-w-4 h-4 px-1 rounded-full grid place-items-center animate-pulse">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative mx-3 md:mx-6 mt-6 overflow-hidden rounded-[2.5rem] hero-bg scroll-mt-24"
    >
      {/* Subtle luxury mesh & floating light orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 aurora-bg opacity-75 pointer-events-none" />

      {/* Dynamic backdrop glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-400/10 rounded-full blur-[100px] animate-float [animation-delay:3s]" />

      <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 p-5 xs:p-6 md:p-12 lg:p-16 xl:p-20 items-center">
        {/* Left Column: Typographic Mastery & Editorial Content */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 lg:pr-6">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2.5 glass-subtle border border-white/60 rounded-full px-4 py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              LUMINA OFFICIAL STORE • TIENDA DIRECTA
            </div>
          </div>

          <div className="space-y-4 animate-fade-up [animation-delay:150ms]">
            <h1 className="font-display text-4xl xs:text-5xl md:text-7xl xl:text-[5.2rem] leading-[0.93] font-normal tracking-tight text-foreground">
              Tu Tienda Exclusiva de{" "}
              <span className="font-serif italic text-accent">Tecnología y Estilo</span>
            </h1>
            <p className="text-muted-foreground/90 text-sm xs:text-base md:text-lg max-w-lg leading-relaxed font-sans font-light">
              Descubre nuestra colección oficial. Todos los envíos son procesados directamente por
              nosotros en 24h, con garantía oficial de 3 años y atención personalizada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              asChild
              className="rounded-full h-12 sm:h-13 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-glow text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Link to="/tienda">
                Explorar Catálogo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full h-12 sm:h-13 px-6 sm:px-8 glass border-white/60 hover:bg-white/40 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <a href="#nosotros">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Garantía y Calidad Directa
              </a>
            </Button>
          </div>

          {/* Minimalist Editorial Stats */}
          <div className="pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-3 gap-3 xs:gap-4 md:gap-6 animate-fade-up [animation-delay:450ms]">
            {[
              { k: "100%", v: "DIRECTO DE FÁBRICA" },
              { k: "24H", v: "ENVÍO EXPRÉS" },
              { k: "3 AÑOS", v: "GARANTÍA OFICIAL" },
            ].map((s, i) => (
              <div
                key={s.k}
                className={`space-y-1 ${i < 2 ? "border-r border-white/20 pr-3 sm:pr-4" : ""}`}
              >
                <div className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl text-foreground font-light tracking-tight">
                  {s.k}
                </div>
                <div className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] text-muted-foreground/80 font-medium leading-none uppercase">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Layered Premium Hero Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
          {/* Outer glowing halo */}
          <div className="absolute w-[110%] aspect-square bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-float opacity-80" />

          {/* Main Visual Frame with Float Animation */}
          <div className="relative w-full max-w-[340px] xs:max-w-[440px] aspect-square rounded-[2rem] xs:rounded-[2.5rem] p-3 xs:p-4 glass-strong shadow-glow animate-float z-10">
            <div className="w-full h-full rounded-[1.4rem] xs:rounded-[1.8rem] overflow-hidden bg-gradient-to-b from-white to-secondary/20 relative group">
              <img
                src={heroImg}
                alt="Tienda Oficial Lumina"
                width={1200}
                height={1200}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Luxury Floating Tag 1 */}
          <div className="absolute -bottom-2 sm:-bottom-4 left-2 sm:-left-2 md:-left-6 glass-strong rounded-2xl p-3 sm:p-4 max-w-[170px] xs:max-w-[220px] border border-white/60 shadow-glow animate-float [animation-delay:2s] z-20">
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-accent/25 grid place-items-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              </div>
              <span className="font-semibold text-[10px] sm:text-xs tracking-wide text-foreground">
                Garantía Lumina 3 Años
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-muted-foreground leading-normal">
              Atención prioritaria y reemplazo directo sin intermediarios.
            </p>
          </div>

          {/* Luxury Floating Tag 2 */}
          <div className="absolute -top-3 sm:-top-6 right-2 sm:-right-2 md:-right-6 glass-strong rounded-2xl p-3 sm:p-4 max-w-[150px] xs:max-w-[200px] border border-white/60 shadow-glow animate-float [animation-delay:4s] z-20">
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10" />
              <span className="text-[9px] sm:text-[10px] tracking-widest text-accent font-bold uppercase">
                TIENDA OFICIAL
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-foreground font-medium">
              Stock 100% propio con envío prioritario en 24h.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, action = "Ver todos" }: { title: string; action?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <Link
        to="/tienda"
        className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
      >
        {action} <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function Categories() {
  return (
    <section id="categorias" className="mx-3 md:mx-6 mt-10 scroll-mt-24">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Explora categorías" action="Ver todas" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <motion.button
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className={`group relative aspect-square rounded-2xl bg-gradient-to-br ${c.hue} p-4 flex flex-col items-center justify-center gap-3 overflow-hidden border border-white/60`}
            >
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition" />
              <c.icon className="w-10 h-10 text-foreground/80 relative z-10" strokeWidth={1.5} />
              <span className="text-sm font-semibold relative z-10">{c.name}</span>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

const staggerGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const storeProducts6 = (() => {
  const seen = new Set<string>();
  const merged = [...csvProducts, ...allProducts];
  return merged
    .filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    })
    .slice(0, 6);
})();

const storeProducts12 = (() => {
  const seen = new Set<string>();
  const merged = [...csvProducts, ...allProducts];
  return merged
    .filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    })
    .slice(0, 12);
})();

function BestSellers() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Más vendidos" />
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {storeProducts6.map((p, i) => (
              <ProductCard key={p.name} {...p} badge={`#${i + 1}`} />
            ))}
          </motion.div>
        )}
      </GlassCard>
    </section>
  );
}

function Products() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="productos" className="mx-3 md:mx-6 mt-6 scroll-mt-24">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Productos de la tienda" />
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} compact />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {storeProducts12.map((p) => (
              <ProductCard key={p.name} {...p} compact />
            ))}
          </motion.div>
        )}
      </GlassCard>
    </section>
  );
}

function FlashSaleDeals() {
  const { add, setCartOpen } = useShop();
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const flashItems = [
    {
      name: "Auriculares Wireless Lumina Pro",
      price: 89.99,
      old: 149.99,
      sold: 86,
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
      seller: "Lumina Official Store",
    },
    {
      name: "Reloj Inteligente Ultra AMOLED",
      price: 69.99,
      old: 119.99,
      sold: 92,
      stock: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
      seller: "TechWorld Global",
    },
    {
      name: "Proyector Portátil Full HD",
      price: 139.99,
      old: 229.99,
      sold: 78,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
      seller: "Lumina Official Store",
    },
    {
      name: "Mochila Antirrobo e Impermeable",
      price: 34.99,
      old: 69.99,
      sold: 95,
      stock: 3,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
      seller: "Urban Style Co.",
    },
  ];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="mx-3 md:mx-6 mt-6">
      <div className="glass-strong rounded-3xl p-6 md:p-8 border-2 border-rose-500/30 bg-gradient-to-br from-rose-500/5 via-fuchsia-500/5 to-accent/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/40">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
              Ofertas Relámpago - Exclusivo Hoy
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Descuentos de Hasta el <span className="text-rose-500 font-black">-50% DTO</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Unidades limitadas con garantía de precio mínimo y envío exprés en 24h.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/80 text-white px-4 py-2.5 rounded-2xl border border-white/20 self-start md:self-auto shadow-lg">
            <span className="text-xs text-white/70 font-medium">La oferta termina en:</span>
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-amber-400">
              <span className="bg-white/10 px-2 py-1 rounded">{pad(timeLeft.hours)}h</span>:
              <span className="bg-white/10 px-2 py-1 rounded">{pad(timeLeft.minutes)}m</span>:
              <span className="bg-white/10 px-2 py-1 rounded text-rose-400 animate-pulse">
                {pad(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {flashItems.map((item) => {
            const discount = Math.round(((item.old - item.price) / item.old) * 100);
            return (
              <div
                key={item.name}
                className="glass rounded-2xl p-4 border border-white/60 flex flex-col justify-between relative group hover:border-rose-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  -{discount}% OPORTUNIDAD
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/40 mb-3 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {item.seller}
                    </div>
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 mt-0.5">
                      {item.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-lg text-rose-600 dark:text-rose-400">
                        {fmt(item.price)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through font-medium">
                        {fmt(item.old)}
                      </span>
                    </div>

                    {/* Stock Bar Meter */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current" />
                          🔥 ¡Solo quedan {item.stock}!
                        </span>
                        <span className="text-muted-foreground">{item.sold}% vendido</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                          style={{ width: `${item.sold}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        add({ name: item.name, price: item.price });
                        setCartOpen(true);
                        toast.success(`¡OFERTA RELÁMPAGO! ${item.name}`);
                      }}
                      className="w-full rounded-full h-10 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md animate-pulse-soft hover-glow-accent mt-2 relative group/btn overflow-hidden border border-white/20"
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-bounce" />
                        PEDIR AHORA EN 1 CLIC
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CustomerReviewsSection() {
  const reviews = [
    {
      name: "María Fernández",
      city: "Miami",
      rating: 5,
      date: "Hace 2 días",
      product: "Auriculares Wireless Lumina Pro",
      text: "Llegaron en 24 horas exactas a Miami. La calidad del sonido es fantástica y el pago por Zelle fue sumamente fácil y seguro.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Alejandro Gómez",
      city: "Nueva York",
      rating: 5,
      date: "Hace 3 días",
      product: "Reloj Inteligente Ultra AMOLED",
      text: "Súper contento con la compra. El empaque venía muy protegido y la batería dura más de 5 días. 100% recomendado.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Carmen Ruiz",
      city: "Orlando",
      rating: 5,
      date: "Hace 5 días",
      product: "Proyector Portátil HD",
      text: "Comprar a través de los vendedores verificados de Lumina me dio total tranquilidad. Todo transparente y perfecto.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-10">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            4.9 / 5.0 Rating Excelente
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Lo que dicen nuestros{" "}
            <span className="text-accent italic font-light">Clientes Verificados</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Más de 3,420 compras entregadas con éxito este mes con satisfacción garantizada.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="glass-subtle rounded-2xl p-5 border border-white/60 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">{r.date}</span>
                </div>

                <p className="text-xs leading-relaxed text-foreground/90 font-medium italic">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/80"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1">
                      {r.name}
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-500/20" />
                    </div>
                    <div className="text-[10px] text-muted-foreground">{r.city}</div>
                  </div>
                </div>

                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-[9px] font-bold">
                  Comprador Verificado
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-subtle rounded-2xl p-5 flex items-start gap-3"
            >
              <div className={`w-11 h-11 shrink-0 rounded-xl grid place-items-center ${b.hue}`}>
                <b.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{b.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function Recent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Productos recientes" />
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} compact />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {recent.map((p) => (
              <ProductCard key={p.name} {...p} badge="NUEVO" compact />
            ))}
          </motion.div>
        )}
      </GlassCard>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="mx-3 md:mx-6 mt-6 scroll-mt-24">
      <GlassCard className="p-4 md:p-6 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
            <img
              src={aboutImg}
              alt="Showroom Lumina"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Acerca de nosotros</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              En Lumina creemos que la tecnología y el diseño tienen el poder de mejorar tu día a
              día. Seleccionamos cuidadosamente cada producto para ofrecerte calidad, innovación y
              estilo.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: Target, t: "Misión", d: "Mejorar tu vida con productos innovadores." },
                { icon: Eye, t: "Visión", d: "Ser tu tienda online de confianza." },
                { icon: Zap, t: "Valores", d: "Calidad, honestidad y compromiso." },
              ].map((v) => (
                <div key={v.t} className="glass-subtle rounded-xl p-3">
                  <v.icon className="w-5 h-5 text-accent mb-2" />
                  <div className="font-semibold text-sm">{v.t}</div>
                  <p className="text-xs text-muted-foreground mt-1">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

function Footer() {
  const { setPaymentInstructionsOpen } = useShop();
  return (
    <footer id="contacto" className="mx-3 md:mx-6 mt-6 mb-6 scroll-mt-24">
      <GlassCard className="p-6 md:p-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-black text-lg">LUMINA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tu tienda online de confianza. Productos premium, experiencia excepcional.
            </p>
            <div className="flex gap-2">
              {[Instagram, Twitter, Youtube, Facebook].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-subtle grid place-items-center hover:bg-white/60 transition"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            {
              t: "Comprar",
              l: ["Todos los productos", "Más vendidos", "Productos nuevos", "Ofertas"],
            },
            { t: "Empresa", l: ["Nosotros", "Blog", "Trabaja con nosotros", "Prensa"] },
            {
              t: "Ayuda",
              l: ["Preguntas frecuentes", "Envíos y entregas", "Devoluciones", "Contacto"],
            },
          ].map((c) => (
            <div key={c.t}>
              <div className="font-semibold text-sm mb-3">{c.t}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.l.map((x) => (
                  <li key={x}>
                    {c.t === "Comprar" ? (
                      <Link to="/tienda" className="hover:text-foreground">
                        {x}
                      </Link>
                    ) : (
                      <a href="#" className="hover:text-foreground">
                        {x}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-1">
            <div className="font-semibold text-sm mb-2">Suscríbete a nuestro newsletter</div>
            <p className="text-xs text-muted-foreground mb-3">
              Recibe ofertas exclusivas y novedades.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("¡Suscripción realizada!");
              }}
              className="flex items-center gap-2 glass-subtle rounded-full p-1 pl-4"
            >
              <input
                type="email"
                required
                placeholder="Ingresa tu email"
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Suscribir"
                className="w-9 h-9 rounded-full bg-foreground text-background grid place-items-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Lumina. Todos los derechos reservados.</span>
          <div className="flex items-center gap-2 font-semibold">
            <button
              onClick={() => setPaymentInstructionsOpen(true)}
              className="glass-subtle rounded px-3 py-1 text-foreground hover:bg-accent/15 hover:text-accent transition duration-200 cursor-pointer text-xs flex items-center gap-1 font-semibold"
            >
              Pago único vía Zelle ℹ️
            </button>
            <button
              onClick={() => setPaymentInstructionsOpen(true)}
              className="glass-subtle rounded px-2 py-1 text-muted-foreground hover:bg-accent/15 hover:text-accent transition duration-200 cursor-pointer text-xs font-semibold"
            >
              pagos@lumina.store
            </button>
          </div>
        </div>
      </GlassCard>
    </footer>
  );
}

function OfficialStoreBenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Envío 24/48h Desde Almacén Propio",
      desc: "Despachamos todos los pedidos directamente desde nuestra central logística en menos de 24 horas laborables.",
      badge: "Logística Directa",
      hue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Garantía Oficial de 3 Años",
      desc: "Cobertura total contra defectos de fabricación con reemplazo directo inmediato sin costes de envío.",
      badge: "Marca Oficial",
      hue: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: CheckCircle2,
      title: "Control de Calidad Unitario",
      desc: "Cada unidad es probada e inspeccionada técnicamente antes de ser empaquetada para garantizar rendimiento óptimo.",
      badge: "Certificado Lumina",
      hue: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    },
    {
      icon: Award,
      title: "Soporte VIP Directo 24/7",
      desc: "Atención personalizada por chat interactivo, correo y llamada telefónica directa con nuestro equipo de especialistas.",
      badge: "Atención VIP",
      hue: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section id="ventajas" className="mx-3 md:mx-6 mt-10 scroll-mt-24">
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Experiencia Lumina Directa
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              ¿Por qué Comprar Directamente en Nuestra Tienda Oficial?
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Sin intermediarios ni terceros. Calidad superior, garantía asegurada y la mejor
              experiencia de compra.
            </p>
          </div>
          <Link
            to="/tienda"
            className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Ver catálogo completo <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-subtle rounded-2xl p-5 flex flex-col justify-between border border-white/60 hover:bg-white/40 transition group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl grid place-items-center border ${b.hue}`}>
                    <b.icon className="w-5 h-5" />
                  </div>
                  <Badge className="text-[9px] px-2 py-0.5 bg-accent/20 text-accent border-0 font-bold uppercase tracking-wider">
                    {b.badge}
                  </Badge>
                </div>

                <h3 className="font-bold text-base leading-snug group-hover:text-accent transition-colors">
                  {b.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function OfficialStoreGuarantees() {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: "Garantía de Devolución",
      desc: "Prueba cualquier producto durante 30 días. Si no cumple tus expectativas, te devolvemos el 100% de tu dinero.",
      hue: "text-emerald-500 bg-emerald-100/60",
    },
    {
      icon: Award,
      title: "Productos 100% Originales",
      desc: "Fabricación directa con materiales de primera calidad, acabados de precisión y estándares internacionales.",
      hue: "text-violet-500 bg-violet-100/60",
    },
    {
      icon: Truck,
      title: "Seguimiento en Tiempo Real",
      desc: "Recibe actualizaciones inmediatas por SMS y correo electrónico desde que tu pedido sale de nuestro almacén.",
      hue: "text-blue-500 bg-blue-100/60",
    },
    {
      icon: Sparkles,
      title: "Empaque Premium de Regalo",
      desc: "Todos nuestros envíos incluyen estuche protector exclusivo sin coste adicional.",
      hue: "text-amber-500 bg-amber-100/60",
    },
  ];

  return (
    <section className="mx-3 md:mx-6 mt-10">
      <GlassCard className="p-6 md:p-10">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <Badge className="bg-accent/20 text-accent border-0 uppercase tracking-widest text-[10px] font-bold">
            Compromiso de Marca Lumina
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Transparencia y Excelencia en Cada Entrega
          </h2>
          <p className="text-sm text-muted-foreground">
            Diseñamos y distribuimos directamente para ofrecerte la máxima confianza y durabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="glass-subtle rounded-2xl p-5 border border-white/60 space-y-3"
            >
              <div className={`w-10 h-10 rounded-xl grid place-items-center ${g.hue}`}>
                <g.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">{g.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function VIPClubBanner() {
  return (
    <section className="mx-3 md:mx-6 mt-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-900 via-indigo-900 to-black text-white p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,100,240,0.3),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-accent-foreground border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Club Exclusivo Lumina VIP
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Recibe un{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-fuchsia-300 to-amber-200">
                -10% DTO Adicional
              </span>{" "}
              <br className="hidden sm:inline" />
              en tu primera compra directa
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-xl font-light leading-relaxed">
              Únete a nuestra comunidad oficial y disfruta de beneficios exclusivos: acceso
              anticipado a colecciones de edición limitada, ofertas secretas y soporte prioritario.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Button
              size="lg"
              asChild
              className="rounded-full h-13 px-8 bg-white text-black hover:bg-white/90 font-bold text-sm tracking-wide shadow-glow transition hover:scale-105 cursor-pointer"
            >
              <Link to="/tienda">
                Comprar con Descuento VIP
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-[11px] text-white/60 text-center">
              Descuento aplicable automáticamente en tu carrito
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100] pointer-events-none shadow-[0_1px_8px_rgba(180,100,240,0.4)]"
    />
  );
}

/* ------------------------------ Page ------------------------------ */
function Home() {
  return (
    <ShopProvider>
      <main className="min-h-screen relative overflow-x-hidden pb-28 lg:pb-0">
        <ScrollProgress />
        <TopConversionBar />
        <div className="fixed inset-0 -z-10 aurora-bg opacity-40 pointer-events-none" />
        <Navbar />
        <Hero />
        <FlashSaleDeals />
        <Categories />
        <OfficialStoreBenefitsSection />
        <BestSellers />
        <CustomerReviewsSection />
        <Products />
        <OfficialStoreGuarantees />
        <VIPClubBanner />
        <WhyUs />
        <Recent />
        <About />
        <Footer />
        <SalesNotificationTicker />
        <ThumbNav />
        <CartSheet />
        <ShoppingAssistant />
        <Toaster position="top-center" />
      </main>
    </ShopProvider>
  );
}
