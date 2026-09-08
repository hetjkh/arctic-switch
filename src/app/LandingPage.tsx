'use client';

import Image from 'next/image';
import wordmark from '../../public/arctic-switch-wordmark.png';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { DownloadProvider, useDownloadModal } from '../components/DownloadModal';
import s from './LandingPage.module.css';
import WorkflowSection from './WorkflowSection';
import ToolsSection from './ToolsSection';
import SolutionsSection from './SolutionsSection';
import AchievementsSection from './AchievementsSection';
import ServiceShowcase from './ServiceShowcase';

type IconName = 'arrow' | 'grid' | 'inbox' | 'search' | 'shield' | 'plus' | 'check' | 'split' | 'bolt' | 'globe' | 'command' | 'close' | 'menu' | 'chevron' | 'play' | 'settings';
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
    inbox: <><path d="m4 4-2 10v6h20v-6L20 4H4Z" /><path d="M2 14h6l2 3h4l2-3h6" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    split: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M12 4v16M3 9h18" /></>,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" />,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    command: <path d="M9 9V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V9Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    chevron: <path d="m8 5 7 7-7 7" />,
    play: <path d="m9 5 11 7-11 7V5Z" />,
    settings: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" fill="currentColor" /><circle cx="15" cy="17" r="3" fill="currentColor" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function Mark() { return <span className={s.mark} aria-hidden="true"><svg viewBox="0 0 30 30" fill="none"><path d="m15 2 13 13-13 13L2 15 15 2Z" fill="currentColor" /><path d="m9 19 6-11 6 11-6-3-6 3Z" fill="white" /><path d="M15 16v7" stroke="white" strokeWidth="1.5" /></svg></span>; }
function Brand({ navbar = false }: { navbar?: boolean }) { return <a className={s.brand} href="#home" aria-label="ArcticSwitch home">{navbar ? <Image className={s.wordmark} src={wordmark} alt="Arctic Switch" sizes="(max-width: 480px) 145px, 205px" preload /> : <><Mark /><span>Arctic<span>Switch</span></span></>}</a>; }
const apps = [
  { name: 'WhatsApp', file: 'whatsapp', color: '#f4f4f4', text: 'Team conversations', message: 'The new designs look amazing!', initials: 'JD', sender: 'Jamie Davis', time: '2 min ago' },
  { name: 'Gmail', file: 'gmail', color: '#f4f4f4', text: 'Your work inbox', message: 'A little update on the next launch.', initials: 'AL', sender: 'Alex Lee', time: '8 min ago' },
  { name: 'Slack', file: 'slack', color: '#ededed', text: 'Everything team-related', message: 'Ready when you are. Letâ€™s do this.', initials: 'MK', sender: 'Morgan Kim', time: '12 min ago' },
  { name: 'LinkedIn', file: 'linkedin', color: '#f2f2f2', text: 'Your professional world', message: 'Letâ€™s connect and build something.', initials: 'SR', sender: 'Sam Rivera', time: '24 min ago' },
];
function AppIcon({ index, size = 24 }: { index: number; size?: number }) { return <Image src={`/images/${apps[index].file}.svg`} alt="" width={size} height={size} />; }
function Reveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.section>;
}
function Eyebrow({ children }: { children: ReactNode }) { return <span className={s.eyebrow}><span />{children}</span>; }
function DownloadButton({ children = 'Get ArcticSwitch', secondary = false }: { children?: ReactNode; secondary?: boolean }) {
  const { openDownload } = useDownloadModal();
  return <button className={secondary ? s.darkButton : s.primaryButton} onClick={openDownload}>{children}<span className={s.buttonArrow}><Icon name="arrow" /></span></button>;
}
function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);
  return <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}><Brand navbar /><nav id="primary-menu" className={`${s.navLinks} ${open ? s.navOpen : ''}`} aria-label="Main navigation">{[['Product', '#product'], ['Features', '#features'], ['How it works', '#how-it-works'], ['FAQs', '#faq']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav><div className={s.navActions}><DownloadButton>Get the app</DownloadButton><button className={s.menuButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-menu" aria-label={open ? 'Close navigation' : 'Open navigation'}><Icon name={open ? 'close' : 'menu'} /></button></div></header>;
}

function WorkspaceDemo() {
  const [workspace, setWorkspace] = useState('Work');
  const [view, setView] = useState('Overview');
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !document.querySelector('dialog[open]')) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const visibleApps = (workspace === 'Work' ? apps : [apps[0], apps[1]]).filter(app => `${app.name} ${app.sender} ${app.message}`.toLowerCase().includes(query.toLowerCase()));
  const activeApp = selected !== null ? apps[selected] : null;
  return <div className={s.workspace} id="workspace-demo">
    <div className={s.windowTop}><span className={s.trafficLights}><i /><i /><i /></span><span><Mark /> ArcticSwitch</span><span className={s.demoTag}><i /> Interactive preview</span></div>
    <div className={s.workspaceBody}>
      <aside className={s.appRail} aria-label="Preview apps"><button className={s.railActive} aria-label="Show overview" onClick={() => { setView('Overview'); setSelected(null); }}><Icon name="grid" /></button>{apps.map((app, i) => <button key={app.name} aria-label={`Preview ${app.name}`} onClick={() => { setSelected(i); setView('Overview'); }}><AppIcon index={i} /></button>)}<a href="#integrations" aria-label="Explore more apps"><Icon name="plus" /></a><span /><button aria-label="Search your apps" onClick={() => searchRef.current?.focus()}><Icon name="search" /></button><div className={s.avatar}>Y</div></aside>
      <aside className={s.sidebar}><div className={s.workspaceSelect}><span className={s.workspaceLetter}>{workspace[0]}</span><span>My workspace<small>Make room for focus</small></span><Icon name="chevron" /></div><span className={s.sidebarLabel}>WORKSPACE</span>{(['Overview', 'Unified inbox', 'Split view'] as const).map((label, i) => <button key={label} className={view === label ? s.sideActive : ''} onClick={() => { setView(label); setSelected(null); }}><Icon name={(['grid', 'inbox', 'split'] as const)[i]} />{label}{i === 1 && <b>4</b>}</button>)}<span className={s.sidebarLabel}>YOUR SPACES</span>{['Work', 'Personal'].map((name, i) => <button key={name} className={workspace === name ? s.spaceActive : ''} aria-pressed={workspace === name} onClick={() => { setWorkspace(name); setSelected(null); }}><i style={{ background: i ? '#b7b7b7' : '#818181' }} />{name}<small>{i ? '2' : '4'}</small></button>)}<div className={s.sidebarFoot}><Icon name="shield" /><span>A little space.<br /><strong>A lot more focus.</strong></span></div></aside>
      <div className={s.dashboard}><div className={s.dashToolbar}><span>{workspace} workspace <Icon name="chevron" /> {view}</span><label><Icon name="search" /><input ref={searchRef} aria-label="Search preview apps" placeholder="Search anythingâ€¦" value={query} onChange={event => { setQuery(event.target.value); setSelected(null); }} /><kbd>âŒ˜ K</kbd></label></div><div className={s.dashHeading}><div><span className={s.dashEyebrow}>A FRESH SPACE FOR YOUR DAY</span><h3>{view === 'Unified inbox' ? 'All caught up. Almost.' : view === 'Split view' ? 'A little more perspective.' : `Good morning, ${workspace === 'Work' ? 'Alex' : 'you'} â˜€`}</h3><p>{view === 'Unified inbox' ? 'Every conversation that needs you, together.' : view === 'Split view' ? 'Your favorite tools, working side by side.' : 'Everything you need. Right where you left it.'}</p></div><span className={s.todayBadge}><i /> All systems calm</span></div>
        {activeApp ? <div className={s.conversation}><button onClick={() => setSelected(null)}><Icon name="arrow" />Back to workspace</button><div className={s.conversationHeading}><AppIcon index={selected!} size={34} /><div><h4>{activeApp.name}</h4><p>{activeApp.text}</p></div><span className={s.liveBadge}>Connected</span></div><div className={s.chatBubble}><strong>{activeApp.sender}</strong><p>{activeApp.message}</p><small>{activeApp.time}</small></div><p className={s.conversationNote}>This is a sample conversation. Your real accounts stay private.</p></div> : view === 'Unified inbox' ? <div className={s.inboxList}>{visibleApps.map(app => <button key={app.name} onClick={() => setSelected(apps.indexOf(app))}><AppIcon index={apps.indexOf(app)} /><span><strong>{app.sender}<small>{app.time}</small></strong><span>{app.message}</span></span><i /></button>)}{!visibleApps.length && <p className={s.emptyState}>No matching apps or messages.</p>}</div> : view === 'Split view' ? <div className={s.splitDemo}>{visibleApps.slice(0, 2).map(app => <div key={app.name}><div><AppIcon index={apps.indexOf(app)} /><strong>{app.name}</strong><span className={s.liveBadge}>Live</span></div><span className={s.chatAvatar}>{app.initials}</span><strong>{app.sender}</strong><p>{app.message}</p><button onClick={() => setSelected(apps.indexOf(app))}>Open conversation <Icon name="arrow" /></button></div>)}{!visibleApps.length && <p className={s.emptyState}>No matching apps.</p>}</div> : <>
          <div className={s.dashStats}><div><span><Icon name="grid" />Connected apps</span><strong>{workspace === 'Work' ? '4' : '2'}<small>All in one place</small></strong></div><div><span><Icon name="inbox" />Unread messages</span><strong>4<small><i /> Youâ€™re in the loop</small></strong></div><div><span><Icon name="shield" />Active workspace</span><strong>{workspace}<small>Safely separated</small></strong></div></div><div className={s.connectedHeading}><h4>Your everyday essentials</h4><a href="#integrations">Explore apps <Icon name="plus" /></a></div><div className={s.appCards}>{visibleApps.map(app => <button key={app.name} onClick={() => setSelected(apps.indexOf(app))}><span className={s.appTile} style={{ background: app.color }}><AppIcon index={apps.indexOf(app)} size={27} /></span><strong>{app.name}</strong><span>{workspace} account</span><small><i /> Connected<Icon name="chevron" /></small></button>)}{!visibleApps.length && <p className={s.emptyState}>No matching apps. Try â€œGmailâ€ or â€œSlackâ€.</p>}</div><div className={s.activity}><span className={s.chatAvatar}>JD</span><div><strong>Jamie from Design<small>via WhatsApp Â· 2 min ago</small></strong><p>The new designs look amazing! âœ¨</p></div><button onClick={() => setSelected(0)} aria-label="Open Jamieâ€™s conversation"><Icon name="arrow" /></button></div>
        </>}
      </div>
    </div>
  </div>;
}
function AppCarousel() {
  const [paused, setPaused] = useState(false);
  return <div className={s.appCarousel} aria-label="Supported apps">
    <div className={s.carouselHeading}><span>YOUR FAVORITES. <strong>HAPPIER TOGETHER.</strong></span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'} scrolling</button></div>
    <div className={s.carouselViewport}>
      <div className={s.carouselTrack} data-paused={paused}>
        {[0, 1].map(copy => <div className={s.carouselGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {apps.map((app, index) => <a href="#integrations" key={app.name} tabIndex={copy === 1 ? -1 : undefined}><AppIcon index={index} size={32} /><span>{app.name}</span></a>)}
          <a href="#integrations" className={s.carouselMore} tabIndex={copy === 1 ? -1 : undefined}><Icon name="plus" /><span>30+ apps & custom URLs</span></a>
        </div>)}
      </div>
    </div>
  </div>;
}
function Hero() {
  const reduced = useReducedMotion();
  return <section className={s.hero} id="home"><div className={s.heroSky} aria-hidden="true"><Image src="/images/hero-blue-sky-v2.png" alt="" fill sizes="100vw" preload /></div><div className={s.heroContent}><motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><a href="#features" className={s.releaseBadge}>Meet ArcticSwitch<span aria-hidden="true">&#10022;</span></a><h1>All your apps.<br />One <span>peaceful</span> place.</h1><p>Bring your chats, emails, and work into one beautiful workspace.<br className={s.desktopBreak} /> Less switching. More space for what matters.</p><div className={s.heroActions}><DownloadButton /></div></motion.div></div><motion.div className={s.heroPreview} initial={reduced ? false : { opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}><WorkspaceDemo /></motion.div><AppCarousel /></section>;
}
function Features() {
  const [space, setSpace] = useState('Work');
  const [locked, setLocked] = useState(true);
  return <Reveal className={`${s.section} ${s.features}`} id="features"><div className={`${s.centerHeading} ${s.featuresHeading}`}><span className={s.featureEyebrow}>Less friction. More flow.</span><h2>A clearer desktop.<br /><em>A lighter kind of workday.</em></h2><p>All the little things that help you do your best work,<br className={s.desktopBreak} /> thoughtfully brought together.</p></div><div className={s.bento}>
    <article className={`${s.featureCard} ${s.workspaceCard}`}><span className={s.featureIcon}><Icon name="grid" /></span><h3>A space for every side of you.</h3><p>Work, personal, and everything in between.<br />Keep your accounts organized in their own spaces.</p><div className={s.miniWorkspace}><div className={s.miniTabs}>{['Work', 'Personal'].map(name => <button key={name} aria-pressed={space === name} onClick={() => setSpace(name)}><span style={{ background: name === 'Work' ? '#7f7f7f' : '#b9b9b9' }} />{name}</button>)}</div><div className={s.miniApps}>{(space === 'Work' ? [1, 2, 3] : [0, 1]).map(i => <div key={i}><AppIcon index={i} size={25} /><span>{apps[i].name}<small>{space} account</small></span><span className={s.miniCheck}><Icon name="check" /></span></div>)}</div></div></article>
    <article className={`${s.featureCard} ${s.inboxCard}`}><span className={s.featureIcon}><Icon name="inbox" /></span><h3>One inbox. Every conversation.</h3><p>Your unreads, together at last. Stay in the loop<br />without going in circles.</p><div className={s.miniInbox}>{apps.slice(0, 3).map((app, i) => <div key={app.name}><span className={s.miniAppIcon} style={{ background: app.color }}><AppIcon index={i} size={22} /></span><span><strong>{app.sender}</strong><small>{app.message}</small></span><span className={s.unread}>{[2, 1, 1][i]}</span></div>)}</div></article>
    <article className={`${s.featureCard} ${s.splitCard}`}><div><span className={s.featureIcon}><Icon name="split" /></span><h3>Side by side.<br />In perfect sync.</h3><p>Up to four apps in one view.<br />A little more room to get things done.</p><a href="#product" className={s.textLink}>Find your flow <Icon name="arrow" /></a></div><div className={s.miniSplit}>{[2, 1].map(i => <div key={i}><span><AppIcon index={i} size={20} />{apps[i].name}</span><div className={s.miniLine} /><div className={s.miniLine} /><div className={s.miniBubble}>Looking good! <span>âœ¦</span></div><div className={s.miniLine} /><div className={s.miniLine} /></div>)}</div></article>
    <article className={`${s.featureCard} ${s.privacyCard}`} id="security"><span className={s.featureIcon}><Icon name="shield" /></span><h3>Yours. And only yours.</h3><p>Separate sessions and service locks.<br />Your boundaries, built right in.</p><div className={s.privacyControl}><span className={s.lockGraphic}><Icon name="shield" /></span><div><strong>Service lock</strong><small>{locked ? 'Your space is protected' : 'Click to protect your space'}</small></div><button className={s.switch} role="switch" aria-label="Preview service lock" aria-checked={locked} onClick={() => setLocked(!locked)}><span /></button></div><span className={s.tryHint}>A little peace of mind. Try the switch.</span></article>
  </div><div className={s.smallFeatures}>{([['command', 'Keyboard-first flow', 'Your next move, one shortcut away.'], ['globe', 'Any app. Any URL.', 'Even the tools only your team uses.'], ['bolt', 'Pick up where you left off', 'Your sessions are always ready.']] as const).map(([icon, title, text]) => <div key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></Reveal>;
}
const demoFeatures = [
  { icon: 'grid', title: 'One home for all your apps', text: 'Give every account a place. Switch between work and personal spaces while keeping your sessions separate.', view: 'spaces' },
  { icon: 'split', title: 'A view that works like you', text: 'Keep a conversation open beside your inbox. Choose two, three, or four panes to make room for the task at hand.', view: 'split' },
  { icon: 'search', title: 'Find it. Open it. Keep flowing.', text: 'Jump straight to the right app, workspace, or account. Less looking around, more moving forward.', view: 'search' },
] as const;
function PreviewLogo() { return <Image className={s.productLogo} src="/images/logo-black.png" alt="" width={42} height={42} />; }
function Product() {
  const [active, setActive] = useState(0);
  const [panes, setPanes] = useState(2);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const reduced = useReducedMotion();
  return <section className={s.productBand} id="product"><Reveal className={`${s.section} ${s.product}`}>
    <div className={s.productCopy}><Eyebrow>MEET YOUR NEW WORKSPACE</Eyebrow><h2>Everything in reach.<br /><em>Nothing in your way.</em></h2><p>A desktop that makes sense of your day.<br />Explore a few ways to make it yours.</p><div className={s.featureSelectors}>{demoFeatures.map((feature, i) => <button key={feature.view} className={active === i ? s.selectedFeature : ''} aria-pressed={active === i} aria-controls="product-preview" onClick={() => { setActive(i); setSelected(''); }}><Icon name={feature.icon} /><span><strong>{feature.title}</strong>{active === i && <span>{feature.text}</span>}</span><Icon name="chevron" /></button>)}</div></div>
    <div className={s.productVisual} id="product-preview"><div className={s.previewCaption}><span><i /> A LITTLE HANDS-ON PREVIEW</span><Image src="/images/logo-black.png" alt="" width={22} height={22} /></div><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={s.productPreview}>
      {active === 0 && <><div className={s.previewHeading}><PreviewLogo /><div><h3>Your spaces, beautifully separate.</h3><p>Different hats. One happy desktop.</p></div></div><div className={s.spaceCards}>{['Work', 'Personal'].map((name, index) => <button key={name} className={selected === name ? s.chosenSpace : ''} aria-pressed={selected === name} onClick={() => setSelected(name)}><span className={s.spaceIllustration}><span /><span /><span><Image src="/images/logo-black.png" alt="" width={34} height={34} /></span></span><strong>{name}<Icon name="arrow" /></strong><small>{index ? 'Your world, on your terms' : 'A little space to do big things'}</small><span className={s.spaceAppIcons}>{(index ? [0, 1] : [1, 2, 3]).map(i => <AppIcon key={i} index={i} size={20} />)}</span></button>)}</div><div className={s.previewBottom} role="status"><Icon name="shield" />{selected ? `${selected} workspace selected. Your sessions are ready.` : 'Separate sessions. Everything stays where it belongs.'}</div></>}
      {active === 1 && <><div className={s.previewHeading}><PreviewLogo /><div><h3>Make a little more room.</h3><p>Choose your view.</p></div></div><div className={s.paneControls}>{[2, 3, 4].map(n => <button key={n} aria-pressed={panes === n} onClick={() => setPanes(n)}>{n} panes</button>)}</div><div className={s.productPanes} data-count={panes}>{apps.slice(0, panes).map((app, i) => <div key={app.name}><AppIcon index={i} size={26} /><strong>{app.name}</strong><div className={s.miniLine} /><div className={s.miniLine} /><p>{app.message}</p></div>)}</div><div className={s.previewBottom}><Icon name="check" />A bigger picture, without a bigger screen.</div></>}
      {active === 2 && <><div className={s.previewHeading}><PreviewLogo /><div><h3>A shortcut to your next move.</h3><p>Try searching for your favorite app.</p></div></div><label className={s.productSearch}><Icon name="search" /><input aria-label="Find an app" placeholder="Search Gmail, Slack, and moreâ€¦" value={query} onChange={event => { setQuery(event.target.value); setSelected(''); }} /></label><div className={s.searchResults}>{apps.filter(app => app.name.toLowerCase().includes(query.toLowerCase())).map(app => <button key={app.name} onClick={() => setSelected(app.name)}><AppIcon index={apps.indexOf(app)} /><span>{app.name}<small>{app.text}</small></span><Icon name="arrow" /></button>)}{!apps.some(app => app.name.toLowerCase().includes(query.toLowerCase())) && <p className={s.emptyState}>No apps found. Try another name.</p>}</div><div className={s.previewBottom} role="status"><Icon name="bolt" />{selected ? `${selected} selected. One step closer to your next task.` : 'Your whole workspace, just a few keystrokes away.'}</div></>}
    </motion.div><span className={s.visualNote}>Thoughtfully connected. Effortlessly yours.</span></div>
  </Reveal></section>;
}
const integrationApps = [
  { name: 'Microsoft Teams', src: '/images/integrations/microsoftteams.svg' },
  { name: 'Zoom', src: '/images/integrations/zoom.svg' },
  { name: 'HubSpot', src: '/images/integrations/hubspot.svg' },
  { name: 'Dropbox', src: '/images/integrations/dropbox.svg' },
  { name: 'Google Drive', src: '/images/integrations/googledrive.svg' },
  { name: 'Trello', src: '/images/integrations/trello.svg' },
  { name: 'Zapier', src: '/images/integrations/zapier.svg' },
  { name: 'Slack', src: '/images/slack.svg' },
  { name: 'Salesforce', src: '/images/integrations/salesforce.svg' },
  { name: 'Excel', src: '/images/integrations/microsoftexcel.svg' },
  { name: 'Power BI', src: '/images/integrations/powerbi.svg' },
  { name: 'Shopify', src: '/images/integrations/shopify.svg' },
  { name: 'Zendesk', src: '/images/integrations/zendesk.svg' },
  { name: 'QuickBooks', src: '/images/integrations/quickbooks.svg' },
  { name: 'Stripe', src: '/images/integrations/stripe.svg' },
  { name: 'Asana', src: '/images/integrations/asana.svg' },
];
function Integrations() {
  return <Reveal className={s.seamlessSection} id="integrations">
    <div className={s.seamlessHeading}>
      <Eyebrow>ALL YOUR TOOLS. ONE HAPPY PLACE.</Eyebrow>
      <h2>Seamless Integrations</h2>
      <p>Bring the tools you love into one calm workspace.<br className={s.desktopBreak} /> Your conversations, projects, and everyday essentials. Beautifully together.</p>
      <DownloadButton>Bring your apps together</DownloadButton>
    </div>
    <div className={s.integrationMap}>
      <svg className={s.integrationConnections} viewBox="0 0 1000 700" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {[100, 260, 420, 580, 740, 900].map(x => <path key={`top-${x}`} d={`M 500 420 C 500 230, ${x} 248, ${x} ${700 / 12}`} />)}
        {[180, 340, 500, 660, 820].map(x => <path key={`second-${x}`} d={`M 500 420 C 500 310, ${x} 320, ${x} 210`} />)}
        {[180, 340, 500, 660, 820].map(x => <path key={`bottom-${x}`} d={`M 500 420 C 500 530, ${x} 520, ${x} 630`} />)}
      </svg>
      <div className={s.integrationTopRow}>{integrationApps.slice(0, 6).map(app => <a key={app.name} href="#download" className={s.integrationTile}><Image src={app.src} alt="" width={38} height={38} /><span>{app.name}</span></a>)}</div>
      <div className={s.integrationSecondRow}>{integrationApps.slice(6, 11).map(app => <a key={app.name} href="#download" className={s.integrationTile} title={app.name}><Image src={app.src} alt="" width={38} height={38} /><span>{app.name}</span></a>)}</div>
      <div className={s.integrationHub}><div><Image src="/images/logo.png" alt="ArcticSwitch" width={512} height={512} sizes="(max-width: 760px) 44px, 56px" /></div></div>
      <div className={s.integrationBottomRow}>{integrationApps.slice(11).map(app => <a key={app.name} href="#download" className={s.integrationTile}><Image src={app.src} alt="" width={38} height={38} /><span>{app.name}</span></a>)}</div>
    </div>
    <p className={s.seamlessNote}><Icon name="globe" /><span>Your tool not listed? <a href="#product">Add any web app with a custom URL.</a></span></p>
  </Reveal>;
}
const questions = [
  ['What is ArcticSwitch?', 'ArcticSwitch is a desktop workspace that brings your messaging, email, and web apps together. Organize multiple accounts, see your unread messages, and work across apps from one place.'],
  ['Can I use multiple accounts for the same app?', 'Yes. Add separate accounts for the same service and organize them into workspaces. Each account keeps its own login and session, so your work and personal lives can stay separate.'],
  ['Which apps can I add?', 'Start with familiar apps like WhatsApp, Gmail, Slack, and LinkedIn. You can also add a custom URL to bring other web tools into your workspace.'],
  ['How does ArcticSwitch keep my accounts separate?', 'Each service uses its own persistent session partition. You can also add a service lock for another layer of control over sensitive accounts.'],
  ['Can I see more than one app at a time?', 'Yes. Split view lets you open two, three, or four services together. You can also pop a service into its own window when you need more room.'],
  ['Where can I download ArcticSwitch?', 'ArcticSwitch is designed for Windows, macOS, and Linux. Open “Get the app” to check installer availability for your platform.'],
];
function FAQ() { return <Reveal className={`${s.section} ${s.faq}`} id="faq"><div className={s.faqIntro}><Eyebrow>A LITTLE MORE CLARITY</Eyebrow><h2>Glad you <em>asked.</em></h2><p>A few things you might be wondering<br />before making yourself at home.</p><span className={s.faqDecoration} aria-hidden="true">Clear answers.<br /><span>Calmer decisions.</span><svg viewBox="0 0 90 55" fill="none"><path d="M3 5c38 30 56-14 57 5 2 18-33 29 14 26m-8-9 12 9-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span></div><div className={s.questions}>{questions.map(([question, answer], i) => <details key={question} name="faq" open={i === 0 ? true : undefined}><summary><span className={s.questionNumber}>0{i + 1}</span><strong>{question}</strong><span className={s.questionToggle}><Icon name="plus" /></span></summary><p>{answer}</p></details>)}</div></Reveal>; }
function Closing() { return <><Reveal className={s.closing} id="download"><div className={s.closingSky} /><div className={s.closingContent}><Eyebrow>MAKE A LITTLE ROOM FOR WHAT MATTERS</Eyebrow><h2>Your apps, together.<br />Your day, <em>lighter.</em></h2><p>A little less switching. A lot more possibility.<br />Meet your new favorite place to work.</p><div className={s.closingActions}><DownloadButton secondary>Find your focus</DownloadButton><span className={s.closingPlatforms}>Made for Windows, macOS &amp; Linux</span></div></div>{apps.slice(0, 4).map((app, i) => <span key={app.name} className={s.closingApp}><AppIcon index={i} size={38} /></span>)}</Reveal><footer className={s.footer}><div className={s.footerTop}><p className={s.footerStatement}>One calm workspace.<br />Every account within reach.</p><nav aria-label="Footer navigation"><a href="#product">Product</a><a href="#features">Features</a><a href="#integrations">Integrations</a><a href="#faq">FAQs</a></nav><a className={s.backTop} href="#home">Back to top <Icon name="arrow" /></a></div><a className={s.footerLogoLink} href="#home" aria-label="ArcticSwitch home"><Image className={s.footerWordmark} src="/arctic-switch-logo%20(1).svg" alt="ArcticSwitch" width={2048} height={306} /></a><div className={s.footerBottom}><span>© {new Date().getFullYear()} ArcticSwitch. All rights reserved.</span><span><i />A little less switching. A lot more living.</span></div></footer></>; }
export default function LandingPage() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('main section:not(#home), main footer');
    targets.forEach(target => target.classList.add(s.scrollRevealSection));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(target => target.classList.add(s.scrollRevealVisible));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(s.scrollRevealVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <MotionConfig reducedMotion="user"><DownloadProvider><div className={s.page}><a className={s.skipLink} href="#main-content">Skip to content</a><main id="main-content"><div className={s.headerFrame}><Navigation /><Hero /></div><WorkflowSection /><ToolsSection /><Features /><SolutionsSection /><AchievementsSection /><ServiceShowcase /><Product /><Integrations /><FAQ /><Closing /></main></div></DownloadProvider></MotionConfig>;
}




