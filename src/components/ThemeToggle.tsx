import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// index.html applies the same choice before first paint; keep the two in sync
function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage blocked: fall back to the system preference */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try { localStorage.setItem('theme', theme); } catch { /* preference just won't persist */ }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center w-10 h-10"
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? <Moon className="w-5 h-5 text-amber-ink" aria-hidden="true" /> : <Sun className="w-5 h-5 text-amber-ink" aria-hidden="true" />}
    </button>
  );
}
