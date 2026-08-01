import { Home, LayoutGrid, ShoppingBag, MessageCircleHeart, Search, Store } from "lucide-react";
import { useShop } from "@/lib/cart";
import { Link } from "@tanstack/react-router";

export function ThumbNav() {
  const { count, setCartOpen, setAssistantOpen } = useShop();

  const item =
    "flex flex-col items-center justify-center gap-1 flex-1 h-14 rounded-2xl text-[11px] font-medium active:scale-95 transition";

  return (
    <nav
      aria-label="Navegación móvil"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
    >
      <div className="glass-strong rounded-[1.75rem] flex items-center gap-1 px-2 py-1.5 shadow-glow">
        <Link
          to="/tienda"
          className={item}
          activeProps={{ className: "text-accent font-semibold" }}
        >
          <Store className="w-5 h-5" />
          Tienda
        </Link>
        <Link
          to="/"
          className={item}
          activeProps={{ className: "text-accent font-semibold" }}
          activeOptions={{ exact: true }}
        >
          <Home className="w-5 h-5" />
          Inicio
        </Link>

        <button
          type="button"
          aria-label="Asistente IA"
          onClick={() => setAssistantOpen(true)}
          className="shrink-0 -mt-6 w-14 h-14 rounded-full bg-foreground text-background grid place-items-center shadow-glow active:scale-95 transition"
        >
          <MessageCircleHeart className="w-6 h-6" />
        </button>

        <a href="/#categorias" className={item}>
          <LayoutGrid className="w-5 h-5" />
          Categorías
        </a>
        <button type="button" onClick={() => setCartOpen(true)} className={`${item} relative`}>
          <ShoppingBag className="w-5 h-5" />
          Carrito
          {count > 0 && (
            <span className="absolute top-1 right-[22%] bg-accent text-accent-foreground text-[10px] font-bold min-w-4 h-4 px-1 rounded-full grid place-items-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
