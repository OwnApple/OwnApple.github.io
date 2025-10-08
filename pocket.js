// pocket.js - Doraemon 百宝袋：渲染道具、搜索并绑定到现有功能
(function () {
  const POCKET_ITEMS = [
    { id: 'open-steam', labelKey: 'pocket.steam', icon: 'fas fa-tv', action: () => showSection('steam') },
    { id: 'open-github', labelKey: 'pocket.github', icon: 'fas fa-chart-line', action: () => { showSection('projects'); if (window.loadRealGithubData) window.loadRealGithubData(window.GITHUB_USERNAME || 'OwnApple'); } },
    { id: 'open-calculator', labelKey: 'pocket.calc', icon: 'fas fa-calculator', action: () => showSection('calculator') },
    { id: 'tool-door', labelKey: 'pocket.door', emoji: '🚪', action: () => showSection('home') },
    { id: 'tool-map', labelKey: 'pocket.map', emoji: '🗺️', action: () => { showSection('projects'); if (window.loadRealGithubData) window.loadRealGithubData(window.GITHUB_USERNAME || 'OwnApple'); } },
    { id: 'tool-id', labelKey: 'pocket.id', emoji: '🪪', action: () => showSection('about') },
    { id: 'tool-comm', labelKey: 'pocket.comm', emoji: '📞', action: () => showSection('contact') }
  ];

  function createItemNode(item) {
    const btn = document.createElement('button');
    btn.className = 'bubble-option pocket-button';
    btn.id = item.id;
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-tooltip', item.labelKey);
    btn.setAttribute('aria-label', item.labelKey);

    const inner = document.createElement('span');
    inner.className = 'pocket-inner';
    if (item.icon) {
      const i = document.createElement('i');
      i.className = item.icon;
      inner.appendChild(i);
    } else if (item.emoji) {
      const span = document.createElement('span');
      span.textContent = item.emoji + ' ';
      inner.appendChild(span);
    }
    const text = document.createElement('span');
    text.className = 'pocket-label';
    text.setAttribute('data-i18n', item.labelKey);
    text.textContent = item.labelKey; // will be replaced by i18n loader
    inner.appendChild(text);

    btn.appendChild(inner);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof item.action === 'function') item.action();
    });

    return btn;
  }

  function renderPocket(items) {
    const container = document.getElementById('pocket-items');
    if (!container) return;
    container.innerHTML = '';
    items.forEach(it => container.appendChild(createItemNode(it)));
  }

  function filterAndRender(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return renderPocket(POCKET_ITEMS);
    const filtered = POCKET_ITEMS.filter(it => {
      const label = (it.labelKey || '').toLowerCase();
      const emoji = (it.emoji || '').toLowerCase();
      return label.includes(q) || emoji.includes(q);
    });
    renderPocket(filtered);
  }

  function initPocket() {
    renderPocket(POCKET_ITEMS);
    const input = document.getElementById('pocket-search-input');
    if (input) {
      input.addEventListener('input', (e) => filterAndRender(e.target.value));
    }
  }

  // expose for tests/debug
  window.Pocket = { initPocket, POCKET_ITEMS };

  // init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPocket);
  } else {
    initPocket();
  }
})();
