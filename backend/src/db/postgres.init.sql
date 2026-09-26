-- =============================================================================
-- NCPOR PolarConnect PostgreSQL Database Schema
-- Production-Ready Schema for Polar Science Knowledge Repository & Outreach
-- =============================================================================

-- 1. Institutions & Organizations
CREATE TABLE IF NOT EXISTS institutions (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  short_name VARCHAR(64),
  country VARCHAR(64) DEFAULT 'India',
  city VARCHAR(128),
  website VARCHAR(255),
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Polar Researchers & Principal Investigators
CREATE TABLE IF NOT EXISTS researchers (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(128),
  institution_id VARCHAR(64) REFERENCES institutions(id) ON DELETE SET NULL,
  email VARCHAR(128),
  avatar_url TEXT,
  disciplines TEXT[], -- Array of disciplines e.g. ['Glaciology', 'Paleoclimate']
  bio TEXT,
  citations_count INTEGER DEFAULT 0,
  publications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Polar Expeditions (Antarctic, Arctic, Southern Ocean, Himalayas)
CREATE TABLE IF NOT EXISTS expeditions (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  expedition_type VARCHAR(64) NOT NULL, -- 'Antarctic', 'Arctic', 'Southern Ocean', 'Himalayan'
  station_code VARCHAR(32), -- 'Maitri', 'Bharati', 'Himadri', 'Himansh'
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  leader_name VARCHAR(255),
  vessel_name VARCHAR(128),
  summary TEXT,
  coordinates JSONB, -- GeoJSON or { latitude, longitude }
  status VARCHAR(32) DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Peer-Reviewed Publications & Monographs
CREATE TABLE IF NOT EXISTS publications (
  id VARCHAR(64) PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  journal VARCHAR(255),
  year INTEGER NOT NULL,
  doi VARCHAR(128),
  abstract TEXT,
  category VARCHAR(64),
  pdf_url TEXT,
  citations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Scientific Datasets & Calibrated Time-Series
CREATE TABLE IF NOT EXISTS datasets (
  id VARCHAR(64) PRIMARY KEY,
  npdc_id VARCHAR(64),
  title TEXT NOT NULL,
  abstract TEXT,
  scientist_name VARCHAR(255),
  release_date DATE,
  expedition_year VARCHAR(32),
  region VARCHAR(64), -- 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'
  category VARCHAR(64), -- 'Cryosphere', 'Oceanography', 'Atmosphere', 'Biology', 'Geology'
  format VARCHAR(64), -- 'NetCDF', 'GeoTIFF', 'CSV', 'HDF5'
  size VARCHAR(32),
  download_url TEXT,
  parameters TEXT[],
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Expedition Media & Embedded YouTube Video Resources
CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(16) NOT NULL, -- 'photo' or 'video'
  url TEXT NOT NULL,
  youtube_id VARCHAR(32), -- e.g. 'v3x8Y3U_a9A'
  youtube_embed_url TEXT,
  thumbnail_url TEXT,
  category VARCHAR(64),
  region VARCHAR(64),
  caption TEXT,
  author VARCHAR(128),
  date DATE,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Social Media Outreach Posts
CREATE TABLE IF NOT EXISTS social_posts (
  id VARCHAR(64) PRIMARY KEY,
  platform VARCHAR(32) NOT NULL, -- 'twitter', 'instagram', 'linkedin', 'facebook'
  external_url TEXT,
  author_name VARCHAR(128),
  author_handle VARCHAR(64),
  content TEXT NOT NULL,
  media_urls TEXT[],
  summary TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Institutional Activities & Events
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event_type VARCHAR(64) NOT NULL, -- 'Conference', 'Seminar', 'Workshop', 'Awareness'
  city VARCHAR(128),
  location TEXT,
  organizer VARCHAR(128),
  start_date DATE,
  end_date DATE,
  fee VARCHAR(64),
  url TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for ultra-fast query performance
CREATE INDEX IF NOT EXISTS idx_datasets_category ON datasets(category);
CREATE INDEX IF NOT EXISTS idx_datasets_region ON datasets(region);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_region ON media(region);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
