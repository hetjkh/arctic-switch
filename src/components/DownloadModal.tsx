'use client';

import { createContext, useCallback, useContext, useEffect, useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './DownloadModal.module.css';

type DownloadContextValue = {
  openDownload: () => void;
  closeDownload: () => void;
};

const DownloadContext = createContext<DownloadContextValue | null>(null);

export function useDownloadModal() {
  const ctx = useContext(DownloadContext);
  if (!ctx) throw new Error('useDownloadModal must be used within DownloadProvider');
  return ctx;
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5.5 11 4.3v7.2H3zm9-1.4 9-1.3v8.7h-9zM3 13.5h8v7.2L3 19.5zm9 .2h9v8.6l-9-1.3z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.3 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-.9-2.4-3.8ZM14.8 5.5c.6-.8 1.1-1.9 1-3-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3Z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.1 2.4c-.9 0-1.7.7-2.1 1.8-.3.8-.3 1.8-.1 2.8.2 1.1.6 2.2.9 3.2-.9.4-1.6 1.1-2.1 2-.7 1.3-1 2.9-.8 4.5.2 1.8 1.1 3.4 2.5 4.3.5.3 1 .5 1.6.5.4 0 .8-.1 1.1-.3.4.6 1.1 1 1.9 1 .9 0 1.6-.5 2-1.2.5.1 1 .1 1.5-.1 1.4-.5 2.4-1.9 2.6-3.6.3-2.1-.5-4.1-1.9-5.1-.5-.4-1.1-.6-1.7-.7.2-.9.5-1.9.6-2.9.2-1.2 0-2.3-.5-3.1-.6-.9-1.5-1.4-2.5-1.4Zm-.1 1.5c.4 0 .8.2 1.1.6.3.4.4 1 .3 1.7-.1.8-.3 1.6-.5 2.4h-.8c-.2-.8-.5-1.6-.6-2.4-.1-.7 0-1.3.2-1.7.2-.4.5-.6.3-.6Zm-2.7 7.5c.4-.7 1-.1.2 1.8.4 2.6.9 3.2 1.1.5.2 1 .3 1.5.2.3 0 .6-.1.8-.3.1.8.5 1.4 1.1 1.4.5 0 .8-.4.9-1 .3.1.6.1.9 0 .9.6 1.4 1.8 1.2 3.1-.1 1-.7 1.8-1.5 2.1-.4.1-.7.1-1.1 0-.5.7-1.3 1.1-2.1 1.1-.6 0-1.1-.2-1.5-.7-.4.1-.8.1-1.2-.1-1-.6-1.6-1.8-1.8-3.1-.2-1.3.1-2.6.7-3.6.4-.7 1-1.2 1.6-1.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

const platforms = [
  {
    id: 'windows',
    name: 'Windows',
    detail: 'Native installer for Windows 10 and 11.',
    meta: '.exe · 64-bit',
    href: '#',
    Icon: WindowsIcon,
  },
  {
    id: 'macos',
    name: 'macOS',
    detail: 'Universal build for Apple silicon and Intel.',
    meta: '.dmg · Universal',
    href: '#',
    Icon: AppleIcon,
  },
  {
    id: 'linux',
    name: 'Linux',
    detail: 'Portable AppImage for modern distros.',
    meta: '.AppImage',
    href: '#',
    Icon: LinuxIcon,
  },
] as const;

function DownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          role="presentation"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.grid} aria-hidden="true" />

            <button type="button" className={styles.close} onClick={onClose} aria-label="Close download options">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className={styles.header}>
              <span className={styles.brandMark} aria-hidden="true" />
              <p className={styles.kicker}>ArcticSwitch desktop</p>
              <h2 id={titleId}>Download for your system</h2>
              <p className={styles.lead}>
                One calm workspace for every account. Free to try on Windows, macOS, and Linux.
              </p>
            </div>

            <div className={styles.options}>
              {platforms.map(({ id, name, detail, meta, href, Icon }, index) => (
                <motion.a
                  key={id}
                  className={styles.option}
                  href={href}
                  download
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.08 + index * 0.06 }}
                >
                  <span className={styles.icon}><Icon /></span>
                  <span className={styles.copy}>
                    <strong>{name}</strong>
                    <span>{detail}</span>
                    <em>{meta}</em>
                  </span>
                  <span className={styles.action}>
                    Download
                    <ArrowIcon />
                  </span>
                </motion.a>
              ))}
            </div>

            <div className={styles.footer}>
              <span>Free to download</span>
              <i aria-hidden="true" />
              <span>No account needed to install</span>
              <i aria-hidden="true" />
              <span>Works offline</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDownload = useCallback(() => setOpen(true), []);
  const closeDownload = useCallback(() => setOpen(false), []);

  return (
    <DownloadContext.Provider value={{ openDownload, closeDownload }}>
      {children}
      <DownloadModal open={open} onClose={closeDownload} />
    </DownloadContext.Provider>
  );
}
