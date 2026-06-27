# OBS Studio Integration Plan (Gemini API Free Tier)

This plan outlines how to integrate CommentX with OBS using the **Gemini API (Free Tier)** instead of Groq. 

Using Gemini brings a major structural advantage: **Gemini is natively Multimodal (it accepts images directly)**. This means we can completely bypass the local YOLOv8 ONNX model, drastically reducing CPU/GPU overhead on the streamer's computer.

## User Review Required

> [!IMPORTANT]
> By switching to Gemini:
> 1. **Zero-Weight Client:** We no longer need to load a 25MB object detection model on the client. Gemini will analyze the video frames directly.
> 2. **Free Tier Limits:** The Gemini Free Tier allows **15 Requests Per Minute (RPM)**.
>    - At our current interval of 8 seconds per commentary, we make **7.5 requests per minute**, which fits comfortably within the free tier limit.

### Proposed Architecture: Native Desktop Helper + Web Overlay
1. **Desktop Helper (Backend - Node.js/Python):**
   - Runs locally in the background.
   - Captures frames from the screen/OBS window.
   - Communicates with OBS WebSockets to monitor stream status (pausing commentary when stream is paused or streamer is muted).
   - Sends frames directly to the Gemini API using your free API key.
2. **OBS Browser Source (Frontend Overlay):**
   - Displays the commentary text on screen.
   - Plays the TTS audio.

---

## Open Questions

> [!WARNING]
> 1. **Direct API calls vs. Proxy worker:** For a local desktop app, we can either call Gemini's API directly from the desktop helper (secure, since the API key stays local on the streamer's PC) or route it through a Cloudflare proxy. Calling it directly is simpler and faster for development.
> 2. **TTS Choice:** For a fully free tier/low-cost setup, we can use the **native Web Speech API** (free, built into the browser source) instead of ElevenLabs, which can get expensive.

---

## Proposed Changes

### [Proxy / Backend App]

#### [NEW] [desktop_helper.js](file:///d:/projects/commentx-app/src/desktop_helper.js)
A lightweight Node.js script that:
- Captures active screen frames using a library like `screenshot-desktop`.
- Calls `@google/genai` (Gemini SDK) with the captured image and the system prompt.
- Sends the resulting text to the overlay via a local WebSocket.

#### [NEW] [overlay.html](file:///d:/projects/commentx-app/src/obs/overlay.html)
The page loaded by OBS as a Browser Source. It connects to the local WebSocket, displays subtitles, and speaks them using the browser's native SpeechSynthesis.

---

## Verification Plan

### Manual Verification
1. Run the local `desktop_helper.js` script.
2. Add `overlay.html` as a Browser Source in OBS.
3. Verify that the helper captures frames, Gemini generates commentary, and the overlay reads it aloud.
