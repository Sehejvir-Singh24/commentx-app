document.addEventListener('DOMContentLoaded', () => {
  const modeSelect = document.getElementById('modeSelect');
  const customPromptGroup = document.getElementById('customPromptGroup');
  const saveBtn = document.getElementById('saveBtn');

  // Show/hide custom prompt based on mode
  modeSelect.addEventListener('change', () => {
    if (modeSelect.value === 'custom') {
      customPromptGroup.classList.remove('hidden');
    } else {
      customPromptGroup.classList.add('hidden');
    }
  });

  // Load settings
  chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (settings) => {
    if (!settings) return;
    if (settings.enabled !== undefined) document.getElementById('enableToggle').checked = settings.enabled;
    if (settings.mode) document.getElementById('modeSelect').value = settings.mode;
    if (settings.customPrompt) document.getElementById('customPrompt').value = settings.customPrompt;
    if (settings.voiceId) document.getElementById('voiceSelect').value = settings.voiceId;
    if (settings.volume !== undefined) document.getElementById('volumeSlider').value = settings.volume;
    if (settings.proxyUrl) document.getElementById('proxyUrl').value = settings.proxyUrl;
    if (settings.authToken) document.getElementById('authToken').value = settings.authToken;
    
    // Trigger change to update visibility
    modeSelect.dispatchEvent(new Event('change'));
  });

  // Save settings
  saveBtn.addEventListener('click', () => {
    const settings = {
      enabled: document.getElementById('enableToggle').checked,
      mode: document.getElementById('modeSelect').value,
      customPrompt: document.getElementById('customPrompt').value,
      voiceId: document.getElementById('voiceSelect').value,
      volume: parseInt(document.getElementById('volumeSlider').value, 10),
      proxyUrl: document.getElementById('proxyUrl').value,
      authToken: document.getElementById('authToken').value
    };

    chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings }, () => {
      saveBtn.textContent = "Saved!";
      setTimeout(() => { saveBtn.textContent = "Save Settings"; }, 1500);
    });
  });
});
