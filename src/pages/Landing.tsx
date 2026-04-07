import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Mail, Search, Share2, TrendingUp, Check, ChevronDown, Star, Play, Globe, Clock, Brain, Target, Shield, Bot, Menu, X } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────
function Nav() {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ background: scrolled ? 'rgba(5,5,7,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(34,34,48,0.5)' : '1px solid transparent', padding: scrolled ? '12px 0' : '16px 0' }}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav('/')}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Athena</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-white" style={{ color: 'var(--text-2)' }}>{item}</a>
            ))}
            <button onClick={() => nav('/dashboard')} className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>Dashboard</button>
            <button onClick={() => nav('/onboarding')} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text)' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-16" style={{ background: 'rgba(5,5,7,0.95)', backdropFilter: 'blur(20px)' }}>
          <div className="flex flex-col items-center gap-6 pt-12">
            {['Features', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-lg font-medium" style={{ color: 'var(--text)' }}>{item}</a>
            ))}
            <button onClick={() => { setMobileOpen(false); nav('/dashboard'); }} className="text-lg font-medium" style={{ color: 'var(--text-2)' }}>Dashboard</button>
            <button onClick={() => { setMobileOpen(false); nav('/onboarding'); }} className="px-6 py-3 rounded-xl text-sm font-semibold mt-4" style={{ background: 'var(--accent)', color: '#fff' }}>
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO ────────────────────────────────────────────
function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,92,252,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center pt-28 md:pt-32 pb-16">
        <Section>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 md:mb-8" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,92,252,0.25)', color: 'var(--accent-hover)' }}>
            <Sparkles size={12} /> Now in public beta — 7-day free trial
          </div>
        </Section>

        <Section delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1] tracking-tight mb-5">
            Your entire<br />
            <span className="glow-text">marketing team</span><br />
            in one AI
          </h1>
        </Section>

        <Section delay={200}>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>
            SEO, ads, social, email, and analytics — running autonomously while you sleep. Athena learns your brand, builds strategy, executes, and reports back every morning.
          </p>
        </Section>

        <Section delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => nav('/onboarding')} className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 30px -5px rgba(124,92,252,0.4)' }}>
              Start Free Trial <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 w-full sm:w-auto justify-center" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Play size={13} /> Watch Demo
            </button>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text-3)' }}>No credit card required · Setup in 30 seconds</p>
        </Section>

        {/* Product preview — hidden on small mobile, visible from sm up */}
        <Section delay={500}>
          <div className="mt-12 md:mt-16 mx-auto max-w-4xl rounded-2xl overflow-hidden hidden sm:block" style={{ border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: '0 0 60px -10px rgba(124,92,252,0.2)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
              </div>
              <div className="flex-1 text-center text-xs" style={{ color: 'var(--text-3)' }}>app.athena-ai.com</div>
            </div>
            <div className="p-4 md:p-6" style={{ background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
                {[
                  { label: 'Organic Traffic', value: '+142%', sub: 'vs last month', color: '#00D4AA' },
                  { label: 'Social Reach', value: '284K', sub: 'this week', color: '#7C5CFC' },
                  { label: 'Email Revenue', value: '£12.4K', sub: '3 campaigns', color: '#FF6B6B' },
                  { label: 'Ad ROAS', value: '4.2x', sub: 'all platforms', color: '#FEBC2E' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 md:p-4" style={{ background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>
                    <p className="text-[10px] md:text-xs mb-1 truncate" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                    <p className="text-lg md:text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] truncate" style={{ color: 'var(--text-3)' }}>{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3 md:p-4 flex items-start gap-3" style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)' }}>
                <Bot size={16} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="text-xs md:text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Good morning! Here's your daily briefing</p>
                  <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>Your blog post drove 2,400 organic visits yesterday — 3x your daily average. I've scheduled 4 social posts to amplify it. Meta ad spend is on track with a 3.8x ROAS.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── LOGOS ────────────────────────────────────────────
function LogoBar() {
  return (
    <Section>
      <div className="py-10 md:py-12 border-y px-5" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-center text-[10px] md:text-xs font-medium tracking-widest uppercase mb-6 md:mb-8" style={{ color: 'var(--text-3)' }}>Trusted by growing businesses</p>
        <div className="flex items-center justify-center gap-6 md:gap-12 opacity-40 flex-wrap">
          {['Acme Corp', 'NovaTech', 'Bright Studio', 'Elevate', 'Flux Labs', 'PeakScale'].map(name => (
            <span key={name} className="text-xs md:text-sm font-semibold tracking-wide" style={{ color: 'var(--text-2)' }}>{name}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', icon: Globe, title: 'Drop in your URL', desc: 'Athena crawls your site, studies your brand, analyses competitors, and builds a complete marketing profile in 30 seconds.' },
    { num: '02', icon: Brain, title: 'Athena builds your strategy', desc: 'AI generates brand guidelines, content calendar, keyword strategy, email flows, ad creatives, and social plan.' },
    { num: '03', icon: Zap, title: 'Autonomous execution', desc: 'Athena writes, designs, schedules, publishes, and optimises across every channel. Approve or run on autopilot.' },
    { num: '04', icon: BarChart3, title: 'Morning briefing', desc: 'Every morning at 8am, get a plain-English summary of yesterday\'s performance with actionable recommendations.' },
  ];

  return (
    <section className="py-16 md:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <Section>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>How it works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">From URL to full marketing<br className="hidden md:block" /> in under a minute</h2>
          <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text-2)' }}>No setup wizards. No 50-field forms. Just paste your website.</p>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 md:mt-16">
          {steps.map((s, i) => (
            <Section key={s.num} delay={i * 100}>
              <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="absolute top-0 right-0 text-7xl md:text-8xl font-black leading-none select-none" style={{ color: 'var(--border-subtle)', transform: 'translate(10px, -20px)' }}>{s.num}</div>
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,92,252,0.2)' }}>
                    <s.icon size={16} style={{ color: 'var(--accent-hover)' }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ────────────────────────────────────────
function Features() {
  const features = [
    { icon: Search, title: 'SEO & Content', desc: 'Researches keywords, writes optimised blog posts, generates images, and publishes directly to your CMS. Tracks rankings weekly.', color: '#00D4AA' },
    { icon: Share2, title: 'Social Media', desc: 'Creates platform-specific content, schedules at optimal times, generates visuals, and maintains your brand voice everywhere.', color: '#7C5CFC' },
    { icon: Mail, title: 'Email Marketing', desc: 'Builds automated flows. Writes subject lines that get opened. Designs templates. Segments audiences. A/B tests everything.', color: '#FF6B6B' },
    { icon: Target, title: 'Paid Advertising', desc: 'Manages Meta, Google, and TikTok campaigns. Reallocates budget to top performers. Pauses underperformers automatically.', color: '#FEBC2E' },
    { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Cross-channel dashboard. Morning briefings. Weekly competitor intel. Monthly strategy reviews with recommendations.', color: '#06B6D4' },
    { icon: Shield, title: 'Brand Guardian', desc: 'Every piece of content passes through brand voice verification. Tone, terminology, visual style — nothing off-brand goes out.', color: '#EC4899' },
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-5" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Capabilities</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">One AI. Every channel.</h2>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>Athena executes your entire marketing operation end to end.</p>
          </div>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Section key={f.title} delay={i * 80}>
              <div className="rounded-2xl p-5 md:p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                  <f.icon size={16} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESULTS ─────────────────────────────────────────
function Results() {
  const metrics = [
    { value: '142%', label: 'Organic traffic increase', sub: 'within 6 months' },
    { value: '3.2x', label: 'Social engagement lift', sub: 'all platforms' },
    { value: '25+', label: 'Hours saved per week', sub: 'on marketing' },
    { value: '4.1x', label: 'Average ad ROAS', sub: 'Meta + Google' },
  ];

  return (
    <section className="py-16 md:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Results</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Numbers that speak</h2>
          </div>
        </Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, i) => (
            <Section key={m.label} delay={i * 100}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold glow-text mb-2">{m.value}</p>
                <p className="text-xs md:text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{m.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{m.sub}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTEGRATIONS ────────────────────────────────────
function IntegrationsSection() {
  const integrations = ['Google Analytics', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Shopify', 'WordPress', 'Webflow', 'Klaviyo', 'Mailchimp', 'Instagram', 'LinkedIn', 'X / Twitter', 'TikTok', 'Search Console'];

  return (
    <section className="py-16 md:py-24 px-5" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Section>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Integrations</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Plugs into everything<br className="hidden sm:block" /> you already use</h2>
          <p className="text-base md:text-lg mb-10" style={{ color: 'var(--text-2)' }}>One-click connections. No engineering required.</p>
        </Section>
        <Section delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {integrations.map(name => (
              <div key={name} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                {name}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: 'Sarah Chen', role: 'Founder, Bloom Studio', text: 'Athena replaced our entire marketing team of three. The SEO content alone drove 40% more organic traffic in the first quarter.', stars: 5 },
    { name: 'Marcus Williams', role: 'CEO, NovaTech', text: 'I was sceptical about AI handling our brand voice, but Athena nailed it from day one. Our social engagement tripled.', stars: 5 },
    { name: 'Priya Sharma', role: 'CMO, Elevate Digital', text: 'The competitor intelligence alone is worth the subscription. Athena spots trends before our human analysts do.', stars: 5 },
  ];

  return (
    <section className="py-16 md:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Testimonials</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Loved by founders</h2>
          </div>
        </Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Section key={t.name} delay={i * 100}>
              <div className="rounded-2xl p-5 md:p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={13} fill="#FEBC2E" stroke="#FEBC2E" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{t.role}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────
function Pricing() {
  const plans = [
    { name: 'Starter', price: '£49', period: '/mo', desc: 'For solopreneurs', features: ['Brand analysis', 'SEO (4 posts/mo)', 'Social (20 posts/mo)', 'Morning briefings', 'Basic analytics', '1 integration'], popular: false },
    { name: 'Growth', price: '£149', period: '/mo', desc: 'For scaling businesses', features: ['Everything in Starter', 'SEO (12 posts/mo)', 'Social (60 posts/mo)', 'Email campaigns', 'Ads (1 platform)', 'Competitor intel', 'All integrations'], popular: true },
    { name: 'Pro', price: '£399', period: '/mo', desc: 'Full marketing dept', features: ['Everything in Growth', 'Unlimited SEO', 'Unlimited social', 'Unlimited email', 'Ads (all platforms)', 'Custom AI training', 'White-label reports', 'API access'], popular: false },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Less than a freelancer.<br className="hidden sm:block" /> More than an agency.</h2>
          </div>
        </Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <Section key={p.name} delay={i * 100}>
              <div className={`rounded-2xl p-6 h-full flex flex-col relative`} style={{ background: 'var(--surface)', border: p.popular ? '1px solid rgba(124,92,252,0.4)' : '1px solid var(--border)', boxShadow: p.popular ? '0 0 40px -10px rgba(124,92,252,0.25)' : 'none' }}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>Most Popular</div>}
                <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--text)' }}>{p.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>{p.desc}</p>
                <div className="mb-5">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text)' }}>{p.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-3)' }}>{p.period}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                      <Check size={13} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: p.popular ? 'var(--accent)' : 'var(--surface-3)', color: p.popular ? '#fff' : 'var(--text)', border: p.popular ? 'none' : '1px solid var(--border)' }}>
                  Start Free Trial
                </button>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How does Athena learn my brand?', a: 'Drop in your URL and Athena crawls every page, analyses tone, visual style, positioning, and competitors. In 30 seconds, she generates brand guidelines, competitive analysis, and a tailored marketing strategy.' },
    { q: 'Can I approve content before it goes live?', a: 'Yes. Run Athena in approval mode (review first) or autopilot mode (publish autonomously). Most start with approval and switch to autopilot once they trust the output.' },
    { q: 'What makes this different from ChatGPT?', a: 'ChatGPT generates content. Athena executes your entire marketing operation — researches, writes, designs, publishes, monitors, optimises ads, sends emails, and reports back autonomously.' },
    { q: 'Will the content sound like my brand?', a: 'Yes. Athena studies your existing content, learns your tone, vocabulary, and style, then applies Brand Guardian checks to every piece before it goes out.' },
    { q: 'How long until I see results?', a: '2-4 weeks for social and email, 4-8 weeks for SEO, immediate for paid ads. Morning briefings start day one.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in. Cancel from your dashboard. We\'ll export all your content and data.' },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Questions & Answers</h2>
          </div>
        </Section>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <Section key={i} delay={i * 50}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left rounded-xl p-4 md:p-5 transition-all" style={{ background: open === i ? 'var(--surface)' : 'transparent', border: `1px solid ${open === i ? 'var(--border)' : 'var(--border-subtle)'}` }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{f.q}</span>
                  <ChevronDown size={16} className="flex-shrink-0 transition-transform" style={{ color: 'var(--text-3)', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }} />
                </div>
                {open === i && <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.a}</p>}
              </button>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────
function FinalCTA() {
  const nav = useNavigate();
  return (
    <section className="py-16 md:py-24 px-5">
      <Section>
        <div className="max-w-4xl mx-auto rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to put marketing<br className="hidden sm:block" /> on autopilot?</h2>
            <p className="text-base md:text-lg mb-6 md:mb-8" style={{ color: 'var(--text-2)' }}>Join hundreds of businesses that replaced their marketing agency with Athena.</p>
            <button onClick={() => nav('/onboarding')} className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 40px -5px rgba(124,92,252,0.4)' }}>
              Start Your Free Trial <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs mt-4" style={{ color: 'var(--text-3)' }}>7-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </Section>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 md:py-12 px-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={11} className="text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Athena AI</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>© 2026 Athena AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Hero />
      <LogoBar />
      <HowItWorks />
      <Features />
      <Results />
      <IntegrationsSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
