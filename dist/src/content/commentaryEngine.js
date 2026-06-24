// CommentX — Commentary Engine
// Sends frames to the background service worker for Groq Vision analysis

(function () {
  window.CommentX = window.CommentX || {};

  let contextBuffer = [];

  window.CommentX.generateCommentary = async function ({ base64Frame, mode, customPrompt }) {
    try {
      const result = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          type: "GENERATE_COMMENTARY",
          base64Frame,
          mode,
          customPrompt,
          context: contextBuffer
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          resolve(response);
        });
      });

      if (result.error) {
        console.error("CommentX:", result.error);
        return null;
      }

      const commentary = (result.commentary || "").trim();
      if (commentary) {
        contextBuffer.push(commentary);
        if (contextBuffer.length > 10) {
          contextBuffer.shift();
        }
        return commentary;
      }
      return null;

    } catch (error) {
      console.error("CommentX: generateCommentary failed", error);
      return null;
    }
  };
})();
