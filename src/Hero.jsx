// Hero.jsx — 3 hero variants
const { useState, useEffect, useRef } = React;

function useTyped(words, speed = 70, pause = 1400) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = words[i % words.length];
    const done = !del && txt === full;
    const gone = del && txt === '';
    if (done) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t); }
    if (gone) { setDel(false); setI(i + 1); return; }
    const t = setTimeout(() => {
      setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, speed, pause]);

  return txt;
}

function Arches({ count = 6 }) {
  const colors = ['var(--terracotta)', 'var(--sand)', 'var(--olive)', 'var(--ochre)', 'var(--clay)', 'var(--sea)'];
  return (
    <div className="hero__arches">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="hero__arch" style={{
          background: colors[i % colors.length],
          height: 240 + (i % 3) * 40,
          animationDelay: `${300 + i * 90}ms`,
        }} />
      ))}
    </div>
  );
}

// Variant A — editorial magazine (default)
function HeroEditorial({ t }) {
  const typed = useTyped(t.hero.lines);
  return (
    <section className="hero" id="top">
      <h1 className="hero__title reveal" style={{ '--delay': '120ms' }}>
        Raiu<br/>
        <em>Robert</em><span style={{ opacity: 0.35 }}> — </span>Mihai
      </h1>
      <div className="hero__grid">
        <p className="hero__tagline reveal" style={{ '--delay': '260ms' }}>
          I build <em>professional embedded software</em> by day and <em>good-looking, functional websites</em> after hours.
        </p>
        <div className="hero__meta reveal" style={{ '--delay': '380ms' }}>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#work">
              {t.hero.ctaWork}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a className="btn btn--ghost" href="#contact">{t.hero.ctaContact}</a>
          </div>
        </div>
      </div>
      <div className="hero__scroll reveal" style={{ '--delay': '600ms' }}>
        <div className="hero__scroll__hint"><div className="hero__scroll__line"></div>{t.hero.scroll}</div>
      </div>
    </section>
  );
}

// Variant B — centered monumental
function HeroCentered({ t }) {
  const typed = useTyped(t.hero.lines);
  return (
    <section className="hero" id="top" style={{ textAlign: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span className="mono reveal">{t.hero.kicker} · Bucharest</span>
        <h1 className="hero__title reveal" style={{ '--delay': '120ms', maxWidth: '14ch' }}>
          <em>Raiu</em> Robert<br/>Mihai
        </h1>
        <div style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(24px,2.6vw,36px)', color: 'var(--accent)', fontStyle: 'italic' }} className="reveal">
          <span className="hero__typed">{typed}</span>
        </div>
        <p className="reveal" style={{ '--delay': '320ms', fontFamily: 'var(--ff-body)', fontSize: 22, color: 'var(--fg-2)', maxWidth: 560, lineHeight: 1.5 }}>
          {t.hero.tagline}
        </p>
        <div className="hero__ctas reveal" style={{ '--delay': '440ms' }}>
          <a className="btn btn--primary" href="#work">{t.hero.ctaWork}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn btn--ghost" href="#contact">{t.hero.ctaContact}</a>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 10 }} className="reveal" style={{ '--delay': '700ms' }}>
          {['var(--terracotta)','var(--sand)','var(--olive)','var(--ochre)','var(--clay)','var(--sea)'].map((c,i)=>(
            <div key={i} style={{ width: 40, height: 80, background: c, borderRadius: 999 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Variant C — split with live preview card
function HeroSplit({ t }) {
  const typed = useTyped(t.hero.lines);
  return (
    <section className="hero" id="top" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <span className="mono reveal" style={{ marginBottom: 20, display: 'block' }}>{t.hero.kicker}</span>
        <h1 className="hero__title reveal" style={{ '--delay': '120ms', fontSize: 'clamp(60px, 8vw, 120px)' }}>
          Raiu<br/><em>Robert</em><br/>Mihai
        </h1>
        <p className="reveal" style={{ '--delay': '260ms', fontFamily: 'var(--ff-body)', fontSize: 24, color: 'var(--fg-2)', maxWidth: 520, lineHeight: 1.45, marginTop: 32 }}>
          {t.hero.tagline}
        </p>
        <div style={{ marginTop: 20, fontFamily: 'var(--ff-display)', fontSize: 22, color: 'var(--accent)', fontStyle: 'italic' }} className="reveal">
          — <span className="hero__typed">{typed}</span>
        </div>
        <div className="hero__ctas reveal" style={{ '--delay': '440ms', marginTop: 40 }}>
          <a className="btn btn--primary" href="#work">{t.hero.ctaWork}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn btn--ghost" href="#contact">{t.hero.ctaContact}</a>
        </div>
      </div>
      <div className="reveal" style={{ '--delay': '340ms', aspectRatio: '4/5', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--line)', position: 'relative' }}>
            <div style={{ height: 24, background: 'color-mix(in oklab, var(--fg) 8%, var(--bg))', display: 'flex', gap: 5, alignItems: 'center', padding: '0 10px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ochre)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--olive)' }} />
              <div className="mono" style={{ marginLeft: 10, fontSize: 9 }}>hobbymoto.vercel.app</div>
            </div>
            <iframe src="https://hobbymoto.vercel.app/ro/motociclete-rulate" style={{ width: '200%', height: '200%', border: 0, transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none' }} loading="lazy" />
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--line)', position: 'relative' }}>
            <div style={{ height: 24, background: 'color-mix(in oklab, var(--fg) 8%, var(--bg))', display: 'flex', gap: 5, alignItems: 'center', padding: '0 10px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ochre)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--olive)' }} />
              <div className="mono" style={{ marginLeft: 10, fontSize: 9 }}>detalii3.com</div>
            </div>
            <iframe src="https://detalii3.com" style={{ width: '200%', height: '200%', border: 0, transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none' }} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroEditorial, HeroCentered, HeroSplit, Arches });
