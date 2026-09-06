'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './page.module.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
);

export default function ScrollHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className={styles.hero} id="home" ref={rootRef}>
      <div className={styles.heroSky} aria-hidden="true">
        <video className={styles.heroVideo} autoPlay={!reduced} muted loop playsInline preload="metadata" poster="/images/hero-sky.jpg">
          {!reduced && <source src="/images/video.mp4" type="video/mp4" />}
        </video>
      </div>
      <div className={styles.heroCopy}>
        <span className={styles.heroEyebrow}><i aria-hidden="true" /> A little less switching. A lot more focus.</span>
        <h1>Every account.<br /><span>One calm workspace.</span></h1>
        <p>Your apps, messages, and accounts. Finally together.<br className={styles.desktopBreak} /> A little room to breathe. A better way to work.</p>
        <div className={styles.heroActions}>
          <a className={styles.primaryButton} href="#download">Download for free <Arrow /></a>
          <a className={styles.secondaryButton} href="#features">Explore the workspace <Arrow /></a>
        </div>
      </div>
      <motion.div className={styles.productStage} id="product" style={reduced ? undefined : { y: imageY }}>
        <div className={styles.productHalo} aria-hidden="true" />
        <Image src="/images/black.png" alt="ArcticSwitch dashboard displayed on a landscape tablet" width={1536} height={1024} className={styles.productImage} priority sizes="(max-width: 800px) 100vw, 1100px" />
      </motion.div>
      <div className={styles.appStrip}>
        <span>Your everyday apps. A shared home.</span>
        <div>{['whatsapp', 'gmail', 'slack', 'linkedin'].map((app) => <Image key={app} src={`/images/${app}.svg`} width={26} height={26} alt={app === 'gmail' ? 'Gmail' : app === 'whatsapp' ? 'WhatsApp' : app === 'linkedin' ? 'LinkedIn' : 'Slack'} />)}<span>+ your favorites</span></div>
      </div>
    </section>
  );
}
