/* Light/dark theme toggle. The saved preference is applied before first paint
   by the inline snippet in each page's <head>. */
(function () {
  var button = document.querySelector(".theme-toggle");
  var root = document.documentElement;

  if (!button) return;

  function currentTheme() {
    if (root.dataset.theme === "light" || root.dataset.theme === "dark") {
      return root.dataset.theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  button.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    button.setAttribute("aria-pressed", String(next === "dark"));
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* Private mode: theme simply does not persist. */
    }
  });

  button.setAttribute("aria-pressed", String(currentTheme() === "dark"));
})();
