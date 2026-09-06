import ScrollHero from './ScrollHero';
import ScrollProgress from './ScrollProgress';
import ProductSections from './ProductSections';
import ClosingSections from './ClosingSections';
import SiteNav from './SiteNav';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <ScrollProgress />
      <SiteNav />
      <ScrollHero />

      <ProductSections />

      <ClosingSections />
    </main>
  );
}
