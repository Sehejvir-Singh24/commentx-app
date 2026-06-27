# CommentX Codebase Explanation

This document serves as the definitive, comprehensive guide to the CommentX codebase. It breaks down the architecture, the directory structure, and explains how every single file works together to provide real-time AI commentary on videos.

> **Note:** The extension currently uses a **V2 Pure-JS Architecture**. Previous iterations relied on a heavy Node.js/Vite build process and local YOLO object detection. The active codebase is entirely contained within the `dist/` directory.

## Architecture Overview

CommentX is a lightweight Chrome Extension. It operates by injecting content scripts into web pages that contain `<video>` elements (like YouTube or Twitch). 

1. **Content Scripts:** Extract frames directly from the HTML5 `<video>` element, compress them into Base64 JPEGs, and manage the floating UI and Text-to-Speech (TTS) playback.
2. **Background Service Worker:** Acts as the secure bridge. It receives the frames from the content script and sends them directly to a Multimodal Vision LLM (Groq Cloud or Gemini API).
3. **The LLM:** Analyzes the raw visual data alongside a highly-specific System Prompt (persona) and returns a funny, contextual line of commentary.

---

## Directory Structure

Everything that powers the extension lives in the `dist/` directory.

```text
dist/
├── manifest.json              # Chrome Extension Configuration
└── src/
    ├── background/
    │   └── service-worker.js  # API routing and state management
    ├── content/
    │   ├── index.js           # Main Orchestrator
    │   ├── commentaryEngine.js# Messaging bridge to background
    │   ├── frameCapture.js    # Canvas-based image extraction
    │   ├── toolbar.js         # Shadow DOM UI Overlay
    │   ├── ttsPlayer.js       # Native SpeechSynthesis API handler
    │   └── videoDetector.js   # Locates the active <video> tag
    └── popup/
        ├── popup.html         # Extension popup UI
        └── popup.js           # Settings management logic
```

---

## 1. Content Scripts (`dist/src/content/`)

These scripts are injected directly into the active webpage.

### `index.js` (The Orchestrator)
This is the heart of the extension. It ties all the other modules together.
- **Initialization:** Fetches saved settings (mode, volume, API keys) from the background script.
- **Video Detection:** Uses `videoDetector.js` to find the active player.
- **UI Injection:** Injects the floating toolbar via `toolbar.js`.
- **The Pipeline Loop:** Runs a continuous `setInterval` (currently set to 5000ms / 5 seconds). Every 5 seconds, if the video is playing:
  1. Captures a Base64 frame (`frameCapture.js`).
  2. Asks for commentary via `commentaryEngine.js`.
  3. Displays the returned text on the UI.
  4. Triggers the TTS audio (`ttsPlayer.js`) in a non-blocking, fire-and-forget manner so the next frame capture isn't delayed.

### `frameCapture.js` (The Eyes)
Handles extracting visual data efficiently.
- Creates an invisible, offscreen HTML `<canvas>`.
- `captureFrameAsBase64()`: Draws the current video frame onto the canvas. To save bandwidth and speed up API calls, it caps the resolution to a maximum of 320x180 and exports it as a low-quality (0.4) JPEG Base64 string.

### `commentaryEngine.js` (The Messenger)
Acts as a simple bridge between the content script and the background worker.
- `generateCommentary()`: Takes the Base64 frame and current mode, and sends a `chrome.runtime.sendMessage({ type: "GENERATE_COMMENTARY" })` to the background script.
- It also maintains a rolling `contextBuffer` of the last 10 sentences to prevent the AI from repeating itself.

### `toolbar.js` (The User Interface)
The UI injected into the host page (e.g., YouTube).
- Uses a **Shadow DOM**. This is critical because it isolates the toolbar's CSS, preventing the host website's styles from breaking our layout, and vice versa.
- Creates a floating, glassmorphism-styled toolbar with controls for Mode, Volume, and Power.
- Includes a subtitle box (`.commentary-box`) that displays the generated text for 5 seconds before fading out.
- Includes a "Restore Pill" (CX ▸) so the user can hide the main toolbar but easily bring it back.

### `ttsPlayer.js` (The Voice)
Handles Text-to-Speech without relying on paid APIs.
- Uses the browser's native `window.speechSynthesis` API.
- **Audio Ducking:** When it speaks, it dynamically lowers the `<video>` element's volume to 0.25, and restores it when the speech finishes.
- **Speed:** Set to a `1.35x` rate so the spoken audio keeps pace with the fast 5-second interval pipeline.

### `videoDetector.js` (The Scout)
A lightweight utility that scans the DOM for `<video>` tags and returns the largest, active one.

---

## 2. Background Script (`dist/src/background/service-worker.js`)

The Service Worker runs securely in the background. It handles two main jobs:

1. **State Management:** Listens for `GET_SETTINGS` and `SAVE_SETTINGS` messages, persisting user API keys, volume, and modes via `chrome.storage.sync`.
2. **LLM API Routing:** Listens for `GENERATE_COMMENTARY`.
   - Reads the user's configured API Key (Groq or Gemini).
   - Constructs the **System Prompt** based on the selected mode. (e.g., The "Volt" persona for Valorant, instructing the LLM to be a sarcastic, high-energy streamer).
   - Formats the request for either the Groq API (using `llama-4-scout-17b-16e-instruct`) or the Gemini API (using `gemini-2.5-flash`).
   - Injects the Base64 image and the strict instructions ("1 SHORT sentence", "DO NOT hallucinate").
   - Returns the generated text back to the content script.

---

## 3. Popup UI (`dist/src/popup/`)

The UI that appears when you click the CommentX extension icon in the Chrome toolbar.
- **`popup.html` / `popup.js`**: A settings menu allowing the user to input their Groq/Gemini API keys, select their preferred AI provider, and set default modes. It communicates directly with the Service Worker to save these settings.

---

## Summary of the Data Flow

1. You click "ON" in the toolbar on a YouTube video.
2. `index.js` starts a 5-second loop.
3. `frameCapture.js` copies the video frame to a tiny canvas and turns it into a Base64 JPEG string.
4. `commentaryEngine.js` sends this string to `service-worker.js`.
5. `service-worker.js` builds a prompt (e.g., the Volt streamer persona) and sends it + the image to the Groq/Gemini API.
6. The AI looks at the image, reads the persona rules, and replies with a witty sentence.
7. `service-worker.js` sends the sentence back to `index.js`.
8. `index.js` tells `toolbar.js` to show the text on screen.
9. `index.js` tells `ttsPlayer.js` to speak the text out loud (speed 1.35x).
10. Loop repeats 5 seconds later.
