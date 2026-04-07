import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { CalendarDays, ChevronLeft, ChevronRight, Search, Share2, Mail, Target, FileText } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

const CHANNEL_STYLES: Record<string, { color: string; icon: typeof Search }> = {
  seo: { color: '#00D4AA', icon: Search },
  social: { color: '#7C5CFC', icon: Share2 },
  email: { color: '#FF6B6B', icon: Mail },
  ads: { color: '#FEBC2E', icon: Target },
  analytics: { color: '#06B6D4', icon: FileText },
};

export default function Calendar() {
  const { calendar, addCalendarEvent } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  // Sample events for demo
  const sampleEvents = [
    { day: 3, title: 'Blog: SEO Guide', channel: 'seo', type: 'blog' },
    { day: 5, title: 'Newsletter Send', channel: 'email', type: 'email' },
    { day: 7, title: 'Instagram Carousel', channel: 'social', type: 'social' },
    { day: 10, title: 'Blog: Growth Hacks', channel: 'seo', type: 'blog' },
    { day: 12, title: 'Meta Campaign Launch', channel: 'ads', type: 'ad' },
    { day: 14, title: 'LinkedIn Article', channel: 'social', type: 'social' },
    { day: 15, title: 'Weekly Report', channel: 'analytics', type: 'report' },
    { day: 17, title: 'Blog: Case Study', channel: 'seo', type: 'blog' },
    { day: 19, title: 'Email A/B Test', channel: 'email', type: 'email' },
    { day: 21, title: 'TikTok Video', channel: 'social', type: 'social' },
    { day: 22, title: 'Google Ads Refresh', channel: 'ads', type: 'ad' },
    { day: 24, title: 'Blog: Industry Report', channel: 'seo', type: 'blog' },
    { day: 26, title: 'Cart Abandonment Flow', channel: 'email', type: 'email' },
    { day: 28, title: 'Monthly Report', channel: 'analytics', type: 'report' },
  ];

  const days = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Content Calendar</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Athena's planned and completed content across all channels</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6">
        {Object.entries(CHANNEL_STYLES).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: val.color }} />
            <span className="text-xs capitalize" style={{ color: 'var(--text-2)' }}>{key}</span>
          </div>
        ))}
      </div>

      <Card>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prev} className="p-2 rounded-lg transition hover:bg-white/5" style={{ color: 'var(--text-2)' }}>
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{monthName}</span>
          <button onClick={next} className="p-2 rounded-lg transition hover:bg-white/5" style={{ color: 'var(--text-2)' }}>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className="text-xs font-medium text-center py-1" style={{ color: 'var(--text-3)' }}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const events = day ? sampleEvents.filter(e => e.day === day) : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <div key={i} className="min-h-[80px] rounded-lg p-1.5 transition" style={{
                background: day ? 'var(--surface-2)' : 'transparent',
                border: isToday ? '1px solid var(--accent)' : '1px solid transparent',
              }}>
                {day && (
                  <>
                    <span className={`text-xs font-medium block mb-1 ${isToday ? 'glow-text' : ''}`} style={{ color: isToday ? undefined : 'var(--text-3)' }}>{day}</span>
                    <div className="space-y-0.5">
                      {events.map((e, j) => {
                        const style = CHANNEL_STYLES[e.channel];
                        return (
                          <div key={j} className="flex items-center gap-1 px-1 py-0.5 rounded" style={{ background: `${style.color}12` }}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.color }} />
                            <span className="text-[10px] truncate" style={{ color: style.color }}>{e.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
