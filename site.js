(function () {
  function syncHeader() {
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  var drops = document.querySelectorAll('[data-nav-drop]');

  function setOpen(drop, open) {
    var btn = drop.querySelector('[data-nav-drop-btn]');
    var panel = drop.querySelector('[data-nav-drop-panel]');
    drop.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel) panel.hidden = !open;
  }

  function closeAll(except) {
    drops.forEach(function (drop) {
      if (drop !== except) setOpen(drop, false);
    });
  }

  drops.forEach(function (drop) {
    var btn = drop.querySelector('[data-nav-drop-btn]');
    var panel = drop.querySelector('[data-nav-drop-panel]');
    if (!btn || !panel) return;

    btn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var willOpen = !drop.classList.contains('is-open');
      closeAll(willOpen ? drop : null);
      setOpen(drop, willOpen);
    });

    panel.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener('click', function () {
    closeAll();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll();
  });
})();
