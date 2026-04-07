import { useAppStore } from '@/store/appStore';
import { Puzzle, Check, Plus, ExternalLink } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>{children}</div>;
}

const CATEGORY_LABELS: Record<string, string> = {
  analytics: 'Analytics',
  ads: 'Advertising',
  social: 'Social Media',
  email: 'Email Marketing',
  cms: 'CMS',
  ecommerce: 'E-Commerce',
};

export default function Integrations() {
  const { integrations, toggleIntegration } = useAppStore();

  const categories = [...new Set(integrations.map(i => i.category))];
  const connected = integrations.filter(i => i.connected).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Integrations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{connected} of {integrations.length} connected</p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat}>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-tertiary)' }}>{CATEGORY_LABELS[cat] || cat}</h3>
            <div className="grid grid-cols-3 gap-3">
              {integrations.filter(i => i.category === cat).map(integ => (
                <div key={integ.id} className="rounded-xl p-4 flex items-center justify-between transition-all hover:scale-[1.01]" style={{
                  background: 'var(--bg)',
                  border: integ.connected ? '1px solid rgba(0,212,170,0.25)' : '1px solid var(--border)',
                }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{integ.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{integ.name}</p>
                      {integ.connected && integ.lastSync && (
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Synced {integ.lastSync}</p>
                      )}
                    </div>
                  </div>
                  <button onClick={() => toggleIntegration(integ.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition" style={{
                    background: integ.connected ? 'rgba(0,212,170,0.1)' : 'var(--bg-alt)',
                    color: integ.connected ? '#00D4AA' : 'var(--text-secondary)',
                    border: integ.connected ? '1px solid rgba(0,212,170,0.2)' : '1px solid var(--border)',
                  }}>
                    {integ.connected ? <><Check size={10} /> Connected</> : <><Plus size={10} /> Connect</>}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
