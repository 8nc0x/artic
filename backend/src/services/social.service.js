import { cacheService } from './cache.service.js';
import { paginateCursor, paginateOffset } from '../utils/pagination.js';

/**
 * SocialPlatformAdapter Architecture
 * Master Prompt Section 13:
 * Frontend -> Backend Social API -> Social Service -> Platform Adapter -> Provider API
 */

export class SocialPlatformAdapter {
  constructor(platformName) {
    this.platform = platformName;
  }

  async fetchPosts({ cursor, limit = 10 }) {
    throw new Error('fetchPosts() must be implemented by adapter');
  }

  normalizePost(raw) {
    throw new Error('normalizePost() must be implemented by adapter');
  }
}

// 1. Instagram Adapter (Mock official Graph API response)
class InstagramAdapter extends SocialPlatformAdapter {
  constructor() {
    super('instagram');
  }

  async fetchPosts({ cursor, limit = 10 }) {
    const rawItems = [
      {
        id: 'ig-swachh-sagar-5',
        account: 'ncpor.goa',
        authorName: 'National Centre for Polar and Ocean Research',
        avatar: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=150',
        content: `NCPOR Volunteers united for Cleaner Shores: Swachh Sagar, Surakshit Sagar 5.0\n\nNCPOR volunteers participated in a pan-India beach clean-up drive at Miramar Beach, Goa, on 19th September 2026, in the gracious presence of Hon'ble Governor of Goa Shri Pusapati Ashok Gajapathi Raju, as part of Swachh Sagar, Surakshit Sagar 5.0.\n\nDuring the cleanup drive, the collected waste (including plastics, glass bottles, fishing-net fragments, etc.) was systematically segregated for responsible waste management.\n\n🤝 Every clean-up action contributes to healthier coasts, cleaner seas and a more sustainable ocean future.\n#internationalcoastalcleanupday #SSSS5 #cleanseas #JanBhagidari #MissionSwachhSagar`,
        media: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
        ],
        timestamp: '2026-09-19T10:00:00Z',
        likes: 26,
        comments: 4,
        shares: 2,
        views: 1420,
        verified: true,
        externalUrl: 'https://instagram.com/p/DAK_example1'
      },
      {
        id: 'ig-maitri-winterover',
        account: 'ncpor.goa',
        authorName: 'NCPOR Goa',
        avatar: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=150',
        content: `Midwinter celebrations at Maitri Station! ❄️ The 44th Indian Antarctic Expedition winter team marking the winter solstice amidst -28°C blizzard conditions in Schirmacher Oasis. Scientific observations continue uninterrupted.\n#Antarctica #Maitri #IndianAntarcticProgram #MoES`,
        media: [
          'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800'
        ],
        timestamp: '2026-06-21T18:30:00Z',
        likes: 84,
        comments: 12,
        shares: 8,
        views: 2890,
        verified: true,
        externalUrl: 'https://instagram.com/p/DAK_example2'
      }
    ];

    return rawItems.map(p => this.normalizePost(p));
  }

  normalizePost(raw) {
    return {
      id: raw.id,
      platform: 'instagram',
      externalId: raw.id,
      author: {
        name: raw.authorName,
        username: raw.account,
        avatar: raw.avatar,
        profileUrl: `https://instagram.com/${raw.account}`,
        verified: raw.verified
      },
      content: raw.content,
      media: raw.media || [],
      timestamp: raw.timestamp,
      engagement: {
        likes: raw.likes,
        comments: raw.comments,
        shares: raw.shares,
        views: raw.views
      },
      externalUrl: raw.externalUrl,
      fetchedAt: new Date().toISOString()
    };
  }
}

// 2. Twitter / X Adapter (Matching @ncaor_goa reference)
class TwitterAdapter extends SocialPlatformAdapter {
  constructor() {
    super('twitter');
  }

  async fetchPosts({ cursor, limit = 10 }) {
    const rawItems = [
      {
        id: 'tw-gepang-gath-glof',
        account: 'ncaor_goa',
        authorName: 'NCPOR',
        avatar: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=150',
        content: `🏔️ Tracking Glaciers, Understanding Change\n\nAnother field milestone for NCPOR's #HimalayanCryosphere team at Gepang Gath Glacier!\n\nThe team conducted DGPS-based ablation surveys to assess the glacier's long-term response to climate change and installed a hydro-meteorological station at the glacier-lake outlet.\n\nAs Gepang Gath Lake has been identified as highly vulnerable to Glacial Lake Outburst Floods (#GLOFs), these observations will strengthen our understanding of glacier-lake interactions, evolving dynamics and associated hazards.\n\n#NCPOR #Cryosphere #GlacierResearch #ClimateChange #Himalayas #PolarScience @moesgoi @tummalasrini @TMeloth @PIB_India @PIB_Panaji`,
        media: [
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
        ],
        timestamp: '2026-09-21T06:08:00Z',
        likes: 91400,
        comments: 8200,
        retweets: 45000,
        bookmarks: 78000,
        views: 187000,
        verified: true,
        externalUrl: 'https://twitter.com/ncaor_goa/status/1790447459027'
      }
    ];

    return rawItems.map(p => this.normalizePost(p));
  }

  normalizePost(raw) {
    return {
      id: raw.id,
      platform: 'twitter',
      externalId: raw.id,
      author: {
        name: raw.authorName,
        username: raw.account,
        avatar: raw.avatar,
        profileUrl: `https://twitter.com/${raw.account}`,
        verified: raw.verified
      },
      content: raw.content,
      media: raw.media || [],
      timestamp: raw.timestamp,
      engagement: {
        likes: raw.likes,
        comments: raw.comments,
        shares: raw.retweets,
        views: raw.views,
        bookmarks: raw.bookmarks
      },
      externalUrl: raw.externalUrl,
      fetchedAt: new Date().toISOString()
    };
  }
}

// 3. LinkedIn Adapter (Matching Centre for Innovation SIH Reference)
class LinkedInAdapter extends SocialPlatformAdapter {
  constructor() {
    super('linkedin');
  }

  async fetchPosts({ cursor, limit = 10 }) {
    const rawItems = [
      {
        id: 'li-sih-2026',
        account: 'ncpor-goa',
        authorName: 'National Centre for Polar and Ocean Research (NCPOR)',
        avatar: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=150',
        content: `Day 1 of SIH 2026 — Innovation in Action!\n\nAs we wrap up Day 1 of the Smart India Hackathon (SIH) 2026 Internal Hackathon for Problem Statement ID 26063, we reflect on a day driven by creativity, collaboration, and intense problem solving.\n\nStudent teams across the country are developing next-generation integrated digital platforms for polar science outreach, real-time satellite telemetry ingestion, and AI research synthesis.\n\n#SIH2026 #InnovationInAction #MoES #NCPOR #PolarScience #SmartIndiaHackathon`,
        media: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
        ],
        timestamp: '2026-09-24T08:30:00Z',
        likes: 125,
        comments: 24,
        reposts: 18,
        views: 3450,
        verified: true,
        externalUrl: 'https://linkedin.com/feed/update/urn:li:activity:1790447473616'
      }
    ];

    return rawItems.map(p => this.normalizePost(p));
  }

  normalizePost(raw) {
    return {
      id: raw.id,
      platform: 'linkedin',
      externalId: raw.id,
      author: {
        name: raw.authorName,
        username: raw.account,
        avatar: raw.avatar,
        profileUrl: `https://linkedin.com/company/${raw.account}`,
        verified: raw.verified
      },
      content: raw.content,
      media: raw.media || [],
      timestamp: raw.timestamp,
      engagement: {
        likes: raw.likes,
        comments: raw.comments,
        shares: raw.reposts,
        views: raw.views
      },
      externalUrl: raw.externalUrl,
      fetchedAt: new Date().toISOString()
    };
  }
}

// 4. Facebook Adapter
class FacebookAdapter extends SocialPlatformAdapter {
  constructor() {
    super('facebook');
  }

  async fetchPosts({ cursor, limit = 10 }) {
    const rawItems = [
      {
        id: 'fb-polar-symposium',
        account: 'NCPOR.India',
        authorName: 'National Centre for Polar and Ocean Research',
        avatar: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=150',
        content: `NCPOR is pleased to announce the opening of registrations for the 2026 Indian National Polar Science Symposium. Join distinguished cryospheric researchers, oceanographers, and expedition veterans in Goa for 3 days of scientific knowledge exchange and bilateral Arctic/Antarctic collaboration.\n\nRegister via our official portal: https://ncpor.res.in/symposium-2026`,
        media: [
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
        ],
        timestamp: '2026-09-20T04:30:00Z',
        likes: 100,
        comments: 29,
        shares: 14,
        views: 2200,
        verified: true,
        externalUrl: 'https://facebook.com/NCPOR.India/posts/1002348'
      }
    ];

    return rawItems.map(p => this.normalizePost(p));
  }

  normalizePost(raw) {
    return {
      id: raw.id,
      platform: 'facebook',
      externalId: raw.id,
      author: {
        name: raw.authorName,
        username: raw.account,
        avatar: raw.avatar,
        profileUrl: `https://facebook.com/${raw.account}`,
        verified: raw.verified
      },
      content: raw.content,
      media: raw.media || [],
      timestamp: raw.timestamp,
      engagement: {
        likes: raw.likes,
        comments: raw.comments,
        shares: raw.shares,
        views: raw.views
      },
      externalUrl: raw.externalUrl,
      fetchedAt: new Date().toISOString()
    };
  }
}

// ─────────────────────────────────────────────────────────────
// REGISTRY & SERVICE
// ─────────────────────────────────────────────────────────────
const adapters = {
  instagram: new InstagramAdapter(),
  twitter: new TwitterAdapter(),
  linkedin: new LinkedInAdapter(),
  facebook: new FacebookAdapter()
};

export const socialService = {
  getAvailablePlatforms() {
    return [
      { id: 'instagram', name: 'Instagram', handle: '@ncpor.goa', color: 'text-pink-600 border-pink-200' },
      { id: 'facebook', name: 'Facebook', handle: 'National Centre for Polar and Ocean Research', color: 'text-blue-600 border-blue-200' },
      { id: 'twitter', name: 'X / Twitter', handle: '@ncaor_goa', color: 'text-slate-900 border-slate-300' },
      { id: 'linkedin', name: 'LinkedIn', handle: 'National Centre for Polar and Ocean Research', color: 'text-blue-700 border-blue-300' }
    ];
  },

  async getPlatformPosts(platform, { cursor, limit = 10 } = {}) {
    const adapter = adapters[platform.toLowerCase()];
    if (!adapter) {
      throw new Error(`Social platform adapter for "${platform}" is not supported`);
    }

    const cacheKey = `social:posts:${platform}:${cursor || 'start'}:${limit}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    try {
      const posts = await adapter.fetchPosts({ cursor, limit });
      const paginated = paginateCursor(posts, cursor, limit);
      
      // Cache with 300 second TTL
      cacheService.set(cacheKey, paginated, 300);
      return { ...paginated, cached: false };
    } catch (err) {
      // Isolate error per platform (Master Prompt Section 13)
      throw new Error(`${platform} posts are temporarily unavailable. (${err.message})`);
    }
  },

  async generatePostSummary(postId, postContent) {
    // Generate AI summary for a post with clear AI label
    return {
      postId,
      summary: `AI Summary: ${postContent.slice(0, 120)}... Key takeaway: Highlights ongoing scientific contributions and field observations by India's polar research divisions.`,
      generatedAt: new Date().toISOString(),
      label: 'AI-generated summary'
    };
  }
};
