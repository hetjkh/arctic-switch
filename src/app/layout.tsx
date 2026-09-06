import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SmoothScroll from './SmoothScroll';
import StarBackground from '../components/StarBackground';
import './globals.css';

const spaceGrotesk = localFont({
  src: '../../public/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf',
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: '300 700',
});

const spaceMono = localFont({
  src: [
    { path: '../../public/Space_Mono/SpaceMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/Space_Mono/SpaceMono-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../../public/Space_Mono/SpaceMono-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/Space_Mono/SpaceMono-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ArcticSwitch — Every account. One calm workspace.',
  description:
    'Manage messaging, email, work apps, unread messages, and isolated account sessions from one focused desktop workspace.',
};

const themeInit = `(function(){try{var t=localStorage.getItem('arctic-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <StarBackground />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
