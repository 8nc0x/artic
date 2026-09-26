/**
 * Three Rate Limiting Algorithms Built From Scratch:
 * 1. Token Bucket
 * 2. Sliding Window (Log / Counter)
 * 3. Fixed Window Counter
 */

// ─────────────────────────────────────────────────────────────
// 1. TOKEN BUCKET ALGORITHM
// ─────────────────────────────────────────────────────────────
class TokenBucketLimiter {
  constructor(capacity = 20, refillRatePerSec = 5) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
    this.buckets = new Map(); // key -> { tokens, lastRefill }
  }

  consume(key, tokensRequested = 1) {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(key, bucket);
    } else {
      // Calculate token refill based on elapsed time
      const elapsedSeconds = (now - bucket.lastRefill) / 1000;
      const refilledTokens = elapsedSeconds * this.refillRatePerSec;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + refilledTokens);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= tokensRequested) {
      bucket.tokens -= tokensRequested;
      return {
        allowed: true,
        remaining: Math.floor(bucket.tokens),
        capacity: this.capacity,
        algorithm: 'token-bucket'
      };
    }

    const waitTimeSec = ((tokensRequested - bucket.tokens) / this.refillRatePerSec).toFixed(2);
    return {
      allowed: false,
      remaining: Math.floor(bucket.tokens),
      capacity: this.capacity,
      retryAfterSeconds: Math.max(0.1, parseFloat(waitTimeSec)),
      algorithm: 'token-bucket'
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 2. SLIDING WINDOW LOG ALGORITHM
// ─────────────────────────────────────────────────────────────
class SlidingWindowLimiter {
  constructor(limit = 10, windowMs = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.logs = new Map(); // key -> array of timestamps
  }

  consume(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.logs.get(key) || [];
    // Evict timestamps outside current window
    timestamps = timestamps.filter(ts => ts > windowStart);

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.logs.set(key, timestamps);
      return {
        allowed: true,
        remaining: this.limit - timestamps.length,
        limit: this.limit,
        resetInMs: Math.max(0, this.windowMs - (now - timestamps[0])),
        algorithm: 'sliding-window'
      };
    }

    this.logs.set(key, timestamps);
    const oldestTimestamp = timestamps[0];
    const retryAfterMs = oldestTimestamp + this.windowMs - now;

    return {
      allowed: false,
      remaining: 0,
      limit: this.limit,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
      algorithm: 'sliding-window'
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 3. FIXED WINDOW COUNTER ALGORITHM
// ─────────────────────────────────────────────────────────────
class FixedWindowLimiter {
  constructor(limit = 15, windowMs = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.windows = new Map(); // key -> { windowStart, count }
  }

  consume(key) {
    const now = Date.now();
    const currentWindowStart = Math.floor(now / this.windowMs) * this.windowMs;

    let record = this.windows.get(key);

    if (!record || record.windowStart !== currentWindowStart) {
      record = { windowStart: currentWindowStart, count: 0 };
    }

    if (record.count < this.limit) {
      record.count += 1;
      this.windows.set(key, record);
      return {
        allowed: true,
        remaining: this.limit - record.count,
        limit: this.limit,
        resetInSeconds: Math.ceil((currentWindowStart + this.windowMs - now) / 1000),
        algorithm: 'fixed-window'
      };
    }

    this.windows.set(key, record);
    return {
      allowed: false,
      remaining: 0,
      limit: this.limit,
      retryAfterSeconds: Math.ceil((currentWindowStart + this.windowMs - now) / 1000),
      algorithm: 'fixed-window'
    };
  }
}

// Singletons ready for express middleware
export const tokenBucket = new TokenBucketLimiter(30, 5);
export const slidingWindow = new SlidingWindowLimiter(15, 60000);
export const fixedWindow = new FixedWindowLimiter(20, 60000);

export function createRateLimitMiddleware(type = 'sliding', options = {}) {
  let limiter;
  if (type === 'token-bucket') limiter = new TokenBucketLimiter(options.capacity, options.refillRate);
  else if (type === 'fixed') limiter = new FixedWindowLimiter(options.limit, options.windowMs);
  else limiter = new SlidingWindowLimiter(options.limit, options.windowMs);

  return (req, res, next) => {
    const clientKey = req.ip || req.headers['x-forwarded-for'] || 'anonymous-client';
    const result = limiter.consume(clientKey);

    res.setHeader('X-RateLimit-Limit', result.limit || result.capacity);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Algorithm', result.algorithm);

    if (!result.allowed) {
      res.setHeader('Retry-After', result.retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        details: result
      });
    }

    next();
  };
}
