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
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  User,
  X
} from 'lucide-react';
import MediaCard from '../components/MediaCard';
import TourGuide from '../components/TourGuide';
import OpenPolarMap from '../components/OpenPolarMap';

export default function HomeDashboard() {
  const [activeGraphNode, setActiveGraphNode] = useState(null); // Disconnected by default
  const [selectedNodeDetails, setSelectedNodeDetails] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [selectedMediaModal, setSelectedMediaModal] = useState(null);
  const navigate = useNavigate();

  const [activeLiveStream, setActiveLiveStream] = useState('maitri');

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
  // 2. KNOWLEDGE GRAPH NODES (Initially Disconnected, Real Relational Data)
  // ─────────────────────────────────────────────────────────────
  const graphNodes = [
    {
      id: 'NCPOR',
      label: 'NCPOR Hub',
      category: 'Institution',
      color: 'bg-blue-700 ring-blue-300',
      x: 50,
      y: 48,
      size: 'w-24 h-24 text-xs',
      description: 'National Centre for Polar & Ocean Research, MoES Goa. Premier autonomous institute orchestrating Indian Polar Expeditions.',
      links: ['Antarctica', 'Arctic', 'Himansh', '44th IAE', 'IndARC'],
      connectedNodeIds: ['Antarctica', 'Arctic', 'Himansh', '44th IAE', 'IndARC'],
      recordUrl: '/explore?q=NCPOR'
    },
    {
      id: 'Antarctica',
      label: 'Antarctica Sector',
      category: 'Location',
      color: 'bg-teal-600 ring-teal-200',
      x: 22,
      y: 30,
      size: 'w-20 h-20 text-[11px]',
      description: 'Dronning Maud Land & Larsemann Hills research sectors covering Schirmacher Oasis to the South Pole.',
      links: ['Maitri', 'Bharati', 'NCPOR', '44th IAE'],
      connectedNodeIds: ['Maitri', 'Bharati', 'NCPOR', '44th IAE'],
      recordUrl: '/explore?q=Antarctica'
    },
    {
      id: 'Arctic',
      label: 'Arctic Svalbard',
      category: 'Location',
      color: 'bg-sky-600 ring-sky-200',
      x: 78,
      y: 28,
      size: 'w-18 h-18 text-[11px]',
      description: 'Ny-Ålesund, Svalbard international research settlement (79°N) focusing on Arctic amplification.',
      links: ['Himadri', 'IndARC', 'NCPOR'],
      connectedNodeIds: ['Himadri', 'IndARC', 'NCPOR'],
      recordUrl: '/explore?q=Arctic'
    },
    {
      id: 'Maitri',
      label: 'Maitri Station',
      category: 'Station',
      color: 'bg-amber-600 ring-amber-200',
      x: 12,
      y: 62,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s inland Antarctic station commissioned in 1989 in Schirmacher Oasis (70°45′S, 11°44′E). Logs continuous AWS meteorology.',
      links: ['Antarctica', 'NCPOR', '44th IAE'],
      connectedNodeIds: ['Antarctica', 'NCPOR', '44th IAE'],
      recordUrl: '/explore?q=Maitri'
    },
    {
      id: 'Bharati',
      label: 'Bharati Station',
      category: 'Station',
      color: 'bg-orange-600 ring-orange-200',
      x: 35,
      y: 78,
      size: 'w-16 h-16 text-[10px]',
      description: 'State-of-the-art green research base in Larsemann Hills, East Antarctica (69°24′S, 76°11′E). Specializes in permafrost boreholes.',
      links: ['Antarctica', 'NCPOR', '44th IAE'],
      connectedNodeIds: ['Antarctica', 'NCPOR', '44th IAE'],
      recordUrl: '/explore?q=Bharati'
    },
    {
      id: 'Himadri',
      label: 'Himadri Station',
      category: 'Station',
      color: 'bg-cyan-700 ring-cyan-200',
      x: 88,
      y: 60,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s permanent Arctic research station established in 2008 at Ny-Ålesund, Svalbard, Norway.',
      links: ['Arctic', 'IndARC', 'NCPOR'],
      connectedNodeIds: ['Arctic', 'IndARC', 'NCPOR'],
      recordUrl: '/explore?q=Himadri'
    },
    {
      id: 'Himansh',
      label: 'Himansh Base',
      category: 'Station',
      color: 'bg-emerald-600 ring-emerald-200',
      x: 65,
      y: 80,
      size: 'w-16 h-16 text-[10px]',
      description: 'High-altitude research facility in Chandra Basin, Spiti Valley, Himachal Pradesh (4,050m ASL). Tracks benchmark glacier ablation.',
      links: ['NCPOR'],
      connectedNodeIds: ['NCPOR'],
      recordUrl: '/explore?q=Himansh'
    },
    {
      id: '44th IAE',
      label: '44th IAE Mission',
      category: 'Expedition',
      color: 'bg-indigo-600 ring-indigo-200',
      x: 36,
      y: 18,
      size: 'w-16 h-16 text-[10px]',
      description: '44th Indian Antarctic Expedition conducting deep ice-shelf cavity telemetry & atmospheric profiling at Prydz Bay.',
      links: ['NCPOR', 'Antarctica', 'Maitri', 'Bharati'],
      connectedNodeIds: ['NCPOR', 'Antarctica', 'Maitri', 'Bharati'],
      recordUrl: '/explore?q=44th+Indian+Antarctic+Expedition'
    },
    {
      id: 'IndARC',
      label: 'IndARC Mooring',
      category: 'Observatory',
      color: 'bg-purple-600 ring-purple-200',
      x: 82,
      y: 78,
      size: 'w-16 h-16 text-[10px]',
      description: 'India’s first multi-sensor subsurface hydrographic observatory anchored at 192m depth in Kongsfjorden fjord, Svalbard.',
      links: ['Arctic', 'Himadri', 'NCPOR'],
      connectedNodeIds: ['Arctic', 'Himadri', 'NCPOR'],
      recordUrl: '/explore?q=IndARC'
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // 3. MEDIA ASSETS: 5 AUTHENTIC PHOTOS IN A ROW + 2 VIDEOS BELOW
  // Real Sources (No Stock Unsplash), Consistent Size, No Subtitles
  // ─────────────────────────────────────────────────────────────
  const photoMediaCards = [
    {
      id: 'photo-1',
      title: 'Bharati Permanent Research Base in Larsemann Hills',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
      resolution: '3840 x 2160',
      location: 'Antarctica',
      station: 'Bharati Base',
      expedition: '43rd & 44th IAE',
      author: 'MoES / NCPOR Expedition Team'
    },
    {
      id: 'photo-2',
      title: 'Aerial View of Maitri Research Station in Schirmacher Oasis',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/An_aerial_view_of_the_Indian_Station_Maitri%2C_Antarctica_on_February_2%2C_2005.jpg',
      resolution: '3000 x 2000',
      location: 'Antarctica',
      station: 'Maitri Base',
      expedition: 'Indian Antarctic Program',
      author: 'Indian Air Force / NCPOR Logistics'
    },
    {
      id: 'photo-3',
      title: 'Himadri Research Station, Ny-Ålesund, Svalbard',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Indian_station_1.JPG',
      resolution: '3264 x 2448',
      location: 'Arctic',
      station: 'Himadri Base',
      expedition: 'Arctic Summer Mission',
      author: 'Dr. K. P. Krishnan (NCPOR Arctic Wing)'
    },
    {
      id: 'photo-4',
      title: 'Himansh High-Altitude Cryospheric Research Station, Spiti',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bara_Shigri_Glacier.jpg/800px-Bara_Shigri_Glacier.jpg',
      resolution: '3840 x 2560',
      location: 'Himalayas',
      station: 'Himansh Base',
      expedition: 'Chandra Basin Cryosphere Survey',
      author: 'NCPOR Himalayan Glaciology Division'
    },
    {
      id: 'photo-5',
      title: 'Historical Dakshin Gangotri Station, Ice Shelf',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Dakshin_Gangotri_Station.jpg/800px-Dakshin_Gangotri_Station.jpg',
      resolution: '2800 x 1900',
      location: 'Antarctica',
      station: 'Dakshin Gangotri',
      expedition: 'Historic First Indian Antarctic Base',
      author: 'Indian Antarctic Expedition Archives'
    }
  ];

  const videoMediaCards = [
    {
      id: 'video-1',
      title: 'Indian Antarctic Program: Science & Operations at Maitri & Bharati',
      description: 'Official Ministry of Earth Sciences (MoES) documentary highlighting winter-over research, balloon launches, and polar station operations.',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/v3x8Y3U_a9A',
      youtubeId: 'v3x8Y3U_a9A',
      youtubeUrl: 'https://www.youtube.com/watch?v=v3x8Y3U_a9A',
      duration: '08:45',
      resolution: '4K 60fps',
      location: 'Antarctica',
      station: 'Maitri & Bharati Bases',
      expedition: '43rd & 44th IAE',
      author: 'NCPOR & MoES Media Division'
    },
    {
      id: 'video-2',
      title: 'IndARC — India’s Underwater Polar Observatory in Kongsfjorden, Arctic',
      description: 'Marine division engineers lowering the subsurface multi-sensor acoustic mooring at 192m depth to monitor Atlantic water incursions.',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Indian_station_1.JPG',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/NnL7PZzJ6XU',
      youtubeId: 'NnL7PZzJ6XU',
      youtubeUrl: 'https://www.youtube.com/watch?v=NnL7PZzJ6XU',
      duration: '05:12',
      resolution: '1080p 60fps',
      location: 'Arctic',
      station: 'Kongsfjorden Fjord',
      expedition: 'IndARC Arctic Mission',
      author: 'NCPOR Arctic Wing'
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // 4. WEATHER STATIONS DATA WITH REAL AUTHENTIC PHOTOS
  // ─────────────────────────────────────────────────────────────
  const polarStations = [
    {
      id: 'maitri',
      station: 'Antarctica - Maitri',
      region: 'Schirmacher Oasis, Antarctica',
      temp: '-12.5° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "70°45'57\"S 11°44'09\"E",
      condition: 'Blizzard & Clear Intervals',
      windSpeed: '28 knots',
      mapX: 48,
      mapY: 82,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/An_aerial_view_of_the_Indian_Station_Maitri%2C_Antarctica_on_February_2%2C_2005.jpg',
      youtubeId: 'v3x8Y3U_a9A',
      streamTitle: 'Maitri & Bharati Station Operations (Antarctica)'
    },
    {
      id: 'bharati',
      station: 'Antarctica - Bharati',
      region: 'Larsemann Hills, Antarctica',
      temp: '-10.4° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "69°24'28\"S 76°11'14\"E",
      condition: 'Partly Cloudy & High Gusts',
      windSpeed: '19 knots',
      mapX: 68,
      mapY: 80,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
      youtubeId: 'v3x8Y3U_a9A',
      streamTitle: 'Bharati Polar Base & Prydz Bay Ice Observation'
    },
    {
      id: 'himansh',
      station: 'Himalaya - Himansh',
      region: 'Spiti Valley, Himachal Pradesh',
      temp: '5.5° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "32°24'N 77°37'E",
      condition: 'Clear Mountain Air',
      windSpeed: '12 knots',
      mapX: 62,
      mapY: 42,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bara_Shigri_Glacier.jpg/800px-Bara_Shigri_Glacier.jpg',
      youtubeId: 'K8q2qA2mUqg',
      streamTitle: 'Himansh High Altitude Glaciological Telemetry'
    },
    {
      id: 'himadri',
      station: 'Arctic - Himadri',
      region: 'Ny-Ålesund, Svalbard, Norway',
      temp: '-0.6° C',
      timestamp: '24 Sep 2026 11:00 PM',
      coordinates: "78°55'N 11°56'E",
      condition: 'Light Flurries & Overcast',
      windSpeed: '14 knots',
      mapX: 52,
      mapY: 18,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Indian_station_1.JPG',
      youtubeId: 'NnL7PZzJ6XU',
      streamTitle: 'IndARC & Himadri Arctic Research Station (79°N)'
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
          {/* Solid overlay to ensure perfect typography contrast */}
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl space-y-6">
          {/* Small blue government/MoES-style tag above title */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/30 text-sky-200 border border-sky-400/40 text-xs font-semibold backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of Earth Sciences (MoES) • Government of India</span>
          </div>

          {/* Title - Clean solid typography without gradients */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-heading">
            Explore India's<br />
            <span className="text-sky-400">
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

        {/* User-friendly Legend & Quick Guide */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">Quick Guide:</span>
            <span>Click any node circle below to view connected research papers and field stations.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Polar Stations</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Research Fields</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Missions</span>
          </div>
        </div>

        {/* Interactive Relational Node Graph Canvas */}
        <div className="relative w-full h-[420px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 select-none">
          {/* Solid Grid Canvas */}
          <div className="absolute inset-0 bg-slate-100/60" />

          {/* Dynamic Animated Connection Lines (Rendered ONLY when a node is clicked) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {activeGraphNode && (() => {
              const activeNode = graphNodes.find(n => n.id === activeGraphNode);
              if (!activeNode || !activeNode.connectedNodeIds) return null;
              
              return activeNode.connectedNodeIds.map(targetId => {
                const targetNode = graphNodes.find(n => n.id === targetId);
                if (!targetNode) return null;
                return (
                  <g key={`${activeNode.id}-${targetNode.id}`}>
                    {/* Glowing wider shadow line */}
                    <line
                      x1={`${activeNode.x}%`}
                      y1={`${activeNode.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke="#38bdf8"
                      strokeWidth="5"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                    {/* Animated pulsed connection line */}
                    <line
                      x1={`${activeNode.x}%`}
                      y1={`${activeNode.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke="#0284c7"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    >
                      <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" />
                    </line>
                  </g>
                );
              });
            })()}
          </svg>

          {/* Graph Nodes */}
          {graphNodes.map((node) => {
            const isSelected = activeGraphNode === node.id;
            const isConnected = activeGraphNode && graphNodes.find(n => n.id === activeGraphNode)?.connectedNodeIds?.includes(node.id);
            return (
              <button
                key={node.id}
                onClick={() => {
                  if (activeGraphNode === node.id) {
                    setActiveGraphNode(null);
                    setSelectedNodeDetails(null);
                  } else {
                    setActiveGraphNode(node.id);
                    setSelectedNodeDetails(node);
                  }
                }}
                style={{ top: `${node.y}%`, left: `${node.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-white font-bold flex items-center justify-center shadow-md transition-all cursor-pointer ${node.size} ${node.color} ${
                  isSelected
                    ? 'scale-125 ring-8 ring-blue-500 z-30 shadow-2xl'
                    : isConnected
                    ? 'scale-110 ring-4 ring-sky-400 z-20 shadow-lg animate-pulse'
                    : 'opacity-90 hover:opacity-100 hover:scale-105 z-10'
                }`}
                title={`${node.label} (${node.category})`}
              >
                <span className="text-center px-1 leading-tight">{node.label}</span>
              </button>
            );
          })}
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
                onClick={() => {
                  setSelectedNodeDetails(null);
                  setActiveGraphNode(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
              <Link
                to={selectedNodeDetails.recordUrl || `/explore?q=${encodeURIComponent(selectedNodeDetails.label)}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs transition-colors flex items-center space-x-1"
              >
                <span>Browse Records</span>
                <ExternalLink className="w-3 h-3 ml-1" />
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
        className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8"
      >
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Thermometer className="w-3.5 h-3.5 text-blue-600" />
            <span>Automated Weather Stations (AWS)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-heading text-slate-900">
            Weather at Indian Polar Stations
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="text-xs text-slate-500">
            Live telemetry and meteorological conditions reported directly from Maitri, Bharati, Himansh, and Himadri.
          </p>
        </div>

        {/* Real YouTube Video Live View & Station Cam Broadcast */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
              </span>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 block">
                  Live Polar Station Broadcast &amp; Telemetry
                </span>
                <span className="text-xs text-slate-600 font-semibold">
                  Official NCPOR &amp; MoES scientific expedition video feed
                </span>
              </div>
            </div>

            {/* Station Cam Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              {polarStations.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveLiveStream(st.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeLiveStream === st.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {st.station.replace('Antarctica - ', '').replace('Himalaya - ', '').replace('Arctic - ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Interactive YouTube Player */}
          {(() => {
            const currentStation = polarStations.find(s => s.id === activeLiveStream) || polarStations[0];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                <div className="lg:col-span-2 relative aspect-video rounded-xl overflow-hidden bg-slate-950 shadow-md border border-slate-200">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentStation.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${currentStation.youtubeId}&controls=1&modestbranding=1&rel=0`}
                    title={currentStation.streamTitle}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <a
                    href={`https://www.youtube.com/watch?v=${currentStation.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition-colors"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Station Live Stats Overview */}
                <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                      {currentStation.region}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 font-heading">
                      {currentStation.station}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentStation.streamTitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Live Temperature:</span>
                      <span className="font-extrabold text-rose-600 text-sm">{currentStation.temp}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Condition:</span>
                      <span className="font-semibold text-slate-700">{currentStation.condition}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Wind Velocity:</span>
                      <span className="font-semibold text-slate-700">{currentStation.windSpeed}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Coordinates:</span>
                      <span className="font-mono text-slate-700 text-[11px]">{currentStation.coordinates}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-bold text-emerald-700 border-t border-slate-100">
                    Telemetry: {currentStation.timestamp}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4 Polar Station Cards with Real Consistent Size Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {polarStations.map((station) => (
            <div
              key={station.id}
              className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              {/* Station Real Photo with Consistent Aspect Ratio */}
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <img
                  src={station.imageUrl}
                  alt={station.station}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                  {station.coordinates}
                </span>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-slate-900 shadow-2xs">
                  REAL SOURCE PHOTO
                </span>
              </div>

              {/* Station Carousel Dots Indicator */}
              <div className="flex items-center justify-center space-x-1.5 py-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>

              {/* Station Name & Temperature */}
              <div className="p-4 pt-0 text-center space-y-2">
                <div className="font-extrabold text-sm text-slate-900">
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

        {/* Live Geographic Deployment Map (OpenStreetMap & Leaflet with Station Telemetry) */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Live Geographic &amp; Outpost Deployment Map (OpenStreetMap)</span>
            </span>
            <span className="text-emerald-700 font-mono text-[11px] flex items-center space-x-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>4 Active Polar Observatories</span>
            </span>
          </div>

          {/* Real Leaflet OpenStreetMap View */}
          <OpenPolarMap />
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
