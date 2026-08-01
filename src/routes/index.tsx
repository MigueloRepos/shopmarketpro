import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
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
import { ProductCard, productCardVariants } from "@/components/ProductCard";
import heroImg from "@/assets/hero-headphones.jpg";
import aboutImg from "@/assets/about-showroom.jpg";
import { useLocalizedCopy } from "@/lib/copywriting";
import { csvProducts, allProducts } from "@/lib/catalog";

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
        <a href="#inicio" className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="font-black text-lg tracking-tight">LUMINA</span>
        </a>
        <div className="hidden lg:flex items-center gap-1 ml-4 text-sm font-medium">
          <a
            href="#inicio"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 underline underline-offset-4"
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
            href="#productos"
            className="px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60"
          >
            Productos
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
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xs ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos…"
              className={`pl-9 rounded-full bg-white/60 border-white/60 transition-all duration-300 ${
                scrolled ? "h-8 text-xs" : "h-9 text-sm"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 ml-auto md:ml-2">
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

function Hero() {
  const { headline, subheadline, greeting } = useLocalizedCopy();

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
              {greeting} • Edición Limitada 2026
            </div>
          </div>

          <div className="space-y-4 animate-fade-up [animation-delay:150ms]">
            <h1
              className="font-display text-4xl xs:text-5xl md:text-7xl xl:text-[5.5rem] leading-[0.92] font-normal tracking-tight text-foreground"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
            <p className="text-muted-foreground/90 text-sm xs:text-base md:text-lg max-w-lg leading-relaxed font-sans font-light">
              {subheadline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              asChild
              className="rounded-full h-12 sm:h-13 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-glow text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Link to="/tienda">
                Comprar ahora
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full h-12 sm:h-13 px-6 sm:px-8 glass border-white/60 hover:bg-white/40 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Link to="/tienda">
                Ver catálogo
                <Play className="w-3 h-3 fill-current" />
              </Link>
            </Button>
          </div>

          {/* Minimalist Editorial Stats instead of nested boxes */}
          <div className="pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-3 gap-3 xs:gap-4 md:gap-6 animate-fade-up [animation-delay:450ms]">
            {[
              { k: "4.9/5", v: "VALORACIÓN" },
              { k: "100%", v: "MATERIALES" },
              { k: "24h", v: "ENTREGA" },
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
                alt="Auriculares premium Lumina"
                width={1200}
                height={1200}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Luxury Specification Float Tag (Offset timing) */}
          <div className="absolute -bottom-2 sm:-bottom-4 left-2 sm:-left-2 md:-left-6 glass-strong rounded-2xl p-3 sm:p-4 max-w-[160px] xs:max-w-[210px] border border-white/60 shadow-glow animate-float [animation-delay:2s] z-20">
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-accent/25 grid place-items-center shrink-0">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent animate-pulse" />
              </div>
              <span className="font-semibold text-[10px] sm:text-xs tracking-wide text-foreground">
                Artesanía
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-muted-foreground leading-normal">
              Acústica refinada con transductores de berilio.
            </p>
          </div>

          {/* Luxury Certification Tag (Offset timing) */}
          <div className="absolute -top-3 sm:-top-6 right-2 sm:-right-2 md:-right-6 glass-strong rounded-2xl p-3 sm:p-4 max-w-[140px] xs:max-w-[190px] border border-white/60 shadow-glow animate-float [animation-delay:4s] z-20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] sm:text-[10px] tracking-widest text-accent font-bold uppercase">
                LUMINA PRO
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-foreground font-medium">
              30h de autonomía acústica total.
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
  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Más vendidos" />
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
      </GlassCard>
    </section>
  );
}

function Products() {
  return (
    <section id="productos" className="mx-3 md:mx-6 mt-6 scroll-mt-24">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Productos de la tienda" />
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
  return (
    <section className="mx-3 md:mx-6 mt-6">
      <GlassCard className="p-6 md:p-8">
        <SectionHeader title="Productos recientes" />
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
        <div className="fixed inset-0 -z-10 aurora-bg opacity-40 pointer-events-none" />
        <Navbar />
        <Hero />
        <Categories />
        <BestSellers />
        <Products />
        <WhyUs />
        <Recent />
        <About />
        <Footer />
        <ThumbNav />
        <CartSheet />
        <ShoppingAssistant />
        <Toaster position="top-center" />
      </main>
    </ShopProvider>
  );
}
