import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useShop } from "@/lib/cart";
import auraLogo from "@/assets/aura-assistant.png";
import { toast } from "sonner";

const SUGGESTIONS = [
  "Busco auriculares por menos de $150",
  "Regalo tecnológico para mi pareja",
  "¿Qué me recomiendas para trabajar en casa?",
  "¿Cómo pago con Zelle?",
];

export function ShoppingAssistant() {
  const { assistantOpen, setAssistantOpen } = useShop();
  const [input, setInput] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: () => toast.error("No pude responder ahora mismo. Inténtalo de nuevo."),
  });

  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    void sendMessage({ text: text.trim() });
    setInput("");
  };

  return (
    <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
      <SheetContent
        side="right"
        className="glass-strong border-white/60 w-full sm:max-w-md p-0 flex flex-col"
      >
        <SheetHeader className="p-5 pb-3 flex-row items-center gap-3 space-y-0">
          <img
            src={auraLogo}
            alt="Aura, asesora de compras Lumina"
            width={44}
            height={44}
            className="w-11 h-11 animate-float"
          />
          <div>
            <SheetTitle className="text-lg leading-tight">Aura · Asesora IA</SheetTitle>
            <SheetDescription className="text-xs">
              Te ayudo a elegir el producto ideal.
            </SheetDescription>
          </div>
        </SheetHeader>

        <Conversation className="flex-1 min-h-0">
          <ConversationContent className="px-4">
            {messages.length === 0 && (
              <div className="space-y-3 pt-4">
                <p className="text-sm text-muted-foreground">
                  Cuéntame qué buscas, tu presupuesto o para quién es, y te recomiendo lo mejor de
                  Lumina.
                </p>
                <div className="grid gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="glass-subtle rounded-2xl px-4 py-2.5 text-left text-sm hover:bg-white/70 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    <MessageResponse>{text}</MessageResponse>
                  </MessageContent>
                </Message>
              );
            })}

            {status === "submitted" && <Shimmer className="text-sm">Pensando…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="p-4 pt-0">
          <PromptInput
            onSubmit={(_, e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Ej. auriculares con cancelación de ruido…"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={busy || !input.trim()} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </SheetContent>
    </Sheet>
  );
}
