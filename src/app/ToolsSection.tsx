import Image from 'next/image';
import s from './ToolsSection.module.css';

const appRows = [
  [
    { name: 'WhatsApp', src: '/images/whatsapp.svg' },
    { name: 'Slack', src: '/images/slack.svg' },
    { name: 'Notion', src: '/images/integrations/notion.svg' },
    { name: 'Google Drive', src: '/images/integrations/googledrive.svg' },
    { name: 'Zoom', src: '/images/integrations/zoom.svg' },
    { name: 'Asana', src: '/images/integrations/asana.svg' },
    { name: 'Dropbox', src: '/images/integrations/dropbox.svg' },
  ],
  [
    { name: 'Trello', src: '/images/integrations/trello.svg' },
    { name: 'Gmail', src: '/images/gmail.svg' },
    { name: 'Microsoft Teams', src: '/images/integrations/microsoftteams.svg' },
    { name: 'LinkedIn', src: '/images/linkedin.svg' },
    { name: 'HubSpot', src: '/images/integrations/hubspot.svg' },
    { name: 'Shopify', src: '/images/integrations/shopify.svg' },
    { name: 'Zapier', src: '/images/integrations/zapier.svg' },
  ],
];

const features = [
  { icon: 'spaces', title: 'A space for every account', text: 'Work, personal, and everything in between. Give each account a home, with sessions that stay separate.' },
  { icon: 'split', title: 'Your perfect perspective', text: 'Bring up to four apps into one view. Keep your conversations and your work comfortably side by side.' },
  { icon: 'inbox', title: 'Everything in the loop', text: 'Bring unread messages together in one inbox. Stay on top of the conversation without the constant switching.' },
  { icon: 'flow', title: 'Right back to your flow', text: 'Your sessions stay ready when you are. Pick up where you left off and make more room for what matters.' },
] as const;

function FeatureIcon({ name }: { name: typeof features[number]['icon'] }) {
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {name === 'spaces' && <><rect x="5" y="13" width="27" height="29" rx="7" fill="#92b9d7" /><rect x="15" y="5" width="27" height="29" rx="7" fill="#d4eaff" stroke="#315874" strokeWidth="1.5" /><path d="M22 15h13M22 21h9" stroke="#315874" strokeWidth="2" strokeLinecap="round" /></>}
      {name === 'split' && <><rect x="5" y="7" width="38" height="34" rx="9" fill="#c5e2f8" stroke="#315874" strokeWidth="1.5" /><path d="M24 8v32M6 18h36" stroke="#315874" strokeWidth="1.5" /><rect x="10" y="23" width="9" height="12" rx="3" fill="#315874" /><rect x="29" y="23" width="9" height="12" rx="3" fill="#88b4d5" /><circle cx="12" cy="13" r="1.5" fill="#315874" /></>}
      {name === 'inbox' && <><path d="M11 11a5 5 0 0 1 5-4h16a5 5 0 0 1 5 4l6 18v7a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-7l6-18Z" fill="#c5e2f8" stroke="#315874" strokeWidth="1.5" /><path d="M6 28h11l3 6h8l3-6h11" stroke="#315874" strokeWidth="1.5" strokeLinejoin="round" /><path d="M24 13v12m-5-5 5 5 5-5" stroke="#315874" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>}
      {name === 'flow' && <><circle cx="24" cy="24" r="20" fill="#c5e2f8" /><path d="m26 5-16 22h12l-1 16 17-24H25l1-14Z" fill="#315874" stroke="#315874" strokeWidth="1.5" strokeLinejoin="round" /><path d="m26 5-4 22h-12L26 5Z" fill="#8ab5d7" /></>}
    </svg>
  );
}

export default function ToolsSection() {
  return (
    <section className={s.section} id="workflow" aria-labelledby="workflow-heading">
      <div className={s.backdrop} aria-hidden="true" />
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.heading}>
            <span className={s.eyebrow}>Your everyday toolkit</span>
            <h2 id="workflow-heading">Your favorite tools.<br /><em>Working together.</em></h2>
            <a className={s.exploreLink} href="#integrations">Explore all your apps<span><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5 19 19M5 19h14V5" /></svg></span></a>
          </div>
          <div className={s.appWall} aria-label="Some of the apps you can bring together">
            {appRows.map((row, index) => (
              <div className={s.appLane} key={index}>
                <div className={s.appTrack}>
                  {[0, 1].map(copy => (
                    <ul className={s.appRow} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                      {row.map(app => <li className={s.appTile} key={app.name} title={app.name}><Image src={app.src} alt={copy === 0 ? app.name : ''} width={49} height={49} /></li>)}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.cards}>
          {features.map(feature => (
            <article className={s.card} key={feature.icon}>
              <FeatureIcon name={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
