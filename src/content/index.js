import { detectVideo } from './videoDetector.js';
import { captureFrame, captureFrameAsBase64 } from './frameCapture.js';
import { injectToolbar } from './toolbar.js';
import { loadYolo, detect } from './yolo.js';
import { generateCommentary } from './commentaryEngine.js';
import { speak, setVolume } from './ttsPlayer.js';

let extensionSettings = {
  enabled: false,
  mode: 'sports',
  volume: 50,
  proxyUrl: '',
  authToken: '',
  customPrompt: '',
  voiceId: '21m00Tcm4TlvDq8ikWAM'
};

let mainInterval = null;
let currentVideo = null;
let toolbarApi = null;
let isProcessing = false;

async function init() {
  const settings = await new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, resolve);
  });
  if (settings) {
    extensionSettings = { ...extensionSettings, ...settings };
  }

  setVolume(extensionSettings.volume / 100);

  const { videoEl, playerType } = await detectVideo();
  currentVideo = videoEl;
  console.log(`CommentX: Found ${playerType} video`);

  loadYolo().catch(e => console.log("CommentX YOLO load error:", e));

  toolbarApi = injectToolbar(
    videoEl, 
    { mode: extensionSettings.mode, volume: extensionSettings.volume },
    (isActive) => {
      extensionSettings.enabled = isActive;
      chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { enabled: isActive }});
      if (isActive) {
        startPipeline();
      } else {
        stopPipeline();
      }
    },
    (mode) => {
      extensionSettings.mode = mode;
      chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { mode }});
    },
    (vol) => {
      extensionSettings.volume = vol;
      setVolume(vol / 100);
      chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: { volume: vol }});
    }
  );

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "SETTINGS_UPDATED") {
      extensionSettings = { ...extensionSettings, ...msg.settings };
      setVolume(extensionSettings.volume / 100);
      if (extensionSettings.enabled && !mainInterval) startPipeline();
      else if (!extensionSettings.enabled && mainInterval) stopPipeline();
    }
  });

  if (extensionSettings.enabled) {
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
      const base64Frame = captureFrameAsBase64(currentVideo);
      const rawFrame = captureFrame(currentVideo);
      
      let detections = [];
      if (rawFrame) {
        detections = await detect(rawFrame);
      }

      if (!base64Frame) {
        isProcessing = false;
        return;
      }

      const commentary = await generateCommentary({
        base64Frame,
        detections,
        mode: extensionSettings.mode,
        customPrompt: extensionSettings.customPrompt,
        proxyUrl: extensionSettings.proxyUrl,
        authToken: extensionSettings.authToken
      });

      if (commentary) {
        toolbarApi.showCommentary(commentary);
        await speak(commentary, extensionSettings.voiceId, extensionSettings.proxyUrl, extensionSettings.authToken, currentVideo);
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
