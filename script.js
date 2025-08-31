document.addEventListener("DOMContentLoaded", () => {
  // === Dark/Light Mode Toggle ===
  const btn = document.getElementById("modeToggle");
  const THEME_KEY = "pixelprobe-theme";

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      btn.textContent = "Light Mode";
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Switch to light mode");
    } else {
      document.body.classList.remove("dark-mode");
      btn.textContent = "Dark Mode";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === "dark");

  btn.addEventListener("click", () => {
    const nowDark = !document.body.classList.contains("dark-mode");
    applyTheme(nowDark);
    localStorage.setItem(THEME_KEY, nowDark ? "dark" : "light");
  });

  // === Pixel Test ===
  const startBtn = document.getElementById("startButton");
  const testColors = ["red", "green", "blue", "white", "black"];
  let colorIndex = 0;
  let overlay = null;

  startBtn.addEventListener("click", () => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = testColors[colorIndex];
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }

    overlay.addEventListener("click", nextColor);
    document.addEventListener("keydown", handleKey);
  });

  function nextColor() {
    colorIndex++;
    if (colorIndex < testColors.length) {
      overlay.style.backgroundColor = testColors[colorIndex];
    } else {
      exitTest();
    }
  }

  function handleKey(e) {
    if (e.code === "Space") {
      e.preventDefault();
      nextColor();
    }
  }

  function exitTest() {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
    colorIndex = 0;
    document.body.style.overflow = "";
    document.body.style.margin = "";

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    document.removeEventListener("keydown", handleKey);
  }
});
