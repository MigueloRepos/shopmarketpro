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
  const { items, total, count, setQty, remove, clear, cartOpen, setCartOpen } = useShop();
  const [step, setStep] = useState<"cart" | "zelle">("cart");
  const reference = `LUM-${String(Math.abs(Math.round(total * 100)) % 10000).padStart(4, "0")}`;

  const handleWhatsAppOrder = () => {
    const phone = "+34600000000"; // Lumina Store WhatsApp
    const itemsText = items
      .map((i) => `• ${i.qty}x *${i.name}* (${fmt(i.price * i.qty)})`)
      .join("\n");

    const text = `¡Hola! Me gustaría realizar un pedido en Lumina:

📦 *Detalle del Pedido:*
${itemsText}

💵 *Total:* ${fmt(total)}
📝 *Referencia:* ${reference}

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
          <SheetTitle className="text-xl">
            {step === "cart" ? "Tu carrito" : "Pagar con Zelle"}
          </SheetTitle>
          <SheetDescription>
            {step === "cart"
              ? `${count} ${count === 1 ? "producto" : "productos"} · pago exclusivo vía Zelle`
              : "Realiza la transferencia y confirma tu pedido."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 space-y-3">
          {step === "cart" ? (
            items.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Tu carrito está vacío.</p>
              </div>
            ) : (
              items.map((i) => (
                <div key={i.name} className="glass-subtle rounded-2xl p-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{fmt(i.price)}</div>
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
              ))
            )
          ) : (
            <ZelleCheckout
              total={total}
              reference={reference}
              onDone={() => {
                clear();
                setStep("cart");
                setCartOpen(false);
              }}
            />
          )}
        </div>

        {step === "cart" && (
          <div className="p-6 pt-4 border-t border-white/50 space-y-3">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">{fmt(total)}</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                className="w-full rounded-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                disabled={items.length === 0}
                onClick={() => setStep("zelle")}
              >
                Pagar con Zelle <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full h-12 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-500/20 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                disabled={items.length === 0}
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                Pedir por WhatsApp
              </Button>
            </div>

            <p className="text-[11px] text-center text-muted-foreground">
              Selecciona tu método preferido para confirmar la compra.
            </p>
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
