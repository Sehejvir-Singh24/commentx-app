// CommentX Background Service Worker
// Handles settings storage and API calls to Groq

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // ── Settings: Read ──
  if (request.type === "GET_SETTINGS") {
    chrome.storage.sync.get([
      'enabled', 'mode', 'customPrompt', 'volume',
      'groqApiKey', 'elevenLabsApiKey', 'modelName'
    ], (result) => {
      sendResponse(result);
    });
    return true;
  }

  // ── Settings: Write ──
  if (request.type === "SAVE_SETTINGS") {
    chrome.storage.sync.set(request.settings, () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, {
            type: "SETTINGS_UPDATED",
            settings: request.settings
          }).catch(() => {});
        });
      });
      sendResponse({ success: true });
    });
    return true;
  }

  // ── Generate Commentary via Groq Vision API ──
  if (request.type === "GENERATE_COMMENTARY") {
    handleCommentary(request)
      .then(result => sendResponse(result))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  // ── Ping ──
  if (request.type === "PING") {
    sendResponse({ alive: true });
  }
});

async function handleCommentary({ base64Frame, mode, customPrompt, context }) {
  // Read API key from storage
  const settings = await chrome.storage.sync.get(['groqApiKey', 'modelName']);
  const apiKey = settings.groqApiKey;
  const model = settings.modelName || 'meta-llama/llama-4-scout-17b-16e-instruct';

  if (!apiKey) {
    return { error: "No Groq API key configured. Open CommentX popup to add it." };
  }

  // Build system prompt based on mode
  let systemPrompt = "";
  switch (mode) {
    case "sports":
      systemPrompt = "You are a hyped-up sports commentator providing real-time play-by-play. Write exactly 1-2 punchy sentences describing the specific action visible in this frame. Be energetic, dramatic, and engaging.";
      break;
    case "gaming":
      systemPrompt = "You are a witty, popular gaming streamer reacting live to gameplay. Write exactly 1 sentence reacting to what you see on screen. Be funny, use gaming slang, and keep it real.";
      break;
    case "documentary":
      systemPrompt = "You are Sir David Attenborough narrating a nature documentary. Write exactly 1 calm, insightful, beautifully worded sentence about what you observe in this frame.";
      break;
    case "custom":
      systemPrompt = customPrompt || "You are a helpful AI commentator. Provide 1 full, engaging sentence about what you see.";
      break;
    default:
      systemPrompt = "You are an entertaining AI commentator. Write 1 engaging sentence about what you see.";
  }

  const contextStr = Array.isArray(context) ? context.join(" | ") : "";

  const userPrompt = `Look at this video frame and provide real-time commentary. Write a single engaging line (5-20 words). Be specific about what you SEE — don't be generic. DO NOT repeat these previous lines: [${contextStr}]`;

  // Build Groq API request with vision
  const payload = {
    model: model,
    temperature: 1.0,
    max_tokens: 80,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Frame}`
            }
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { error: `Groq API error ${response.status}: ${errorText.substring(0, 100)}` };
    }

    const result = await response.json();
    const commentary = result?.choices?.[0]?.message?.content || "";
    return { commentary: commentary.trim() };

  } catch (error) {
    return { error: `Network error: ${error.message}` };
  }
}
