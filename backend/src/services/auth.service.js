import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'ncpor-secret-key-polar-science-portal-2026';
const ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// In-memory token storage (for demo/standalone production resilience)
const refreshTokenStore = new Map();

// Helper: base64Url encoding
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString('utf8');
}

// Generate JWT signature
function signPayload(header, payload, secret) {
  const encHeader = base64UrlEncode(JSON.stringify(header));
  const encPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encHeader}.${encPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${encHeader}.${encPayload}.${signature}`;
}

export function generateTokenPair(user) {
  const now = Date.now();

  // 1. Short-lived Access Token
  const accessPayload = {
    sub: user.id || 'polar-researcher-1',
    name: user.name || 'Polar Scientist',
    email: user.email || 'scientist@ncpor.res.in',
    role: user.role || 'researcher',
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + ACCESS_TOKEN_EXPIRY_MS) / 1000)
  };
  const accessToken = signPayload({ alg: 'HS256', typ: 'JWT' }, accessPayload, JWT_SECRET);

  // 2. Long-lived Refresh Token (Cryptographically secure random string)
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const tokenRecord = {
    userId: accessPayload.sub,
    email: accessPayload.email,
    expiresAt: now + REFRESH_TOKEN_EXPIRY_MS,
    createdAt: now,
    revoked: false
  };

  refreshTokenStore.set(refreshToken, tokenRecord);

  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRY_MS / 1000,
    tokenType: 'Bearer',
    user: {
      id: accessPayload.sub,
      name: accessPayload.name,
      email: accessPayload.email,
      role: accessPayload.role
    }
  };
}

export function verifyAccessToken(token) {
  if (!token) return { valid: false, error: 'No token provided' };
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, error: 'Invalid token structure' };

    const [encHeader, encPayload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encHeader}.${encPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (signature !== expectedSig) {
      return { valid: false, error: 'Signature mismatch' };
    }

    const payload = JSON.parse(base64UrlDecode(encPayload));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return { valid: false, error: 'Access token expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

export function refreshAccessToken(oldRefreshToken) {
  if (!oldRefreshToken) {
    throw new Error('Refresh token is required');
  }

  const record = refreshTokenStore.get(oldRefreshToken);
  if (!record || record.revoked) {
    throw new Error('Invalid or revoked refresh token');
  }

  if (Date.now() > record.expiresAt) {
    refreshTokenStore.delete(oldRefreshToken);
    throw new Error('Refresh token has expired');
  }

  // Token rotation: Revoke old token and issue fresh pair
  refreshTokenStore.delete(oldRefreshToken);

  return generateTokenPair({
    id: record.userId,
    email: record.email,
    name: 'Polar Scientist'
  });
}

export function revokeRefreshToken(token) {
  if (token && refreshTokenStore.has(token)) {
    refreshTokenStore.delete(token);
    return true;
  }
  return false;
}
