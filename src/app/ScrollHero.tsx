'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './page.module.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

export default function ScrollHero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
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
  const deviceScale = useTransform(progress, [0, 0.22, 0.54], [0.82, 0.96, 0.66]);
  const deviceX = useTransform(progress, [0, 0.34, 0.56, 1], ['0vw', '0vw', '18vw', '18vw']);
  const deviceY = useTransform(progress, [0, 0.2, 0.5], ['28vh', '18vh', '8vh']);
  const cueOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 1, 0]);

  return (
    <section className={`${styles.hero} ${reduceMotion ? styles.reducedHero : ''}`} id="home" ref={rootRef}>
      <div className={styles.heroSticky}>
        <motion.div
          className={styles.heroSky}
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: videoOpacity }}
        >
          <video className={styles.heroVideo} autoPlay muted loop playsInline preload="auto">
            <source src="/images/video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div
          className={styles.storyBackdrop}
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: sceneOpacity }}
        />

        <div className={styles.navSpacer} aria-hidden="true" />

        <motion.div
          className={styles.heroCopy}
          style={reduceMotion ? undefined : { opacity: heroOpacity, y: heroY }}
        >
          <h1>Every account.<br /><span>One calm workspace.</span></h1>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#download">
              Download for free <Arrow />
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.storyCopy}
          style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
        >
          <span className={styles.storyKicker}><i /> Designed for focused work</span>
          <h2><span>Your whole day.</span>{' '}<span>One focused view.</span></h2>
          <p>
            Keep every account signed in and organized. Move between conversations,
            projects, and workspaces without losing your place.
          </p>
          <div className={styles.storyActions}>
            <a className={styles.storyPrimary} href="#download">Download for free <Arrow /></a>
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
            style={reduceMotion ? undefined : {
              scale: deviceScale,
              x: deviceX,
              y: deviceY,
            }}
          >
            <div className={styles.productHalo} aria-hidden="true" />
            <Image
              src="/images/black.png"
              alt="ArcticSwitch dashboard displayed on a landscape tablet"
              width={1536}
              height={1024}
              className={styles.productImage}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 94vw, 1240px"
            />
          </motion.div>
        </div>

        <motion.div
          className={styles.scrollCue}
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: cueOpacity }}
        >
          <i /> Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
