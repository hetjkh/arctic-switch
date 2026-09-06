'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useDownloadModal } from '../components/DownloadModal';
import styles from './ClosingSections.module.css';

function Arrow({ up = false }: { up?: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{up ? <path d="M12 19V5m-6 6 6-6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}</svg>;
}

export default function ClosingSections() {
  const reduced = useReducedMotion();
  const { openDownload } = useDownloadModal();

  return <div className={styles.closing}>
    <section className={styles.download} id="download" aria-labelledby="download-title">
      <motion.div className={styles.downloadContent} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.65 }}>
        <span className={styles.eyebrow}><span aria-hidden="true" />Your calmer desktop starts here</span>
        <h2 id="download-title">One window.<br /><span>Everything in reach.</span></h2>
        <p>Bring every account, unread, browser tab, and workspace<br className={styles.desktopBreak} /> into one focused desktop.</p>
        <button type="button" className={styles.downloadButton} onClick={openDownload}>Download ArcticSwitch<span><Arrow /></span></button>
        <div className={styles.platforms} aria-label="Available for Windows, macOS, and Linux">
          <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m2 4 7-1v6H2zm8-1.2 8-1.3V9h-8zM2 10h7v6l-7-1zm8 0h8v7.5l-8-1.3z" /></svg>Windows</span>
          <i aria-hidden="true" />
          <span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13.1 4.3c.7-.8 1-1.8.9-2.8-1 .1-2 .6-2.6 1.3-.6.7-1 1.7-.9 2.6 1 .1 1.9-.4 2.6-1.1ZM16.4 14.5c-.4.9-.6 1.3-1.1 2.1-.7 1-1.7 2.3-2.9 2.3-1.1 0-1.4-.7-2.9-.7-1.4 0-1.8.7-2.9.7-1.2 0-2.1-1.2-2.8-2.2C1.8 13.8 1.4 9.4 2.7 7.3 3.6 5.8 5 5 6.3 5c1.3 0 2.1.7 3.2.7 1 0 1.6-.7 3.2-.7 1.2 0 2.5.7 3.3 1.7-2.9 1.6-2.4 5.8.4 7.8Z" /></svg>macOS</span>
          <i aria-hidden="true" />
          <span><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="3" /><path d="m6 7 3 3-3 3m5 0h3" /></svg>Linux</span>
        </div>
      </motion.div>
    </section>

    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <p>Every account.<br /><span>One calm workspace.</span></p>
        <nav aria-label="Footer navigation"><a href="#product">Product</a><a href="#features">Features</a><a href="#security">Privacy</a></nav>
        <a className={styles.backToTop} href="#home"><span>Back to top</span><span className={styles.upCircle}><Arrow up /></span></a>
      </div>
      <motion.a href="#home" aria-label="ArcticSwitch home" className={styles.wordmark} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0 : 0.7 }}>
        <Image src="/arctic-switch-logo%20(1).svg" width={2048} height={306} alt="ArcticSwitch" unoptimized />
      </motion.a>
      <div className={styles.footerBottom}><small>© 2026 ArcticSwitch</small><span>A little less switching. A lot more focus.</span><span className={styles.signature}><i aria-hidden="true" />Designed for your day</span></div>
    </footer>
  </div>;
}
