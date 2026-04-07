import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Mail, Search, Share2, TrendingUp, Check, ChevronDown, Star, Play, Globe, Clock, Brain, Target, Shield, Users, MessageSquare, Bot } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
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

// ─── HERO ────────────────────────────────────────────
function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,92,252,0.12) 0%, transparent 70%)' }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.15) 0%, transparent 70%)', animation: 'pulse-glow 4s ease-in-out infinite' }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)', animation: 'pulse-glow 5s ease-in-out infinite 1s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <Section>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,92,252,0.25)', color: 'var(--accent-hover)' }}>
            <Sparkles size={12} /> Now in public beta — 7-day free trial
          </div>
        </Section>

        {/* Headline */}
        <Section delay={100}>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Your entire<br />
            <span className="glow-text">marketing team</span><br />
            in one AI
          </h1>
        </Section>

        <Section delay={200}>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-2)' }}>
            SEO, ads, social, email, and analytics — running autonomously while you sleep. 
            Athena learns your brand, builds strategy, executes, and reports back every morning.
          </p>
        </Section>

        <Section delay={300}>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => nav('/onboarding')} className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 30px -5px rgba(124,92,252,0.4)' }}>
              Start Free Trial <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              <Play size={14} /> Watch Demo
            </button>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text-3)' }}>No credit card required · Setup in 30 seconds</p>
        </Section>

        {/* Product preview */}
        <Section delay={500}>
          <div className="mt-16 mx-auto max-w-4xl rounded-2xl overflow-hidden glow" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              </div>
              <div className="flex-1 text-center text-xs" style={{ color: 'var(--text-3)' }}>app.athena-ai.com</div>
            </div>
            <div className="p-6" style={{ background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)' }}>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Organic Traffic', value: '+142%', sub: 'vs last month', color: '#00D4AA' },
                  { label: 'Social Reach', value: '284K', sub: 'impressions this week', color: '#7C5CFC' },
                  { label: 'Email Revenue', value: '£12.4K', sub: 'from 3 campaigns', color: '#FF6B6B' },
                  { label: 'Ad ROAS', value: '4.2x', sub: 'across all platforms', color: '#FEBC2E' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-4" style={{ background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)' }}>
                <Bot size={18} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Good morning! Here's your daily briefing</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>Your blog post "10 Ways to Boost Retention" drove 2,400 organic visits yesterday — 3x your daily average. I've scheduled 4 social posts to amplify it. Meta ad spend is on track at £42/day with a 3.8x ROAS. I paused the underperforming "Summer Sale" ad set and reallocated £15/day to "Retargeting — Cart Abandoners" which is converting at 5.1x.</p>
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
      <div className="py-12 border-y" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-center text-xs font-medium tracking-widest uppercase mb-8" style={{ color: 'var(--text-3)' }}>Trusted by growing businesses everywhere</p>
        <div className="flex items-center justify-center gap-12 opacity-40 flex-wrap px-6">
          {['Acme Corp', 'NovaTech', 'Bright Studio', 'Elevate Digital', 'Flux Labs', 'PeakScale'].map(name => (
            <span key={name} className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text-2)' }}>{name}</span>
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
    { num: '02', icon: Brain, title: 'Athena builds your strategy', desc: 'AI generates your brand guidelines, content calendar, keyword strategy, email flows, ad creatives, and social plan — all tailored to your business.' },
    { num: '03', icon: Zap, title: 'Autonomous execution', desc: 'Athena writes, designs, schedules, publishes, and optimises across every channel. You approve or let her run on autopilot.' },
    { num: '04', icon: BarChart3, title: 'Morning briefing', desc: 'Every morning at 8am, get a plain-English summary of yesterday\'s performance with specific, actionable recommendations.' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Section>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>How it works</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">From URL to full marketing<br />in under a minute</h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-2)' }}>No setup wizards. No 50-field forms. Just paste your website and Athena does the rest.</p>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
          {steps.map((s, i) => (
            <Section key={s.num} delay={i * 100}>
              <div className="group rounded-2xl p-7 transition-all duration-300 hover:scale-[1.01]" style={{ background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-0 right-0 text-8xl font-black leading-none" style={{ color: 'var(--border-subtle)', transform: 'translate(10px, -20px)' }}>{s.num}</div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(124,92,252,0.2)' }}>
                    <s.icon size={18} style={{ color: 'var(--accent-hover)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
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

// ─── FEATURES (Bento Grid) ──────────────────────────
function Features() {
  const features = [
    { icon: Search, title: 'SEO & Content', desc: 'Researches keywords, writes 1,500-2,000 word optimised blog posts, generates featured images, and publishes directly to your CMS. Tracks rankings and adjusts strategy weekly.', color: '#00D4AA', span: 'col-span-2' },
    { icon: Share2, title: 'Social Media', desc: 'Creates platform-specific content, schedules posts at optimal times, generates visuals, and maintains your brand voice across Instagram, LinkedIn, X, Facebook, and TikTok.', color: '#7C5CFC', span: '' },
    { icon: Mail, title: 'Email Marketing', desc: 'Builds automated flows in Klaviyo or Mailchimp. Writes subject lines that get opened. Designs templates. Segments audiences. A/B tests everything.', color: '#FF6B6B', span: '' },
    { icon: Target, title: 'Paid Advertising', desc: 'Manages Meta, Google, and TikTok campaigns. Reallocates budget to top performers daily. Pauses underperformers. Generates new creatives from winning patterns.', color: '#FEBC2E', span: 'col-span-2' },
    { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Cross-channel performance dashboard. Morning briefings. Weekly competitor intelligence. Monthly strategy reviews with actionable recommendations.', color: '#06B6D4', span: '' },
    { icon: Shield, title: 'Brand Guardian', desc: 'Every piece of content passes through brand voice verification. Tone, terminology, visual style — nothing goes out that doesn\'t sound like you.', color: '#EC4899', span: '' },
  ];

  return (
    <section className="py-24 px-6" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Capabilities</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">One AI. Every channel.</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>Athena doesn't just write content — she executes your entire marketing operation end to end.</p>
          </div>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <Section key={f.title} delay={i * 80}>
              <div className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.005] h-full ${f.span}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                  <f.icon size={16} style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
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
    { value: '142%', label: 'Average increase in organic traffic', sub: 'within 6 months' },
    { value: '3.2x', label: 'Social engagement improvement', sub: 'across all platforms' },
    { value: '25+', label: 'Hours saved per week', sub: 'on marketing tasks' },
    { value: '4.1x', label: 'Average ad ROAS', sub: 'Meta + Google combined' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Results</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Numbers that speak</h2>
          </div>
        </Section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <Section key={m.label} delay={i * 100}>
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold glow-text mb-2">{m.value}</p>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{m.label}</p>
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
  const integrations = [
    'Google Analytics', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'Shopify',
    'WordPress', 'Webflow', 'Klaviyo', 'Mailchimp', 'Instagram',
    'Facebook', 'LinkedIn', 'X / Twitter', 'TikTok', 'Search Console',
  ];

  return (
    <section className="py-24 px-6" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Section>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Integrations</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Plugs into everything<br />you already use</h2>
          <p className="text-lg mb-12" style={{ color: 'var(--text-2)' }}>One-click connections. No engineering required.</p>
        </Section>
        <Section delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.map(name => (
              <div key={name} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
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
    { name: 'Sarah Chen', role: 'Founder, Bloom Studio', text: 'Athena replaced our entire marketing team of three. The SEO content alone drove 40% more organic traffic in the first quarter. The morning briefings are incredibly actionable.', stars: 5 },
    { name: 'Marcus Williams', role: 'CEO, NovaTech', text: 'I was sceptical about AI handling our brand voice, but Athena nailed it from day one. Our social engagement tripled and the ad optimisation saves us thousands every month.', stars: 5 },
    { name: 'Priya Sharma', role: 'CMO, Elevate Digital', text: 'The competitor intelligence alone is worth the subscription. Athena spots trends before our human analysts. The fact that it executes on those insights automatically is the real magic.', stars: 5 },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Testimonials</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Loved by founders<br />and marketing teams</h2>
          </div>
        </Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Section key={t.name} delay={i * 100}>
              <div className="rounded-2xl p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#FEBC2E" stroke="#FEBC2E" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>"{t.text}"</p>
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
    { name: 'Starter', price: '£49', period: '/mo', desc: 'Perfect for solopreneurs and side projects', features: ['Brand analysis & strategy', 'SEO content (4 posts/mo)', 'Social media (20 posts/mo)', 'Morning briefings', 'Basic analytics', '1 integration'], cta: 'Start Free Trial', popular: false },
    { name: 'Growth', price: '£149', period: '/mo', desc: 'For businesses ready to scale their marketing', features: ['Everything in Starter', 'SEO content (12 posts/mo)', 'Social media (60 posts/mo)', 'Email campaigns (4/mo)', 'Ad management (1 platform)', 'Competitor intelligence', 'All integrations', 'Priority support'], cta: 'Start Free Trial', popular: true },
    { name: 'Pro', price: '£399', period: '/mo', desc: 'Full autonomous marketing department', features: ['Everything in Growth', 'Unlimited SEO content', 'Unlimited social posts', 'Unlimited email campaigns', 'Ad management (all platforms)', 'Custom AI training', 'White-label reports', 'Dedicated account manager', 'API access'], cta: 'Start Free Trial', popular: false },
  ];

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Less than a single freelancer.<br />More than an entire agency.</h2>
          </div>
        </Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Section key={p.name} delay={i * 100}>
              <div className={`rounded-2xl p-7 h-full flex flex-col relative ${p.popular ? 'glow glow-border' : ''}`} style={{ background: 'var(--surface)', border: p.popular ? undefined : '1px solid var(--border)' }}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>Most Popular</div>
                )}
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{p.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>{p.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text)' }}>{p.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-3)' }}>{p.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                      <Check size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: p.popular ? 'var(--accent)' : 'var(--surface-3)', color: p.popular ? '#fff' : 'var(--text)', border: p.popular ? 'none' : '1px solid var(--border)' }}>
                  {p.cta}
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
    { q: 'How does Athena learn my brand?', a: 'Drop in your website URL and Athena crawls every page, analyses your tone, visual style, positioning, and competitors. In 30 seconds, she generates brand guidelines, a competitive analysis, and a tailored marketing strategy.' },
    { q: 'Can I approve content before it goes live?', a: 'Absolutely. You can run Athena in approval mode (review everything first) or autopilot mode (she publishes autonomously). Most users start with approval and switch to autopilot once they trust the output.' },
    { q: 'What makes this different from ChatGPT or Jasper?', a: 'Those tools generate content. Athena executes your entire marketing operation. She researches, writes, designs, publishes, monitors performance, optimises ads, sends emails, and reports back — all autonomously.' },
    { q: 'Will the content actually sound like my brand?', a: 'Yes. Athena studies your existing content, learns your tone, vocabulary, and style preferences, then applies Brand Guardian checks to every piece of content before it goes out. Nothing generic.' },
    { q: 'How long until I see results?', a: 'Most businesses see measurable improvement within 2-4 weeks for social and email, 4-8 weeks for SEO, and immediate results for paid ads. The morning briefings start from day one.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in. Cancel anytime from your dashboard. We\'ll export all your content and data.' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Questions & Answers</h2>
          </div>
        </Section>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <Section key={i} delay={i * 50}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left rounded-xl p-5 transition-all" style={{ background: open === i ? 'var(--surface)' : 'transparent', border: `1px solid ${open === i ? 'var(--border)' : 'var(--border-subtle)'}` }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{f.q}</span>
                  <ChevronDown size={16} className="transition-transform" style={{ color: 'var(--text-3)', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }} />
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
    <section className="py-24 px-6">
      <Section>
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.1) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to put marketing<br />on autopilot?</h2>
            <p className="text-lg mb-8" style={{ color: 'var(--text-2)' }}>Join hundreds of businesses that replaced their marketing agency with Athena.</p>
            <button onClick={() => nav('/onboarding')} className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 40px -5px rgba(124,92,252,0.4)' }}>
              Start Your Free Trial <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs mt-4" style={{ color: 'var(--text-3)' }}>7-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </Section>
    </section>
  );
}

// ─── NAV ─────────────────────────────────────────────
function Nav() {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass' : ''}`} style={{ padding: scrolled ? '12px 0' : '20px 0' }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav('/')}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-base font-bold" style={{ color: 'var(--text)' }}>Athena</span>
        </div>
        <div className="flex items-center gap-6">
          {['Features', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-white" style={{ color: 'var(--text-2)' }}>{item}</a>
          ))}
          <button onClick={() => nav('/dashboard')} className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>Dashboard</button>
          <button onClick={() => nav('/onboarding')} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]" style={{ background: 'var(--accent)', color: '#fff' }}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={12} className="text-white" />
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
    <div>
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
