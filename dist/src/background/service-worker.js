// CommentX Background Service Worker
// Handles settings storage and API calls to Groq

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // ── Settings: Read ──
  if (request.type === "GET_SETTINGS") {
    chrome.storage.sync.get([
      'enabled', 'mode', 'customPrompt', 'volume',
      'groqApiKey', 'elevenLabsApiKey', 'modelName',
      'aiProvider', 'geminiApiKey'
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
  const settings = await chrome.storage.sync.get(['groqApiKey', 'modelName', 'aiProvider', 'geminiApiKey']);
  const aiProvider = settings.aiProvider || 'groq';
  const groqApiKey = settings.groqApiKey;
  const geminiApiKey = settings.geminiApiKey;
  const model = settings.modelName || 'meta-llama/llama-4-scout-17b-16e-instruct';

  if (aiProvider === 'groq' && !groqApiKey) {
    return { error: "No Groq API key configured. Open CommentX popup to add it." };
  }
  if (aiProvider === 'gemini' && !geminiApiKey) {
    return { error: "No Gemini API key configured. Open CommentX popup to add it." };
  }

  // Build system prompt based on mode
  let systemPrompt = "";
  switch (mode) {
    case "valorant":
      systemPrompt = `You are Volt, a hilarious, sarcastic, high-energy Valorant streamer. Your job is to ENTERTAIN, not just describe gameplay.

PERSONALITY: Extremely witty, naturally funny, dry sarcasm, quick comebacks, confident, experienced Valorant player. Never sound robotic or like a professional esports caster.

HUMOR STYLE: Deadpan humor, self-deprecating jokes, irony, hyperbole, fake confidence, streamer banter.
- Bad play: "Bro just donated his Vandal to charity." / "Aim.exe is currently updating." / "That spray pattern looked like modern art."
- Missed shot: "That arrow is currently applying for a pilot's license." / "The crosshair was sightseeing."
- Spike plant: "The spicy beep-beep machine has officially been activated."
- Good play: "WHO GAVE HIM PERMISSION?" / "That's cleaner than my browser history."

NEVER simply narrate. Instead of "Jett got two kills" say "Jett just remembered she downloaded aim from the premium version."

ENERGY RULES:
- Slow moments: Funny observations, light roasting, predictions, chat jokes. Never let it be boring.
- Fights: Short excited bursts. "WAIT." "HE'S COOKING." "ONE. TWO." "NOOOOO."
- Clutches: Build tension. "Everyone stop breathing." "This is either legendary... or incredibly embarrassing."

INTERACT WITH CHAT: "Chat... explain that one." / "Clip it." / "Type W." / "Spam F." / "I'm pretending I predicted that."

USE GAMING MEMES naturally (don't overuse): Aim.exe, built different, absolute cinema, skill issue, NPC behavior, lore accurate, peak gameplay, paid actor, controller diff, duelist moment.

ROAST bad plays playfully (bad aim, whiffs, weird utility, funny mistakes). NEVER attack race, gender, disabilities, appearance, or identity.

Use contractions (I'm, he's, we've, that's). Keep sentences conversational and short. Don't repeat jokes. Don't over-explain. Don't constantly scream.`;
      break;
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

  const userPrompt = `Analyze this video frame carefully. Provide exciting real-time commentary in 1 SHORT sentence (15-30 words max). Be specific about what you see — mention player names if visible, game elements, scores, actions, movements. CRITICAL RULES:
1. ONLY describe what is ACTUALLY visible on the screen right now — be precise.
2. DO NOT invent or hallucinate actions, players, or events that are not clearly pictured.
3. If it's a quiet moment, build tension or comment on positioning/strategy briefly.
4. DO NOT repeat or paraphrase these previous lines: [${contextStr}]`;

  if (aiProvider === 'gemini') {
    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          parts: [
            { text: userPrompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Frame
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300
      }
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: `Gemini API error ${response.status}: ${errorText.substring(0, 100)}` };
      }

      const result = await response.json();
      const commentary = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return { commentary: commentary.trim() };

    } catch (error) {
      return { error: `Network error: ${error.message}` };
    }
  } else {
    // Groq logic
    const payload = {
      model: model,
      temperature: 0.3,
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
          "Authorization": `Bearer ${groqApiKey}`,
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
}
