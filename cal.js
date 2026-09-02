(function () {
  var SRC = "https://app.cal.com/embed/embed.js";
  var ORIGIN = "https://app.cal.com";
  var booted = false;
  var loading = null;

  function installSnippet() {
    if (window.Cal) return;
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal;
        var ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, SRC, "init");
  }

  function boot(namespace) {
    installSnippet();
    if (booted) return Promise.resolve();
    if (loading) return loading;

    Cal("init", namespace, { origin: ORIGIN });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    Cal.ns[namespace]("ui", { hideEventTypeDetails: false, layout: "month_view" });

    var script = document.querySelector('script[src="' + SRC + '"]');
    loading = new Promise(function (resolve, reject) {
      if (!script) {
        reject(new Error("Cal embed script missing"));
        return;
      }
      var done = function () {
        booted = true;
        resolve();
      };
      script.addEventListener("load", done);
      script.addEventListener("error", reject);
    }).catch(function (err) {
      loading = null;
      booted = false;
      throw err;
    });
    return loading;
  }

  function openBooking(trigger) {
    var namespace = trigger.getAttribute("data-cal-namespace") || "early-access";
    var calLink = trigger.getAttribute("data-cal-link");
    var config = {};
    try {
      config = JSON.parse(trigger.getAttribute("data-cal-config") || "{}");
    } catch (err) {}

    boot(namespace).then(function () {
      Cal.ns[namespace]("modal", { calLink: calLink, config: config });
    }).catch(function () {
      window.open("https://cal.com/" + calLink, "_blank", "noopener");
    });
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-cal-link]");
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    openBooking(trigger);
  }, true);
})();
