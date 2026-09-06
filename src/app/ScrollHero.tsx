'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDownloadModal } from '../components/DownloadModal';
import styles from './page.module.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

const apps = [
  { file: 'whatsapp', label: 'WhatsApp' },
  { file: 'gmail', label: 'Gmail' },
  { file: 'slack', label: 'Slack' },
  { file: 'linkedin', label: 'LinkedIn' },
];

export default function ScrollHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { openDownload } = useDownloadModal();
  const [narrow, setNarrow] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const media = window.matchMedia('(max-width: 560px)');
    const syncWidth = () => setNarrow(media.matches);
    syncWidth();
    media.addEventListener('change', syncWidth);

    const syncTheme = () => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      media.removeEventListener('change', syncWidth);
      observer.disconnect();
    };
  }, []);

  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const light = lightVideoRef.current;
    const dark = darkVideoRef.current;
    if (reduced) {
      light?.pause();
      dark?.pause();
      return;
    }
    if (theme === 'light') {
      void light?.play().catch(() => undefined);
      dark?.pause();
    } else {
      void dark?.play().catch(() => undefined);
      light?.pause();
    }
  }, [theme, reduced]);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.28 });

  const videoOpacity = useTransform(progress, [0, 0.28, 0.52], [1, 1, 0]);
  const heroOpacity = useTransform(progress, [0, 0.16, 0.31], [1, 1, 0]);
  const heroY = useTransform(progress, [0, 0.31], [0, -72]);
  const sceneOpacity = useTransform(progress, [0.3, 0.52], [0, 1]);
  const copyOpacity = useTransform(progress, [0.38, 0.53], [0, 1]);
  const copyY = useTransform(progress, [0.38, 0.55], [48, 0]);
  const deviceScale = useTransform(progress, [0, 0.22, 0.54], [0.88, 0.98, narrow ? 0.8 : 0.66]);
  const deviceX = useTransform(progress, [0, 0.34, 0.56, 1], narrow ? ['0vw', '0vw', '0vw', '0vw'] : ['0vw', '0vw', '18vw', '18vw']);
  const deviceY = useTransform(progress, [0, 0.2, 0.5], [narrow ? '10vh' : '6vh', '0vh', narrow ? '-12vh' : '-24vh']);
  const cueOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 1, 0]);

  return (
    <>
      <section className={`${styles.hero} ${reduced ? styles.reducedHero : ''}`} id="home" ref={rootRef}>
        <div className={styles.heroSticky}>
          <motion.div
            className={styles.heroSky}
            aria-hidden="true"
            style={reduced ? undefined : { opacity: videoOpacity }}
          >
            <video
              ref={lightVideoRef}
              className={`${styles.heroVideo} ${theme === 'light' ? styles.heroVideoActive : ''}`}
              autoPlay={!reduced && theme === 'light'}
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero-sky.jpg"
            >
              {!reduced && <source src="/images/video.mp4" type="video/mp4" />}
            </video>
            <video
              ref={darkVideoRef}
              className={`${styles.heroVideo} ${theme === 'dark' ? styles.heroVideoActive : ''}`}
              autoPlay={!reduced && theme === 'dark'}
              muted
              loop
              playsInline
              preload="auto"
            >
              {!reduced && <source src="/dark.mp4" type="video/mp4" />}
            </video>
          </motion.div>

          <motion.div
            className={styles.storyBackdrop}
            aria-hidden="true"
            style={reduced ? undefined : { opacity: sceneOpacity }}
          />

          <div className={styles.navSpacer} aria-hidden="true" />

          <motion.div
            className={styles.heroCopy}
            style={reduced ? undefined : { opacity: heroOpacity, y: heroY }}
          >
            <span className={styles.heroEyebrow}><i aria-hidden="true" /> A little less switching. A lot more focus.</span>
            <h1>Every account.<br /><span>One calm workspace.</span></h1>
            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={openDownload}>Download for free <Arrow /></button>
              <a className={styles.secondaryButton} href="#features">Explore the workspace <Arrow /></a>
            </div>
          </motion.div>

          <motion.div
            className={styles.storyCopy}
            style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}
          >
            <span className={styles.storyKicker}><i /> Designed for focused work</span>
            <h2><span>Your whole day.</span> <span>One focused view.</span></h2>
            <p>
              Keep every account signed in and organized. Move between conversations,
              projects, and workspaces without losing your place.
            </p>
            <div className={styles.storyActions}>
              <button type="button" className={styles.storyPrimary} onClick={openDownload}>Download for free <Arrow /></button>
              <a className={styles.storySecondary} href="#features">Explore features</a>
            </div>
            <div className={styles.storyPoints}>
              <span><i /> Persistent sessions</span>
              <span><i /> Split view</span>
              <span><i /> Unified inbox</span>
            </div>
          </motion.div>

          <div className={styles.scrollDeviceAnchor} id="product">
            <motion.div
              className={styles.productStage}
              style={reduced ? undefined : { scale: deviceScale, x: deviceX, y: deviceY }}
            >
              <div className={styles.productHalo} aria-hidden="true" />
              <Image
                src="/images/black.png"
                alt="ArcticSwitch dashboard displayed on a landscape tablet"
                width={1536}
                height={1024}
                className={styles.productImage}
                priority
                sizes="(max-width: 800px) 100vw, 1100px"
              />
            </motion.div>
          </div>

          <motion.div
            className={styles.scrollCue}
            aria-hidden="true"
            style={reduced ? undefined : { opacity: cueOpacity }}
          >
            <i /> Scroll to explore
          </motion.div>
        </div>
      </section>

      <div className={styles.appStrip}>
        <span>Your everyday apps. A shared home.</span>
        <div>
          {apps.map((app) => (
            <Image key={app.file} src={`/images/${app.file}.svg`} width={26} height={26} alt={app.label} />
          ))}
          <span>+ your favorites</span>
        </div>
      </div>
    </>
  );
}
