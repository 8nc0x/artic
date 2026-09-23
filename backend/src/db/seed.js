import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readSmartJson(filePath) {
  const buf = fs.readFileSync(filePath);
  // Check UTF-16 LE BOM
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    let str = buf.toString('utf16le');
    if (str.charCodeAt(0) === 0xfeff) str = str.slice(1);
    return JSON.parse(str);
  }
  // Try UTF-8 with BOM check
  let str = buf.toString('utf8');
  if (str.charCodeAt(0) === 0xfeff) str = str.slice(1);
  return JSON.parse(str);
}

export function generateSeedData() {
  console.log('Ingesting raw datasets...');
  const rootDataDir = path.resolve(__dirname, '../../../PolarConnect-data/PolarConnect-data');
  
  const ncporRaw = readSmartJson(path.join(rootDataDir, 'ncpor_datasets.json'));
  const openalexRaw = readSmartJson(path.join(rootDataDir, 'openalex_documents.json'));
  const nasaRaw = readSmartJson(path.join(rootDataDir, 'nasa_documents.json'));

  console.log(`Loaded: ${ncporRaw.length} NCPOR datasets, ${openalexRaw.length} OpenAlex documents, ${nasaRaw.length} NASA documents`);

  // 1. Institutions
  const institutions = [
    {
      id: "inst-ncpor",
      name: "National Centre for Polar and Ocean Research (NCPOR)",
      short_name: "NCPOR",
      parent_body: "Ministry of Earth Sciences (MoES), Govt. of India",
      location: "Headland Sada, Vasco-da-Gama, Goa, India",
      website: "https://ncpor.res.in",
      research_areas: ["Cryosphere", "Oceanography", "Polar Atmosphere", "Geosciences"],
      stations: ["Maitri (Antarctica)", "Bharati (Antarctica)", "Himadri (Arctic)", "IndARC (Kongsfjorden)"],
      description: "India's premier R&D institution responsible for coordinating and implementing the Indian Antarctic, Arctic, Southern Ocean and Himalayan glaciology programs."
    },
    {
      id: "inst-moes",
      name: "Ministry of Earth Sciences (MoES)",
      short_name: "MoES",
      parent_body: "Government of India",
      location: "Prithvi Bhavan, Lodhi Road, New Delhi, India",
      website: "https://moes.gov.in",
      research_areas: ["Earth System Science", "Atmospheric Sciences", "Ocean Technology", "Seismology"]
    },
    {
      id: "inst-iisc",
      name: "Indian Institute of Science (IISc)",
      short_name: "IISc",
      location: "Bengaluru, Karnataka, India",
      website: "https://iisc.ac.in",
      research_areas: ["Atmospheric & Oceanic Sciences", "Glaciology", "Climate Change"]
    },
    {
      id: "inst-iitr",
      name: "Indian Institute of Technology Roorkee",
      short_name: "IIT Roorkee",
      location: "Roorkee, Uttarakhand, India",
      website: "https://iitr.ac.in",
      research_areas: ["Geodesy", "Glacier Remote Sensing", "Polar Engineering"]
    },
    {
      id: "inst-sac",
      name: "Space Applications Centre (ISRO)",
      short_name: "SAC-ISRO",
      location: "Ahmedabad, Gujarat, India",
      website: "https://sac.gov.in",
      research_areas: ["Satellite Oceanography", "Sea Ice Monitoring", "SAR Remote Sensing"]
    }
  ];

  // 2. Key Researchers
  const researchers = [
    {
      id: "res-anil-kumar",
      name: "Dr. Anil Kumar",
      title: "Senior Scientist & Group Director",
      department: "Marine Geosciences & Southern Ocean Studies",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      email: "anilkumar@ncpor.res.in",
      expeditions_count: 8,
      publications_count: 64,
      citations_count: 1820,
      domains: ["Marine Geosciences", "Cryosphere", "Paleoclimate", "Sea Ice Variability"],
      bio: "Leading scientist investigating sea-ice dynamics in the Southern Ocean and paleoclimatic records from Antarctic ice and marine sediment cores."
    },
    {
      id: "res-thamban",
      name: "Dr. R. Thamban",
      title: "Director & Distinguished Scientist",
      department: "Cryosphere and Climate Studies",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      email: "thamban@ncpor.res.in",
      expeditions_count: 12,
      publications_count: 128,
      citations_count: 4350,
      domains: ["Glaciology", "Ice Core Science", "Antarctic Climate", "Himalayan Glaciers"],
      bio: "Pioneered high-resolution ice core research at central Dronning Maud Land, Antarctica and Himalayan benchmark glaciers."
    },
    {
      id: "res-sourav-chatterjee",
      name: "Dr. Sourav Chatterjee",
      title: "Scientist E",
      department: "Atmospheric Sciences",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      email: "sourav@ncpor.res.in",
      expeditions_count: 5,
      publications_count: 42,
      citations_count: 980,
      domains: ["Atmospheric Sciences", "Polar Meteorology", "Boundary Layer Physics"],
      bio: "Specializes in atmospheric boundary layer dynamics, radar meteorology, and polar air-sea-ice flux interactions."
    },
    {
      id: "res-puneet-mohan",
      name: "Dr. Puneet Mohan",
      title: "Scientist D",
      department: "Climate Studies & Ocean Modeling",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
      email: "puneet@ncpor.res.in",
      expeditions_count: 4,
      publications_count: 31,
      citations_count: 670,
      domains: ["Climate Studies", "Numerical Ocean Modeling", "Southern Ocean Circulation"],
      bio: "Focuses on coupled climate-ocean modeling, Southern Ocean warming trends, and Antarctic ice-shelf basal melt interactions."
    },
    {
      id: "res-viraj-jadhav",
      name: "Dr. Viraj Jadhav",
      title: "Research Fellow",
      department: "Polar Remote Sensing",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250",
      email: "viraj.j@ncpor.res.in",
      expeditions_count: 3,
      publications_count: 18,
      citations_count: 320,
      domains: ["Satellite Remote Sensing", "Cryosphere", "Antarctic Sea Ice"],
      bio: "Lead analyst on satellite microwave observations and deep learning algorithms for Antarctic sea ice classification."
    },
    {
      id: "res-priya-sharma",
      name: "Dr. Priya Sharma",
      title: "Senior Research Scientist",
      department: "Biological Oceanography & Polar Ecology",
      institution_id: "inst-ncpor",
      institution_name: "NCPOR, Goa",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
      email: "priya.sharma@ncpor.res.in",
      expeditions_count: 4,
      publications_count: 27,
      citations_count: 540,
      domains: ["Marine Biology", "Benthic Ecology", "Polar Genomics", "Southern Ocean"],
      bio: "Explores biodiversity and metabolic adaptations of cold-water marine organisms in the Ross and Weddell Seas."
    }
  ];

  // 3. Indian Polar Expeditions
  const expeditions = [
    {
      id: "exp-44-iae",
      name: "44th Indian Antarctic Expedition",
      code: "44th IAE",
      region: "Antarctica",
      type: "Scientific & Logistics",
      start_date: "2024-11-15",
      end_date: "2025-04-10",
      status: "Completed",
      leader: "Dr. R. Thamban",
      vessel: "MV Vasiliy Golovnin",
      stations: ["Maitri", "Bharati"],
      objectives: [
        "Long-term climate observations at Maitri & Bharati",
        "Ice shelf drilling at Central Dronning Maud Land",
        "Deployment of continuous GNSS stations",
        "Maintenance of Maitri II preparatory infrastructure"
      ],
      description: "Successfully carried out extensive geophysical surveys, air-sea interaction measurements, and core replacement tasks at both Indian Antarctic stations."
    },
    {
      id: "exp-43-iae",
      name: "43rd Indian Antarctic Expedition",
      code: "43rd IAE",
      region: "Antarctica",
      type: "Scientific & Logistics",
      start_date: "2023-11-20",
      end_date: "2024-03-25",
      status: "Completed",
      stations: ["Maitri", "Bharati"],
      objectives: ["Moveable Atmospheric Radar observations", "Palaeoclimate ice core drilling", "Permafrost temperature monitoring"]
    },
    {
      id: "exp-arctic-2024",
      name: "Indian Arctic Expedition 2024",
      code: "Arctic-2024",
      region: "Arctic",
      type: "Scientific",
      start_date: "2024-05-01",
      end_date: "2024-10-15",
      status: "Completed",
      stations: ["Himadri (Ny-Ålesund, Svalbard)", "IndARC (Kongsfjorden)"],
      objectives: [
        "Kongsfjorden fjord dynamics and Atlantic water intrusion",
        "Atmospheric aerosol profiling with micro-lidar",
        "Microbial diversity in glacial meltwater streams"
      ]
    },
    {
      id: "exp-so-13",
      name: "13th Indian Southern Ocean Expedition",
      code: "ISOE-13",
      region: "Southern Ocean",
      type: "Oceanographic",
      start_date: "2024-01-10",
      end_date: "2024-03-05",
      status: "Completed",
      vessel: "ORV Sagar Nidhi",
      objectives: [
        "Biogeochemical cycling across Sub-Antarctic and Polar Fronts",
        "Deep CTD casts to 4000m depth",
        "Surface underway pCO2 measurements"
      ]
    }
  ];

  // 4. Research Publications (including the flagship paper from Screenshot 1)
  const flagshipPaper = {
    id: "pub-sea-ice-variability-2024",
    title: "Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023: Observations, Trends and Future Projections",
    slug: "sea-ice-variability-antarctica",
    document_type: "Research Paper",
    journal: "Journal of Polar Research",
    publication_year: 2024,
    publication_date: "2024-03-15",
    doi: "10.3402/polar.2024.12345",
    authors: [
      { name: "Dr. Anil Kumar", affiliation: "NCPOR, Goa", role: "Lead Author" },
      { name: "Dr. P. N. Mohan", affiliation: "NCPOR, Goa", role: "Co-Author" },
      { name: "Dr. R. Thamban", affiliation: "NCPOR, Goa", role: "Senior Author" },
      { name: "Dr. Viraj Jadhav", affiliation: "NCPOR, Goa", role: "Co-Author" },
      { name: "Prof. S. R. Ramesh", affiliation: "Indian Institute of Science (IISc)", role: "Co-Author" },
      { name: "Dr. Elena Rostova", affiliation: "Alfred Wegener Institute", role: "Collaborator" }
    ],
    affiliations: [
      "National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Goa",
      "Indian Institute of Science (IISc), Bengaluru"
    ],
    category: "Cryosphere",
    tags: ["Research Paper", "Cryosphere", "Sea Ice", "Antarctica", "Remote Sensing"],
    metrics: {
      views: "2.4K",
      views_count: 2420,
      citations: 320,
      downloads: 156,
      rating: 4.5
    },
    abstract: "We analyse sea ice variability in the Southern Ocean sector of Antarctica using multi-sensor satellite observations from 2010 to 2023. Our results show a declining trend in sea ice extent, with significant seasonal and regional variations. The study combines passive microwave data, climate model simulations and in-situ observations to understand the drivers of recent changes. We find that ocean-atmosphere interactions, changes in wind patterns and increasing ocean heat content contribute to the observed decline. Our projections indicate continued reduction in sea ice extent under high emission scenarios, highlighting the need for sustained monitoring and integrated climate models.",
    key_highlights: [
      {
        id: "kh-1",
        title: "Sea ice extent declined by -12.4% between 2010–2023",
        icon: "TrendingDown",
        category: "Trend"
      },
      {
        id: "kh-2",
        title: "Significant seasonal and regional variations observed",
        icon: "Snowflake",
        category: "Observation"
      },
      {
        id: "kh-3",
        title: "Ocean-atmosphere interactions are a key driver",
        icon: "Waves",
        category: "Mechanism"
      },
      {
        id: "kh-4",
        title: "Multi-sensor satellite data and in-situ observations used",
        icon: "Satellite",
        category: "Methodology"
      },
      {
        id: "kh-5",
        title: "Future projections show continued decline under high emission scenarios",
        icon: "Globe",
        category: "Projection"
      },
      {
        id: "kh-6",
        title: "Highlights importance of sustained monitoring for climate models",
        icon: "ShieldAlert",
        category: "Recommendation"
      }
    ],
    figures: [
      {
        id: "fig-1",
        title: "Fig. 1: Sea ice extent (2010–2023)",
        caption: "Spatial distribution and decadal anomaly of Antarctic sea-ice concentration derived from AMSR2 microwave radiometer data.",
        image_url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "fig-2",
        title: "Fig. 2: Seasonal variation trend",
        caption: "Comparison of Observed satellite extent against Model A (CMIP6) and Model B ensemble projections from 2012 to 2022.",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "fig-3",
        title: "Fig. 3: Regional distribution",
        caption: "Circumpolar breakdown across Weddell Sea, Ross Sea, Bellingshausen/Amundsen Seas, and Indian Ocean sectors.",
        image_url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "fig-4",
        title: "Fig. 4: Sea ice conditions (2022)",
        caption: "Field aerial photograph captured during the 42nd Indian Antarctic Expedition showing pancake ice transition zones in Prydz Bay.",
        image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800"
      }
    ],
    related_datasets: [
      {
        id: "ds-sea-ice-conc",
        title: "Antarctic Sea Ice Concentration (2010-2023)",
        category: "Cryosphere",
        region: "Antarctica",
        date: "15 Dec 2023",
        format: "NetCDF / GeoTIFF",
        size: "4.8 GB"
      },
      {
        id: "ds-sst-extent",
        title: "Southern Ocean SST and Sea Ice Extent",
        category: "Oceanography",
        region: "Climate",
        date: "10 Nov 2022",
        format: "CSV / HDF5",
        size: "1.2 GB"
      }
    ],
    pdf_viewer: {
      pages_count: 14,
      current_page: 1,
      file_name: "polar-2024-12345.pdf",
      pdf_url: "https://npdc.ncpor.res.in/publications/2024/polar-2024-12345.pdf"
    }
  };

  // Convert OpenAlex documents into publication records
  const openalexPublications = openalexRaw.map((doc, idx) => ({
    id: `pub-oa-${doc.id || idx + 2}`,
    title: doc.title,
    document_type: doc.document_type || "Research Paper",
    journal: doc.source === "OpenAlex" ? "International Polar Science Literature" : doc.source,
    publication_date: doc.publication_date || "2020-01-01",
    publication_year: doc.publication_date ? parseInt(doc.publication_date.slice(0, 4), 10) : 2020,
    doi: doc.doi ? doc.doi.replace('https://doi.org/', '') : `10.1000/polar.${idx + 100}`,
    source: doc.source,
    source_id: doc.source_id,
    file_url: doc.file_url,
    category: doc.title.toLowerCase().includes('ice') ? 'Cryosphere' :
              doc.title.toLowerCase().includes('ocean') ? 'Oceanography' :
              doc.title.toLowerCase().includes('climate') ? 'Climate Science' : 'Geosciences',
    tags: ["Antarctica", "Research Paper", "Peer Reviewed"],
    metrics: {
      views: `${Math.floor(1000 + Math.random() * 4000)}`,
      views_count: Math.floor(1000 + Math.random() * 4000),
      citations: Math.floor(15 + Math.random() * 450),
      downloads: Math.floor(50 + Math.random() * 300),
      rating: (4.0 + Math.random() * 0.9).toFixed(1)
    },
    abstract: doc.description || `This peer-reviewed investigation provides empirical findings on Antarctic and Southern Ocean environmental systems, paleoclimate proxies, or geological developments. Published under ${doc.source || 'Open Access'}.`,
    authors: [
      { name: "Polar Research Consortium", affiliation: "International Polar Scientific Community" }
    ],
    affiliations: ["National Centre for Polar and Ocean Research & Partner Institutions"]
  }));

  const allPublications = [flagshipPaper, ...openalexPublications];

  // 5. Convert NCPOR Datasets into Clean Catalog
  const allDatasets = ncporRaw.map((item, idx) => {
    const isAntarctic = (item.location_region || '').toLowerCase().includes('antarct') || 
                        (item.title || '').toLowerCase().includes('antarct') ||
                        (item.source_id || '').toLowerCase().includes('antarct');
    const region = isAntarctic ? 'Antarctica' : (item.location_region || 'Polar / Global Ocean');

    return {
      id: `ds-ncpor-${item.id || idx + 1}`,
      npdc_id: item.source_id,
      title: item.title,
      abstract: item.abstract || item.purpose || "Dataset collected under the Indian Polar Research Programme by NCPOR.",
      purpose: item.purpose,
      release_date: item.release_date || "2021-01-01",
      expedition_year: item.expedition_year || "2020-2021",
      expedition_type: item.expedition_type || (isAntarctic ? "Antarctic" : "Arctic"),
      project_name: item.project_name || "Indian Scientific Expedition Programme",
      category: item.science_category || item.science_topic || "Atmosphere & Climate",
      topic: item.science_topic || item.iso_topic || "Meteorology",
      scientist_name: item.scientist_name || "NCPOR Scientific Team",
      scientist_org: item.scientist_organization || "National Centre for Polar and Ocean Research (NCPOR)",
      data_center: item.data_center_short_name || "NPDC",
      instrument: item.instrument_short_name || "In-situ Sensor Array",
      platform: item.platform_short_name || "Research Station",
      region: region,
      location_region: item.location_region || region,
      detail_url: item.detail_url,
      download_url: item.download_url,
      pdf_url: item.pdf_url,
      downloads_count: Math.floor(40 + Math.random() * 250),
      views_count: Math.floor(200 + Math.random() * 1200)
    };
  });

  // 6. NASA Datasets
  const nasaDatasets = nasaRaw.map((item, idx) => ({
    id: `ds-nasa-${item.id || idx + 1000}`,
    title: item.title,
    abstract: item.description || "Satellite and earth observation dataset from NASA Earthdata / NSIDC.",
    category: "Satellite Remote Sensing",
    topic: "Cryosphere & Glaciology",
    scientist_name: "NASA Earthdata Science Team",
    scientist_org: "NASA NSIDC DAAC",
    data_center: "NSIDC",
    region: "Antarctica",
    location_region: "Antarctica South of 60S",
    release_date: item.publication_date ? item.publication_date.slice(0, 10) : "2020-01-01",
    download_url: item.file_url,
    downloads_count: Math.floor(100 + Math.random() * 600),
    views_count: Math.floor(500 + Math.random() * 2000)
  }));

  const fullDatasetCatalog = [...allDatasets, ...nasaDatasets];

  // 7. Knowledge Graph Nodes and Edges
  const knowledgeGraph = {
    nodes: [
      { id: "antarctica", label: "Antarctica", type: "region", category: "Core", size: 45, color: "#0284c7" },
      { id: "arctic", label: "Arctic", type: "region", category: "Core", size: 38, color: "#06b6d4" },
      { id: "climate-change", label: "Climate Change", type: "topic", category: "Domain", size: 30, color: "#38bdf8" },
      { id: "sea-ice", label: "Sea Ice", type: "topic", category: "Domain", size: 28, color: "#0ea5e9" },
      { id: "atmospheric-studies", label: "Atmospheric Studies", type: "topic", category: "Domain", size: 28, color: "#6366f1" },
      { id: "maitri-station", label: "Maitri Station", type: "station", category: "Facility", size: 32, color: "#f97316" },
      { id: "bharati-station", label: "Bharati Station", type: "station", category: "Facility", size: 32, color: "#f97316" },
      { id: "himadri-station", label: "Himadri Station", type: "station", category: "Facility", size: 28, color: "#f97316" },
      { id: "dr-anil-kumar", label: "Dr. Anil Kumar", type: "researcher", category: "Person", size: 26, color: "#10b981" },
      { id: "dr-thamban", label: "Dr. R. Thamban", type: "researcher", category: "Person", size: 28, color: "#10b981" },
      { id: "dr-sourav", label: "Dr. Sourav Chatterjee", type: "researcher", category: "Person", size: 24, color: "#10b981" },
      { id: "dr-puneet", label: "Dr. Puneet Mohan", type: "researcher", category: "Person", size: 24, color: "#10b981" },
      { id: "inst-ncpor", label: "NCPOR", type: "institution", category: "Organization", size: 35, color: "#8b5cf6" },
      { id: "inst-moes", label: "MoES", type: "institution", category: "Organization", size: 32, color: "#8b5cf6" },
      { id: "inst-iisc", label: "IISc Bengaluru", type: "institution", category: "Organization", size: 26, color: "#8b5cf6" },
      { id: "exp-43-iae", label: "43rd IAE", type: "expedition", category: "Mission", size: 25, color: "#ec4899" },
      { id: "exp-44-iae", label: "44th IAE", type: "expedition", category: "Mission", size: 26, color: "#ec4899" },
      { id: "pub-sea-ice-variability-2024", label: "Sea Ice Variability Paper", type: "publication", category: "Output", size: 26, color: "#a855f7" },
      { id: "ds-sea-ice-conc", label: "Sea Ice Concentration Dataset", type: "dataset", category: "Data", size: 24, color: "#14b8a6" }
    ],
    edges: [
      { source: "antarctica", target: "climate-change", label: "impacts" },
      { source: "antarctica", target: "sea-ice", label: "features" },
      { source: "antarctica", target: "maitri-station", label: "hosts" },
      { source: "antarctica", target: "bharati-station", label: "hosts" },
      { source: "arctic", target: "himadri-station", label: "hosts" },
      { source: "antarctica", target: "exp-43-iae", label: "expedition_to" },
      { source: "antarctica", target: "exp-44-iae", label: "expedition_to" },
      { source: "dr-anil-kumar", target: "pub-sea-ice-variability-2024", label: "authored" },
      { source: "dr-thamban", target: "pub-sea-ice-variability-2024", label: "co-authored" },
      { source: "dr-anil-kumar", target: "inst-ncpor", label: "affiliated_with" },
      { source: "dr-thamban", target: "inst-ncpor", label: "director_at" },
      { source: "dr-sourav", target: "atmospheric-studies", label: "researches" },
      { source: "dr-puneet", target: "climate-change", label: "models" },
      { source: "inst-ncpor", target: "inst-moes", label: "under_jurisdiction" },
      { source: "pub-sea-ice-variability-2024", target: "ds-sea-ice-conc", label: "uses_dataset" },
      { source: "pub-sea-ice-variability-2024", target: "sea-ice", label: "focuses_on" },
      { source: "maitri-station", target: "atmospheric-studies", label: "observatory_for" },
      { source: "inst-ncpor", target: "maitri-station", label: "operates" },
      { source: "inst-ncpor", target: "bharati-station", label: "operates" },
      { source: "inst-ncpor", target: "himadri-station", label: "operates" },
      { source: "inst-iisc", target: "pub-sea-ice-variability-2024", label: "collaborated_on" }
    ]
  };

  // 8. Social Media Posts
  const socialPosts = [
    {
      id: "sp-1",
      author_handle: "ncpor_moes",
      author_name: "NCPOR",
      author_avatar: "https://npdc.ncpor.res.in/static/images/ncpor_logo.png",
      content: "A stunning view of the snow-covered landscape from our recent Antarctic expedition. Our scientists continue to unravel secrets of global climate change in extreme cold environments! ❄️🇦🇶\n\n#Antarctica #PolarResearch #NCPOR #MoES #ClimateAction",
      timestamp: "2h ago",
      likes: 124,
      reposts: 32,
      comments: 8,
      platform: "X / Twitter",
      images: [
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=600"
      ]
    },
    {
      id: "sp-2",
      author_handle: "ncpor_moes",
      author_name: "NCPOR",
      author_avatar: "https://npdc.ncpor.res.in/static/images/ncpor_logo.png",
      content: "India's polar research contributes to understanding climate change and a sustainable future. Research vessel MV Vasiliy Golovnin completes its voyage supporting the 44th Indian Antarctic Expedition! 🚢⚓\n\n#ClimateAction #PolarScience #AntarcticaVoyage #NCPOR",
      timestamp: "1d ago",
      likes: 98,
      reposts: 21,
      comments: 5,
      platform: "X / Twitter",
      images: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600"
      ]
    }
  ];

  // 9. Notifications
  const notifications = [
    {
      id: "notif-1",
      title: "New Dataset Added",
      description: "Atmospheric Studies using Moveable Atmospheric Radar for Antarctica (2024)",
      timestamp: "2h ago",
      read: false,
      type: "dataset"
    },
    {
      id: "notif-2",
      title: "New Expedition Report",
      description: "43rd Indian Antarctic Expedition Comprehensive Technical Report published",
      timestamp: "5h ago",
      read: false,
      type: "report"
    },
    {
      id: "notif-3",
      title: "New Publication",
      description: "Sea Ice Variability in the Southern Ocean Sector (Journal of Polar Research)",
      timestamp: "1d ago",
      read: true,
      type: "publication"
    },
    {
      id: "notif-4",
      title: "Data Update",
      description: "Maitri AWS meteorological dataset updated with 2023-24 validated time series",
      timestamp: "1d ago",
      read: true,
      type: "update"
    }
  ];

  // 10. Upcoming Events
  const upcomingEvents = [
    {
      id: "ev-1",
      month: "SEP",
      day: "15",
      title: "Polar Science Awareness Workshop",
      location: "NCPOR, Goa",
      type: "Workshop",
      description: "Hands-on session for university students and early career researchers on polar datasets."
    },
    {
      id: "ev-2",
      month: "OCT",
      day: "02",
      title: "Climate Change and Polar Regions",
      location: "National Seminar, New Delhi",
      type: "National Seminar",
      description: "Inter-institutional summit discussing the latest IPCC polar findings and Indian contributions."
    },
    {
      id: "ev-3",
      month: "OCT",
      day: "15",
      title: "45th Indian Antarctic Expedition",
      location: "Preparatory Meeting, Goa",
      type: "Meeting",
      description: "Pre-departure logistics, medical clearance, and scientific project allocation meeting."
    },
    {
      id: "ev-4",
      month: "NOV",
      day: "05",
      title: "Polar Data Management Training",
      location: "Online Workshop",
      type: "Training",
      description: "FAIR data principles and Open Data ingestion workshop for NPDC contributors."
    }
  ];

  // 11. AI Data Trends Data
  const aiDataTrends = {
    title: "Antarctic Temperature Trend (2010 - 2024)",
    increase_stat: "+1.8°C",
    increase_caption: "Increase since 2010",
    ai_analysis: "Antarctic regional temperature shows an increasing trend of 1.8°C over the last decade, with maximum rise in coastal regions.",
    data_points: [
      { year: "2010", temp: -32.4, baseline: -32.5 },
      { year: "2012", temp: -31.8, baseline: -32.2 },
      { year: "2014", temp: -32.1, baseline: -32.0 },
      { year: "2016", temp: -30.9, baseline: -31.7 },
      { year: "2018", temp: -30.5, baseline: -31.4 },
      { year: "2020", temp: -30.8, baseline: -31.1 },
      { year: "2022", temp: -29.9, baseline: -30.8 },
      { year: "2024", temp: -29.2, baseline: -30.5 }
    ]
  };

  // 12. Smart Education Topics
  const educationTopics = [
    {
      id: "edu-antarctica-basics",
      title: "Antarctica: The Frozen Continent",
      level: "Beginner",
      duration: "15 mins",
      thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=500",
      summary: "Explore why Antarctica is the coldest, windiest, and driest continent on Earth, and how ice sheets lock up 70% of the world's freshwater.",
      key_concepts: ["Ice Sheets vs Sea Ice", "Katabatic Winds", "Glacial Calving", "Maitri & Bharati Stations"],
      quiz: {
        id: "quiz-1",
        questions: [
          {
            q: "What percentage of the world's freshwater is stored in the Antarctic ice sheet?",
            options: ["About 25%", "About 50%", "About 70%", "About 90%"],
            answer: 2
          },
          {
            q: "Which of the following is India's first permanent research base in Antarctica?",
            options: ["Maitri", "Dakshin Gangotri", "Bharati", "Himadri"],
            answer: 1
          }
        ]
      }
    },
    {
      id: "edu-sea-ice-dynamics",
      title: "Sea Ice Dynamics & Global Climate",
      level: "Intermediate",
      duration: "20 mins",
      thumbnail: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=500",
      summary: "Understand how sea ice reflects solar radiation back to space (Albedo effect) and acts as an ocean-atmosphere thermal insulator.",
      key_concepts: ["Albedo Effect", "Thermohaline Circulation", "Polynyas", "Pancake Ice"],
      quiz: {
        id: "quiz-2",
        questions: [
          {
            q: "What is the term for open water areas surrounded by sea ice in polar regions?",
            options: ["Crevasses", "Polynyas", "Nunataks", "Moraines"],
            answer: 1
          }
        ]
      }
    },
    {
      id: "edu-himadri-arctic",
      title: "Himadri & Indian Research in the Arctic",
      level: "Beginner",
      duration: "12 mins",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=500",
      summary: "Discover India's Arctic research station Himadri in Ny-Ålesund, Norway, studying Arctic amplification and its teleconnection with Indian monsoons.",
      key_concepts: ["Arctic Amplification", "Svalbard", "Monsoon Teleconnections", "IndARC Mooring"]
    }
  ];

  // 13. Expedition & Cruise Reports
  const reports = [
    {
      id: "rep-43-iae-tech",
      title: "43rd Indian Scientific Expedition to Antarctica: Comprehensive Technical & Logistics Report",
      expedition: "43rd Indian Antarctic Expedition",
      expedition_id: "exp-43-antarctic",
      region: "Antarctica",
      year: 2024,
      pages: 142,
      file_size: "18.4 MB",
      lead_author: "Dr. Anil Kumar",
      co_authors: ["Dr. K. Jeeva", "Dr. S. K. Roy", "Capt. V. Sharma"],
      institution: "National Centre for Polar and Ocean Research (NCPOR)",
      abstract: "Detailed account of the voyages of chartered ice-class vessel MV Vasiliy Golovnin supporting Maitri and Bharati stations during the austral summer of 2023–24. Encompasses runway maintenance at Maitri, delivery of 850 metric tons of fuel and scientific cargo, installation of the Moveable Atmospheric Radar at Bharati, and winter-over logistics handoff.",
      key_findings: [
        "Delivered 850 MT of Arctic-grade aviation fuel and life-support provisions with zero environmental incidents.",
        "Successful commissioning of the 54 MHz Moveable Atmospheric Radar (MAR) at Bharati station for mesosphere-stratosphere-troposphere wind profiling.",
        "Completed 42 shallow firn core drillings across the Dronning Maud Land transect.",
        "Maintained 100% operational continuity of satellite communication and telemedicine links."
      ],
      methodology: "Multimodal logistics combining shipborne voyage, heavy-lift helicopter sling operations (Kamov Ka-32), PistenBully tracked vehicle traverses, and automated meteorological telemetry.",
      doi: "10.5065/D6NCPOR-43IAE-REP",
      category: "Technical & Logistics",
      download_url: "https://npdc.ncpor.res.in/reports/43_IAE_Technical_Report.pdf",
      release_date: "2024-04-18"
    },
    {
      id: "rep-42-iae-sci",
      title: "Scientific Cruise Report: 42nd Indian Antarctic Expedition (Austral Summer 2022–2023)",
      expedition: "42nd Indian Antarctic Expedition",
      expedition_id: "exp-42-antarctic",
      region: "Antarctica",
      year: 2023,
      pages: 188,
      file_size: "24.6 MB",
      lead_author: "Dr. R. Thamban",
      co_authors: ["Dr. Manish Tiwari", "Dr. N. P. Jadav"],
      institution: "NCPOR & MoES",
      abstract: "Compilation of peer-reviewed scientific accomplishments achieved across biological, geological, cryospheric, and atmospheric programs during the 42nd expedition. Includes comprehensive reports from 32 participating academic institutions and universities.",
      key_findings: [
        "Unprecedented anomaly of -1.4°C in summer surface temperature recorded in the Larsemann Hills oasis.",
        "Identified new psychrophilic bacterial lineages from Schirmacher Oasis epilithic lichens.",
        "Mapped 120 km of sub-ice topography using ground penetrating radar (GPR) in Princess Elizabeth Land."
      ],
      methodology: "Multidisciplinary field measurements: multi-frequency GPR (100–400 MHz), CTD profiling across Prydz Bay, microbial culturing in cleanroom modules, and continuous trace gas spectrometry.",
      doi: "10.5065/D6NCPOR-42IAE-SCI",
      category: "Scientific Cruise Report",
      download_url: "https://npdc.ncpor.res.in/reports/42_IAE_Scientific_Report.pdf",
      release_date: "2023-08-10"
    },
    {
      id: "rep-arctic-himadri-2023",
      title: "Indian Arctic Expedition to Svalbard: Himadri Summer & Wintering Research Report (2023)",
      expedition: "Indian Arctic Expedition 2023",
      expedition_id: "exp-arctic-2023",
      region: "Arctic",
      year: 2023,
      pages: 96,
      file_size: "12.8 MB",
      lead_author: "Dr. K. P. Krishnan",
      co_authors: ["Dr. Avinash Kumar", "Dr. Archana Singh"],
      institution: "NCPOR, Goa",
      abstract: "Summary of observational campaigns conducted at Himadri Station, Ny-Ålesund, Spitsbergen. Features glaciological mass balance surveys of the Vestre Lovénbreen and Austre Brøggerbreen glaciers, hydrographic profiling in Kongsfjorden, and wintering aerosol microphysics.",
      key_findings: [
        "Kongsfjorden water column exhibited heightened Atlantic Water (AW) intrusion during early spring.",
        "Vestre Lovénbreen mass balance yielded a net negative balance of -0.84 m water equivalent.",
        "Black carbon aerosol spikes coincided with trans-Arctic wildfire advection events from Siberia."
      ],
      methodology: "High-resolution Seabird SBE-19plus CTD casts, Aethalometer AE-33 black carbon measurements, snow pits, and automated weather station telemetry.",
      doi: "10.5065/D6NCPOR-ARCTIC-2023",
      category: "Field & Observatory Report",
      download_url: "https://npdc.ncpor.res.in/reports/Himadri_Arctic_Report_2023.pdf",
      release_date: "2023-11-25"
    },
    {
      id: "rep-soe-12-sagar-nidhi",
      title: "12th Indian Southern Ocean Expedition Cruise Report: ORV Sagar Nidhi Cruise SN-148",
      expedition: "12th Southern Ocean Expedition",
      expedition_id: "exp-soe-12",
      region: "Southern Ocean",
      year: 2022,
      pages: 210,
      file_size: "31.2 MB",
      lead_author: "Dr. N. Anilkumar",
      co_authors: ["Dr. Sarat Babu", "Dr. J. Pavithran"],
      institution: "NCPOR & National Institute of Ocean Technology (NIOT)",
      abstract: "Hydrographic and biogeochemical findings along the 57°30'E meridian transect from 40°S to the Antarctic continental margin (67°S). Investigated the Subtropical Front (STF), Subantarctic Front (SAF), and Polar Front (PF), quantifying oceanic CO2 flux and primary productivity.",
      key_findings: [
        "Polar Front region functioned as a net sink for atmospheric CO2 with an average air-sea flux of -2.4 mmol C m⁻² d⁻¹.",
        "Deep silicate depletion noted south of the Southern ACC front, limiting diatom blooms.",
        "Successful retrieval and re-deployment of two deep-sea subsurface moorings at 48°S and 57°S."
      ],
      methodology: "24-bottle rosette sampler with Sea-Bird 911plus CTD, Lowered Acoustic Doppler Current Profiler (L-ADCP), discrete spectrophotometric pH analysis, and fluorometric chlorophyll-a assays.",
      doi: "10.5065/D6NCPOR-SOE12-SN148",
      category: "Cruise Report",
      download_url: "https://npdc.ncpor.res.in/reports/SOE_12_Sagar_Nidhi_Report.pdf",
      release_date: "2022-09-14"
    },
    {
      id: "rep-icecore-larsemann",
      title: "Deep Firn & Ice Core Drilling in Princess Elizabeth Land: Technical Debrief & Physical Stratigraphy",
      expedition: "41st Indian Antarctic Expedition",
      expedition_id: "exp-41-antarctic",
      region: "Antarctica",
      year: 2022,
      pages: 74,
      file_size: "15.1 MB",
      lead_author: "Dr. Thamban Meloth",
      co_authors: ["Dr. C. M. Laluraj", "Dr. R. Antony"],
      institution: "NCPOR Ice Core Laboratory",
      abstract: "Technical documentation of the electromechanical dry drilling of an intermediate-depth ice core (102.8 m) on the continental plateau near Bharati Station. Details core quality, thermal drilling fluid trials, field processing protocols, and cold-chain freight back to NCPOR Goa at -20°C.",
      key_findings: [
        "Retrieved 102.8 m of continuous ice core with 99.2% core recovery rate.",
        "Visual stratigraphy revealed 4 distinct volcanic ash/tephra horizons corresponding to regional eruptions.",
        "Basal core temperature reached -24.8°C at 100 m depth."
      ],
      methodology: "Hans Tausen electromechanical 3-inch drill, continuous electrical conductivity measurement (ECM), line-scan digital radiography, and dedicated refrigerated shipping containers.",
      doi: "10.5065/D6NCPOR-ICE-CORE-2022",
      category: "Glaciology Technical Report",
      download_url: "https://npdc.ncpor.res.in/reports/IceCore_Drilling_Larsemann_2022.pdf",
      release_date: "2022-06-30"
    },
    {
      id: "rep-radar-bharati-comm",
      title: "Moveable Atmospheric Radar for Antarctica (MARA) Installation & Validation Report",
      expedition: "43rd Indian Antarctic Expedition",
      expedition_id: "exp-43-antarctic",
      region: "Antarctica",
      year: 2024,
      pages: 62,
      file_size: "9.5 MB",
      lead_author: "Dr. K. Jeeva",
      co_authors: ["Dr. T. Venkataraman", "Er. S. Nair"],
      institution: "NCPOR & National Atmospheric Research Laboratory (NARL)",
      abstract: "Engineering and commissioning benchmark report for the 54 MHz atmospheric wind profiler antenna array installed at Bharati Station. Documents antenna alignment, ground plane installation under freezing soil conditions, transmitter pulse calibration, and tropospheric validation against radiosonde launches.",
      key_findings: [
        "Radar achieved continuous 3D wind velocity measurements up to 16 km altitude with 150 m vertical resolution.",
        "High agreement (r = 0.94) with GPS-radiosonde profiles launched during synoptic cyclonic storms.",
        "Grounding grid proved effective in dissipating electro-static charge during severe Antarctic blizzards."
      ],
      methodology: "54.5 MHz active phased array with 48 crossed three-element Yagi-Uda antennas, pulse compression, and beam-swinging Doppler profiling.",
      doi: "10.5065/D6NCPOR-MARA-BHARATI-2024",
      category: "Instruments & Engineering",
      download_url: "https://npdc.ncpor.res.in/reports/MARA_Bharati_Commissioning_Report.pdf",
      release_date: "2024-03-05"
    }
  ];

  // 14. High-Definition Polar Media (Photos & Videos)
  const media = [
    {
      id: "med-1",
      type: "photo",
      title: "Sunset over Maitri Research Station, Schirmacher Oasis",
      caption: "The golden hour cast over the main living modules and lake Priyadarshini water pumping station at Maitri in Central Dronning Maud Land.",
      region: "Antarctica",
      station: "Maitri",
      category: "Stations & Facilities",
      photographer: "Dr. Rajesh Asthana (NCPOR)",
      expedition: "43rd Indian Antarctic Expedition",
      date: "2024-01-20",
      resolution: "4K (3840 x 2160)",
      coordinates: "70°45′58″ S, 11°43′56″ E",
      tags: ["Maitri", "Schirmacher Oasis", "Antarctica", "Research Base", "Sunset"],
      url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=400",
      featured: true
    },
    {
      id: "med-2",
      type: "photo",
      title: "Bharati Station Architectural Modular Base",
      caption: "India's modern third Antarctic station constructed on Promontory hill in the Larsemann Hills, built with 134 modular prefabricated containers designed to withstand 200 km/h winds.",
      region: "Antarctica",
      station: "Bharati",
      category: "Stations & Facilities",
      photographer: "NCPOR Expedition Engineering Team",
      expedition: "42nd Indian Antarctic Expedition",
      date: "2023-02-14",
      resolution: "4K (3840 x 2400)",
      coordinates: "69°24′28″ S, 76°11′14″ E",
      tags: ["Bharati", "Larsemann Hills", "Engineering", "Prydz Bay", "Architecture"],
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
      featured: true
    },
    {
      id: "med-3",
      type: "photo",
      title: "Adélie Penguin Colony along the Fast-Ice Edge",
      caption: "Breeding colony of Pygoscelis adeliae observing scientific sea ice sampling operations off Princess Elizabeth Land.",
      region: "Antarctica",
      station: "Bharati",
      category: "Wildlife & Ecology",
      photographer: "Dr. Subir Sen (Zoological Survey of India)",
      expedition: "43rd Indian Antarctic Expedition",
      date: "2023-12-28",
      resolution: "Ultra-HD (4200 x 2800)",
      coordinates: "69°22′10″ S, 76°19′45″ E",
      tags: ["Penguins", "Wildlife", "Adelie", "Sea Ice", "Biodiversity"],
      url: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&q=80&w=400",
      featured: true
    },
    {
      id: "med-4",
      type: "photo",
      title: "Aurora Australis Dancing over the Ice Sheet",
      caption: "Vibrant emerald green ionospheric aurora australis captured during winter-over observations at Maitri station.",
      region: "Antarctica",
      station: "Maitri",
      category: "Aurora & Sky",
      photographer: "Indian Institute of Geomagnetism (IIG) Team",
      expedition: "42nd Indian Antarctic Expedition",
      date: "2023-06-18",
      resolution: "High-Res (3600 x 2400)",
      coordinates: "70°45′58″ S, 11°43′56″ E",
      tags: ["Aurora Australis", "Geomagnetism", "Polar Night", "Space Weather"],
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=400",
      featured: true
    },
    {
      id: "med-5",
      type: "photo",
      title: "Himadri Station during Svalbard Arctic Summer",
      caption: "India's permanent research laboratory in the international science settlement of Ny-Ålesund, Norway, facing the Kongsfjorden fjord and Kronebreen glacier.",
      region: "Arctic",
      station: "Himadri",
      category: "Stations & Facilities",
      photographer: "Dr. K. P. Krishnan (NCPOR)",
      expedition: "Indian Arctic Expedition 2023",
      date: "2023-07-15",
      resolution: "4K (3840 x 2160)",
      coordinates: "78°55′00″ N, 11°56′00″ E",
      tags: ["Himadri", "Arctic", "Ny-Alesund", "Svalbard", "Glaciers"],
      url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=400",
      featured: false
    },
    {
      id: "med-6",
      type: "photo",
      title: "Ice Core Extraction & Field Inspection",
      caption: "Scientists logging visual annual dust layers in an electromechanically drilled ice core at the Princess Elizabeth Land firn trench.",
      region: "Antarctica",
      station: "Bharati",
      category: "Science in Action",
      photographer: "Ice Core Paleoclimate Team (NCPOR)",
      expedition: "41st Indian Antarctic Expedition",
      date: "2022-01-30",
      resolution: "4K (3840 x 2560)",
      coordinates: "69°50′00″ S, 77°15′00″ E",
      tags: ["Ice Core", "Paleoclimate", "Glaciology", "Drilling", "Science in Action"],
      url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=400",
      featured: false
    },
    {
      id: "med-7",
      type: "photo",
      title: "Research Vessel MV Vasiliy Golovnin in Pack Ice",
      caption: "Chartered Russian ice-class cargo vessel navigating consolidated pancake and floe ice during the 44th expedition resupply voyage.",
      region: "Southern Ocean",
      station: "Vessel Operations",
      category: "Expeditions & Vessels",
      photographer: "Capt. A. Nair (Logistic Operations)",
      expedition: "44th Indian Antarctic Expedition",
      date: "2024-01-08",
      resolution: "4K (3840 x 2160)",
      coordinates: "66°15′20″ S, 72°30′10″ E",
      tags: ["Icebreaker", "Vessel", "Vasiliy Golovnin", "Southern Ocean", "Pack Ice"],
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
      featured: false
    },
    {
      id: "med-8",
      type: "video",
      title: "Launching High-Altitude Radiosonde Weather Balloon at Maitri",
      caption: "India Meteorological Department (IMD) scientists launching a GPS-radiosonde balloon into sub-zero blizzard winds to profile the Antarctic polar vortex.",
      region: "Antarctica",
      station: "Maitri",
      category: "Science in Action",
      photographer: "IMD Polar Meteorological Unit",
      expedition: "43rd Indian Antarctic Expedition",
      date: "2024-02-01",
      duration: "03:45",
      resolution: "4K 60fps",
      coordinates: "70°45′58″ S, 11°43′56″ E",
      tags: ["Radiosonde", "IMD", "Meteorology", "Blizzard", "Atmosphere"],
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
      featured: true
    },
    {
      id: "med-9",
      type: "video",
      title: "Kongsfjorden Fjord Hydrographic Mooring Deployment (IndARC)",
      caption: "Deploying the underwater multi-sensor IndARC mooring in Svalbard to record year-round ocean currents, temperature, and salinity beneath the Arctic sea ice.",
      region: "Arctic",
      station: "Himadri",
      category: "Expeditions & Vessels",
      photographer: "Marine Sciences Division (NCPOR)",
      expedition: "Indian Arctic Expedition 2023",
      date: "2023-08-12",
      duration: "05:12",
      resolution: "1080p 60fps",
      coordinates: "78°59′00″ N, 11°51′00″ E",
      tags: ["IndARC", "Kongsfjorden", "Mooring", "Oceanography", "Arctic Ocean"],
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
      featured: false
    }
  ];

  // 15. Institutional Activities (Conferences, Seminars, Workshops, Exhibitions)
  const activities = [
    {
      id: "act-1",
      title: "National Polar Science Awareness Summit & Youth Workshop 2024",
      type: "Workshop",
      category: "Outreach & Education",
      status: "Upcoming",
      date: "2024-10-15",
      time: "09:30 AM - 05:00 PM IST",
      venue: "Auditorium, NCPOR Campus, Headland Sada, Vasco-da-Gama, Goa (Hybrid)",
      organizer: "National Centre for Polar and Ocean Research (NCPOR)",
      co_organizers: ["Ministry of Earth Sciences (MoES)", "Goa University"],
      description: "A flagship hands-on workshop tailored for university students, early-career researchers, and educators. Features interactive sessions on accessing NPDC satellite datasets, cryogenic laboratory tours, virtual reality tours of Bharati station, and guest lectures from veteran expedition leaders.",
      speakers: [
        { name: "Dr. Thamban Meloth", designation: "Director, NCPOR", topic: "India's Four Decades in Antarctica" },
        { name: "Dr. Anil Kumar", designation: "Group Director, Marine Geosciences", topic: "Southern Ocean Climate Drivers" },
        { name: "Dr. Archana Singh", designation: "Senior Scientist, Arctic Studies", topic: "Living and Working in Ny-Ålesund" }
      ],
      registered_count: 184,
      capacity: 250,
      brochure_url: "https://ncpor.res.in/downloads/Polar_Youth_Workshop_2024.pdf"
    },
    {
      id: "act-2",
      title: "International Symposium on Cryospheric Teleconnections & Monsoon Dynamics",
      type: "Conference",
      category: "Scientific Conference",
      status: "Upcoming",
      date: "2024-11-20",
      time: "09:00 AM - 06:00 PM IST",
      venue: "Prithvi Bhavan Conference Centre, Lodhi Road, New Delhi",
      organizer: "Ministry of Earth Sciences (MoES)",
      co_organizers: ["SCAR", "IASC", "IITM Pune"],
      description: "Three-day international conference examining the physical links between Arctic sea-ice retreat, Himalayan snow cover anomalies, and Indian summer monsoon variability. Over 40 peer-reviewed papers will be presented across atmospheric, oceanic, and glaciological tracks.",
      speakers: [
        { name: "Dr. M. Ravichandran", designation: "Secretary, MoES", topic: "Inaugural Keynote: Polar-Tropics Teleconnections" },
        { name: "Prof. J. E. Overland", designation: "NOAA Pacific Marine Lab", topic: "Arctic Amplification and Mid-latitude Weather" },
        { name: "Dr. Manish Tiwari", designation: "Scientist F, NCPOR", topic: "Isotopic Tracers in Antarctic Ice" }
      ],
      registered_count: 310,
      capacity: 400,
      brochure_url: "https://moes.gov.in/symposium/Cryosphere_Monsoon_2024.pdf"
    },
    {
      id: "act-3",
      title: "45th Indian Antarctic Expedition Pre-Departure Training & Briefing",
      type: "Training",
      category: "Logistics & Medical",
      status: "Upcoming",
      date: "2024-10-02",
      time: "08:30 AM - 04:30 PM IST",
      venue: "ITBP Mountaineering & Skiing Institute, Auli, Uttarakhand",
      organizer: "NCPOR Expedition Management Division",
      co_organizers: ["Indo-Tibetan Border Police (ITBP)", "AIIMS New Delhi"],
      description: "Mandatory acclimation, high-altitude survival, fire-fighting, and psychological fitness regime for scientific and logistic team members selected for the 45th Indian Scientific Expedition to Antarctica.",
      speakers: [
        { name: "Col. D. S. Negi", designation: "Principal, ITBP Auli", topic: "Crevasse Rescue & Glacier Safety" },
        { name: "Dr. V. K. Roy", designation: "Chief Medical Officer, NCPOR", topic: "Hypothermia & Frostbite Prevention" }
      ],
      registered_count: 48,
      capacity: 65,
      brochure_url: "https://ncpor.res.in/downloads/45IAE_Training_Brief.pdf"
    },
    {
      id: "act-4",
      title: "Open FAIR Polar Data Workshop: Ingesting & Analyzing NPDC Repositories",
      type: "Seminar",
      category: "Data Science & IT",
      status: "Completed",
      date: "2024-08-14",
      time: "10:00 AM - 01:00 PM IST",
      venue: "Online (Webex / YouTube Live Stream)",
      organizer: "National Polar Data Center (NPDC)",
      co_organizers: ["DataCite", "World Data System (WDS)"],
      description: "Demonstration of the newly redesigned NCPOR Portal REST APIs, semantic search query engine, and open NetCDF/CSV access pipelines adhering to international FAIR data principles.",
      speakers: [
        { name: "Dr. K. Jeeva", designation: "Head, NPDC", topic: "Navigating 2,500+ Indian Polar Datasets" },
        { name: "Er. Ramesh Patel", designation: "Lead Systems Architect", topic: "Automated Metadata & Vector Search" }
      ],
      registered_count: 520,
      capacity: 1000,
      brochure_url: "https://npdc.ncpor.res.in/webinars/NPDC_FAIR_Data_2024.pdf"
    }
  ];

  // 16. Pending Moderation Queue (For Admin Dashboard)
  const pendingModeration = [
    {
      id: "mod-1",
      type: "social_post",
      title: "AI Generated Post: 44th Expedition Voyage Milestone",
      content: "Ship MV Vasiliy Golovnin enters Prydz Bay carrying scientific fuel and 45 researchers! Follow live updates from Bharati station on our portal. #AntarcticScience #NCPOR",
      platform: "X / Twitter",
      submitted_by: "AI Outreach Engine",
      submitted_at: "1 hour ago",
      status: "pending_review"
    },
    {
      id: "mod-2",
      type: "document_summary",
      title: "AI Summary: Schirmacher Oasis Lichen Microbial Analysis",
      content: "Executive summary extracted from submitted raw field manuscript by Dr. S. Sen. Flags 3 novel cold-tolerant microflora species.",
      submitted_by: "Document AI Pipeline",
      submitted_at: "3 hours ago",
      status: "pending_review"
    },
    {
      id: "mod-3",
      type: "dataset_submission",
      title: "Raw Atmospheric Aerosol Optical Depth (AOD) - Maitri Summer 2024",
      content: "AOD dataset submitted by Indian Institute of Tropical Meteorology (IITM). Ingestion QC checks passed with 99.8% completeness.",
      submitted_by: "Dr. S. K. Roy (IITM)",
      submitted_at: "Yesterday",
      status: "pending_review"
    }
  ];

  // 17. User Profile & Saved Items
  const userProfile = {
    id: "usr-viraj-jadhav",
    name: "Dr. Viraj Jadhav",
    role: "Polar Scientist",
    role_type: "scientist",
    institution: "National Centre for Polar and Ocean Research (NCPOR)",
    department: "Cryosphere & Glaciology Division",
    email: "viraj.jadhav@ncpor.res.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    expeditions_participated: ["41st IAE", "43rd IAE"],
    research_interests: ["Sea Ice Dynamics", "Ice Shelf Cavity Circulation", "Remote Sensing", "Southern Annular Mode"],
    saved_items: [
      { id: "pub-sea-ice-variability-2024", type: "publication", title: "Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023", saved_at: "2 days ago" },
      { id: "rep-43-iae-tech", type: "report", title: "43rd Indian Scientific Expedition to Antarctica: Comprehensive Technical & Logistics Report", saved_at: "Yesterday" },
      { id: "ds-sea-ice-conc", type: "dataset", title: "High-Resolution Antarctic Daily Sea Ice Concentration Time Series (2010–2023)", saved_at: "3 days ago" },
      { id: "med-1", type: "media", title: "Sunset over Maitri Research Station, Schirmacher Oasis", saved_at: "5 days ago" }
    ],
    history: [
      { id: "h-1", query: "Antarctic sea ice variability 2010-2023", path: "/publications/sea-ice-variability-2024", timestamp: "10 mins ago" },
      { id: "h-2", query: "Maitri AWS meteorological records", path: "/datasets", timestamp: "1 hour ago" },
      { id: "h-3", query: "Moveable Atmospheric Radar Bharati", path: "/reports", timestamp: "Yesterday" }
    ]
  };

  const fullDatabase = {
    institutions,
    researchers,
    expeditions,
    publications: allPublications,
    datasets: fullDatasetCatalog,
    reports,
    media,
    activities,
    pending_moderation: pendingModeration,
    user_profile: userProfile,
    knowledge_graph: knowledgeGraph,
    social_posts: socialPosts,
    notifications,
    upcoming_events: upcomingEvents,
    ai_data_trends: aiDataTrends,
    education_topics: educationTopics,
    stats: {
      datasets_count: "2,500+",
      publications_count: "1,000+",
      reports_count: "180+",
      expeditions_count: "44+",
      media_count: "50,000+",
      researchers_count: "200+",
      activities_count: "300+"
    }
  };

  const outputPath = path.resolve(__dirname, '../data/polar_database.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullDatabase, null, 2), 'utf8');
  console.log(`Database seeded successfully to ${outputPath}!`);
  console.log(`Summary: ${allPublications.length} publications, ${fullDatasetCatalog.length} datasets, ${reports.length} reports, ${media.length} media items, ${researchers.length} researchers, ${expeditions.length} expeditions.`);
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  generateSeedData();
}

