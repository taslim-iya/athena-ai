import { useAppStore } from '@/store/appStore';
import { TrendingUp, Eye, MousePointer, Mail, DollarSign, Bot, Search, Share2, Target, ArrowUpRight, Clock, Sparkles, BarChart3 } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

export default function Overview() {
  const { brand, blogPosts, socialPosts, emailCampaigns, adCampaigns } = useAppStore();

  const stats = [
    { label: 'Organic Traffic', value: '12,847', change: '+18.4%', icon: Eye, color: '#00D4AA' },
    { label: 'Social Reach', value: '284K', change: '+42.1%', icon: Share2, color: '#7C5CFC' },
    { label: 'Email Revenue', value: '£4,280', change: '+22.7%', icon: Mail, color: '#FF6B6B' },
    { label: 'Ad ROAS', value: '3.8x', change: '+0.4x', icon: Target, color: '#FEBC2E' },
    { label: 'Conversions', value: '342', change: '+31.2%', icon: MousePointer, color: '#06B6D4' },
    { label: 'Revenue', value: '£28.4K', change: '+24.8%', icon: DollarSign, color: '#EC4899' },
  ];

  const recentActions = [
    { time: '8:00 AM', action: 'Published blog post "10 Retention Strategies That Actually Work"', channel: 'SEO', icon: Search },
    { time: '9:15 AM', action: 'Scheduled 4 social posts amplifying the new blog post', channel: 'Social', icon: Share2 },
    { time: '10:30 AM', action: 'Paused underperforming "Summer Sale" ad set (1.2x ROAS)', channel: 'Ads', icon: Target },
    { time: '10:31 AM', action: 'Reallocated £15/day to "Cart Abandoners" campaign (5.1x ROAS)', channel: 'Ads', icon: Target },
    { time: '11:00 AM', action: 'Sent weekly newsletter to 4,200 subscribers', channel: 'Email', icon: Mail },
    { time: '2:00 PM', action: 'Generated 3 new ad creatives based on top-performing patterns', channel: 'Ads', icon: Target },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Good morning{brand.name ? `, ${brand.name}` : ''}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Here's your marketing performance summary</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.15)', color: '#00D4AA' }}>
          <Clock size={12} /> Last updated 2 minutes ago
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</span>
              <span className="text-xs font-medium flex items-center gap-0.5 pb-1" style={{ color: '#00D4AA' }}>
                <ArrowUpRight size={10} /> {s.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {/* Morning Briefing */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Bot size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Morning Briefing</h3>
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: 'var(--accent-glow)', color: 'var(--accent-hover)' }}>Today</span>
          </div>
          <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text)' }}>Highlights:</strong> Your blog post "10 Ways to Boost Retention" drove <strong style={{ color: '#00D4AA' }}>2,400 organic visits</strong> yesterday — 3x your daily average. The retargeting campaign is your top performer at <strong style={{ color: '#00D4AA' }}>5.1x ROAS</strong>.
            </p>
          </div>
          <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text)' }}>Actions taken:</strong> I paused the underperforming "Summer Sale" ad set and reallocated budget. Scheduled 4 amplification posts. Sent the weekly newsletter (42% open rate, 8.3% click rate — both above benchmark).
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'rgba(124,92,252,0.06)', border: '1px solid rgba(124,92,252,0.12)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--accent-hover)' }}>Recommendations:</strong> Consider doubling the retargeting budget — it's consistently outperforming. Your "pricing page" keyword is rising to position #4 — one more optimised post could push it to #1. Competitor X just launched a TikTok campaign; I've drafted a response strategy.
            </p>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Today's Activity</h3>
          <div className="space-y-3">
            {recentActions.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-2)' }}>
                    <a.icon size={12} style={{ color: 'var(--accent-hover)' }} />
                  </div>
                  {i < recentActions.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'var(--border-subtle)' }} />}
                </div>
                <div className="pb-3">
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>{a.time}</p>
                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>{a.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
