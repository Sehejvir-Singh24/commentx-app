# CommentX — Mistakes & Resolutions

Building CommentX involved significant experimentation. This document serves as a historical record of architectural missteps, performance bottlenecks, and the solutions implemented to resolve them. 

By understanding what *didn't* work, we can avoid repeating past mistakes.

---

## 1. The Heavyweight V1 Architecture
**The Mistake:** 
The original version of CommentX relied on a complex Node.js/Vite build system and utilized an embedded on-device Object Detection model (YOLOv8 via ONNX Runtime Web). The extension would run object detection locally, extract bounding boxes (e.g., "person", "car"), and send those text labels to an LLM to generate commentary.
- The extension size ballooned to **over 130MB** due to the bundled ONNX models.
- It caused massive CPU/GPU spikes on the user's machine.
- LLMs struggled to provide engaging commentary purely from bounding box text (e.g., knowing there is a "person" doesn't tell the AI what the person is doing).

**The Resolution:** 
We scrapped V1 entirely and rebuilt the app using a **V2 Pure-JS Architecture**. 
- We removed local Object Detection entirely.
- We switched to utilizing Cloud Vision LLMs (Groq's Llama 4 Scout Vision / Google's Gemini Flash).
- We now compress the raw video frame to a Base64 string and send it directly to the Vision AI. The AI sees the *actual* image context, leading to vastly superior commentary.
- **Result:** Extension size dropped from ~130MB to **~36KB**.

---

## 2. The Local LLM (Ollama) Experiment
**The Mistake:** 
In an attempt to make the extension 100% free and offline, we integrated local LLM support via Ollama, using the `moondream` vision model (1.7B parameters).
- While technically successful, the small local model was too weak. It struggled to follow complex system prompts and persona instructions (like acting like a sarcastic streamer). 
- It also suffered from slow generation times on average consumer hardware.

**The Resolution:** 
We reverted to cloud-based APIs (Groq and Gemini). The intelligence, speed, and instruction-following capabilities of cloud models are strictly required to maintain the high-quality entertainment value of the personas.

---

## 3. The "Action Hallucination" Problem
**The Mistake:** 
Initially, the LLMs were given high `temperature` settings (1.0) and instructed to be "highly energetic and hyped up." When a video scene was static or slow (e.g., a player holding an angle for 10 seconds), the AI would invent imaginary action (hallucinate kills, explosions, etc.) just to fulfill the prompt's requirement for "hype."

**The Resolution:** 
1. Dropped the API generation `temperature` from `1.0` down to `0.3` to force stricter factual interpretation of the frame.
2. Injected strict prompt rules: *"CRITICAL RULES: ONLY describe what is visibly happening... DO NOT invent or assume actions."*
3. Added specific instructions on what to do during downtime: *"If it's a quiet moment, build tension or comment on positioning."*

---

## 4. The Speed vs. Stability Tuning (The Interval Wars)
Finding the right frequency to capture frames and generate commentary required multiple iterations.

### Attempt 1: The 8-Second Timer
- **The Issue:** We initially set the pipeline to capture a frame every 8 seconds (`8000ms`). For slow videos (like nature documentaries), this was fine. But for fast-paced games like Valorant, 8 seconds felt like an eternity. The commentary was entirely disconnected from the real-time action on screen.

### Attempt 2: The 2-Second Timer
- **The Issue:** To fix the delay, we dropped the interval down to `2000ms`. This caused severe cascading failures:
  1. **TTS Stacking:** The `ttsPlayer` was set to `await` the speech to finish before capturing the next frame. Because speaking a sentence takes longer than 2 seconds, the pipeline jammed.
  2. **API Limits:** Firing requests every 2 seconds (~30 requests/min) aggressively chewed through API rate limits and free-tier credits.

### The Final Resolution: The 5-Second Balance
We implemented a multi-pronged fix to stabilize the pipeline:
1. **Fire-and-Forget TTS:** We removed the `await` from the TTS call. The pipeline no longer waits for speech to finish before processing the next frame.
2. **Increased Speech Rate:** We boosted the browser's Text-to-Speech rate to `1.35x`. This ensures the AI finishes talking faster, clearing the audio queue.
3. **Shorter Prompts:** We explicitly told the LLM to output "1 SHORT sentence (15-30 words max)". Shorter output means faster API response times and faster TTS playback.
4. **The 5-Second Compromise:** We settled on a `5000ms` interval loop. This keeps the commentary snappy enough for gaming, but limits API requests to a very manageable ~12 per minute, conserving credits and keeping the system stable.
