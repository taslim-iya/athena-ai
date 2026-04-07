import { NavLink, Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { BarChart3, Brain, Search, Share2, Mail, Target, TrendingUp, Calendar, Plug, Settings, Sparkles, LayoutDashboard } from 'lucide-react';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/brand', icon: Brain, label: 'Brand Intel' },
  { to: '/dashboard/seo', icon: Search, label: 'SEO' },
  { to: '/dashboard/social', icon: Share2, label: 'Social' },
  { to: '/dashboard/email', icon: Mail, label: 'Email' },
  { to: '/dashboard/ads', icon: Target, label: 'Ads' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const { config } = useAppStore();

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-alt)' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[200px] border-r flex-shrink-0" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 px-4 h-14 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={11} color="#fff" />
          </div>
          <span className="text-[14px] font-semibold tracking-tight">Athena</span>
        </div>
        <nav className="flex-1 py-1.5 px-2">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-colors"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
              })}>
              <n.icon size={14} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 px-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'var(--accent)' }}>
              {config.businessName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{config.businessName || 'Your Brand'}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Free Trial</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 border-b px-4 h-12 flex items-center" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={10} color="#fff" />
          </div>
          <span className="text-[13px] font-semibold">Athena</span>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        {NAV.slice(0, 5).map(n => (
          <NavLink key={n.to} to={n.to} end={n.end}
            className="flex-1 flex flex-col items-center gap-0.5 py-2"
            style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--text-tertiary)' })}>
            <n.icon size={16} />
            <span className="text-[10px]">{n.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 min-w-0 pt-12 md:pt-0 pb-16 md:pb-0">
        <div className="max-w-[1000px] mx-auto p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
