(function () {
  var SRC = "https://app.kobbe.io/tracker.js";
  var TOKEN = "019664d0.Iu9utmSQ3T2ojvwATQ--s3WrzIJH-Rpb";
  var loaded = false;
  var events = ["pointerdown", "keydown", "scroll", "touchstart"];

  function load() {
    if (loaded) return;
    loaded = true;
    events.forEach(function (type) {
      window.removeEventListener(type, load, true);
    });
    var script = document.createElement("script");
    script.src = SRC;
    script.defer = true;
    script.setAttribute("data-token", TOKEN);
    document.head.appendChild(script);
  }

  events.forEach(function (type) {
    window.addEventListener(type, load, { capture: true, passive: true });
  });
})();
