import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Keep Turbopack rooted on this app (parent monorepo has another lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
