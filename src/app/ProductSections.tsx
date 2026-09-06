'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import styles from './ProductSections.module.css';

const apps = [
  { name: 'WhatsApp', icon: 'whatsapp', title: 'Design team', message: 'The latest review is ready.', count: 4 },
  { name: 'Gmail', icon: 'gmail', title: 'Client updates', message: 'Three new replies to your proposal.', count: 3 },
  { name: 'Slack', icon: 'slack', title: 'Product', message: 'You were mentioned in #launch.', count: 1 },
  { name: 'LinkedIn', icon: 'linkedin', title: 'Your network', message: 'Keep the conversation moving.', count: 0 },
];

const features = [
  { label: 'Split view', title: 'Better together.\nAll in view.', description: 'Open two, three, or four services at once. Compare, reply, and move information without losing your place.', note: 'A workspace that adapts to the task.' },
  { label: 'Unified inbox', title: 'Every unread.\nOne clear place.', description: 'Filter messages by app, account, or workspace and jump straight into the conversation.', note: 'Less checking. More staying in the loop.' },
  { label: 'Global search', title: 'Your next move.\nOne shortcut away.', description: 'Find a workspace, account, setting, or web search with Ctrl K.', note: 'Everything you need, within reach.' },
  { label: 'Persistent sessions', title: 'Pick up exactly\nwhere you left off.', description: 'Each account keeps its own cookies, history, and login, whether it is active or waiting in another workspace.', note: 'Separate accounts. A continuous workflow.' },
];

const capabilities = [
  { icon: 'keys', title: 'Keyboard switching', text: 'Move between services without breaking your rhythm.', detail: 'Use Ctrl Tab to move between services like a native app switcher.', tag: 'Ctrl Tab' },
  { icon: 'window', title: 'Pop-out windows', text: 'Give any service a screen of its own.', detail: 'Detach a service for a second monitor, then bring it back into your workspace.', tag: 'More room' },
  { icon: 'tabs', title: 'Browser tabs', text: 'Go deeper, without leaving your account.', detail: 'Open up to six pages inside a service while keeping the same account session.', tag: 'Up to 6 tabs' },
  { icon: 'plus', title: 'Any web app', text: 'Your tools belong here. Even the custom ones.', detail: 'Add any custom URL alongside the built-in catalog of messaging and work apps.', tag: 'Any URL' },
  { icon: 'user', title: 'Google account chooser', text: 'The right account, in the right tab.', detail: 'Reuse Google sign-in while keeping each Gmail tab on the account you chose.', tag: 'Stay organized' },
  { icon: 'terminal', title: 'SSH workspaces', text: 'Keep terminal work beside the rest of your day.', detail: 'Connect to saved servers and manage terminal sessions alongside your everyday services.', tag: 'Built in' },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    keys: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M7 9h1m4 0h1m4 0h1M7 13h1m4 0h1m4 0h1M8 16h8" /></>,
    window: <><path d="M13 3h8v8m0-8-10 10" /><path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>,
    tabs: <><rect x="3" y="6" width="18" height="15" rx="3" /><path d="M7 3h10M3 11h18M9 6v5" /></>,
    plus: <><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 8v8m-4-4h8" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Reveal({ children, className, id }: { children: ReactNode; className: string; id?: string }) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.6 }}>
    <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.6 }}>{children}</motion.div>
  </motion.section>;
}

function AppIcon({ index }: { index: number }) {
  return <Image src={`/images/${apps[index].icon}.svg`} width={24} height={24} alt="" />;
}

function FeaturePreview({ active }: { active: number }) {
  const [panes, setPanes] = useState(4);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [workspace, setWorkspace] = useState('Work');
  const [selected, setSelected] = useState('');
  const reduced = useReducedMotion();
  const results = ['Work workspace', 'Gmail · Finance', 'WhatsApp · Personal', 'Account settings'].filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return <div className={styles.preview}>
    <div className={styles.windowBar}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span>My workspace</span><span className={styles.previewLabel}>Interactive preview</span></div>
    <AnimatePresence mode="wait">
      <motion.div className={styles.previewBody} key={active} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
        {active === 0 && <>
          <div className={styles.previewToolbar}><strong>Everything, side by side</strong><div className={styles.segments} aria-label="Number of panes">{[2, 3, 4].map(n => <button key={n} onClick={() => setPanes(n)} aria-pressed={panes === n}>{n} panes</button>)}</div></div>
          <div className={styles.paneGrid} data-panes={panes}>{apps.slice(0, panes).map((app, index) => <motion.div layout={!reduced} key={app.name} className={styles.appPane}>
            <div className={styles.paneHeader}><AppIcon index={index} /><strong>{app.name}</strong><span>•••</span></div>
            <div className={styles.paneContent}><small>{index % 2 ? 'YOUR WORKSPACE' : 'TEAM CONVERSATION'}</small><strong>{app.title}</strong><p>{app.message}</p><div className={styles.skeleton} aria-hidden="true"><i /><i /><i /></div><span className={styles.paneStatus}><i /> Session active</span></div>
          </motion.div>)}</div>
        </>}
        {active === 1 && <>
          <div className={styles.previewToolbar}><strong>Inbox <span className={styles.count}>8</span></strong><span>Across your accounts</span></div>
          <div className={styles.filters}>{['All', 'WhatsApp', 'Gmail', 'Slack'].map(name => <button key={name} aria-pressed={filter === name} onClick={() => { setFilter(name); setSelected(''); }}>{name}</button>)}</div>
          <div className={styles.inboxRows}>{apps.slice(0, 3).filter(app => filter === 'All' || app.name === filter).map(app => <button className={styles.inboxRow} key={app.name} onClick={() => setSelected(app.name)} aria-expanded={selected === app.name}><AppIcon index={apps.indexOf(app)} /><span><strong>{app.title}</strong><small>{app.message}</small>{selected === app.name && <span className={styles.messageDetail}>Conversation preview · {app.name}<br />You’re up to date with the latest message.</span>}</span><b>{app.count}</b></button>)}</div>
          <p className={styles.previewHint}>Select an app to filter your inbox.</p>
        </>}
        {active === 2 && <>
          <label className={styles.searchLabel} htmlFor="feature-search">Find your next destination</label>
          <div className={styles.searchBox}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><input id="feature-search" value={query} onChange={event => { setQuery(event.target.value); setSelected(''); }} placeholder="Try Gmail, Work, or settings…" /><kbd>Ctrl K</kbd></div>
          <div className={styles.results}>{results.map((result, index) => <button key={result} onClick={() => setSelected(result)}><span className={styles.resultIcon}><Icon name={index === 3 ? 'user' : 'window'} /></span><span>{result}</span><span aria-hidden="true">↗</span></button>)}{!results.length && <p>No matches. Try “Gmail” or “Work”.</p>}</div>
          <p className={styles.previewHint} role="status">{selected ? `Selected: ${selected}` : 'Search across workspaces, services, and settings.'}</p>
        </>}
        {active === 3 && <>
          <div className={styles.previewToolbar}><strong>Your accounts, ready to go</strong></div>
          <div className={styles.filters}>{['Work', 'Personal'].map(name => <button key={name} aria-pressed={workspace === name} onClick={() => setWorkspace(name)}>{name}</button>)}</div>
          <div className={styles.sessionList}>{(workspace === 'Work' ? [1, 2, 3] : [0, 1]).map(index => <div key={index}><AppIcon index={index} /><span><strong>{apps[index].name}</strong><small>{workspace} account · Separate session</small></span><span className={styles.sessionBadge}><i /> Signed in</span></div>)}</div>
          <p className={styles.previewHint}>Switch workspaces. Your sessions stay ready.</p>
        </>}
      </motion.div>
    </AnimatePresence>
  </div>;
}

export default function ProductSections() {
  const [active, setActive] = useState(0);
  const [settings, setSettings] = useState([true, true, false]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const settingItems = [
    { name: 'Service lock', description: 'An extra layer for private accounts.' },
    { name: 'Ad & pop-up blocker', description: 'Keep distractions outside your workspace.' },
    { name: 'Background notifications', description: 'Stay informed when the window is closed.' },
  ];

  return <div className={styles.sections}>
    <Reveal className={styles.stats}>
      <div className={styles.statsGrid}>{[['30+', 'Apps, ready to add'], ['4', 'Panes in one view'], ['6', 'Tabs in every service'], ['1', 'Inbox for every unread']].map(([number, label]) => <div key={label}><strong>{number}<span aria-hidden="true">.</span></strong><span>{label}</span></div>)}</div>
    </Reveal>

    <Reveal className={styles.features} id="features">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>01 / Built around your day</span><h2>Less window juggling.<br /><span>More work in view.</span></h2></div><p>The controls of a browser, an inbox, and a workspace manager. Together in one focused desktop.</p></div>
      <div className={styles.featureTabs} aria-label="Explore features">{features.map((feature, index) => <button key={feature.label} aria-pressed={active === index} aria-controls="feature-panel" onClick={() => setActive(index)}><span>0{index + 1}</span>{feature.label}{active === index && <motion.i layoutId="feature-underline" transition={{ duration: reduced ? 0 : 0.25 }} />}</button>)}</div>
      <div className={styles.featurePanel} id="feature-panel">
        <div className={styles.featureCopy}><span className={styles.eyebrow}>{features[active].label}</span><h3>{features[active].title}</h3><p>{features[active].description}</p><span className={styles.featureNote}><span aria-hidden="true">✓</span>{features[active].note}</span></div>
        <FeaturePreview active={active} />
      </div>
    </Reveal>

    <Reveal className={styles.security} id="security">
      <div className={styles.securityGrid}>
        <div className={styles.securityCopy}><span className={styles.eyebrow}>02 / Control without friction</span><h2>Your workspace.<br /><span>Your boundaries.</span></h2><p>Lock sensitive services, block distractions, and choose which notifications can reach you.</p><div className={styles.benefits}>{[
          ['Separate by default', 'Every service runs in its own persistent partition.'],
          ['Lock account by account', 'Add a PIN to any service that needs another layer.'],
          ['Choose your interruptions', 'Control app-wide and background notifications.'],
        ].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><p><strong>{title}</strong>{text}</p></div>)}</div></div>
        <div className={styles.settingsCard}><div className={styles.settingsTitle}><span className={styles.lockIcon}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></svg></span><div><span className={styles.eyebrow}>Make room for focus</span><h3>Privacy & control</h3></div></div><p className={styles.settingsIntro}>A few small choices. A workspace that feels yours.</p><div>{settingItems.map((item, index) => <div className={styles.setting} key={item.name}><span><strong id={`setting-${index}`}>{item.name}</strong><small>{item.description}</small></span><button type="button" className={styles.switch} role="switch" aria-checked={settings[index]} aria-labelledby={`setting-${index}`} onClick={() => setSettings(previous => previous.map((value, i) => i === index ? !value : value))}><span /></button></div>)}</div><div className={styles.settingsFoot}><span className={styles.statusDot} />Interactive preview<span>Try the switches</span></div></div>
      </div>
    </Reveal>

    <Reveal className={styles.capabilities}>
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>03 / Desktop power, quietly built in</span><h2>Small controls.<br /><span>A much faster day.</span></h2></div><p>Thoughtful details that keep your day moving. Already built into ArcticSwitch.</p></div>
      <div className={styles.capabilityGrid}>{capabilities.map((item, index) => <article className={styles.capability} key={item.title}><div className={styles.capabilityTop}><Icon name={item.icon} /><span>{item.tag}</span></div><h3>{item.title}</h3><p>{item.text}</p><button aria-expanded={expanded === index} aria-controls={`capability-${index}`} onClick={() => setExpanded(expanded === index ? null : index)} aria-label={`${expanded === index ? 'Hide' : 'Explore'} ${item.title}`}><span>{expanded === index ? 'Close details' : 'Explore feature'}</span><span aria-hidden="true">{expanded === index ? '−' : '↗'}</span></button><div id={`capability-${index}`} hidden={expanded !== index} className={styles.capabilityDetail}>{item.detail}</div></article>)}</div>
    </Reveal>
  </div>;
}
