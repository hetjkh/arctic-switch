'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './StarBackground.module.css';

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function readThemeColor() {
  return document.documentElement.dataset.theme === 'light' ? '#000000' : '#ffffff';
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 0, h: 0 });
  const frame = useRef(0);
  const paused = useRef(false);
  const reduced = useRef(false);
  const rgb = useRef<[number, number, number]>([255, 255, 255]);
  const [color, setColor] = useState('#ffffff');

  const quantity = 50;
  const ease = 80;
  const staticity = 50;

  useEffect(() => {
    const sync = () => setColor(readThemeColor());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    rgb.current = hexToRgb(color);
  }, [color]);

  const circleParams = useCallback((): Circle => ({
    x: Math.random() * size.current.w,
    y: Math.random() * size.current.h,
    translateX: 0,
    translateY: 0,
    size: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.8 + 0.2,
    targetAlpha: Math.random() * 0.8 + 0.2,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    magnetism: 0.1 + Math.random() * 4,
  }), []);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (!ctx.current) return;
    const [r, g, b] = rgb.current;
    ctx.current.save();
    ctx.current.translate(circle.translateX, circle.translateY);
    ctx.current.beginPath();
    ctx.current.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.current.shadowBlur = 6;
    ctx.current.shadowColor = `rgba(${r}, ${g}, ${b}, ${circle.alpha})`;
    ctx.current.fillStyle = `rgba(${r}, ${g}, ${b}, ${circle.alpha})`;
    ctx.current.fill();
    ctx.current.restore();
    if (!update) circles.current.push(circle);
  }, []);

  const resize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current || !ctx.current) return;
    const dpr = window.devicePixelRatio || 1;
    circles.current = [];
    size.current.w = containerRef.current.offsetWidth;
    size.current.h = containerRef.current.offsetHeight;
    canvasRef.current.width = size.current.w * dpr;
    canvasRef.current.height = size.current.h * dpr;
    canvasRef.current.style.width = `${size.current.w}px`;
    canvasRef.current.style.height = `${size.current.h}px`;
    ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = 0; i < quantity; i += 1) drawCircle(circleParams());
  }, [circleParams, drawCircle]);

  const remap = (value: number, start1: number, end1: number, start2: number, end2: number) =>
    Math.max(((value - start1) * (end2 - start2)) / (end1 - start1) + start2, 0);

  const animate = useCallback(function animateFrame() {
    if (paused.current || reduced.current) {
      frame.current = requestAnimationFrame(animateFrame);
      return;
    }
    ctx.current?.clearRect(0, 0, size.current.w, size.current.h);
    const time = Date.now() / 1000;

    circles.current.forEach((circle, index) => {
      const edges = [
        circle.x + circle.translateX - circle.size,
        size.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        size.current.h - circle.y - circle.translateY - circle.size,
      ];
      const factor = Number(remap(Math.min(...edges), 0, 20, 0, 1).toFixed(2));
      circle.alpha = circle.targetAlpha * (0.5 + Math.sin(time * circle.twinkleSpeed + circle.twinkleOffset) * 0.5) * factor;
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);

      if (
        circle.x < -circle.size
        || circle.x > size.current.w + circle.size
        || circle.y < -circle.size
        || circle.y > size.current.h + circle.size
      ) {
        circles.current.splice(index, 1);
        drawCircle(circleParams());
      }
    });

    frame.current = requestAnimationFrame(animateFrame);
  }, [circleParams, drawCircle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    ctx.current = canvas.getContext('2d');
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    if (!reduced.current) frame.current = requestAnimationFrame(animate);

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left - size.current.w / 2;
      mouse.current.y = event.clientY - rect.top - size.current.h / 2;
    };
    const onVisibility = () => {
      paused.current = document.hidden;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(frame.current);
    };
  }, [color, animate, resize]);

  return (
    <div ref={containerRef} className={styles.stars} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
