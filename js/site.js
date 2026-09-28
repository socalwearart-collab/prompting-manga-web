(function () {
  var bar = document.querySelector(".progress");
  if (bar) {
    var tick = function () {
      var root = document.documentElement;
      var max = root.scrollHeight - root.clientHeight;
      var p = max > 0 ? root.scrollTop / max : 0;
      bar.style.transform = "scaleX(" + p + ")";
    };
    document.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    tick();
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var specimen = btn.closest(".specimen");
      var pre = specimen.querySelector("pre");
      var text = pre.innerText.replace(/\n$/, "");
      var label = btn.textContent;

      var flash = function (next) {
        btn.textContent = next;
        window.setTimeout(function () {
          btn.textContent = label;
        }, 1400);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            flash("Copied");
          },
          function () {
            selectPre(pre);
            flash("Selected");
          }
        );
      } else {
        selectPre(pre);
        flash("Selected");
      }
    });
  });

  function selectPre(pre) {
    var range = document.createRange();
    range.selectNodeContents(pre);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
})();
