/** Shared client behaviours: palette typing, reveal-on-view, hashless smooth scroll. */

function runPalette(root: HTMLElement) {
  if (root.dataset.paletteReady === 'true') return;
  root.dataset.paletteReady = 'true';

  const textEl = root.querySelector<HTMLElement>('[data-palette-text]');
  const caret = root.querySelector<HTMLElement>('[data-palette-caret]');
  const clear = root.querySelector<HTMLElement>('[data-palette-clear]');
  const results = root.querySelector<HTMLElement>('[data-palette-results]');
  const rows = root.querySelectorAll<HTMLElement>('[data-palette-row]');
  if (!textEl || !caret || !clear || !results) return;

  const phrase = root.dataset.palettePhrase || 'New laptop';
  let i = 0;

  caret.style.opacity = '1';
  caret.style.animation = 'palette-blink 1s step-end infinite';

  const typeTimer = window.setInterval(() => {
    i += 1;
    textEl.textContent = phrase.slice(0, i);
    if (i < phrase.length) return;

    window.clearInterval(typeTimer);
    clear.style.opacity = '1';
    results.classList.remove('hidden');
    rows.forEach((row, index) => {
      window.setTimeout(() => {
        row.style.transition = 'opacity 280ms ease, transform 280ms ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
        if (index === 0) row.dataset.active = 'true';
      }, 70 + index * 110);
    });

    const setActive = (target: HTMLElement | null) => {
      rows.forEach((row) => {
        if (target && row === target) row.dataset.active = 'true';
        else delete row.dataset.active;
      });
    };

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => setActive(row));
      row.addEventListener('focus', () => setActive(row));
    });
    results.addEventListener('mouseleave', () => setActive(rows[0] ?? null));
  }, 48);
}

function watchPalettes() {
  document.querySelectorAll<HTMLElement>('[data-palette]').forEach((root) => {
    if (root.dataset.paletteWatching === 'true') return;
    root.dataset.paletteWatching = 'true';

    const start = () => runPalette(root);
    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          start();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(root);
  });
}

function watchReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((root) => {
    if (root.dataset.revealWatching === 'true') return;
    root.dataset.revealWatching = 'true';

    const items = root.querySelectorAll<HTMLElement>('[data-reveal-item]');
    const show = () => {
      items.forEach((item, index) => {
        window.setTimeout(() => {
          item.style.transition = 'opacity 400ms ease, transform 400ms ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 90 + index * 120);
      });
    };

    if (!('IntersectionObserver' in window)) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          show();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root);
  });
}

function parseHashTarget(href: string): string | null {
  if (href.startsWith('#') && href.length > 1 && !href.startsWith('#/')) return href.slice(1);
  const match = href.match(/^\/#([\w-]+)$/);
  return match?.[1] ?? null;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

function bindSmoothAnchors() {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const id = parseHashTarget(href);
      if (!id) return;

      const onHome = location.pathname === '/' || location.pathname === '';
      if (onHome) {
        event.preventDefault();
        scrollToId(id);
        return;
      }

      if (href.startsWith('/#')) {
        event.preventDefault();
        sessionStorage.setItem('or-scroll-to', id);
        location.assign('/');
      }
    },
    true,
  );
}

function resumeCrossPageScroll() {
  const id = sessionStorage.getItem('or-scroll-to');
  if (!id) return;
  sessionStorage.removeItem('or-scroll-to');
  window.setTimeout(() => scrollToId(id), 50);
}

function boot() {
  watchPalettes();
  watchReveals();
  resumeCrossPageScroll();
}

bindSmoothAnchors();
boot();
document.addEventListener('astro:page-load', boot);
