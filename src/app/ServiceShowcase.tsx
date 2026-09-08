'use client';

import Image from 'next/image';
import { useState } from 'react';
import s from './ServiceShowcase.module.css';

const services = [
  { title: 'Separate Account Spaces', description: 'Keep work, personal, client, and creator accounts in distinct spaces while every session stays signed in and ready.', badge: 'Spaces', stat: '01', image: '/images/service-account-spaces.png' },
  { title: 'Unified Conversations', description: 'See the messages that need you across your connected apps, gathered into one focused inbox.', badge: 'Inbox', stat: '02', image: '/images/service-unified-inbox.png' },
  { title: 'Multi-App Split View', description: 'Place up to four tools side by side so the conversation, brief, and work stay in sight together.', badge: 'Split view', stat: '03', image: '/images/service-split-view.png' },
  { title: 'Instant Workspace Search', description: 'Jump directly to an app, account, workspace, or conversation with one quick search.', badge: 'Quick find', stat: '04', image: '/images/service-workspace-search.png' },
  { title: 'Private Session Protection', description: 'Use separate persistent sessions and service locks to keep sensitive accounts comfortably protected.', badge: 'Protected', stat: '05', image: '/images/service-session-protection.png' },
];

export default function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const selected = services[active];

  return (
    <section className={s.section} aria-labelledby="service-showcase-heading">
      <header className={s.heading}>
        <span>Our services</span>
        <h2 id="service-showcase-heading">Explore everything<br /><em>ArcticSwitch brings together.</em></h2>
        <p>Five thoughtful ways to make your desktop calmer,<br />your accounts clearer, and your day easier to navigate.</p>
      </header>

      <div className={s.layout}>
        <div className={s.visual}>
          <div className={s.screen}>
            <Image key={selected.image} src={selected.image} alt={`ArcticSwitch ${selected.title} interface`} width={1704} height={923} unoptimized />
          </div>
        </div>

        <div className={s.list} aria-label="ArcticSwitch services">
          {services.map((service, index) => (
            <button key={service.title} type="button" className={index === active ? s.active : ''} onClick={() => setActive(index)} aria-pressed={index === active}>
              <span className={s.number}>{service.stat}</span>
              <span className={s.copy}><strong>{service.title}</strong>{index === active && <span>{service.description}</span>}</span>
              <span className={s.arrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
