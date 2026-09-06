'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import 'lenis/dist/lenis.css';

function AnchorScroll() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const el = document.querySelector(hash);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -120, duration: reduced ? 0 : 1.15, immediate: !!reduced });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis, reduced]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        smoothWheel: !reduced,
        touchMultiplier: 1.4,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
