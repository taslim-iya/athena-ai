import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Channel = 'seo' | 'social' | 'email' | 'ads' | 'analytics';
export type AdPlatform = 'meta' | 'google' | 'tiktok';
export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'tiktok';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface Brand {
  name: string;
  url: string;
  description: string;
  industry: string;
  tone: string;
  colors: string[];
  competitors: Competitor[];
  keywords: string[];
  guidelines: string;
}

export interface Competitor {
  name: string;
  url: string;
  strengths: string[];
  weaknesses: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  keywords: string[];
  status: 'draft' | 'published';
  wordCount: number;
  seoScore: number;
  createdAt: string;
}

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  mediaUrl?: string;
  scheduledAt: string;
  status: PostStatus;
  engagement: { likes: number; comments: number; shares: number; reach: number };
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
  openRate: number;
  clickRate: number;
  sentAt?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: AdPlatform;
  status: 'active' | 'paused' | 'ended';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  createdAt: string;
}

export interface DailyReport {
  id: string;
  date: string;
  traffic: number;
  revenue: number;
  adSpend: number;
  socialEngagement: number;
  emailsSent: number;
  highlights: string[];
  recommendations: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  channel: Channel;
  type: 'blog' | 'social' | 'email' | 'ad' | 'report';
  status: 'planned' | 'in-progress' | 'done';
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  category: 'analytics' | 'ads' | 'social' | 'email' | 'cms' | 'ecommerce';
  connected: boolean;
  lastSync?: string;
}

export interface Config {
  openaiKey: string;
  businessUrl: string;
  onboarded: boolean;
  morningReportTime: string;
  autoPost: boolean;
  autoOptimize: boolean;
  weeklyDigest: boolean;
}

interface AppState {
  brand: Brand;
  blogPosts: BlogPost[];
  socialPosts: SocialPost[];
  emailCampaigns: EmailCampaign[];
  adCampaigns: AdCampaign[];
  dailyReports: DailyReport[];
  calendar: CalendarEvent[];
  integrations: Integration[];
  config: Config;
  updateBrand: (data: Partial<Brand>) => void;
  addBlogPost: (p: BlogPost) => void;
  addSocialPost: (p: SocialPost) => void;
  addEmailCampaign: (c: EmailCampaign) => void;
  addAdCampaign: (c: AdCampaign) => void;
  updateAdCampaign: (id: string, data: Partial<AdCampaign>) => void;
  addDailyReport: (r: DailyReport) => void;
  addCalendarEvent: (e: CalendarEvent) => void;
  toggleIntegration: (id: string) => void;
  updateConfig: (data: Partial<Config>) => void;
}

const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: 'ga', name: 'Google Analytics', icon: '📊', category: 'analytics', connected: false },
  { id: 'gsc', name: 'Search Console', icon: '🔍', category: 'analytics', connected: false },
  { id: 'meta-ads', name: 'Meta Ads', icon: '📘', category: 'ads', connected: false },
  { id: 'google-ads', name: 'Google Ads', icon: '🎯', category: 'ads', connected: false },
  { id: 'tiktok-ads', name: 'TikTok Ads', icon: '🎵', category: 'ads', connected: false },
  { id: 'instagram', name: 'Instagram', icon: '📸', category: 'social', connected: false },
  { id: 'facebook', name: 'Facebook', icon: '📘', category: 'social', connected: false },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', category: 'social', connected: false },
  { id: 'twitter', name: 'X / Twitter', icon: '🐦', category: 'social', connected: false },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', category: 'social', connected: false },
  { id: 'klaviyo', name: 'Klaviyo', icon: '📧', category: 'email', connected: false },
  { id: 'mailchimp', name: 'Mailchimp', icon: '🐒', category: 'email', connected: false },
  { id: 'wordpress', name: 'WordPress', icon: '📝', category: 'cms', connected: false },
  { id: 'webflow', name: 'Webflow', icon: '🌐', category: 'cms', connected: false },
  { id: 'shopify', name: 'Shopify', icon: '🛍', category: 'ecommerce', connected: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      brand: { name: '', url: '', description: '', industry: '', tone: '', colors: [], competitors: [], keywords: [], guidelines: '' },
      blogPosts: [],
      socialPosts: [],
      emailCampaigns: [],
      adCampaigns: [],
      dailyReports: [],
      calendar: [],
      integrations: DEFAULT_INTEGRATIONS,
      config: { openaiKey: '', businessUrl: '', onboarded: false, morningReportTime: '08:00', autoPost: false, autoOptimize: true, weeklyDigest: true },
      updateBrand: (data) => set(s => ({ brand: { ...s.brand, ...data } })),
      addBlogPost: (p) => set(s => ({ blogPosts: [p, ...s.blogPosts] })),
      addSocialPost: (p) => set(s => ({ socialPosts: [p, ...s.socialPosts] })),
      addEmailCampaign: (c) => set(s => ({ emailCampaigns: [c, ...s.emailCampaigns] })),
      addAdCampaign: (c) => set(s => ({ adCampaigns: [c, ...s.adCampaigns] })),
      updateAdCampaign: (id, data) => set(s => ({ adCampaigns: s.adCampaigns.map(c => c.id === id ? { ...c, ...data } : c) })),
      addDailyReport: (r) => set(s => ({ dailyReports: [r, ...s.dailyReports] })),
      addCalendarEvent: (e) => set(s => ({ calendar: [...s.calendar, e] })),
      toggleIntegration: (id) => set(s => ({ integrations: s.integrations.map(i => i.id === id ? { ...i, connected: !i.connected } : i) })),
      updateConfig: (data) => set(s => ({ config: { ...s.config, ...data } })),
    }),
    { name: 'athena-store' }
  )
);
