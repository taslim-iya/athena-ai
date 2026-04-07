import { NavLink, Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { BarChart3, Brain, Search, Share2, Mail, Target, TrendingUp, Calendar, Plug, Settings, Sparkles, LayoutDashboard, LogOut } from 'lucide-react';

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
    <div className="flex min-h-screen" style={{ background: 'var(--bg-2)' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] bg-white border-r flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={11} className="text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Athena</span>
        </div>
        <nav className="flex-1 py-2 px-2 space-y-0.5">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[var(--bg-2)]' : 'hover:bg-[var(--bg-2)]'}`
            } style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--text-2)' })}>
              <n.icon size={15} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--accent)' }}>
              {config.businessName?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{config.businessName || 'Your Brand'}</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--text-3)' }}>Free Trial</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Sparkles size={11} className="text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Athena</span>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t flex items-center justify-around py-2" style={{ borderColor: 'var(--border)' }}>
        {NAV.slice(0, 5).map(n => (
          <NavLink key={n.to} to={n.to} end={n.end} className="flex flex-col items-center gap-0.5 px-2 py-1" style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--text-3)' })}>
            <n.icon size={18} />
            <span className="text-[10px]">{n.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0 pb-20 md:pb-0">
        <div className="max-w-[1100px] mx-auto p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
