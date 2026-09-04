(function () {
  function syncHeader() {
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var headings = Array.prototype.slice.call(document.querySelectorAll('.legal h2[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.legal-toc a[href^="#"]'));

  function setActive(id) {
    links.forEach(function (link) {
      var on = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('.legal-toc a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var id = decodeURIComponent(href.slice(1));
    var target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', href);
    setActive(id);
  });

  if ('IntersectionObserver' in window && headings.length) {
    var io = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        if (!visible.length) return;
        setActive(visible[0].target.id);
      },
      { rootMargin: '-5.5rem 0px -62% 0px', threshold: [0, 1] }
    );
    headings.forEach(function (heading) { io.observe(heading); });
  }

  if (window.location.hash) {
    var initialId = decodeURIComponent(window.location.hash.slice(1));
    var initial = document.getElementById(initialId);
    if (initial) {
      window.requestAnimationFrame(function () {
        initial.scrollIntoView({ behavior: 'auto', block: 'start' });
        setActive(initialId);
      });
    }
  } else if (headings[0]) {
    setActive(headings[0].id);
  }
})();
