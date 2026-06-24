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
      case "sports": systemPrompt = "You are a hyped-up sports commentator. You MUST write exactly 1 to 2 full sentences describing the specific action happening in the image."; break;
      case "gaming": systemPrompt = "You are a witty gaming streamer reacting to the screen. You MUST write exactly 1 full sentence reacting to the gameplay."; break;
      case "documentary": systemPrompt = "You are David Attenborough. You MUST narrate the visual scene in 1 calm, insightful sentence."; break;
      case "custom": systemPrompt = customPrompt || "You are a helpful AI commentator. Provide 1 full sentence."; break;
      default: systemPrompt = "You are an AI commentator. Write a full sentence.";
    }

    const contextStr = Array.isArray(context) ? context.join(" | ") : "";

    const detectionDesc = (detections && detections.length > 0)
      ? `Hint: The AI object detector found these objects in the frame: ${detections.map(d => d.label).join(", ")}.`
      : "";

    const userPrompt = `${systemPrompt}\n\n${detectionDesc}\n\nBased on the detected objects, write an engaging, natural commentary line (between 5 and 20 words). DO NOT just output a single word. DO NOT repeat these previous lines: [${contextStr}]\n\nCommentary:`;

    const payload = {
      model: "llama-3.3-70b-versatile",
      temperature: 1.1,
      max_tokens: 60,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ commentary: `Groq Error: ${response.status} - ${errorText.substring(0, 50)}...` }), {
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const result = await response.json();
    const commentaryText = result?.choices?.[0]?.message?.content || "";

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
