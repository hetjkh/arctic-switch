'use client';

import { useState } from 'react';
import s from './SolutionsSection.module.css';

const benefitRows = [
  ['Separate every account', 'Bring all your apps together', 'Work side by side', 'Switch without losing focus', 'Open any custom URL'],
  ['One inbox for every conversation', 'Up to four apps in one view', 'Persistent sessions', 'Private workspace locks', 'Find anything in seconds'],
  ['Built for teamwork', 'Keep work and life organized', 'Less window switching', 'Your sessions stay ready', 'A calmer desktop'],
];

const testimonials = [
  { initials: 'AD', name: 'Alex Dawson', role: 'Product Manager', quote: 'ArcticSwitch gives every account a proper home. I spend less time hunting through windows and more time staying with the work in front of me.' },
  { initials: 'MK', name: 'Morgan Kim', role: 'Design Lead', quote: 'Split view changed the rhythm of my day. I can keep feedback beside the design, and every client account remains exactly where I left it.' },
  { initials: 'SR', name: 'Sam Rivera', role: 'Operations Director', quote: 'Our essential tools finally feel like one workspace. The team moves faster, and the desktop feels noticeably calmer from the moment we start.' },
];

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} /></svg>;
}

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  const move = (step: number) => setActive(current => (current + step + testimonials.length) % testimonials.length);

  return (
    <section className={s.section} id="solutions" aria-labelledby="solutions-heading">
      <header className={s.heading}>
        <span>Our solutions</span>
        <h2 id="solutions-heading">Powerful tools for <em>your workday.</em></h2>
        <p>Everything you need to keep accounts organized, conversations close,<br />and your attention where it matters.</p>
      </header>

      <div className={s.benefits} aria-label="ArcticSwitch benefits">
        {benefitRows.map((row, rowIndex) => (
          <div className={s.lane} key={rowIndex}>
            <div className={s.track}>
              {[0, 1].map(copy => <div className={s.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>{row.map(item => <span className={s.benefit} key={item}>{item}</span>)}</div>)}
            </div>
          </div>
        ))}
      </div>

      <div className={s.testimonial} aria-live="polite">
        <button className={`${s.arrow} ${s.previous}`} type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><Arrow direction="left" /></button>
        <div className={s.quote}>
          <span className={s.avatar} aria-hidden="true">{testimonial.initials}</span>
          <p className={s.person}><strong>{testimonial.name}</strong><span>{testimonial.role}</span></p>
          <div className={s.stars} aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“{testimonial.quote}”</blockquote>
          <div className={s.dots} aria-label="Choose testimonial">{testimonials.map((item, index) => <button key={item.name} type="button" className={index === active ? s.activeDot : ''} onClick={() => setActive(index)} aria-label={`Show testimonial from ${item.name}`} aria-current={index === active ? true : undefined} />)}</div>
        </div>
        <button className={`${s.arrow} ${s.next}`} type="button" onClick={() => move(1)} aria-label="Next testimonial"><Arrow direction="right" /></button>
      </div>
    </section>
  );
}
