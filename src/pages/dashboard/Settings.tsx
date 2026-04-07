import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Settings as SettingsIcon, Bot, Clock, Key, Globe, Bell, Shield, Check } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-6 ${className}`} style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>{children}</div>;
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="w-10 h-6 rounded-full transition" style={{ background: value ? 'var(--accent)' : 'var(--bg-alt)' }}>
      <div className="w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: value ? 'translateX(18px)' : 'translateX(2px)', marginTop: 2 }} />
    </button>
  );
}

export default function Settings() {
  const { config, updateConfig, brand } = useAppStore();
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Configure Athena's behaviour and connected services</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* AI Configuration */}
        <Card>
          <h3 className="text-sm font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Bot size={16} style={{ color: 'var(--accent)' }} /> AI Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-tertiary)' }}>OpenAI API Key</label>
              <input value={config.openaiKey} onChange={e => updateConfig({ openaiKey: e.target.value })} type="password" placeholder="sk-..." className="w-full rounded-lg px-3 py-2.5 text-sm border" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Used for content generation, AI responses, and brand analysis</p>
            </div>
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-tertiary)' }}>Business URL</label>
              <input value={config.businessUrl} onChange={e => updateConfig({ businessUrl: e.target.value })} placeholder="https://yourbusiness.com" className="w-full rounded-lg px-3 py-2.5 text-sm border" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
          </div>
        </Card>

        {/* Automation */}
        <Card>
          <h3 className="text-sm font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <SettingsIcon size={16} style={{ color: '#00D4AA' }} /> Automation
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Auto-post content', desc: 'Let Athena publish social posts and blog articles without approval', key: 'autoPost' as const, value: config.autoPost },
              { label: 'Auto-optimise ads', desc: 'Automatically pause underperforming ads and reallocate budget', key: 'autoOptimize' as const, value: config.autoOptimize },
              { label: 'Weekly digest email', desc: 'Receive a weekly summary of all marketing activity', key: 'weeklyDigest' as const, value: config.weeklyDigest },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                </div>
                <Toggle value={item.value} onChange={() => updateConfig({ [item.key]: !item.value })} />
              </div>
            ))}
          </div>
        </Card>

        {/* Morning Report */}
        <Card>
          <h3 className="text-sm font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Clock size={16} style={{ color: '#FEBC2E' }} /> Morning Report
          </h3>
          <div>
            <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-tertiary)' }}>Report delivery time</label>
            <input type="time" value={config.morningReportTime} onChange={e => updateConfig({ morningReportTime: e.target.value })} className="rounded-lg px-3 py-2.5 text-sm border" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Your daily performance summary will be delivered at this time</p>
          </div>
        </Card>

        {/* Danger zone */}
        <Card>
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#FF6B6B' }}>
            <Shield size={16} /> Danger Zone
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Reset all data</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Clear all brand data, posts, campaigns, and settings</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#FF6B6B', border: '1px solid rgba(239,68,68,0.2)' }}>
              Reset
            </button>
          </div>
        </Card>

        <button onClick={save} className="px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]" style={{ background: saved ? '#00D4AA' : 'var(--accent)', color: '#fff' }}>
          {saved ? <><Check size={14} /> Saved!</> : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
