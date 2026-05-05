export function injectToolbar(videoEl, options, onToggle, onModeChange, onVolume) {
  const container = document.createElement('div');
  container.id = 'commentx-toolbar-container';
  container.style.position = 'absolute';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.zIndex = '2147483647';
  container.style.pointerEvents = 'auto';

  const shadow = container.attachShadow({ mode: 'closed' });

  const style = document.createElement('style');
  style.textContent = `
    .toolbar {
      display: flex; align-items: center; gap: 10px;
      background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);
      padding: 8px 12px; border-radius: 8px; color: white;
      font-family: system-ui, -apple-system, sans-serif; font-size: 14px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
    }
    button, select, input {
      background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
      color: white; border-radius: 4px; padding: 4px 8px; cursor: pointer; outline: none;
    }
    button:hover, select:hover { background: rgba(255, 255, 255, 0.2); }
    .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #888; transition: background 0.3s; }
    .status-dot.active { background: #4caf50; box-shadow: 0 0 5px #4caf50; }
    .status-dot.error { background: #f44336; box-shadow: 0 0 5px #f44336; }
    .toggle { font-weight: bold; }
    .toggle.active { background: #4caf50; border-color: #4caf50; }

    .commentary-box {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 600px;
      width: 90%;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      padding: 14px 20px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      text-align: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
      z-index: 2147483647;
    }
    .commentary-box.visible {
      opacity: 1;
    }
    .commentary-box .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #4caf50;
      margin-bottom: 6px;
      font-weight: 700;
    }
  `;

  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';

  const statusDot = document.createElement('div');
  statusDot.className = 'status-dot';
  
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle';
  toggleBtn.textContent = 'CommentX: OFF';

  const modeSelect = document.createElement('select');
  ['Sports', 'Gaming', 'Documentary', 'Custom'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.toLowerCase();
    opt.textContent = m;
    modeSelect.appendChild(opt);
  });
  modeSelect.value = options?.mode || 'sports';

  const volInput = document.createElement('input');
  volInput.type = 'range';
  volInput.min = '0';
  volInput.max = '100';
  volInput.value = options?.volume || '50';
  volInput.style.width = '60px';

  toolbar.append(statusDot, toggleBtn, modeSelect, volInput);

  const commentaryBox = document.createElement('div');
  commentaryBox.className = 'commentary-box';
  commentaryBox.innerHTML = '<div class="label">🎙️ CommentX</div><div class="text"></div>';

  shadow.append(style, toolbar, commentaryBox);

  let hideTimeout = null;

  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  
  document.body.appendChild(container);

  let isActive = false;
  
  toggleBtn.addEventListener('click', () => {
    isActive = !isActive;
    toggleBtn.textContent = isActive ? 'CommentX: ON' : 'CommentX: OFF';
    toggleBtn.classList.toggle('active', isActive);
    statusDot.className = `status-dot ${isActive ? 'active' : ''}`;
    onToggle(isActive);
  });

  modeSelect.addEventListener('change', (e) => onModeChange(e.target.value));
  volInput.addEventListener('input', (e) => onVolume(parseInt(e.target.value, 10)));

  const observer = new MutationObserver(() => {
    if (!document.contains(videoEl)) {
      container.remove();
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
      }, 8000);
    },
    remove: () => {
      container.remove();
      observer.disconnect();
    }
  };
}
