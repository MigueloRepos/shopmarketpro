import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Copy,
  Check,
  ArrowRight,
  MessageCircle,
  Truck,
  Tag,
  ShieldCheck,
  Sparkles,
  Gift,
  Flame,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useShop } from "@/lib/cart";
import { fmt } from "@/lib/catalog";

export const ZELLE_EMAIL = "pagos@lumina.store";
export const ZELLE_NAME = "Lumina Store LLC";
const FREE_SHIPPING_THRESHOLD = 60;

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass-subtle rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm truncate">{value}</div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Copiar ${label}`}
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          toast.success(`${label} copiado`);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}

export function CartSheet() {
  const { items, total, count, add, setQty, remove, clear, cartOpen, setCartOpen } = useShop();
  const [step, setStep] = useState<"cart" | "zelle">("cart");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const discountPercent = appliedCoupon ? 0.1 : 0; // 10% DTO
  const discountAmount = total * discountPercent;
  const finalTotal = Math.max(0, total - discountAmount);

  const freeShippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  const reference = `LUM-${String(Math.abs(Math.round(finalTotal * 100)) % 10000).padStart(4, "0")}`;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = coupon.trim().toUpperCase();
    if (clean === "LUMINA10" || clean === "OFERTA10" || clean === "DESCUENTO10") {
      setAppliedCoupon(clean);
      toast.success(`¡Cupón ${clean} aplicado con éxito!`, {
        description: "Se ha aplicado un 10% de descuento en tu pedido.",
      });
      setCoupon("");
    } else {
      toast.error("Cupón no válido", {
        description: "Prueba a usar el código de bienvenida: LUMINA10",
      });
    }
  };

  const handleWhatsAppOrder = () => {
    const phone = "+34600000000"; // Lumina Store WhatsApp
    const itemsText = items
      .map((i) => `• ${i.qty}x *${i.name}* (${fmt(i.price * i.qty)})`)
      .join("\n");

    const text = `¡Hola! Me gustaría realizar un pedido en Lumina:

📦 *Detalle del Pedido:*
${itemsText}

${appliedCoupon ? `🏷️ *Descuento Aplicado (${appliedCoupon}):* -${fmt(discountAmount)}\n` : ""}💵 *Total Final:* ${fmt(finalTotal)}
📝 *Referencia:* ${reference}
🚚 *Envío:* ${total >= FREE_SHIPPING_THRESHOLD ? "¡GRATIS EXPRÉS!" : "Estándar"}

¿Cómo procedo con el pago y envío? ¡Gracias!`;

    const url = `https://wa.me/${phone.replace(/[^0-9+]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast.success("Abriendo WhatsApp...", {
      description: "Enviando el detalle de tu pedido.",
    });
  };

  return (
    <Sheet
      open={cartOpen}
      onOpenChange={(v) => {
        setCartOpen(v);
        if (!v) setStep("cart");
      }}
    >
      <SheetContent
        side="right"
        className="glass-strong border-white/60 w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">
              {step === "cart" ? "Tu Carrito de Compra" : "Pagar con Zelle"}
            </SheetTitle>
            {count > 0 && step === "cart" && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                {count} {count === 1 ? "artículo" : "artículos"}
              </span>
            )}
          </div>
          <SheetDescription>
            {step === "cart"
              ? "Revisa tus productos. Compras 100% protegidas y envíos garantizados."
              : "Realiza la transferencia y confirma tu pedido de forma segura."}
          </SheetDescription>
        </SheetHeader>

        {/* Free Shipping Meter Banner */}
        {step === "cart" && (
          <div className="mx-6 p-3 rounded-2xl bg-gradient-to-r from-accent/10 via-fuchsia-500/10 to-amber-500/10 border border-accent/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-foreground">
                <Truck className="w-4 h-4 text-accent" />
                {total >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ¡Conseguido! Envío GRATIS Exprès 🎉
                  </span>
                ) : (
                  <span>
                    Añade <strong className="text-accent">{fmt(remainingForFreeShipping)}</strong>{" "}
                    más para <strong className="underline">Envío GRATIS</strong>
                  </span>
                )}
              </span>
              <span className="text-[10px] text-muted-foreground font-bold">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent via-fuchsia-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3">
          {step === "cart" ? (
            items.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto opacity-30 text-accent" />
                <p className="text-sm font-medium">Tu carrito está vacío.</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Explora nuestro catálogo para añadir productos de tiendas verificadas con garantía
                  total.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((i) => (
                  <div
                    key={i.name}
                    className="glass-subtle rounded-2xl p-3 flex items-center gap-3 border border-white/40"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{i.name}</div>
                      <div className="text-xs text-muted-foreground">{fmt(i.price)} / unid.</div>
                      <div className="text-xs font-bold text-accent mt-0.5">
                        Subtotal: {fmt(i.price * i.qty)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Restar"
                        onClick={() => setQty(i.name, i.qty - 1)}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Sumar"
                        onClick={() => setQty(i.name, i.qty + 1)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Eliminar"
                        onClick={() => remove(i.name)}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* High-Conversion Cross-Sell Quick Add */}
                {!items.some((i) => i.name.includes("Cable USB-C")) && (
                  <div className="p-3 rounded-2xl glass border border-amber-500/30 bg-amber-500/5 flex items-center justify-between gap-2 mt-4">
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        Oferta de Complemento
                      </div>
                      <p className="font-bold text-xs truncate text-foreground">
                        Cable USB-C Carga Rápida 100W
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Por solo <strong className="text-accent">{fmt(7.99)}</strong>{" "}
                        <span className="line-through text-[10px]">{fmt(14.99)}</span>
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        add({ name: "Cable USB-C Carga Rápida 100W", price: 7.99 });
                        toast.success("¡Cable USB-C añadido con 45% DTO!");
                      }}
                      className="rounded-full text-xs h-8 px-3 bg-amber-500 text-white hover:bg-amber-600 shrink-0 font-bold cursor-pointer"
                    >
                      + Añadir {fmt(7.99)}
                    </Button>
                  </div>
                )}
              </div>
            )
          ) : (
            <ZelleCheckout
              total={finalTotal}
              reference={reference}
              onDone={() => {
                clear();
                setStep("cart");
                setCartOpen(false);
              }}
            />
          )}
        </div>

        {step === "cart" && items.length > 0 && (
          <div className="p-6 pt-3 border-t border-white/50 space-y-3 bg-white/20">
            {/* Promo Code Input Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Código cupón (ej: LUMINA10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="pl-8 text-xs h-9 rounded-xl bg-white/60 border-white/60 uppercase"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="h-9 rounded-xl text-xs font-semibold glass border-white/80 cursor-pointer"
              >
                Aplicar
              </Button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium">
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-emerald-500" />
                  Cupón <strong className="uppercase">{appliedCoupon}</strong> (-10%)
                </span>
                <button
                  onClick={() => {
                    setAppliedCoupon(null);
                    toast.info("Cupón eliminado");
                  }}
                  className="text-rose-500 hover:underline text-[10px] font-bold"
                >
                  Quitar
                </button>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{fmt(total)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Descuento (10%)</span>
                  <span>-{fmt(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>
                  {total >= FREE_SHIPPING_THRESHOLD ? (
                    <strong className="text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">
                      GRATIS
                    </strong>
                  ) : (
                    fmt(4.95)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between font-bold text-base pt-1 border-t border-white/40">
                <span>Total Final</span>
                <span className="text-lg text-accent">{fmt(finalTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <Button
                className="w-full rounded-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-glow animate-pulse-soft hover-glow-accent tracking-wide uppercase transition-all duration-300"
                disabled={items.length === 0}
                onClick={() => setStep("zelle")}
              >
                PEDIR AHORA • Pagar con Zelle <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Security Seals */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-1 border-t border-white/30">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Pago Seguro SSL
              </span>
              <span>•</span>
              <span>Garantía 30 Días</span>
              <span>•</span>
              <span>Envío 24-48h</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ZelleCheckout({
  total,
  reference,
  onDone,
}: {
  total: number;
  reference: string;
  onDone: () => void;
}) {
  const [sending, setSending] = useState(false);
  return (
    <form
      className="space-y-4 pb-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
          setSending(false);
          toast.success("¡Pago Zelle enviado a verificación!", {
            description: `Referencia ${reference}. Te confirmamos por email en minutos.`,
          });
          onDone();
        }, 900);
      }}
    >
      <div className="glass rounded-2xl p-4 text-center">
        <div className="text-xs text-muted-foreground">Monto a transferir</div>
        <div className="text-3xl font-black tracking-tight">{fmt(total)}</div>
      </div>

      <div className="space-y-2">
        <CopyField label="Correo Zelle" value={ZELLE_EMAIL} />
        <CopyField label="Beneficiario" value={ZELLE_NAME} />
        <CopyField label="Referencia (concepto)" value={reference} />
      </div>

      <ol className="text-xs text-muted-foreground space-y-1 list-decimal pl-4">
        <li>Abre tu app bancaria y entra a Zelle.</li>
        <li>Envía {fmt(total)} al correo indicado.</li>
        <li>Usa la referencia como concepto del pago.</li>
        <li>Confirma abajo con el número de tu transferencia.</li>
      </ol>

      <Separator className="bg-white/60" />

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="z-name">Nombre del titular</Label>
          <Input
            id="z-name"
            required
            placeholder="Como aparece en Zelle"
            className="rounded-xl bg-white/60 border-white/60"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="z-email">Email de contacto</Label>
          <Input
            id="z-email"
            type="email"
            required
            placeholder="tu@email.com"
            className="rounded-xl bg-white/60 border-white/60"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="z-conf">Número de confirmación Zelle</Label>
          <Input
            id="z-conf"
            required
            placeholder="Ej. 1234567890"
            className="rounded-xl bg-white/60 border-white/60"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={sending}
        className="w-full rounded-full h-12 bg-foreground text-background hover:bg-foreground/90"
      >
        {sending ? "Enviando…" : "Confirmar pago Zelle"}
      </Button>
    </form>
  );
}
