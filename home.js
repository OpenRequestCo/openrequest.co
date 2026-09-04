(function () {
  function syncHeader() {
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function urlWithoutHash() {
    return window.location.pathname + window.location.search;
  }

  function hideHash() {
    if (!window.location.hash || !history.replaceState) return;
    history.replaceState(null, '', urlWithoutHash());
  }

  function scrollToId(id, behavior) {
    var target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({
      behavior: behavior || (reduceMotion ? 'auto' : 'smooth')
    });
    return true;
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var id = decodeURIComponent(href.slice(1));
    if (!scrollToId(id)) return;
    event.preventDefault();
    hideHash();
  });

  if (window.location.hash) {
    var initialId = decodeURIComponent(window.location.hash.slice(1));
    window.requestAnimationFrame(function () {
      scrollToId(initialId, 'auto');
      hideHash();
    });
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  var billing = document.querySelector('[data-billing]');
  if (billing) {
    var intervalButtons = billing.querySelectorAll('[data-interval]');
    var priceRows = billing.querySelectorAll('[data-price-row]');

    function money(n) {
      return '$' + n.toLocaleString('en-US');
    }

    function setBilling(name) {
      intervalButtons.forEach(function (button) {
        var on = button.getAttribute('data-interval') === name;
        button.classList.toggle('is-active', on);
        button.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var yearly = name === 'yearly';
      priceRows.forEach(function (el) {
        var teams = parseInt(el.getAttribute('data-teams'), 10) || 1;
        el.textContent = money(39 * teams * (yearly ? 10 : 1));
      });
    }

    intervalButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setBilling(button.getAttribute('data-interval'));
      });
    });
  }

  var stage = document.querySelector('[data-stage]');
  if (stage) {
    var stageWrap = stage.closest('.hero-stage-wrap');
    var floatCards = stageWrap
      ? stageWrap.querySelectorAll(':scope > .float-card')
      : [];
    var floatShown = false;
    var textEl = stage.querySelector('[data-palette-text]');
    var caret = stage.querySelector('[data-palette-caret]');
    var results = stage.querySelector('[data-palette-results]');
    var rows = stage.querySelectorAll('[data-search-row]');
    var newRow = stage.querySelector('[data-new-request]');
    var phrase = stage.getAttribute('data-palette-phrase') || 'request a new laptop';
    var runId = 0;

    function showFloatCards() {
      if (floatShown || !floatCards.length) return;
      floatShown = true;
      floatCards.forEach(function (card, index) {
        window.setTimeout(function () {
          card.classList.add('is-in');
        }, reduceMotion ? 0 : index * 120);
      });
    }

    function setActive(index) {
      rows.forEach(function (row, i) {
        if (i === index) row.setAttribute('data-active', 'true');
        else row.removeAttribute('data-active');
      });
    }

    function showResults() {
      results.classList.add('is-open');
      rows.forEach(function (row, index) {
        window.setTimeout(function () {
          row.classList.add('is-in');
        }, reduceMotion ? 0 : 90 + index * 160);
      });
    }

    function hideResults() {
      results.classList.remove('is-open');
      rows.forEach(function (row) {
        row.classList.remove('is-in');
        row.removeAttribute('data-active');
      });
    }

    function showNewRow() {
      if (!newRow) return;
      newRow.classList.add('is-in');
    }

    function hideNewRow() {
      if (!newRow) return;
      newRow.classList.remove('is-in');
    }

    function settleStage() {
      if (stageWrap) stageWrap.classList.add('is-settled');
    }

    function idle() {
      if (!textEl || !caret || !results) return;
      textEl.textContent = phrase;
      caret.classList.add('is-off');
      showResults();
      setActive(0);
      showNewRow();
      showFloatCards();
      settleStage();
    }

    async function play(id) {
      if (!textEl || !caret || !results) return;

      if (reduceMotion) {
        idle();
        return;
      }

      hideNewRow();
      hideResults();
      textEl.textContent = '';
      caret.classList.remove('is-off');

      for (var i = 1; i <= phrase.length; i += 1) {
        if (id !== runId) return;
        textEl.textContent = phrase.slice(0, i);
        await sleep(82);
      }

      if (id !== runId) return;
      showFloatCards();
      showResults();
      await sleep(640);
      if (id !== runId) return;
      setActive(0);
      await sleep(560);
      if (id !== runId) return;
      showNewRow();
      caret.classList.add('is-off');
      settleStage();
    }

    function startPlay() {
      runId += 1;
      play(runId);
    }

    function begin() {
      if (reduceMotion) {
        idle();
        return;
      }
      startPlay();
    }

    if (!('IntersectionObserver' in window)) {
      begin();
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            io.disconnect();
            begin();
          });
        },
        { threshold: 0.28 }
      );
      io.observe(stage);
    }
  }
})();
