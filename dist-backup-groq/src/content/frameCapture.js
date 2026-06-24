// CommentX — Frame Capture
// Captures video frames as base64 JPEG for the Groq Vision API

(function () {
  window.CommentX = window.CommentX || {};

  let offscreenCanvas = null;
  let offscreenCtx = null;

  const MAX_WIDTH = 320;
  const MAX_HEIGHT = 180;

  function setupCanvas(videoEl) {
    if (!offscreenCanvas) {
      offscreenCanvas = document.createElement('canvas');
      offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    }

    const videoWidth = videoEl.videoWidth || videoEl.clientWidth || MAX_WIDTH;
    const videoHeight = videoEl.videoHeight || videoEl.clientHeight || MAX_HEIGHT;

    let targetWidth = videoWidth;
    let targetHeight = videoHeight;

    if (targetWidth > MAX_WIDTH || targetHeight > MAX_HEIGHT) {
      const scaleRatio = Math.min(MAX_WIDTH / targetWidth, MAX_HEIGHT / targetHeight);
      targetWidth = Math.floor(targetWidth * scaleRatio);
      targetHeight = Math.floor(targetHeight * scaleRatio);
    }

    if (offscreenCanvas.width !== targetWidth || offscreenCanvas.height !== targetHeight) {
      offscreenCanvas.width = targetWidth;
      offscreenCanvas.height = targetHeight;
    }
  }

  window.CommentX.captureFrameAsBase64 = function (videoEl) {
    if (!videoEl) return null;
    setupCanvas(videoEl);
    try {
      offscreenCtx.drawImage(videoEl, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
      const dataUri = offscreenCanvas.toDataURL('image/jpeg', 0.4);
      return dataUri.split(',')[1];
    } catch (error) {
      console.error("CommentX: Error capturing frame:", error);
      return null;
    }
  };
})();
