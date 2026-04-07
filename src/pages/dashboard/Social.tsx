import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import type { SocialPlatform } from '@/store/appStore';
import { Camera, Globe, Briefcase, AtSign, Music, Plus, Clock, CheckCircle, Eye, Heart, MessageCircle, Share, Bot, Loader2 } from 'lucide-react';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl p-5 ${className}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{children}</div>;
}

const PLATFORMS: { id: SocialPlatform; label: string; icon: typeof Camera; color: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: Camera, color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', icon: Globe, color: '#1877F2' },
  { id: 'linkedin', label: 'LinkedIn', icon: Briefcase, color: '#0A66C2' },
  { id: 'twitter', label: 'X', icon: AtSign, color: '#8E8EA0' },
  { id: 'tiktok', label: 'TikTok', icon: Music, color: '#FF0050' },
];

export default function Social() {
  const { socialPosts, addSocialPost } = useAppStore();
  const [generating, setGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('instagram');

  const generatePosts = () => {
    setGenerating(true);
    setTimeout(() => {
      const contents = [
        '🚀 Marketing automation isn\'t about removing the human touch — it\'s about giving humans more time to be creative.\n\nHere are 5 ways AI can enhance (not replace) your marketing strategy:\n\n1️⃣ Personalise at scale\n2️⃣ Predict customer behaviour\n3️⃣ Optimise ad spend in real-time\n4️⃣ Generate content frameworks\n5️⃣ Automate reporting\n\nWhich one would save you the most time?',
        'Behind every "overnight success" is months of consistent content, testing, and iteration.\n\nStop chasing viral moments.\nStart building compounding returns.\n\n#MarketingStrategy #GrowthMindset',
        'Your competitors are already using AI for marketing.\n\nThe question isn\'t whether to adopt it.\nIt\'s how fast you can.',
        'New blog post 📝\n\n"10 Customer Retention Strategies That Actually Work in 2026"\n\nWe analysed 500 businesses and found the ones with the highest retention all share these 10 patterns.\n\nLink in bio ↗️',
      ];
      contents.forEach((content, i) => {
        addSocialPost({
          id: crypto.randomUUID(),
          platform: PLATFORMS[i % PLATFORMS.length].id,
          content,
          scheduledAt: new Date(Date.now() + i * 4 * 3600000).toISOString(),
          status: 'scheduled',
          engagement: { likes: 0, comments: 0, shares: 0, reach: 0 },
        });
      });
      setGenerating(false);
    }, 2000);
  };

  const platformStats = PLATFORMS.map(p => ({
    ...p,
    posts: socialPosts.filter(s => s.platform === p.id).length,
    totalReach: socialPosts.filter(s => s.platform === p.id).reduce((a, s) => a + s.engagement.reach, 0),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Social Media</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Content creation, scheduling, and performance</p>
        </div>
        <button onClick={generatePosts} disabled={generating} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
          {generating ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
          {generating ? 'Creating...' : 'Generate Week of Content'}
        </button>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {platformStats.map(p => (
          <Card key={p.id} className="cursor-pointer transition-all hover:scale-[1.02]" onClick={() => setSelectedPlatform(p.id)}>
            <div className="flex items-center gap-2 mb-2">
              <p.icon size={14} style={{ color: p.color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{p.label}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{p.posts}</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>posts</p>
          </Card>
        ))}
      </div>

      {/* Posts */}
      <Card>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
          {socialPosts.length > 0 ? 'Scheduled & Published Posts' : 'No Posts Yet'}
        </h3>
        {socialPosts.length === 0 ? (
          <div className="text-center py-12">
            <Share size={32} className="mx-auto mb-3" style={{ color: 'var(--text-3)', opacity: 0.3 }} />
            <p className="text-sm mb-2" style={{ color: 'var(--text-3)' }}>No social content yet</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Click "Generate Week of Content" to create your first batch</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {socialPosts.slice(0, 8).map(post => {
              const plat = PLATFORMS.find(p => p.id === post.platform);
              return (
                <div key={post.id} className="rounded-lg p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {plat && <plat.icon size={12} style={{ color: plat.color }} />}
                      <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{plat?.label}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{
                      background: post.status === 'published' ? 'rgba(0,212,170,0.1)' : post.status === 'scheduled' ? 'rgba(124,92,252,0.1)' : 'var(--surface-3)',
                      color: post.status === 'published' ? '#00D4AA' : post.status === 'scheduled' ? 'var(--accent-hover)' : 'var(--text-3)',
                    }}>
                      {post.status === 'scheduled' ? <Clock size={8} /> : <CheckCircle size={8} />}
                      {post.status}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3 line-clamp-4" style={{ color: 'var(--text-2)' }}>{post.content}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-3)' }}>
                    <span className="flex items-center gap-1"><Heart size={10} /> {post.engagement.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={10} /> {post.engagement.comments}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {post.engagement.reach}</span>
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
