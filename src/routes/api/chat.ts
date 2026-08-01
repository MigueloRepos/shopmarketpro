import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { catalogSummary } from "@/lib/catalog";

type ChatRequestBody = { messages?: unknown };

const SYSTEM = `Eres "Aura", la asesora de compras de LUMINA, una tienda premium de tecnología, audio, hogar, accesorios, deporte y belleza.

Objetivo: ayudar al cliente a elegir el producto ideal con preguntas breves (presupuesto, uso, preferencias) y recomendar 1-3 productos del catálogo con su precio y una razón corta.

Reglas:
- Responde siempre en español, cálida, concisa y con formato markdown (listas cortas, negritas en nombres de producto).
- Recomienda SOLO productos del catálogo siguiente. Si nada encaja, dilo y sugiere lo más cercano.
- El único método de pago disponible es Zelle; explícalo si preguntan por pagos.
- Envíos en 24-48h, garantía hasta 2 años, soporte 24/7.

Catálogo:
${catalogSummary}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response("Missing API Key (GEMINI_API_KEY or LOVABLE_API_KEY)", {
            status: 500,
          });
        }

        // Initialize google provider with the apiKey
        const googleProvider = google({ apiKey });

        const result = streamText({
          model: googleProvider("gemini-2.5-flash"),
          system: SYSTEM,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
