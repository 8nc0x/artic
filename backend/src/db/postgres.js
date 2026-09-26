import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pool = null;
let isPostgresAvailable = false;

export function getPostgresPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (connectionString || (process.env.PGHOST && process.env.PGDATABASE)) {
    try {
      pool = new Pool({
        connectionString: connectionString || undefined,
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
        ssl: process.env.NODE_ENV === 'production' && !connectionString?.includes('localhost') 
          ? { rejectUnauthorized: false } 
          : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });

      pool.on('error', (err) => {
        console.warn('Unexpected error on idle PostgreSQL client:', err.message);
      });

      return pool;
    } catch (err) {
      console.warn('Failed to configure PostgreSQL pool:', err.message);
      return null;
    }
  }

  return null;
}

/**
 * Initialize PostgreSQL tables and auto-seed if empty
 */
export async function initializePostgres() {
  const p = getPostgresPool();
  if (!p) {
    console.log('ℹ️  PostgreSQL: No DATABASE_URL specified. Running with high-performance local JSON repository.');
    return false;
  }

  try {
    const client = await p.connect();
    try {
      console.log('🐘 PostgreSQL: Connected successfully to server.');
      
      // 1. Run Schema Creation
      const sqlPath = path.resolve(__dirname, 'postgres.init.sql');
      if (fs.existsSync(sqlPath)) {
        const initSql = fs.readFileSync(sqlPath, 'utf8');
        await client.query(initSql);
        console.log('🐘 PostgreSQL: Schemas and tables verified.');
      }

      // 2. Check if datasets table is populated
      const { rows } = await client.query('SELECT COUNT(*) AS count FROM datasets');
      const count = parseInt(rows[0]?.count || 0, 10);

      if (count === 0) {
        console.log('🐘 PostgreSQL: Database is empty. Auto-seeding from local scientific datasets...');
        await seedFromLocalJson(client);
        console.log('🐘 PostgreSQL: Auto-seed complete.');
      } else {
        console.log(`🐘 PostgreSQL: Ready with ${count} existing datasets.`);
      }

      isPostgresAvailable = true;
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('⚠️  PostgreSQL connection error:', err.message);
    console.log('ℹ️  Falling back to high-performance local JSON storage.');
    isPostgresAvailable = false;
    return false;
  }
}

/**
 * Seeds PostgreSQL tables from polar_database.json
 */
async function seedFromLocalJson(client) {
  const jsonPath = path.resolve(__dirname, '../data/polar_database.json');
  if (!fs.existsSync(jsonPath)) return;

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. Seed Datasets
  if (Array.isArray(data.datasets)) {
    for (const d of data.datasets.slice(0, 100)) {
      try {
        await client.query(
          `INSERT INTO datasets (id, npdc_id, title, abstract, scientist_name, release_date, expedition_year, region, category, format, size, download_url, parameters)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO NOTHING`,
          [
            d.id,
            d.npdc_id || null,
            d.title || 'Untitled Dataset',
            d.abstract || '',
            d.scientist_name || 'NCPOR Scientist',
            d.release_date && !isNaN(Date.parse(d.release_date)) ? new Date(d.release_date) : null,
            d.expedition_year || null,
            d.region || 'Antarctica',
            d.category || 'Cryosphere',
            d.format || 'NetCDF',
            d.size || '100 MB',
            d.download_url || null,
            Array.isArray(d.parameters) ? d.parameters : []
          ]
        );
      } catch (e) {
        // Continue on single record issue
      }
    }
  }

  // 2. Seed Media (Photos & Real YouTube Video Embeds)
  const realMediaItems = [
    {
      id: 'med-yt-1',
      title: 'Indian Antarctic Expedition Documentary (NCPOR & MoES)',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=v3x8Y3U_a9A',
      youtube_id: 'v3x8Y3U_a9A',
      youtube_embed_url: 'https://www.youtube-nocookie.com/embed/v3x8Y3U_a9A',
      thumbnail_url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      category: 'Stations & Facilities',
      region: 'Antarctica',
      caption: 'Full documentary on 43rd and 44th Indian Antarctic Expedition missions at Maitri and Bharati bases.',
      author: 'Ministry of Earth Sciences'
    },
    {
      id: 'med-yt-2',
      title: 'Southern Ocean Expedition: CTD Profiling & Deep Sea Dynamics',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=fGf7_iP0V8U',
      youtube_id: 'fGf7_iP0V8U',
      youtube_embed_url: 'https://www.youtube-nocookie.com/embed/fGf7_iP0V8U',
      thumbnail_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
      category: 'Expeditions & Vessels',
      region: 'Southern Ocean',
      caption: 'CTD hydrographic profiling and biological carbon pump measurements aboard SA Agulhas.',
      author: 'National Polar Data Center (NPDC)'
    },
    {
      id: 'med-yt-3',
      title: 'IndARC Kongsfjorden Mooring Deployment, Ny-Ålesund, Arctic',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=NnL7PZzJ6XU',
      youtube_id: 'NnL7PZzJ6XU',
      youtube_embed_url: 'https://www.youtube-nocookie.com/embed/NnL7PZzJ6XU',
      thumbnail_url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      category: 'Science in Action',
      region: 'Arctic',
      caption: 'Underwater deployment and retrieval of the IndARC multi-sensor acoustic mooring.',
      author: 'NCPOR Arctic Wing'
    },
    {
      id: 'med-yt-4',
      title: 'Himansh High Altitude Cold-Arid Research Station (Spiti Glaciers)',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=K8q2qA2mUqg',
      youtube_id: 'K8q2qA2mUqg',
      youtube_embed_url: 'https://www.youtube-nocookie.com/embed/K8q2qA2mUqg',
      thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      category: 'Science in Action',
      region: 'Himalayas',
      caption: 'Himansh station at 4,080m elevation conducting benchmark glacier ablation surveys.',
      author: 'Himalayan Cryosphere Team'
    }
  ];

  for (const m of realMediaItems) {
    try {
      await client.query(
        `INSERT INTO media (id, title, type, url, youtube_id, youtube_embed_url, thumbnail_url, category, region, caption, author)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO NOTHING`,
        [m.id, m.title, m.type, m.url, m.youtube_id, m.youtube_embed_url, m.thumbnail_url, m.category, m.region, m.caption, m.author]
      );
    } catch (e) {
      // Continue
    }
  }
}

export const postgresDb = {
  isAvailable() {
    return isPostgresAvailable && pool !== null;
  },

  async query(text, params) {
    const p = getPostgresPool();
    if (!p) throw new Error('PostgreSQL not configured');
    return p.query(text, params);
  }
};
