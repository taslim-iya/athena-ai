import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Loader2, Check, Sparkles, ArrowRight, Brain, Search, Users, BarChart3, Palette, Target } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

type Phase = 'input' | 'analyzing' | 'results';

interface AnalysisStep {
  icon: typeof Globe;
  label: string;
  detail: string;
  done: boolean;
}

export default function Onboarding() {
  const nav = useNavigate();
  const { updateBrand, updateConfig } = useAppStore();
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<Phase>('input');
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { icon: Globe, label: 'Crawling website', detail: 'Reading every page, image, and meta tag...', done: false },
    { icon: Palette, label: 'Extracting brand identity', detail: 'Tone of voice, colours, typography, messaging...', done: false },
    { icon: Users, label: 'Analysing competitors', detail: 'Identifying top 5 competitors and their strategies...', done: false },
    { icon: Search, label: 'Keyword research', detail: 'Finding high-value keywords you should own...', done: false },
    { icon: Target, label: 'Building marketing strategy', detail: 'SEO, social, email, and ad plans tailored to you...', done: false },
    { icon: Brain, label: 'Generating content calendar', detail: 'Planning your first month of content...', done: false },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const startAnalysis = () => {
    if (!url.trim()) return;
    setPhase('analyzing');

    // Simulate the analysis steps
    let step = 0;
    const interval = setInterval(() => {
      setSteps(prev => prev.map((s, i) => i === step ? { ...s, done: true } : s));
      step++;
      setCurrentStep(step);
      if (step >= 6) {
        clearInterval(interval);
        setTimeout(() => {
          // Generate brand data
          const domain = url.replace(/https?:\/\//, '').replace(/\/$/, '').split('/')[0];
          const name = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
          updateBrand({
            name,
            url: url.startsWith('http') ? url : `https://${url}`,
            description: `${name} is a modern business delivering exceptional products and services to their customers.`,
            industry: 'Technology & Services',
            tone: 'Professional yet approachable',
            colors: ['#7C5CFC', '#00D4AA', '#1A1A2E'],
            competitors: [
              { name: 'Competitor A', url: 'https://example.com', strengths: ['Strong SEO', 'Active social'], weaknesses: ['Poor email strategy'] },
              { name: 'Competitor B', url: 'https://example2.com', strengths: ['Great ad ROAS'], weaknesses: ['Weak content'] },
            ],
            keywords: ['digital marketing', 'growth strategy', 'brand building', 'conversion optimisation', 'content marketing'],
            guidelines: `Brand Voice: Professional yet approachable. Avoid jargon. Use active voice. Be specific with data and results. Address the reader directly.`,
          });
          updateConfig({ businessUrl: url, onboarded: true });
          setPhase('results');
        }, 800);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(124,92,252,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold">Athena</span>
        </div>

        {phase === 'input' && (
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Let's learn your business</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>
              Paste your website URL and Athena will analyse your brand, competitors, and market in seconds.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Globe size={16} style={{ color: 'var(--text-3)' }} />
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && startAnalysis()}
                  placeholder="yourcompany.com"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text)' }}
                  autoFocus
                />
              </div>
              <button onClick={startAnalysis} className="px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: 'var(--accent)', color: '#fff' }}>
                Analyse <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {phase === 'analyzing' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Athena is studying your business</h2>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>This usually takes about 30 seconds...</p>
            </div>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 rounded-xl p-4 transition-all" style={{
                  background: step.done ? 'rgba(0,212,170,0.05)' : i === currentStep ? 'var(--surface)' : 'transparent',
                  border: `1px solid ${step.done ? 'rgba(0,212,170,0.2)' : i === currentStep ? 'var(--border)' : 'var(--border-subtle)'}`,
                  opacity: i > currentStep ? 0.4 : 1,
                }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: step.done ? 'rgba(0,212,170,0.15)' : 'var(--surface-2)' }}>
                    {step.done ? <Check size={14} style={{ color: '#00D4AA' }} /> : i === currentStep ? <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent)' }} /> : <step.icon size={14} style={{ color: 'var(--text-3)' }} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: step.done ? '#00D4AA' : 'var(--text)' }}>{step.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ background: 'var(--gradient-1)', width: `${(currentStep / 6) * 100}%` }} />
            </div>
          </div>
        )}

        {phase === 'results' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.25)' }}>
              <Check size={28} style={{ color: '#00D4AA' }} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Analysis complete</h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>
              Athena has generated your brand profile, competitive analysis, marketing strategy, and first content calendar.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Brand Profile', value: 'Generated' },
                { label: 'Competitors Found', value: '5' },
                { label: 'Keywords Identified', value: '48' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                  <p className="text-lg font-bold glow-text">{s.value}</p>
                </div>
              ))}
            </div>
            <button onClick={() => nav('/dashboard')} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 30px -5px rgba(124,92,252,0.4)' }}>
              Go to Dashboard <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
