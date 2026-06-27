// CommentX — Floating Toolbar
// Injects an overlay toolbar onto the page near the video player

(function () {
  window.CommentX = window.CommentX || {};

  window.CommentX.injectToolbar = function (videoEl, options, onToggle, onModeChange, onVolume) {
    const container = document.createElement('div');
    container.id = 'commentx-toolbar-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:2147483647;pointer-events:auto;';

    const shadow = container.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      :host { font-family: 'Inter', system-ui, -apple-system, sans-serif; }

      .toolbar {
        display: flex; align-items: center; gap: 10px;
        background: linear-gradient(135deg, rgba(15,15,20,0.88), rgba(25,25,35,0.92));
        backdrop-filter: blur(16px) saturate(1.4);
        padding: 10px 14px; border-radius: 14px; color: #e0e0e0;
        font-size: 13px; font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        transition: opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1);
      }
      .toolbar.hidden {
        opacity: 0; pointer-events: none; transform: translateY(-12px) scale(0.96);
      }

      /* ── Toggle button ── */
      .toggle {
        background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
        color: #aaa; border-radius: 8px; padding: 6px 12px;
        cursor: pointer; outline: none; font-weight: 600; font-size: 12px;
        letter-spacing: 0.3px;
        transition: all 0.25s ease;
      }
      .toggle:hover { background: rgba(255,255,255,0.12); color: #fff; }
      .toggle.active {
        background: linear-gradient(135deg, #00c853, #00e676);
        border-color: #00c853; color: #0a1f0f;
        box-shadow: 0 0 12px rgba(0,200,83,0.35);
      }

      /* ── Status dot ── */
      .status-dot {
        width: 9px; height: 9px; border-radius: 50%;
        background: #555; transition: all 0.3s ease;
        flex-shrink: 0;
      }
      .status-dot.active {
        background: #00e676;
        box-shadow: 0 0 8px rgba(0,230,118,0.6);
        animation: pulse-dot 2s ease-in-out infinite;
      }
      .status-dot.error { background: #ff5252; box-shadow: 0 0 8px rgba(255,82,82,0.5); }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
      }

      /* ── Select ── */
      select {
        background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
        color: #ccc; border-radius: 6px; padding: 5px 8px; cursor: pointer;
        outline: none; font-size: 12px; font-family: inherit;
        transition: border-color 0.2s;
      }
      select:hover, select:focus { border-color: rgba(0,230,118,0.4); }
      select option { background: #1a1a2e; color: #e0e0e0; }

      /* ── Volume slider ── */
      input[type="range"] {
        -webkit-appearance: none; appearance: none;
        width: 56px; height: 4px; background: rgba(255,255,255,0.12);
        border-radius: 4px; outline: none; cursor: pointer;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: 14px; height: 14px; border-radius: 50%;
        background: linear-gradient(135deg, #00e676, #00c853);
        box-shadow: 0 0 6px rgba(0,230,118,0.4);
        cursor: pointer;
      }

      /* ── Close button ── */
      .close-btn {
        background: transparent !important; border: none !important;
        color: rgba(255,255,255,0.3) !important; font-size: 15px !important;
        padding: 0 2px !important; line-height: 1; margin-left: 2px;
        cursor: pointer; transition: color 0.2s;
      }
      .close-btn:hover { color: #ff5252 !important; }

      /* ── Commentary overlay ── */
      .commentary-box {
        position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
        max-width: 620px; width: 90%;
        background: linear-gradient(135deg, rgba(10,10,18,0.92), rgba(20,20,32,0.95));
        backdrop-filter: blur(20px) saturate(1.3);
        color: #f0f0f0;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 16px; line-height: 1.6;
        padding: 16px 24px; border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05);
        text-align: center;
        opacity: 0; transform: translateX(-50%) translateY(10px);
        transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
        pointer-events: none;
        z-index: 2147483647;
      }
      .commentary-box.visible {
        opacity: 1; transform: translateX(-50%) translateY(0);
      }
      .commentary-box .label {
        font-size: 10px; text-transform: uppercase; letter-spacing: 2px;
        background: linear-gradient(90deg, #00e676, #00bcd4);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px; font-weight: 700;
      }
      .commentary-box .text {
        font-weight: 400; letter-spacing: 0.2px;
      }
    `;

    // ── Build toolbar elements ──
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    const statusDot = document.createElement('div');
    statusDot.className = 'status-dot';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle';
    toggleBtn.textContent = 'CX: OFF';

    const modeSelect = document.createElement('select');
    ['Valorant', 'Sports', 'Gaming', 'Documentary', 'Custom'].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.toLowerCase();
      opt.textContent = m;
      modeSelect.appendChild(opt);
    });
    modeSelect.value = options?.mode || 'sports';

    const volInput = document.createElement('input');
    volInput.type = 'range';
    volInput.min = '0'; volInput.max = '100';
    volInput.value = options?.volume || '50';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.title = 'Hide CommentX toolbar';
    closeBtn.textContent = '✕';

    toolbar.append(statusDot, toggleBtn, modeSelect, volInput, closeBtn);

    // ── Commentary overlay ──
    const commentaryBox = document.createElement('div');
    commentaryBox.className = 'commentary-box';
    commentaryBox.innerHTML = '<div class="label">🎙 COMMENTX LIVE</div><div class="text"></div>';

    shadow.append(style, toolbar, commentaryBox);

    // ── Restore pill (outside shadow DOM) ──
    const restorePill = document.createElement('button');
    restorePill.id = 'commentx-restore-pill';
    restorePill.title = 'Show CommentX toolbar';
    restorePill.textContent = 'CX ▸';
    restorePill.style.cssText = [
      'position:fixed', 'top:20px', 'right:20px', 'z-index:2147483647',
      'background:linear-gradient(135deg,rgba(0,0,0,0.65),rgba(15,15,25,0.8))',
      'backdrop-filter:blur(12px)', 'border:1px solid rgba(255,255,255,0.1)',
      'border-radius:20px', 'padding:6px 12px', 'color:rgba(255,255,255,0.6)',
      'font-family:system-ui,-apple-system,sans-serif', 'font-size:11px',
      'font-weight:700', 'letter-spacing:1.5px', 'cursor:pointer',
      'box-shadow:0 4px 16px rgba(0,0,0,0.4)',
      'opacity:0', 'pointer-events:none', 'transform:scale(0.85)',
      'transition:opacity 0.3s ease,transform 0.3s ease'
    ].join(';');

    document.body.appendChild(container);
    document.body.appendChild(restorePill);

    // ── Event handlers ──
    let isActive = false;
    let hideTimeout = null;

    toggleBtn.addEventListener('click', () => {
      isActive = !isActive;
      toggleBtn.textContent = isActive ? 'CX: ON' : 'CX: OFF';
      toggleBtn.classList.toggle('active', isActive);
      statusDot.className = 'status-dot' + (isActive ? ' active' : '');
      onToggle(isActive);
    });

    modeSelect.addEventListener('change', (e) => onModeChange(e.target.value));
    volInput.addEventListener('input', (e) => onVolume(parseInt(e.target.value, 10)));

    function hideToolbar() {
      toolbar.classList.add('hidden');
      restorePill.style.opacity = '1';
      restorePill.style.pointerEvents = 'auto';
      restorePill.style.transform = 'scale(1)';
    }

    function showToolbar() {
      toolbar.classList.remove('hidden');
      restorePill.style.opacity = '0';
      restorePill.style.pointerEvents = 'none';
      restorePill.style.transform = 'scale(0.85)';
    }

    closeBtn.addEventListener('click', hideToolbar);
    restorePill.addEventListener('click', showToolbar);

    // Clean up if video is removed
    const observer = new MutationObserver(() => {
      if (!document.contains(videoEl)) {
        container.remove();
        restorePill.remove();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return {
      setStatus: (status) => {
        statusDot.className = 'status-dot';
        if (status === 'active') statusDot.classList.add('active');
        if (status === 'error') statusDot.classList.add('error');
      },
      showCommentary: (text) => {
        if (!text) return;
        const textEl = commentaryBox.querySelector('.text');
        textEl.textContent = text;
        commentaryBox.classList.add('visible');
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          commentaryBox.classList.remove('visible');
        }, 5000);
      },
      remove: () => {
        container.remove();
        restorePill.remove();
        observer.disconnect();
      }
    };
  };
})();
