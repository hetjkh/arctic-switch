'use client';

import Image from 'next/image';
import { useDownloadModal } from '../components/DownloadModal';
import s from './AchievementsSection.module.css';

function Arrow() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>;
}

export default function AchievementsSection() {
  const { openDownload } = useDownloadModal();

  return (
    <section className={s.section} aria-labelledby="achievements-heading">
      <div className={s.photo}>
        <Image src="/images/arctic-team-workspace.png" alt="A team having a focused conversation in a calm workspace" fill sizes="(max-width: 800px) calc(100vw - 48px), 48vw" />
        <span className={s.photoLabel}><i /> BUILT FOR BETTER WORKDAYS</span>
      </div>

      <div className={s.content}>
        <span className={s.eyebrow}>Made for the way you work</span>
        <h2 id="achievements-heading">A calmer workspace<br />that <em>keeps up with you.</em></h2>
        <p className={s.intro}>Bring your conversations, accounts, and everyday tools into one focused desktop. Everything stays ready, organized, and close at hand.</p>
        <button className={s.download} type="button" onClick={openDownload}>Download ArcticSwitch<span><Arrow /></span></button>

        <div className={s.stats}>
          <div><span>One focused view</span><strong>4<small> apps</small></strong><p>Work comfortably side by side without losing your place.</p></div>
          <div><span>Your everyday toolkit</span><strong>30<small>+</small></strong><p>Bring familiar apps and custom URLs into one workspace.</p></div>
        </div>
      </div>
    </section>
  );
}
