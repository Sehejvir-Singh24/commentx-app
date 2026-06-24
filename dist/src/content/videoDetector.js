// CommentX — Video Detector
// Finds the first <video> element on the page (or waits for one)

(function () {
  window.CommentX = window.CommentX || {};

  window.CommentX.detectVideo = function () {
    return new Promise((resolve) => {
      const existingVideo = document.querySelector('video');
      if (existingVideo) {
        resolve({ videoEl: existingVideo, playerType: getPlayerType() });
        return;
      }

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes) {
            for (const node of mutation.addedNodes) {
              if (node.tagName === 'VIDEO') {
                observer.disconnect();
                resolve({ videoEl: node, playerType: getPlayerType() });
                return;
              }
              if (node.querySelectorAll) {
                const video = node.querySelector('video');
                if (video) {
                  observer.disconnect();
                  resolve({ videoEl: video, playerType: getPlayerType() });
                  return;
                }
              }
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  };

  function getPlayerType() {
    const hostname = window.location.hostname;
    if (hostname.includes('youtube.com')) return 'youtube';
    if (hostname.includes('twitch.tv')) return 'twitch';
    return 'html5';
  }
})();
