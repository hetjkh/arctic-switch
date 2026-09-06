'use client';

import styles from './ThemeToggle.module.css';

function readTheme(): 'light' | 'dark' {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function writeTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('arctic-theme', theme);
  } catch {
    /* ignore quota / private mode */
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      onClick={() => {
        writeTheme(readTheme() === 'dark' ? 'light' : 'dark');
      }}
    >
      <svg className={styles.sun} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <svg className={styles.moon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 14.5A6.5 6.5 0 1 1 9.5 8.5 5.2 5.2 0 0 0 15.5 14.5Z" />
      </svg>
    </button>
  );
}
