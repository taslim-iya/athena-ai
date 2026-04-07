import { useAppStore } from '@/store/appStore';
import { BarChart3, TrendingUp, Eye, MousePointer, DollarSign, ArrowUpRight, Users, Globe, Search, Share2, Mail, Target } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

export default function Analytics() {
  const { blogPosts, socialPosts, emailCampaigns, adCampaigns } = useAppStore();

  const channels = [
    { name: 'Organic Search', sessions: 12847, revenue: 8400, conversion: 3.2, icon: Search, color: '#00D4AA', change: '+18%' },
    { name: 'Social Media', sessions: 8420, revenue: 3200, conversion: 1.8, icon: Share2, color: '#7C5CFC', change: '+42%' },
    { name: 'Email', sessions: 4200, revenue: 4280, conversion: 5.1, icon: Mail, color: '#FF6B6B', change: '+23%' },
    { name: 'Paid Ads', sessions: 6800, revenue: 12400, conversion: 4.2, icon: Target, color: '#FEBC2E', change: '+31%' },
    { name: 'Direct', sessions: 3400, revenue: 2100, conversion: 2.8, icon: Globe, color: '#06B6D4', change: '+12%' },
    { name: 'Referral', sessions: 1800, revenue: 980, conversion: 2.1, icon: Users, color: '#EC4899', change: '+8%' },
  ];

  const totalSessions = channels.reduce((a, c) => a + c.sessions, 0);
  const totalRevenue = channels.reduce((a, c) => a + c.revenue, 0);

  const weeklyData = [
    { day: 'Mon', sessions: 5200, revenue: 4200 },
    { day: 'Tue', sessions: 5800, revenue: 4800 },
    { day: 'Wed', sessions: 6400, revenue: 5100 },
    { day: 'Thu', sessions: 5900, revenue: 4600 },
    { day: 'Fri', sessions: 7200, revenue: 5800 },
    { day: 'Sat', sessions: 4100, revenue: 3200 },
    { day: 'Sun', sessions: 3400, revenue: 2800 },
  ];
  const maxSessions = Math.max(...weeklyData.map(d => d.sessions));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Cross-channel performance overview</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Sessions', value: totalSessions.toLocaleString(), icon: Eye, color: '#7C5CFC', change: '+24%' },
          { label: 'Total Revenue', value: `£${(totalRevenue / 1000).toFixed(1)}K`, icon: DollarSign, color: '#00D4AA', change: '+31%' },
          { label: 'Avg. Conversion', value: '3.4%', icon: MousePointer, color: '#FF6B6B', change: '+0.6%' },
          { label: 'Content Published', value: (blogPosts.length + socialPosts.length).toString(), icon: BarChart3, color: '#FEBC2E', change: 'This month' },
        ].map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</p>
            <p className="text-xs mt-1 flex items-center gap-0.5" style={{ color: '#00D4AA' }}>
              <ArrowUpRight size={10} /> {s.change}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {/* Chart */}
        <Card>
          <h3 className="text-sm font-semibold mb-6" style={{ color: 'var(--text)' }}>Weekly Traffic</h3>
          <div className="flex items-end gap-3 h-48">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-lg transition-all hover:opacity-80" style={{
                  height: `${(d.sessions / maxSessions) * 160}px`,
                  background: 'linear-gradient(180deg, var(--accent) 0%, rgba(124,92,252,0.3) 100%)',
                }} />
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Channel breakdown */}
        <Card>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Channel Breakdown</h3>
          <div className="space-y-3">
            {channels.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <c.icon size={12} style={{ color: c.color }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{c.name}</span>
                  </div>
                  <span className="text-xs" style={{ color: '#00D4AA' }}>{c.change}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--surface-2)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(c.sessions / totalSessions) * 100}%`, background: c.color }} />
                  </div>
                  <span className="text-xs w-16 text-right" style={{ color: 'var(--text-3)' }}>{c.sessions.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
