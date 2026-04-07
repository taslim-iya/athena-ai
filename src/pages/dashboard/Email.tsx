import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Mail, Plus, Send, Eye, MousePointer, TrendingUp, Bot, Loader2, Clock, CheckCircle } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

export default function Email() {
  const { emailCampaigns, addEmailCampaign } = useAppStore();
  const [generating, setGenerating] = useState(false);

  const generateCampaign = () => {
    setGenerating(true);
    setTimeout(() => {
      const templates = [
        { name: 'Welcome Series — Email 1', subject: 'Welcome aboard! Here\'s what to expect', recipients: 420 },
        { name: 'Weekly Newsletter', subject: '5 things you missed this week + a surprise', recipients: 4200 },
        { name: 'Cart Abandonment Reminder', subject: 'You left something behind...', recipients: 180 },
        { name: 'Re-engagement Campaign', subject: 'We miss you — here\'s 20% off to come back', recipients: 820 },
      ];
      const t = templates[Math.floor(Math.random() * templates.length)];
      addEmailCampaign({
        id: crypto.randomUUID(),
        name: t.name,
        subject: t.subject,
        previewText: 'AI-crafted preview text that drives open rates',
        status: 'draft',
        recipients: t.recipients,
        openRate: 0,
        clickRate: 0,
      });
      setGenerating(false);
    }, 1500);
  };

  const stats = [
    { label: 'Subscribers', value: '4,200', icon: Mail, color: '#7C5CFC' },
    { label: 'Avg. Open Rate', value: '42.3%', icon: Eye, color: '#00D4AA' },
    { label: 'Avg. Click Rate', value: '8.7%', icon: MousePointer, color: '#FF6B6B' },
    { label: 'Revenue (30d)', value: '£4,280', icon: TrendingUp, color: '#FEBC2E' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Email Marketing</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Campaigns, flows, and subscriber management</p>
        </div>
        <button onClick={generateCampaign} disabled={generating} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
          {generating ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
          {generating ? 'Creating...' : 'Generate Campaign'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Automated Flows */}
      <Card className="mb-6">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Automated Flows</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Welcome Series', emails: 4, subscribers: 420, status: 'active' },
            { name: 'Cart Abandonment', emails: 3, subscribers: 180, status: 'active' },
            { name: 'Post-Purchase', emails: 5, subscribers: 340, status: 'active' },
            { name: 'Win-Back', emails: 3, subscribers: 820, status: 'draft' },
            { name: 'Birthday', emails: 1, subscribers: 4200, status: 'draft' },
            { name: 'VIP Rewards', emails: 2, subscribers: 210, status: 'draft' },
          ].map(f => (
            <div key={f.name} className="rounded-lg p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{f.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: f.status === 'active' ? 'rgba(0,212,170,0.1)' : 'var(--surface-3)',
                  color: f.status === 'active' ? '#00D4AA' : 'var(--text-3)',
                }}>{f.status}</span>
              </div>
              <div className="flex gap-3 text-xs" style={{ color: 'var(--text-3)' }}>
                <span>{f.emails} emails</span>
                <span>{f.subscribers.toLocaleString()} subscribers</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Campaigns */}
      <Card>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Campaigns</h3>
        {emailCampaigns.length === 0 ? (
          <div className="text-center py-8">
            <Mail size={24} className="mx-auto mb-2" style={{ color: 'var(--text-3)', opacity: 0.3 }} />
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>No campaigns yet. Click "Generate Campaign" to create one.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {emailCampaigns.map(c => (
              <div key={c.id} className="rounded-lg p-4 flex items-center justify-between" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{c.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>Subject: {c.subject}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.recipients.toLocaleString()} recipients</p>
                    {c.openRate > 0 && <p className="text-xs" style={{ color: '#00D4AA' }}>{c.openRate}% open</p>}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1" style={{
                    background: c.status === 'sent' ? 'rgba(0,212,170,0.1)' : c.status === 'scheduled' ? 'rgba(124,92,252,0.1)' : 'var(--surface-3)',
                    color: c.status === 'sent' ? '#00D4AA' : c.status === 'scheduled' ? 'var(--accent-hover)' : 'var(--text-3)',
                  }}>
                    {c.status === 'sent' ? <CheckCircle size={10} /> : c.status === 'scheduled' ? <Clock size={10} /> : <Send size={10} />}
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
