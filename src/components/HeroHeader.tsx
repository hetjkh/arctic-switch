import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroHeader.module.css';

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'Product', href: '#product', hasMenu: true },
  { label: 'Resources', href: '#resources', hasMenu: true },
  { label: 'Pricing', href: '#pricing' },
];

export default function HeroHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.sky} aria-hidden>
        <Image
          src="/images/hero-sky.jpg"
          alt=""
          fill
          priority
          className={styles.skyImg}
          sizes="100vw"
        />
        <div className={styles.skyWash} />
      </div>

      <div className={styles.shell}>
        <nav className={styles.nav} aria-label="Primary">
          <Link className={styles.brand} href="/">
            <Image
              src="/images/logo-black.png"
              alt=""
              width={40}
              height={40}
              className={styles.brandMark}
              priority
            />
            <span className={styles.brandName}>Arctic Switch</span>
          </Link>

          <div className={styles.pillNav}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.pillLink} ${link.active ? styles.pillLinkActive : ''}`}
              >
                {link.label}
                {link.hasMenu ? <span className={styles.chevron} aria-hidden /> : null}
              </a>
            ))}
          </div>

          <div className={styles.navActions}>
            <a className={styles.login} href="#login">
              Log in
            </a>
            <a className={styles.getStarted} href="#download">
              Get Started
            </a>
          </div>

          <button className={styles.menuBtn} type="button" aria-label="Open menu">
            <span />
          </button>
        </nav>

        <div className={styles.heroCopy}>
          <h1 className={styles.title}>Arctic Switch</h1>
          <p className={styles.tagline}>One desktop for every account</p>
          <p className={styles.support}>
            Keep WhatsApp, Gmail, and work apps in isolated workspaces—without
            switching windows.
          </p>

          <div className={styles.ctas}>
            <a className={styles.ctaPrimary} href="#download">
              Download for free
            </a>
            <a className={styles.ctaDark} href="#demo">
              <span className={styles.liveDot} aria-hidden />
              Watch product tour
            </a>
          </div>
        </div>

        <div className={styles.stage}>
          <Image
            src="/images/hero.png"
            alt="Arctic Switch dashboard on dual screens"
            width={1536}
            height={1024}
            className={styles.deviceImg}
            priority
            sizes="(max-width: 1100px) 110vw, 1240px"
          />
        </div>
      </div>
    </header>
  );
}
