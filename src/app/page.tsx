import Image from 'next/image';
import ScrollHero from './ScrollHero';
import ProductSections from './ProductSections';
import ClosingSections from './ClosingSections';
import styles from './page.module.css';

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

export default function Home() {
  return (
    <main className={styles.page}>
        <nav
          className={styles.nav}
          aria-label="Primary navigation"
        >
          <a className={`${styles.brand} ${styles.navBrand}`} href="#home" aria-label="ArcticSwitch home">
            <Image src="/arctic-switch-wordmark.png" width={7218} height={1080} alt="ArcticSwitch" priority />
          </a>
          <div className={styles.navLinks}>
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#download">Download</a>
          </div>
          <a className={styles.navCta} href="#download">
            Get ArcticSwitch <Arrow />
          </a>
        </nav>
      <ScrollHero />

      <ProductSections />

      <ClosingSections />
    </main>
  );
}
