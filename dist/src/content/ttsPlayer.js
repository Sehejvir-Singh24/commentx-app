// CommentX — TTS Player
// Uses browser's built-in SpeechSynthesis API for free, instant text-to-speech

(function () {
  window.CommentX = window.CommentX || {};

  let currentVolume = 0.5;
  let isSpeaking = false;

  window.CommentX.setVolume = function (level) {
    currentVolume = level;
  };

  function duckOriginalAudio(videoEl, level) {
    if (!videoEl) return;
    if (videoEl.dataset.commentxOrigVol === undefined) {
      videoEl.dataset.commentxOrigVol = videoEl.volume;
    }
    videoEl.volume = level;
  }

  function restoreOriginalAudio(videoEl) {
    if (!videoEl || videoEl.dataset.commentxOrigVol === undefined) return;
    videoEl.volume = parseFloat(videoEl.dataset.commentxOrigVol);
    delete videoEl.dataset.commentxOrigVol;
  }

  window.CommentX.speak = function (text, videoEl) {
    if (!text || isSpeaking) return Promise.resolve();
    isSpeaking = true;

    return new Promise((resolve) => {
      window.speechSynthesis.cancel();
      duckOriginalAudio(videoEl, 0.25);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = currentVolume;
      utterance.rate = 1.35;
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
  };
})();
