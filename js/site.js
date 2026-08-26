/** Hero search loop, reveal-on-view, billing toggle, smooth anchors. */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function runPaletteLoop(root) {
  const textEl = root.querySelector("[data-palette-text]");
  const caret = root.querySelector("[data-palette-caret]");
  const clear = root.querySelector("[data-palette-clear]");
  const results = root.querySelector("[data-palette-results]");
  const rows = [...root.querySelectorAll("[data-palette-row]")];
  if (!textEl || !caret || !clear || !results) return;

  const phrase = root.dataset.palettePhrase || "New laptop for engineer";

  const setActive = (target) => {
    rows.forEach((row) => {
      if (target && row === target) row.dataset.active = "true";
      else delete row.dataset.active;
    });
  };

  const reset = () => {
    textEl.textContent = "";
    clear.style.opacity = "0";
    results.classList.add("hidden");
    rows.forEach((row) => {
      delete row.dataset.active;
      row.style.opacity = "0";
      row.style.transform = "translateY(4px)";
      row.style.transition = "none";
    });
  };

  const showResults = async () => {
    clear.style.opacity = "1";
    results.classList.remove("hidden");
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      row.style.transition = "opacity 320ms ease, transform 320ms ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
      if (index === 0) setActive(row);
      await sleep(REDUCED_MOTION ? 0 : 120);
    }
    await sleep(REDUCED_MOTION ? 400 : 900);
    if (rows[0]) setActive(rows[0]);
  };

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => setActive(row));
    row.addEventListener("focus", () => setActive(row));
  });
  results.addEventListener("mouseleave", () => setActive(rows[0] ?? null));

  caret.dataset.on = "true";

  while (true) {
    reset();
    if (REDUCED_MOTION) {
      textEl.textContent = phrase;
      await showResults();
      await sleep(2400);
      continue;
    }

    for (let i = 1; i <= phrase.length; i += 1) {
      textEl.textContent = phrase.slice(0, i);
      await sleep(52);
    }

    await sleep(280);
    await showResults();
    await sleep(2600);

    // Select first match briefly, then clear and loop
    if (rows[0]) setActive(rows[0]);
    await sleep(700);

    for (let i = phrase.length; i >= 0; i -= 1) {
      textEl.textContent = phrase.slice(0, i);
      await sleep(18);
    }
    clear.style.opacity = "0";
    results.classList.add("hidden");
    await sleep(900);
  }
}

function watchPalettes() {
  document.querySelectorAll("[data-palette]").forEach((root) => {
    if (root.dataset.paletteWatching === "true") return;
    root.dataset.paletteWatching = "true";

    const start = () => {
      if (root.dataset.paletteReady === "true") return;
      root.dataset.paletteReady = "true";
      runPaletteLoop(root);
    };

    if (!("IntersectionObserver" in window)) {
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
      { threshold: 0.35, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
  });
}

function watchReveals() {
  document.querySelectorAll("[data-reveal]").forEach((root) => {
    if (root.dataset.revealWatching === "true") return;
    root.dataset.revealWatching = "true";

    const items = root.querySelectorAll("[data-reveal-item]");
    const show = () => {
      items.forEach((item, index) => {
        window.setTimeout(
          () => {
            item.style.transition = "opacity 420ms ease, transform 420ms ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          },
          REDUCED_MOTION ? 0 : 90 + index * 120,
        );
      });
    };

    if (!("IntersectionObserver" in window)) {
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
      { threshold: 0.28 },
    );
    io.observe(root);
  });
}

function bindBillingToggle() {
  const buttons = document.querySelectorAll("[data-billing]");
  const panels = document.querySelectorAll("[data-pricing]");
  if (!buttons.length || !panels.length) return;

  const setBilling = (mode) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.billing === mode;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("bg-zinc-100", active);
      btn.classList.toggle("text-ink", active);
      btn.classList.toggle("text-ink-muted", !active);
    });
    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.pricing !== mode);
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setBilling(btn.dataset.billing));
  });
}

function bindSmoothAnchors() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;

      const el = document.getElementById(href.slice(1));
      if (!el) return;

      event.preventDefault();
      el.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", href);
    },
    true,
  );
}

function applyEarlyAccessLinks() {
  const href = window.EARLY_ACCESS_HREF || "#early-access";
  document.querySelectorAll("[data-early-access]").forEach((el) => {
    el.setAttribute("href", href);
  });
}

function boot() {
  applyEarlyAccessLinks();
  watchPalettes();
  watchReveals();
  bindBillingToggle();
}

bindSmoothAnchors();
boot();
