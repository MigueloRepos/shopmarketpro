import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Search,
  ArrowUpDown,
  Sparkles,
  ShoppingBag,
  MessageCircleHeart,
  Heart,
  User,
  ChevronRight,
  SlidersHorizontal,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Send,
  Sliders,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useShop } from "@/lib/cart";
import { ProductCard, productCardVariants } from "@/components/ProductCard";
import { CartSheet } from "@/components/CartSheet";
import { ThumbNav } from "@/components/ThumbNav";
import { ShoppingAssistant } from "@/components/ShoppingAssistant";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { csvProducts, allProducts } from "@/lib/catalog";

export const Route = createFileRoute("/tienda")({
  component: StorePage,
});

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-3xl ${className}`}>{children}</div>;
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

function Navbar() {
  const { count, setCartOpen, setAssistantOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`transition-all duration-500 rounded-full flex items-center gap-4 border ${
          scrolled
            ? "glass-strong py-2.5 px-5 shadow-lg border-white/60"
            : "glass-subtle py-4 px-6 border-transparent bg-white/10 shadow-none"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="font-black text-lg tracking-tight">LUMINA</span>
        </Link>
        <div className="hidden lg:flex items-center gap-1 ml-4 text-sm font-medium">
          <Link
            to="/"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Inicio
          </Link>
          <Link
            to="/tienda"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 bg-white/40 font-semibold"
          >
            Tienda
          </Link>
          <a
            href="/#categorias"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Categorías
          </a>
          <a
            href="/#nosotros"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Nosotros
          </a>
          <a
            href="/#contacto"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Contacto
          </a>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            aria-label="Asistente IA"
            onClick={() => setAssistantOpen(true)}
            className="p-2 rounded-full hover:bg-white/60 transition"
          >
            <MessageCircleHeart className="w-5 h-5" />
          </button>
          <button
            aria-label="Favoritos"
            className="hidden sm:grid p-2 rounded-full hover:bg-white/60 transition"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            aria-label="Cuenta"
            className="hidden sm:grid p-2 rounded-full hover:bg-white/60 transition"
          >
            <User className="w-5 h-5" />
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

function Footer() {
  return (
    <footer className="mx-3 md:mx-6 mt-12 mb-6 scroll-mt-24">
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
                    <a href="#" className="hover:text-foreground">
                      {x}
                    </a>
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
          <div className="flex items-center gap-2 opacity-80 font-semibold">
            <span className="glass-subtle rounded px-3 py-1 text-foreground">
              Pago único vía Zelle
            </span>
            <span className="glass-subtle rounded px-2 py-1">pagos@lumina.store</span>
          </div>
        </div>
      </GlassCard>
    </footer>
  );
}

function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");

  // Load all products: merge standard catalog with imported CSV catalog
  const productsList = useMemo(() => {
    // Unique list by name to avoid visual duplicates
    const seen = new Set<string>();
    const merged = [...csvProducts, ...allProducts];
    return merged.filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
  }, []);

  // Compute unique categories dynamically
  const categoriesList = useMemo(() => {
    const categories = new Set<string>();
    productsList.forEach((p) => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return ["Todos", ...Array.from(categories).sort()];
  }, [productsList]);

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Category filter
    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)),
      );
    }

    // Sorting logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [productsList, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen relative overflow-x-hidden pb-28 lg:pb-0">
      <ScrollProgress />
      <div className="fixed inset-0 -z-10 aurora-bg opacity-40 pointer-events-none" />

      <Navbar />

      {/* Header section with gradient backdrop */}
      <section className="mx-3 md:mx-6 mt-6">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-tr from-accent/5 to-violet-500/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-semibold text-accent border border-white/60">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo Completo
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight">
              Explora nuestra <span className="italic font-light text-gradient">Colección.</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
              Descubre productos excepcionales con entrega inmediata y soporte personalizado. Añade
              artículos al carrito y haz tu pedido directamente por WhatsApp.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Filter and Grid Section */}
      <section className="mx-3 md:mx-6 mt-6">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3">
            <GlassCard className="p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <span className="font-semibold text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Filtros
                </span>
                {(selectedCategory !== "Todos" || searchQuery !== "" || sortBy !== "default") && (
                  <button
                    onClick={() => {
                      setSelectedCategory("Todos");
                      setSearchQuery("");
                      setSortBy("default");
                      toast.info("Filtros restablecidos");
                    }}
                    className="text-xs text-accent hover:underline"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Search input inside filters block */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="¿Qué estás buscando?..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-xl bg-white/60 border-white/60 text-sm h-10"
                  />
                </div>
              </div>

              {/* Sorting selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-10 rounded-xl bg-white/60 border border-white/60 px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="default">Relevancia</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating-desc">Mejor valorados</option>
                </select>
              </div>

              {/* Dynamic categories filter list */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Categorías
                </label>
                <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
                  {categoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                          isSelected
                            ? "bg-foreground text-background font-semibold"
                            : "hover:bg-white/40 text-foreground"
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">
                Mostrando {filteredProducts.length} de {productsList.length} productos
              </span>
              {selectedCategory !== "Todos" && (
                <Badge className="bg-accent/20 hover:bg-accent/20 text-accent border border-accent/30 rounded-full text-[10px]">
                  {selectedCategory}
                </Badge>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <GlassCard className="p-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/30 grid place-items-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">No encontramos resultados</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Prueba cambiando la categoría, restableciendo los filtros o escribiendo otra
                    palabra.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  variant="outline"
                  className="rounded-full h-10 px-5 text-xs font-medium glass cursor-pointer"
                >
                  Restablecer filtros
                </Button>
              </GlassCard>
            ) : (
              <motion.div
                key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.name} {...p} compact />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ThumbNav />
      <CartSheet />
      <ShoppingAssistant />
      <Toaster position="top-center" />
    </main>
  );
}
