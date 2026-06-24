# CommentX — Complete Feature & Development Documentation

> [!IMPORTANT]
> This document serves as the central record for all features, architecture, and development context for the CommentX Chrome Extension. Per your request, any future changes or new features will be logged here with full context.

## 🏗️ Architecture: V1 vs V2 Rebuild

The original extension (V1) relied on a bulky Node.js/Vite build system and an internal Object Detection model (YOLO via ONNX Runtime), making the extension over 130MB in size. 

**V2 Rebuild (Current):** We completely rebuilt the extension into a lightweight, pure JavaScript architecture.
- **No Bundler:** Removed `vite`, `npm`, and `node_modules`. All files are plain JS.
- **Zero-weight Vision:** Removed the 25MB ONNX Runtime and YOLO models. We now rely entirely on **Groq Cloud's Llama 4 Scout Vision model** to analyze the raw video frames directly.
- **Size Reduction:** The extension went from ~130MB down to **~36KB**, making it lightning fast and simple to maintain.

---

## 🌟 Core Features

### 1. Direct-to-Cloud Vision Pipeline
Instead of detecting objects locally, the extension extracts a frame from the `<video>` element, converts it to base64, and sends it directly to Groq. This provides a rich, contextual understanding of the scene rather than just bounding boxes around objects.

### 2. Live Floating Toolbar UI
- **Glassmorphism Design:** A premium, dark-themed floating toolbar injected directly into the host page (e.g., YouTube).
- **Shadow DOM Isolation:** The toolbar's CSS is completely protected from the host website's styles, ensuring it always looks perfect.
- **Live Controls:** Users can toggle the commentary ON/OFF, switch personas (modes), and adjust the text-to-speech volume directly from the video page without opening the Chrome popup.

### 3. Real-Time Text-to-Speech (TTS)
- Uses the browser's native `SpeechSynthesis` API to read the generated commentary aloud in real-time.
- Automatically handles rapid queueing to ensure the audio matches the pace of the visual action.

---

## 🎙️ Commentary Modes (Prompt Engineering)

The intelligence of CommentX comes from strict "System Prompts" that dictate the persona the AI adopts.

### 🏟️ Sports Commentator
> *"You are a hyped-up sports commentator providing real-time play-by-play..."*
Used for athletic events; generates dramatic, energetic sentences.

### 🎮 Gaming Streamer
> *"You are a witty, popular gaming streamer reacting live to gameplay..."*
Used for casual gaming; uses gaming slang and reacts emotionally to on-screen events.

### 🎬 Documentary Narrator
> *"You are Sir David Attenborough narrating a nature documentary..."*
Used for slow-paced videos; calm, insightful, and beautifully worded.

### 🔫 Valorant Esports (New)
> *"You are a hyped-up, high-energy professional Valorant esports caster..."*
**Context:** Added specifically for professional gaming casting. It is trained to look for UI elements (minimap, kill feed) and use authentic terminology (Spike, entry, OP, eco, Jett).

---

## 🛠️ Development History & Key Decisions

### Experiment: Local LLM via Ollama
- **Context:** We briefly integrated local, offline AI support using Ollama and the `moondream` model to remove API costs and run entirely locally.
- **Result:** While it successfully worked locally, the `moondream` model (1.7B parameters) was too small to follow complex persona instructions. The user opted to revert back to Groq Cloud for superior intelligence and speed.

### Fix: Anti-Hallucination Grounding
- **Context:** Groq was occasionally inventing action (e.g., imaginary kills) when a scene was static, due to the prompt forcing it to be "energetic" with a high `temperature` setting.
- **Solution:** 
  1. Dropped the generation `temperature` from `1.0` to `0.3` to force strict factual interpretation.
  2. Injected strict rules: *"CRITICAL RULES: ONLY describe what is visibly happening... DO NOT invent or assume actions..."*
- **Result:** The commentary became hyper-grounded in visual reality.

---

## 📝 Future Development Protocol

As requested, any future modifications to CommentX will follow this protocol:
1. The codebase will be updated.
2. A new section or sub-document will be created in this markdown file detailing the *what*, the *why*, and the *how* of the change.
3. You will be notified of the exact technical context of the update.
