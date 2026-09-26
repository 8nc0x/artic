import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

import apiRoutes from './routes/api.routes.js';
import { initializePostgres } from './db/postgres.js';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Initialize PostgreSQL if DATABASE_URL is configured
initializePostgres().catch(err => {
  console.warn('PostgreSQL initialization warning:', err.message);
});

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    portal: 'NCPOR Integrated Polar Science Knowledge Repository & Outreach Portal',
    version: '1.0.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount Unversioned REST API
app.use('/api', apiRoutes);

// Artifacts static serving (if exists)
const artifactsDir = process.env.ARTIFACTS_DIR || path.resolve(__dirname, '../data/artifacts');
if (fs.existsSync(artifactsDir)) {
  app.use('/api/artifacts', express.static(artifactsDir));
}

// Serve static frontend build in production
const possibleDistPaths = [
  path.resolve(__dirname, '../../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'dist'),
  path.resolve(__dirname, '../public')
];

const distPath = possibleDistPaths.find(p => fs.existsSync(p));

if (distPath) {
  console.log(`📦 Serving static frontend build from: ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn('⚠️ Frontend dist build folder not detected. To serve UI from Express, run: npm run build');
  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      message: 'Polar Science Portal API is operational on port ' + PORT + '. Frontend build dist not detected yet.',
      api_health: '/api/health',
      hint: 'Run `npm run build` in the project root to compile the frontend assets.'
    });
  });
}

// Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

app.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`❄️  NCPOR Polar Science Backend API running on http://${HOST}:${PORT}`);
  console.log(`📍 Endpoint: http://${HOST}:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
