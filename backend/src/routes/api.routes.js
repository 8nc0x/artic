import { Router } from 'express';
import { dbService } from '../db/index.js';
import { aiService } from '../services/ai.service.js';
import { generateTokenPair, verifyAccessToken, refreshAccessToken, revokeRefreshToken } from '../services/auth.service.js';
import { paginateCursor, paginateOffset } from '../utils/pagination.js';
import { tokenBucket, slidingWindow, fixedWindow, createRateLimitMiddleware } from '../services/rateLimiter.service.js';
import { sendEmail, evaluateSpamScore } from '../services/email.service.js';
import { verifyMagicBytes, normalizeFileBuffer, generateCloudinarySignedUploadUrl } from '../services/upload.service.js';
import { cacheService } from '../services/cache.service.js';
import { executeExpenseTransaction, verifyWebhookSignature, getDeadLetterQueue, getLedger } from '../services/payment.service.js';
import { webhookDeliverySystem } from '../services/webhook.service.js';
import { metricsRegistry } from '../services/metrics.service.js';
import { socialService } from '../services/social.service.js';
import { syncService } from '../services/sync.service.js';

const router = Router();

// Middleware: Track prometheus metrics
router.use((req, res, next) => {
  metricsRegistry.incrementCounter('ncpor_http_requests_total', 1, { method: req.method, path: req.baseUrl + req.path });
  next();
});

// Stats
router.get('/stats', (req, res) => {
  res.json({ success: true, data: dbService.getStats() });
});

// Datasets with Dual Pagination (Cursor-based + Offset-based)
router.get('/datasets', (req, res) => {
  const { q, category, region, limit = 20, offset = 0, cursor, pagination = 'offset' } = req.query;
  const rawResult = dbService.getDatasets({ q, category, region, limit: 1000, offset: 0 });
  const allItems = rawResult.items || [];

  if (pagination === 'cursor' || cursor) {
    const paginated = paginateCursor(allItems, cursor, parseInt(limit, 10));
    return res.json({ success: true, ...paginated });
  }

  const paginated = paginateOffset(allItems, Math.floor(parseInt(offset, 10) / parseInt(limit, 10)) + 1, parseInt(limit, 10));
  res.json({ success: true, total: allItems.length, ...paginated });
});

router.get('/datasets/:id', (req, res) => {
  const dataset = dbService.getDatasetById(req.params.id);
  if (!dataset) {
    return res.status(404).json({ success: false, error: 'Dataset not found' });
  }
  res.json({ success: true, data: dataset });
});

// Publications
router.get('/publications', (req, res) => {
  const { q, category, limit = 20, offset = 0 } = req.query;
  const result = dbService.getPublications({
    q,
    category,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10)
  });
  res.json({ success: true, ...result });
});

router.get('/publications/:id', (req, res) => {
  const pub = dbService.getPublicationById(req.params.id);
  if (!pub) {
    return res.status(404).json({ success: false, error: 'Publication not found' });
  }
  res.json({ success: true, data: pub });
});

// Researchers
router.get('/researchers', (req, res) => {
  res.json({ success: true, data: dbService.getResearchers() });
});

router.get('/researchers/:id', (req, res) => {
  const researcher = dbService.getResearcherById(req.params.id);
  if (!researcher) {
    return res.status(404).json({ success: false, error: 'Researcher not found' });
  }
  res.json({ success: true, data: researcher });
});

// Expeditions
router.get('/expeditions', (req, res) => {
  res.json({ success: true, data: dbService.getExpeditions() });
});

router.get('/expeditions/:id', (req, res) => {
  const expedition = dbService.getExpeditionById(req.params.id);
  if (!expedition) {
    return res.status(404).json({ success: false, error: 'Expedition not found' });
  }
  res.json({ success: true, data: expedition });
});

// Institutions
router.get('/institutions', (req, res) => {
  res.json({ success: true, data: dbService.getInstitutions() });
});

// Knowledge Graph
router.get('/knowledge-graph', (req, res) => {
  const { focusNode } = req.query;
  const graph = dbService.getKnowledgeGraph({ focusNode });
  res.json({ success: true, data: graph });
});

// Social Posts
router.get('/social/posts', (req, res) => {
  res.json({ success: true, data: dbService.getSocialPosts() });
});

router.post('/social/posts', (req, res) => {
  const newPost = dbService.addSocialPost(req.body);
  res.status(201).json({ success: true, data: newPost });
});

router.post('/social/posts/generate', async (req, res) => {
  const { title, category, platform, tone } = req.body;
  const generated = await aiService.generateSocialPost({ title, category, platform, tone });
  res.json({ success: true, data: generated });
});

router.post('/social/posts/generate-carousel', async (req, res) => {
  const { title, topic, platform } = req.body;
  const result = await aiService.generateCarouselPost({ title, topic, platform });
  res.json(result);
});


// Social Platform Adapters & Normalized Feeds (Master Prompt Section 13)
router.get('/social/platforms', (req, res) => {
  res.json({ success: true, platforms: socialService.getAvailablePlatforms() });
});

router.get('/social/:platform/posts', async (req, res) => {
  const { platform } = req.params;
  const { cursor, limit = 10 } = req.query;
  try {
    const result = await socialService.getPlatformPosts(platform, { cursor, limit: parseInt(limit, 10) });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, platform });
  }
});

router.post('/social/posts/:id/summary', async (req, res) => {
  const { content } = req.body;
  const summary = await socialService.generatePostSummary(req.params.id, content || '');
  res.json({ success: true, ...summary });
});

// NCPOR Dataset & Online Source Sync (Master Prompt Section 9 & 48)
router.get('/sync/sources', (req, res) => {
  res.json({ success: true, sources: syncService.getSourceRegistry() });
});

router.get('/sync/history', (req, res) => {
  res.json({ success: true, history: syncService.getSyncHistory() });
});

router.post('/sync/trigger', async (req, res) => {
  const jobLog = await syncService.runDailySyncJob();
  res.json({ success: true, job: jobLog });
});

// Notifications
router.get('/notifications', (req, res) => {
  res.json({ success: true, data: dbService.getNotifications() });
});

router.patch('/notifications/:id/read', (req, res) => {
  const updated = dbService.markNotificationRead(req.params.id);
  res.json({ success: true, data: updated });
});

router.post('/notifications/read-all', (req, res) => {
  dbService.markAllNotificationsRead();
  res.json({ success: true, message: 'All marked read' });
});

// Upcoming Events & Activities
router.get('/events', (req, res) => {
  const { type, status } = req.query;
  const activities = dbService.getActivities({ type, status });
  res.json({ success: true, data: activities.length > 0 ? activities : dbService.getUpcomingEvents() });
});

router.get('/activities', (req, res) => {
  const { type, status } = req.query;
  const activities = dbService.getActivities({ type, status });
  res.json({ success: true, data: activities });
});

router.get('/activities/:id', (req, res) => {
  const activity = dbService.getActivityById(req.params.id);
  if (!activity) return res.status(404).json({ success: false, error: 'Activity not found' });
  res.json({ success: true, data: activity });
});

router.post('/activities/:id/register', (req, res) => {
  const result = dbService.registerForActivity(req.params.id, req.body);
  if (!result) return res.status(404).json({ success: false, error: 'Activity not found' });
  res.json({ success: true, ...result });
});

// Reports Library
router.get('/reports', (req, res) => {
  const { q, expedition, region, limit = 20, offset = 0 } = req.query;
  const result = dbService.getReports({
    q,
    expedition,
    region,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10)
  });
  res.json({ success: true, ...result });
});

router.get('/reports/:id', (req, res) => {
  const report = dbService.getReportById(req.params.id);
  if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
  res.json({ success: true, data: report });
});

// Media Gallery
router.get('/media', (req, res) => {
  const { type, region, category, tag, limit = 30, offset = 0 } = req.query;
  const result = dbService.getMedia({
    type,
    region,
    category,
    tag,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10)
  });
  res.json({ success: true, ...result });
});

router.get('/media/:id', (req, res) => {
  const item = dbService.getMediaById(req.params.id);
  if (!item) return res.status(404).json({ success: false, error: 'Media not found' });
  res.json({ success: true, data: item });
});

// AI Polar Image Generation
router.post('/media/generate-image', async (req, res) => {
  const { prompt, style } = req.body;
  const result = await aiService.generateAiImage({ prompt, style });
  res.json(result);
});


// User Profile, Saved Items, History
router.get('/users/me', (req, res) => {
  res.json({ success: true, data: dbService.getUserProfile() });
});

router.get('/users/me/saved', (req, res) => {
  res.json({ success: true, data: dbService.getSavedItems() });
});

router.post('/users/me/saved', (req, res) => {
  const items = dbService.addSavedItem(req.body);
  res.json({ success: true, data: items });
});

router.delete('/users/me/saved/:id', (req, res) => {
  const items = dbService.removeSavedItem(req.params.id);
  res.json({ success: true, data: items });
});

router.get('/users/me/history', (req, res) => {
  res.json({ success: true, data: dbService.getUserHistory() });
});

router.delete('/users/me/history', (req, res) => {
  dbService.clearUserHistory();
  res.json({ success: true, message: 'History cleared' });
});

// Admin Dashboard & Moderation
router.get('/admin/dashboard', (req, res) => {
  res.json({ success: true, data: dbService.getAdminDashboard() });
});

router.get('/admin/pending', (req, res) => {
  res.json({ success: true, data: dbService.getPendingModeration() });
});

router.post('/admin/approve/:id', (req, res) => {
  const item = dbService.approveModeration(req.params.id);
  res.json({ success: true, data: item });
});

router.post('/admin/reject/:id', (req, res) => {
  const item = dbService.rejectModeration(req.params.id);
  res.json({ success: true, data: item });
});

// Trends
router.get('/trends', (req, res) => {
  res.json({ success: true, data: dbService.getAIDataTrends() });
});

// Education
router.get('/education/topics', (req, res) => {
  res.json({ success: true, data: dbService.getEducationTopics() });
});

router.get('/education/topics/:id', (req, res) => {
  const topic = dbService.getEducationTopicById(req.params.id);
  if (!topic) {
    return res.status(404).json({ success: false, error: 'Topic not found' });
  }
  res.json({ success: true, data: topic });
});

// Global Semantic Search
router.post('/search', (req, res) => {
  const { query, region, type } = req.body;
  const results = dbService.globalSemanticSearch(query, { region, type });
  res.json({ success: true, total: results.length, data: results });
});

router.get('/search/suggestions', (req, res) => {
  const { q = '' } = req.query;
  const suggestions = [
    "Antarctic sea-ice variability 2010-2023",
    "Maitri Station meteorological observations",
    "Bharati station atmospheric radar",
    "Himadri Arctic Svalbard glaciology",
    "Southern Ocean carbon fluxes",
    "Larsemann Hills permafrost temperatures",
    "Weddell Sea bottom water formation"
  ].filter(s => s.toLowerCase().includes(q.toLowerCase()));
  res.json({ success: true, data: suggestions });
});

// AI Assistant Endpoints
router.post('/ai/ask', async (req, res) => {
  const { query, paperContext, datasetContext } = req.body;
  const response = await aiService.askQuestion({ query, paperContext, datasetContext });
  res.json({ success: true, ...response });
});

router.post('/ai/summarize', async (req, res) => {
  const { title, abstract, type } = req.body;
  const response = await aiService.summarizeDocument({ title, abstract, type });
  res.json({ success: true, ...response });
});

router.post('/ai/analyze-document', async (req, res) => {
  const { title, content } = req.body;
  const response = await aiService.analyzeDocument({ title, content });
  res.json({ success: true, ...response });
});

// ─────────────────────────────────────────────────────────────
// AUTH: Access Token + Refresh Token Endpoints
// ─────────────────────────────────────────────────────────────
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Demo authentication verification
  const user = {
    id: 'polar-researcher-1',
    name: 'Dr. Ramesh Sengupta',
    email: email || 'r.sengupta@ncpor.res.in',
    role: 'Principal Investigator (Cryosphere)'
  };
  const tokenPair = generateTokenPair(user);
  res.json({ success: true, ...tokenPair });
});

router.post('/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  try {
    const freshPair = refreshAccessToken(refreshToken);
    res.json({ success: true, ...freshPair });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

router.post('/auth/logout', (req, res) => {
  const { refreshToken } = req.body;
  revokeRefreshToken(refreshToken);
  res.json({ success: true, message: 'Logged out and refresh token revoked' });
});

router.get('/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const verified = verifyAccessToken(token);
  if (!verified.valid) {
    return res.status(401).json({ success: false, error: verified.error });
  }
  res.json({ success: true, user: verified.payload });
});

// ─────────────────────────────────────────────────────────────
// EMAIL: Templates, SMTP Dispatch, Resend Fallback & Spam Protection
// ─────────────────────────────────────────────────────────────
router.post('/email/send', async (req, res) => {
  const { to, subject, recipientName, message, actionUrl, actionText } = req.body;
  try {
    const result = await sendEmail({ to, subject, recipientName, message, actionUrl, actionText });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post('/email/spam-check', (req, res) => {
  const { to, subject, body } = req.body;
  const evaluation = evaluateSpamScore({ to, subject, body });
  res.json({ success: true, evaluation });
});

// ─────────────────────────────────────────────────────────────
// FILE UPLOAD: Magic Bytes, RAM Resizing, and Cloudinary Signed URLs
// ─────────────────────────────────────────────────────────────
router.post('/upload/sign-cloudinary', (req, res) => {
  const { folder, tags } = req.body;
  const signedParams = generateCloudinarySignedUploadUrl(folder, tags);
  res.json({ success: true, data: signedParams });
});

router.post('/upload/verify-magic', (req, res) => {
  const { base64Data, extension } = req.body;
  if (!base64Data) return res.status(400).json({ success: false, error: 'base64Data is required' });
  const buffer = Buffer.from(base64Data, 'base64');
  const check = verifyMagicBytes(buffer, extension);
  res.json({ success: check.valid, ...check });
});

router.post('/upload/normalize', async (req, res) => {
  const { base64Data, metadata } = req.body;
  if (!base64Data) return res.status(400).json({ success: false, error: 'base64Data is required' });
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const result = await normalizeFileBuffer(buffer, metadata);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// REDIS CACHE-ASIDE & LEADERBOARDS
// ─────────────────────────────────────────────────────────────
router.get('/cache/leaderboard/:boardName', (req, res) => {
  const { boardName } = req.params;
  const leaders = cacheService.zrevrangeWithScores(`leaderboard:${boardName}`, 0, 10);
  res.json({ success: true, board: boardName, leaders });
});

router.post('/cache/leaderboard/:boardName/score', (req, res) => {
  const { boardName } = req.params;
  const { score, member } = req.body;
  cacheService.zadd(`leaderboard:${boardName}`, score, member);
  res.json({ success: true, message: 'Score recorded in Redis sorted set' });
});

router.get('/cache/cached-stats', async (req, res) => {
  const result = await cacheService.getOrSet('ncpor:portal:global_stats', () => {
    return dbService.getStats();
  }, 120);
  res.json({ success: true, ...result });
});

// ─────────────────────────────────────────────────────────────
// SPLITTAB / EXPEDITION EXPENSE BACKEND (OCC, Webhook, DLQ)
// ─────────────────────────────────────────────────────────────
router.get('/payments/ledger/:tabId', (req, res) => {
  const ledger = getLedger(req.params.tabId);
  if (!ledger) return res.status(404).json({ success: false, error: 'Ledger not found' });
  res.json({ success: true, ledger });
});

router.post('/payments/settle', (req, res) => {
  const { tabId, expectedVersion, fromUserId, toUserId, amount, description } = req.body;
  try {
    const result = executeExpenseTransaction({
      tabId,
      expectedVersion,
      fromUserId,
      toUserId,
      amount,
      description
    });
    res.json({ success: true, ...result });
  } catch (err) {
    const status = err.code === 'ERR_OCC_VERSION_MISMATCH' ? 409 : 400;
    res.status(status).json({ success: false, error: err.message, currentVersion: err.currentVersion });
  }
});

router.post('/payments/webhook', (req, res) => {
  const signature = req.headers['x-signature-sha256'];
  const rawBody = JSON.stringify(req.body);
  const isValid = verifyWebhookSignature(rawBody, signature);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid HMAC SHA-256 webhook signature' });
  }
  res.json({ success: true, message: 'Payment webhook processed and verified' });
});

router.get('/payments/dlq', (req, res) => {
  res.json({ success: true, deadLetterQueue: getDeadLetterQueue() });
});

// ─────────────────────────────────────────────────────────────
// WEBHOOK DELIVERY QUEUE SYSTEM & BACKPRESSURE
// ─────────────────────────────────────────────────────────────
router.post('/webhooks/publish', (req, res) => {
  const { eventType, payload } = req.body;
  try {
    const result = webhookDeliverySystem.publishEvent(eventType, payload);
    res.json({ success: true, ...result });
  } catch (err) {
    const status = err.code === 'ERR_BACKPRESSURE_THRESHOLD_EXCEEDED' ? 429 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

router.get('/webhooks/metrics', (req, res) => {
  res.json({ success: true, metrics: webhookDeliverySystem.getMetrics() });
});

// ─────────────────────────────────────────────────────────────
// LOGGING & PROMETHEUS METRICS + K6 BENCHMARKING
// ─────────────────────────────────────────────────────────────
router.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.send(metricsRegistry.toPrometheusFormat());
});

router.post('/metrics/booking-benchmark', (req, res) => {
  const { scientistId, expeditionCode, berthsRequested } = req.body;
  const result = metricsRegistry.simulateBookingLoad({ scientistId, expeditionCode, berthsRequested });
  res.json({ success: result.success, ...result });
});

router.get('/metrics/grafana-dashboard', (req, res) => {
  res.json({ success: true, dashboard: metricsRegistry.getGrafanaDashboardSchema() });
});

// ─────────────────────────────────────────────────────────────
// THREE RATE LIMITERS (Token Bucket, Sliding Window, Fixed Window)
// ─────────────────────────────────────────────────────────────
router.get('/rate-limit/test-token-bucket', (req, res) => {
  const result = tokenBucket.consume(req.ip || 'client-ip');
  if (!result.allowed) {
    return res.status(429).json({ success: false, error: 'Rate limit exceeded (Token Bucket)', details: result });
  }
  res.json({ success: true, details: result });
});

router.get('/rate-limit/test-sliding-window', (req, res) => {
  const result = slidingWindow.consume(req.ip || 'client-ip');
  if (!result.allowed) {
    return res.status(429).json({ success: false, error: 'Rate limit exceeded (Sliding Window)', details: result });
  }
  res.json({ success: true, details: result });
});

router.get('/rate-limit/test-fixed-window', (req, res) => {
  const result = fixedWindow.consume(req.ip || 'client-ip');
  if (!result.allowed) {
    return res.status(429).json({ success: false, error: 'Rate limit exceeded (Fixed Window)', details: result });
  }
  res.json({ success: true, details: result });
});

export default router;


