import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useShop } from "@/lib/cart";
import { ZELLE_EMAIL, ZELLE_NAME } from "./CartSheet";
import {
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Info,
  CreditCard,
  Building2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-accent/40 transition-all duration-200">
      <div className="min-w-0">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          {label}
        </span>
        <span className="font-bold text-sm text-foreground truncate block">{value}</span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="h-8 w-8 rounded-lg hover:bg-accent/15 hover:text-accent cursor-pointer"
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

export function PaymentInstructionsModal() {
  const { paymentInstructionsOpen, setPaymentInstructionsOpen } = useShop();

  return (
    <Dialog open={paymentInstructionsOpen} onOpenChange={setPaymentInstructionsOpen}>
      <DialogContent className="glass-strong border-white/60 dark:border-white/10 w-full max-w-lg p-0 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 pb-4 bg-gradient-to-br from-accent/5 via-transparent to-transparent">
          <DialogHeader className="text-left space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
                Z
              </span>
              <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                Instrucciones de Pago
              </span>
            </div>
            <DialogTitle className="text-xl font-extrabold tracking-tight text-foreground">
              Cómo Pagar con Zelle
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Sigue estas sencillas instrucciones para completar tu transferencia bancaria de forma
              segura.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-2 space-y-4 max-h-[420px] overflow-y-auto">
          {/* US-Only Warning Alert */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-amber-600 dark:text-amber-400 block">
                Exclusivo para Estados Unidos (US-Only)
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Zelle es un servicio exclusivo de bancos de EE. UU. Para realizar el pago, debes
                contar con una cuenta bancaria en dólares (USD) afiliada a Zelle.
              </p>
            </div>
          </div>

          {/* Copyable Details */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block px-1">
              Datos del Destinatario
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <CopyRow label="Correo Zelle" value={ZELLE_EMAIL} />
              <CopyRow label="Beneficiario" value={ZELLE_NAME} />
            </div>
          </div>

          {/* Step-by-Step */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block px-1">
              Paso a Paso
            </span>
            <div className="relative border-l-2 border-black/5 dark:border-white/5 ml-3 pl-4 space-y-4 text-left">
              <div className="relative">
                <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center justify-center">
                  1
                </span>
                <span className="font-bold text-xs text-foreground block">
                  Abre tu app bancaria
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  Inicia sesión en tu banca en línea (Chase, Bank of America, Wells Fargo, Citi,
                  etc.) y navega a la sección de{" "}
                  <strong className="text-foreground">Send Money with Zelle</strong>.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center justify-center">
                  2
                </span>
                <span className="font-bold text-xs text-foreground block">
                  Registra el destinatario
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  Agrega un nuevo contacto usando nuestro correo verificado{" "}
                  <span className="font-mono text-foreground font-semibold underline">
                    {ZELLE_EMAIL}
                  </span>
                  . El beneficiario se mostrará como{" "}
                  <strong className="text-foreground">{ZELLE_NAME}</strong>.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center justify-center">
                  3
                </span>
                <span className="font-bold text-xs text-foreground block">Efectúa el pago</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  Ingresa el monto total de tu compra y escribe tu{" "}
                  <strong className="text-foreground">nombre o número de orden</strong> en la
                  descripción/referencia para agilizar la verificación de tu pedido.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-black flex items-center justify-center">
                  4
                </span>
                <span className="font-bold text-xs text-foreground block">Confirma tu pedido</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  Una vez enviado, regresa a tu carrito de compra, haz clic en Checkout y completa
                  el formulario de verificación Zelle con el código de confirmación.
                </p>
              </div>
            </div>
          </div>

          {/* Secure details */}
          <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-muted-foreground gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verificación automatizada en menos de 10 minutos.
            </span>
            <span className="font-bold text-accent">Lumina Store Verified</span>
          </div>
        </div>

        <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full text-xs font-semibold h-10 px-4 cursor-pointer"
            onClick={() => setPaymentInstructionsOpen(false)}
          >
            Entendido, cerrar
          </Button>
          <Button
            type="button"
            className="rounded-full text-xs font-bold h-10 px-4 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer shadow-glow flex items-center gap-1.5"
            onClick={() => {
              setPaymentInstructionsOpen(false);
              toast.info("Abre el carrito para completar tu orden.");
            }}
          >
            Ir al Carrito <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
