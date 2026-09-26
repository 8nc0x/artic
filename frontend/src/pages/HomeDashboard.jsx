import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Share2,
  MapPin,
  Play,
  Thermometer,
  Wind,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  User,
  X
} from 'lucide-react';
import MediaCard from '../components/MediaCard';
import TourGuide from '../components/TourGuide';

export default function HomeDashboard() {
  const [activeGraphNode, setActiveGraphNode] = useState('NCPOR');
  const [selectedNodeDetails, setSelectedNodeDetails] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [selectedMediaModal, setSelectedMediaModal] = useState(null);
  const navigate = useNavigate();

  // ─────────────────────────────────────────────────────────────
  // 1. TOUR STEPS FOR DRIVER / TOURGUIDE (Section 8)
  // ─────────────────────────────────────────────────────────────
  const homeTourSteps = [
    {
      target: '#home-hero',
      title: 'Explore India’s Polar Science',
      content: 'Welcome to the National Centre for Polar and Ocean Research portal. Discover research reports, publications, and telemetry from the Arctic, Antarctic, and Himalayas.'
    },
    {
      target: '#home-knowledge-graph',
      title: 'Polar Knowledge Graph',
      content: 'An interactive relational network linking Indian expeditions, research stations, scientific domains, and climate datasets.'
    },
    {
      target: '#home-media',
      title: 'Expedition Media Dissemination',
      content: 'High-definition 4K field photography and documentary video footage captured by Indian scientific teams on the ice.'
    },
    {
      target: '#home-weather',
      title: 'Indian Polar Stations Weather',
      content: 'Live meteorological telemetry from Maitri, Bharati, Himansh, and Himadri stations across Antarctica, the Arctic, and the Himalayas.'
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // 2. KNOWLEDGE GRAPH NODES (Meaningful scientific relationships)
  // ─────────────────────────────────────────────────────────────
  const graphNodes = [
    {
      id: 'NCPOR',
      label: 'NCPOR Hub',
      category: 'Institution',
      color: 'bg-blue-600 ring-blue-300',
      x: 50,
      y: 48,
      size: 'w-24 h-24 text-xs',
      description: 'National Centre for Polar & Ocean Research, MoES Goa. Premier autonomous institute orchestrating Indian Polar Expeditions.',
      links: ['Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean', '44th IAE']
    },
    {
      id: 'Antarctica',
      label: 'Antarctica',
      category: 'Location',
      color: 'bg-teal-500 ring-teal-200',
      x: 22,
      y: 30,
      size: 'w-20 h-20 text-[11px]',
      description: 'Dronning Maud Land & Larsemann Hills research sectors covering Schirmacher Oasis to the South Pole.',
      links: ['Maitri', 'Bharati', 'Cryosphere', 'Dr. Thamban']
    },
    {
      id: 'Arctic',
      label: 'Arctic',
      category: 'Location',
      color: 'bg-sky-500 ring-sky-200',
      x: 78,
      y: 28,
      size: 'w-18 h-18 text-[11px]',
      description: 'Ny-Ålesund, Svalbard international research settlement (79°N) focusing on Arctic amplification.',
      links: ['Himadri', 'IndARC', 'Atmosphere']
    },
    {
      id: 'Maitri',
      label: 'Maitri Base',
      category: 'Station',
      color: 'bg-amber-600 ring-amber-200',
      x: 12,
      y: 62,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s inland Antarctic station commissioned in 1989 in Schirmacher Oasis (70°45′S, 11°44′E).',
      links: ['Antarctica', 'Meteorology']
    },
    {
      id: 'Bharati',
      label: 'Bharati Base',
      category: 'Station',
      color: 'bg-orange-600 ring-orange-200',
      x: 35,
      y: 78,
      size: 'w-16 h-16 text-[10px]',
      description: 'State-of-the-art green research base in Larsemann Hills, East Antarctica (69°24′S, 76°11′E).',
      links: ['Antarctica', 'Ice Cores']
    },
    {
      id: 'Himadri',
      label: 'Himadri Base',
      category: 'Station',
      color: 'bg-cyan-600 ring-cyan-200',
      x: 88,
      y: 60,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s permanent Arctic research station established in 2008 at Ny-Ålesund, Svalbard, Norway.',
      links: ['Arctic', 'IndARC']
    },
    {
      id: 'Himansh',
      label: 'Himansh Base',
      category: 'Station',
      color: 'bg-emerald-600 ring-emerald-200',
      x: 65,
      y: 80,
      size: 'w-16 h-16 text-[10px]',
      description: 'High-altitude research facility in Chandra Basin, Spiti Valley, Himachal Pradesh (4,000m ASL).',
      links: ['Himalayas', 'Glaciology']
    },
    {
      id: '44th IAE',
      label: '44th IAE',
      category: 'Expedition',
      color: 'bg-indigo-600 ring-indigo-200',
      x: 36,
      y: 18,
      size: 'w-16 h-16 text-[10px]',
      description: '44th Indian Antarctic Expedition (2024–2025) conducting deep ice-shelf drilling & atmospheric profiling.',
      links: ['NCPOR', 'Antarctica', 'MV Golovnin']
    },
    {
      id: 'IndARC',
      label: 'IndARC Mooring',
      category: 'Observatory',
      color: 'bg-purple-600 ring-purple-200',
      x: 82,
      y: 78,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s first multi-sensor subsurface hydrographic observatory anchored in Kongsfjorden fjord, Svalbard.',
      links: ['Arctic', 'Himadri']
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // 3. MEDIA ASSETS: 5 PHOTOS IN A ROW + 2 LARGER VIDEOS BELOW
  // ─────────────────────────────────────────────────────────────
  const photoMediaCards = [
    {
      id: 'photo-1',
      title: 'Aurora Australis Dancing over Maitri Base',
      description: 'Vibrant emerald green ionospheric aurora australis captured during polar winter-over observations.',
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      resolution: '3600 x 2400',
      location: 'Antarctica',
      station: 'Maitri Base',
      expedition: '43rd IAE',
      author: 'Indian Institute of Geomagnetism'
    },
    {
      id: 'photo-2',
      title: 'Himadri Station during Svalbard Arctic Summer',
      description: 'India’s permanent research outpost in Ny-Ålesund facing Kongsfjorden fjord under the midnight sun.',
      url: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=800',
      resolution: '3840 x 2160',
      location: 'Arctic',
      station: 'Himadri Base',
      expedition: 'Arctic Summer 2024',
      author: 'Dr. K. P. Krishnan (NCPOR)'
    },
    {
      id: 'photo-3',
      title: 'Ice Core Extraction & Paleoclimate Logging',
      description: 'Field scientists measuring annual micro-dust and greenhouse gas bubbles in Princess Elizabeth Land.',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      resolution: '3840 x 2560',
      location: 'Antarctica',
      station: 'Bharati Base',
      expedition: '44th IAE',
      author: 'Ice Core Paleoclimate Team'
    },
    {
      id: 'photo-4',
      title: 'Research Vessel MV Vasiliy Golovnin in Pack Ice',
      description: 'Chartered ice-class cargo vessel navigating consolidated floes during the annual Antarctic resupply.',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      resolution: '3840 x 2160',
      location: 'Southern Ocean',
      station: 'Vessel Operations',
      expedition: 'Logistics Wing',
      author: 'Capt. A. Nair'
    },
    {
      id: 'photo-5',
      title: 'Gepang Gath Benchmark Glacier Ablation Survey',
      description: 'Cryosphere scientists installing automated hydro-meteorological stations at the glacier-lake outlet.',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      resolution: '4000 x 3000',
      location: 'Himalayas',
      station: 'Himansh Base',
      expedition: 'Chandra Basin 2024',
      author: 'Himalayan Glaciology Division'
    }
  ];

  const videoMediaCards = [
    {
      id: 'video-1',
      title: 'Launching High-Altitude Radiosonde Weather Balloon at Maitri Base',
      description: 'IMD and NCPOR atmospheric scientists releasing a weather balloon to measure sub-zero vertical wind vectors and ozone profiles.',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
      duration: '03:45',
      resolution: '4K 60fps',
      location: 'Antarctica',
      station: 'Maitri Base',
      expedition: '43rd IAE',
      author: 'IMD Polar Meteorological Unit'
    },
    {
      id: 'video-2',
      title: 'Kongsfjorden Fjord Hydrographic Mooring Deployment (IndARC)',
      description: 'Marine division engineers lowering the subsurface multi-sensor acoustic mooring to monitor Atlantic water incursions.',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      duration: '05:12',
      resolution: '1080p 60fps',
      location: 'Arctic',
      station: 'Kongsfjorden Fjord',
      expedition: 'IndARC Arctic Mission',
      author: 'Marine Sciences Division'
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // 4. WEATHER STATIONS DATA (Maitri, Bharati, Himansh, Himadri)
  // ─────────────────────────────────────────────────────────────
  const polarStations = [
    {
      id: 'maitri',
      station: 'Antarctica - Maitri:',
      region: 'Schirmacher Oasis, Antarctica',
      temp: '-12.5° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "70°45'57\"S 11°44'09\"E",
      condition: 'Blizzard & Clear Intervals',
      windSpeed: '28 knots',
      mapX: 48,
      mapY: 82,
      imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'bharati',
      station: 'Antarctica - Bharati:',
      region: 'Larsemann Hills, Antarctica',
      temp: '-10.4° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "69°24'28\"S 76°11'14\"E",
      condition: 'Partly Cloudy & High Gusts',
      windSpeed: '19 knots',
      mapX: 68,
      mapY: 80,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'himansh',
      station: 'Himalaya - Himansh:',
      region: 'Spiti Valley, Himachal Pradesh',
      temp: '5.5° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "32°24'N 77°37'E",
      condition: 'Clear Mountain Air',
      windSpeed: '12 knots',
      mapX: 62,
      mapY: 42,
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'himadri',
      station: 'Arctic - Himadri:',
      region: 'Ny-Ålesund, Svalbard, Norway',
      temp: '-0.6° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "78°55'N 11°56'E",
      condition: 'Light Flurries & Overcast',
      windSpeed: '14 knots',
      mapX: 52,
      mapY: 18,
      imageUrl: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="space-y-16 pb-12 text-left font-sans">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION (Reference media_1790447041257.png)         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        id="home-hero"
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 text-white min-h-[460px] flex items-center"
      >
        {/* Pastel Artistic Antarctica Scene with Penguins Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/api/artifacts/antarctica_hero_bg_1790449248057.jpg"
            alt="Pastel Antarctica Landscape with Penguins"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
            onError={(e) => {
              // Graceful fallback to serene painterly polar mountain
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1800';
            }}
          />
          {/* Subtle gradient overlay to ensure perfect typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl space-y-6">
          {/* Small blue government/MoES-style tag above title */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/25 text-sky-200 border border-sky-400/40 text-xs font-semibold backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of Earth Sciences (MoES) • Government of India</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-heading">
            Explore India's<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200">
              Polar Science
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal">
            Archiving expedition reports, scientific datasets, peer-reviewed publications and outreach multimedia from Arctic, Antarctic and Southern Ocean research.
          </p>

          {/* Action Buttons: Explore Polar World & Virtual Expedition */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2 active:scale-95"
            >
              <span>Explore Polar World</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center space-x-2 active:scale-95"
            >
              <Compass className="w-4 h-4 text-sky-300" />
              <span>Virtual Expedition</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. KNOWLEDGE GRAPH SECTION (Home-only, Reference Section 8)  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        id="home-knowledge-graph"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Knowledge Graph</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Polar Research Relational Network
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore interconnected relationships between Indian expeditions, stations, scientific domains, and climate datasets. Hover for summary, click for details.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold text-slate-400">Filter View:</span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {['All', 'Stations', 'Domains', 'Expeditions'].map((tab) => (
                <button
                  key={tab}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Relational Node Graph Canvas */}
        <div className="relative w-full h-[420px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 select-none">
          {/* Subtle Grid Dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

          {/* Connected SVG Lines with Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 stroke-[1.5]">
            <line x1="50%" y1="48%" x2="22%" y2="30%" />
            <line x1="50%" y1="48%" x2="78%" y2="28%" />
            <line x1="22%" y1="30%" x2="12%" y2="62%" />
            <line x1="22%" y1="30%" x2="35%" y2="78%" />
            <line x1="78%" y1="28%" x2="88%" y2="60%" />
            <line x1="78%" y1="28%" x2="82%" y2="78%" />
            <line x1="50%" y1="48%" x2="65%" y2="80%" />
            <line x1="50%" y1="48%" x2="36%" y2="18%" />
          </svg>

          {/* Graph Nodes */}
          {graphNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => {
                setActiveGraphNode(node.id);
                setSelectedNodeDetails(node);
              }}
              style={{ top: `${node.y}%`, left: `${node.x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-white font-bold flex items-center justify-center shadow-md transition-all hover:scale-115 active:scale-95 cursor-pointer ring-4 ${node.size} ${node.color} ${
                activeGraphNode === node.id ? 'scale-115 ring-8 ring-blue-400 z-20 shadow-xl' : 'z-10'
              }`}
              title={`${node.label} (${node.category})`}
            >
              <span className="text-center px-1 leading-tight">{node.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Node Details Drawer / Card */}
        {selectedNodeDetails && (
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0 mt-0.5">
                ❄️
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-blue-950 font-heading">
                    {selectedNodeDetails.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-200/80 text-blue-800">
                    {selectedNodeDetails.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {selectedNodeDetails.description}
                </p>
                <div className="flex items-center space-x-2 pt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Connected to:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedNodeDetails.links?.map((link, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] text-slate-700 font-medium">
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => setSelectedNodeDetails(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
              <Link
                to={`/explore?q=${encodeURIComponent(selectedNodeDetails.label)}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs transition-colors"
              >
                Browse Records
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. HOME MEDIA SECTION (5 Photos in a Row + 2 Videos Below)  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="home-media" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
              <span>Scientific Multimedia Archive</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Expedition Media Dissemination
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              5 high-resolution expedition photo dispatches followed by 4K field documentary footage
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>View All Media</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Row 1: 5 Photo Cards in a Row (Responsive Grid: 1 col on mobile, 2 on sm, 3 on md, 5 on lg/xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {photoMediaCards.map((card) => (
            <MediaCard
              key={card.id}
              item={card}
              isVideo={false}
              onClick={(item) => setSelectedMediaModal(item)}
            />
          ))}
        </div>

        {/* Row 2: 2 Larger Video Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {videoMediaCards.map((card) => (
            <MediaCard
              key={card.id}
              item={card}
              isVideo={true}
              onClick={(item) => setSelectedMediaModal(item)}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. WEATHER AT INDIAN POLAR STATIONS (Section 8)             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        id="home-weather"
        className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6"
      >
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Automated Weather Stations (AWS)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-heading text-white">
            Weather at Indian Polar Stations
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          <p className="text-xs text-slate-400">
            Live telemetry and meteorological conditions reported from Maitri, Bharati, Himansh, and Himadri.
          </p>
        </div>

        {/* 4 Polar Station Cards (Exact match to Reference media_1790446855379.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {polarStations.map((station) => (
            <div
              key={station.id}
              className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              {/* Station Image */}
              <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                <img
                  src={station.imageUrl}
                  alt={station.station}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-white backdrop-blur-md">
                  {station.coordinates}
                </span>
              </div>

              {/* Station Carousel Dots Indicator (as seen in reference) */}
              <div className="flex items-center justify-center space-x-1.5 py-2">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-slate-700' : 'bg-slate-300'}`}
                  />
                ))}
              </div>

              {/* Station Name & Temperature */}
              <div className="p-4 pt-0 text-center space-y-2">
                <div className="font-extrabold text-sm text-blue-950">
                  {station.station}
                </div>

                {/* Big Bold Red Temperature */}
                <div className="flex items-center justify-center space-x-1 text-2xl font-black text-rose-600">
                  <Thermometer className="w-5 h-5 text-rose-500" />
                  <span>{station.temp}</span>
                </div>

                {/* Condition & Wind */}
                <div className="text-[11px] text-slate-500 flex items-center justify-center space-x-2">
                  <span>{station.condition}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-0.5">
                    <Wind className="w-3 h-3 text-sky-600" />
                    <span>{station.windSpeed}</span>
                  </span>
                </div>

                {/* Timestamp in Bold Green */}
                <div className="text-xs font-bold text-emerald-800 tracking-wide border-t border-slate-100 pt-2">
                  {station.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Terrain Map with Interactive Station Pins */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              Geographic Deployment Map
            </span>
            <span className="text-slate-400 text-[11px]">
              Hover pin to view station details
            </span>
          </div>

          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* World Map Background Graphic */}
            <img
              src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=1400"
              alt="World Polar Terrain Map"
              className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/70 to-slate-950" />

            {/* Station Pins */}
            {polarStations.map((station) => (
              <div
                key={station.id}
                style={{ top: `${station.mapY}%`, left: `${station.mapX}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                onMouseEnter={() => setHoveredStation(station)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                <div className="relative cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-400/40 animate-ping absolute inset-0" />
                  <div className="w-4 h-4 rounded-full bg-rose-600 border border-white flex items-center justify-center shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 w-48 bg-slate-900/95 backdrop-blur-md text-white rounded-xl p-2.5 shadow-xl border border-slate-700 text-left pointer-events-none">
                  <div className="font-bold text-xs text-sky-300">{station.station}</div>
                  <div className="text-[10px] text-slate-300">{station.region}</div>
                  <div className="text-xs font-black text-rose-400 mt-1">{station.temp}</div>
                  <div className="text-[9px] text-emerald-400 font-medium">{station.condition}</div>
                  <div className="text-[8px] text-slate-500 mt-0.5">{station.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. MEDIA DETAILS MODAL                                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      {selectedMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 text-left">
            <div className="relative aspect-video bg-black">
              <img
                src={selectedMediaModal.url}
                alt={selectedMediaModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedMediaModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-blue-700 font-bold uppercase tracking-wider">
                <span>{selectedMediaModal.location}</span>
                <span>•</span>
                <span>{selectedMediaModal.station}</span>
                {selectedMediaModal.expedition && (
                  <>
                    <span>•</span>
                    <span className="text-slate-500">{selectedMediaModal.expedition}</span>
                  </>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {selectedMediaModal.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedMediaModal.description}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Author / Credit: <strong>{selectedMediaModal.author}</strong></span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700">
                  {selectedMediaModal.resolution}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver.js Product Tour Guide Component */}
      <TourGuide tourKey="home_tour" steps={homeTourSteps} />
    </div>
  );
}
