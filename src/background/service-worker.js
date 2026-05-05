chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_SETTINGS") {
    chrome.storage.sync.get([
      'enabled', 'mode', 'customPrompt', 'voiceId', 'volume', 'proxyUrl', 'authToken'
    ], (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }
  
  if (request.type === "SAVE_SETTINGS") {
    chrome.storage.sync.set(request.settings, () => {
      // Broadcast settings change to all tabs
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: "SETTINGS_UPDATED", settings: request.settings }).catch(() => {});
        });
      });
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.type === "PING") {
    sendResponse({ alive: true });
  }
});
