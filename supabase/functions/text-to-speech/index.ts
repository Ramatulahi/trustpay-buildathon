import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const YARNGPT_API_URL = "https://yarngpt.ai/api/v1/tts";
const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language, voice } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (text.length > 2000) {
      return new Response(JSON.stringify({ error: "Text must be under 2000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const YARN_GPT_API_KEY = Deno.env.get("YARN_GPT_API_KEY");
    if (!YARN_GPT_API_KEY) {
      throw new Error("YARN_GPT_API_KEY is not configured");
    }
    console.log("YARN_GPT_API_KEY length:", YARN_GPT_API_KEY.length, "starts with:", YARN_GPT_API_KEY.substring(0, 8));

    let textToSpeak = text;

    // If language is not English, translate first using Lovable AI
    if (language && language !== "english") {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) {
        throw new Error("LOVABLE_API_KEY is not configured");
      }

      const langMap: Record<string, string> = {
        pidgin: "Nigerian Pidgin English",
        yoruba: "Yoruba",
        hausa: "Hausa",
      };

      const targetLang = langMap[language] || "English";

      const aiResponse = await fetch(AI_GATEWAY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "system",
              content: `You are a translator. Translate the following text to ${targetLang}. Return ONLY the translated text, nothing else. Keep it natural and conversational.`,
            },
            { role: "user", content: text },
          ],
        }),
      });

      if (!aiResponse.ok) {
        console.error("Translation failed:", aiResponse.status);
        // Fall back to original text if translation fails
      } else {
        const aiData = await aiResponse.json();
        const translated = aiData.choices?.[0]?.message?.content?.trim();
        if (translated) {
          textToSpeak = translated;
        }
      }
    }

    // Call YarnGPT TTS API
    const ttsResponse = await fetch(YARNGPT_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YARN_GPT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textToSpeak,
        voice: voice || "Idera",
        response_format: "mp3",
      }),
    });

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text();
      console.error("YarnGPT TTS error:", ttsResponse.status, errText);

      if (ttsResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "YarnGPT credits exhausted. Please top up your YarnGPT account." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (ttsResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate speech" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return audio as binary
    const audioBuffer = await ttsResponse.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBuffer.byteLength),
      },
    });
  } catch (e) {
    console.error("TTS error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
