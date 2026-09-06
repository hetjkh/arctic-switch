'use client';

import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { useDownloadModal } from '../components/DownloadModal';
import styles from './page.module.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

export default function SiteNav() {
  const [compact, setCompact] = useState(false);
  const { openDownload } = useDownloadModal();

  useLenis((lenis) => {
    const next = lenis.scroll > 40;
    setCompact((current) => (current === next ? current : next));
  });

  return (
    <nav
      className={`${styles.nav} ${compact ? styles.navCompact : ''}`}
      aria-label="Primary navigation"
      data-compact={compact || undefined}
    >
      <a className={`${styles.brand} ${styles.navBrand}`} href="#home" aria-label="ArcticSwitch home">
        <Image src="/arctic-switch-wordmark.png" width={7218} height={1080} alt="ArcticSwitch" priority />
      </a>
      <div className={styles.navLinks}>
        <a href="#product">Product</a>
        <a href="#features">Features</a>
        <a href="#security">Security</a>
        <a href="#download">Download</a>
      </div>
      <div className={styles.navEnd}>
        <ThemeToggle />
        <button type="button" className={styles.navCta} onClick={openDownload}>
          Get the app <Arrow />
        </button>
      </div>
    </nav>
  );
}
