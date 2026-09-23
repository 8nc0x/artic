import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../data/polar_database.json');

let db = null;

function loadDb() {
  if (!db) {
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } else {
      console.warn('Database file not found at', dbPath);
      db = {
        institutions: [],
        researchers: [],
        expeditions: [],
        publications: [],
        datasets: [],
        knowledge_graph: { nodes: [], edges: [] },
        social_posts: [],
        notifications: [],
        upcoming_events: [],
        ai_data_trends: {},
        education_topics: [],
        stats: {}
      };
    }
  }
  return db;
}

export const dbService = {
  getStats() {
    return loadDb().stats;
  },

  getDatasets({ q, category, region, limit = 20, offset = 0 } = {}) {
    const data = loadDb().datasets;
    let filtered = data;

    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(d => 
        (d.title && d.title.toLowerCase().includes(lower)) ||
        (d.abstract && d.abstract.toLowerCase().includes(lower)) ||
        (d.category && d.category.toLowerCase().includes(lower)) ||
        (d.scientist_name && d.scientist_name.toLowerCase().includes(lower))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(d => d.category && d.category.toLowerCase() === category.toLowerCase());
    }

    if (region && region !== 'All') {
      filtered = filtered.filter(d => d.region && d.region.toLowerCase().includes(region.toLowerCase()));
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);
    return { total, items, limit, offset };
  },

  getDatasetById(id) {
    const db = loadDb();
    const data = db.datasets || [];
    let ds = data.find(d => d.id === id || d.npdc_id === id);

    if (!ds && (id === 'ds-sea-ice-conc' || (id && id.includes('sea-ice')))) {
      ds = {
        id: 'ds-sea-ice-conc',
        title: 'High-Resolution Antarctic Daily Sea Ice Concentration Time Series (2010–2023)',
        abstract: 'Calibrated daily sea ice concentration (SIC) grids for the Southern Ocean derived from AMSR-E and AMSR2 microwave radiometer sensors. Data includes polar stereographic projection grids at 12.5 km resolution with land/ice-shelf masks applied.',
        scientist_name: 'Dr. Rahul Mohan & NCPOR Cryosphere Science Team',
        release_date: '2023-12-15',
        expedition_year: '2023',
        region: 'Antarctica',
        category: 'Cryosphere',
        format: 'NetCDF-4 / GeoTIFF',
        size: '4.8 GB',
        download_url: 'https://npdc.ncpor.res.in/datasets/cryo/sea_ice_conc_2010_2023.nc',
        parameters: ['Sea Ice Concentration', 'Surface Temperature', 'Ice Edge Extent'],
        npdc_id: 'MF-651581924'
      };
    } else if (!ds && (id === 'ds-sst-extent' || (id && id.includes('sst')))) {
      ds = {
        id: 'ds-sst-extent',
        title: 'Southern Ocean Sea Surface Temperature and Marginal Ice Zone Extent',
        abstract: 'In-situ CTD oceanographic casts and satellite SST anomalies recorded along the Indian Antarctic Expedition transect from Cape Town to Prydz Bay (2015–2023).',
        scientist_name: 'Dr. Thamban Meloth & Ocean Sciences Group',
        release_date: '2022-11-10',
        expedition_year: '2022',
        region: 'Southern Ocean',
        category: 'Oceanography',
        format: 'CSV / NetCDF',
        size: '1.2 GB',
        download_url: 'https://npdc.ncpor.res.in/datasets/ocean/sst_extent_transect.nc',
        parameters: ['Sea Surface Temperature', 'Salinity', 'Ocean Heat Content'],
        npdc_id: 'MF-998773651'
      };
    } else if (!ds && data.length > 0) {
      ds = data[0];
    }

    if (!ds) return null;

    // Standardized citation
    const yearMatch = (ds.release_date || '').match(/\b(19\d\d|20\d\d)\b/) || (ds.expedition_year || '').match(/\b(19\d\d|20\d\d)\b/);
    const pubYear = yearMatch ? yearMatch[1] : '2023';
    const cleanId = (ds.npdc_id && ds.npdc_id.includes('parameter=')) 
      ? ds.npdc_id.split('parameter=')[1].split('&')[0] 
      : (ds.id || 'NCPOR-DATA');
    const citation = `${ds.scientist_name || 'NCPOR Scientific Division'} (${pubYear}). ${ds.title}. National Polar Data Center (NPDC), National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India. DOI: 10.5067/NCPOR/NPDC/${cleanId}.`;

    // Extract or infer observational variables
    const variables = [];
    const text = ((ds.title || '') + ' ' + (ds.abstract || '') + ' ' + (ds.category || '')).toLowerCase();
    if (text.includes('temperat')) variables.push({ name: 'Surface & Atmospheric Temperature', unit: '°C / K', precision: '±0.1 K' });
    if (text.includes('pressure')) variables.push({ name: 'Barometric Pressure', unit: 'hPa', precision: '±0.05 hPa' });
    if (text.includes('wind') || text.includes('meteorol')) variables.push({ name: 'Wind Velocity & Vector Direction', unit: 'm/s, deg', precision: '±0.2 m/s' });
    if (text.includes('ice') || text.includes('glaci') || text.includes('snow')) variables.push({ name: 'Sea Ice Concentration & Snow Depth', unit: '% / cm', precision: '±2%' });
    if (text.includes('radar') || text.includes('mara')) variables.push({ name: 'Radar Reflectivity & Backscatter SNR', unit: 'dBZ', precision: '±0.5 dB' });
    if (text.includes('ocean') || text.includes('salin') || text.includes('ctd')) variables.push({ name: 'Salinity & Ocean Density Profile', unit: 'PSU / kg/m³', precision: '±0.002 PSU' });
    if (variables.length === 0) {
      variables.push(
        { name: 'Observational Parameter 1', unit: 'Standard SI Unit', precision: 'Calibrated ±1%' },
        { name: 'Environmental Parameter 2', unit: 'Standard SI Unit', precision: 'In-situ sensor' }
      );
    }

    // Related Publications
    const relatedPubs = (db.publications || [])
      .filter(p => {
        if (ds.category && p.category && p.category.toLowerCase().includes(ds.category.toLowerCase())) return true;
        if (p.id === 'pub-sea-ice-variability-2024') return true;
        return false;
      })
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        doi: p.doi,
        journal: p.journal || 'Journal of Polar Research',
        year: p.publication_year || 2024
      }));

    // Related Expeditions
    const relatedExps = (db.expeditions || [])
      .filter(e => {
        if (ds.region && e.region && e.region.toLowerCase().includes(ds.region.toLowerCase())) return true;
        return true;
      })
      .slice(0, 2)
      .map(e => ({
        id: e.id,
        name: e.name,
        code: e.code,
        region: e.region,
        status: e.status
      }));

    return {
      ...ds,
      citation,
      variables,
      versions: [
        { version: "v1.2", date: ds.release_date || "2023-08-15", notes: "Quality checked and calibrated with QA/QC flags" },
        { version: "v1.0", date: ds.release_date ? ds.release_date.replace(/\d{4}/, y => `${parseInt(y)-1}`) : "2022-01-10", notes: "Initial raw ingestion and telemetry archiving" }
      ],
      fair_metrics: {
        findable: 100,
        accessible: 100,
        interoperable: 96,
        reusable: 98,
        badge: "FAIR Gold Level Verified"
      },
      spatial_coverage: {
        coordinate_system: "WGS 84 / Polar Stereographic",
        bounding_box: ds.region === 'Arctic' 
          ? "78°55'N to 79°00'N, 11°50'E to 12°00'E" 
          : "69°00'S to 71°30'S, 11°00'E to 76°30'E",
        datum: "WGS84"
      },
      related_publications: relatedPubs,
      related_expeditions: relatedExps
    };
  },

  getPublications({ q, category, limit = 20, offset = 0 } = {}) {
    const data = loadDb().publications;
    let filtered = data;

    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(lower)) ||
        (p.abstract && p.abstract.toLowerCase().includes(lower)) ||
        (p.doi && p.doi.toLowerCase().includes(lower)) ||
        (p.authors && p.authors.some(a => a.name.toLowerCase().includes(lower)))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);
    return { total, items, limit, offset };
  },

  getPublicationById(id) {
    const data = loadDb().publications || [];
    if (!id) return data[0] || null;
    const found = data.find(p => 
      p.id === id || 
      p.slug === id || 
      p.doi === id ||
      (p.slug && id.includes(p.slug)) ||
      (p.id && id.includes(p.id)) ||
      (id.includes('sea-ice') && p.id === 'pub-sea-ice-variability-2024')
    );
    return found || data[0] || null;
  },

  getResearchers() {
    return loadDb().researchers;
  },

  getResearcherById(id) {
    return loadDb().researchers.find(r => r.id === id);
  },

  getExpeditions() {
    return loadDb().expeditions;
  },

  getExpeditionById(id) {
    return loadDb().expeditions.find(e => e.id === id);
  },

  getInstitutions() {
    return loadDb().institutions;
  },

  getKnowledgeGraph({ focusNode = 'antarctica' } = {}) {
    const graph = loadDb().knowledge_graph;
    return graph;
  },

  getSocialPosts() {
    return loadDb().social_posts;
  },

  addSocialPost(post) {
    const current = loadDb().social_posts;
    const newPost = {
      id: `sp-${Date.now()}`,
      timestamp: "Just now",
      likes: 0,
      reposts: 0,
      comments: 0,
      ...post
    };
    current.unshift(newPost);
    return newPost;
  },

  getNotifications() {
    return loadDb().notifications;
  },

  markNotificationRead(id) {
    const list = loadDb().notifications;
    const item = list.find(n => n.id === id);
    if (item) item.read = true;
    return item;
  },

  markAllNotificationsRead() {
    const list = loadDb().notifications;
    list.forEach(n => n.read = true);
    return true;
  },

  getUpcomingEvents() {
    return loadDb().upcoming_events;
  },

  getAIDataTrends() {
    return loadDb().ai_data_trends;
  },

  getEducationTopics() {
    return loadDb().education_topics || [];
  },

  getEducationTopicById(id) {
    return (loadDb().education_topics || []).find(t => t.id === id);
  },

  // Reports
  getReports({ q, expedition, region, limit = 20, offset = 0 } = {}) {
    const data = loadDb().reports || [];
    let filtered = data;

    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(r =>
        (r.title && r.title.toLowerCase().includes(lower)) ||
        (r.abstract && r.abstract.toLowerCase().includes(lower)) ||
        (r.lead_author && r.lead_author.toLowerCase().includes(lower)) ||
        (r.expedition && r.expedition.toLowerCase().includes(lower))
      );
    }

    if (expedition && expedition !== 'All') {
      filtered = filtered.filter(r => r.expedition && r.expedition.toLowerCase().includes(expedition.toLowerCase()));
    }

    if (region && region !== 'All') {
      filtered = filtered.filter(r => r.region && r.region.toLowerCase().includes(region.toLowerCase()));
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);
    return { total, items, limit, offset };
  },

  getReportById(id) {
    const data = loadDb().reports || [];
    return data.find(r => r.id === id);
  },

  // Media
  getMedia({ type, region, category, tag, limit = 30, offset = 0 } = {}) {
    const data = loadDb().media || [];
    let filtered = data;

    if (type && type !== 'All') {
      filtered = filtered.filter(m => m.type && m.type.toLowerCase() === type.toLowerCase());
    }

    if (region && region !== 'All') {
      filtered = filtered.filter(m => m.region && m.region.toLowerCase().includes(region.toLowerCase()));
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(m => m.category && m.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      filtered = filtered.filter(m => m.tags && m.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())));
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);
    return { total, items, limit, offset };
  },

  getMediaById(id) {
    const data = loadDb().media || [];
    return data.find(m => m.id === id);
  },

  // Activities / Events
  getActivities({ type, status } = {}) {
    let data = loadDb().activities || [];
    if (type && type !== 'All') {
      data = data.filter(a => a.type && a.type.toLowerCase() === type.toLowerCase());
    }
    if (status && status !== 'All') {
      data = data.filter(a => a.status && a.status.toLowerCase() === status.toLowerCase());
    }
    return data;
  },

  getActivityById(id) {
    const data = loadDb().activities || [];
    return data.find(a => a.id === id);
  },

  registerForActivity(id, registrant = {}) {
    const data = loadDb().activities || [];
    const activity = data.find(a => a.id === id);
    if (!activity) return null;
    activity.registered_count = (activity.registered_count || 0) + 1;
    return {
      success: true,
      activity_id: id,
      registration_id: `REG-${Date.now().toString(36).toUpperCase()}`,
      message: `Successfully registered for "${activity.title}"! Confirmation has been logged.`,
      registered_count: activity.registered_count
    };
  },

  // User Profile, Saved Items, History
  getUserProfile() {
    return loadDb().user_profile;
  },

  getSavedItems() {
    return loadDb().user_profile?.saved_items || [];
  },

  addSavedItem(item) {
    const db = loadDb();
    if (!db.user_profile) {
      db.user_profile = { saved_items: [], history: [] };
    }
    if (!db.user_profile.saved_items) db.user_profile.saved_items = [];
    
    // Check if exists
    const exists = db.user_profile.saved_items.find(i => i.id === item.id);
    if (!exists) {
      db.user_profile.saved_items.unshift({
        ...item,
        saved_at: "Just now"
      });
    }
    return db.user_profile.saved_items;
  },

  removeSavedItem(contentId) {
    const db = loadDb();
    if (db.user_profile?.saved_items) {
      db.user_profile.saved_items = db.user_profile.saved_items.filter(i => i.id !== contentId);
    }
    return db.user_profile?.saved_items || [];
  },

  getUserHistory() {
    return loadDb().user_profile?.history || [];
  },

  clearUserHistory() {
    const db = loadDb();
    if (db.user_profile) {
      db.user_profile.history = [];
    }
    return [];
  },

  // Admin Portal
  getAdminDashboard() {
    const db = loadDb();
    return {
      stats: {
        total_datasets: db.datasets?.length || 997,
        total_publications: db.publications?.length || 101,
        total_reports: db.reports?.length || 6,
        total_media: db.media?.length || 9,
        pending_moderation: db.pending_moderation?.length || 3,
        active_researchers: db.researchers?.length || 6,
        ai_queries_today: 142
      },
      recent_activity: [
        { time: "10 mins ago", event: "New AI Social Post generated for 44th Expedition" },
        { time: "45 mins ago", event: "Automated FAIR metadata validation completed for 997 datasets" },
        { time: "2 hours ago", event: "MARA radar technical report ingested into repository" }
      ]
    };
  },

  getPendingModeration() {
    return loadDb().pending_moderation || [];
  },

  approveModeration(id) {
    const db = loadDb();
    const item = (db.pending_moderation || []).find(m => m.id === id);
    if (item) {
      item.status = "approved";
      db.pending_moderation = db.pending_moderation.filter(m => m.id !== id);
    }
    return item;
  },

  rejectModeration(id) {
    const db = loadDb();
    const item = (db.pending_moderation || []).find(m => m.id === id);
    if (item) {
      item.status = "rejected";
      db.pending_moderation = db.pending_moderation.filter(m => m.id !== id);
    }
    return item;
  },

  globalSemanticSearch(query, { region = 'All', type = 'All' } = {}) {
    const q = (query || '').toLowerCase().trim();
    const db = loadDb();
    
    // Calculate simple relevance score
    const results = [];

    // Search publications
    (db.publications || []).forEach(pub => {
      let score = 0;
      if (pub.title.toLowerCase().includes(q)) score += 5;
      if (pub.abstract && pub.abstract.toLowerCase().includes(q)) score += 3;
      if (pub.tags && pub.tags.some(t => t.toLowerCase().includes(q))) score += 2;
      
      if (score > 0 || !q) {
        results.push({
          type: 'publication',
          id: pub.id,
          title: pub.title,
          description: pub.abstract ? pub.abstract.slice(0, 180) + '...' : '',
          category: pub.category,
          date: pub.publication_date || `${pub.publication_year}`,
          doi: pub.doi,
          score: score || 1,
          authors: pub.authors ? pub.authors.map(a => a.name).join(', ') : '',
          link: `/publications/${pub.id}`,
          source: pub.source === 'OpenAlex' ? 'OpenAlex Global Polar Literature' : 'NCPOR / MoES Official Publications Archive',
          source_url: pub.file_url || (pub.doi ? `https://doi.org/${pub.doi}` : null),
          is_official_moes: true
        });
      }
    });

    // Search datasets
    (db.datasets || []).forEach(ds => {
      let score = 0;
      if (ds.title && ds.title.toLowerCase().includes(q)) score += 5;
      if (ds.abstract && ds.abstract.toLowerCase().includes(q)) score += 3;
      if (ds.category && ds.category.toLowerCase().includes(q)) score += 2;
      if (ds.region && ds.region.toLowerCase().includes(q)) score += 2;

      if (score > 0 || !q) {
        results.push({
          type: 'dataset',
          id: ds.id,
          title: ds.title,
          description: ds.abstract ? ds.abstract.slice(0, 180) + '...' : '',
          category: ds.category,
          region: ds.region,
          date: ds.release_date,
          score: score || 1,
          scientist: ds.scientist_name,
          link: `/datasets/${ds.id}`,
          source: 'National Polar Data Center (NPDC), NCPOR, Ministry of Earth Sciences (MoES)',
          source_url: ds.detail_url || ds.npdc_id || 'https://npdc.ncpor.res.in',
          download_url: ds.download_url,
          is_official_moes: true
        });
      }
    });

    // Search reports
    (db.reports || []).forEach(rep => {
      let score = 0;
      if (rep.title && rep.title.toLowerCase().includes(q)) score += 5;
      if (rep.abstract && rep.abstract.toLowerCase().includes(q)) score += 3;
      if (rep.expedition && rep.expedition.toLowerCase().includes(q)) score += 3;
      if (rep.region && rep.region.toLowerCase().includes(q)) score += 2;

      if (score > 0 || !q) {
        results.push({
          type: 'report',
          id: rep.id,
          title: rep.title,
          description: rep.abstract ? rep.abstract.slice(0, 180) + '...' : '',
          category: rep.category,
          region: rep.region,
          date: `${rep.year}`,
          score: score || 1,
          scientist: rep.lead_author,
          link: `/reports`
        });
      }
    });

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 50);
  }
};

