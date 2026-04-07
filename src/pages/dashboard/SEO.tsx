import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Search, FileText, TrendingUp, Plus, ArrowUp, ArrowDown, Minus, Bot, Loader2 } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>{children}</div>;
}

export default function SEO() {
  const { blogPosts, addBlogPost, config } = useAppStore();
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');

  const generatePost = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      addBlogPost({
        id: crypto.randomUUID(),
        title: topic,
        slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content: `AI-generated blog post about "${topic}". In a production environment, this would be a fully optimised 1,500-2,000 word article with headers, images, internal links, and meta descriptions.`,
        keywords: [topic.split(' ')[0], topic.split(' ').slice(-1)[0], 'guide', 'strategy'].filter(Boolean),
        status: 'draft',
        wordCount: 1847,
        seoScore: Math.floor(Math.random() * 15 + 80),
        createdAt: new Date().toISOString(),
      });
      setTopic('');
      setGenerating(false);
    }, 2000);
  };

  const rankings = [
    { keyword: 'marketing automation tools', position: 3, change: 2, volume: 8400, difficulty: 67 },
    { keyword: 'ai marketing agent', position: 5, change: 4, volume: 3200, difficulty: 45 },
    { keyword: 'email marketing best practices', position: 8, change: -1, volume: 12000, difficulty: 72 },
    { keyword: 'social media scheduling', position: 12, change: 3, volume: 6800, difficulty: 58 },
    { keyword: 'seo content strategy', position: 4, change: 0, volume: 5400, difficulty: 61 },
    { keyword: 'customer retention strategies', position: 6, change: 5, volume: 4100, difficulty: 52 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>SEO & Content</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Keyword rankings, blog posts, and content optimisation</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Avg. Position', value: '6.3', change: '+2.1', color: '#00D4AA' },
          { label: 'Organic Clicks', value: '12.8K', change: '+18%', color: '#7C5CFC' },
          { label: 'Blog Posts', value: blogPosts.length.toString(), change: 'All time', color: '#FF6B6B' },
          { label: 'SEO Score', value: '87/100', change: '+4', color: '#FEBC2E' },
        ].map(s => (
          <Card key={s.label}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: s.color }}>{s.change}</p>
          </Card>
        ))}
      </div>

      {/* Generate post */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bot size={16} style={{ color: 'var(--accent)' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Generate Blog Post</h3>
        </div>
        <div className="flex gap-3">
          <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && generatePost()} placeholder="Enter a topic (e.g. 'How to reduce churn by 50%')" className="flex-1 rounded-lg px-3 py-2.5 text-sm border" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <button onClick={generatePost} disabled={generating} className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50" style={{ background: 'var(--accent)', color: '#fff' }}>
            {generating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {generating ? 'Writing...' : 'Generate'}
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-[1fr_400px] gap-6">
        {/* Keyword Rankings */}
        <Card>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Keyword Rankings</h3>
          <div className="space-y-0">
            <div className="grid grid-cols-[1fr_70px_70px_80px_80px] gap-2 pb-2 mb-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
              {['Keyword', 'Position', 'Change', 'Volume', 'Difficulty'].map(h => (
                <span key={h} className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{h}</span>
              ))}
            </div>
            {rankings.map(r => (
              <div key={r.keyword} className="grid grid-cols-[1fr_70px_70px_80px_80px] gap-2 py-2.5" style={{ borderBottom: '1px solid var(--border-light)' }}>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{r.keyword}</span>
                <span className="text-sm font-medium" style={{ color: r.position <= 3 ? '#00D4AA' : r.position <= 10 ? '#FEBC2E' : 'var(--text-secondary)' }}>#{r.position}</span>
                <span className="text-xs flex items-center gap-0.5" style={{ color: r.change > 0 ? '#00D4AA' : r.change < 0 ? '#FF6B6B' : 'var(--text-tertiary)' }}>
                  {r.change > 0 ? <ArrowUp size={10} /> : r.change < 0 ? <ArrowDown size={10} /> : <Minus size={10} />}
                  {Math.abs(r.change)}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.volume.toLocaleString()}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--bg-alt)' }}>
                    <div className="h-full rounded-full" style={{ width: `${r.difficulty}%`, background: r.difficulty > 70 ? '#FF6B6B' : r.difficulty > 50 ? '#FEBC2E' : '#00D4AA' }} />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{r.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Posts */}
        <Card>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Blog Posts</h3>
          {blogPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText size={24} className="mx-auto mb-2" style={{ color: 'var(--text-tertiary)', opacity: 0.4 }} />
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No posts yet. Generate your first one above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blogPosts.slice(0, 8).map(p => (
                <div key={p.id} className="rounded-lg p-3" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-light)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{p.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: p.status === 'published' ? 'rgba(0,212,170,0.1)' : 'var(--bg-alt)', color: p.status === 'published' ? '#00D4AA' : 'var(--text-tertiary)' }}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <span>{p.wordCount} words</span>
                    <span>SEO: {p.seoScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
