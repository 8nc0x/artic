import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

import apiRoutes from './routes/api.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
    timestamp: new Date().toISOString()
  });
});

// Mount Unversioned REST API
app.use('/api', apiRoutes);

// Brain artifacts static serving (for generated images, uploads & references)
const brainArtifacts = 'C:/Users/snaxc/.gemini/antigravity-ide/brain/6fc28578-1fa6-432d-bef5-5e7474e99305';
app.use('/api/artifacts', express.static(brainArtifacts));

// Serve static frontend build in production if available
import fs from 'fs';
const distPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`❄️  NCPOR Polar Science Backend API running on port ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
