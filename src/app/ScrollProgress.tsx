'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useLenis } from 'lenis/react';
import styles from './page.module.css';

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  useLenis((lenis) => {
    progress.set(lenis.progress);
  });

  return (
    <div className={styles.scrollProgress} aria-hidden="true">
      <motion.div
        className={styles.scrollProgressBar}
        style={{ scaleX: reduceMotion ? progress : scaleX }}
      />
    </div>
  );
}
