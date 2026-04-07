import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import type { AdPlatform } from '@/store/appStore';
import { Target, DollarSign, Eye, MousePointer, TrendingUp, Pause, Play, Bot, Loader2, ArrowUpRight } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

const PLATFORM_META: Record<AdPlatform, { label: string; color: string }> = {
  meta: { label: 'Meta Ads', color: '#1877F2' },
  google: { label: 'Google Ads', color: '#34A853' },
  tiktok: { label: 'TikTok Ads', color: '#FF0050' },
};

export default function Ads() {
  const { adCampaigns, addAdCampaign, updateAdCampaign } = useAppStore();
  const [generating, setGenerating] = useState(false);

  const createCampaign = () => {
    setGenerating(true);
    setTimeout(() => {
      const templates = [
        { name: 'Retargeting — Cart Abandoners', platform: 'meta' as AdPlatform, budget: 30 },
        { name: 'Brand Awareness — Lookalike', platform: 'meta' as AdPlatform, budget: 50 },
        { name: 'Search — High Intent Keywords', platform: 'google' as AdPlatform, budget: 40 },
        { name: 'Shopping — Top Products', platform: 'google' as AdPlatform, budget: 35 },
        { name: 'Video — Product Demo', platform: 'tiktok' as AdPlatform, budget: 25 },
      ];
      const t = templates[Math.floor(Math.random() * templates.length)];
      addAdCampaign({
        id: crypto.randomUUID(),
        name: t.name,
        platform: t.platform,
        status: 'active',
        budget: t.budget,
        spent: Math.floor(t.budget * 0.6 * 100) / 100,
        impressions: Math.floor(Math.random() * 50000 + 10000),
        clicks: Math.floor(Math.random() * 2000 + 300),
        conversions: Math.floor(Math.random() * 100 + 10),
        roas: Math.floor(Math.random() * 30 + 20) / 10,
        createdAt: new Date().toISOString(),
      });
      setGenerating(false);
    }, 1500);
  };

  const totalSpend = adCampaigns.reduce((a, c) => a + c.spent, 0);
  const totalConversions = adCampaigns.reduce((a, c) => a + c.conversions, 0);
  const avgRoas = adCampaigns.length > 0 ? (adCampaigns.reduce((a, c) => a + c.roas, 0) / adCampaigns.length).toFixed(1) : '0';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Paid Advertising</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Meta, Google, and TikTok campaign management</p>
        </div>
        <button onClick={createCampaign} disabled={generating} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
          {generating ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
          {generating ? 'Creating...' : 'Create Campaign'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Spend', value: `£${totalSpend.toFixed(0)}`, icon: DollarSign, color: '#FF6B6B' },
          { label: 'Impressions', value: `${(adCampaigns.reduce((a, c) => a + c.impressions, 0) / 1000).toFixed(0)}K`, icon: Eye, color: '#7C5CFC' },
          { label: 'Conversions', value: totalConversions.toString(), icon: MousePointer, color: '#00D4AA' },
          { label: 'Avg. ROAS', value: `${avgRoas}x`, icon: TrendingUp, color: '#FEBC2E' },
        ].map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Platform breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(['meta', 'google', 'tiktok'] as AdPlatform[]).map(platform => {
          const camps = adCampaigns.filter(c => c.platform === platform);
          const meta = PLATFORM_META[platform];
          return (
            <Card key={platform}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{meta.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{camps.length}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>campaigns</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>£{camps.reduce((a, c) => a + c.spent, 0).toFixed(0)}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>spent</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Campaign list */}
      <Card>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>All Campaigns</h3>
        {adCampaigns.length === 0 ? (
          <div className="text-center py-8">
            <Target size={24} className="mx-auto mb-2" style={{ color: 'var(--text-3)', opacity: 0.3 }} />
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>No campaigns yet. Click "Create Campaign" to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {adCampaigns.map(c => {
              const meta = PLATFORM_META[c.platform];
              return (
                <div key={c.id} className="rounded-lg p-4 flex items-center gap-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{c.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{meta.label}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-6 text-right">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>Budget</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>£{c.budget}/d</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>Spent</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>£{c.spent}</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>ROAS</p>
                      <p className="text-sm font-medium" style={{ color: c.roas >= 3 ? '#00D4AA' : c.roas >= 2 ? '#FEBC2E' : '#FF6B6B' }}>{c.roas}x</p>
                    </div>
                    <div>
                      <button onClick={() => updateAdCampaign(c.id, { status: c.status === 'active' ? 'paused' : 'active' })} className="p-1.5 rounded-lg transition" style={{ background: 'var(--surface-3)' }}>
                        {c.status === 'active' ? <Pause size={12} style={{ color: '#FEBC2E' }} /> : <Play size={12} style={{ color: '#00D4AA' }} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
