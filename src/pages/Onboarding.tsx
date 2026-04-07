import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { Globe, Loader2, CheckCircle, Sparkles, Search, Brain, Target, BarChart3, Calendar, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: Globe, label: 'Crawling your website', duration: 1200 },
  { icon: Sparkles, label: 'Extracting brand identity', duration: 1000 },
  { icon: Search, label: 'Analysing competitors', duration: 1400 },
  { icon: Brain, label: 'Researching keywords', duration: 1100 },
  { icon: Target, label: 'Building strategy', duration: 1300 },
  { icon: Calendar, label: 'Generating content calendar', duration: 900 },
];

export default function Onboarding() {
  const nav = useNavigate();
  const { updateConfig } = useAppStore();
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<'input' | 'analysing' | 'done'>('input');
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (phase !== 'analysing') return;
    if (step >= STEPS.length) { setPhase('done'); return; }
    const t = setTimeout(() => setStep(s => s + 1), STEPS[step].duration);
    return () => clearTimeout(t);
  }, [phase, step]);

  const start = () => {
    if (!url.trim()) return;
    const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const name = host.split('.')[0];
    updateConfig({ businessUrl: url, businessName: name.charAt(0).toUpperCase() + name.slice(1) });
    setPhase('analysing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        {phase === 'input' && (
          <>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--accent)' }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <h1 className="heading-md text-center mb-2">Analyse your brand</h1>
            <p className="body-sm text-center mb-8">Paste your website and Athena handles the rest.</p>
            <div className="flex gap-2">
              <input
                value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && start()}
                placeholder="yourcompany.com"
                className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
                autoFocus
              />
              <button onClick={start} disabled={!url.trim()} className="btn-primary disabled:opacity-40">Analyse</button>
            </div>
          </>
        )}

        {phase === 'analysing' && (
          <>
            <h2 className="heading-md text-center mb-6">Analysing {url.replace(/^https?:\/\//, '')}</h2>
            <div className="space-y-2">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div key={s.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                    style={{ background: active ? 'var(--accent-light)' : 'transparent', border: `1px solid ${active ? 'var(--accent)20' : 'transparent'}` }}>
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: done ? 'var(--accent)' : active ? 'var(--accent-light)' : 'var(--bg-alt)' }}>
                      {done ? <CheckCircle size={13} color="#fff" /> : active ? <Loader2 size={13} className="animate-spin" style={{ color: 'var(--accent)' }} /> : <s.icon size={13} style={{ color: 'var(--text-tertiary)' }} />}
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: done ? 'var(--accent)' : active ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {phase === 'done' && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#17b16912' }}>
              <CheckCircle size={24} color="#17b169" />
            </div>
            <h2 className="heading-md mb-2">Your brand is ready</h2>
            <p className="body-sm mb-6">Strategy built. Content calendar generated. Let's go.</p>
            <button onClick={() => nav('/dashboard')} className="btn-primary mx-auto">
              Open dashboard <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
