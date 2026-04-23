// App.jsx — top-level portfolio app
const { useState, useEffect, useRef } = React;

const PALETTE = [
  { name: 'Terracotta', v: '#C8593A' },
  { name: 'Olive', v: '#7A8B3A' },
  { name: 'Ochre', v: '#D9A838' },
  { name: 'Clay', v: '#C77B3C' },
  { name: 'Sea', v: '#2E5E6E' },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function useSpotlight(motion) {
  useEffect(() => {
    const el = document.querySelector('.spotlight');
    if (!el) return;
    if (motion === 'off') { el.style.opacity = 0; return; }
    const mv = (e) => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px'; };
    const lv = () => { el.style.opacity = 0; };
    const en = () => { el.style.opacity = motion === 'high' ? 1 : 0.7; };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerleave', lv);
    window.addEventListener('pointerenter', en);
    en();
    return () => {
      window.removeEventListener('pointermove', mv);
      window.removeEventListener('pointerleave', lv);
      window.removeEventListener('pointerenter', en);
    };
  }, [motion]);
}

function Nav({ lang, setLang, theme, setTheme, tweaksOn, setTweaksOn, t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s);
    s();
    return () => window.removeEventListener('scroll', s);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="nav__brand ui">
        <span className="nav__dot"></span>
      </a>
      <div className="nav__links">
        <a href="#work">{t.nav.work}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#resume">{t.nav.resume}</a>
        <a href="#other">{t.nav.other}</a>
        <a href="#contact">{t.nav.contact}</a>
      </div>
      <div className="nav__tools">
        <button className="nav__tool" onClick={() => setLang(lang === 'en' ? 'ro' : 'en')} title="Language">
          {lang === 'en' ? 'EN' : 'RO'}
        </button>
        <button className="nav__tool" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Theme">
          {theme === 'light' ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  );
}

function TweaksPanel({ state, setState, visible, onClose }) {
  if (!visible) return null;
  return (
    <div className="tweaks show">
      <h5>
        <span>Tweaks</span>
        <span style={{ cursor: 'pointer' }} onClick={onClose}>×</span>
      </h5>
      <div className="tweaks__row">
        <label>Accent</label>
        <div className="tweaks__swatches">
          {PALETTE.map((c) => (
            <div key={c.name} className={`tweaks__swatch ${state.accent === c.v ? 'active' : ''}`}
              style={{ background: c.v }} title={c.name}
              onClick={() => setState({ ...state, accent: c.v })} />
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Theme</label>
        <div className="tweaks__pills">
          {['light','dark'].map(m => (
            <button key={m} className={`tweaks__pill ${state.theme === m ? 'active' : ''}`}
              onClick={() => setState({ ...state, theme: m })}>{m}</button>
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Hero</label>
        <div className="tweaks__pills">
          {['editorial','centered','split'].map(h => (
            <button key={h} className={`tweaks__pill ${state.hero === h ? 'active' : ''}`}
              onClick={() => setState({ ...state, hero: h })}>{h}</button>
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Density</label>
        <div className="tweaks__pills">
          {['compact','regular','airy'].map(d => (
            <button key={d} className={`tweaks__pill ${state.density === d ? 'active' : ''}`}
              onClick={() => setState({ ...state, density: d })}>{d}</button>
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Motion</label>
        <div className="tweaks__pills">
          {['off','low','high'].map(m => (
            <button key={m} className={`tweaks__pill ${state.motion === m ? 'active' : ''}`}
              onClick={() => setState({ ...state, motion: m })}>{m}</button>
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Language</label>
        <div className="tweaks__pills">
          {['en','ro'].map(l => (
            <button key={l} className={`tweaks__pill ${state.lang === l ? 'active' : ''}`}
              onClick={() => setState({ ...state, lang: l })}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#7A8B3A",
    "theme": "light",
    "hero": "editorial",
    "density": "regular",
    "motion": "low",
    "lang": "en"
  }/*EDITMODE-END*/;

  const [state, setState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rr_portfolio_state') || 'null');
      return { ...DEFAULTS, ...(saved || {}) };
    } catch { return DEFAULTS; }
  });
  const [tweaksOn, setTweaksOn] = useState(false);

  // persist locally
  useEffect(() => { localStorage.setItem('rr_portfolio_state', JSON.stringify(state)); }, [state]);

  // apply to document root
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.density = state.density;
    document.documentElement.style.setProperty('--accent', state.accent);
    document.documentElement.style.setProperty('--motion', state.motion === 'off' ? 0 : state.motion === 'low' ? 1 : 1.6);
  }, [state]);

  // Tweaks host bridge
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // persist edits via the host writer
  useEffect(() => {
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: state,
    }, '*');
  }, [state]);

  useReveal();
  useSpotlight(state.motion);

  const t = I18N[state.lang] || I18N.en;

  const Hero = state.hero === 'centered' ? HeroCentered : state.hero === 'split' ? HeroSplit : HeroEditorial;

  return (
    <>
      <div className="spotlight" />
      <Nav lang={state.lang}
        setLang={(l) => setState({ ...state, lang: l })}
        theme={state.theme}
        setTheme={(th) => setState({ ...state, theme: th })}
        tweaksOn={tweaksOn}
        setTweaksOn={setTweaksOn}
        t={t} />
      <Hero t={t} />
      <WorkSection t={t} />
      <AboutSection t={t} />
      <ResumeSection t={t} />
      <OtherSection t={t} />
      <ContactSection t={t} />
      <footer className="footer">
        <span>{t.footer}</span>
        <span>© 2026</span>
      </footer>
      <TweaksPanel state={state} setState={setState} visible={tweaksOn} onClose={() => setTweaksOn(false)} />
    </>
  );
}

Object.assign(window, { App });
