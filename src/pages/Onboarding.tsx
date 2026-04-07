import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { Globe, Loader2, CheckCircle, Sparkles, Search, Brain, Target, BarChart3, Calendar } from 'lucide-react';

const STEPS = [
  { icon: Globe, label: 'Crawling your website', duration: 1200 },
  { icon: Sparkles, label: 'Extracting brand identity', duration: 1000 },
  { icon: Search, label: 'Analysing competitors', duration: 1400 },
  { icon: Brain, label: 'Researching keywords', duration: 1100 },
  { icon: Target, label: 'Building marketing strategy', duration: 1300 },
  { icon: Calendar, label: 'Generating content calendar', duration: 900 },
];

export default function Onboarding() {
  const nav = useNavigate();
  const { updateConfig } = useAppStore();
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<'input' | 'analysing' | 'done'>('input');
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (phase !== 'analysing') return;
    if (stepIdx >= STEPS.length) { setPhase('done'); return; }
    const t = setTimeout(() => setStepIdx(s => s + 1), STEPS[stepIdx].duration);
    return () => clearTimeout(t);
  }, [phase, stepIdx]);

  const start = () => {
    if (!url.trim()) return;
    const clean = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    updateConfig({ businessUrl: url, businessName: clean.split('.')[0].charAt(0).toUpperCase() + clean.split('.')[0].slice(1) });
    setPhase('analysing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-lg">
        {phase === 'input' && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent)' }}>
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>Let's analyse your brand</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>Paste your website URL and Athena will do the rest.</p>
            <div className="flex gap-2">
              <input value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && start()} placeholder="yoursite.com" className="flex-1 rounded-lg px-4 py-3 text-sm outline-none" style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} autoFocus />
              <button onClick={start} disabled={!url.trim()} className="px-5 py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-40" style={{ background: 'var(--accent)' }}>
                Analyse
              </button>
            </div>
          </div>
        )}

        {phase === 'analysing' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--text)' }}>Analysing {url.replace(/^https?:\/\//, '')}</h2>
            <div className="space-y-3">
              {STEPS.map((s, i) => {
                const done = i < stepIdx;
                const active = i === stepIdx;
                return (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl transition-all" style={{ background: active ? 'var(--bg-2)' : 'transparent', border: active ? '1px solid var(--border)' : '1px solid transparent' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: done ? 'var(--accent)' : active ? 'var(--bg-2)' : 'var(--surface-2)' }}>
                      {done ? <CheckCircle size={14} className="text-white" /> : active ? <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent)' }} /> : <s.icon size={14} style={{ color: 'var(--text-3)' }} />}
                    </div>
                    <span className="text-sm font-medium" style={{ color: done ? 'var(--accent)' : active ? 'var(--text)' : 'var(--text-3)' }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(0,212,170,0.1)' }}>
              <CheckCircle size={28} style={{ color: '#00d4aa' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Your brand is ready</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>Athena has built your brand profile, content calendar, and marketing strategy.</p>
            <button onClick={() => nav('/dashboard')} className="px-6 py-3 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
              Go to dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
