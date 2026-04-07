import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, Brain, Search, Share2, Mail, Target, LineChart, CalendarDays, Puzzle, Settings, Sparkles, Bot, Home } from 'lucide-react';

const NAV = [
  { to: '/dashboard', icon: Home, label: 'Overview', end: true },
  { to: '/dashboard/brand', icon: Brain, label: 'Brand Intel' },
  { to: '/dashboard/seo', icon: Search, label: 'SEO & Content' },
  { to: '/dashboard/social', icon: Share2, label: 'Social Media' },
  { to: '/dashboard/email', icon: Mail, label: 'Email' },
  { to: '/dashboard/ads', icon: Target, label: 'Paid Ads' },
  { to: '/dashboard/analytics', icon: LineChart, label: 'Analytics' },
  { to: '/dashboard/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/dashboard/integrations', icon: Puzzle, label: 'Integrations' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const loc = useLocation();

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[230px] flex flex-col z-50" style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
        <div className="p-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold">Athena AI</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const active = item.end
              ? loc.pathname === item.to
              : loc.pathname.startsWith(item.to);
            return (
              <NavLink key={item.to} to={item.to} end={item.end} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all" style={{
                background: active ? 'var(--accent-glow)' : 'transparent',
                color: active ? 'var(--accent-hover)' : 'var(--text-2)',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* AI Status */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 rounded-lg p-3" style={{ background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)' }}>
            <Bot size={14} style={{ color: '#00D4AA' }} />
            <div>
              <p className="text-xs font-medium" style={{ color: '#00D4AA' }}>Athena is active</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>Last action 2m ago</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-[230px] flex-1 p-8">
        <div className="max-w-[1100px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
