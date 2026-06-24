// CommentX — Popup Settings Controller

document.addEventListener('DOMContentLoaded', () => {
  const modeSelect = document.getElementById('modeSelect');
  const customPromptGroup = document.getElementById('customPromptGroup');
  const customPrompt = document.getElementById('customPrompt');
  const volumeSlider = document.getElementById('volumeSlider');
  const volDisplay = document.getElementById('volDisplay');
  const groqApiKey = document.getElementById('groqApiKey');
  const elevenLabsApiKey = document.getElementById('elevenLabsApiKey');
  const modelName = document.getElementById('modelName');
  const saveBtn = document.getElementById('saveBtn');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');

  // ── Show/hide custom prompt ──
  modeSelect.addEventListener('change', () => {
    customPromptGroup.classList.toggle('hidden', modeSelect.value !== 'custom');
  });

  // ── Live volume display ──
  volumeSlider.addEventListener('input', () => {
    volDisplay.textContent = volumeSlider.value + '%';
  });

  // ── Toggle key visibility ──
  document.querySelectorAll('.key-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🔒';
      } else {
        input.type = 'password';
        btn.textContent = '👁';
      }
    });
  });

  // ── Load saved settings ──
  chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (settings) => {
    if (!settings) {
      updateStatus(false);
      return;
    }

    if (settings.mode) modeSelect.value = settings.mode;
    if (settings.customPrompt) customPrompt.value = settings.customPrompt;
    if (settings.volume !== undefined) {
      volumeSlider.value = settings.volume;
      volDisplay.textContent = settings.volume + '%';
    }
    if (settings.groqApiKey) groqApiKey.value = settings.groqApiKey;
    if (settings.elevenLabsApiKey) elevenLabsApiKey.value = settings.elevenLabsApiKey;
    if (settings.modelName) modelName.value = settings.modelName;

    // Update status based on API key presence
    updateStatus(!!settings.groqApiKey);

    // Trigger mode change to show/hide custom prompt
    modeSelect.dispatchEvent(new Event('change'));
  });

  // ── Save settings ──
  saveBtn.addEventListener('click', () => {
    const newSettings = {
      mode: modeSelect.value,
      customPrompt: customPrompt.value,
      volume: parseInt(volumeSlider.value, 10),
      groqApiKey: groqApiKey.value.trim(),
      elevenLabsApiKey: elevenLabsApiKey.value.trim(),
      modelName: modelName.value.trim() || 'meta-llama/llama-4-scout-17b-16e-instruct'
    };

    chrome.runtime.sendMessage({ type: "SAVE_SETTINGS", settings: newSettings }, () => {
      saveBtn.textContent = '✓ Saved!';
      saveBtn.classList.add('saved');
      updateStatus(!!newSettings.groqApiKey);

      setTimeout(() => {
        saveBtn.textContent = 'Save Settings';
        saveBtn.classList.remove('saved');
      }, 2000);
    });
  });

  function updateStatus(hasKey) {
    if (hasKey) {
      statusDot.className = 'dot ok';
      statusText.textContent = 'Ready — Groq API key configured';
    } else {
      statusDot.className = 'dot warn';
      statusText.textContent = 'Add your Groq API key to get started';
    }
  }
});
