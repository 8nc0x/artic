import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  Database,
  Share2,
  Megaphone,
  Radio,
  FileText,
  Compass,
  ExternalLink,
  ChevronRight,
  MapPin,
  Clock,
  Layers,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Activity
} from 'lucide-react';

export default function HomeDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDatasets, setFeaturedDatasets] = useState([]);
  const [featuredPublications, setFeaturedPublications] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/datasets?limit=3')
      .then(r => r.json())
      .then(d => d.success && setFeaturedDatasets(d.items || []));

    fetch('/api/publications?limit=3')
      .then(r => r.json())
      .then(d => d.success && setFeaturedPublications(d.items || []));

    fetch('/api/stats')
      .then(r => r.json())
      .then(d => d.success && setStats(d.data || {}));
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/datasets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickTagClick = (tag) => {
    navigate(`/datasets?q=${encodeURIComponent(tag)}`);
  };

  const handleQuickAiSummary = async (item) => {
    setSelectedSummary({ title: item.title, text: '', loading: true });
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Provide a 3-bullet scientific summary and public relevance for this record: "${item.title}". Abstract/Details: "${item.abstract || item.description || ''}"`
        })
      });
      const data = await res.json();
      setSelectedSummary({
        title: item.title,
        text: data.answer || 'Summary generated from metadata.',
        loading: false
      });
    } catch {
      setSelectedSummary({
        title: item.title,
        text: item.abstract || 'A key scientific record from National Centre for Polar and Ocean Research.',
        loading: false
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const stationCards = [
    {
      name: 'Himadri Station',
      region: 'Ny-Ålesund, Svalbard, Arctic',
      coords: '78° 55′ N, 11° 56′ E',
      temp: '-8°C',
      focus: 'Atmospheric Physics, Marine Biology & Glaciology',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
      badge: 'Active Since 2008'
    },
    {
      name: 'Bharati Station',
      region: 'Larsemann Hills, Antarctica',
      coords: '69° 24′ S, 76° 11′ E',
      temp: '-19°C',
      focus: 'Continental Breakup, Geomagnetism & Oceanography',
      image: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=600',
      badge: 'Active Since 2012'
    },
    {
      name: 'Maitri Station',
      region: 'Schirmacher Oasis, Antarctica',
      coords: '70° 45′ S, 11° 44′ E',
      temp: '-22°C',
      focus: 'Meteorological Baseline & Environmental Science',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      badge: 'Active Since 1989'
    },
    {
      name: 'IndARC Observatory',
      region: 'Kongsfjorden Fjord, Arctic Ocean',
      coords: '192m Subsurface Mooring',
      temp: '+1.4°C',
      focus: 'Continuous Subsurface Oceanographic Monitoring',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
      badge: 'Active Since 2014'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Section: Premium Cinematic Polar Presentation */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 text-white border border-slate-800/80">
        {/* Ambient Arctic Aurora Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Background Image with Clean Atmospheric Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1800"
            alt="Polar Frontiers"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-4xl text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-sky-300 border border-blue-400/20 text-xs font-semibold backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of Earth Sciences (MoES) • Govt. of India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-heading">
            Integrated Polar Science<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300">
              Knowledge Repository &amp; Outreach
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Archive, discover, and synthesize expedition records, cryosphere datasets, research publications, and outreach multimedia from India's missions to the Arctic, Antarctica, and Southern Ocean.
          </p>

          {/* Frosted Glass Universal Search Bar */}
          <form onSubmit={handleHeroSearch} className="mt-7 max-w-2xl">
            <div className="relative flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white rounded-2xl border border-white/20 focus-within:border-blue-400 backdrop-blur-xl transition-all shadow-2xl p-1.5 group">
              <Search className="w-5 h-5 text-slate-300 group-focus-within:text-blue-600 ml-3.5 flex-shrink-0 transition-colors" />
              <input
                type="text"
                placeholder="Search datasets, publications, expeditions, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3.5 py-3 text-sm text-white group-focus-within:text-slate-900 placeholder-slate-300 group-focus-within:placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center space-x-1.5 flex-shrink-0 active:scale-95"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Quick Inquiries:</span>
              {['IndARC Mooring', 'Sea Ice Variability', 'Larsemann Hills', 'Himadri Station', 'Antarctic Krill'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs transition-all hover:scale-105 active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Quick Stats Strip */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-white/10">
            <div>
              <span className="block text-xl md:text-3xl font-black text-white font-heading">2,500+</span>
              <span className="text-xs text-slate-400 font-medium">Scientific Datasets</span>
            </div>
            <div>
              <span className="block text-xl md:text-3xl font-black text-white font-heading">1,200+</span>
              <span className="text-xs text-slate-400 font-medium">Peer-Reviewed Papers</span>
            </div>
            <div>
              <span className="block text-xl md:text-3xl font-black text-white font-heading">44+</span>
              <span className="text-xs text-slate-400 font-medium">Polar Expeditions</span>
            </div>
            <div>
              <span className="block text-xl md:text-3xl font-black text-emerald-400 font-heading">4</span>
              <span className="text-xs text-slate-400 font-medium">Active Observatories</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Core Pillars Action Grid */}
      <div className="text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Core Portal Pillars</h2>
            <p className="text-xs text-slate-500">Access the primary functional modules of the national knowledge portal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Repository */}
          <Link
            to="/datasets"
            className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                Knowledge Repository
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Filter and explore 3,500+ scientific datasets, cruise reports, and publication records.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-blue-600">
              <span>Browse Catalog</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: AI Polar Assistant */}
          <Link
            to="/ai-assistant"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-purple-50/40 via-white to-white border border-purple-200/70 hover:border-purple-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-heading">
                  AI Polar Intelligence
                </h3>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Ask questions in plain English, summarize scientific papers, and analyze polar documentation.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-purple-700">
              <span>Ask AI Assistant</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Knowledge Graph */}
          <Link
            to="/knowledge-graph"
            className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-heading">
                Knowledge Network
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Discover visual connections linking scientists, stations, expeditions, and research disciplines.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-indigo-600">
              <span>View Interactive Graph</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Media & Outreach */}
          <Link
            to="/media"
            className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-heading">
                Media &amp; Outreach
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                High-resolution polar photo/video galleries, 1-click social media generator, and student learning.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-sky-600">
              <span>Explore Outreach</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 3. India's Polar Research Stations (Mission Control Layout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">India's Polar Research Observatories</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Operating continuous research outposts across the Arctic, Antarctic, and Kongsfjorden fjord
            </p>
          </div>
          <Link
            to="/expeditions"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 group"
          >
            <span>View All Expeditions</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {stationCards.map((st) => (
            <div
              key={st.name}
              className="rounded-2xl border border-slate-200/70 overflow-hidden bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-32 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={st.image}
                    alt={st.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-950/85 text-emerald-400 backdrop-blur-xs border border-emerald-500/30">
                    {st.badge}
                  </span>
                  <div className="absolute bottom-2 left-2.5 flex items-center space-x-1.5 text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono font-bold">{st.temp}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                    {st.name}
                  </h3>
                  <div className="flex items-center text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{st.region}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {st.focus}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-3 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Coordinates</span>
                <span>{st.coords}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Curated Highlights: Datasets & Research Publications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        {/* Curated Datasets */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Recent Scientific Datasets</h3>
              </div>
              <Link to="/datasets" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                View All Catalog
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {featuredDatasets.map((d) => (
                <div key={d.id} className="py-3.5 group">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/datasets/${d.id}`}
                      className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1"
                    >
                      {d.title}
                    </Link>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700 flex-shrink-0">
                      {d.region || 'Antarctica'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {d.abstract || 'Scientific observation data from NCPOR expeditions.'}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Parameters: {d.parameters || 'Temperature, Salinity'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickAiSummary(d)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[10px] font-bold text-purple-700 flex items-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>✨ AI Summary</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Research Publications */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Featured Research Papers</h3>
              </div>
              <Link to="/publications" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                View All Publications
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {featuredPublications.map((p) => (
                <div key={p.id} className="py-3.5 group">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/publications/${p.id}`}
                      className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {p.title}
                    </Link>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700 flex-shrink-0">
                      {p.year || '2024'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {p.abstract || 'Peer-reviewed research published in polar science journals.'}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                      {p.journal || 'Polar Science & Climate Dynamics'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickAiSummary(p)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[10px] font-bold text-purple-700 flex items-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>✨ AI Summary</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Modal / Drawer */}
      {selectedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">AI Scientific Summary</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSummary(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 leading-snug">{selectedSummary.title}</h4>
              <div className="mt-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-slate-700 leading-relaxed min-h-[110px] flex items-center">
                {selectedSummary.loading ? (
                  <div className="flex items-center space-x-2.5 text-purple-700 font-medium">
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    <span>Synthesizing scientific summary with Gemini...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">{selectedSummary.text}</div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedSummary(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
