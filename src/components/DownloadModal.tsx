'use client';

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import styles from './DownloadModal.module.css';

type DownloadContextValue = { openDownload: () => void; closeDownload: () => void };
const DownloadContext = createContext<DownloadContextValue | null>(null);
export function useDownloadModal() {
  const context = useContext(DownloadContext);
  if (!context) throw new Error('useDownloadModal must be used within DownloadProvider');
  return context;
}
const platforms = [
  { name: 'Windows', detail: 'Windows 10 and 11', meta: '.exe · 64-bit', href: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_URL, icon: <path d="m3 5 8-1v7H3zm10-1.3 8-1.2V11h-8zM3 13h8v7l-8-1zm10 0h8v8.5l-8-1.2z" /> },
  { name: 'macOS', detail: 'Apple silicon and Intel', meta: '.dmg · Universal', href: process.env.NEXT_PUBLIC_DOWNLOAD_MACOS_URL, icon: <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.3 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-.9-2.4-3.8ZM14.8 5.5c.6-.8 1.1-1.9 1-3-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3Z" /> },
  { name: 'Linux', detail: 'Modern Linux distributions', meta: '.AppImage', href: process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_URL, icon: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></g> },
];
function DownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const lenis = useLenis();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);
  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} data-lenis-prevent>
    <div className={styles.content}>
      <button className={styles.close} onClick={onClose} aria-label="Close download options" autoFocus><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      <span className={styles.kicker}>A LITTLE LESS SWITCHING</span>
      <h2 id={titleId}>Make room for a calmer day.</h2>
      <p id={descriptionId} className={styles.lead}>Your favorite apps. Your own space.<br />Find ArcticSwitch for your desktop.</p>
      <div className={styles.options}>{platforms.map(({ name, detail, meta, href, icon }) => <article key={name} className={styles.option}>
        <span className={styles.icon}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icon}</svg></span>
        <h3>{name}</h3><p>{detail}</p><span className={styles.meta}>{meta}</span>
        {href ? <a href={href} className={styles.download} download>Download <span aria-hidden="true">↓</span></a> : <span className={styles.unavailable}>Installer not available yet</span>}
      </article>)}</div>
      <p className={styles.note}>Separate accounts. One peaceful place.</p>
    </div>
  </dialog>;
}
export function DownloadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDownload = useCallback(() => setOpen(true), []);
  const closeDownload = useCallback(() => setOpen(false), []);
  return <DownloadContext.Provider value={{ openDownload, closeDownload }}>{children}<DownloadModal open={open} onClose={closeDownload} /></DownloadContext.Provider>;
}
