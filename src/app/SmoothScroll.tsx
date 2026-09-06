'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import 'lenis/dist/lenis.css';

function AnchorScroll() {
  const lenis = useLenis();

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
      lenis.scrollTo(el as HTMLElement, { offset: -24, duration: 1.15 });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.4,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
