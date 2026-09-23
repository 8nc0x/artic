import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  Database,
  Share2,
  FileText,
  Compass,
  ChevronRight,
  MapPin,
  Play,
  Maximize2,
  GraduationCap,
  HelpCircle,
  BookOpen,
  Radio,
  Image as ImageIcon,
  Video,
  Download,
  Check
} from 'lucide-react';
import FormattedMarkdown from '../components/FormattedMarkdown';

export default function HomeDashboard() {

  const [searchQuery, setSearchQuery] = useState('');
  const [knowledgeTab, setKnowledgeTab] = useState('datasets'); // 'research' | 'publications' | 'datasets'
  const [datasets, setDatasets] = useState([]);
  const [publications, setPublications] = useState([]);
  const [reports, setReports] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch authentic data from database
    fetch('/api/datasets?limit=4')
      .then(r => r.json())
      .then(d => d.success && setDatasets(d.items || []));

    fetch('/api/publications?limit=4')
      .then(r => r.json())
      .then(d => d.success && setPublications(d.items || []));

    fetch('/api/reports?limit=4')
      .then(r => r.json())
      .then(d => d.success && setReports(d.items || []));

    fetch('/api/media?limit=6')
      .then(r => r.json())
      .then(d => d.success && setMediaItems(d.items || []));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/datasets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickAiSummary = async (item) => {
    setSelectedSummary({ title: item.title, text: '', loading: true });
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
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('explore-regions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-950 text-white border border-slate-800">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1800"
            alt="Polar Expeditions"
            className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-sky-300 border border-blue-400/20 text-xs font-semibold backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of Earth Sciences (MoES) • Government of India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-heading">
            Explore India's<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300">
              Polar Science
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            Archiving expedition reports, scientific datasets, peer-reviewed publications, and outreach multimedia from the Arctic, Antarctic, and Southern Ocean.
          </p>

          {/* Action Buttons as specified */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToExplore}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 active:scale-95"
            >
              <span>Explore Polar World</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/expeditions"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm backdrop-blur-md transition-all flex items-center space-x-2 active:scale-95"
            >
              <Compass className="w-4 h-4 text-sky-300" />
              <span>Virtual Expedition</span>
            </Link>
          </div>

          {/* Clean Integrated Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl">
            <div className="relative flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white rounded-2xl border border-white/20 focus-within:border-blue-400 backdrop-blur-xl transition-all shadow-2xl p-1.5 group">
              <Search className="w-5 h-5 text-slate-300 group-focus-within:text-blue-600 ml-3.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search across reports, datasets, publications, and expeditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white group-focus-within:text-slate-900 placeholder-slate-300 group-focus-within:placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. EXPLORE (Polar Regions)                                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="explore-regions" className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">Explore Polar Regions</h2>
          <p className="text-xs text-slate-500 mt-1">
            Discover research, observations, and stations across the three critical cryospheric frontiers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Antarctica */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-44 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=600"
                alt="Antarctica"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                Antarctica (69°S - 70°S)
              </span>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                  Antarctica
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Home to India’s permanent research stations <strong>Bharati</strong> (Larsemann Hills) and <strong>Maitri</strong> (Schirmacher Oasis). Continuous data on ice dynamics, geomagnetism, and meteorology since 1981.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/datasets?region=Antarctica"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Antarctica Data</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Arctic */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-44 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600"
                alt="Arctic"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                Arctic (78°55′N)
              </span>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                  Arctic
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Operating the <strong>Himadri</strong> research station in Ny-Ålesund, Svalbard, and the <strong>IndARC</strong> subsurface moored observatory in Kongsfjorden fjord for oceanic monitoring.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/datasets?region=Arctic"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Arctic Data</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Himalayas / Third Pole */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-44 w-full relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
                alt="Himalayas Third Pole"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                Himalayas (Third Pole)
              </span>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                  Himalayas / Third Pole
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  High-altitude glaciological monitoring of benchmark glaciers in the Chandra basin (Himansh station). Crucial data on glacier mass balance, runoff, and climate impact.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/datasets?region=Himalayas"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Himalayan Data</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. POLAR KNOWLEDGE (Real Database Records)                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Polar Knowledge Repository</h2>
            <p className="text-xs text-slate-500 mt-1">
              Authentic scientific output archived directly from the National Polar Data Center (NPDC)
            </p>
          </div>

          {/* Exact 3 Tabs specified */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setKnowledgeTab('datasets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                knowledgeTab === 'datasets'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scientific Datasets
            </button>

            <button
              onClick={() => setKnowledgeTab('publications')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                knowledgeTab === 'publications'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Publications
            </button>

            <button
              onClick={() => setKnowledgeTab('research')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                knowledgeTab === 'research'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Expedition Reports
            </button>
          </div>
        </div>

        {/* Tab 1: Datasets */}
        {knowledgeTab === 'datasets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                      {d.region || 'Antarctica'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Release: {d.release_date || 'Recent'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {d.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {d.abstract || d.purpose}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">
                    {d.scientist_name || 'NCPOR Mission'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAiSummary(d)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[10px] font-bold text-purple-700 flex items-center space-x-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>AI Summary</span>
                    </button>
                    <Link
                      to={`/datasets/${d.id}`}
                      className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Publications */}
        {knowledgeTab === 'publications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publications.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {p.year || '2024'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {p.doi || 'DOI Indexed'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {p.abstract}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
                    {p.journal || 'Polar Science'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAiSummary(p)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-[10px] font-bold text-purple-700 flex items-center space-x-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>AI Summary</span>
                    </button>
                    <Link
                      to={`/publications/${p.id}`}
                      className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-bold transition-colors"
                    >
                      Read Paper
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Expedition Reports */}
        {knowledgeTab === 'research' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {r.season || 'Expedition Season'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {r.pages || '48'} pages
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {r.executive_summary || r.description || 'Official expedition and cruise scientific report.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Leader: {r.leader || 'NCPOR Scientific Officer'}
                  </span>
                  <Link
                    to={`/reports/${r.id}`}
                    className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold transition-colors"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-center">
          <Link
            to="/datasets"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>View Complete Knowledge Repository ({datasets.length + publications.length + reports.length}+ verified records)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. VIRTUAL EXPERIENCE (Interactive 3D Station / Expedition) */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Virtual Experience &amp; 3D Observatories</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Interactive Polar Stations &amp; Expeditions
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step inside India's remote observatories. Inspect architectural layout, active radar equipment, atmospheric towers, and environmental sensors deployed across Himadri, Bharati, Maitri, and the IndARC underwater mooring.
            </p>

            <div className="pt-3">
              <Link
                to="/expeditions"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Expedition</span>
              </Link>
            </div>
          </div>

          {/* Station Visual Preview Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md w-full">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 group hover:border-emerald-500 transition-colors">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">Arctic Station</span>
              <span className="text-xs font-bold text-white block">Himadri (78°N)</span>
              <span className="text-[10px] text-slate-400">Atmospheric &amp; Biogeochem</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 group hover:border-emerald-500 transition-colors">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">Antarctica Station</span>
              <span className="text-xs font-bold text-white block">Bharati (69°S)</span>
              <span className="text-[10px] text-slate-400">Continental &amp; Geomagnetic</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 group hover:border-emerald-500 transition-colors">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">Antarctica Station</span>
              <span className="text-xs font-bold text-white block">Maitri (70°S)</span>
              <span className="text-[10px] text-slate-400">Meteorology &amp; Atmosphere</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 group hover:border-emerald-500 transition-colors">
              <span className="text-[10px] text-sky-400 font-bold block mb-1">Moored Observatory</span>
              <span className="text-xs font-bold text-white block">IndARC (Fjord)</span>
              <span className="text-[10px] text-slate-400">192m Subsurface Sensors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. MEDIA (Photos, Videos, Expedition Stories)               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Expedition Media Dissemination</h2>
            <p className="text-xs text-slate-500 mt-1">
              Field photography, documentary footage, and scientific expedition stories
            </p>
          </div>

          <Link
            to="/media"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View All Media Assets</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-square cursor-pointer shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {item.type === 'video' ? (
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-white">
                  <Video className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-white">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-bold text-white leading-tight truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 6. LEARN (Smart Education for Students & Public)             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">Smart Education &amp; Learning Hub</h2>
          <p className="text-xs text-slate-500 mt-1">
            Democratizing complex polar science for students, teachers, and curious citizens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: For Students */}
          <Link
            to="/education"
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                For Students
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Simplified lessons on polar climates: Why is Antarctica colder than the Arctic? How do ice cores act as time capsules?
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-blue-600">
              <span>Read Student Guides</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Quizzes */}
          <Link
            to="/education"
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-heading">
                Interactive Quizzes
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Test your knowledge on Indian polar stations, Antarctic wildlife, katabatic winds, and sea-ice extent with instant scores.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-emerald-600">
              <span>Take Quiz</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Educational Resources */}
          <Link
            to="/education"
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-purple-500 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-heading">
                Educational Resources
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Downloadable infographics, classroom materials, and official NCPOR research summaries tailored for school curricula.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-bold text-purple-700">
              <span>Access Resources</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* Lightbox / Media Modal                                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-950 max-h-[450px] flex items-center justify-center">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="max-h-[450px] w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-black text-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedMedia.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedMedia.caption}</p>
              </div>
              <a
                href={selectedMedia.url}
                target="_blank"
                rel="noreferrer"
                download
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* AI Summary Modal                                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      {selectedSummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedSummary(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <FormattedMarkdown content={selectedSummary.text} />
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
