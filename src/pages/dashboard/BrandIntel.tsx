import { useAppStore } from '@/store/appStore';
import { Globe, Palette, Users, Target, BookOpen, TrendingUp, ArrowUpRight, ArrowDownRight, Shield, Sparkles } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

export default function BrandIntel() {
  const { brand } = useAppStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Brand Intelligence</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          {brand.url ? `Analysis of ${brand.url}` : 'Complete your onboarding to generate brand intelligence'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Brand Profile</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Business Name', value: brand.name || 'Not set' },
              { label: 'Industry', value: brand.industry || 'Not detected' },
              { label: 'Tone of Voice', value: brand.tone || 'Not analysed' },
              { label: 'Website', value: brand.url || 'Not set' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{item.label}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} style={{ color: '#00D4AA' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Brand Guidelines</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
            {brand.guidelines || 'Brand guidelines will be generated after onboarding.'}
          </p>
          {brand.colors.length > 0 && (
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Brand Colours</p>
              <div className="flex gap-2">
                {brand.colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <div className="w-4 h-4 rounded-full" style={{ background: c }} />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-2)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} style={{ color: '#FF6B6B' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Competitive Landscape</h3>
        </div>
        {brand.competitors.length > 0 ? (
          <div className="space-y-3">
            {brand.competitors.map((c, i) => (
              <div key={i} className="rounded-lg p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{c.name}</span>
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>{c.url}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: '#00D4AA' }}><ArrowUpRight size={10} /> Strengths</p>
                    <ul className="space-y-1">
                      {c.strengths.map(s => <li key={s} className="text-xs" style={{ color: 'var(--text-2)' }}>• {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: '#FF6B6B' }}><ArrowDownRight size={10} /> Weaknesses</p>
                    <ul className="space-y-1">
                      {c.weaknesses.map(w => <li key={w} className="text-xs" style={{ color: 'var(--text-2)' }}>• {w}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>Complete onboarding to see competitor analysis.</p>
        )}
      </Card>

      {/* Keywords */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Target size={16} style={{ color: '#FEBC2E' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Target Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(brand.keywords.length > 0 ? brand.keywords : ['No keywords yet']).map(k => (
            <span key={k} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', color: 'var(--text-2)' }}>
              {k}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
