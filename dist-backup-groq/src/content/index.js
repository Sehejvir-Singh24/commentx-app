// CommentX — Main Orchestrator
// Ties everything together: detect video → capture frames → get commentary → speak

(function () {
  const CX = window.CommentX;

  let settings = {
    enabled: false,
    mode: 'sports',
    volume: 50,
    customPrompt: ''
  };

  let mainInterval = null;
  let currentVideo = null;
  let toolbarApi = null;
  let isProcessing = false;

  async function init() {
    // Load saved settings
    try {
      const saved = await new Promise(resolve => {
        chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, resolve);
      });
      if (saved) {
        settings = { ...settings, ...saved };
      }
    } catch (e) {
      console.log("CommentX: Could not load settings", e);
    }

    CX.setVolume(settings.volume / 100);

    // Wait for a video element to appear on the page
    const { videoEl, playerType } = await CX.detectVideo();
    currentVideo = videoEl;
    console.log(`CommentX: Found ${playerType} video`);

    // Inject the floating toolbar
    toolbarApi = CX.injectToolbar(
      videoEl,
      { mode: settings.mode, volume: settings.volume },
      (isActive) => {
        settings.enabled = isActive;
        chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { enabled: isActive } });
        if (isActive) startPipeline();
        else stopPipeline();
      },
      (mode) => {
        settings.mode = mode;
        chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { mode } });
      },
      (vol) => {
        settings.volume = vol;
        CX.setVolume(vol / 100);
        chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { volume: vol } });
      }
    );

    // Listen for settings changes from popup
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "SETTINGS_UPDATED") {
        settings = { ...settings, ...msg.settings };
        CX.setVolume(settings.volume / 100);
        if (settings.enabled && !mainInterval) startPipeline();
        else if (!settings.enabled && mainInterval) stopPipeline();
      }
    });

    if (settings.enabled) {
      startPipeline();
    }
  }

  function startPipeline() {
    if (mainInterval) return;
    toolbarApi.setStatus('active');

    mainInterval = setInterval(async () => {
      if (isProcessing) return;
      if (currentVideo.paused || currentVideo.ended) return;

      isProcessing = true;
      try {
        const base64Frame = CX.captureFrameAsBase64(currentVideo);
        if (!base64Frame) {
          isProcessing = false;
          return;
        }

        const commentary = await CX.generateCommentary({
          base64Frame,
          mode: settings.mode,
          customPrompt: settings.customPrompt
        });

        if (commentary) {
          toolbarApi.showCommentary(commentary);
          await CX.speak(commentary, currentVideo);
        }
      } catch (e) {
        console.error("CommentX pipeline error:", e);
        toolbarApi.setStatus('error');
      } finally {
        isProcessing = false;
      }
    }, 8000);
  }

  function stopPipeline() {
    if (mainInterval) {
      clearInterval(mainInterval);
      mainInterval = null;
    }
    toolbarApi.setStatus('off');
  }

  init();
})();
