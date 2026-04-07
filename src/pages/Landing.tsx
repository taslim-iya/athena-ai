import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Mail, Search, Share2, TrendingUp, Check, ChevronDown, Star, Play, Globe, Clock, Brain, Target, Shield, Menu, X, Bot } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return <div ref={ref} className={`transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ═══════ NAV ═══════ */
function Nav() {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav('/')}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-base font-bold" style={{ color: 'var(--text)' }}>Athena</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {['Features', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-[var(--text)]" style={{ color: 'var(--text-2)' }}>{item}</a>
            ))}
            <button onClick={() => nav('/dashboard')} className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>Dashboard</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium px-4 py-2" style={{ color: 'var(--text-2)' }}>Sign in</button>
            <button onClick={() => nav('/onboarding')} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
              Get started <span className="ml-1">›</span>
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: 'var(--text)' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="flex flex-col items-center gap-6 pt-12">
            {['Features', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-lg font-medium" style={{ color: 'var(--text)' }}>{item}</a>
            ))}
            <button onClick={() => { setOpen(false); nav('/onboarding'); }} className="px-6 py-3 rounded-xl text-sm font-semibold mt-4 text-white" style={{ background: 'var(--accent)' }}>
              Get started free
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════ HERO ═══════ */
function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative overflow-hidden">
      {/* Stripe-style gradient mesh */}
      <div className="absolute top-0 right-0 w-full h-[600px] md:h-[700px] opacity-60" style={{
        background: 'linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(236,72,153,0.25) 25%, rgba(249,115,22,0.3) 50%, rgba(251,191,36,0.2) 75%, rgba(110,231,183,0.15) 100%)',
        borderRadius: '0 0 0 40%',
      }} />
      <div className="absolute top-20 right-[-10%] w-[60%] h-[500px] md:h-[600px] opacity-40 hero-gradient" style={{ borderRadius: '30% 0 30% 60%', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-28 md:pt-36 pb-16 md:pb-24">
        <Reveal>
          <p className="text-sm font-medium mb-5" style={{ color: 'var(--text-3)' }}>
            Autonomous AI marketing agent <span className="inline-block w-1 h-1 rounded-full mx-2 align-middle" style={{ background: 'var(--text-3)' }} /> 7-day free trial
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-3xl">
            Your entire{' '}
            <span className="gradient-text">marketing team</span>{' '}
            in one AI.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg md:text-xl max-w-lg mb-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>
            SEO, ads, social, email, and analytics — running autonomously. Athena learns your brand and reports back every morning.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => nav('/onboarding')} className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'var(--accent)' }}>
              Get started <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium transition-all hover:bg-gray-50" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Play size={13} /> Watch demo
            </button>
          </div>
        </Reveal>

        {/* Product preview */}
        <Reveal delay={500}>
          <div className="mt-14 md:mt-20 max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-black/10" style={{ border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
              </div>
              <div className="flex-1 text-center text-xs" style={{ color: 'var(--text-3)' }}>app.athena-ai.com</div>
            </div>
            <div className="p-4 md:p-6" style={{ background: 'var(--bg-2)' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                {[
                  { label: 'Organic Traffic', value: '+142%', color: '#00d4aa' },
                  { label: 'Social Reach', value: '284K', color: '#635bff' },
                  { label: 'Email Revenue', value: '£12.4K', color: '#e44ced' },
                  { label: 'Ad ROAS', value: '4.2x', color: '#ff7a45' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 md:p-4 bg-white" style={{ border: '1px solid var(--border)' }}>
                    <p className="text-[10px] md:text-xs mb-1 truncate" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                    <p className="text-lg md:text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3 md:p-4 bg-white flex items-start gap-3" style={{ border: '1px solid var(--border)' }}>
                <Bot size={16} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="text-xs md:text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Good morning! Here's your briefing</p>
                  <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>Your blog post drove 2,400 organic visits yesterday — 3x your daily average. I've scheduled 4 social posts to amplify it.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════ LOGOS ═══════ */
function LogoBar() {
  return (
    <Reveal>
      <div className="py-10 md:py-14 px-5 border-y" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-50">
          {[
            { name: 'OpenAI', weight: 700 },
            { name: 'depop', weight: 800, italic: true },
            { name: 'Shopify', weight: 700 },
            { name: 'Notion', weight: 700 },
            { name: 'Linear', weight: 600 },
            { name: 'Vercel', weight: 700 },
          ].map(b => (
            <span key={b.name} className="text-sm md:text-base tracking-tight" style={{ color: 'var(--text)', fontWeight: b.weight, fontStyle: b.italic ? 'italic' : 'normal' }}>{b.name}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════ HOW IT WORKS ═══════ */
function HowItWorks() {
  const steps = [
    { num: '01', icon: Globe, title: 'Drop in your URL', desc: 'Athena crawls your site, studies your brand, analyses competitors, and builds a complete marketing profile.' },
    { num: '02', icon: Brain, title: 'Strategy is built', desc: 'AI generates brand guidelines, content calendar, keyword targets, email flows, ad creatives, and social plan.' },
    { num: '03', icon: Zap, title: 'Autonomous execution', desc: 'Athena writes, designs, schedules, publishes, and optimises across every channel automatically.' },
    { num: '04', icon: BarChart3, title: 'Morning briefing', desc: 'Every morning at 8am, a plain-English summary of what happened and what\'s planned next.' },
  ];

  return (
    <section className="py-16 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold leading-tight mb-3 max-w-2xl">
            From URL to full marketing{' '}
            <span style={{ color: 'var(--text-3)' }}>in under a minute.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="p-5 md:p-6 rounded-2xl h-full" style={{ background: 'var(--bg-2)', border: '1px solid var(--border-subtle)' }}>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{s.num}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mt-3 mb-4" style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <s.icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ FEATURES ═══════ */
function Features() {
  const features = [
    { icon: Search, title: 'SEO & Content', desc: 'Keyword research, optimised blog posts, image generation, and direct CMS publishing. Rankings tracked weekly.', color: '#635bff' },
    { icon: Share2, title: 'Social Media', desc: 'Platform-specific content at optimal times. Visuals generated. Brand voice maintained across 5 platforms.', color: '#e44ced' },
    { icon: Mail, title: 'Email Marketing', desc: 'Automated flows. Subject lines that convert. Audience segmentation. A/B testing. Klaviyo + Mailchimp.', color: '#ff7a45' },
    { icon: Target, title: 'Paid Advertising', desc: 'Meta, Google, TikTok campaigns. Auto-budget reallocation. Underperformers paused. ROAS optimised.', color: '#00d4aa' },
    { icon: BarChart3, title: 'Analytics', desc: 'Cross-channel dashboard. Morning briefings. Weekly competitor reports. Monthly strategy reviews.', color: '#06b6d4' },
    { icon: Shield, title: 'Brand Guardian', desc: 'Every piece of content verified against your brand voice. Nothing off-brand ever goes live.', color: '#f43f5e' },
  ];

  return (
    <section id="features" className="py-16 md:py-28 px-5" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold leading-tight mb-3 max-w-2xl">
            Flexible solutions for every channel.{' '}
            <span style={{ color: 'var(--text-3)' }}>Grow your business with autonomous AI marketing.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="p-5 md:p-6 rounded-2xl bg-white h-full group hover:shadow-lg hover:shadow-black/5 transition-shadow" style={{ border: '1px solid var(--border)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: `${f.color}10` }}>
                  <f.icon size={16} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.desc}</p>
                <button className="flex items-center gap-1 text-xs font-medium mt-4 group-hover:gap-2 transition-all" style={{ color: f.color }}>
                  Learn more <ArrowRight size={12} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ RESULTS ═══════ */
function Results() {
  return (
    <section className="py-16 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold leading-tight mb-12 md:mb-16 max-w-2xl">
            Numbers that{' '}
            <span className="gradient-text">speak for themselves.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: '142%', label: 'Organic traffic increase' },
            { value: '3.2x', label: 'Social engagement lift' },
            { value: '25+', label: 'Hours saved per week' },
            { value: '4.1x', label: 'Average ad ROAS' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div>
                <p className="text-3xl md:text-5xl font-extrabold mb-1 gradient-text">{m.value}</p>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ INTEGRATIONS ═══════ */
function Integrations() {
  return (
    <section className="py-16 md:py-24 px-5" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-4">Plugs into everything.</h2>
          <p className="text-base md:text-lg mb-10" style={{ color: 'var(--text-2)' }}>One-click connections. No engineering required.</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {['Google Analytics', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Shopify', 'WordPress', 'Webflow', 'Klaviyo', 'Mailchimp', 'Instagram', 'LinkedIn', 'X / Twitter', 'TikTok', 'Search Console'].map(n => (
              <div key={n} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium bg-white" style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                {n}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════ TESTIMONIALS ═══════ */
function Testimonials() {
  const testimonials = [
    { name: 'Sarah Chen', role: 'Founder, Bloom Studio', text: 'Athena replaced our entire marketing team of three. The SEO content alone drove 40% more organic traffic in the first quarter.' },
    { name: 'Marcus Williams', role: 'CEO, NovaTech', text: 'I was sceptical about AI handling our brand voice, but Athena nailed it from day one. Our social engagement tripled.' },
    { name: 'Priya Sharma', role: 'CMO, Elevate Digital', text: 'The competitor intelligence alone is worth the subscription. Athena spots trends before our human analysts do.' },
  ];

  return (
    <section className="py-16 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-12 text-center">Loved by founders.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="p-5 md:p-6 rounded-2xl h-full" style={{ background: 'var(--bg-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} fill="#FEBC2E" stroke="#FEBC2E" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>"{t.text}"</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ PRICING ═══════ */
function Pricing() {
  const plans = [
    { name: 'Starter', price: '£49', desc: 'For solopreneurs', features: ['Brand analysis', 'SEO (4 posts/mo)', 'Social (20 posts/mo)', 'Morning briefings', 'Basic analytics', '1 integration'], popular: false },
    { name: 'Growth', price: '£149', desc: 'For scaling businesses', features: ['Everything in Starter', 'SEO (12 posts/mo)', 'Social (60 posts/mo)', 'Email campaigns', 'Ads (1 platform)', 'Competitor intel', 'All integrations'], popular: true },
    { name: 'Pro', price: '£399', desc: 'Full marketing dept', features: ['Everything in Growth', 'Unlimited content', 'Ads (all platforms)', 'Custom AI training', 'White-label reports', 'API access', 'Priority support'], popular: false },
  ];

  return (
    <section id="pricing" className="py-16 md:py-28 px-5" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold leading-tight mb-3">
              Less than a freelancer.{' '}<br className="hidden sm:block" />
              <span style={{ color: 'var(--text-3)' }}>More than an agency.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`rounded-2xl p-6 h-full flex flex-col bg-white relative`} style={{
                border: p.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
                boxShadow: p.popular ? '0 8px 40px -10px rgba(99,91,255,0.2)' : 'none',
              }}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'var(--accent)' }}>Most Popular</div>}
                <p className="text-base font-bold mb-0.5" style={{ color: 'var(--text)' }}>{p.name}</p>
                <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>{p.desc}</p>
                <div className="mb-5">
                  <span className="text-4xl font-extrabold" style={{ color: 'var(--text)' }}>{p.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-3)' }}>/mo</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-2)' }}>
                      <Check size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{
                  background: p.popular ? 'var(--accent)' : 'transparent',
                  color: p.popular ? '#fff' : 'var(--text)',
                  border: p.popular ? 'none' : '1px solid var(--border)',
                }}>
                  Start free trial <span className="ml-1">›</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ FAQ ═══════ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How does Athena learn my brand?', a: 'Drop in your URL and Athena crawls every page, analyses tone, visual style, positioning, and competitors. In 30 seconds, she generates brand guidelines and a tailored marketing strategy.' },
    { q: 'Can I approve content before it goes live?', a: 'Yes. Run in approval mode or autopilot mode. Most start with approval and switch to autopilot once they trust the output.' },
    { q: 'What makes this different from ChatGPT?', a: 'ChatGPT generates content on demand. Athena executes your entire marketing operation — researches, writes, designs, publishes, monitors, optimises ads, sends emails, and reports back autonomously.' },
    { q: 'How long until I see results?', a: '2-4 weeks for social and email, 4-8 weeks for SEO, immediate for paid ads. Morning briefings start day one.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in. Cancel from your dashboard and we\'ll export all your content and data.' },
  ];

  return (
    <section id="faq" className="py-16 md:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-10 text-center">FAQ</h2></Reveal>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left rounded-xl p-4 md:p-5 transition-all hover:bg-gray-50" style={{ border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{f.q}</span>
                  <ChevronDown size={16} className="flex-shrink-0 transition-transform" style={{ color: 'var(--text-3)', transform: open === i ? 'rotate(180deg)' : 'none' }} />
                </div>
                {open === i && <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.a}</p>}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ CTA ═══════ */
function FinalCTA() {
  const nav = useNavigate();
  return (
    <section className="py-16 md:py-28 px-5">
      <Reveal>
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-16 text-center relative overflow-hidden" style={{ background: 'var(--accent)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Ready to put marketing<br className="hidden sm:block" /> on autopilot?</h2>
            <p className="text-base md:text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>Join hundreds of businesses that replaced their marketing agency with Athena.</p>
            <button onClick={() => nav('/onboarding')} className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold bg-white transition-all hover:bg-gray-50 active:scale-[0.98]" style={{ color: 'var(--accent)' }}>
              Start your free trial <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>7-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════ FOOTER ═══════ */
function Footer() {
  return (
    <footer className="py-10 px-5 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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

/* ═══════ PAGE ═══════ */
export default function Landing() {
  return (
    <div className="overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <Nav />
      <Hero />
      <LogoBar />
      <HowItWorks />
      <Features />
      <Results />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
