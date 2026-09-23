import { Router } from 'express';
import { dbService } from '../db/index.js';
import { aiService } from '../services/ai.service.js';

const router = Router();

// Stats
router.get('/stats', (req, res) => {
  res.json({ success: true, data: dbService.getStats() });
});

// Datasets
router.get('/datasets', (req, res) => {
  const { q, category, region, limit = 20, offset = 0 } = req.query;
  const result = dbService.getDatasets({
    q,
    category,
    region,
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10)
  });
  res.json({ success: true, ...result });
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

export default router;

