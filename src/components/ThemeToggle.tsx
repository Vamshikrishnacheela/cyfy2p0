import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// Dark unless the visitor chose light. index.html applies the same choice before first paint; keep the two in sync
function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage blocked: fall back to the default */ }
  return 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Saved only here, so the default is never stored as if the visitor had chosen it
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* preference just won't persist */ }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center w-10 h-10"
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? <Moon className="w-5 h-5 text-amber-ink" aria-hidden="true" /> : <Sun className="w-5 h-5 text-amber-ink" aria-hidden="true" />}
    </button>
  );
}
