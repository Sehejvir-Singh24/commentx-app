let audioCtx = null;
let gainNode = null;
let currentVolume = 0.5;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = currentVolume;
    gainNode.connect(audioCtx.destination);
  }
}

export function setVolume(level) {
  currentVolume = level;
  if (gainNode) {
    gainNode.gain.value = level;
  }
}

export function duckOriginalAudio(videoEl, level) {
  if (!videoEl) return;
  if (videoEl.dataset.originalVolume === undefined) {
    videoEl.dataset.originalVolume = videoEl.volume;
  }
  videoEl.volume = level;
}

export function restoreOriginalAudio(videoEl) {
  if (!videoEl || videoEl.dataset.originalVolume === undefined) return;
  videoEl.volume = parseFloat(videoEl.dataset.originalVolume);
  delete videoEl.dataset.originalVolume;
}

let isSpeaking = false;

export async function speak(text, voiceId, proxyUrl, authToken, videoEl) {
  if (!text || isSpeaking) return;
  isSpeaking = true;

  return new Promise((resolve) => {
    // Cancel any lingering speech
    window.speechSynthesis.cancel();

    duckOriginalAudio(videoEl, 0.25);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = currentVolume;
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick the best available English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      restoreOriginalAudio(videoEl);
      isSpeaking = false;
      resolve();
    };
    utterance.onerror = () => {
      restoreOriginalAudio(videoEl);
      isSpeaking = false;
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}
