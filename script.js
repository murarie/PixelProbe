document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('modeToggle');
  if (!btn) {
    console.warn('modeToggle button not found. Make sure you have <button id="modeToggle">...</button> in your HTML and that it is properly closed.');
    return;
  }

  const THEME_KEY = 'pixelprobe-theme'; 

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      btn.textContent = 'Light Mode'; 
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.body.classList.remove('dark-mode');
      btn.textContent = 'Dark Mode';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  const saved = localStorage.getItem(THEME_KEY); 
  const startDark = saved === 'dark';
  applyTheme(startDark);

  
  btn.addEventListener('click', () => {
    const nowDark = !document.body.classList.contains('dark-mode');
    applyTheme(nowDark);
    localStorage.setItem(THEME_KEY, nowDark ? 'dark' : 'light');
  });
});
