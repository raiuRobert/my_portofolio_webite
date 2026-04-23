// Sections.jsx — Work, About, Resume, Other, Contact

function WorkSection({ t }) {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="work">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow reveal">{t.work.eyebrow}</span>
          <h2 className="s-head__title reveal" style={{ '--delay': '100ms' }}>
            {t.work.title.split('\n').map((l, i) => (
              <span key={i}>{i === 1 ? <em>{l}</em> : l}<br/></span>
            ))}
          </h2>
        </div>
        <div className="work__list">
          {t.work.items.map((p, idx) => (
            <div key={p.id} className={`work__item reveal ${open === p.id ? 'open' : ''}`} style={{ '--delay': `${idx * 120}ms` }}>
              <div className="work__n">{p.n} · {p.year}</div>
              <div className="work__body">
                <h3>{p.name}</h3>
                <div className="work__kind">{p.kind}</div>
                <p className="work__summary">{p.summary}</p>
                <div className="work__tags">
                  {p.tags.map(tg => <span key={tg} className="work__tag">{tg}</span>)}
                </div>
                <div className="work__actions">
                  <a className="btn btn--primary" href={p.url} target="_blank" rel="noreferrer">
                    {t.work.openLive}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h6v6M9 3L3 9" strokeLinecap="round"/></svg>
                  </a>
                  <button className="btn btn--ghost" onClick={() => setOpen(open === p.id ? null : p.id)}>
                    {t.work.viewCase}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ transform: open === p.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}><path d="M3 5l3 3 3-3" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="work__preview">
                <div className="work__preview__chrome">
                  <span className="work__preview__dot" />
                  <span className="work__preview__dot" />
                  <span className="work__preview__dot" />
                  <span className="work__preview__url">{p.url.replace(/^https?:\/\//, '')}</span>
                </div>
                <div className="work__preview__frame">
                  <iframe src={p.url} loading="lazy" title={p.name} />
                  <div className="work__preview__overlay">
                    <div className="work__preview__overlay__badge">
                      Open {p.name}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h8v8M11 3L3 11" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </div>
              </a>
              <div className="work__notes">
                <ul>
                  {p.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ t }) {
  return (
    <section id="about">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow reveal">{t.about.eyebrow}</span>
          <h2 className="s-head__title reveal" style={{ '--delay': '100ms' }}>
            {t.about.title.split('\n').map((l,i)=>(
              <span key={i}>{i===1?<em>{l}</em>:l}<br/></span>
            ))}
          </h2>
        </div>
        <div className="about__grid">
          <div className="about__body reveal">
            {t.about.body.map((p,i)=><p key={i}>{p}</p>)}
          </div>
          <div className="about__stats">
            {t.about.stats.map((s,i)=>(
              <div key={i} className="about__stat reveal" style={{ '--delay': `${100 + i*100}ms` }}>
                <div className="about__stat__k">{s.k}</div>
                <div className="about__stat__v">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeSection({ t }) {
  return (
    <section id="resume" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div className="s-head">
          <span className="eyebrow reveal">{t.resume.eyebrow}</span>
          <h2 className="s-head__title reveal" style={{ '--delay': '100ms' }}>
            {t.resume.title}
          </h2>
        </div>
        <div className="resume__grid">
          <div className="resume__exp">
            {t.resume.experience.map((j,i)=>(
              <div key={i} className="resume__job reveal" style={{ '--delay': `${i*120}ms` }}>
                <div className="resume__period">{j.period}</div>
                <div>
                  <div className="resume__role">{j.role}</div>
                  <div className="resume__company">{j.company}</div>
                  <ul className="resume__bullets">
                    {j.bullets.map((b,k)=><li key={k}>{b}</li>)}
                  </ul>
                  <div className="resume__stack">{j.stack}</div>
                </div>
              </div>
            ))}
          </div>
          <aside className="resume__side reveal" style={{ '--delay': '200ms' }}>
            <h4>Education</h4>
            {t.resume.education.map((e,i)=>(
              <div key={i} className="resume__edu__i">
                <div className="resume__edu__degree">{e.degree}</div>
                <div className="resume__edu__school">{e.school} · {e.period}</div>
              </div>
            ))}
            <h4>Skills</h4>
            <div className="resume__skills">
              {t.resume.skills.map((s,i)=><span key={i} className="resume__skill">{s}</span>)}
            </div>
            <h4>Contact</h4>
            <div style={{ fontFamily: 'var(--ff-ui)', fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.8 }}>
              {t.resume.location}<br/>
              <a href="mailto:robertmihai.raiu@gmail.com" style={{ color: 'var(--accent)' }}>robertmihai.raiu@gmail.com</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OtherSection({ t }) {
  return (
    <section id="other">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow reveal">{t.other.eyebrow}</span>
          <div>
            <h2 className="s-head__title reveal" style={{ '--delay': '100ms' }}>{t.other.title}</h2>
            <div className="mono reveal" style={{ '--delay': '200ms', marginTop: 18, color: 'var(--mute)' }}>{t.other.subtitle}</div>
          </div>
        </div>
        <div className="other__groups">
          {t.other.groups.map((g,i)=>(
            <div key={i} className="other__group reveal" style={{ '--delay': `${i*140}ms` }}>
              <h3>{g.name}</h3>
              <ul>
                {g.items.map((it,k)=>(
                  <li key={k}>
                    <strong>{it.t}</strong>
                    <span>{it.d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ t }) {
  const links = [
    { l: 'Email', v: t.contact.email, h: `mailto:${t.contact.email}` },
    { l: 'LinkedIn', v: t.contact.linkedin, h: 'https://www.linkedin.com/in/robert-raiu/' },
    { l: 'Phone', v: t.contact.phone, h: `tel:${t.contact.phone.replace(/\s/g,'')}` },
    { l: 'Location', v: t.contact.city, h: 'https://maps.google.com/?q=Bucharest' },
  ];
  return (
    <section id="contact" className="contact">
      <div className="container">
        <span className="eyebrow reveal">{t.contact.eyebrow}</span>
        <h2 className="contact__title reveal" style={{ '--delay': '100ms', marginTop: 20 }}>
          Let's make<br/><em>something</em>.
        </h2>
        <p className="contact__body reveal" style={{ '--delay': '200ms' }}>{t.contact.body}</p>
        <div className="contact__links">
          {links.map((lk,i)=>(
            <a key={i} href={lk.h} target="_blank" rel="noreferrer" className="contact__link reveal" style={{ '--delay': `${300 + i*80}ms` }}>
              <span className="contact__link__label">{lk.l}</span>
              <span className="contact__link__val">{lk.v}</span>
              <span className="contact__link__arr">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 15L15 5M8 5h7v7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WorkSection, AboutSection, ResumeSection, OtherSection, ContactSection });
