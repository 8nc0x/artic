/**
 * Cache-Aside Pattern, TTL-based Expiry, and Leaderboards Service
 * Simulates high-performance Redis behavior in-memory with production contracts.
 */

class CacheStore {
  constructor() {
    this.store = new Map(); // key -> { value, expiresAt }
    this.leaderboards = new Map(); // boardName -> Map of (member -> score)
    
    // Auto-clean expired items every 60 seconds
    setInterval(() => this.cleanup(), 60000).unref();
  }

  set(key, value, ttlSeconds = 300) {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.store.set(key, { value, expiresAt });
    return true;
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  delete(key) {
    return this.store.delete(key);
  }

  /**
   * Cache-Aside Pattern Implementation:
   * 1. Check cache for key
   * 2. If present, return immediately (Cache HIT)
   * 3. If absent, execute database/service fetcher, populate cache with TTL, return value (Cache MISS)
   */
  async getOrSet(key, fetcherFn, ttlSeconds = 300) {
    const cached = this.get(key);
    if (cached !== null) {
      return { data: cached, cacheStatus: 'HIT' };
    }

    const freshData = await fetcherFn();
    this.set(key, freshData, ttlSeconds);
    return { data: freshData, cacheStatus: 'MISS' };
  }

  // ─────────────────────────────────────────────────────────────
  // Sorted Set Leaderboards (Redis ZSET pattern)
  // ─────────────────────────────────────────────────────────────
  zadd(boardName, score, member) {
    if (!this.leaderboards.has(boardName)) {
      this.leaderboards.set(boardName, new Map());
    }
    const board = this.leaderboards.get(boardName);
    board.set(member, parseFloat(score));
    return true;
  }

  zrevrangeWithScores(boardName, start = 0, stop = 9) {
    const board = this.leaderboards.get(boardName);
    if (!board) return [];

    const sorted = Array.from(board.entries())
      .sort((a, b) => b[1] - a[1]) // Descending
      .slice(start, stop + 1)
      .map(([member, score], rank) => ({
        rank: rank + 1,
        member,
        score
      }));

    return sorted;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt && now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

export const cacheService = new CacheStore();

// Seed initial polar portal leaderboards
cacheService.zadd('leaderboard:quiz', 950, 'Dr. Sunita Sharma (IIT Roorkee)');
cacheService.zadd('leaderboard:quiz', 890, 'Aryan Verma (IISER Pune)');
cacheService.zadd('leaderboard:quiz', 840, 'Priya Nair (Goa University)');
cacheService.zadd('leaderboard:datasets', 4320, '44th-IAE-AWS-Maitri-Meteorological-TimeSeries');
cacheService.zadd('leaderboard:datasets', 3890, 'Himadri-Kongsfjorden-CTD-Hydrographic-Profile');
cacheService.zadd('leaderboard:datasets', 3120, 'Southern-Ocean-Chlorophyll-Biogeochem-2024');
