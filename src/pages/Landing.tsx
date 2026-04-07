import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Mail, Search, Share2, TrendingUp, Check, ChevronDown, Star, Play, Globe, Brain, Target, Shield, Menu, X, Bot, ArrowUpRight } from 'lucide-react';

/* ── Reveal on scroll ── */
function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); if (once) o.disconnect(); } }, { threshold: 0.08 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, once]);
  return v;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════ */
function Nav() {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => nav('/')} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Sparkles size={12} color="#fff" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>Athena</span>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'FAQ'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-medium transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>{l}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>Log in</button>
            <button onClick={() => nav('/onboarding')} className="btn-primary text-[13px]">Start free trial</button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8" onClick={() => setOpen(false)}>
          {['Features', 'Pricing', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{l}</a>
          ))}
          <button onClick={() => nav('/onboarding')} className="btn-primary mt-4">Start free trial</button>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════ */
function Hero() {
  const nav = useNavigate();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      {/* Subtle gradient backdrop — inspired by Stripe */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] right-[-5%] w-[55%] h-[80%] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #6c63ff, transparent 70%)' }} />
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[60%] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #d946ef, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[1120px] mx-auto px-6">
        {/* Badge */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
              <Sparkles size={11} /> Public beta
            </span>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>7-day free trial, no card required</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={80}>
          <h1 className="heading-xl max-w-[640px] mb-4">
            Your entire{' '}
            <span className="gradient-text">marketing team</span>,{' '}
            replaced by one AI.
          </h1>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={160}>
          <p className="body-lg max-w-[480px] mb-8">
            Athena runs your SEO, social, email, and ads autonomously — then reports back every morning with results.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={240}>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => nav('/onboarding')} className="btn-primary">
              Get started <ArrowRight size={14} />
            </button>
            <button className="btn-secondary">
              <Play size={13} /> Watch demo
            </button>
          </div>
        </Reveal>

        {/* Product mockup */}
        <Reveal delay={400}>
          <div className="mt-16 md:mt-20 card overflow-hidden"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px var(--border)' }}>
            {/* Browser chrome */}
            <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
              <div className="flex gap-1.5 mr-4">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                  <Globe size={10} /> app.athena-ai.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-4 md:p-6" style={{ background: 'var(--bg-alt)' }}>
              {/* Greeting */}
              <div className="flex items-start gap-3 mb-5 p-3 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                  <Bot size={13} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>Good morning — here's your briefing</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Your blog post generated 2,400 visits yesterday (3× average). I've queued 4 social posts to amplify it and paused the underperforming "Summer Sale" ad set.
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Organic traffic', value: '+142%', color: '#17b169' },
                  { label: 'Social reach', value: '284K', color: 'var(--accent)' },
                  { label: 'Email revenue', value: '£12.4K', color: '#d946ef' },
                  { label: 'Ad ROAS', value: '4.2×', color: '#f5a623' },
                ].map(m => (
                  <div key={m.label} className="p-3 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <p className="label text-[11px] mb-1">{m.label}</p>
                    <p className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   LOGOS
   ══════════════════════════════════════════════════════ */
function Logos() {
  const names = ['Shopify', 'Notion', 'Linear', 'Webflow', 'Vercel', 'Stripe'];
  return (
    <div className="border-y py-8" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="label text-center text-xs mb-6">Trusted by teams at</p>
        <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-4 opacity-40">
          {names.map(n => (
            <span key={n} className="text-sm font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HOW IT WORKS
   ══════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { n: '1', icon: Globe, title: 'Paste your URL', body: 'Athena crawls your site, extracts brand voice, analyses competitors, and maps your market position.' },
    { n: '2', icon: Brain, title: 'Strategy is built', body: 'Keyword targets, content calendar, email flows, ad creatives, and social plan — generated in seconds.' },
    { n: '3', icon: Zap, title: 'Athena executes', body: 'Writes, designs, schedules, and publishes across every channel. Approve first, or run on autopilot.' },
    { n: '4', icon: BarChart3, title: 'Daily briefing', body: 'Every morning at 8 AM: what happened, what\'s working, what Athena plans to do next.' },
  ];

  return (
    <section className="section-pad">
      <div className="max-w-[1120px] mx-auto px-6">
        <Reveal>
          <p className="label mb-3" style={{ color: 'var(--accent)' }}>How it works</p>
          <h2 className="heading-lg max-w-[520px] mb-12">From URL to full marketing in&nbsp;under a minute.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden" style={{ background: 'var(--border)' }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="p-6 h-full" style={{ background: 'var(--bg)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                    <s.icon size={15} style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--text-tertiary)' }}>STEP {s.n}</span>
                </div>
                <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="body-sm">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FEATURES
   ══════════════════════════════════════════════════════ */
function Features() {
  const items = [
    { icon: Search, title: 'SEO & Content', body: 'Keyword research, optimised blog posts, meta tags, internal linking. Tracks rankings weekly. Publishes to your CMS.', color: '#17b169' },
    { icon: Share2, title: 'Social Media', body: 'Platform-native content for 5 channels. Optimal timing. Brand voice consistency. Auto-generated visuals.', color: '#6c63ff' },
    { icon: Mail, title: 'Email Marketing', body: 'Welcome flows, cart recovery, win-back sequences. Subject line A/B testing. Klaviyo and Mailchimp native.', color: '#d946ef' },
    { icon: Target, title: 'Paid Ads', body: 'Meta, Google, and TikTok campaigns. Budget reallocation to top performers. Underperformers auto-paused.', color: '#f5a623' },
    { icon: BarChart3, title: 'Analytics', body: 'Cross-channel dashboard. Morning briefings. Weekly competitor reports. Monthly strategy reviews.', color: '#0ea5e9' },
    { icon: Shield, title: 'Brand Guardian', body: 'Every asset verified against your brand voice before publishing. Tone, terminology, style — nothing off-brand ships.', color: '#ee5a5a' },
  ];

  return (
    <section id="features" className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-[1120px] mx-auto px-6">
        <Reveal>
          <p className="label mb-3" style={{ color: 'var(--accent)' }}>Capabilities</p>
          <h2 className="heading-lg max-w-[480px] mb-4">Six channels.{' '}<span style={{ color: 'var(--text-tertiary)' }}>One agent.</span></h2>
          <p className="body-lg max-w-[440px] mb-12">Everything a marketing team does, running 24/7 without meetings.</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="card p-5 h-full">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${f.color}0d` }}>
                  <f.icon size={15} style={{ color: f.color }} />
                </div>
                <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="body-sm">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   RESULTS
   ══════════════════════════════════════════════════════ */
function Results() {
  const metrics = [
    { value: '142%', label: 'Organic traffic increase', period: '6 months' },
    { value: '3.2×', label: 'Social engagement lift', period: 'all platforms' },
    { value: '25+', label: 'Hours saved weekly', period: 'on average' },
    { value: '4.1×', label: 'Average ad ROAS', period: 'Meta + Google' },
  ];

  return (
    <section className="section-pad">
      <div className="max-w-[1120px] mx-auto px-6">
        <Reveal>
          <p className="label mb-3" style={{ color: 'var(--accent)' }}>Results</p>
          <h2 className="heading-lg max-w-[400px] mb-12">Numbers, not promises.</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 60}>
              <div>
                <p className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight leading-none gradient-text mb-1">{m.value}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{m.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{m.period}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   INTEGRATIONS
   ══════════════════════════════════════════════════════ */
function Integrations() {
  const items = ['Google Analytics', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Shopify', 'WordPress', 'Webflow', 'Klaviyo', 'Mailchimp', 'Instagram', 'LinkedIn', 'X', 'TikTok', 'Search Console'];

  return (
    <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <Reveal>
          <p className="label mb-3" style={{ color: 'var(--accent)' }}>Integrations</p>
          <h2 className="heading-lg mb-4">Connects to everything you use.</h2>
          <p className="body-lg mx-auto max-w-md mb-10">One-click setup. No engineering. Athena reads from and writes to your existing stack.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2">
            {items.map(n => (
              <span key={n} className="px-3 py-1.5 rounded-full text-[13px] font-medium" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{n}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS
   ══════════════════════════════════════════════════════ */
function Testimonials() {
  const items = [
    { name: 'Sarah Chen', title: 'Founder, Bloom Studio', quote: 'Athena replaced our marketing team of three. SEO content alone drove 40% more organic traffic in Q1.' },
    { name: 'Marcus Williams', title: 'CEO, NovaTech', quote: 'I was sceptical about AI brand voice. Athena nailed it from day one — social engagement tripled.' },
    { name: 'Priya Sharma', title: 'CMO, Elevate Digital', quote: 'The competitor intelligence alone justifies the cost. Athena spots trends before our analysts do.' },
  ];

  return (
    <section className="section-pad">
      <div className="max-w-[1120px] mx-auto px-6">
        <Reveal><h2 className="heading-lg text-center mb-12">Trusted by founders.</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div className="card p-5 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} fill="#f5a623" stroke="#f5a623" />)}
                </div>
                <p className="body-sm flex-1 mb-5">"{t.quote}"</p>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="label text-xs">{t.title}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PRICING
   ══════════════════════════════════════════════════════ */
function Pricing() {
  const plans = [
    { name: 'Starter', price: '49', desc: 'For solopreneurs and side projects.', features: ['Brand analysis', '4 SEO posts/mo', '20 social posts/mo', 'Morning briefings', 'Basic analytics', '1 integration'], cta: 'Start free trial' },
    { name: 'Growth', price: '149', desc: 'For growing businesses.', features: ['Everything in Starter', '12 SEO posts/mo', '60 social posts/mo', 'Email campaigns', 'Ads (1 platform)', 'Competitor intel', 'All integrations'], cta: 'Start free trial', popular: true },
    { name: 'Pro', price: '399', desc: 'Full marketing department.', features: ['Everything in Growth', 'Unlimited content', 'Ads (all platforms)', 'Custom AI training', 'White-label reports', 'API access', 'Priority support'], cta: 'Contact sales' },
  ];

  return (
    <section id="pricing" className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-[960px] mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="label mb-3" style={{ color: 'var(--accent)' }}>Pricing</p>
            <h2 className="heading-lg mb-3">Less than a freelancer.{' '}<span style={{ color: 'var(--text-tertiary)' }}>More than an agency.</span></h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="card p-6 h-full flex flex-col relative"
                style={{ borderColor: p.popular ? 'var(--accent)' : 'var(--border)', boxShadow: p.popular ? '0 8px 30px rgba(108,99,255,0.12)' : 'none' }}>
                {p.popular && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[11px] font-semibold text-white" style={{ background: 'var(--accent)' }}>Popular</span>
                )}
                <p className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                <p className="label text-xs mb-4">{p.desc}</p>
                <div className="mb-5">
                  <span className="text-[2rem] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>£{p.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>/mo</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={p.popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>{p.cta}</button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: 'How does Athena learn my brand?', a: 'Paste your URL. Athena crawls every page, analyses tone, visual identity, positioning, and competitors. In 30 seconds you get brand guidelines and a tailored strategy.' },
    { q: 'Can I approve content before it publishes?', a: 'Yes. Run Athena in approval mode or autopilot mode. Most users start with approval and switch to autopilot within a few weeks.' },
    { q: 'How is this different from ChatGPT?', a: 'ChatGPT generates text when you prompt it. Athena executes your entire marketing operation autonomously — research, writing, design, publishing, monitoring, optimising, and reporting.' },
    { q: 'How long until I see results?', a: 'Social and email: 2–4 weeks. SEO: 4–8 weeks. Paid ads: immediate. Morning briefings start on day one.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No contracts. Cancel from your dashboard and we\'ll export all your content and data.' },
  ];

  return (
    <section id="faq" className="section-pad">
      <div className="max-w-[640px] mx-auto px-6">
        <Reveal><h2 className="heading-lg text-center mb-10">FAQ</h2></Reveal>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {items.map((f, i) => (
            <Reveal key={i} delay={i * 30}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left py-4 flex items-start justify-between gap-4">
                <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>{f.q}</span>
                <ChevronDown size={16} className="flex-shrink-0 mt-1 transition-transform" style={{ color: 'var(--text-tertiary)', transform: open === i ? 'rotate(180deg)' : 'none' }} />
              </button>
              {open === i && <p className="body-sm pb-4 -mt-1">{f.a}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CTA
   ══════════════════════════════════════════════════════ */
function CTA() {
  const nav = useNavigate();
  return (
    <section className="section-pad px-6">
      <Reveal>
        <div className="max-w-[720px] mx-auto text-center rounded-2xl p-10 md:p-16"
          style={{ background: 'var(--text-primary)' }}>
          <h2 className="heading-lg text-white mb-4">Ready to put marketing on autopilot?</h2>
          <p className="text-[15px] mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join hundreds of businesses that replaced their marketing team with Athena.
          </p>
          <button onClick={() => nav('/onboarding')} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-white transition-all hover:bg-gray-100 active:scale-[0.98]" style={{ color: 'var(--text-primary)' }}>
            Start your free trial <ArrowRight size={14} />
          </button>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>7 days free · No credit card · Cancel anytime</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={10} color="#fff" />
          </div>
          <span className="text-[13px] font-semibold">Athena AI</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>© 2026 Athena AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */
export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Logos />
      <HowItWorks />
      <Features />
      <Results />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
