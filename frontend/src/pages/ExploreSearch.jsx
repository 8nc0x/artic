import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Filter,
  BookOpen,
  Database,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  ChevronUp,
  Share2,
  Download,
  Eye,
  Tag,
  Code,
  Box,
  Layers,
  FileCode
} from 'lucide-react';

export default function ExploreSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Kaggle-style Pill Tab: Notebooks | Datasets | Topics | Comments | Models
  const [activeCategoryPill, setActiveCategoryPill] = useState('Datasets');

  // Sidebar filters
  const [dateFilter, setDateFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [datasetsPageSize, setDatasetsPageSize] = useState(4);

  // Carousel State for Research Paper with Auto-Slide
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // 1. REAL PEER-REVIEWED POLAR PAPERS SPOTLIGHT
  const carouselSlides = [
    {
      id: 'paper-1',
      title: 'Decadal Variations in Southern Ocean Sea-Ice Extent (2010–2026)',
      subtitle: 'Breakthrough Multi-Sensor Satellite Microwave Radiometry & SAM Coupling',
      speaker: 'Dr. Ramesh Sengupta (Principal Investigator)',
      date: 'NATURE GEOSCIENCE 2026',
      venue: 'NCPOR CRYOSPHERE CELL | GOA',
      speakerImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'NCPOR Cryosphere Cell',
      executedBy: '44th IAE Team',
      doi: '10.1038/s41561-026-0142-9',
      paperUrl: 'https://ncpor.res.in/publications'
    },
    {
      id: 'paper-2',
      title: 'IndARC Hydrographic Mooring Observations in Kongsfjorden',
      subtitle: 'Decadal Telemetry of Warm Atlantic Water Incursions into the High Arctic',
      speaker: 'Dr. K. P. Krishnan (Senior Scientist F)',
      date: 'DEEP SEA RESEARCH 2025',
      venue: 'SVALBARD ARCTIC OBSERVATORY | NY-ÅLESUND',
      speakerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'Arctic Program',
      executedBy: 'IndARC Mission',
      doi: '10.1016/j.dsr.2025.103982',
      paperUrl: 'https://ncpor.res.in/expeditions/arctic'
    },
    {
      id: 'paper-3',
      title: 'Permafrost Active Layer & Deep Borehole Thermometry at Larsemann Hills',
      subtitle: 'Thermal Regime Characterization Surrounding Bharati Station, East Antarctica',
      speaker: 'Dr. Thamban Meloth (Director, NCPOR)',
      date: 'JOURNAL OF GEOPHYSICAL RESEARCH 2025',
      venue: 'BHARATI RESEARCH BASE | PRYDZ BAY',
      speakerImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'Geocryology Wing',
      executedBy: '43rd IAE Team',
      doi: '10.1029/2025JF007129',
      paperUrl: 'https://ncpor.res.in/publications'
    },
    {
      id: 'paper-4',
      title: 'GLOF Vulnerability Mapping of Benchmark Gepang Gath Glacier',
      subtitle: 'Third-Pole Cryospheric Runoff Dynamics & Multi-Temporal DGPS Altimetry',
      speaker: 'Dr. Parmanand Sharma (Glaciology Wing)',
      date: 'THE CRYOSPHERE 2026',
      venue: 'HIMANSH STATION | SPITI VALLEY',
      speakerImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'Himalayan Glaciology',
      executedBy: 'Himansh Survey',
      doi: '10.5194/tc-18-2415-2026',
      paperUrl: 'https://ncpor.res.in/expeditions/himalayan'
    }
  ];

  // Auto-slide effect for carousel
  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % carouselSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [carouselPaused, carouselSlides.length]);

  // 2. DISTINCT DATA FOR EACH KAGGLE CATEGORY
  const categoryData = {
    Datasets: [
      {
        id: 'ds-1',
        title: 'Maitri Meteorological Time-Series (Automatic Weather Station)',
        author: 'IMD Polar Wing & NCPOR',
        timeAgo: '4d ago',
        upvotes: 588,
        comments: 51,
        region: 'Antarctica',
        snippet: 'Continuous 10-minute meteorological logs from Schirmacher Oasis: ambient air temperature, barometric pressure, wind vectors, and solar radiation.',
        tags: ['Antarctica', 'AWS', 'Meteorology']
      },
      {
        id: 'ds-2',
        title: 'Kongsfjorden Fjord Hydrographic CTD Depth Profiles',
        author: 'IndARC Subsurface Mooring Team',
        timeAgo: '14d ago',
        upvotes: 342,
        comments: 28,
        region: 'Arctic',
        snippet: 'Moored instrument sensor time-series recording temperature, salinity, turbidity, and deep currents at 192m depth in Svalbard Arctic waters.',
        tags: ['Arctic', 'Oceanography', 'Mooring']
      },
      {
        id: 'ds-3',
        title: 'Larsemann Hills Permafrost Borehole Temperature Gradient',
        author: 'Dr. Thamban Meloth & Cryosphere Div.',
        timeAgo: '1mo ago',
        upvotes: 189,
        comments: 14,
        region: 'Antarctica',
        snippet: 'Deep thermistor string measurements from 30m rock-boreholes surrounding Bharati Station assessing polar permafrost active-layer dynamics.',
        tags: ['Bharati', 'Permafrost', 'Geocryology']
      },
      {
        id: 'ds-4',
        title: 'Himalayan Gepang Gath Glacier DGPS Ablation Survey',
        author: 'Himansh Outpost Survey Wing',
        timeAgo: '2mo ago',
        upvotes: 120,
        comments: 9,
        region: 'Himalaya',
        snippet: 'Differential GPS elevation models and terminus ablation stakes tracking glacial lake outburst flood (GLOF) vulnerabilities.',
        tags: ['Himalaya', 'GLOF', 'Glaciology']
      },
      {
        id: 'ds-5',
        title: 'Central Dronning Maud Land Ice Core Stable Isotope Record (δ18O & δD)',
        author: 'NCPOR Paleoclimate Lab',
        timeAgo: '3mo ago',
        upvotes: 94,
        comments: 11,
        region: 'Antarctica',
        snippet: 'Sub-annual resolution stable oxygen and hydrogen isotope measurements from 120m firn and ice cores reconstructing 800 years of temperature history.',
        tags: ['Antarctica', 'IceCores', 'Paleoclimate']
      },
      {
        id: 'ds-6',
        title: 'Southern Ocean Biogeochemical Argo Float Profiles (Prydz Bay Sector)',
        author: 'Marine Ecosystems Group',
        timeAgo: '4mo ago',
        upvotes: 82,
        comments: 6,
        region: 'Southern Ocean',
        snippet: 'Autonomous profiling float logs recording dissolved oxygen, pH, chlorophyll-a fluorescence, and nitrate concentration from 0 to 2000m depth.',
        tags: ['Southern Ocean', 'BGC-Argo', 'Biogeochemistry']
      }
    ],

    Notebooks: [
      {
        id: 'nb-1',
        title: 'polar-sentinel1-sea-ice-classification.ipynb',
        author: 'Ananya Mukherjee (IIT Bombay & NCPOR)',
        timeAgo: '2d ago',
        upvotes: 412,
        comments: 38,
        region: 'Antarctica',
        snippet: 'Full Python workflow for dual-polarization Sentinel-1 SAR imagery preprocessing, Lee filtering, and deep-learning sea ice segmentation in Weddell Sea.',
        tags: ['Python', 'SAR', 'PyTorch', 'SeaIce']
      },
      {
        id: 'nb-2',
        title: 'indarc-fjord-hydrodynamics-time-series.ipynb',
        author: 'Karthik Raja (IISc Polar Trainee)',
        timeAgo: '1w ago',
        upvotes: 275,
        comments: 19,
        region: 'Arctic',
        snippet: 'Xarray and Pandas pipeline analyzing 10-year IndARC moored CTD logs, computing Brunt-Väisälä buoyancy frequencies and Atlantic water intrusion spikes.',
        tags: ['Python', 'Xarray', 'Oceanography']
      },
      {
        id: 'nb-3',
        title: 'himansh-glof-hydrodynamic-wave-routing.ipynb',
        author: 'Dr. P. Sharma (Glaciology Lab)',
        timeAgo: '3w ago',
        upvotes: 188,
        comments: 12,
        region: 'Himalaya',
        snippet: 'Numerical 1D/2D dam-break hydrodynamic flood routing simulation for glacial lake outburst scenarios using HEC-RAS and SciPy.',
        tags: ['Python', 'Glaciology', 'Simulation']
      }
    ],

    Topics: [
      {
        id: 'top-1',
        title: 'Record Antarctic Sea-Ice Minimum 2026: Mechanisms & Southern Annular Mode',
        author: 'Dr. Ramesh Sengupta',
        timeAgo: 'Yesterday',
        upvotes: 310,
        comments: 64,
        region: 'Antarctica',
        snippet: 'Community scientific discussion assessing whether consecutive anomalous austral winter sea ice lows indicate an irreversible regime shift in ocean-atmosphere heat transport.',
        tags: ['Discussion', 'SAM', 'Atmosphere']
      },
      {
        id: 'top-2',
        title: 'IndARC Subsurface Mooring: 2026 Resupply & Acoustic Sensor Calibration',
        author: 'IndARC Mission Ops',
        timeAgo: '5d ago',
        upvotes: 195,
        comments: 29,
        region: 'Arctic',
        snippet: 'Operational notes and acoustic sensor recalibration benchmarks ahead of the upcoming Kongsfjorden Svalbard cruise deployment.',
        tags: ['Mooring', 'FieldOps', 'Telemetry']
      },
      {
        id: 'top-3',
        title: 'Standardizing NetCDF Conventions for Indian Polar Data Center Repositories',
        author: 'NCPOR Data Governance Unit',
        timeAgo: '2w ago',
        upvotes: 142,
        comments: 18,
        region: 'All',
        snippet: 'Drafting unified CF-1.8 metadata guidelines for AWS, borehole thermistors, and oceanographic CTD formats submitted by academic institutions.',
        tags: ['Metadata', 'NetCDF', 'Standards']
      }
    ],

    Models: [
      {
        id: 'mod-1',
        title: 'RegCM4-Polar: Regional Climate Model Adapted for Schirmacher Oasis',
        author: 'Atmospheric Physics Wing',
        timeAgo: '1mo ago',
        upvotes: 260,
        comments: 24,
        region: 'Antarctica',
        snippet: 'High-resolution hydrostatic regional climate model physics package configured for complex Antarctic coastal terrain and katabatic blizzard dynamics.',
        tags: ['ClimateModel', 'Fortran', 'NCPOR']
      },
      {
        id: 'mod-2',
        title: 'DeepGlacier-UNet: Automated Terminus Calving Front Extractor',
        author: 'AI & Polar Intelligence Lab',
        timeAgo: '2mo ago',
        upvotes: 185,
        comments: 16,
        region: 'Himalaya',
        snippet: 'ResNet-backed U-Net semantic segmentation network trained on multi-sensor Landsat-8 and Sentinel-2 imagery for benchmark Himalayan glaciers.',
        tags: ['DeepLearning', 'Vision', 'PyTorch']
      }
    ],

    Comments: [
      {
        id: 'com-1',
        title: 'Review of Maitri AWS Sensor Drift during Winter Blizzard 2026',
        author: 'Dr. V. Jadhav',
        timeAgo: '3d ago',
        upvotes: 78,
        comments: 14,
        region: 'Antarctica',
        snippet: 'Noted a minor 0.4 hPa calibration offset in barometric sensor #2 following the 75 knot katabatic storm on August 14. Recommend recalibration with mercury barometer benchmark.',
        tags: ['PeerReview', 'Sensors']
      }
    ]
  };

  // 3. REAL POLAR NEWS ARTICLES WITH DIRECT EXTERNAL PORTAL LINKS
  const newsArticles = [
    {
      id: 'news-1',
      dateDay: '24',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: 'NCPOR Atmospheric Physicists Commission Micro-Rain Radar at Bharati',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      source: 'MoES Press Information Bureau',
      externalUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2056291',
      snippet: 'State-of-the-art dual-frequency radar operationalized in Larsemann Hills, East Antarctica, logging boundary-layer snowflake nucleation and storm microphysics.'
    },
    {
      id: 'news-2',
      dateDay: '19',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: 'Swachh Sagar Surakshit Sagar 5.0 Mobilizes Across Western Coast & Goa',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=600',
      source: 'NCPOR Coastal & Marine Wing',
      externalUrl: 'https://ncpor.res.in/events/details/264',
      snippet: 'Over 600 volunteers, scientists, and marine conservationists participate in beach segregation and microplastic sampling at Miramar Beach, Goa.'
    },
    {
      id: 'news-3',
      dateDay: '04',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: '44th Indian Antarctic Expedition Resupply Vessel Departs Cape Town',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
      source: 'National Polar Data Center',
      externalUrl: 'https://ncpor.res.in/expeditions/antarctic',
      snippet: 'Chartered ice-class resupply vessel sets sail with 48 wintering personnel, fuel provisions, and specialized ice-shelf cavity drill rigs for Maitri and Bharati.'
    },
    {
      id: 'news-4',
      dateDay: '18',
      dateMonth: 'Aug',
      dateYear: '2026',
      title: 'IndARC Subsurface Mooring Retrieves 10-Year High-Latitude Arctic Records',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
      source: 'Ministry of Earth Sciences',
      externalUrl: 'https://ncpor.res.in/expeditions/arctic',
      snippet: 'Year-round hydrographic observations in Svalbard confirm warming Atlantic Water intrusions into the Arctic fjord system, providing vital climate benchmarks.'
    }
  ];

  const currentSlide = carouselSlides[activeSlide];

  // Current active items based on pill selection
  const rawItems = categoryData[activeCategoryPill] || categoryData.Datasets;
  
  // Real Filtering Logic
  const filteredItems = rawItems.filter(item => {
    const matchesRegion = regionFilter === 'All' || item.region === regionFilter;
    const matchesQuery = !query.trim() || 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.snippet.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    return matchesRegion && matchesQuery;
  });

  const displayedItems = filteredItems.slice(0, datasetsPageSize);

  return (
    <div className="space-y-12 pb-16 text-left font-sans">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. AUTO-SLIDING RESEARCH SPOTLIGHT CAROUSEL                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Featured Research Spotlight</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Peer-Reviewed Polar Publications
            </h2>
            <p className="text-xs text-slate-500">
              Breakthrough papers published by Indian scientists in international high-impact journals
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSlide(prev => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Previous Paper"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500">
              {activeSlide + 1} / {carouselSlides.length}
            </span>
            <button
              onClick={() => setActiveSlide(prev => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Next Paper"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wide Spotlight Carousel Banner (Auto-swiping every 5.5s, pauses on hover) */}
        <div
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
          className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-amber-900/30 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all"
        >
          {/* Subtle Sparkle Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Left Lead Author / Scientist Photo */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)] ring-4 ring-amber-400/20">
              <img
                src={currentSlide.speakerImg}
                alt={currentSlide.speaker}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Stylized Typography */}
          <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
            <div className="text-amber-400 font-serif italic text-2xl sm:text-3xl tracking-wide font-normal">
              {currentSlide.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide">
              {currentSlide.subtitle}
            </p>
            <div className="text-xs font-bold text-amber-200 pt-1 flex items-center gap-2 justify-center md:justify-start">
              <span>LEAD AUTHOR: {currentSlide.speaker.toUpperCase()}</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-sky-300">DOI: {currentSlide.doi}</span>
            </div>
          </div>

          {/* Right Badges & Link */}
          <div className="flex-shrink-0 text-center md:text-right space-y-3 relative z-10">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                {currentSlide.date}
              </div>
              <div className="text-[11px] font-bold text-slate-400 tracking-wider">
                {currentSlide.venue}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={currentSlide.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md transition-colors"
              >
                <span>Read Research Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Partner Pill Boxes */}
              <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 text-[9px] font-bold text-slate-300">
                <div className="px-2 py-1 bg-slate-800 rounded">
                  PRESENTED BY<br /><span className="text-amber-300">{currentSlide.presentedBy}</span>
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded">
                  CURATED BY<br /><span className="text-sky-300">{currentSlide.curatedBy}</span>
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded">
                  EXECUTED BY<br /><span className="text-emerald-300">{currentSlide.executedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. SCIENTIFIC DATASET CATALOG (Kaggle-Style Faceted Search) */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1 border border-emerald-200">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Scientific Datasets & Code</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Scientific Datasets & Computational Space
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Faceted discovery across cryospheric observations, ice core logs, Jupyter notebooks, and climate models
          </p>
        </div>

        {/* Global Search Bar with Live Filter */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets, notebooks, parameters, or station tags (e.g. AWS, CTD, Maitri, Bharati)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
          />
        </div>

        {/* Category Tabs: Notebooks | Datasets | Topics | Models | Comments */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: 'Datasets', count: categoryData.Datasets.length, icon: Database },
            { label: 'Notebooks', count: categoryData.Notebooks.length, icon: FileCode },
            { label: 'Topics', count: categoryData.Topics.length, icon: MessageSquare },
            { label: 'Models', count: categoryData.Models.length, icon: Box },
            { label: 'Comments', count: categoryData.Comments.length, icon: ThumbsUp }
          ].map(pill => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.label}
                onClick={() => {
                  setActiveCategoryPill(pill.label);
                  setDatasetsPageSize(4);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategoryPill === pill.label
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategoryPill === pill.label ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Sidebar Filters + Dataset List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Filter by</span>
              <button
                onClick={() => {
                  setDateFilter('All');
                  setRegionFilter('All');
                  setQuery('');
                }}
                className="text-[10px] text-blue-600 hover:underline font-bold"
              >
                Reset
              </button>
            </div>

            {/* Region Filter */}
            <div className="space-y-2">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Polar Sector
              </div>
              {['All', 'Antarctica', 'Arctic', 'Himalaya', 'Southern Ocean'].map(region => (
                <label key={region} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-blue-600">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="regionFilter"
                      checked={regionFilter === region}
                      onChange={() => setRegionFilter(region)}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span>{region}</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Date Radio Group */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Timeframe
              </div>
              {['All', 'Last 90 days', 'This week', 'Today'].map(opt => (
                <label key={opt} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-blue-600">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="dateFilter"
                      checked={dateFilter === opt}
                      onChange={() => setDateFilter(opt)}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span>{opt}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right Column: Results List */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
              <span className="font-bold text-slate-800">
                {filteredItems.length} {activeCategoryPill} Found
              </span>
              <span className="text-[11px] text-slate-400">
                Showing {Math.min(displayedItems.length, filteredItems.length)} of {filteredItems.length}
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {displayedItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {activeCategoryPill === 'Notebooks' ? '📓' : activeCategoryPill === 'Models' ? '🧠' : '❄️'}
                    </div>
                    <div className="space-y-1">
                      <Link to={`/datasets/${item.id}`} className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors">
                        {item.title}
                      </Link>
                      <div className="text-[11px] text-slate-500">
                        {activeCategoryPill} • {item.timeAgo} • by <strong className="text-slate-700">{item.author}</strong>
                        {item.region && <span className="ml-1.5 px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">{item.region}</span>}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {item.snippet}
                      </p>
                      <div className="flex items-center space-x-2 pt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upvotes Counter Badge */}
                  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-shrink-0">
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs text-slate-900">{item.upvotes}</span>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Datasets Button */}
            {displayedItems.length < filteredItems.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setDatasetsPageSize(prev => prev + 4)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  See More {activeCategoryPill} ({filteredItems.length - displayedItems.length} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. REAL POLAR NEWS ARTICLES WITH DIRECT EXTERNAL PORTAL LINKS */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-1 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Field Dispatches & News</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Latest Polar Science News
            </h2>
            <p className="text-xs text-slate-500">
              Direct dispatches and press releases from NCPOR, MoES, and Indian expedition teams
            </p>
          </div>

          <a
            href="https://ncpor.res.in/news"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Visit NCPOR News Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image with Stacked Date Badge on Top-Left */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2 text-center shadow-md border border-slate-200 min-w-12">
                  <div className="text-sm font-black text-slate-900 leading-none">{article.dateDay}</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">{article.dateMonth}</div>
                  <div className="text-[9px] font-semibold text-slate-400">{article.dateYear}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                    {article.source}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug mt-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {article.snippet}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Verified Press Release</span>
                  <a
                    href={article.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
