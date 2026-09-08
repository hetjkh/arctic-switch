import Image from 'next/image';
import s from './WorkflowSection.module.css';

const customers = [
  { name: 'WhatsApp', src: '/images/whatsapp.svg' },
  { name: 'Gmail', src: '/images/gmail.svg' },
  { name: 'Slack', src: '/images/slack.svg' },
  { name: 'LinkedIn', src: '/images/linkedin.svg' },
];

export default function WorkflowSection() {
  return (
    <section className={s.section} aria-labelledby="workflow-heading">
      <h2 id="workflow-heading">Optimize Your Workflow</h2>
      <div className={s.grid}>
        <article className={`${s.card} ${s.remote}`}>
          <span className={s.kicker}>EVERY ACCOUNT. ONE HOME.</span>
          <h3>Remote Work<br />Enablement</h3>
          <p><span aria-hidden="true">✦</span> A calmer home for every workday.</p>
          <strong className={s.vertical}>We&apos;re Loved</strong>
          <Image src="/images/dashboard-tablet-v2-Photoroom.png" alt="ArcticSwitch workspace dashboard" width={1536} height={1024} sizes="(max-width: 700px) 620px, 690px" />
        </article>

        <article className={`${s.card} ${s.help}`}>
          <span className={s.kicker}>SIDE BY SIDE. IN SYNC.</span>
          <h3>Help Systems</h3>
          <div className={s.gauge}>
            <svg viewBox="0 0 280 150" fill="none" aria-hidden="true"><path d="M20 137a120 120 0 0 1 240 0" stroke="#ffffff24" strokeWidth="12" strokeLinecap="round" /><path d="M20 137a120 120 0 0 1 229-51" stroke="url(#arc)" strokeWidth="12" strokeLinecap="round" /><defs><linearGradient id="arc" x1="20" y1="137" x2="252" y2="80"><stop stopColor="#80b9e4" /><stop offset="1" stopColor="#fff" /></linearGradient></defs></svg>
            <div><strong>95%</strong><span>LESS APP SWITCHING</span></div>
          </div>
          <p>Keep the conversation beside the work.</p>
        </article>

        <article className={`${s.card} ${s.loyal}`}>
          <span className={s.kicker}>YOUR EVERYDAY ESSENTIALS</span>
          <strong className={s.number}>30<span>+</span></strong>
          <h3>Apps, together at last.</h3>
          <p>Bring every tool and account into one calm workspace.</p>
          <div className={s.bubbles}>{customers.map(app => <span key={app.name}><Image src={app.src} alt={app.name} width={28} height={28} /></span>)}<a href="#integrations" aria-label="Explore all integrations">+</a></div>
        </article>

        <article className={`${s.card} ${s.saving}`}>
          <div className={s.flow} aria-hidden="true"><i /><i /><i /></div>
          <div><span className={s.kicker}>PICK UP WHERE YOU LEFT OFF</span><small>Up to</small><h3>Time Saving</h3><p>Your sessions stay ready, so your focus can too.</p></div>
        </article>

        <a className={`${s.card} ${s.logo}`} href="#download" aria-label="Get ArcticSwitch"><span>↗</span><Image src="/images/logo-black.png" alt="" width={92} height={92} /><strong>Find your flow.</strong></a>
      </div>
    </section>
  );
}
