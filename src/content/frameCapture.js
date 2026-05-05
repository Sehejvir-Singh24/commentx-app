let offscreenCanvas = null;
let offscreenCtx = null;

const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;

function setupCanvas(videoEl) {
  if (!offscreenCanvas) {
    offscreenCanvas = document.createElement('canvas');
    // willReadFrequently improves performance when extracting image data frequently
    offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
  }

  // Handle case where video is not yet fully loaded
  const videoWidth = videoEl.videoWidth || videoEl.clientWidth || MAX_WIDTH;
  const videoHeight = videoEl.videoHeight || videoEl.clientHeight || MAX_HEIGHT;

  // Calculate dimensions keeping aspect ratio capped at 640x360
  let targetWidth = videoWidth;
  let targetHeight = videoHeight;

  if (targetWidth > MAX_WIDTH || targetHeight > MAX_HEIGHT) {
    const widthRatio = MAX_WIDTH / targetWidth;
    const heightRatio = MAX_HEIGHT / targetHeight;
    const scaleRatio = Math.min(widthRatio, heightRatio);

    targetWidth = Math.floor(targetWidth * scaleRatio);
    targetHeight = Math.floor(targetHeight * scaleRatio);
  }

  // Only update dimensions if they changed (prevents canvas clearing overhead)
  if (offscreenCanvas.width !== targetWidth || offscreenCanvas.height !== targetHeight) {
    offscreenCanvas.width = targetWidth;
    offscreenCanvas.height = targetHeight;
  }
}

export function captureFrame(videoEl) {
  if (!videoEl) return null;
  
  setupCanvas(videoEl);
  
  try {
    offscreenCtx.drawImage(videoEl, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    return offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  } catch (error) {
    console.error("CommentX: Error capturing raw frame:", error);
    return null;
  }
}

export function captureFrameAsBase64(videoEl) {
  if (!videoEl) return null;
  
  setupCanvas(videoEl);
  
  try {
    offscreenCtx.drawImage(videoEl, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    // Export as JPEG with 0.7 quality to keep payload small
    const dataUri = offscreenCanvas.toDataURL('image/jpeg', 0.4);
    
    // Return just the base64 payload (strip the 'data:image/jpeg;base64,' prefix)
    // Claude Vision API expects the raw base64 string
    return dataUri.split(',')[1];
  } catch (error) {
    console.error("CommentX: Error capturing base64 frame:", error);
    return null;
  }
}
