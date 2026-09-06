import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const gilroy = localFont({
  src: [
    { path: '../../public/gilroy-font/Gilroy-FREE/Gilroy-Light.otf', weight: '300', style: 'normal' },
    { path: '../../public/gilroy-font/Gilroy-FREE/Gilroy-ExtraBold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ArcticSwitch — Every account. One calm workspace.',
  description:
    'Manage messaging, email, work apps, unread messages, and isolated account sessions from one focused desktop workspace.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gilroy.variable}>
      <body>{children}</body>
    </html>
  );
}
