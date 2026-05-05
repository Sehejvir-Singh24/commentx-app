// proxy/worker.js
export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${env.AUTH_TOKEN}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      });
    }

    if (request.method === "POST" && url.pathname === "/api/commentary") {
      return handleCommentary(request, env, corsHeaders);
    }
    
    if (request.method === "POST" && url.pathname === "/api/tts") {
      return handleTTS(request, env, corsHeaders);
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
};

async function handleCommentary(request, env, corsHeaders) {
  try {
    const body = await request.json();
    const { frame, detections, context, mode, customPrompt } = body;

    let systemPrompt = "";
    switch(mode) {
      case "sports": systemPrompt = "You are an energetic sports commentator. Describe what you see in the provided image in 1-2 punchy sentences. Never repeat what you said before."; break;
      case "gaming": systemPrompt = "You are a witty gaming streamer. React to what's on screen in 1 sentence. Keep energy high."; break;
      case "documentary": systemPrompt = "You are David Attenborough. Narrate what you observe in the image in 1 calm, insightful sentence."; break;
      case "custom": systemPrompt = customPrompt || "You are a helpful AI commentator."; break;
      default: systemPrompt = "You are an AI commentator.";
    }

    const contextStr = Array.isArray(context) ? context.join(" | ") : "";
    systemPrompt += `\nPrevious commentary (do not repeat these): [${contextStr}]`;

    let detectionsText = "";
    if (detections && detections.length > 0) {
      const labels = detections.map(d => d.label).join(", ");
      detectionsText = `\nDetected objects in frame: ${labels}`;
    }

    const detectionDesc = (detections && detections.length > 0)
      ? `Objects visible: ${detections.map(d => d.label).join(", ")}.`
      : "No specific objects detected.";

    const userPrompt = `You are watching a ${mode} video. ${detectionDesc}\n\nPrevious commentary (do not repeat): [${contextStr}]\n\nGive ONE short, punchy, natural commentary line (max 20 words) describing the action in the image. Be specific and energetic. Do not say 'I' or explain yourself.`;

    const geminiKey = env.GEMINI_API_KEY || "AIzaSyCwxdjn3cDaTyKrHRrieDf1OPz_u3fzUl4";
    const parts = [
      { text: systemPrompt + "\n\n" + userPrompt }
    ];

    if (frame) {
      parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: frame
        }
      });
    }

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: parts
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 60
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: "Gemini API error", details: errorText }), {
        status: response.status, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const geminiResult = await response.json();
    const commentaryText = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(JSON.stringify({ commentary: commentaryText.trim() }), {
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}

async function handleTTS(request, env, corsHeaders) {
  try {
    const { text, voiceId } = await request.json();
    const voice = voiceId || "21m00Tcm4TlvDq8ikWAM";

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "xi-api-key": env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text, model_id: "eleven_turbo_v2_5", voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: "ElevenLabs API error", details: err }), { status: response.status, headers: corsHeaders });
    }

    return new Response(response.body, { headers: { "Content-Type": "audio/mpeg", ...corsHeaders } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}
